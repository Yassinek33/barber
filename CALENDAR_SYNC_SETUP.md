# Google Calendar sync — setup checklist

This connects each barber's own Google Calendar (which shows up natively in
the iPhone Calendar app) to the booking system. Once set up:

- A booking made on the site creates a real event on the assigned barber's calendar.
- A barber cancelling on the site removes that event from their calendar.
- A barber blocking time (or adding/removing events) directly on their phone
  is checked live — the site never shows a slot as free if their calendar
  says otherwise. No app, no extra login on their phone: it's their normal
  Google Calendar, which iOS can show inside the stock Calendar app.
- Each barber only ever sees/controls their own calendar. Nobody else's.

None of this requires touching code again — it's four account/config steps.
I can't do these for you: they need your identity, billing, and dashboard
access that I don't have.

## 1. Create a Supabase project (the shared database)

1. Go to supabase.com → New project (free tier is enough).
2. Once created, open **SQL Editor** → paste the contents of
   `supabase/schema.sql` from this repo → Run.
3. Go to **Project Settings → API** and note down:
   - `Project URL` → this is `SUPABASE_URL`
   - `service_role` secret key → this is `SUPABASE_SERVICE_ROLE_KEY`
   (Never put the service_role key in the frontend — it only goes into
   Netlify's environment variables, step 3.)

## 2. Create Google OAuth credentials

1. Go to console.cloud.google.com → create a project (any name, e.g. "Premium Barbershop Booking").
2. **APIs & Services → Library** → enable "Google Calendar API".
3. **APIs & Services → OAuth consent screen** → External → fill in app name,
   your email, etc. Add scope `.../auth/calendar`. You can leave it in
   "Testing" mode and add each barber's Google account under "Test users"
   (simplest for 3 people — avoids Google's app-review process).
4. **APIs & Services → Credentials → Create Credentials → OAuth client ID**
   → Application type: **Web application**.
   - Authorized redirect URI:
     `https://thepremiumbarbergroningen.netlify.app/api/google-oauth-callback`
5. Note down the **Client ID** and **Client secret**.

## 3. Add environment variables in Netlify

Netlify dashboard → your site → **Site configuration → Environment variables** → add:

| Key | Value |
|---|---|
| `SUPABASE_URL` | from step 1 |
| `SUPABASE_SERVICE_ROLE_KEY` | from step 1 |
| `GOOGLE_CLIENT_ID` | from step 2 |
| `GOOGLE_CLIENT_SECRET` | from step 2 |
| `GOOGLE_REDIRECT_URI` | `https://thepremiumbarbergroningen.netlify.app/api/google-oauth-callback` |
| `SITE_URL` | `https://thepremiumbarbergroningen.netlify.app` |

Then trigger a redeploy (Netlify → Deploys → Trigger deploy), so the
functions pick up the new variables.

## 4. Get each barber's private connect link

In Supabase → **Table Editor → barbers** (or SQL Editor, run
`select id, name, connect_token from barbers;`), copy each barber's
`connect_token`, then send them this link (swap in their id and token):

```
https://thepremiumbarbergroningen.netlify.app/team/majid/agenda?token=<connect_token>
```

Do this for `majid`, `ayoub`, and `yanti`. Keep these links private — anyone
with the link can connect a calendar for that barber.

## 5. What the barber does on their side

1. Open their link on their iPhone (Safari).
2. Tap "Koppel mijn Google Agenda" → sign in with their Google account
   (or create one, it's free) → allow calendar access.
3. To see it in the native iPhone Calendar app: **Settings → Calendar →
   Accounts → Add Account → Google** → sign in with the same account →
   enable "Calendars".

That's it — from then on their bookings appear on their phone automatically,
and blocking time on their phone removes it from the site's availability.
