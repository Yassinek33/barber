import React from 'react';
import { Scissors, Award, Heart, ChevronRight, Users } from 'lucide-react';
import { Reveal } from './Reveal';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="over-ons" className="py-20 bg-[#0F0F14] relative border-t border-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow w-[500px] h-[500px] bg-amber-500/10 -top-40 left-1/3" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <Reveal className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5" />
            <span>Over Ons</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Het verhaal achter <span className="gold-text-gradient">de schaar</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Wie we zijn, waar we vandaan komen, en waarom vakmanschap bij ons nooit onderhandelbaar is.
          </p>
        </Reveal>

        {/* Body copy */}
        <Reveal delayMs={100} className="space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
          <p>
            The Premium Barbershop Groningen is opgericht door Majid, met een simpel maar niet-onderhandelbaar uitgangspunt: een knipbeurt is pas af als hij tot in de details klopt. Na jaren achter andermans stoel besloot hij zijn eigen zaak te openen aan het Zuiderdiep, in het hart van Groningen, met precies één doel: mannen een knipbeurt geven waar ze zonder twijfel weer voor terugkomen.
          </p>
          <p>
            Wat begon met één stoel groeide uit tot een vast team van master barbers, elk met hun eigen stijl maar dezelfde instelling: geen haastwerk, geen shortcuts. Skin fades die tot op de millimeter kloppen, baarden die met het scheermes worden afgewerkt, en een oog voor de details die het verschil maken tussen "goed" en "precies goed".
          </p>
          <p>
            Kappen is voor ons geen trend, het is een ambacht. Die filosofie zit in elke knip, van de eerste klant 's ochtends tot de laatste in de avond. Of je nu al jaren vaste klant bent of voor het eerst binnenstapt: je gaat weg met een kapsel waar je zelf tevreden mee bent, niet alleen wij.
          </p>
          <p>
            Daarom investeren we net zo hard in de sfeer als in de techniek. Een goede knipbeurt begint bij op je gemak zijn in de stoel, een goed gesprek, en een barbier die echt luistert naar wat je wilt. Dat is het verschil dat we elke dag opnieuw willen waarmaken.
          </p>
        </Reveal>

        {/* Values */}
        <Reveal delayMs={200} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs text-slate-300 font-medium">18 jaar vakmanschap</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Scissors className="w-4 h-4" />
            </div>
            <span className="text-xs text-slate-300 font-medium">Klassiek scheermes-werk</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs text-slate-300 font-medium">Een hecht team van master barbers</span>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delayMs={280} className="pt-10 text-center">
          <button
            onClick={onOpenBooking}
            className="gold-button px-6 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
          >
            <Scissors className="w-4 h-4" />
            <span>Maak Kennis in de Stoel</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </Reveal>

      </div>
    </section>
  );
};
