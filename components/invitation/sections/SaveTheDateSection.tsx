"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconCalendarPlus } from "@tabler/icons-react";
import type { WeddingSettings } from "@/lib/types";
import { googleCalendarUrl, formatDateID } from "@/lib/utils";
import { Reveal } from "../Reveal";

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="relative w-[64px] h-[64px] sm:w-[80px] sm:h-[80px]">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-gold/10 blur-sm" />
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-gold/40 bg-white/20 shadow-sm" />
        {/* Inner delicate ring */}
        <div className="absolute inset-[3px] rounded-full border border-gold/[0.15]" />
        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key={value}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="font-display text-2xl sm:text-[28px] text-charcoal tabular-nums leading-none"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </div>
      </div>
      <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-gold/70 font-medium">
        {label}
      </span>
    </div>
  );
}

export function SaveTheDateSection({ settings }: { settings: WeddingSettings }) {
  const target = settings.wedding_date ? new Date(settings.wedding_date).getTime() : null;
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = target ? Math.max(0, target - now) : 0;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const calUrl = settings.wedding_date
    ? googleCalendarUrl({
        title: `Pernikahan ${settings.groom_name} & ${settings.bride_name}`,
        start: settings.wedding_date,
        location: settings.akad_location ?? settings.resepsi_location ?? "",
        details: `Acara pernikahan ${settings.groom_name} & ${settings.bride_name}`,
      })
    : null;

  return (
    <section className="py-20 sm:py-28 px-6 bg-gradient-to-br from-rose/40 via-cream to-ivory">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="text-gold tracking-widest text-sm uppercase">Counting Down</p>
          <p className="section-heading text-4xl sm:text-5xl mt-2 mb-2">Save The Date</p>
          <div className="ornament max-w-[160px] mx-auto mb-4" />
          <p className="text-muted mb-10">{formatDateID(settings.wedding_date)}</p>
        </Reveal>

        <div className="flex justify-center items-start gap-0 sm:gap-1 mb-10">
          <CountdownBox label="Hari" value={days} />
          <span className="self-center mt-3 sm:mt-4 text-gold/20 text-sm sm:text-base">✦</span>
          <CountdownBox label="Jam" value={hours} />
          <span className="self-center mt-3 sm:mt-4 text-gold/20 text-sm sm:text-base">✦</span>
          <CountdownBox label="Menit" value={minutes} />
          <span className="self-center mt-3 sm:mt-4 text-gold/20 text-sm sm:text-base">✦</span>
          <CountdownBox label="Detik" value={seconds} />
        </div>

        {calUrl && (
          <Reveal delay={0.2}>
            <a
              href={calUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-charcoal text-cream hover:bg-gold hover:text-charcoal transition-colors px-6 py-3 rounded-full text-sm sm:text-base"
            >
              <IconCalendarPlus size={18} />
              Tambahkan ke Google Calendar
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
