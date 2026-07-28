import React, { useState } from 'react';
import { Scissors, Star, MapPin, Sparkles, ShieldCheck, ChevronRight, Clock, Award } from 'lucide-react';
import { HERO_IMAGE_PATH, SHOP_INFO } from '../data/barbershopData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
  onOpenAuditModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenQuiz,
  onOpenAuditModal
}) => {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <section className="relative min-h-screen pt-24 pb-12 flex items-center justify-center overflow-hidden bg-[#0a0a0a] border-b border-white/10">
      
      {/* Dark overlay & subtle ambient backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE_PATH}
          alt="The Premium Barbershop Groningen"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">

        {/* Framed Showcase Photo - The Salon (golden-hour variant revealed in a spotlight that follows the cursor) */}
        <div className="relative mb-10 group">
          <div
            className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-[0_0_70px_-15px_rgba(212,175,55,0.45)] group-hover:shadow-[0_0_110px_-10px_rgba(212,175,55,0.75)] transition-shadow duration-700"
            onMouseMove={handlePhotoMouseMove}
            onMouseEnter={() => setIsSpotlightActive(true)}
            onMouseLeave={() => setIsSpotlightActive(false)}
          >
            {/* Base photo */}
            <img
              src={HERO_IMAGE_PATH}
              alt="Interieur van The Premium Barbershop Groningen"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-[480px] lg:h-[620px] object-cover object-center"
            />

            {/* Golden-hour photo — only revealed inside a spotlight that follows the cursor */}
            <img
              src="/barbers/home-gold.png"
              alt="The Premium Barbershop Groningen in gouden sfeer"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-300 ease-out"
              style={{
                opacity: isSpotlightActive ? 1 : 0,
                maskImage: `radial-gradient(circle 220px at ${spotlight.x}% ${spotlight.y}%, black 0%, black 55%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 220px at ${spotlight.x}% ${spotlight.y}%, black 0%, black 55%, transparent 100%)`
              }}
            />

            {/* Soft ring outlining the spotlight edge */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
              style={{
                opacity: isSpotlightActive ? 1 : 0,
                background: `radial-gradient(circle 220px at ${spotlight.x}% ${spotlight.y}%, transparent 62%, rgba(212,175,55,0.35) 64%, transparent 68%)`
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/15 to-transparent pointer-events-none" />

            {/* Hover hint badge */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <Sparkles className="w-3 h-3" />
              Gouden Sfeer
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9 flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  <Sparkles className="w-3 h-3" />
                  Onze Zaak
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-tight drop-shadow-lg mb-2">
                  {SHOP_INFO.name}
                </h2>
                <p className="hidden sm:block text-zinc-300 text-sm max-w-md font-light drop-shadow-lg">
                  Uw plek voor precisiekapsels en klassieke baardverzorging in het hart van Groningen.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-amber-400 text-xs font-bold bg-black/40 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{SHOP_INFO.googleRating}/5</span>
              </div>
            </div>
          </div>

          {/* Decorative corner frame accents */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-lg pointer-events-none transition-all duration-500 group-hover:-top-3 group-hover:-left-3 group-hover:w-10 group-hover:h-10" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-lg pointer-events-none transition-all duration-500 group-hover:-top-3 group-hover:-right-3 group-hover:w-10 group-hover:h-10" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-lg pointer-events-none transition-all duration-500 group-hover:-bottom-3 group-hover:-left-3 group-hover:w-10 group-hover:h-10" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg pointer-events-none transition-all duration-500 group-hover:-bottom-3 group-hover:-right-3 group-hover:w-10 group-hover:h-10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Hero Section (Professional Polish Design) */}
          <div className="lg:col-span-7 flex flex-col justify-between py-4 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-white/10">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 border border-zinc-700 text-[10px] tracking-[0.2em] uppercase font-bold text-zinc-400">
                  SINDS 2018
                </span>
                <span className="px-3 py-1 border border-amber-500/30 bg-amber-500/10 text-[10px] tracking-[0.2em] uppercase font-bold text-amber-300">
                  GRONINGEN WESTERHAVEN
                </span>
              </div>

              {/* Ultra Impactful Title */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter mb-6 italic text-white uppercase">
                SCHERP<br />
                <span className="text-zinc-500">GEKNIPT.</span><br />
                ZONDER<br />
                <span className="gold-text-gradient">ZORGEN.</span>
              </h1>

              <p className="text-zinc-400 max-w-lg text-sm leading-relaxed mb-8">
                Uitmuntende mannenverzorging in het hart van Groningen. Skin fade tot op de millimeter, baardtrim met het scheermes & warme handdoek. Snel, professioneel, zonder compromissen.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Online Reserveren</span>
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="px-6 py-3.5 border border-white/20 hover:bg-white/10 text-white transition-colors text-xs uppercase tracking-widest font-bold flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Stijl Quiz</span>
                </button>
              </div>

              {/* Audit Benchmark Link */}
              <button
                onClick={onOpenAuditModal}
                className="mb-8 flex items-center gap-2 text-[11px] uppercase tracking-wider text-amber-400/90 hover:text-amber-300 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Vergelijkingsrapport vs oude site (Prestaties & Snelheid)</span>
              </button>

              {/* Customer Rating Metric */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-full border-2 border-[#0a0a0a] bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-amber-400">4.9</div>
                  <div className="w-9 h-9 rounded-full border-2 border-[#0a0a0a] bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-white">M</div>
                  <div className="w-9 h-9 rounded-full border-2 border-[#0a0a0a] bg-zinc-600 flex items-center justify-center text-[10px] font-bold text-white">K</div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">4.9/5 BEOORDELING</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">488+ Geverifieerde Google Reviews</span>
                </div>
              </div>
            </div>

            {/* Bottom Location & Hours Strip */}
            <div className="flex flex-wrap gap-8 border-t border-white/10 pt-6 mt-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" /> Locatie
                </p>
                <p className="text-xs font-bold text-white">{SHOP_INFO.address}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" /> Openingstijden
                </p>
                <p className="text-xs font-bold text-white">{SHOP_INFO.openingHoursSummary}</p>
              </div>
            </div>
          </div>

          {/* Right Interaction Section: Integrated Booking System Widget */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-[#111111] p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 block">Reserveringsmodule</span>
                    <h2 className="text-lg font-black uppercase tracking-tight text-white italic">Direct Boeken</h2>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span>Beschikbaar</span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">
                      Aanbevolen Behandelingen
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => onOpenBooking('barber-cut')}
                        className="p-3 border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all text-left text-xs group"
                      >
                        <span className="block font-bold text-white group-hover:text-black">Knippen & Stylen</span>
                        <span className="text-zinc-400 group-hover:text-zinc-800 text-[10px]">30 min • €32</span>
                      </button>
                      <button
                        onClick={() => onOpenBooking('skin-fade')}
                        className="p-3 border border-white/10 hover:border-white/30 text-left text-xs hover:bg-white/5 transition-all group"
                      >
                        <span className="block font-bold text-white">Skin Fade</span>
                        <span className="text-zinc-500 group-hover:text-zinc-400 text-[10px]">45 min • €35</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-2 font-bold">
                      Eerstvolgende Beschikbare Tijden
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-2.5 border border-amber-400/50 bg-amber-400/10 text-center cursor-pointer" onClick={onOpenBooking}>
                        <span className="block text-[9px] text-amber-300 uppercase font-bold">Vandaag</span>
                        <span className="font-bold text-xs text-white">14:30</span>
                      </div>
                      <div className="p-2.5 border border-white/10 text-center hover:border-white/30 cursor-pointer" onClick={onOpenBooking}>
                        <span className="block text-[9px] text-zinc-500 uppercase">Vandaag</span>
                        <span className="font-bold text-xs text-zinc-300">16:00</span>
                      </div>
                      <div className="p-2.5 border border-white/10 text-center hover:border-white/30 cursor-pointer" onClick={onOpenBooking}>
                        <span className="block text-[9px] text-zinc-500 uppercase">Morgen</span>
                        <span className="font-bold text-xs text-zinc-300">10:00</span>
                      </div>
                      <div className="p-2.5 border border-white/10 text-center hover:border-white/30 cursor-pointer" onClick={onOpenBooking}>
                        <span className="block text-[9px] text-zinc-500 uppercase">Morgen</span>
                        <span className="font-bold text-xs text-zinc-300">11:15</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-wider text-white font-bold">Tevreden of Gratis Retouche</p>
                      <p className="text-[10px] text-zinc-400">Als de knipbeurt niet 100% naar wens is, bieden we binnen 7 dagen een gratis retouche.</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full bg-white text-black py-3.5 font-black uppercase tracking-[0.2em] text-xs mt-6 hover:bg-zinc-200 transition-colors"
              >
                Kies mijn Datum & Tijd
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
