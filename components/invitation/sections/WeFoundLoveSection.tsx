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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
            {photos.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md"
              >
                <Image
                  src={p.image_url}
                  alt={p.caption ?? ""}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {p.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-cream text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.caption}
                  </div>
                )}
              </motion.div>
            ))}
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
