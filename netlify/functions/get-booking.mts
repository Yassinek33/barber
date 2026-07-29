import type { Context } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';
import { getBarberPhone, hoursUntil, MANAGE_DEADLINE_HOURS } from './_lib/barberContact';

// GET /api/get-booking?id=PBG-1234&token=<manage_token>
// Powers the customer-facing "manage my booking" page. The manage_token is
// the only thing standing between a booking id (visible in the URL/email)
// and someone else's appointment details, so a mismatch must look exactly
// like "not found" — never leak which part was wrong.
export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const token = url.searchParams.get('token');

  if (!id || !token) {
    return new Response(JSON.stringify({ error: 'missing_params' }), { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('id, barber_id, service_id, service_name, date, time_slot, duration_minutes, customer_name, customer_email, extras, total_price, status, manage_token')
    .eq('id', id)
    .single();

  if (error || !booking || booking.manage_token !== token) {
    return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });
  }

  const { data: barber } = await supabase
    .from('barbers')
    .select('id, name')
    .eq('id', booking.barber_id)
    .single();

  const hoursLeft = hoursUntil(booking.date, booking.time_slot);
  const pastDeadline = hoursLeft < MANAGE_DEADLINE_HOURS;
  const canManage = booking.status === 'bevestigd' && !pastDeadline;

  return new Response(JSON.stringify({
    id: booking.id,
    barberId: booking.barber_id,
    barberName: barber?.name || booking.barber_id,
    barberPhone: getBarberPhone(booking.barber_id),
    serviceId: booking.service_id,
    serviceName: booking.service_name,
    date: booking.date,
    timeSlot: booking.time_slot,
    durationMinutes: booking.duration_minutes,
    customerName: booking.customer_name,
    customerEmail: booking.customer_email,
    extras: booking.extras || [],
    totalPrice: booking.total_price,
    status: booking.status,
    canManage,
    pastDeadline,
    deadlineHours: MANAGE_DEADLINE_HOURS,
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
