import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface InvitationMessageProps {
  guestName?: string;
  coupleNames?: string;
}

export const InvitationMessage: React.FC<InvitationMessageProps> = ({
  guestName,
  coupleNames = 'Madusha & Aravinda',
}) => {
  const displayGuest = guestName || 'Aravinda';

  return (
    <section
      id="invitation-message-section"
      className="w-full py-20 sm:py-28 px-4 sm:px-6 relative flex flex-col items-center justify-center bg-[#FAF7F2] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]">
        <img
          src="/background1.png"
          alt="Floral Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/white_roses_bg.png';
            e.currentTarget.style.opacity = '0.15';
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl relative z-10 flex flex-col items-center text-center"
      >
        {/* Top Ornament */}
        <div className="flex items-center justify-center mb-8 w-full opacity-70">
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-[#C8B29E] to-transparent" />
          <Heart className="w-3.5 h-3.5 mx-2 text-[#C8B29E] fill-[#C8B29E]" />
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-[#C8B29E] to-transparent" />
        </div>

        {/* 1. Request Honor of the Presence of */}
        <p className="font-serif text-[16px] sm:text-[18px] text-[#4A3F35] mb-4">
          Request Honor of the Presence of
        </p>

        {/* 2. Dear Guest Callout */}
        <h2 className="font-serif italic font-bold text-3xl sm:text-[2.5rem] text-[#9A7B4F] mb-6 tracking-wide drop-shadow-sm">
          Dear {displayGuest}
        </h2>

        {/* Dotted Line Separator */}
        <div className="w-48 sm:w-64 h-[1px] border-t border-dashed border-[#C8B29E]/60 mb-8" />

        {/* 3. On the Occasion of the Wedding */}
        <p className="font-serif text-[13px] sm:text-[14px] uppercase tracking-[0.2em] text-[#6A5A4A] mb-5 font-medium">
          ON THE OCCASION OF THE WEDDING
        </p>

        {/* 4. The Families of */}
        <p className="font-serif text-[16px] sm:text-[18px] text-[#4A3F35] mb-2">
          The families of
        </p>

        {/* 5. Couple Name */}
        <h1 className="font-greatvibes text-[4rem] sm:text-[5.5rem] text-[#A0825B] leading-none mb-4 drop-shadow-sm">
          {coupleNames}
        </h1>

        {/* 6. Request the pleasure of your company */}
        <p className="font-serif text-[16px] sm:text-[18px] text-[#4A3F35] max-w-md mx-auto leading-relaxed mb-10 sm:mb-12">
          request the pleasure of your company at the celebration of their marriage.
        </p>

        {/* Date */}
        <p className="font-serif text-[16px] sm:text-[18px] text-[#4A3F35] mb-2">
          God willing, on <span className="font-bold text-[#8C6D45]">Monday, November 16, 2026</span>
        </p>

        {/* Time */}
        <p className="font-serif text-[16px] sm:text-[18px] text-[#4A3F35] mb-8">
          at <span className="font-bold text-[#8C6D45]">10:00 AM to 3:30 PM</span>
        </p>

        {/* Venue Large */}
        <h3 className="font-serif text-3xl sm:text-4xl text-[#9A7B4F] mb-3">
          Regal Gateway Luxury Banquet
        </h3>

        {/* Venue Small */}
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#6A5A4A] font-bold mb-8">
          HETTIPOLA ROAD, KARAGAHAGEDARA
        </p>

        {/* Bottom Ornament */}
        <div className="flex items-center justify-center mt-2 w-full opacity-70">
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-[#C8B29E] to-transparent" />
          <Heart className="w-3.5 h-3.5 mx-2 text-[#C8B29E] fill-[#C8B29E]" />
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-[#C8B29E] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};
