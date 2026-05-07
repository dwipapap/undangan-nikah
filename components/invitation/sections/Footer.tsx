"use client";

import { motion } from "framer-motion";
import type { WeddingSettings } from "@/lib/types";

export function Footer({ settings }: { settings: WeddingSettings }) {
  return (
    <footer className="relative py-16 px-6 bg-charcoal text-cream text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gold to-transparent" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cream/80 italic leading-relaxed mb-8 max-w-xl mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir
            untuk memberikan doa restu kepada kami.
          </p>

          <div className="ornament max-w-[200px] mx-auto mb-6" style={{ color: "#D4AF37" }} />

          <p className="script-heading text-5xl sm:text-6xl text-gold mb-2">
            {settings.groom_name} & {settings.bride_name}
          </p>

          <p className="text-cream/60 text-xs tracking-widest uppercase mt-10">
            Built with <span className="text-gold">♥</span> · Wedding Invitation
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
