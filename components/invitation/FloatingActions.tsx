"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowUp,
  IconMusic,
  IconPlayerPause,
} from "@tabler/icons-react";

export function FloatingActions({
  musicUrl,
  guestName,
}: {
  musicUrl: string | null;
  guestName: string;
}) {
  const [showTop, setShowTop] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!musicUrl) return;
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [musicUrl]);

  function toggleMusic() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={scrollTop}
            className="rounded-full p-3 shadow-lg transition-all duration-300 bg-rose/60 text-cream hover:bg-script-gold hover:text-charcoal shadow-rose/20 hover:shadow-script-gold/25"
            aria-label="Scroll to top"
          >
            <IconArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {musicUrl && (
        <div className="relative">
          {playing && (
            <motion.span
              className="absolute inset-0 rounded-full ring-2 ring-gold/60"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={toggleMusic}
            className={`relative rounded-full p-3 shadow-lg transition-all duration-300 ${
              playing
                ? "bg-script-gold text-charcoal shadow-script-gold/25"
                : "bg-rose/60 text-cream hover:bg-script-gold hover:text-charcoal shadow-rose/20 hover:shadow-script-gold/25"
            }`}
            aria-label={playing ? "Pause music" : "Play music"}
          >
            {playing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <IconMusic size={18} />
              </motion.div>
            ) : (
              <IconPlayerPause size={18} />
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
}
