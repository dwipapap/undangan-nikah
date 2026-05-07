"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";
import type { GalleryPhoto } from "@/lib/types";
import { Reveal } from "../Reveal";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

export function GallerySection({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState<number>(-1);

  if (photos.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 px-6 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-gold tracking-widest text-sm uppercase">Memories</p>
            <p className="section-heading text-4xl sm:text-5xl mt-2">Our Gallery</p>
            <div className="ornament max-w-[160px] mx-auto mt-4" />
          </div>
        </Reveal>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4">
          {photos.map((p, idx) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setIndex(idx)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
              className="block w-full mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow group"
            >
              <div className="relative w-full" style={{ aspectRatio: idx % 3 === 0 ? "3/4" : idx % 2 === 0 ? "4/5" : "1/1" }}>
                <Image
                  src={p.image_url}
                  alt={p.caption ?? `gallery-${idx}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </motion.button>
          ))}
        </div>

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={photos.map((p) => ({ src: p.image_url, alt: p.caption ?? "" }))}
        />
      </div>
    </section>
  );
}
