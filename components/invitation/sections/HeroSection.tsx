"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { WeddingSettings } from "@/lib/types";
import { formatDateID } from "@/lib/utils";

export function HeroSection({ settings }: { settings: WeddingSettings }) {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-t from-cream/90 via-cream/50 to-transparent" />

      <motion.div
        className="absolute bottom-10 left-0 right-0 text-center text-gold px-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center mb-4 space-y-1">
          <h1 className="font-display font-medium text-5xl sm:text-6xl leading-none capitalize text-center">
            {settings.groom_name}
          </h1>
          <span className="font-display font-medium text-4xl sm:text-5xl">&</span>
          <h1 className="font-display font-medium text-5xl sm:text-6xl leading-none capitalize text-center">
            {settings.bride_name}
          </h1>
        </div>
        <p className="tracking-[0.3em] text-xs sm:text-sm uppercase opacity-90">
          {formatDateID(settings.wedding_date)}
        </p>
      </motion.div>
    </section>
  );
}
