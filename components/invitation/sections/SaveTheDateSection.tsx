"use client";

import { useEffect, useState } from "react";
import { IconCalendarPlus } from "@tabler/icons-react";
import type { WeddingSettings } from "@/lib/types";
import { googleCalendarUrl, formatDateID } from "@/lib/utils";
import { Reveal } from "../Reveal";

function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/70 backdrop-blur rounded-xl border border-gold/30 p-3 sm:p-5 min-w-[68px] sm:min-w-[90px] text-center shadow-sm">
      <div className="text-3xl sm:text-5xl font-display text-charcoal tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gold mt-1">
        {label}
      </div>
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

        <Reveal delay={0.1}>
          <div className="flex justify-center gap-2 sm:gap-4 mb-10">
            <CountdownBox label="Hari" value={days} />
            <CountdownBox label="Jam" value={hours} />
            <CountdownBox label="Menit" value={minutes} />
            <CountdownBox label="Detik" value={seconds} />
          </div>
        </Reveal>

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
