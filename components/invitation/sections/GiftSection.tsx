"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconCopy, IconCheck, IconGift } from "@tabler/icons-react";
import type { GiftAccount } from "@/lib/types";
import { Reveal } from "../Reveal";

function AccountCard({ account, delay }: { account: GiftAccount; delay: number }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(account.account_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay }}
        className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-gold/20 shadow-sm text-center"
      >
        {account.logo_url && (
          <div className="relative w-24 h-12 mx-auto mb-4">
            <Image
              src={account.logo_url}
              alt={account.bank_name}
              fill
              sizes="100px"
              className="object-contain"
            />
          </div>
        )}
        {!account.logo_url && (
          <p className="font-display text-2xl text-charcoal mb-3">{account.bank_name}</p>
        )}
        <p className="font-mono text-2xl text-charcoal tracking-wider">
          {account.account_number}
        </p>
        <p className="text-muted text-sm mt-1">a.n. {account.account_holder}</p>

        <div className="flex justify-center gap-2 mt-5">
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 bg-charcoal text-cream hover:bg-gold hover:text-charcoal transition px-4 py-2 rounded-full text-sm"
          >
            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            {copied ? "Tersalin!" : "Salin Nomor"}
          </button>
        </div>
      </motion.div>
  );
}

export function GiftSection({
  accounts,
  message,
}: {
  accounts: GiftAccount[];
  message: string | null;
}) {
  if (accounts.length === 0 && !message) return null;

  return (
    <section className="py-20 sm:py-28 px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <div className="inline-flex p-3 rounded-full bg-gold/15 text-gold mb-3">
              <IconGift size={22} />
            </div>
            <p className="text-gold tracking-widest text-sm uppercase">Gift</p>
            <p className="section-heading text-4xl sm:text-5xl mt-2">Wedding Gift</p>
            <div className="ornament max-w-[160px] mx-auto mt-4 mb-6" />
            {message && (
              <p className="text-muted max-w-2xl mx-auto leading-relaxed">{message}</p>
            )}
          </div>
        </Reveal>

        {accounts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {accounts.map((acc, i) => (
              <AccountCard key={acc.id} account={acc} delay={i * 0.1} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
