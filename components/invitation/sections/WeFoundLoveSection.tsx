"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GuestPhoto, WeddingSettings } from "@/lib/types";
import { Reveal } from "../Reveal";

export function WeFoundLoveSection({
  photos,
  settings,
}: {
  photos: GuestPhoto[];
  settings: WeddingSettings;
}) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-gradient-to-b from-cream to-ivory">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <p className="script-heading text-5xl sm:text-6xl mb-2">We Found Love</p>
          <div className="ornament max-w-[160px] mx-auto mb-12" />
        </Reveal>

        {photos.length > 0 && (
          <div className="flex justify-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="group relative w-full max-w-[400px] aspect-[4/5] overflow-hidden rounded-t-[100px] rounded-b-3xl shadow-xl border-4 border-white"
            >
              <Image
                src={photos[0].image_url}
                alt={photos[0].caption ?? "We Found Love"}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
              />
              {photos[0].caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="font-display tracking-wide">{photos[0].caption}</p>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {settings.quote_text && (
          <Reveal delay={0.2}>
            <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur rounded-2xl p-8 border border-gold/20">
              <p className="font-display italic text-charcoal text-lg sm:text-xl leading-relaxed">
                &ldquo;{settings.quote_text}&rdquo;
              </p>
              {settings.quote_source && (
                <p className="mt-4 text-gold tracking-widest text-sm uppercase">
                  — {settings.quote_source}
                </p>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
