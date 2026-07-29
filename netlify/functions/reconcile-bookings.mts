import type { Config } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';
import { getCalendarEvent } from './_lib/google';
import { zonedTimeToUtcISO, utcIsoToZonedDateTime } from './_lib/time';
import { sendBookingConfirmationEmail } from './_lib/email';

// A minute of slack absorbs rounding when converting back and forth between
// the stored HH:MM slot and Google's exact dateTime — anything bigger than
// that is a real change, not noise.
const DRIFT_TOLERANCE_MS = 60_000;

// Scheduled function (see config below) — the site only pushes changes made
// through its own booking flow onto Google Calendar. It has no way to know
// when a barber cancels or moves an appointment directly on their phone,
// which used to leave the customer un-notified and Supabase silently stale.
// This runs periodically, diffs every upcoming confirmed booking against
// the live calendar event, and reconciles both sides.
export default async (_req: Request) => {
  const supabase = getSupabaseAdmin();

  const { data: barbers } = await supabase
    .from('barbers')
    .select('id, name, google_refresh_token, google_calendar_id, connected')
    .eq('connected', true);

  if (!barbers || barbers.length === 0) {
    return new Response(JSON.stringify({ ok: true, checked: 0 }), { status: 200 });
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  let checked = 0;
  let cancelledCount = 0;
  let rescheduledCount = 0;

  for (const barber of barbers) {
    if (!barber.google_refresh_token || !barber.google_calendar_id) continue;

    const { data: bookings } = await supabase
      .from('bookings')
      .select('id, service_name, date, time_slot, duration_minutes, google_event_id, customer_name, customer_email, extras, total_price, manage_token')
      .eq('barber_id', barber.id)
      .eq('status', 'bevestigd')
      .not('google_event_id', 'is', null)
      .gte('date', todayStr);

    for (const booking of bookings || []) {
      checked++;
      try {
        const liveEvent = await getCalendarEvent(barber.google_refresh_token, barber.google_calendar_id, booking.google_event_id!);
        const siteUrl = process.env.SITE_URL || '';
        const manageUrl = `${siteUrl}/afspraak/${encodeURIComponent(booking.id)}?token=${encodeURIComponent(booking.manage_token || '')}`;

        if (!liveEvent) {
          // The barber deleted/cancelled the event directly on their phone.
          await supabase.from('bookings').update({ status: 'geannuleerd' }).eq('id', booking.id);
          cancelledCount++;
          try {
            await sendBookingConfirmationEmail({
              bookingId: booking.id,
              serviceName: booking.service_name,
              barberName: barber.name,
              date: booking.date,
              timeSlot: booking.time_slot,
              durationMinutes: booking.duration_minutes ?? undefined,
              extras: booking.extras || [],
              totalPrice: booking.total_price,
              customerName: booking.customer_name,
              customerEmail: booking.customer_email,
              manageUrl,
              variant: 'cancelled',
            });
          } catch (err) {
            console.error(`reconcile: cancellation email failed for booking ${booking.id}`, err);
          }
          continue;
        }

        const expectedStartISO = zonedTimeToUtcISO(booking.date, booking.time_slot);
        const drift = Math.abs(new Date(liveEvent.startISO).getTime() - new Date(expectedStartISO).getTime());
        if (drift > DRIFT_TOLERANCE_MS) {
          // The barber moved the event directly on their phone.
          const { date: newDate, time: newTime } = utcIsoToZonedDateTime(liveEvent.startISO);
          await supabase.from('bookings').update({ date: newDate, time_slot: newTime }).eq('id', booking.id);
          rescheduledCount++;
          try {
            await sendBookingConfirmationEmail({
              bookingId: booking.id,
              serviceName: booking.service_name,
              barberName: barber.name,
              date: newDate,
              timeSlot: newTime,
              durationMinutes: booking.duration_minutes ?? undefined,
              extras: booking.extras || [],
              totalPrice: booking.total_price,
              customerName: booking.customer_name,
              customerEmail: booking.customer_email,
              manageUrl,
              variant: 'reschedule',
            });
          } catch (err) {
            console.error(`reconcile: reschedule email failed for booking ${booking.id}`, err);
          }
        }
      } catch (err) {
        console.error(`reconcile: failed to check booking ${booking.id}`, err);
      }
    }
  }

  return new Response(JSON.stringify({ ok: true, checked, cancelledCount, rescheduledCount }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config: Config = {
  schedule: '*/10 * * * *',
};
