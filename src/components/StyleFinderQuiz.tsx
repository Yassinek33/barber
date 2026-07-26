import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, Scissors, Crown } from 'lucide-react';
import { BARBER_SERVICES } from '../data/barbershopData';

interface StyleFinderQuizProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const StyleFinderQuiz: React.FC<StyleFinderQuizProps> = ({ onSelectServiceToBook }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    faceShape: '',
    hairType: '',
    maintenance: ''
  });
  const [recommendedStyle, setRecommendedStyle] = useState<any | null>(null);

  const faceShapes = [
    { id: 'oval', label: 'Ovale / Carré', desc: 'S\'adapte à presque toutes les coupes' },
    { id: 'round', label: 'Rond', desc: 'Besoin de hauteur et de dégradé sur les côtés' },
    { id: 'elongated', label: 'Allongé / Fin', desc: 'Préfère du volume équilibré sur les côtés' }
  ];

  const hairTypes = [
    { id: 'straight', label: 'Lisses / Fins', desc: 'Idéal pour Crop texturisé ou Side-Part' },
    { id: 'wavy', label: 'Ondulés / Épais', desc: 'Parfait pour Pompadour ou Slick Back' },
    { id: 'curly', label: 'Frisés / Crépus', desc: 'Sublimés par un Low Skin Fade net' }
  ];

  const maintenanceLevels = [
    { id: 'low', label: 'Express (1 à 2 min)', desc: 'Peu de coiffage, prêt en un coup de peigne' },
    { id: 'medium', label: 'Standard (5 min)', desc: 'Application rapide de cire mat ou pommade' },
    { id: 'high', label: 'Soigné (10 min+)', desc: 'Sèche-cheveux, brosse et finition parfaite' }
  ];

  const handleSelectAnswer = (key: 'faceShape' | 'hairType' | 'maintenance', val: string) => {
    const updated = { ...answers, [key]: val };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate Result
      calculateRecommendation(updated);
      setStep(4);
    }
  };

  const calculateRecommendation = (ans: typeof answers) => {
    // Determine style match
    if (ans.faceShape === 'round' || ans.hairType === 'curly') {
      setRecommendedStyle({
        title: "Precision Low Skin Fade & Textured Top",
        serviceId: "skin-fade",
        serviceName: "Precision Skin Fade & Contour",
        price: 32,
        desc: "Ce style apporte de la hauteur et affine les contours de votre visage tout en conservant une structure très propre sur les côtés.",
        imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80"
      });
    } else if (ans.maintenance === 'high' || ans.hairType === 'wavy') {
      setRecommendedStyle({
        title: "Royal Combo (Coupe Pompadour + Barbe VIP)",
        serviceId: "royal-combo",
        serviceName: "Royal Combo (Coupe + Barbe VIP)",
        price: 49,
        desc: "L'accord parfait : une coupe sculptée avec du volume élégant associée à un traçage de barbe millimétré à la serviette chaude.",
        imageUrl: "https://images.unsplash.com/photo-[#503443207922]?w=600&auto=format&fit=crop&q=80"
      });
    } else {
      setRecommendedStyle({
        title: "Gentleman Classic Cut & Beard Lineup",
        serviceId: "classic-cut",
        serviceName: "Gentleman Classic Cut",
        price: 28,
        desc: "Une coupe intemporelle, soignée et très facile à entretenir au quotidien avec un rendu naturel.",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"
      });
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ faceShape: '', hairType: '', maintenance: '' });
    setRecommendedStyle(null);
  };

  return (
    <section id="quiz" className="py-20 bg-[#0F0F14] relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Assistant Diagnostic de Style</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Quelle coupe est faite <span className="gold-text-gradient">pour vous ?</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Répondez à 3 questions rapides pour obtenir la recommandation personnalisée de nos maîtres barbiers.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Progress Bar */}
          {step <= 3 && (
            <div className="mb-8">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Étape {step} sur 3</span>
                <span>{Math.round((step / 3) * 100)}% Complété</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: Face Shape */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-white text-center">
                1. Quelle est la forme principale de votre visage ?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {faceShapes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectAnswer('faceShape', item.id)}
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 text-left transition-all hover:scale-102 group"
                  >
                    <p className="font-bold text-white group-hover:text-amber-400 text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Hair Type */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-white text-center">
                2. Quel est la nature de vos cheveux ?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {hairTypes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectAnswer('hairType', item.id)}
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 text-left transition-all hover:scale-102 group"
                  >
                    <p className="font-bold text-white group-hover:text-amber-400 text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Maintenance */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-display text-xl font-bold text-white text-center">
                3. Combien de temps consacrez-vous au coiffage le matin ?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {maintenanceLevels.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectAnswer('maintenance', item.id)}
                    className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/60 text-left transition-all hover:scale-102 group"
                  >
                    <p className="font-bold text-white group-hover:text-amber-400 text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULT */}
          {step === 4 && recommendedStyle && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Style Recommandé pour vous</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {recommendedStyle.title}
              </h3>

              <div className="max-w-xl mx-auto p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {recommendedStyle.desc}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Prestation correspondante : <strong className="text-white">{recommendedStyle.serviceName}</strong></span>
                  <span className="text-amber-400 font-bold text-base">{recommendedStyle.price}€</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refaire le Quiz</span>
                </button>

                <button
                  onClick={() => onSelectServiceToBook(recommendedStyle.serviceId)}
                  className="gold-button px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Réserver ce Style Recommandé</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
