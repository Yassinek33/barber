import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../data/barbershopData';
import { LookbookItem } from '../types';
import { Camera, Scissors, Maximize2, X, ChevronRight } from 'lucide-react';

interface GallerySectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLook, setSelectedLook] = useState<LookbookItem | null>(null);

  const categories = [
    { id: 'all', label: 'Alle Stijlen' },
    { id: 'fades', label: 'Skin Fades' },
    { id: 'beards', label: 'Baardtrim' },
    { id: 'combos', label: 'Combo Pakketten' },
    { id: 'classics', label: 'Klassieke Knipbeurten' },
  ];

  const filteredItems = activeCategory === 'all'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="lookbook" className="py-20 bg-[#0B0B0E] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>Lookbook & Barbier Inspiratie</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Galerij van onze <span className="gold-text-gradient">Creaties</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Alle getoonde kapsels zijn gemaakt bij onze klanten in de zaak in Groningen.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-black shadow-lg scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedLook(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 text-white group-hover:bg-amber-500 group-hover:text-black transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h3 className="font-display font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedLook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedLook(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/70 text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 w-full overflow-hidden">
              <img
                src={selectedLook.imageUrl}
                alt={selectedLook.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-display text-xl font-bold text-white">{selectedLook.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedLook.description}</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <span className="text-xs text-slate-400">Klaar voor dit kapsel?</span>
                <button
                  onClick={() => {
                    const sId = selectedLook.serviceIdToBook;
                    setSelectedLook(null);
                    onSelectServiceToBook(sId);
                  }}
                  className="gold-button px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Reserveer dit Kapsel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
