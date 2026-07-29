# Booking confirmation emails — setup checklist

This sends every customer a professional confirmation email right after they
book, with the appointment summary and two buttons: **Afspraak wijzigen**
(reschedule, with a calendar + time picker) and **Afspraak annuleren**
(cancel). Both links are unique per booking (a secret token in the URL) — no
account or login needed on the customer's side.

I can't create the email account or add secrets to Netlify myself — that
needs your identity/billing and dashboard access. Two steps below, both quick.

## 1. Create a Resend account (the email sender)

1. Go to resend.com → sign up (free tier: 3,000 emails/month, plenty for a
   barbershop).
2. **API Keys** → Create API Key → name it anything (e.g. "barbershop") →
   copy the key. It's only shown once — if you lose it, just create a new one.
3. (Recommended, so emails don't land in spam and show your own address as
   sender) **Domains** → Add Domain → enter your own domain if you have one
   (e.g. `thepremiumbarbergroningen.nl`) → add the DNS records it shows you
   wherever you manage that domain's DNS → wait for it to verify (green).
   - **If you don't have your own domain yet**, skip this — emails will still
     send from Resend's shared test address, which works fine to start.

## 2. Add environment variables in Netlify

Netlify dashboard → your site → **Site configuration → Environment variables** → add:

| Key | Value |
|---|---|
| `RESEND_API_KEY` | the API key from step 1 |
| `EMAIL_FROM` | see below |

For `EMAIL_FROM`:
- If you verified your own domain in step 1: `The Premium Barbershop Groningen <reservering@jouwdomein.nl>` (must be `@` your verified domain).
- If you skipped domain verification: leave `EMAIL_FROM` out entirely — it
  automatically falls back to a working Resend test address so emails still
  send.

Then trigger a redeploy (Netlify → Deploys → Trigger deploy → "Clear cache
and deploy site") so the functions pick up the new variables.

## That's it

From the next booking onward, the customer automatically receives the
confirmation email. If `RESEND_API_KEY` isn't set yet, bookings still work
exactly as before — the site just skips sending the email (best-effort, never
blocks a reservation).

## Troubleshooting

**Customer never received the email**: check Netlify → your site →
**Functions → create-booking → logs** for a line like `sendBookingConfirmationEmail
failed` — it'll show the exact error from Resend (e.g. invalid API key, or
sender domain not verified yet).

**Emails go to spam**: this almost always means step 1's domain verification
isn't done — until then, Resend sends from a shared address that some inboxes
treat as less trustworthy. Verifying your own domain fixes it.
