import type { Context } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';
import { getFreeBusy } from './_lib/google';
import { SHOP_TIME_ZONE, zonedTimeToUtcISO } from './_lib/time';

const TIME_ZONE = SHOP_TIME_ZONE;

// GET /api/availability?barberId=majid&date=2026-08-01
// Returns the busy time ranges (ISO strings) for that barber on that day,
// read live from their connected Google Calendar — nothing is cached, so a
// slot they just blocked on their phone disappears from the site immediately.
export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const barberId = url.searchParams.get('barberId');
  const date = url.searchParams.get('date');

  if (!barberId || !date) {
    return new Response(JSON.stringify({ error: 'Missing barberId or date' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = getSupabaseAdmin();
  const { data: barber } = await supabase
    .from('barbers')
    .select('google_refresh_token, google_calendar_id, connected')
    .eq('id', barberId)
    .single();

  if (!barber || !barber.connected || !barber.google_refresh_token || !barber.google_calendar_id) {
    // Not connected yet — no external constraints beyond the shop's own hours.
    return new Response(JSON.stringify({ connected: false, busy: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const timeMin = zonedTimeToUtcISO(date, '00:00');
    const timeMax = zonedTimeToUtcISO(date, '23:59');
    const busy = await getFreeBusy(barber.google_refresh_token, barber.google_calendar_id, timeMin, timeMax);
    return new Response(JSON.stringify({ connected: true, busy, timeZone: TIME_ZONE }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('availability failed', err);
    // Fail safe: if we can't reach Google, don't block the whole booking
    // flow — just report no known conflicts for this request.
    return new Response(JSON.stringify({ connected: true, busy: [], warning: 'calendar_unreachable' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
