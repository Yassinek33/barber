import React, { useEffect, useState } from 'react';
import { Scissors } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Full-screen intro overlay shown once when the app first loads: the brand
// mark draws itself in with a gold progress ring, holds briefly, then
// fades away to reveal the home page underneath.
export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [ringComplete, setRingComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ringTimer = setTimeout(() => setRingComplete(true), 80);
    const exitTimer = setTimeout(() => setIsExiting(true), 1700);
    const finishTimer = setTimeout(() => {
      document.body.style.overflow = '';
      onFinish();
    }, 2350);

    return () => {
      clearTimeout(ringTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = '';
    };
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
      style={{
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.06)' : 'scale(1)',
        transition: 'opacity 600ms ease-in, transform 600ms ease-in',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      <div className="tech-grid absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative flex flex-col items-center gap-4 sm:gap-5">
        {/* Logo mark with animated progress ring */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#27272a" strokeWidth="1.5" />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={ringComplete ? 0 : CIRCUMFERENCE}
              style={{ transition: 'stroke-dashoffset 1500ms cubic-bezier(0.65,0,0.35,1)' }}
            />
          </svg>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#E5C158] to-[#996515] p-[1px] flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center">
              <Scissors className="splash-icon w-7 h-7 sm:w-8 sm:h-8 text-[#E5C158]" />
            </div>
          </div>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-1">
          <span className="splash-text-1 text-lg sm:text-xl font-black tracking-tighter uppercase text-white leading-none">
            THE PREMIUM
          </span>
          <span className="splash-text-2 text-[9px] sm:text-[10px] tracking-[0.5em] uppercase text-amber-400/80 font-semibold">
            BARBERSHOP GRONINGEN
          </span>
        </div>
      </div>
    </div>
  );
};
