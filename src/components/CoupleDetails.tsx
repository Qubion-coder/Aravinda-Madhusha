import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const CoupleDetails: React.FC = () => {
  return (
    <div className="w-full py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Image: Codex Image Sep 11, 2026, 02_51_44 AM.png - 100% Visible */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/Codex Image Sep 11, 2026, 02_51_44 AM.png"
          alt="The Protagonists Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 sm:mb-20 relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="inline-flex flex-col items-center bg-white/80 backdrop-blur-md px-8 sm:px-14 py-5 rounded-3xl border border-[#C8B29E]/60 shadow-lg"
          >
            <div className="inline-flex items-center gap-4 mb-3">
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-brand-plum/60" />
              <span className="text-brand-plum uppercase tracking-[0.5em] text-[11px] font-semibold font-sans drop-shadow-sm">The Protagonists</span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-brand-plum/60" />
            </div>
            <h2 className="text-5xl sm:text-7xl font-names text-stone-800 tracking-tight drop-shadow-sm">
              Aravinda <span className="text-brand-plum font-serif italic mx-2">&amp;</span> Madhusha
            </h2>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-8 relative z-10">
          {/* Groom Details (Left on Desktop, Bottom on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-center lg:text-right flex-1 lg:pr-4 order-4 lg:order-1 w-full max-w-md lg:max-w-none"
          >
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#C8B29E]/60 shadow-lg flex flex-col items-center lg:items-end">
              <span className="text-brand-plum uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">The Groom</span>
              <h3 className="text-4xl sm:text-5xl font-names text-stone-800 mb-2 drop-shadow-sm">Aravinda</h3>
              <p className="text-stone-600 font-serif italic text-base sm:text-lg leading-relaxed">
                Son of Mr. R.M. Ananda Siriwardana Bandara <br className="hidden sm:inline" />
                &amp; Mrs. K M G Nilangika Kariyawasam
              </p>
            </div>
            <div className="hidden lg:flex justify-end mt-4 pr-2">
              <Heart className="w-6 h-6 text-brand-plum/60 fill-brand-plum/20 transform hover:scale-110 transition-transform cursor-pointer" />
            </div>
          </motion.div>

          {/* Center Couple Image (Arch Design) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 lg:order-2 flex flex-col items-center px-4"
          >
            <div className="relative w-64 sm:w-72 md:w-80 h-96 sm:h-[420px] rounded-t-[12rem] rounded-b-[2rem] overflow-hidden border-2 border-brand-plum/30 shadow-[0_20px_40px_rgba(61,35,20,0.2)] bg-white/90 p-2 backdrop-blur-sm">
              <div className="w-full h-full rounded-t-[11.5rem] rounded-b-[1.5rem] overflow-hidden relative">
                <img
                  src="/4.jpg.jpeg"
                  alt="Aravinda & Madhusha"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Bride Details (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="text-center lg:text-left flex-1 lg:pl-4 order-2 lg:order-3 w-full max-w-md lg:max-w-none"
          >
            <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#C8B29E]/60 shadow-lg flex flex-col items-center lg:items-start">
              <span className="text-brand-plum uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">The Bride</span>
              <h3 className="text-4xl sm:text-5xl font-names text-stone-800 mb-2 drop-shadow-sm">Madhusha</h3>
              <p className="text-stone-600 font-serif italic text-base sm:text-lg leading-relaxed">
                Daughter of Mr. R.A.H.M. Wasantha Aberathna <br className="hidden sm:inline" />
                &amp; Mrs. A.A. Renuka Damayanthi Amarathunga
              </p>
            </div>
            <div className="hidden lg:flex justify-start mt-4 pl-2">
              <Heart className="w-6 h-6 text-brand-plum/60 fill-brand-plum/20 transform hover:scale-110 transition-transform cursor-pointer" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
