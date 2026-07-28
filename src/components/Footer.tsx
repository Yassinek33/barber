import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, MapPin, Phone, Mail, Instagram, ArrowUp } from 'lucide-react';
import { SHOP_INFO, SHOP_INFO_EN } from '../data/barbershopData';
import { useLanguage } from '../i18n/LanguageContext';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAuditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAuditModal }) => {
  const { t, lang, paths } = useLanguage();
  const tagline = lang === 'en' ? SHOP_INFO_EN.tagline : SHOP_INFO.tagline;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 text-zinc-400">

      {/* Footer Running Ticker Marquee (Professional Polish Signature) */}
      <div className="bg-white text-black py-2.5 overflow-hidden border-b border-white/20 select-none">
        <div className="animate-ticker font-black uppercase text-[10px] tracking-[0.4em] space-x-12">
          <span>{t.footer.ticker}</span>
          <span>{t.footer.ticker}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E5C158] to-[#996515] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-[#E5C158]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter uppercase text-white leading-none">
                  THE PREMIUM
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-500 font-bold">
                  BARBERSHOP GRONINGEN
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              {tagline}. {t.footer.taglineSuffix}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com/${SHOP_INFO.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 bg-zinc-900 hover:bg-white hover:text-black text-amber-400 border border-zinc-800 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onOpenAuditModal}
                className="text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-zinc-800 transition-colors"
              >
                {t.footer.auditVsOldSite}
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-[11px] uppercase tracking-widest font-black text-white">{t.footer.navigation}</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><Link to={paths.services} className="hover:text-white transition-colors">{t.footer.linkServices}</Link></li>
              <li><Link to={paths.barbers} className="hover:text-white transition-colors">{t.footer.linkBarbers}</Link></li>
              <li><Link to={`${paths.home}#before-after`} className="hover:text-white transition-colors">{t.footer.linkBeforeAfter}</Link></li>
              <li><Link to={paths.gallery} className="hover:text-white transition-colors">{t.footer.linkGallery}</Link></li>
              <li><Link to={`${paths.home}#reviews`} className="hover:text-white transition-colors">{t.footer.linkReviews}</Link></li>
              <li><Link to={paths.about} className="hover:text-white transition-colors">{t.nav.about}</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h4 className="text-[11px] uppercase tracking-widest font-black text-white">{t.footer.contactDetails}</h4>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{SHOP_INFO.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{SHOP_INFO.phone}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{SHOP_INFO.email}</span>
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 border border-white/20 bg-white text-black hover:bg-zinc-200 transition-colors text-[10px] uppercase tracking-widest font-black"
              >
                {t.footer.onlineReserveren}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} The Premium Barbershop Groningen. {t.footer.rightsReserved}</p>
          <button
            onClick={scrollToTop}
            className="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{t.footer.backToTop}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
