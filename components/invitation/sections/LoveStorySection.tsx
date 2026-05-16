"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { LoveStory } from "@/lib/types";
import { Reveal } from "../Reveal";

export function LoveStorySection({ items }: { items: LoveStory[] }) {
  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;
  const current = items[index];

  function go(dir: -1 | 1) {
    setIndex((i) => (i + dir + items.length) % items.length);
  }

  // Touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  function onTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 60) go(-1);
    else if (diff < -60) go(1);
    setTouchStart(null);
  }

  return (
    <section className="py-20 sm:py-28 px-6 bg-gradient-to-b from-ivory to-rose/30">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-gold tracking-widest text-sm uppercase">Our Journey</p>
            <p className="section-heading text-4xl sm:text-5xl mt-2">Our Love Story</p>
            <div className="ornament max-w-[160px] mx-auto mt-4" />
          </div>
        </Reveal>

        <div className="relative overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center content-center w-full h-[800px] md:h-[720px] bg-white/70 backdrop-blur rounded-3xl p-6 sm:p-10 border border-gold/20 shadow-md shrink-0 overflow-hidden"
            >
              {current.image_url && (
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={current.image_url}
                    alt={current.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className={current.image_url ? "self-center" : "md:col-span-2 text-center self-center"}>
                <p className="text-gold uppercase tracking-widest text-xs sm:text-sm mb-2">
                  {current.date}
                </p>
                <h3 className="font-display text-3xl sm:text-4xl mb-4 text-charcoal">
                  {current.title}
                </h3>
                <p className="text-muted leading-relaxed">{current.description}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="flex items-center justify-between mt-6 sm:mt-8">
              <button
                onClick={() => go(-1)}
                className="p-3 rounded-full bg-charcoal text-cream hover:bg-gold hover:text-charcoal transition shadow"
                aria-label="Sebelumnya"
              >
                <IconChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-8 bg-gold" : "w-2 bg-gold/30"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                className="p-3 rounded-full bg-charcoal text-cream hover:bg-gold hover:text-charcoal transition shadow"
                aria-label="Berikutnya"
              >
                <IconChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
