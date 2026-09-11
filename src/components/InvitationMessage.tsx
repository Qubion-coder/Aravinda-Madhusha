import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface InvitationMessageProps {
  guestName?: string;
  guestPrefix?: string;
  coupleNames?: string;
}

export const InvitationMessage: React.FC<InvitationMessageProps> = ({
  guestName,
  guestPrefix,
  coupleNames = 'Aravinda & Madhusha',
}) => {
  const displayGuest = guestName
    ? guestPrefix
      ? `${guestPrefix} ${guestName}`
      : guestName
    : 'Aravinda';

  return (
    <section
      id="invitation-message-section"
      className="w-full py-20 sm:py-28 px-4 sm:px-6 relative flex flex-col items-center justify-center bg-white/60 backdrop-blur-md border-b border-[#C8B29E]/40 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-gradient-radial from-[#C8B29E]/20 to-transparent rounded-full blur-[90px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl bg-[#FAF7F2]/95 backdrop-blur-md p-8 sm:p-14 rounded-[3rem] border border-[#C8B29E] shadow-2xl relative flex flex-col items-center text-center"
      >
        {/* Subtle royal inner framing */}
        <div className="absolute inset-3 sm:inset-4 border border-[#C8B29E]/50 rounded-[2.3rem] pointer-events-none" />

        {/* Top Ornament */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-brand-plum" />
          <Heart className="w-4 h-4 text-brand-plum fill-brand-plum/30" />
          <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-brand-plum" />
        </div>

        {/* 1. Request Honor of the Presence of */}
        <p className="serif uppercase tracking-[0.28em] font-extrabold text-xs sm:text-sm text-brand-plum mb-5 relative z-10">
          Request the Honor of the Presence of
        </p>

        {/* 2. Dear Guest Callout */}
        <div className="mb-6 flex flex-col items-center relative z-10">
          <p className="font-alex text-5xl sm:text-6xl md:text-7xl text-brand-plum drop-shadow-sm mb-2 text-center px-4 font-normal tracking-wide">
            Dear {displayGuest}
          </p>
          <div className="h-0.5 w-28 bg-gradient-to-r from-transparent via-[#3D2314]/70 to-transparent" />
        </div>

        {/* 3. On the Occasion of the Wedding */}
        <p className="serif italic text-lg sm:text-xl text-brand-plum font-semibold mb-6 relative z-10">
          On the Occasion of the Wedding
        </p>

        {/* 4. The Families of */}
        <p className="serif text-xs sm:text-sm uppercase tracking-[0.28em] text-brand-plum font-extrabold mb-2 relative z-10">
          The Families of
        </p>

        {/* 5. Couple Name */}
        <h2 className="font-alex text-5xl sm:text-6xl md:text-7xl text-brand-plum mb-5 drop-shadow-sm font-normal tracking-wide relative z-10">
          {coupleNames === 'Aravinda & Madhusha' ? (
            <>
              Aravinda <span className="text-brand-plum text-4xl sm:text-5xl font-serif italic mx-1">&amp;</span> Madhusha
            </>
          ) : (
            coupleNames
          )}
        </h2>

        {/* 6. Request the pleasure of your company */}
        <p className="serif text-base sm:text-lg text-brand-plum font-medium max-w-lg mx-auto leading-relaxed relative z-10">
          request the pleasure of your company at the celebration of their marriage.
        </p>

        {/* Bottom Accent */}
        <div className="mt-8 flex items-center justify-center gap-3 relative z-10">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C8B29E]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-brand-plum" />
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C8B29E]" />
        </div>
      </motion.div>
    </section>
  );
};
