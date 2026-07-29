import type { Context } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';
import { deleteCalendarEvent } from './_lib/google';

// POST /api/cancel-booking  body: { bookingId: string, manageToken?: string }
// Deletes the event from the barber's Google Calendar (freeing the slot on
// their phone too) and marks the booking cancelled in Supabase. When called
// from the customer-facing "manage my booking" email link, manageToken must
// be present and match — that's what makes the link safe to send unauthenticated.
export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  let bookingId: string | undefined;
  let manageToken: string | undefined;
  try {
    const body = await req.json();
    bookingId = body.bookingId;
    manageToken = body.manageToken;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  if (!bookingId) {
    return new Response(JSON.stringify({ error: 'Missing bookingId' }), { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: booking } = await supabase
    .from('bookings')
    .select('barber_id, google_event_id, status, manage_token')
    .eq('id', bookingId)
    .single();

  if (!booking) {
    return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });
  }

  if (manageToken && booking.manage_token !== manageToken) {
    return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });
  }

  if (booking.google_event_id) {
    const { data: barber } = await supabase
      .from('barbers')
      .select('google_refresh_token, google_calendar_id, connected')
      .eq('id', booking.barber_id)
      .single();

    if (barber?.connected && barber.google_refresh_token && barber.google_calendar_id) {
      try {
        await deleteCalendarEvent(barber.google_refresh_token, barber.google_calendar_id, booking.google_event_id);
      } catch (err) {
        console.error('deleteCalendarEvent failed', err);
      }
    }
  }

  const { error: updateError } = await supabase
    .from('bookings')
    .update({ status: 'geannuleerd' })
    .eq('id', bookingId);

  if (updateError) {
    console.error('cancel booking update failed', updateError);
    return new Response(JSON.stringify({ error: 'cancel_failed' }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
