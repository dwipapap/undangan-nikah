"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { WeddingSettings } from "@/lib/types";
import { formatDateID } from "@/lib/utils";

export function HeroSection({ settings }: { settings: WeddingSettings }) {
  return (
    <section className="relative w-full h-[80vh] sm:h-screen overflow-hidden">
      {settings.hero_image && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={settings.hero_image}
            alt="hero"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

      <motion.div
        className="absolute bottom-10 left-0 right-0 text-center text-cream px-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="script-heading text-4xl sm:text-5xl mb-2">
          {settings.groom_name} & {settings.bride_name}
        </p>
        <p className="tracking-[0.3em] text-xs sm:text-sm uppercase opacity-90">
          {formatDateID(settings.wedding_date)}
        </p>
      </motion.div>
    </section>
  );
}
