import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: guests } = await supabase.from("guests").select("name, slug").limit(5);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ivory via-cream to-rose px-6 py-12">
      <div className="max-w-xl text-center space-y-6">
        <p className="script-heading text-5xl">Wedding Invitation</p>
        <h1 className="section-heading text-3xl text-charcoal">Demo Undangan Digital</h1>
        <p className="text-muted leading-relaxed">
          Halaman ini hanya landing demo. Setiap tamu memiliki link unik untuk membuka undangannya.
          Lihat contoh tamu di bawah, atau masuk ke dashboard admin untuk mengelola undangan.
        </p>

        {guests && guests.length > 0 && (
          <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border border-gold/20 space-y-3">
            <p className="text-sm uppercase tracking-widest text-gold">Contoh Link Tamu</p>
            <ul className="space-y-2">
              {guests.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/${g.slug}`}
                    className="text-charcoal hover:text-gold underline-offset-4 hover:underline transition"
                  >
                    {g.name} → /{g.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4">
          <Link
            href="/admin/login"
            className="inline-block bg-charcoal text-cream px-8 py-3 rounded-full hover:bg-gold transition"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
