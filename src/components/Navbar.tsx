import React, { useState, useEffect } from 'react';
import { Scissors, Calendar, Volume2, VolumeX, Menu, X, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';
import { audioSynth } from '../utils/audioSynth';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenMyBookings: () => void;
  onOpenAuditModal: () => void;
  myBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyBookings,
  onOpenAuditModal,
  myBookingsCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

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

  // Calculate live shop status in Groningen time
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sun, 1 Mon...
      const hour = now.getHours();
      
      // Sunday closed
      if (day === 0) {
        setIsOpenNow(false);
      } else if (hour >= 9 && hour < 19) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };
    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const state = audioSynth.toggle();
    setIsAudioPlaying(state);
  };

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
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#E5C158] to-[#996515] p-[1px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
                <Scissors className="w-4 h-4 text-[#E5C158] transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase text-white leading-none">
                THE PREMIUM
              </span>
              <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-semibold mt-0.5">
                BARBERSHOP GRONINGEN
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-widest font-bold text-zinc-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#barbers" className="hover:text-white transition-colors">Barbiers</a>
            <a href="#before-after" className="hover:text-white transition-colors">
              Avant / Après
            </a>
            <a href="#quiz" className="hover:text-white transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Quiz Style
            </a>
            <a href="#lookbook" className="hover:text-white transition-colors">Galerie</a>
            <a href="#reviews" className="hover:text-white transition-colors">Avis (4.9★)</a>
            <a href="#location" className="hover:text-white transition-colors">Accès</a>
          </nav>

          {/* Action Tools & Booking CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Live Status Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 border border-zinc-800 bg-zinc-900/50 text-[10px] uppercase tracking-wider">
              <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-zinc-300 font-bold">{isOpenNow ? 'Ouvert' : 'Fermé'}</span>
            </div>

            {/* Audit Benchmark Trigger */}
            <button
              onClick={onOpenAuditModal}
              className="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors flex items-center gap-1.5"
              title="Comparer avec l'ancien site"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Audit vs Ancien</span>
            </button>

            {/* ASMR Sound Ambient Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 border transition-all ${
                isAudioPlaying
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
              }`}
              title={isAudioPlaying ? 'Désactiver l\'ambiance ASMR' : 'Activer l\'ambiance sonore Barber ASMR'}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* My Bookings Drawer Trigger */}
            <button
              onClick={onOpenMyBookings}
              className="relative p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all"
              title="Mes rendez-vous enregistrés"
            >
              <Calendar className="w-4 h-4" />
              {myBookingsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-black font-black text-[9px] flex items-center justify-center">
                  {myBookingsCount}
                </span>
              )}
            </button>

            {/* Main Booking Button */}
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2 border border-white/20 bg-white text-black hover:bg-zinc-200 transition-colors text-[11px] uppercase tracking-widest font-black flex items-center gap-2"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Réserver RDV</span>
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="gold-button px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Réserver</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-amber-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0E]/95 backdrop-blur-xl border-b border-slate-800 px-4 py-6 space-y-4 text-slate-200 mt-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400' : 'bg-rose-500'}`} />
              <span className="text-slate-300">{isOpenNow ? 'Ouvert aujourd\'hui' : 'Fermé'}</span>
            </div>
            <button
              onClick={onOpenAuditModal}
              className="text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30"
            >
              Audit vs Ancien Site
            </button>
          </div>

          <nav className="flex flex-col gap-3 font-medium text-base">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Services & Tarifs
            </a>
            <a
              href="#barbers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Nos Barbiers
            </a>
            <a
              href="#before-after"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Simulateur Avant / Après
            </a>
            <a
              href="#quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Quiz Style Sur Mesure
            </a>
            <a
              href="#lookbook"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Galerie & Lookbook
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Avis Client (4.9/5★)
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400"
            >
              Localisation Groningen
            </a>
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
              <span>Mes Rendez-vous ({myBookingsCount})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full gold-button py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Scissors className="w-4 h-4" />
              <span>Réserver un Créneau</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
