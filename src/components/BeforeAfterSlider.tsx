import React, { useState } from 'react';
import { SlidersHorizontal, Sparkles, Scissors, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  onOpenBooking: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenBooking }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  return (
    <section id="before-after" className="py-20 bg-[#0B0B0E] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Simulateur Interactif de Transformation</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Glissez pour comparer <br />
              <span className="gold-text-gradient">Avant vs Après</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Voyez la métamorphose en direct. Nos barbiers travaillent avec des techniques de coupe sur-mesure pour rééquilibrer la structure de votre visage et affûter votre ligne de barbe.
            </p>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">✓</div>
                <span>Dégradé progressif sans démarcation au millimètre près</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">✓</div>
                <span>Tracé de barbe au coupe-choux & serviette chaude apaisante</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">✓</div>
                <span>Styling naturel résistant toute la journée</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="gold-button px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
              >
                <Scissors className="w-4 h-4" />
                <span>Obtenir cette Transformation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Interactive Drag Slider Container */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl gold-border-glow select-none bg-slate-950">
              
              {/* Interactive Area */}
              <div
                className="relative h-80 sm:h-[420px] w-full cursor-ew-resize overflow-hidden touch-none"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
              >
                {/* AFTER IMAGE (Underneath, Full) */}
                <img
                  src="/barbers/apres.png"
                  alt="Après Transformation Haircut Skin Fade"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105"
                />
                <div className="absolute top-4 right-4 bg-emerald-500/90 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md uppercase tracking-wider">
                  Après (Skin Fade & Barbe Clean)
                </div>

                {/* BEFORE IMAGE (Clipped on top) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="/barbers/avant.png"
                    alt="Avant Transformation"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center filter grayscale brightness-90 contrast-120"
                    style={{ width: '100%', maxWidth: 'none' }}
                  />
                  <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs font-bold shadow-md uppercase tracking-wider">
                    Avant (Non Coiffé)
                  </div>
                </div>

                {/* SLIDER DRAGGABLE LINE & KNOB */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_#D4AF37]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 border-4 border-[#0B0B0E] shadow-2xl flex items-center justify-center text-black font-bold cursor-ew-resize">
                    <SlidersHorizontal className="w-5 h-5 text-black" />
                  </div>
                </div>

              </div>

              {/* Slider Instructional Bottom Bar */}
              <div className="bg-slate-900 px-4 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>◀ Déplacez le curseur pour comparer ▶</span>
                <span className="text-amber-400 font-medium hidden sm:inline">Modèle : Royal Combo Skin Fade</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
