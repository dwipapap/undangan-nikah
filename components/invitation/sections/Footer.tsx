"use client";

import { motion } from "framer-motion";
import type { WeddingSettings } from "@/lib/types";
import { IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";

export function Footer({ settings }: { settings: WeddingSettings }) {
  return (
    <footer className="relative py-16 md:py-20 px-6 bg-gold text-cream text-center overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          <p className="text-center text-base md:text-lg leading-relaxed max-w-md mx-auto text-cream/90 font-serif">
            Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir
            untuk memberikan doa restu kepada kami.
          </p>

          <div className="mt-8 flex flex-col items-center w-full">
            <p className="italic text-sm tracking-wide text-center mb-2 text-cream/80">
              Kami Yang Berbahagia,
            </p>
            <p className="font-script text-2xl md:text-4xl text-center leading-none text-cream">
              {settings.groom_name} & {settings.bride_name}
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center w-full">
            <p className="uppercase text-xs tracking-[0.2em] font-semibold text-center text-cream/60">
              HUBUNGI KAMI
            </p>
            
            <div className="flex justify-center gap-4 mt-4">
              <a href="https://instagram.com/ankaproject.id" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-cream text-gold hover:scale-110 transition-all duration-200">
                <IconBrandInstagram size={20} stroke={2} />
              </a>
              <a href="https://wa.me/6282364384639" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-cream text-gold hover:scale-110 transition-all duration-200">
                <IconBrandWhatsapp size={20} stroke={2} />
              </a>
            </div>

            <p className="text-sm text-center mt-4 text-cream/80">
              Anka Project
            </p>
            <p className="text-xs text-center mt-1 text-cream/60">
              @dwipaa11 | +62 895 0416 6115
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
