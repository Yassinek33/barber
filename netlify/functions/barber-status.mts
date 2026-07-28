import type { Context } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';

// GET /api/barber-status?barberId=majid&token=<connect_token>
// Used by the private "connect my calendar" page to check whether this
// barber is already connected, without exposing anything to barbers who
// don't have the right link.
export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const barberId = url.searchParams.get('barberId');
  const token = url.searchParams.get('token');

  if (!barberId || !token) {
    return new Response(JSON.stringify({ error: 'Missing barberId or token' }), { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: barber, error } = await supabase
    .from('barbers')
    .select('id, name, connect_token, connected')
    .eq('id', barberId)
    .single();

  if (error || !barber || barber.connect_token !== token) {
    return new Response(JSON.stringify({ error: 'invalid_link' }), { status: 403 });
  }

  return new Response(JSON.stringify({ name: barber.name, connected: barber.connected }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
