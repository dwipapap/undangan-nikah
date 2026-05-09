"use client";

import { motion } from "framer-motion";
import { IconMapPin, IconClock } from "@tabler/icons-react";
import type { WeddingSettings } from "@/lib/types";
import { Reveal } from "../Reveal";

function EventCard({
  title,
  day,
  date,
  time,
  location,
  mapsUrl,
  backgroundImageUrl,
  delay = 0,
}: {
  title: string;
  day: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  mapsUrl: string | null;
  backgroundImageUrl: string | null;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="relative w-full max-w-sm mx-auto bg-white shadow-xl rounded-[2.5rem] overflow-hidden p-[10px]"
    >
      {/* Background Floral/Frame Placeholder */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url('${backgroundImageUrl || 'https://images.unsplash.com/photo-1558227092-42da09eb4718?q=80&w=600&auto=format&fit=crop'}')`,
        }}
      />
      
      {/* Inner Card (Cream area) */}
      <div className="relative z-10 bg-[#faf7ee]/95 backdrop-blur-sm h-full w-full rounded-[2rem] p-8 flex flex-col items-center text-center border border-gold/10">
        
        <h3 className="font-display text-4xl sm:text-5xl text-charcoal mb-6 mt-4 capitalize" style={{ fontFamily: 'var(--font-great-vibes), cursive' }}>
          {title}
        </h3>

        {day && date && (
          <div className="mb-4">
            <p className="text-charcoal text-base sm:text-lg tracking-widest uppercase font-serif">
              {day}
            </p>
            <p className="text-charcoal text-xl sm:text-2xl font-semibold uppercase mt-1 mb-2">
              {date}
            </p>
          </div>
        )}
        
        {time && (
          <p className="text-charcoal font-medium text-sm mb-6 pb-6 border-b border-gold/20 w-3/4 mx-auto">
            Pukul {time} WIB
          </p>
        )}

        <div className="mb-4 text-gold">
          <IconMapPin size={24} />
        </div>

        {location && (
          <div className="mb-8 flex-1">
            <p className="font-serif text-charcoal font-semibold text-lg uppercase tracking-wider mb-2">
              {location.split(',')[0]} {/* Assuming the first part is venue name */}
            </p>
            <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-[200px] mx-auto">
              {location}
            </p>
          </div>
        )}

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-auto px-6 py-2.5 bg-[#4B5E65] text-white text-sm font-medium rounded-full hover:bg-opacity-90 transition shadow-md"
          >
            <IconMapPin size={16} />
            Google Map
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function AcaraSection({ settings }: { settings: WeddingSettings }) {
  return (
    <section className="py-20 sm:py-28 px-4 bg-[#f5e6e0]/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <p className="section-heading text-4xl sm:text-5xl mt-2">Rangkaian Acara</p>
            <div className="ornament max-w-[120px] mx-auto mt-4 mb-4" />
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-center gap-8 sm:gap-10">
          <EventCard
            title="Akad Nikah"
            day={settings.akad_day}
            date={settings.akad_date}
            time={settings.akad_time}
            location={settings.akad_location}
            mapsUrl={settings.akad_maps_url}
            backgroundImageUrl={settings.acara_background_image ?? null}
          />
          <EventCard
            title="Resepsi"
            day={settings.resepsi_day}
            date={settings.resepsi_date}
            time={settings.resepsi_time}
            location={settings.resepsi_location}
            mapsUrl={settings.resepsi_maps_url}
            backgroundImageUrl={settings.acara_background_image ?? null}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
