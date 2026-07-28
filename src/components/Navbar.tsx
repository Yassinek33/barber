import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Scissors, Calendar, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';
import { Magnetic } from './Magnetic';
import { useLanguage, getSwitchedPath } from '../i18n/LanguageContext';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenMyBookings: () => void;
  myBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyBookings,
  myBookingsCount
}) => {
  const { lang, t, paths } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const state = audioSynth.toggle();
    setIsAudioPlaying(state);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative pb-1 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-gradient-to-r after:from-amber-400 after:to-amber-200 after:transition-all after:duration-300 ${
      isActive ? 'text-amber-400 after:w-full' : 'hover:text-amber-300 after:w-0 hover:after:w-full'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `py-1 text-left transition-colors duration-300 ${isActive ? 'text-amber-400' : 'hover:text-amber-300'}`;

  const nlPath = getSwitchedPath(location.pathname, location.hash, 'nl');
  const enPath = getSwitchedPath(location.pathname, location.hash, 'en');

  const LanguageSwitcher: React.FC<{ className?: string; compact?: boolean }> = ({ className = '', compact = false }) => (
    <div className={`flex items-center gap-0.5 ${compact ? 'p-0.5' : 'p-1 gap-1'} rounded-lg bg-zinc-900 border border-zinc-800 ${className}`}>
      <Link
        to={nlPath}
        aria-label="Nederlands"
        className={`${compact ? 'px-1 py-0.5 text-sm' : 'px-1.5 py-1 text-base'} rounded-md leading-none transition-all ${lang === 'nl' ? 'bg-zinc-800 ring-1 ring-amber-400/60' : 'opacity-50 hover:opacity-90'}`}
      >
        🇳🇱
      </Link>
      <Link
        to={enPath}
        aria-label="English"
        className={`${compact ? 'px-1 py-0.5 text-sm' : 'px-1.5 py-1 text-base'} rounded-md leading-none transition-all ${lang === 'en' ? 'bg-zinc-800 ring-1 ring-amber-400/60' : 'opacity-50 hover:opacity-90'}`}
      >
        🇬🇧
      </Link>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Logo */}
          <Link to={paths.home} className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#E5C158] to-[#996515] p-[1px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                <Scissors className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E5C158] transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black tracking-tighter uppercase text-white leading-none whitespace-nowrap">
                THE PREMIUM
              </span>
              <span className="hidden sm:block text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-semibold mt-0.5">
                BARBERSHOP GRONINGEN
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-widest font-bold text-zinc-400">
            <NavLink to={paths.services} className={navLinkClass}>
              {t.nav.services}
            </NavLink>
            <NavLink to={paths.barbers} className={navLinkClass}>
              {t.nav.barbers}
            </NavLink>
            <NavLink to={paths.gallery} className={navLinkClass}>
              {t.nav.gallery}
            </NavLink>
            <NavLink to={paths.about} className={navLinkClass}>
              {t.nav.about}
            </NavLink>
          </nav>

          {/* Action Tools & Booking CTAs */}
          <div className="hidden sm:flex items-center gap-3">

            <LanguageSwitcher />

            {/* ASMR Sound Ambient Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 border transition-all ${
                isAudioPlaying
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
              }`}
              title={isAudioPlaying ? t.nav.asmrDisable : t.nav.asmrEnable}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* My Bookings Drawer Trigger */}
            <button
              onClick={onOpenMyBookings}
              className="relative p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all"
              title={t.nav.myAppointments}
            >
              <Calendar className="w-4 h-4" />
              {myBookingsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-black font-black text-[9px] flex items-center justify-center">
                  {myBookingsCount}
                </span>
              )}
            </button>

            {/* Main Booking Button */}
            <Magnetic strength={14}>
              <button
                onClick={() => onOpenBooking()}
                className="neon-cta px-5 py-2 border border-amber-300 bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-black hover:from-amber-300 hover:to-amber-300 transition-colors text-[11px] uppercase tracking-widest font-black flex items-center gap-2"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>{t.nav.bookNow}</span>
              </button>
            </Magnetic>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex items-center gap-1.5 lg:hidden shrink-0">
            <LanguageSwitcher compact />
            <button
              onClick={() => onOpenBooking()}
              aria-label={t.nav.bookNow}
              title={t.nav.bookNow}
              className="gold-button neon-cta p-1.5 rounded-lg flex items-center justify-center shrink-0"
            >
              <Scissors className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400 shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer — mirrors the desktop nav exactly, nothing extra */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0E]/95 backdrop-blur-xl border-b border-slate-800 px-4 py-6 space-y-4 text-slate-200 mt-2">
          <nav className="flex flex-col gap-3 font-medium text-base">
            <NavLink to={paths.services} onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
              {t.nav.services}
            </NavLink>
            <NavLink to={paths.barbers} onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
              {t.nav.barbers}
            </NavLink>
            <NavLink to={paths.gallery} onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
              {t.nav.gallery}
            </NavLink>
            <NavLink to={paths.about} onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
              {t.nav.about}
            </NavLink>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyBookings();
              }}
              className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{t.nav.myAppointments} ({myBookingsCount})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full gold-button neon-cta py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Scissors className="w-4 h-4" />
              <span>{t.nav.mobileReserveSlot}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
