const SHOP_NAME = 'The Premium Barbershop Groningen';
const SHOP_ADDRESS = 'Gedempte Zuiderdiep 116, 9711 HM Groningen';
const SHOP_PHONE = '06-84289005';
const GOLD = '#D4AF37';

export interface BookingEmailData {
  bookingId: string;
  serviceName: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  durationMinutes?: number;
  extras: { name: string; price: number }[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  manageUrl: string;
  variant?: 'confirmation' | 'reschedule' | 'cancelled';
}

const VARIANT_COPY = {
  confirmation: {
    eyebrow: 'Reservering bevestigd',
    intro: 'Bedankt voor je reservering! Hieronder vind je een overzicht van je afspraak.',
    subject: 'Bevestiging afspraak',
  },
  reschedule: {
    eyebrow: 'Afspraak gewijzigd',
    intro: 'Je afspraak is verzet. Hieronder vind je het bijgewerkte overzicht.',
    subject: 'Afspraak gewijzigd',
  },
  cancelled: {
    eyebrow: 'Afspraak geannuleerd',
    intro: 'Je afspraak is geannuleerd. Hieronder vind je de gegevens van de geannuleerde afspraak.',
    subject: 'Afspraak geannuleerd',
  },
} as const;

function formatDateLongNL(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  const formatted = d.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function buildConfirmationHtml(b: BookingEmailData): string {
  const variant = b.variant || 'confirmation';
  const copy = VARIANT_COPY[variant];
  const siteUrl = (() => {
    try { return new URL(b.manageUrl).origin; } catch { return ''; }
  })();

  const extrasRows = b.extras.length
    ? b.extras.map(e => `
        <tr>
          <td style="padding:4px 0;color:#94a3b8;font-size:13px;">+ ${e.name}</td>
          <td style="padding:4px 0;color:#94a3b8;font-size:13px;text-align:right;">€${e.price}</td>
        </tr>`).join('')
    : '';

  const actionsHtml = variant === 'cancelled'
    ? `<tr>
        <td align="center">
          <a href="${siteUrl}" style="display:inline-block;width:100%;box-sizing:border-box;background:linear-gradient(135deg,${GOLD},#b8942e);color:#0B0B0E;text-decoration:none;font-weight:bold;font-size:13px;padding:13px 0;border-radius:10px;text-align:center;">
            Nieuwe afspraak maken
          </a>
        </td>
      </tr>`
    : `<tr>
        <td align="center" style="padding-bottom:12px;">
          <a href="${b.manageUrl}&action=wijzigen" style="display:inline-block;width:100%;box-sizing:border-box;background:linear-gradient(135deg,${GOLD},#b8942e);color:#0B0B0E;text-decoration:none;font-weight:bold;font-size:13px;padding:13px 0;border-radius:10px;text-align:center;">
            Afspraak wijzigen
          </a>
        </td>
      </tr>
      <tr>
        <td align="center">
          <a href="${b.manageUrl}&action=annuleren" style="display:inline-block;width:100%;box-sizing:border-box;background:transparent;border:1px solid rgba(244,63,94,0.4);color:#fb7185;text-decoration:none;font-weight:bold;font-size:13px;padding:12px 0;border-radius:10px;text-align:center;">
            Afspraak annuleren
          </a>
        </td>
      </tr>`;

  return `<!doctype html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0B0B0E;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0B0B0E;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#111114;border:1px solid rgba(212,175,55,0.3);border-radius:16px;overflow:hidden;">

          <tr>
            <td style="padding:32px 32px 16px 32px;text-align:center;border-bottom:1px solid rgba(212,175,55,0.15);">
              <div style="font-size:11px;letter-spacing:3px;color:${GOLD};text-transform:uppercase;margin-bottom:6px;">${copy.eyebrow}</div>
              <div style="font-size:22px;font-weight:bold;color:#ffffff;">${SHOP_NAME}</div>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <p style="color:#e2e8f0;font-size:15px;margin:0 0 4px 0;">Hallo ${b.customerName},</p>
              <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin:0;">${copy.intro}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1f;border:1px solid rgba(212,175,55,0.2);border-radius:12px;padding:20px;">
                <tr><td colspan="2" style="padding:0 0 12px 0;">
                  <span style="display:inline-block;background:rgba(212,175,55,0.15);color:${GOLD};font-size:11px;font-weight:bold;letter-spacing:1px;padding:4px 10px;border-radius:6px;">#${b.bookingId}</span>
                </td></tr>
                <tr>
                  <td style="padding:6px 0;color:#64748b;font-size:12px;width:40%;">Dienst</td>
                  <td style="padding:6px 0;color:#ffffff;font-size:14px;font-weight:bold;text-align:right;">${b.serviceName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#64748b;font-size:12px;">Barbier</td>
                  <td style="padding:6px 0;color:#ffffff;font-size:14px;text-align:right;">${b.barberName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#64748b;font-size:12px;">Datum</td>
                  <td style="padding:6px 0;color:#ffffff;font-size:14px;text-align:right;">${formatDateLongNL(b.date)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#64748b;font-size:12px;">Tijd</td>
                  <td style="padding:6px 0;color:#ffffff;font-size:14px;text-align:right;">${b.timeSlot}${b.durationMinutes ? ` (${b.durationMinutes} min)` : ''}</td>
                </tr>
                ${extrasRows}
                <tr><td colspan="2" style="padding-top:10px;border-top:1px solid rgba(212,175,55,0.15);"></td></tr>
                <tr>
                  <td style="padding:8px 0 0 0;color:#e2e8f0;font-size:14px;font-weight:bold;">Totaal</td>
                  <td style="padding:8px 0 0 0;color:${GOLD};font-size:18px;font-weight:bold;text-align:right;">€${b.totalPrice}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 32px 28px 32px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${actionsHtml}
              </table>
              ${variant !== 'cancelled' ? `<p style="color:#475569;font-size:11px;margin:14px 0 0 0;">
                Of beheer je afspraak via: <a href="${b.manageUrl}" style="color:${GOLD};">${b.manageUrl}</a>
              </p>` : ''}
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px;background:#0d0d10;border-top:1px solid rgba(212,175,55,0.15);text-align:center;">
              <p style="color:#64748b;font-size:11px;margin:0 0 4px 0;">${SHOP_NAME}</p>
              <p style="color:#475569;font-size:11px;margin:0;">${SHOP_ADDRESS} · ${SHOP_PHONE}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Best-effort transactional email via the Resend REST API — no SDK
// dependency, just a fetch call. Callers should catch/log failures rather
// than let a broken email provider block the booking flow itself.
export async function sendBookingConfirmationEmail(data: BookingEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('sendBookingConfirmationEmail: RESEND_API_KEY not set, skipping email');
    return;
  }
  const from = process.env.EMAIL_FROM || `${SHOP_NAME} <onboarding@resend.dev>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: data.customerEmail,
      subject: `${VARIANT_COPY[data.variant || 'confirmation'].subject} #${data.bookingId} — ${SHOP_NAME}`,
      html: buildConfirmationHtml(data),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Resend API error ${res.status}: ${text}`);
  }
}
