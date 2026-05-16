"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import type { GiftAccount } from "@/lib/types";
import { Reveal } from "../Reveal";

function AccountCard({
  account,
  primary,
}: {
  account: GiftAccount;
  primary?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(account.account_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div
      className={
        primary
          ? "bg-ivory shadow-md border border-gold/15 rounded-3xl p-8 text-center"
          : "bg-ivory/60 border border-gold/10 rounded-3xl p-8 text-center"
      }
    >
      {account.logo_url && (
        <div
          className={`relative mx-auto mb-6 ${primary ? "w-28 h-14" : "w-20 h-10"}`}
        >
          <Image
            src={account.logo_url}
            alt={account.bank_name}
            fill
            sizes="120px"
            className="object-contain"
          />
        </div>
      )}
      {!account.logo_url && (
        <p
          className={`font-display text-charcoal mb-5 ${primary ? "text-3xl" : "text-2xl"}`}
        >
          {account.bank_name}
        </p>
      )}

      <p className="font-mono text-3xl sm:text-4xl text-charcoal tracking-wider leading-none">
        <span
          className={`inline-block rounded-lg px-2 transition-all duration-700 ${
            copied ? "bg-gold/10" : "bg-transparent"
          }`}
        >
          {account.account_number}
        </span>
      </p>
      <p className="text-muted text-sm mt-3">a.n. {account.account_holder}</p>

      <div className="flex justify-center mt-8">
        <button
          onClick={copy}
          aria-live="polite"
          className="inline-flex items-center justify-center gap-2 bg-gold text-cream hover:bg-charcoal active:scale-[0.97] transition-all duration-200 px-8 py-3 min-h-[48px] rounded-full text-base font-medium hover:-translate-y-0.5 hover:shadow-md"
        >
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <IconCheck size={18} />
            </motion.span>
          ) : (
            <IconCopy size={18} />
          )}
          {copied ? "Tersalin!" : "Salin Nomor"}
        </button>
      </div>
    </div>
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
    <section className="py-24 sm:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="font-display text-5xl sm:text-6xl text-charcoal tracking-wide leading-[1.1]">
              Wedding Gift
            </h2>
            <div className="ornament max-w-[160px] mx-auto mt-5 mb-5" />
            {message && (
              <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
                {message}
              </p>
            )}
          </div>
        </Reveal>

        {accounts.length > 0 && (
          <div className="space-y-6">
            {accounts.map((acc, i) => (
              <Reveal key={acc.id} delay={i * 0.1}>
                <AccountCard account={acc} primary={i === 0} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
