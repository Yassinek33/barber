import React from 'react';
import { Scissors, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface VideoHeroProps {
  onOpenBooking: () => void;
}

// Full-bleed cinematic video intro — the very first thing a visitor sees,
// above the existing Hero section (which keeps all of its own content,
// just pushed further down the page).
export const VideoHero: React.FC<VideoHeroProps> = ({ onOpenBooking }) => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-black">
      <video
        className="hero-video-zoom absolute inset-0 w-full h-full object-cover"
        src="/barbers/hero-video.mp4"
        poster="/barbers/home-gold.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Cinematic grading + vignette so the overlay content stays legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-[#0B0B0E]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 220px 70px rgba(0,0,0,0.85)' }}
      />
      <div className="tech-grid absolute inset-0 opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center gap-7">

        {/* Futuristic framed icon */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          <div className="hud-ring-outer absolute inset-0 rounded-full" />
          <div className="hud-ring absolute inset-[6px] rounded-full" />
          <div className="absolute inset-[14px] rounded-full bg-black/60 backdrop-blur-sm border border-amber-400/30 gold-border-glow" />
          <Scissors className="relative w-8 h-8 sm:w-9 sm:h-9 text-amber-300 -rotate-45" />
        </div>

        <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-amber-300/90 font-semibold">
          The Premium Barbershop Groningen
        </p>

        <button
          onClick={onOpenBooking}
          className="gold-button neon-cta px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest inline-flex items-center gap-3"
        >
          <Scissors className="w-4 h-4" />
          <span>{t.nav.bookNow}</span>
        </button>

        <div className="absolute bottom-8 text-amber-300/60 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};
