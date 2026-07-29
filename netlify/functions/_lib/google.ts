import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name} environment variable`);
  return v;
}

export function getOAuthClient() {
  return new google.auth.OAuth2(
    getEnv('GOOGLE_CLIENT_ID'),
    getEnv('GOOGLE_CLIENT_SECRET'),
    getEnv('GOOGLE_REDIRECT_URI')
  );
}

// state carries the barber id through Google's redirect so the callback
// knows which barber to attach the resulting refresh token to.
export function buildAuthUrl(barberId: string): string {
  const client = getOAuthClient();
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent', // forces Google to always return a refresh_token, even on reconnect
    scope: SCOPES,
    state: barberId,
  });
}

export async function exchangeCodeForTokens(code: string) {
  const client = getOAuthClient();
  const { tokens } = await client.getToken(code);
  return tokens;
}

function clientFor(refreshToken: string) {
  const client = getOAuthClient();
  client.setCredentials({ refresh_token: refreshToken });
  return client;
}

// Busy [start, end) ranges (ISO strings) for the given calendar in a window.
export async function getFreeBusy(refreshToken: string, calendarId: string, timeMinISO: string, timeMaxISO: string) {
  const auth = clientFor(refreshToken);
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMinISO,
      timeMax: timeMaxISO,
      items: [{ id: calendarId }],
    },
  });
  const busy = res.data.calendars?.[calendarId]?.busy || [];
  return busy.map(b => ({ start: b.start as string, end: b.end as string }));
}

export async function createCalendarEvent(
  refreshToken: string,
  calendarId: string,
  event: { summary: string; description: string; startISO: string; endISO: string; timeZone: string }
) {
  const auth = clientFor(refreshToken);
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: event.summary,
      description: event.description,
      start: { dateTime: event.startISO, timeZone: event.timeZone },
      end: { dateTime: event.endISO, timeZone: event.timeZone },
    },
  });
  return res.data.id as string;
}

export async function updateCalendarEvent(
  refreshToken: string,
  calendarId: string,
  eventId: string,
  event: { startISO: string; endISO: string; timeZone: string }
) {
  const auth = clientFor(refreshToken);
  const calendar = google.calendar({ version: 'v3', auth });
  await calendar.events.patch({
    calendarId,
    eventId,
    requestBody: {
      start: { dateTime: event.startISO, timeZone: event.timeZone },
      end: { dateTime: event.endISO, timeZone: event.timeZone },
    },
  });
}

// Current state of a specific event, or null if it's gone (deleted or
// cancelled directly on the barber's phone) — used by the reconciliation
// job to detect changes the barber made outside the site.
export async function getCalendarEvent(
  refreshToken: string,
  calendarId: string,
  eventId: string
): Promise<{ startISO: string; endISO: string } | null> {
  const auth = clientFor(refreshToken);
  const calendar = google.calendar({ version: 'v3', auth });
  try {
    const res = await calendar.events.get({ calendarId, eventId });
    if (res.data.status === 'cancelled') return null;
    const startISO = res.data.start?.dateTime;
    const endISO = res.data.end?.dateTime;
    if (!startISO || !endISO) return null;
    return { startISO, endISO };
  } catch (err: unknown) {
    const status = (err as { code?: number })?.code;
    if (status === 404 || status === 410) return null;
    throw err;
  }
}

export async function deleteCalendarEvent(refreshToken: string, calendarId: string, eventId: string) {
  const auth = clientFor(refreshToken);
  const calendar = google.calendar({ version: 'v3', auth });
  try {
    await calendar.events.delete({ calendarId, eventId });
  } catch (err: unknown) {
    // Already gone (e.g. barber deleted it manually) — not an error for us.
    const status = (err as { code?: number })?.code;
    if (status !== 404 && status !== 410) throw err;
  }
}
