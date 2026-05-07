import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ivory via-cream to-rose px-6 py-12 text-center">
      <p className="script-heading text-6xl mb-3">Oops</p>
      <h1 className="text-2xl font-display text-charcoal mb-2">Undangan tidak ditemukan</h1>
      <p className="text-muted max-w-md mb-6">
        Link undangan yang Anda buka tidak valid atau sudah tidak aktif. Silakan hubungi mempelai
        untuk mendapatkan link yang benar.
      </p>
      <Link
        href="/"
        className="inline-block bg-charcoal text-cream px-6 py-2 rounded-full hover:bg-gold transition"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
