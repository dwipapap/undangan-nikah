"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IconBrandInstagram, IconFlower } from "@tabler/icons-react";
import type { WeddingSettings } from "@/lib/types";
import { Reveal } from "../Reveal";

function PersonCard({
  photo,
  name,
  childOrder,
  fatherName,
  motherName,
  instagram,
  side,
}: {
  photo: string | null;
  name: string;
  childOrder: string | null;
  fatherName: string | null;
  motherName: string | null;
  instagram: string | null;
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center"
    >
      {photo && (
        <div className="relative inline-block mx-auto mb-8">
          <div className="relative z-10 w-48 h-64 sm:w-60 sm:h-80 mx-auto rounded-t-full rounded-b-full overflow-hidden ring-4 ring-white shadow-xl">
            <Image src={photo} alt={name} fill sizes="240px" className="object-cover" />
          </div>
          
          {/* Floral Ornament Placeholder */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 ${
              side === "left" ? "-left-16 sm:-left-24" : "-right-16 sm:-right-24"
            } w-32 h-48 sm:w-40 sm:h-56 pointer-events-none z-0 text-gold/40 flex items-center justify-center`}
            style={{
              transform: side === "left" ? 'scaleX(-1)' : 'none',
            }}
          >
            {/* You can replace this SVG with a real floral PNG ornament like the reference image */}
            <svg viewBox="0 0 100 150" fill="currentColor" className="w-full h-full drop-shadow-md">
              <path d="M50,150 C50,150 40,100 20,80 C0,60 10,30 30,20 C50,10 70,30 80,50 C90,70 100,100 50,150 Z" opacity="0.3"/>
              <path d="M50,150 C50,150 60,110 80,90 C100,70 90,40 70,30 C50,20 30,40 20,60 C10,80 0,110 50,150 Z" opacity="0.5"/>
              <circle cx="50" cy="50" r="15" fill="#d4af37" opacity="0.8"/>
              <path d="M50,150 Q45,100 30,50" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M50,150 Q55,100 70,50" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      )}
      <h3 className="font-display font-medium italic text-4xl sm:text-5xl mb-3">{name}</h3>
      {(childOrder || fatherName || motherName) && (
        <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
          {side === "left" ? "Putra" : "Putri"}{" "}
          {childOrder && <>{childOrder} dari</>}
          {fatherName && (
            <>
              <br />
              Bapak {fatherName}
            </>
          )}
          {motherName && <> & Ibu {motherName}</>}
        </p>
      )}
      {instagram && (
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-gold hover:text-charcoal transition text-sm"
        >
          <IconBrandInstagram size={18} />@{instagram}
        </a>
      )}
    </motion.div>
  );
}

export function BrideAndGroomSection({ settings }: { settings: WeddingSettings }) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-gold tracking-widest text-sm uppercase">The Couple</p>
            <p className="section-heading text-4xl sm:text-5xl mt-2">Bride &amp; Groom</p>
            <div className="ornament max-w-[160px] mx-auto mt-4" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <PersonCard
            photo={settings.groom_photo}
            name={settings.groom_name}
            childOrder={settings.groom_child_order}
            fatherName={settings.groom_father_name}
            motherName={settings.groom_mother_name}
            instagram={settings.groom_instagram}
            side="left"
          />
          <PersonCard
            photo={settings.bride_photo}
            name={settings.bride_name}
            childOrder={settings.bride_child_order}
            fatherName={settings.bride_father_name}
            motherName={settings.bride_mother_name}
            instagram={settings.bride_instagram}
            side="right"
          />
        </div>
      </div>
    </section>
  );
}
