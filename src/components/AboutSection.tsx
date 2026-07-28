import React from 'react';
import { Scissors, Award, Heart, ChevronRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="over-ons" className="py-20 bg-[#0F0F14] relative border-t border-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow w-[440px] h-[440px] bg-amber-500/10 top-0 -left-32" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Portrait */}
          <Reveal className="lg:col-span-5">
            <TiltCard maxTilt={5} className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl gold-border-glow">
              <img
                src="/barbers/majid.png"
                alt="Majid, oprichter van The Premium Barbershop Groningen"
                referrerPolicy="no-referrer"
                className="w-full h-96 lg:h-[480px] object-cover object-center"
              />
            </TiltCard>
          </Reveal>

          {/* Text */}
          <Reveal className="lg:col-span-7 space-y-6" delayMs={150}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5" />
              <span>Over Ons</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Het verhaal achter <span className="gold-text-gradient">de schaar</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              The Premium Barbershop Groningen is opgericht door Majid, met een simpel maar niet-onderhandelbaar uitgangspunt: een knipbeurt is pas af als tot in de details klopt. Met 18 jaar ervaring achter de stoel bouwde hij een zaak aan het Zuiderdiep waar vakmanschap boven alles staat, en waar elke klant binnenkomt als klant en weggaat als vaste klant.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Kappen is voor ons geen trend, het is een ambacht. Scherp gelijnde skin fades, baarden die met het scheermes worden afgewerkt, en een oog voor de details die het verschil maken tussen "goed" en "precies goed". Die filosofie zit in elke knip, van de eerste tot de laatste klant van de dag.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-300 font-medium">18 jaar vakmanschap</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Scissors className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-300 font-medium">Klassiek scheermes-werk</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-300 font-medium">Persoonlijke aandacht</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="gold-button px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
              >
                <Scissors className="w-4 h-4" />
                <span>Maak Kennis in de Stoel</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

        </div>

      </div>
    </section>
  );
};
