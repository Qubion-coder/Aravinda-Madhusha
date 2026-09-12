import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Volume2, VolumeX, Sparkles, Heart, Clock, Phone, MessageCircle } from 'lucide-react';
import RSVPForm from './RSVPForm';
import WishesForm from './WishesForm';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { CoupleDetails } from './components/CoupleDetails';
import { InvitationMessage } from './components/InvitationMessage';
export default function StoryApp() {
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const weddingDate = new Date('2026-11-16T10:00:00');

  useEffect(() => {
    if (invitationOpened && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [invitationOpened]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Read personalized guest link params
  const urlParams = new URLSearchParams(window.location.search);
  const guestPrefix = urlParams.get('prefix') || '';
  const guestName = urlParams.get('guest') || '';
  const guestDisplayName = guestName ? (guestPrefix ? `${guestPrefix} ${guestName}` : guestName) : undefined;

  return (
    <div className="wedding-flow-container bg-[#FAF7F2] text-brand-plum font-sans relative selection:bg-brand-plum selection:text-white">
      {/* Fixed Ambient Luxury Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/white_roses_bg.png"
          alt="White Roses Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/85 via-[#FAF7F2]/75 to-[#FAF7F2]/90 backdrop-blur-[2px]" />
      </div>

      {/* --- ENTRY COVER SCREEN --- */}
      <AnimatePresence>
        {!invitationOpened && (
          <motion.div
            key="invitation-cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-[#FAF7F2] flex flex-col items-center justify-center p-6"
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/white_roses_bg.png"
                alt="White Roses"
                className="w-full h-full object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/85 via-[#FAF7F2]/65 to-[#FAF7F2]/90" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="z-10 flex flex-col items-center text-center max-w-sm bg-white/80 backdrop-blur-md p-10 sm:p-12 rounded-[2.5rem] border border-[#C8B29E] shadow-2xl relative"
            >
              <div className="w-12 h-12 mb-6 rounded-full bg-[#FAF7F2] border border-[#C8B29E] flex items-center justify-center text-brand-plum shadow-inner">
                <Sparkles size={20} />
              </div>

              {guestName ? (
                <div className="mb-4">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-brand-plum font-extrabold mb-1">
                    CORDIALLY INVITED
                  </p>
                  <p className="font-alex text-4xl sm:text-5xl text-brand-plum font-normal tracking-wide">
                    {guestPrefix ? `${guestPrefix} ` : ''}{guestName}
                  </p>
                </div>
              ) : null}

              <p className="text-[11px] uppercase tracking-[0.3em] text-brand-plum font-extrabold mb-2">
                WEDDING INVITATION
              </p>

              <h1 className="font-alex text-6xl sm:text-7xl text-brand-plum drop-shadow-sm font-normal tracking-wide leading-tight mb-2">
                Aravinda <span className="text-brand-plum text-5xl sm:text-6xl font-serif italic">&amp;</span> Madhusha
              </h1>

              <p className="serif text-base tracking-[0.2em] text-brand-plum mb-8 uppercase font-bold">
                November 16, 2026
              </p>

              <button
                onClick={() => setInvitationOpened(true)}
                className="group relative px-9 py-3.5 bg-brand-plum text-white rounded-full text-[12px] uppercase tracking-[0.25em] font-extrabold hover:bg-[#3D2817] transition-all duration-300 shadow-xl shadow-black/25 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Open Invitation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- INTRO VIDEO MODAL --- */}
      <AnimatePresence>
        {invitationOpened && !introPlayed && (
          <motion.div
            key="intro-video"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <video
              src="/snaptik_7626793615695777044_v3 (online-video-cutter.com).mp4"
              autoPlay
              muted
              playsInline
              controls={false}
              onEnded={() => setIntroPlayed(true)}
              className="w-full h-full object-cover pointer-events-none"
            />

            <button
              onClick={() => setIntroPlayed(true)}
              className="absolute bottom-10 px-6 py-2.5 bg-black/60 backdrop-blur-md text-white rounded-full border border-white/30 text-xs tracking-[0.2em] uppercase transition-all hover:bg-white/20 z-10 font-bold cursor-pointer"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- THE MAIN INVITATION (FULL-WIDTH SECTION EXPERIENCES) --- */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* 1. HERO SECTION (FULL SCREEN) */}
        <Hero inviteeName={guestDisplayName} />

        {/* 2. THE PROTAGONISTS (COUPLE & PARENTS) */}
        <section className="w-full relative border-b border-[#C8B29E]/40 overflow-hidden">
          <CoupleDetails />
        </section>

        {/* 3. DATE, TIME & CEREMONY (REDESIGNED TO MATCH IMAGE) */}
        <InvitationMessage guestName={guestDisplayName} />

        {/* 4. LIVE COUNTDOWN SECTION */}
        <section
          id="countdown-section"
          className="w-full py-16 sm:py-24 px-4 sm:px-6 relative flex flex-col items-center justify-center border-y border-[#C8B29E]/40 overflow-hidden"
        >
          {/* Background Image: ChatGPT Image Sep 11, 2026, 02_59_17 AM.png */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/ChatGPT Image Sep 11, 2026, 02_59_17 AM.png"
              alt="Countdown Background"
              className="w-full h-full object-cover object-center opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/30 via-transparent to-[#FAF7F2]/30" />
          </div>

          <div className="text-center mb-8 flex flex-col items-center relative z-10 bg-white/75 backdrop-blur-md px-8 sm:px-12 py-5 rounded-3xl border border-[#C8B29E]/50 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-14 bg-gradient-to-l from-brand-plum to-transparent" />
              <Heart className="w-4 h-4 text-brand-plum fill-brand-plum/30 animate-pulse" />
              <div className="h-px w-14 bg-gradient-to-r from-brand-plum to-transparent" />
            </div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-brand-plum font-extrabold block mb-1.5 font-sans">
              Counting Down Every Moment
            </span>
            <h2 className="font-alex text-5xl sm:text-6xl md:text-7xl text-brand-plum font-normal tracking-wide drop-shadow-sm">
              Forever Begins In
            </h2>
          </div>

          <div className="relative z-10 w-full flex justify-center">
            <Countdown targetDate={weddingDate} />
          </div>
        </section>



        {/* 6. VENUE & LOCATION */}
        <section className="w-full py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md border-y border-[#C8B29E]/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg flex flex-col items-center"
          >
            <p className="text-[12px] sm:text-xs uppercase tracking-[0.3em] font-extrabold text-brand-plum mb-1">
              LOCATION
            </p>
            <h3 className="font-alex text-5xl sm:text-6xl md:text-7xl text-brand-plum mb-8 font-normal tracking-wide">The Venue</h3>

            <div className="w-full bg-[#FAF7F2] rounded-3xl border border-[#C8B29E] overflow-hidden shadow-xl">
              <div className="w-full h-56 sm:h-64 relative overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl3hfQ9HSisvEvUWvNPTF1u6_DuCeincwR60iMPEdjAXzAMHmXGVnWwbYk6HccOxTfdhLXU1kTekyxcCbPcXtUUwiKk0_DiiEvZ45P4nt-8ZMVeF2JlpuMY6cUTuLYOCCr2Lb4l=w408-h306-k-no"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  alt="Regal Gateway Luxury Banquet"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] uppercase font-extrabold tracking-widest text-brand-plum shadow">
                  Banquet Hall
                </div>
              </div>

              <div className="p-8 flex flex-col items-center text-center">
                <h4 className="serif text-2xl font-bold text-brand-plum uppercase tracking-wider mb-2">
                  Regal Gateway Luxury Banquet
                </h4>
                <p className="text-sm uppercase tracking-[0.15em] text-brand-plum mb-4 font-bold">
                  Hettipola Road, Karagahagedara, Kuliyapitiya
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C8B29E] shadow-xs mb-6">
                  <Clock size={15} className="text-brand-plum" />
                  <span className="text-xs uppercase tracking-wider font-extrabold text-brand-plum">
                    10:00 AM – 3:30 PM
                  </span>
                </div>

                <a
                  href="https://maps.app.goo.gl/RVXe7FssELhZFKJE6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-4 bg-brand-plum text-white rounded-2xl text-xs uppercase tracking-[0.2em] font-extrabold hover:bg-[#3D2817] transition-all duration-300 shadow-xl group hover:scale-[1.02]"
                >
                  <MapPin size={16} className="text-[#C8B29E] group-hover:translate-y-[-1px] transition-transform" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 7. RSVP SECTION */}
        <section className="w-full py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] border border-[#C8B29E] shadow-xl flex flex-col items-center"
          >
            <div className="w-48 max-w-[200px] mb-4">
              <img
                src="/floral_rsvp.png"
                alt="RSVP Floral"
                className="w-full h-auto object-contain mix-blend-multiply opacity-95"
              />
            </div>

            <p className="text-[12px] uppercase tracking-[0.25em] font-extrabold text-brand-plum mb-1">
              PLEASE RESPOND
            </p>
            <h3 className="font-alex text-5xl sm:text-6xl md:text-7xl text-brand-plum mb-2 font-normal tracking-wide">RSVP</h3>
            <p className="serif text-base text-brand-plum mb-8 italic font-bold text-center">
              Kindly confirm your participation before November 2nd, 2026.
            </p>

            <div className="w-full">
              <RSVPForm />
            </div>

            {/* Direct RSVP Contacts */}
            <div className="w-full mt-8 pt-6 border-t border-[#C8B29E]/60 flex flex-col items-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-brand-plum font-extrabold mb-4">
                Or RSVP Via Call / WhatsApp
              </p>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Aravinda Contact */}
                <div className="flex items-center justify-between p-4 sm:p-5 rounded-[1.5rem] bg-[#FAF7F2] border border-[#E8DCC4] shadow-[0_8px_30px_rgba(200,178,158,0.12)]">
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#8C7A6B] mb-1">
                      Aravinda
                    </span>
                    <a
                      href="tel:0715244006"
                      className="font-serif text-lg sm:text-xl font-medium text-[#6A5A4A] tracking-wider hover:text-brand-plum transition-colors"
                    >
                      071 524 4006
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="tel:0715244006"
                      className="w-8 h-8 rounded-full bg-white border border-[#C8B29E] flex items-center justify-center text-brand-plum hover:bg-brand-plum hover:text-white transition-colors shadow-xs"
                      title="Call Aravinda"
                    >
                      <Phone size={14} />
                    </a>
                    <a
                      href="https://wa.me/94715244006"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1EBE5D] transition-colors shadow-xs"
                      title="WhatsApp Aravinda"
                    >
                      <MessageCircle size={14} />
                    </a>
                  </div>
                </div>

                {/* Madusha Contact */}
                <div className="flex items-center justify-between p-4 sm:p-5 rounded-[1.5rem] bg-[#FAF7F2] border border-[#E8DCC4] shadow-[0_8px_30px_rgba(200,178,158,0.12)]">
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#8C7A6B] mb-1">
                      Madusha
                    </span>
                    <a
                      href="tel:0718691636"
                      className="font-serif text-lg sm:text-xl font-medium text-[#6A5A4A] tracking-wider hover:text-brand-plum transition-colors"
                    >
                      071 869 1636
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="tel:0718691636"
                      className="w-8 h-8 rounded-full bg-white border border-[#C8B29E] flex items-center justify-center text-brand-plum hover:bg-brand-plum hover:text-white transition-colors shadow-xs"
                      title="Call Madhusha"
                    >
                      <Phone size={14} />
                    </a>
                    <a
                      href="https://wa.me/94718691636"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1EBE5D] transition-colors shadow-xs"
                      title="WhatsApp Madhusha"
                    >
                      <MessageCircle size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 8. WISHES SECTION */}
        <section className="w-full py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md border-y border-[#C8B29E]/40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl bg-[#FAF7F2]/90 p-8 sm:p-12 rounded-[2.5rem] border border-[#C8B29E] shadow-xl flex flex-col items-center"
          >
            <p className="text-[12px] uppercase tracking-[0.25em] font-extrabold text-brand-plum mb-1">
              GUEST BOOK
            </p>
            <h3 className="font-alex text-5xl sm:text-6xl md:text-7xl text-brand-plum mb-2 font-normal tracking-wide">Leave a Wish</h3>
            <p className="serif text-base text-brand-plum mb-8 italic font-bold text-center max-w-md">
              We'd be delighted to read your warm blessings and wishes as we begin this new journey.
            </p>

            <div className="w-full">
              <WishesForm />
            </div>
          </motion.div>
        </section>

        {/* 9. FOOTER SECTION */}
        <footer className="w-full py-16 px-4 flex flex-col items-center text-center relative bg-[#FAF7F2]">
          <div className="text-brand-plum mb-3">
            <Heart size={24} fill="#3D2314" stroke="none" />
          </div>
          <p className="serif italic text-2xl text-brand-plum mb-1 font-semibold">
            With joyful hearts,
          </p>
          <p className="font-alex text-5xl sm:text-6xl md:text-7xl text-brand-plum mb-10 font-normal tracking-wide">
            Aravinda &amp; Madhusha
          </p>

          <div className="w-full max-w-md border-t border-[#C8B29E] pt-6 text-center">
            <p className="text-brand-plum text-[11px] font-sans tracking-[0.2em] uppercase leading-relaxed font-bold">
              Want a beautiful wedding website like this? <br />
              <a
                target="_blank"
                rel="noreferrer"
                className="text-brand-plum hover:text-brand-plum font-extrabold underline decoration-[#3D2314] underline-offset-4 transition-colors"
                href="https://wa.me/94707819074"
              >
                Created with invitemint
              </a>
            </p>
          </div>
        </footer>
      </main>

      {/* Audio Element and Floating Controls */}
      <audio
        ref={audioRef}
        src="/Teddy Swims - You're Still The One (Shania Twain Cover).mp3"
        loop
      />

      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-brand-plum text-white ring-2 ring-[#C8B29E]'
            : 'bg-white text-brand-plum border-2 border-brand-plum hover:bg-[#FAF7F2]'
        }`}
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <>
            <Volume2 size={18} className="animate-pulse text-[#C8B29E]" />
            <span className="text-[10px] uppercase tracking-widest font-extrabold hidden sm:inline">
              Music Playing
            </span>
          </>
        ) : (
          <>
            <VolumeX size={18} />
            <span className="text-[10px] uppercase tracking-widest font-extrabold hidden sm:inline">
              Play Music
            </span>
          </>
        )}
      </button>
    </div>
  );
}
