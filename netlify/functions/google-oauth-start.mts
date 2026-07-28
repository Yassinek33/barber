import type { Context } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';
import { buildAuthUrl } from './_lib/google';

// GET /api/google-oauth-start?barberId=majid&token=<connect_token>
// Redirects the barber to Google's consent screen. The token must match the
// barber's private connect_token (from their personal connect link) so a
// stranger can't hijack another barber's calendar connection.
export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const barberId = url.searchParams.get('barberId');
  const token = url.searchParams.get('token');

  if (!barberId || !token) {
    return new Response('Missing barberId or token', { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: barber, error } = await supabase
    .from('barbers')
    .select('id, connect_token')
    .eq('id', barberId)
    .single();

  if (error || !barber || barber.connect_token !== token) {
    return new Response('Invalid or expired link', { status: 403 });
  }

  return new Response(null, {
    status: 302,
    headers: { Location: buildAuthUrl(barberId) },
  });
};
