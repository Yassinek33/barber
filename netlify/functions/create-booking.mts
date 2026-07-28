import type { Context } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';
import { getFreeBusy, createCalendarEvent } from './_lib/google';

const TIME_ZONE = 'Europe/Amsterdam';
const DEFAULT_DURATION_MINUTES = 60;

interface CreateBookingBody {
  id: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  durationMinutes?: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  extras: { name: string; price: number }[];
  totalPrice: number;
}

function slotToRange(date: string, timeSlot: string, durationMinutes: number) {
  const start = new Date(`${date}T${timeSlot}:00`);
  const end = new Date(start.getTime() + durationMinutes * 60000);
  return { startISO: start.toISOString(), endISO: end.toISOString() };
}

function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return new Date(aStart) < new Date(bEnd) && new Date(bStart) < new Date(aEnd);
}

// POST /api/create-booking
// Writes the booking to Supabase and, if the barber has connected their
// Google Calendar, creates a real event on it — that's what makes it show
// up on their iPhone. Re-checks the slot is still free right before writing
// to close the race window between "site shows it as free" and "confirm".
export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  let body: CreateBookingBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  if (!body.barberId || !body.date || !body.timeSlot || !body.customerName || !body.customerEmail) {
    return new Response(JSON.stringify({ error: 'Missing required booking fields' }), { status: 400 });
  }

  const durationMinutes = body.durationMinutes || DEFAULT_DURATION_MINUTES;
  const { startISO, endISO } = slotToRange(body.date, body.timeSlot, durationMinutes);

  const supabase = getSupabaseAdmin();
  const { data: barber } = await supabase
    .from('barbers')
    .select('google_refresh_token, google_calendar_id, connected')
    .eq('id', body.barberId)
    .single();

  // Defend against double-booking: re-check the barber's live calendar right
  // before writing, in case someone else grabbed the slot (site or phone)
  // in the few seconds since the page loaded it as available.
  if (barber?.connected && barber.google_refresh_token && barber.google_calendar_id) {
    try {
      const dayStart = new Date(`${body.date}T00:00:00`).toISOString();
      const dayEnd = new Date(`${body.date}T23:59:59`).toISOString();
      const busy = await getFreeBusy(barber.google_refresh_token, barber.google_calendar_id, dayStart, dayEnd);
      const conflict = busy.some(b => rangesOverlap(startISO, endISO, b.start, b.end));
      if (conflict) {
        return new Response(JSON.stringify({ error: 'slot_no_longer_available' }), { status: 409 });
      }
    } catch (err) {
      console.error('freebusy re-check failed, proceeding without it', err);
    }
  }

  let googleEventId: string | null = null;
  if (barber?.connected && barber.google_refresh_token && barber.google_calendar_id) {
    try {
      googleEventId = await createCalendarEvent(barber.google_refresh_token, barber.google_calendar_id, {
        summary: `${body.serviceName} — ${body.customerName}`,
        description: [
          `Klant: ${body.customerName}`,
          `Telefoon: ${body.customerPhone}`,
          `E-mail: ${body.customerEmail}`,
          body.extras?.length ? `Extra's: ${body.extras.map(e => e.name).join(', ')}` : null,
          `Totaal: €${body.totalPrice}`,
          `Boeking: #${body.id}`,
        ].filter(Boolean).join('\n'),
        startISO,
        endISO,
        timeZone: TIME_ZONE,
      });
    } catch (err) {
      console.error('createCalendarEvent failed', err);
      // Still record the booking even if the calendar write failed — the
      // barber's connect page can be used to reconnect, and the shop still
      // has the reservation on file.
    }
  }

  const { error: insertError } = await supabase.from('bookings').insert({
    id: body.id,
    barber_id: body.barberId,
    service_id: body.serviceId,
    service_name: body.serviceName,
    date: body.date,
    time_slot: body.timeSlot,
    duration_minutes: body.durationMinutes ?? null,
    customer_name: body.customerName,
    customer_phone: body.customerPhone,
    customer_email: body.customerEmail,
    extras: body.extras || [],
    total_price: body.totalPrice,
    status: 'bevestigd',
    google_event_id: googleEventId,
  });

  if (insertError) {
    console.error('insert booking failed', insertError);
    return new Response(JSON.stringify({ error: 'booking_save_failed' }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true, id: body.id, calendarSynced: !!googleEventId }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
