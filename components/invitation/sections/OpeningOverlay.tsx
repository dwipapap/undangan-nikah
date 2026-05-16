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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f4ede4] to-[#d6dfeb]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7 }}
    >
      {/* Background Texture/Image (Optional) */}
      {settings.hero_image && (
        <Image
          src={settings.hero_image}
          alt="cover"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-20 mix-blend-multiply pointer-events-none"
        />
      )}

      {/* Top Floral Border */}
      <div 
        className="absolute top-0 left-0 w-full h-48 pointer-events-none bg-top bg-contain bg-no-repeat opacity-80" 
        style={{ backgroundImage: `url('${settings.overlay_top_floral_image || '/images/floral-top.png'}')` }}
      />

      {/* Bottom Floral Border */}
      <div 
        className="absolute bottom-0 left-0 w-full h-64 pointer-events-none bg-bottom bg-contain bg-no-repeat opacity-80" 
        style={{ backgroundImage: `url('${settings.overlay_bottom_floral_image || '/images/floral-bottom.png'}')` }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 py-10 w-full max-w-md mt-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Center Illustration */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 opacity-80 mix-blend-multiply">
          <Image
            src={settings.overlay_center_image || "/images/ship-illustration.png"}
            alt="Illustration"
            fill
            className="object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <p className="text-[#2c3746] tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs mb-4 uppercase font-medium">
          Wedding Invitation
        </p>
        
        <div className="flex flex-col items-center justify-center mb-8 space-y-2">
          <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#d4af37] leading-none capitalize text-center drop-shadow-sm whitespace-nowrap">
            {settings.groom_name}
          </h1>
          <span className="font-display font-medium text-4xl sm:text-5xl text-[#d4af37] drop-shadow-sm">&</span>
          <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#d4af37] leading-none capitalize text-center drop-shadow-sm whitespace-nowrap">
            {settings.bride_name}
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center mt-4 mb-10 space-y-3">
          <p className="text-[#2c3746]/80 text-[11px] sm:text-xs uppercase tracking-widest font-medium">
            Kepada Yth,
          </p>
          <p className="text-[#1e2733] font-serif text-lg sm:text-xl font-medium tracking-wide">
            {guest.name}
          </p>
        </div>

        <motion.button
          onClick={onOpen}
          className="inline-flex items-center gap-2 bg-[#2c3746] text-white hover:bg-[#1e2733] transition-colors px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-[11px] sm:text-xs uppercase font-semibold tracking-[0.15em] shadow-lg shadow-black/10"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <IconMail size={16} stroke={2} />
          Buka Undangan
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
