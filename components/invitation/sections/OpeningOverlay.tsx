"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconMail } from "@tabler/icons-react";
import type { Guest, WeddingSettings } from "@/lib/types";
import { formatDateID } from "@/lib/utils";

export function OpeningOverlay({
  guest,
  settings,
  onOpen,
}: {
  guest: Guest;
  settings: WeddingSettings;
  onOpen: () => void;
}) {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7 }}
    >
      {settings.hero_image && (
        <Image
          src={settings.hero_image}
          alt="cover"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />

      <motion.div
        className="relative z-10 text-center px-6 py-10 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <p className="text-cream/80 tracking-[0.4em] text-xs sm:text-sm mb-4 uppercase">
          The Wedding of
        </p>
        <h1 className="script-heading text-5xl sm:text-7xl text-cream mb-2 leading-tight">
          {settings.groom_name}
        </h1>
        <p className="text-cream/80 text-2xl sm:text-3xl font-display italic mb-2">&</p>
        <h1 className="script-heading text-5xl sm:text-7xl text-cream mb-6 leading-tight">
          {settings.bride_name}
        </h1>

        <div className="ornament my-6 max-w-[180px] mx-auto" />

        <p className="text-cream/90 text-sm sm:text-base mb-8">
          {formatDateID(settings.wedding_date)}
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 mb-6">
          <p className="text-cream/70 text-xs uppercase tracking-widest mb-2">Kepada Yth.</p>
          <p className="text-cream font-display text-2xl">{guest.name}</p>
          <p className="text-cream/70 text-xs mt-2 italic">di tempat</p>
        </div>

        <motion.button
          onClick={onOpen}
          className="inline-flex items-center gap-2 bg-gold text-charcoal hover:bg-cream transition-colors px-8 py-3 rounded-full font-medium tracking-wide shadow-lg"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <IconMail size={18} />
          Buka Undangan
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
