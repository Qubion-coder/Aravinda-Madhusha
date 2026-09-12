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
    <div ref={containerRef} className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden bg-[#FAF7F2]">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 origin-center pointer-events-none"
        style={useParallax ? { y: y1, scale } : undefined}
      >
        <img
          src="/background1.png"
          alt="Wedding Background"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover opacity-80"
          style={{ objectPosition: 'center' }}
          onError={(e) => {
            // Fallback to white_roses_bg if background1 doesn't look right or exist
            e.currentTarget.src = '/white_roses_bg.png';
            e.currentTarget.style.opacity = '0.6';
          }}
        />
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />
      </motion.div>

      <FloatingPetals />

      {/* Main Content Area - Layout matching the provided design */}
      <div className="relative z-30 text-center px-4 w-full max-w-2xl mt-8 sm:mt-12 flex flex-col items-center">

        {/* The Wedding of */}
        <h2 className="font-greatvibes text-4xl sm:text-5xl text-[#A0825B] mb-1">
          The Wedding of
        </h2>
        <br />
        <br />

        {/* Small Ornament */}
        <div className="flex items-center justify-center mb-3">
          <div className="h-[1px] w-8 bg-gradient-to-l from-[#C8B29E] to-transparent" />
          <div className="w-1.5 h-1.5 bg-[#C8B29E] mx-1 rotate-45" />
          <div className="h-[1px] w-8 bg-gradient-to-r from-[#C8B29E] to-transparent" />
        </div>

        {/* Bride */}
        <h1 className="font-greatvibes text-[4rem] sm:text-[5.5rem] text-[#B8975F] leading-none mb-3 drop-shadow-sm">
          Madusha
        </h1>

        {/* Bride Parents */}
        <p className="font-serif text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#706050] mb-2 leading-relaxed px-4">
          DAUGHTER OF MR. R.A.H.M. WASANTHA ABERATHNA <br /> &amp; MRS. A.A. RENUKA DAMAYANTHI AMARATHUNGA
        </p>

        {/* Ampersand */}
        <h2 className="font-greatvibes text-5xl sm:text-6xl text-[#B8975F] my-1">
          &amp;
        </h2>

        {/* Groom */}
        <h1 className="font-greatvibes text-[4rem] sm:text-[5.5rem] text-[#B8975F] leading-none mb-3 drop-shadow-sm">
          Aravinda
        </h1>

        {/* Groom Parents */}
        <p className="font-serif text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#706050] mb-4 leading-relaxed px-4">
          SON OF MR. R.M. ANANDA SIRIWARDANA BANDARA <br /> &amp; MRS. K M G NILANGIKA KARIYAWASAM
        </p>

        {/* Small Ornament */}
        <div className="flex items-center justify-center my-4">
          <div className="h-[1px] w-10 bg-gradient-to-l from-[#C8B29E] to-transparent" />
          <div className="w-2 h-2 bg-[#C8B29E] mx-1 rotate-45" />
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#C8B29E] to-transparent" />
        </div>

        {/* Date */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 text-[#706050] mt-2 mb-1">
          <span className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.2em]">NOVEMBER</span>
          <span className="font-serif text-5xl sm:text-6xl font-bold text-[#8C6D45] leading-none">16</span>
          <span className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.2em]">MONDAY</span>
        </div>
        <div className="font-serif text-[#B8975F] text-lg sm:text-xl font-bold tracking-widest mb-6">
          2026
        </div>

        {/* Time and Venue */}
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-extrabold text-[#504538] mb-2">
          FROM 10:00 AM TO 3:30 PM
        </p>
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[#655848] mb-1">
          AT REGAL GATEWAY LUXURY BANQUET
        </p>
        <p className="font-serif text-[1.1rem] sm:text-xl font-bold text-[#706050] mb-1">
          Hettipola Road
        </p>
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#655848] mb-1">
          KARAGAHAGEDARA
        </p>
        <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-bold text-[#8C6D45] mb-6">
          (PORUWA CEREMONY AT 10:15 AM)
        </p>

        {/* RSVP */}
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-extrabold text-[#504538] mb-1.5">
          RSVP
        </p>
        <p className="font-sans text-[10px] tracking-[0.1em] text-[#655848] mb-10 sm:mb-14 font-medium">
          Aravinda: 071-5244006 | Madusha: 071-8691636
        </p>

      </div>

      {/* Discover Bottom Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={handleScrollToNext}
      >
        <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.4em] text-[#706050] font-extrabold transition-transform">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#706050] to-transparent animate-bounce mt-2" />
      </motion.div>
    </div>
  );
};

