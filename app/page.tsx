"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  HeartHandshake,
  Images,
  BookHeart,
  Brush,
  ChevronDown,
  ExternalLink,
  Sparkles,
  MessageCircleHeart,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- shared animation variants ---------- */
const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay },
  }),
};

/* ---------- phone mockup ---------- */
function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[240px] sm:w-[280px] aspect-[9/19]",
        "rounded-[2.5rem] border-4 border-charcoal/10 bg-warm-parchment",
        "shadow-xl shadow-charcoal/5 overflow-hidden",
        className,
      )}
    >
      {/* notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-charcoal/10 rounded-b-2xl z-10" />
      {/* screen */}
      <div className="absolute inset-0 m-[6px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-soft-ivory via-warm-parchment to-rose-dust/30">
        {children}
      </div>
      {/* home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-charcoal/15 rounded-full" />
    </div>
  );
}

/* ---------- feature data ---------- */
const features = [
  {
    icon: MessageCircleHeart,
    title: "RSVP & Ucapan",
    desc: "Tamu mengonfirmasi kehadiran dan menulis doa langsung dari undangan. Semua data tersimpan rapi.",
  },
  {
    icon: Images,
    title: "Galeri Foto",
    desc: "Tampilkan momen-momen berharga dalam galeri interaktif dengan lightbox dan tata letak masonry.",
  },
  {
    icon: BookHeart,
    title: "Love Story",
    desc: "Ceritakan perjalanan cinta kalian dalam timeline vertikal yang romantis dan penuh makna.",
  },
  {
    icon: Brush,
    title: "Kustomisasi Penuh",
    desc: "Atur nama, foto, tanggal, lokasi, musik, dan warna lewat dashboard admin yang mudah.",
  },
];

/* ---------- scroll indicator ---------- */
function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 text-muted"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1 }}
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={18} />
      </motion.div>
    </motion.div>
  );
}

/* ---------- navbar ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-warm-parchment/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-16 sm:px-8">
        <Link href="/" className="font-display text-xl text-midnight-slate tracking-wide">
          Wedding<span className="font-script italic">Invi</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-muted">
          <a href="#features" className="hover:text-midnight-slate transition-colors">
            Fitur
          </a>
          <a href="#demo" className="hover:text-midnight-slate transition-colors">
            Demo
          </a>
          <a
            href="https://dwipaa.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-midnight-slate text-warm-parchment px-5 py-2 rounded-full text-sm font-medium hover:bg-charcoal transition-colors inline-flex items-center gap-1.5"
          >
            Lihat Demo <ExternalLink size={14} />
          </a>
        </nav>
      </div>
    </motion.header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center px-6 pt-20 pb-12 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-parchment via-soft-ivory to-rose-dust/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#383f54_0%,_transparent_60%)] opacity-[0.03]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto gap-8">
        {/* phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: easeOut }}
        >
          <PhoneFrame>
            <div className="flex flex-col items-center justify-center h-full px-4 py-12 text-center gap-1">
              <p className="text-[10px] tracking-[0.2em] uppercase text-midnight-slate/60">
                Wedding Invitation
              </p>
              <p className="font-script text-[1.6rem] leading-tight text-script-gold mt-1">
                Ahmad & Sarah
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted mt-2">
                Sabtu, 15 Juni 2026
              </p>
              <div className="mt-auto flex flex-col items-center gap-1">
                <p className="text-[9px] text-muted/60">Kepada Yth.</p>
                <p className="text-[11px] font-medium text-charcoal">Bapak/Ibu Tamu Undangan</p>
                <span className="mt-2 text-[9px] bg-midnight-slate text-warm-parchment px-4 py-1.5 rounded-full tracking-wider">
                  Buka Undangan
                </span>
              </div>
            </div>
          </PhoneFrame>
        </motion.div>

        {/* headline */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
            }}
            className="text-xs uppercase tracking-[0.25em] text-midnight-slate font-medium"
          >
            Undangan Pernikahan Digital
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.1 } },
            }}
            className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-charcoal"
          >
            Undangan yang
            <br />
            <span className="text-midnight-slate italic">terasa personal</span>
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: 0.2 } },
            }}
            className="text-muted text-base sm:text-lg leading-relaxed max-w-md mx-auto"
          >
            Buat undangan pernikahan digital yang elegan, interaktif, dan mudah dibagikan.
            Cukup dengan satu link, setiap tamu mendapatkan pengalaman yang personal.
          </motion.p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: easeOut }}
        >
          <a
            href="https://dwipaa.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-midnight-slate text-warm-parchment px-8 py-3.5 rounded-full text-base font-medium hover:bg-charcoal transition-colors inline-flex items-center gap-2 shadow-lg shadow-midnight-slate/10"
          >
            Lihat Demo <Sparkles size={16} />
          </a>
          <a
            href="#features"
            className="text-muted hover:text-charcoal transition-colors text-sm px-4 py-2"
          >
            Pelajari fitur
          </a>
        </motion.div>

        <ScrollIndicator />
      </div>
    </section>
  );
}

/* ---------- features ---------- */
function Features() {
  return (
    <section id="features" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.25em] text-midnight-slate font-medium mb-3"
          >
            Fitur Unggulan
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight"
          >
            Semua yang kamu butuhkan
            <br />
            <span className="text-midnight-slate italic">dalam satu undangan</span>
          </motion.h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: easeOut, delay: i * 0.1 },
                },
              }}
              className={cn(
                "group relative rounded-2xl p-6 sm:p-8 transition-shadow",
                i === 0
                  ? "bg-midnight-slate/5 sm:col-span-2 sm:grid sm:grid-cols-2 sm:items-center sm:gap-10 sm:p-10"
                  : "bg-soft-ivory border border-midnight-slate/5",
                i === 3 && "sm:col-span-2 sm:grid sm:grid-cols-2 sm:items-center sm:gap-10 sm:p-10",
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                  i === 0 || i === 3 ? "bg-midnight-slate text-warm-parchment" : "bg-warm-parchment text-midnight-slate",
                )}
              >
                <f.icon size={22} />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl text-charcoal mb-2">{f.title}</h3>
                <p className="text-muted text-sm sm:text-base leading-relaxed">{f.desc}</p>
              </div>
              {(i === 0 || i === 3) && (
                <div className="hidden sm:block h-full min-h-[120px] bg-gradient-to-br from-warm-parchment to-rose-dust/40 rounded-xl border border-midnight-slate/5" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- demo preview ---------- */
function DemoPreview() {
  return (
    <section id="demo" className="relative px-6 py-24 sm:py-32 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-dust/20 via-soft-ivory to-warm-parchment" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.25em] text-midnight-slate font-medium mb-3"
          >
            Demo
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight"
          >
            Lihat bagaimana
            <br />
            <span className="text-midnight-slate italic">tampilannya</span>
          </motion.h2>
        </motion.div>

        {/* phone + content side by side */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <motion.div variants={fadeUp} className="lg:flex-1 order-2 lg:order-1">
            <PhoneFrame className="lg:scale-110">
              <div className="flex flex-col h-full">
                {/* simulated sections inside phone */}
                <div className="h-1/3 bg-gradient-to-b from-charcoal/5 to-transparent flex items-end p-4 pb-2">
                  <p className="font-script text-lg text-script-gold">Ahmad & Sarah</p>
                </div>
                <div className="flex-1 px-4 py-3 space-y-2 overflow-hidden">
                  <div className="h-2 w-3/4 bg-midnight-slate/10 rounded-full" />
                  <div className="h-2 w-1/2 bg-midnight-slate/10 rounded-full" />
                  <div className="flex gap-2 mt-3">
                    <div className="w-8 h-8 rounded-full bg-midnight-slate/10" />
                    <div className="w-8 h-8 rounded-full bg-midnight-slate/10" />
                  </div>
                  <div className="h-16 bg-rose-dust/30 rounded-xl mt-2" />
                  <div className="h-2 w-full bg-midnight-slate/10 rounded-full mt-2" />
                  <div className="h-2 w-2/3 bg-midnight-slate/10 rounded-full" />
                </div>
                <div className="px-4 py-3 border-t border-midnight-slate/5">
                  <div className="h-8 bg-midnight-slate/10 rounded-full" />
                </div>
              </div>
            </PhoneFrame>
          </motion.div>

          <motion.div variants={fadeUp} className="lg:flex-1 order-1 lg:order-2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-midnight-slate/5 rounded-full text-xs text-midnight-slate font-medium">
              <HeartHandshake size={14} />
              Satu link untuk semua tamu
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-charcoal leading-snug">
              Setiap tamu mendapatkan halaman undangan pribadi
            </h3>
            <p className="text-muted leading-relaxed">
              Cukup bagikan link unik ke masing-masing tamu. Mereka bisa melihat informasi
              pernikahan, mengirimkan ucapan, konfirmasi kehadiran, dan melihat galeri foto
              dalam satu halaman yang elegan.
            </p>
            <ul className="space-y-3 text-sm text-left">
              {[
                { icon: MapPin, text: "Info acara & lokasi dengan Google Maps" },
                { icon: MessageCircleHeart, text: "RSVP & ucapan langsung dari undangan" },
                { icon: Images, text: "Galeri foto dengan lightbox" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-muted">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-midnight-slate/5 text-midnight-slate shrink-0">
                    <item.icon size={16} />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function Cta() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-slate to-midnight-slate/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#383f54_0%,_transparent_70%)] opacity-50" />

      <motion.div
        className="relative z-10 mx-auto max-w-xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        <motion.p
          variants={fadeUp}
          className="text-xs uppercase tracking-[0.25em] text-warm-parchment/60 font-medium mb-3"
        >
          Mulai Sekarang
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl sm:text-4xl md:text-5xl text-warm-parchment leading-tight"
        >
          Siap membuat undangan
          <br />
          <span className="italic">yang berkesan?</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-warm-parchment/70 text-sm sm:text-base leading-relaxed mt-4 max-w-sm mx-auto"
        >
          Lihat contoh undangan langsung di browser kamu. Tidak perlu daftar, tidak perlu
          bayar. Cukup klik tombol di bawah.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8">
          <a
            href="https://dwipaa.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-warm-parchment text-midnight-slate px-8 py-3.5 rounded-full text-base font-medium hover:bg-soft-ivory transition-colors shadow-lg shadow-black/10"
          >
            Lihat Demo Langsung <ExternalLink size={16} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- footer ---------- */
function FooterSection() {
  return (
    <footer className="bg-charcoal text-warm-parchment/60 px-6 py-12 text-center text-sm">
      <div className="mx-auto max-w-md space-y-2">
        <p className="font-script text-2xl text-warm-parchment/80">WeddingInvi</p>
        <p>Undangan pernikahan digital yang elegan dan personal.</p>
        <p className="text-xs text-warm-parchment/40">
          &copy; {new Date().getFullYear()} WeddingInvi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */
export default function HomePage() {
  return (
    <div className="bg-warm-parchment text-charcoal">
      <Nav />
      <Hero />
      <Features />
      <DemoPreview />
      <Cta />
      <FooterSection />
    </div>
  );
}
