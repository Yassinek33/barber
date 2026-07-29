import type { Context } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';
import { getFreeBusy, updateCalendarEvent } from './_lib/google';

const TIME_ZONE = 'Europe/Amsterdam';
const DEFAULT_DURATION_MINUTES = 60;

interface RescheduleBody {
  id: string;
  token: string;
  newDate: string; // YYYY-MM-DD
  newTimeSlot: string; // HH:MM
}

function slotToRange(date: string, timeSlot: string, durationMinutes: number) {
  const start = new Date(`${date}T${timeSlot}:00`);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  return { startISO: start.toISOString(), endISO: end.toISOString() };
}

function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
}

// POST /api/reschedule-booking  body: { id, token, newDate, newTimeSlot }
// Customer self-service reschedule from the "manage my booking" email link.
// Re-validates the manage_token, re-checks the barber's live calendar for
// the new slot, then moves the Supabase row and the Google Calendar event.
export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  let body: RescheduleBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  if (!body.id || !body.token || !body.newDate || !body.newTimeSlot) {
    return new Response(JSON.stringify({ error: 'missing_params' }), { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('id, barber_id, status, date, time_slot, duration_minutes, google_event_id, manage_token')
    .eq('id', body.id)
    .single();

  if (error || !booking || booking.manage_token !== body.token) {
    return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });
  }

  const currentDateTime = new Date(`${booking.date}T${booking.time_slot}:00`);
  if (booking.status !== 'bevestigd' || currentDateTime.getTime() < Date.now()) {
    return new Response(JSON.stringify({ error: 'not_modifiable' }), { status: 409 });
  }

  const durationMinutes = booking.duration_minutes || DEFAULT_DURATION_MINUTES;
  const { startISO, endISO } = slotToRange(body.newDate, body.newTimeSlot, durationMinutes);

  if (new Date(startISO).getTime() < Date.now()) {
    return new Response(JSON.stringify({ error: 'slot_in_past' }), { status: 400 });
  }

  const { data: barber } = await supabase
    .from('barbers')
    .select('google_refresh_token, google_calendar_id, connected')
    .eq('id', booking.barber_id)
    .single();

  if (barber?.connected && barber.google_refresh_token && barber.google_calendar_id) {
    try {
      const dayStart = new Date(`${body.newDate}T00:00:00`).toISOString();
      const dayEnd = new Date(`${body.newDate}T23:59:59`).toISOString();
      const busy = await getFreeBusy(barber.google_refresh_token, barber.google_calendar_id, dayStart, dayEnd);
      const conflict = busy.some(b => rangesOverlap(startISO, endISO, b.start, b.end));
      if (conflict) {
        return new Response(JSON.stringify({ error: 'slot_no_longer_available' }), { status: 409 });
      }
    } catch (err) {
      console.error('reschedule freebusy re-check failed, proceeding without it', err);
    }
  }

  const { error: updateError } = await supabase
    .from('bookings')
    .update({ date: body.newDate, time_slot: body.newTimeSlot })
    .eq('id', body.id);

  if (updateError) {
    console.error('reschedule booking update failed', updateError);
    return new Response(JSON.stringify({ error: 'reschedule_failed' }), { status: 500 });
  }

  if (booking.google_event_id && barber?.connected && barber.google_refresh_token && barber.google_calendar_id) {
    try {
      await updateCalendarEvent(barber.google_refresh_token, barber.google_calendar_id, booking.google_event_id, {
        startISO,
        endISO,
        timeZone: TIME_ZONE,
      });
    } catch (err) {
      console.error('updateCalendarEvent failed', err);
      // The Supabase row is already the source of truth for the site; the
      // barber's calendar event will be stale until they reconnect/refresh.
    }
  }

  return new Response(JSON.stringify({ ok: true, date: body.newDate, timeSlot: body.newTimeSlot }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
