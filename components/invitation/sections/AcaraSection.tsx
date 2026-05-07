"use client";

import { motion } from "framer-motion";
import { IconMapPin, IconClock, IconCalendarEvent } from "@tabler/icons-react";
import type { WeddingSettings } from "@/lib/types";
import { Reveal } from "../Reveal";

function EventCard({
  title,
  day,
  date,
  time,
  location,
  mapsUrl,
  delay = 0,
}: {
  title: string;
  day: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  mapsUrl: string | null;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="bg-white/80 backdrop-blur rounded-3xl border border-gold/20 p-8 shadow-md text-center"
    >
      <div className="inline-flex p-3 rounded-full bg-gold/15 text-gold mb-4">
        <IconCalendarEvent size={24} />
      </div>
      <h3 className="font-display text-3xl sm:text-4xl text-charcoal mb-1">{title}</h3>
      <div className="ornament max-w-[100px] mx-auto mb-4" />

      {day && date && (
        <p className="text-charcoal text-base sm:text-lg font-medium">
          {day}, {date}
        </p>
      )}
      {time && (
        <p className="flex items-center justify-center gap-2 text-muted mt-2">
          <IconClock size={16} className="text-gold" />
          {time}
        </p>
      )}
      {location && (
        <p className="flex items-start justify-center gap-2 text-muted mt-3 max-w-xs mx-auto leading-relaxed">
          <IconMapPin size={16} className="text-gold mt-1 flex-shrink-0" />
          <span>{location}</span>
        </p>
      )}
      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-5 px-5 py-2 bg-gold text-charcoal text-sm rounded-full hover:bg-charcoal hover:text-cream transition"
        >
          Lihat Lokasi
        </a>
      )}
    </motion.div>
  );
}

export function AcaraSection({ settings }: { settings: WeddingSettings }) {
  return (
    <section className="py-20 sm:py-28 px-6 bg-cream">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-gold tracking-widest text-sm uppercase">The Wedding</p>
            <p className="section-heading text-4xl sm:text-5xl mt-2">Acara Pernikahan</p>
            <div className="ornament max-w-[160px] mx-auto mt-4 mb-6" />
            <p className="text-muted max-w-2xl mx-auto leading-relaxed">
              Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk
              menghadiri acara pernikahan kami:
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <EventCard
            title="Akad Nikah"
            day={settings.akad_day}
            date={settings.akad_date}
            time={settings.akad_time}
            location={settings.akad_location}
            mapsUrl={settings.akad_maps_url}
          />
          <EventCard
            title="Resepsi"
            day={settings.resepsi_day}
            date={settings.resepsi_date}
            time={settings.resepsi_time}
            location={settings.resepsi_location}
            mapsUrl={settings.resepsi_maps_url}
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
