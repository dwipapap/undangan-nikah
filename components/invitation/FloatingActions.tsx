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
            className="bg-charcoal text-cream rounded-full p-3 shadow-lg hover:bg-gold hover:text-charcoal transition"
            aria-label="Scroll to top"
          >
            <IconArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {musicUrl && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={toggleMusic}
          className={`rounded-full p-3 shadow-lg transition ${
            playing ? "bg-gold text-charcoal" : "bg-charcoal text-cream"
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
      )}
    </div>
  );
}
