"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { IconCopy, IconCheck, IconQrcode, IconGift, IconX } from "@tabler/icons-react";
import type { GiftAccount } from "@/lib/types";
import { Reveal } from "../Reveal";

function QRModal({
  account,
  onClose,
}: {
  account: GiftAccount;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-cream rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-rose/40 transition"
          aria-label="Tutup"
        >
          <IconX size={18} />
        </button>
        <p className="font-display text-2xl text-charcoal">{account.bank_name}</p>
        <p className="text-muted text-sm mb-5">{account.account_holder}</p>
        <div className="bg-white p-4 rounded-2xl inline-block shadow">
          <QRCodeSVG
            value={`${account.bank_name}|${account.account_number}|${account.account_holder}`}
            size={200}
            bgColor="#ffffff"
            fgColor="#2C2C2C"
            level="M"
          />
        </div>
        <p className="font-mono mt-4 text-charcoal text-lg">{account.account_number}</p>
        <p className="text-xs text-muted mt-3">
          Scan QR atau salin nomor rekening untuk transfer
        </p>
      </motion.div>
    </motion.div>
  );
}

function AccountCard({ account, delay }: { account: GiftAccount; delay: number }) {
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

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
    <>
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
          <button
            onClick={() => setQrOpen(true)}
            className="inline-flex items-center gap-1.5 bg-gold/15 text-charcoal hover:bg-gold transition px-4 py-2 rounded-full text-sm"
          >
            <IconQrcode size={14} />
            QR
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {qrOpen && <QRModal account={account} onClose={() => setQrOpen(false)} />}
      </AnimatePresence>
    </>
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
