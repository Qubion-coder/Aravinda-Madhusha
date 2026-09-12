import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const CoupleDetails: React.FC = () => {
  return (
    <div className="w-full h-[80vh] sm:h-[90vh] relative overflow-hidden flex items-center justify-center">
      {/* Massive Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/4.jpg.jpeg"
          alt="Aravinda & Madusha"
          className="w-full h-full object-cover object-top"
        />
        {/* Elegant gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-end w-full h-full pb-20 sm:pb-32 px-4 sm:px-6 text-center">
        {/* Lovable Quote Section overlaying the image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-center"
        >
          <div className="mb-6 sm:mb-8">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white/80 fill-white/20 animate-pulse" />
          </div>
          
          <p className="font-greatvibes text-4xl sm:text-6xl md:text-7xl text-white leading-tight sm:leading-snug mb-6 sm:mb-8 drop-shadow-xl font-normal">
            "I have found the one whom my soul loves."
          </p>
          
          <div className="flex items-center gap-4">
            <div className="w-12 sm:w-16 h-[1px] bg-white/60" />
            <p className="font-serif uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/90 text-[11px] sm:text-[13px] font-bold drop-shadow-md">
              Song of Solomon 3:4
            </p>
            <div className="w-12 sm:w-16 h-[1px] bg-white/60" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
