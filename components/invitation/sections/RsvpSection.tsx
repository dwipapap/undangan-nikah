"use client";

import { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { IconSend, IconHeart, IconCheck } from "@tabler/icons-react";
import type { Guest } from "@/lib/types";
import { Reveal } from "../Reveal";

interface Wish {
  id: string;
  name: string;
  attendance: "PENDING" | "ATTENDING" | "NOT_ATTENDING";
  wishes: string;
  created_at: string;
}

export function RsvpSection({ guest }: { guest: Guest }) {
  const [attendance, setAttendance] = useState<Guest["attendance"]>(guest.attendance);
  const [count, setCount] = useState<number>(guest.number_of_guests || 1);
  const [wishes, setWishes] = useState<string>(guest.wishes ?? "");
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [allWishes, setAllWishes] = useState<Wish[]>([]);

  useEffect(() => {
    fetch("/api/wishes")
      .then((r) => r.json())
      .then(setAllWishes)
      .catch(() => {});
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch(`/api/guests/${guest.id}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendance, number_of_guests: count, wishes }),
      });
      if (res.ok) {
        setSubmitted(true);
        // Re-fetch wishes
        const updated = await fetch("/api/wishes").then((r) => r.json());
        setAllWishes(updated);
        setTimeout(() => setSubmitted(false), 3500);
      }
    });
  }

  return (
    <section className="py-20 sm:py-28 px-6 bg-gradient-to-b from-rose/30 to-cream">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-gold tracking-widest text-sm uppercase">RSVP</p>
            <p className="section-heading text-4xl sm:text-5xl mt-2">Konfirmasi Kehadiran</p>
            <div className="ornament max-w-[160px] mx-auto mt-4 mb-4" />
            <p className="text-muted">Mohon konfirmasi kehadiran Anda untuk membantu persiapan kami</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="bg-white/80 backdrop-blur rounded-3xl p-6 sm:p-8 border border-gold/20 shadow-sm"
          >
            <div className="mb-5">
              <label className="block text-sm font-medium text-charcoal mb-2">Nama</label>
              <input
                type="text"
                value={guest.name}
                disabled
                className="w-full bg-ivory border border-gold/20 rounded-xl px-4 py-3 text-charcoal"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Apakah Anda akan hadir?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "ATTENDING" as const, label: "Hadir" },
                  { val: "NOT_ATTENDING" as const, label: "Tidak Hadir" },
                ].map((o) => (
                  <button
                    key={o.val}
                    type="button"
                    onClick={() => setAttendance(o.val)}
                    className={`px-4 py-3 rounded-xl border-2 transition text-sm font-medium ${
                      attendance === o.val
                        ? "border-gold bg-gold text-charcoal"
                        : "border-gold/20 bg-white text-charcoal hover:border-gold/50"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {attendance === "ATTENDING" && (
              <div className="mb-5">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Jumlah tamu yang hadir
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full bg-white border border-gold/30 focus:border-gold focus:outline-none rounded-xl px-4 py-3 text-charcoal"
                />
              </div>
            )}

            <div className="mb-5">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Ucapan & Doa
              </label>
              <textarea
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                rows={4}
                placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                className="w-full bg-white border border-gold/30 focus:border-gold focus:outline-none rounded-xl px-4 py-3 text-charcoal resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={pending || attendance === "PENDING"}
              className="w-full bg-charcoal text-cream py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gold hover:text-charcoal transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitted ? (
                <>
                  <IconCheck size={18} /> Terima kasih!
                </>
              ) : (
                <>
                  <IconSend size={18} /> Kirim Konfirmasi
                </>
              )}
            </button>
          </form>
        </Reveal>

        {allWishes.length > 0 && (
          <Reveal delay={0.2}>
            <div className="mt-12">
              <h3 className="font-display text-2xl sm:text-3xl text-center mb-6 text-charcoal">
                Ucapan dari Tamu
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {allWishes.map((w) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/70 backdrop-blur rounded-2xl p-4 border border-gold/15"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <IconHeart size={16} className="text-gold" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-charcoal text-sm">{w.name}</p>
                        <p className="text-muted text-sm mt-1 leading-relaxed">{w.wishes}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
