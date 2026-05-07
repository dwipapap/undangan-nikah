"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IconBrandInstagram } from "@tabler/icons-react";
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
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-gold/30 shadow-lg">
          <Image src={photo} alt={name} fill sizes="220px" className="object-cover" />
        </div>
      )}
      <h3 className="script-heading text-4xl sm:text-5xl mb-3">{name}</h3>
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
