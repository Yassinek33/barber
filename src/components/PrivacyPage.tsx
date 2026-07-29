import React from 'react';
import { ShieldCheck, Lock, Database, UserCheck, Mail, Trash2, KeyRound, Phone } from 'lucide-react';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';
import { SHOP_INFO } from '../data/barbershopData';

interface Section {
  icon: React.ElementType;
  title: string;
  body: string[];
}

const content = {
  nl: {
    badge: 'Vertrouwen & Transparantie',
    title: 'Veiligheid &',
    titleHighlight: 'Privacy',
    subtitle:
      'Uw gegevens toevertrouwen aan ons voor een afspraak is voor ons geen formaliteit. Hieronder leest u precies hoe wij ermee omgaan — zonder kleine lettertjes.',
    sections: [
      {
        icon: Database,
        title: 'Welke gegevens wij verzamelen',
        body: [
          'Wanneer u een afspraak boekt, vragen wij alleen wat nodig is om die afspraak goed te laten verlopen: uw naam, telefoonnummer en e-mailadres, samen met de gekozen behandeling, barbier, datum en tijd.',
          'Wij vragen nooit om betaalgegevens via de website — u betaalt eenvoudig in de zaak. Er wordt geen creditcard- of bankinformatie door ons verzameld of opgeslagen.',
        ],
      },
      {
        icon: Lock,
        title: 'Hoe uw gegevens worden beveiligd',
        body: [
          'Alle verbindingen tussen uw browser en onze servers zijn versleuteld (HTTPS). Uw gegevens worden opgeslagen in een beveiligde database die uitsluitend toegankelijk is voor de systemen die nodig zijn om uw afspraak te verwerken — nooit rechtstreeks vanaf de website.',
          'Toegang tot klantgegevens is technisch beperkt tot wat strikt noodzakelijk is. Er is geen publieke pagina of functie waarmee iemand de gegevens van andere klanten kan inzien.',
        ],
      },
      {
        icon: UserCheck,
        title: 'Wie uw gegevens ziet',
        body: [
          'Alleen de barbier bij wie u een afspraak heeft, ziet de details van die specifieke afspraak — in zijn of haar eigen, persoonlijke agenda. Barbiers hebben geen inzage in elkaars planning of klanten.',
          'Wij verkopen, verhuren of delen uw gegevens nooit met derden voor marketingdoeleinden. De enige partijen die (beperkt) betrokken zijn, zijn de technische dienstverleners die wij gebruiken om de website te laten werken: het versturen van uw bevestigingsmail en het synchroniseren van de afspraak met de agenda van uw barbier. Zij verwerken deze gegevens uitsluitend in onze opdracht.',
        ],
      },
      {
        icon: Trash2,
        title: 'Hoe lang wij gegevens bewaren',
        body: [
          'Wij bewaren uw boekingsgegevens niet langer dan redelijkerwijs nodig is: om uw afspraak te kunnen beheren, eventuele vervolgcommunicatie mogelijk te maken, en om bij een nieuwe reservering niet steeds opnieuw te hoeven beginnen.',
          'Wilt u dat uw gegevens eerder worden verwijderd? Neem gewoon contact met ons op — wij verwijderen uw persoonsgegevens dan zo snel als redelijkerwijs mogelijk is.',
        ],
      },
      {
        icon: KeyRound,
        title: 'Uw persoonlijke beheerlink',
        body: [
          'Na het boeken ontvangt u een e-mail met een unieke, persoonlijke link waarmee u uw afspraak zelf kunt bekijken, wijzigen of annuleren. Deze link bevat een lange, willekeurige beveiligingscode die niet te raden is en die alleen naar uw eigen e-mailadres wordt verstuurd.',
          'Deel deze link niet met anderen — iedereen die de link heeft, kan de afspraak beheren. Wij zullen u nooit per telefoon of e-mail om deze link of code vragen.',
        ],
      },
      {
        icon: ShieldCheck,
        title: 'Uw rechten',
        body: [
          'Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft u het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen, en om bezwaar te maken tegen het gebruik ervan.',
          'Voor alle vragen over uw gegevens of om een van deze rechten uit te oefenen, kunt u ons rechtstreeks bereiken — zie de contactgegevens hieronder.',
        ],
      },
    ] as Section[],
    contactTitle: 'Vragen over uw privacy?',
    contactBody: 'Neem gerust contact met ons op — wij helpen u graag verder.',
  },
  en: {
    badge: 'Trust & Transparency',
    title: 'Safety &',
    titleHighlight: 'Privacy',
    subtitle:
      "Trusting us with your details to book an appointment isn't a formality to us. Below you'll find exactly how we handle it — no fine print.",
    sections: [
      {
        icon: Database,
        title: 'What information we collect',
        body: [
          'When you book an appointment, we only ask for what is needed to make that appointment run smoothly: your name, phone number and email address, along with the chosen treatment, barber, date and time.',
          'We never ask for payment details through the website — you simply pay in-store. No card or banking information is collected or stored by us.',
        ],
      },
      {
        icon: Lock,
        title: 'How your data is protected',
        body: [
          'All connections between your browser and our servers are encrypted (HTTPS). Your data is stored in a secured database that is only accessible to the systems required to process your appointment — never directly from the website.',
          "Access to customer data is technically restricted to what is strictly necessary. There is no public page or feature through which anyone could view other customers' information.",
        ],
      },
      {
        icon: UserCheck,
        title: 'Who sees your data',
        body: [
          "Only the barber you booked with sees the details of that specific appointment — in their own, personal calendar. Barbers cannot see each other's schedules or clients.",
          'We never sell, rent or share your data with third parties for marketing purposes. The only parties with any (limited) involvement are the technical service providers we use to run the website: sending your confirmation email, and syncing the appointment with your barber\'s calendar. They only process this data on our instructions.',
        ],
      },
      {
        icon: Trash2,
        title: 'How long we keep your data',
        body: [
          "We don't keep your booking information any longer than reasonably necessary: to manage your appointment, allow for any follow-up communication, and to make future bookings quicker for you.",
          "Want your data removed sooner? Just get in touch — we'll delete your personal data as soon as reasonably possible.",
        ],
      },
      {
        icon: KeyRound,
        title: 'Your personal manage link',
        body: [
          'After booking, you receive an email with a unique, personal link that lets you view, change or cancel your own appointment. This link contains a long, random security code that cannot be guessed, and is only ever sent to your own email address.',
          "Don't share this link with anyone else — whoever has it can manage the appointment. We will never call or email you asking for this link or code.",
        ],
      },
      {
        icon: ShieldCheck,
        title: 'Your rights',
        body: [
          'Under the General Data Protection Regulation (GDPR), you have the right to access, correct or delete your data, and to object to how it is used.',
          'For any questions about your data, or to exercise any of these rights, you can reach us directly — see the contact details below.',
        ],
      },
    ] as Section[],
    contactTitle: 'Questions about your privacy?',
    contactBody: "Feel free to reach out — we're happy to help.",
  },
};

export const PrivacyPage: React.FC = () => {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <section className="py-20 bg-[#0F0F14] relative border-t border-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow w-[500px] h-[500px] bg-amber-500/10 -top-40 left-1/3" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <Reveal className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{c.badge}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {c.title} <span className="gold-text-gradient">{c.titleHighlight}</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </Reveal>

        <div className="space-y-6">
          {c.sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Reveal key={section.title} delayMs={idx * 60}>
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h2 className="font-display text-base sm:text-lg font-bold text-white">{section.title}</h2>
                  </div>
                  <div className="space-y-2.5 text-slate-300 text-sm leading-relaxed font-light">
                    {section.body.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delayMs={c.sections.length * 60} className="mt-10">
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
            <h2 className="font-display text-base font-bold text-white">{c.contactTitle}</h2>
            <p className="text-slate-300 text-sm">{c.contactBody}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <a
                href={`mailto:${SHOP_INFO.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-amber-500/50 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{SHOP_INFO.email}</span>
              </a>
              <a
                href={`tel:${SHOP_INFO.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-amber-500/50 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{SHOP_INFO.phone}</span>
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
