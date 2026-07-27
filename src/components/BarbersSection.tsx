import React from 'react';
import { BARBERS } from '../data/barbershopData';
import { Star, Instagram, Award, Scissors, CheckCircle } from 'lucide-react';

interface BarbersSectionProps {
  onSelectBarberToBook: (barberId: string) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarberToBook }) => {
  return (
    <section id="barbers" className="py-20 bg-[#0F0F14] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>Het Team van Master Barbiers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Kunstenaars van <span className="gold-text-gradient">Scheermes & Schaar</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Elk teamlid heeft jarenlange ervaring in een hoogwaardige zaak om u de perfecte knipbeurt te bieden.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="relative rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden group hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src={barber.avatarUrl}
                    alt={barber.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  
                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/30 text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{barber.rating}</span>
                    <span className="text-slate-400 font-normal">({barber.reviewsCount})</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-amber-500 text-black text-[11px] font-extrabold uppercase tracking-wider">
                    {barber.experienceYears} Jaar Ervaring
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {barber.name}
                      </h3>
                      <span className="text-xs text-amber-400/90 font-medium">{barber.nickname}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">{barber.role}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {barber.bio}
                  </p>

                  {/* Specialty Tags */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Specialiteiten:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {barber.specialties.map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700/60"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectBarberToBook(barber.id)}
                  className="w-full gold-button py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-102 transition-transform"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Reserveer bij {barber.name}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
