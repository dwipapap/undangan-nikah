# Aplikasi Undangan Pernikahan

*Baca dalam bahasa lain: [English](README.md) | [Bahasa Indonesia](README.id.md)*

Platform undangan pernikahan digital yang dibangun dengan teknologi web modern. Aplikasi ini memungkinkan Anda membuat undangan pernikahan yang dapat disesuaikan, elegan, dan responsif, lengkap dengan pelacakan RSVP, pengaturan dinamis, dan antarmuka pengguna yang interaktif.

## Fitur Utama

- **UI/UX Elegan:** Desain responsif didukung oleh Tailwind CSS dan Mantine, menampilkan animasi halus menggunakan Framer Motion.
- **Konten Dinamis:** Pengambilan dan perenderan data secara *real-time* untuk data mempelai pria, mempelai wanita, detail acara, dan galeri menggunakan Supabase.
- **Manajemen RSVP:** Formulir bawaan yang memudahkan tamu mengirimkan konfirmasi kehadiran (RSVP) secara langsung, dengan data yang tersimpan secara aman.
- **Tech Stack Modern:** Menggunakan Next.js 15 App Router, React 18, dan TypeScript untuk pengalaman pengembangan yang tangguh dan *type-safe*.

## Prasyarat

- [Node.js](https://nodejs.org/) v18+ 
- [npm](https://www.npmjs.com/) atau *package manager* pilihan Anda lainnya
- Sebuah proyek [Supabase](https://supabase.com/) (untuk Database dan Autentikasi)

## Memulai

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda.

### 1. Instal dependensi

Jalankan perintah berikut di direktori *root* proyek untuk menginstal semua paket yang diperlukan:

```bash
npm install
```

> [!NOTE]
> *Script* `postinstall` di `package.json` akan menangani pembuatan *client* secara otomatis selama instalasi berlangsung.

### 2. Konfigurasi variabel lingkungan (*environment variables*)

Buat file `.env` atau `.env.local` di *root* proyek Anda dan atur variabelnya. Secara umum Anda akan membutuhkan variabel berikut untuk Supabase:

```env
# Konfigurasi Supabase
NEXT_PUBLIC_SUPABASE_URL="url-project-supabase-anda"
NEXT_PUBLIC_SUPABASE_ANON_KEY="anon-key-supabase-anda"
```

### 3. Jalankan server pengembangan

Mulai server lokal dalam mode pengembangan (*development mode*):

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di *browser* Anda untuk melihat aplikasi.

## Struktur Proyek

- `app/` - Layout, halaman, dan API routes dari Next.js App Router.
- `components/` - Komponen React yang dapat digunakan ulang (elemen UI, komponen tata letak, *section* seperti Footer, dll.).
- `lib/` - Utilitas bersama, *types*, dan file konfigurasi.
- `types/` - Definisi tipe TypeScript.

## Teknologi yang Digunakan (*Tech Stack*)

- **Framework:** Next.js 15
- **Bahasa Pemrograman:** TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Komponen UI:** Mantine, Tabler Icons, Lucide React
- **Animasi:** Framer Motion
- **Database & Auth:** Supabase, NextAuth.js
- **Form & Validasi:** React Hook Form, Zod
