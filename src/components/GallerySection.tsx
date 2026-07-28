import React, { useState } from 'react';
import { GALLERY_MEDIA } from '../data/barbershopData';
import { GalleryMediaItem } from '../types';
import { Camera, Scissors, Maximize2, X, Play, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { Reveal } from './Reveal';
import { useLanguage } from '../i18n/LanguageContext';

interface GallerySectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

type FilterType = 'all' | 'image' | 'video';

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectServiceToBook }) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryMediaItem | null>(null);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: t.gallery.filterAll },
    { id: 'image', label: t.gallery.filterPhotos },
    { id: 'video', label: t.gallery.filterVideos },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_MEDIA
    : GALLERY_MEDIA.filter(item => item.type === activeFilter);

  return (
    <section id="lookbook" className="py-20 bg-[#0B0B0E] relative border-t border-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow w-[480px] h-[480px] bg-amber-500/10 -bottom-32 left-1/3" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Camera className="w-3.5 h-3.5" />
            <span>{t.gallery.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t.gallery.title} <span className="gold-text-gradient">{t.gallery.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-sm">
            {t.gallery.subtitle}
          </p>
        </Reveal>

        {/* Filter Type Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === f.id
                  ? 'bg-amber-500 text-black shadow-lg scale-105'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {f.id === 'image' && <ImageIcon className="w-3.5 h-3.5" />}
              {f.id === 'video' && <VideoIcon className="w-3.5 h-3.5" />}
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:balance]">
          {filteredItems.map((item, idx) => (
            <Reveal key={item.id} delayMs={(idx % 4) * 70} className="mb-4 break-inside-avoid">
              <TiltCard
                onClick={() => setSelectedItem(item)}
                maxTilt={5}
                className="group rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-colors duration-300"
              >
                <div className="relative w-full">
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={t.gallery.imageAlt}
                      loading="lazy"
                      className="w-full h-auto block object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="relative w-full h-72 bg-gradient-to-br from-slate-800 via-slate-900 to-black">
                      <video
                        src={item.src}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
                        onMouseEnter={(e) => { e.currentTarget.play().catch(() => {}); }}
                        onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg shadow-amber-500/20">
                          <Play className="w-6 h-6 text-black translate-x-0.5" fill="currentColor" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 bg-black/50 px-2 py-0.5 rounded-full">
                          {t.gallery.videoLabel}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 text-white group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    {item.type === 'video' ? <Play className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/70 text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.src}
                  alt={t.gallery.imageAlt}
                  className="w-full h-auto max-h-[75vh] object-contain"
                />
              ) : (
                <video
                  src={selectedItem.src}
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  className="w-full max-h-[75vh] object-contain"
                />
              )}
            </div>

            <div className="p-6 flex items-center justify-between border-t border-slate-800">
              <span className="text-xs text-slate-400">{t.gallery.lightboxPrompt}</span>
              <button
                onClick={() => {
                  setSelectedItem(null);
                  onSelectServiceToBook('knippen');
                }}
                className="gold-button px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
              >
                <Scissors className="w-4 h-4" />
                <span>{t.gallery.lightboxCta}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
