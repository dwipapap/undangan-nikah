"use client";

import { useEffect, useState, useTransition } from "react";
import { IconSend, IconCheck } from "@tabler/icons-react";
import type { Guest } from "@/lib/types";
import { Reveal } from "../Reveal";

interface Wish {
  id: string;
  name: string;
  wishes: string;
  created_at: string;
}

export function RsvpSection({ guest }: { guest: Guest }) {
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
        body: JSON.stringify({ attendance: guest.attendance || "PENDING", number_of_guests: guest.number_of_guests || 1, wishes }),
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
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <svg className="mx-auto mb-5 text-gold" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="14" cy="14" r="6" />
              <circle cx="22" cy="14" r="6" />
              <path d="M12 23 l5 -4 l5 4" />
            </svg>
            <h2 className="font-display text-5xl sm:text-6xl text-charcoal tracking-wide leading-[1.1]">
              Buku Tamu
            </h2>
            <p className="text-muted text-lg mt-4 max-w-xl mx-auto leading-relaxed">
              Tuliskan ucapan dan doa untuk kedua mempelai
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="bg-ivory rounded-3xl p-6 sm:p-8 border border-gold/10"
          >
            <div className="mb-6">
              <label className="block text-sm font-medium text-charcoal mb-2">Nama</label>
              <input
                type="text"
                value={guest.name}
                disabled
                className="w-full bg-ivory border border-gold/20 rounded-xl px-4 py-3 text-charcoal opacity-60 cursor-not-allowed"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Ucapan & Doa
              </label>
              <textarea
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                rows={4}
                placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
                className="w-full bg-ivory border border-gold/30 focus:border-gold focus:outline-none rounded-xl px-4 py-3 text-charcoal resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={pending || wishes.trim() === ""}
              className="w-full bg-charcoal text-cream py-3 min-h-[48px] rounded-full flex items-center justify-center gap-2 hover:bg-gold hover:text-charcoal transition disabled:opacity-60 disabled:cursor-not-allowed text-base font-medium"
            >
              {submitted ? (
                <>
                  <IconCheck size={18} /> Terima kasih!
                </>
              ) : (
                <>
                  <IconSend size={18} /> Kirim Ucapan
                </>
              )}
            </button>
          </form>
        </Reveal>

        {allWishes.length > 0 && (
          <Reveal delay={0.2}>
            <div className="mt-16">
              <h3 className="font-display text-2xl sm:text-3xl text-center mb-8 text-charcoal">
                Ucapan dari Tamu
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {allWishes.map((w) => (
                  <div
                    key={w.id}
                    className="bg-ivory/60 rounded-2xl p-4 border border-gold/10"
                  >
                    <p className="font-medium text-charcoal text-sm">{w.name}</p>
                    <p className="text-xs text-muted/70 mt-0.5">
                      {new Date(w.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                    </p>
                    <p className="text-muted text-sm mt-2 leading-relaxed">{w.wishes}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
