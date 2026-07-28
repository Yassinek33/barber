import type { Context } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';
import { getFreeBusy } from './_lib/google';

const TIME_ZONE = 'Europe/Amsterdam';

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
    const timeMin = new Date(`${date}T00:00:00`).toISOString();
    const timeMax = new Date(`${date}T23:59:59`).toISOString();
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
