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
          
          <div 
            className={`absolute top-1/2 -translate-y-1/2 ${
              side === "left" ? "-left-16 sm:-left-24" : "-right-16 sm:-right-24"
            } w-32 h-48 sm:w-40 sm:h-56 pointer-events-none z-0 text-gold/40 flex items-center justify-center`}
            style={{
              transform: side === "left" ? 'scaleX(-1)' : 'none',
            }}
          >
            <svg viewBox="0 0 100 160" fill="currentColor" className="w-full h-full drop-shadow-md">
              {/* Main stem */}
              <path d="M50,158 C46,130 56,105 50,80 C44,58 54,38 50,20" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.5"/>
              
              {/* Curly tendrils */}
              <path d="M50,80 C38,72 28,58 32,46 C36,36 44,38 42,46" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.3"/>
              <path d="M50,110 C62,102 72,88 68,76 C64,66 56,68 58,76" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.3"/>
              
              {/* Top flower - full bloom */}
              <g transform="translate(50,22)">
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.3"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.25" transform="rotate(30)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.25" transform="rotate(60)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.2" transform="rotate(90)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.2" transform="rotate(120)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.2" transform="rotate(150)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.25" transform="rotate(180)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.2" transform="rotate(210)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.2" transform="rotate(240)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.2" transform="rotate(270)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.2" transform="rotate(300)"/>
                <ellipse cx="0" cy="-11" rx="8" ry="15" opacity="0.2" transform="rotate(330)"/>
                <circle cx="0" cy="0" r="5" opacity="0.7"/>
                <circle cx="2" cy="-2" r="1" opacity="0.9"/>
                <circle cx="-2.5" cy="-0.5" r="1" opacity="0.9"/>
                <circle cx="0.5" cy="3" r="1" opacity="0.9"/>
              </g>
              
              {/* Secondary flower - side bloom */}
              <g transform="translate(38,70) rotate(-20)">
                <ellipse cx="0" cy="-8" rx="6" ry="11" opacity="0.3"/>
                <ellipse cx="0" cy="-8" rx="6" ry="11" opacity="0.25" transform="rotate(45)"/>
                <ellipse cx="0" cy="-8" rx="6" ry="11" opacity="0.2" transform="rotate(90)"/>
                <ellipse cx="0" cy="-8" rx="6" ry="11" opacity="0.2" transform="rotate(135)"/>
                <ellipse cx="0" cy="-8" rx="6" ry="11" opacity="0.25" transform="rotate(180)"/>
                <ellipse cx="0" cy="-8" rx="6" ry="11" opacity="0.2" transform="rotate(225)"/>
                <ellipse cx="0" cy="-8" rx="6" ry="11" opacity="0.2" transform="rotate(270)"/>
                <ellipse cx="0" cy="-8" rx="6" ry="11" opacity="0.2" transform="rotate(315)"/>
                <circle cx="0" cy="0" r="3.5" opacity="0.7"/>
                <circle cx="1" cy="-1" r="0.7" opacity="0.9"/>
                <circle cx="-1.5" cy="0" r="0.7" opacity="0.9"/>
              </g>
              
              {/* Small bud top-right */}
              <g transform="translate(65,38)">
                <path d="M0,0 C4,-4 7,-12 5,-18 C2,-12 0,-6 0,0Z" opacity="0.35"/>
                <path d="M0,0 C-3,-5 -6,-12 -4,-17 C-1,-11 1,-5 0,0Z" opacity="0.25"/>
                <path d="M0,0 C0,-4 1,-8 0,-12" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.4"/>
              </g>
              
              {/* Leaf 1 - right, upper */}
              <g transform="translate(56,45) rotate(25)">
                <path d="M0,0 C10,-9 24,-7 30,0 C24,9 10,11 0,0Z" opacity="0.3"/>
                <path d="M0,0 C10,-3 24,-2 30,0" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45"/>
                <path d="M10,-1 C12,3 14,5 16,1" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.3"/>
                <path d="M18,-1 C20,2 22,3 24,0" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.3"/>
              </g>
              
              {/* Leaf 2 - left, middle */}
                  <g transform="translate(44,95) rotate(-30)">
                <path d="M0,0 C-12,-10 -26,-8 -32,0 C-26,10 -12,12 0,0Z" opacity="0.25"/>
                <path d="M0,0 C-12,-3 -26,-2 -32,0" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45"/>
                <path d="M-10,-1 C-12,3 -14,5 -16,1" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.3"/>
                <path d="M-20,-1 C-22,2 -24,3 -26,0" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.3"/>
              </g>
              
              {/* Leaf 3 - right, lower */}
              <g transform="translate(54,125) rotate(20)">
                <path d="M0,0 C8,-8 20,-6 26,0 C20,8 8,10 0,0Z" opacity="0.25"/>
                <path d="M0,0 C8,-2 20,-1 26,0" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45"/>
                <path d="M8,0 C10,2 12,3 14,0" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.3"/>
                <path d="M16,0 C18,2 20,2 22,0" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.3"/>
              </g>
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
