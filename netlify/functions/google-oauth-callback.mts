import type { Context } from '@netlify/functions';
import { getSupabaseAdmin } from './_lib/supabase';
import { exchangeCodeForTokens } from './_lib/google';

// GET /api/google-oauth-callback?code=...&state=<barberId>
// Google redirects here after the barber approves access. Exchanges the
// code for a refresh token and stores it against that barber, then sends
// them back to their connect page with a success/error flag.
export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const barberId = url.searchParams.get('state');
  const siteUrl = process.env.SITE_URL || url.origin;

  if (!code || !barberId) {
    return new Response('Missing code or state', { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // The connect page needs the barber's connect_token back in the URL to
  // re-validate itself after this redirect — without it, it just shows
  // "invalid link" even though the connection actually succeeded.
  const { data: barberRow } = await supabase
    .from('barbers')
    .select('connect_token')
    .eq('id', barberId)
    .single();
  const tokenParam = barberRow?.connect_token ? `&token=${encodeURIComponent(barberRow.connect_token)}` : '';

  const redirectTo = (connected: '0' | '1', reason?: string) =>
    new Response(null, {
      status: 302,
      headers: {
        Location: `${siteUrl}/team/${barberId}/agenda?connected=${connected}${reason ? `&reason=${reason}` : ''}${tokenParam}`,
      },
    });

  try {
    const tokens = await exchangeCodeForTokens(code);
    if (!tokens.refresh_token) {
      // Happens if the barber had already granted access before and Google
      // didn't re-issue a refresh token — ask them to revoke access in their
      // Google account and try connecting again.
      return redirectTo('0', 'no_refresh_token');
    }

    const { error } = await supabase
      .from('barbers')
      .update({
        google_refresh_token: tokens.refresh_token,
        google_calendar_id: 'primary',
        connected: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', barberId);

    if (error) throw error;

    return redirectTo('1');
  } catch (err) {
    console.error('google-oauth-callback failed', err);
    return redirectTo('0', 'error');
  }
};
