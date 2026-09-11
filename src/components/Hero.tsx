import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart } from 'lucide-react';
import { FloatingPetals } from './FloatingPetals';

interface HeroProps {
  event?: string | null;
  inviteeName?: string;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

function useIsTouchDevice() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  return touch;
}

export const Hero: React.FC<HeroProps> = ({ inviteeName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const useParallax = !reducedMotion && !isTouch;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const scale = useTransform(scrollY, [0, 800], [1, 1.08]);

  const handleScrollToNext = () => {
    const next = document.getElementById('invitation-message-section') || document.getElementById('countdown-section');
    next?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative h-screen min-h-[680px] w-full flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 origin-center pointer-events-none"
        style={useParallax ? { y: y1, scale } : undefined}
      >
        <img
          src="/white_roses_bg.png"
          alt="Wedding Background"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover opacity-60"
          style={{ objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-transparent to-[#FAF7F2]/70 pointer-events-none" />
      </motion.div>

      <FloatingPetals />

      {/* Decorative Outer and Inner Frames */}
      <div className="absolute inset-4 sm:inset-8 border border-brand-plum/30 rounded-3xl pointer-events-none z-20 hidden sm:block shadow-[inset_0_0_30px_rgba(201,169,110,0.15)]" />
      <div className="absolute inset-5 sm:inset-9 border border-brand-plum/15 rounded-[1.3rem] pointer-events-none z-20 hidden sm:block" />

      {/* Main Content Area - Always Visible and High Contrast */}
      <div className="relative z-30 text-center px-4 sm:px-6 w-full max-w-6xl mt-4 sm:mt-10 flex flex-col items-center">
        {/* Top Ornament */}
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-brand-plum to-transparent" />
          <Heart className="w-5 h-5 text-brand-plum fill-brand-plum/30 animate-pulse" />
          <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-brand-plum to-transparent" />
        </div>

        {/* The Celebration of Love Badge */}
        <div className="mb-4 sm:mb-8 inline-block bg-white/90 backdrop-blur-md border border-[#C8B29E] px-8 sm:px-10 py-2.5 sm:py-3 rounded-full shadow-md">
          <span className="text-brand-plum uppercase tracking-[0.6em] sm:tracking-[0.8em] text-[10px] sm:text-xs font-black block font-sans">
            The Celebration of Love
          </span>
        </div>

        {/* Couple's Names - Crisp, Grand, and Ultra Visible */}
        <div className="relative mb-6 sm:mb-10 w-full flex justify-center py-2 sm:py-6 px-2 overflow-visible">
          {/* Gentle ambient halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-48 bg-white/60 blur-3xl rounded-full pointer-events-none -z-10" />

          <h1 className="relative text-5xl sm:text-[6rem] lg:text-[7.5rem] font-serif font-bold text-brand-plum leading-normal sm:leading-[0.9] tracking-normal sm:tracking-tight drop-shadow-sm py-2">
            ARAVINDA <br className="sm:hidden" />
            <span className="text-[#8C6226] font-normal mx-2 sm:mx-6 text-4xl sm:text-[4.5rem] lg:text-[6rem] inline-block -translate-y-1 sm:-translate-y-4 drop-shadow-sm font-serif italic">&amp;</span>
            <br className="sm:hidden" />
            MADHUSHA
          </h1>
        </div>

        {/* Invitee Callout Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 relative z-10 bg-white/90 px-8 py-3.5 sm:py-3 rounded-full backdrop-blur-md border border-[#C8B29E] shadow-md">
          <div className="hidden sm:block h-[1px] w-12 bg-gradient-to-r from-transparent via-[#3D2314]/50 to-transparent" />
          <p className="text-[1.1rem] sm:text-2xl font-serif italic text-brand-plum font-bold tracking-wide px-2 text-center max-w-xl leading-relaxed">
            {inviteeName 
              ? <>We cordially invite <span className="text-brand-plum font-extrabold underline decoration-[#C8B29E] underline-offset-4">{inviteeName}</span> to join us</>
              : 'Together with our families, we joyfully invite you to join us'}
          </p>
          <div className="hidden sm:block h-[1px] w-12 bg-gradient-to-r from-transparent via-[#3D2314]/50 to-transparent" />
        </div>
      </div>

      {/* Side Vertical Banners */}
      <div className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-30 pointer-events-none">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#3D2314]/60 to-transparent" />
        <div className="bg-brand-plum/90 backdrop-blur-md px-2.5 py-6 rounded-full border border-[#C8B29E] shadow-xl">
          <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.7em] text-[#FAF7F2] font-bold font-sans">
            Regal Gateway • Kuliyapitiya
          </p>
        </div>
        <div className="w-[1px] h-24 bg-gradient-to-t from-transparent via-[#3D2314]/60 to-transparent" />
      </div>

      <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-30 pointer-events-none">
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#3D2314]/60 to-transparent" />
        <div className="bg-brand-plum/90 backdrop-blur-md px-2.5 py-6 rounded-full border border-[#C8B29E] shadow-xl">
          <p className="writing-mode-vertical text-[11px] uppercase tracking-[0.7em] text-[#FAF7F2] font-bold font-sans rotate-180">
            Save the Date • November 2026
          </p>
        </div>
        <div className="w-[1px] h-24 bg-gradient-to-t from-transparent via-[#3D2314]/60 to-transparent" />
      </div>

      {/* Discover Bottom Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={handleScrollToNext}
      >
        <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.5em] text-brand-plum font-extrabold bg-white/90 px-5 py-2 rounded-full border border-[#C8B29E] backdrop-blur-md shadow-md hover:scale-105 transition-transform">
          Discover
        </span>
        <div className="w-[1px] h-6 sm:h-12 bg-gradient-to-b from-brand-plum to-transparent animate-bounce" />
      </motion.div>
    </div>
  );
};
