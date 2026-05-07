# PROMPT: Wedding Invitation Website — Next.js Full-Stack

## Project Overview

Buatkan sebuah **wedding invitation website** full-stack menggunakan **Next.js (App Router)** dengan fitur dashboard admin untuk mengelola seluruh konten undangan. Website ini harus mobile-first, elegan, dan performa tinggi.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (via Supabase atau Neon) |
| ORM | Prisma |
| Auth (Admin) | NextAuth.js (credentials provider, cukup 1 admin account) |
| UI — Public (Undangan) | Tailwind CSS + Framer Motion (animasi scroll & transisi halus) |
| UI — Admin Dashboard | Mantine UI v7 (lengkap, modern, cocok untuk dashboard) |
| File Upload | UploadThing atau Supabase Storage |
| Deployment Target | Vercel |

---

## Arsitektur & Routing

```
/                         → Landing / redirect
/[slug]                   → Halaman undangan per tamu (slug = unique guest link)
/admin                    → Dashboard admin (protected)
/admin/login              → Login admin
/admin/settings           → Edit data mempelai, tanggal, lokasi, dll
/admin/guests             → CRUD tamu undangan + generate link
/admin/gallery            → Upload & kelola foto gallery
/admin/love-story         → CRUD love story slides
/admin/gift               → Edit info rekening / wedding gift
/api/...                  → API routes (Next.js Route Handlers)
```

---

## Database Schema (Prisma)

Buat schema Prisma dengan model-model berikut:

### `Admin`
- id, email, password (hashed), createdAt

### `WeddingSettings` (singleton — 1 row)
- id
- groomName (nama mempelai pria)
- groomPhoto (URL foto)
- groomChildOrder (anak ke-berapa, string: "pertama", "kedua", dst)
- groomFatherName
- groomMotherName
- groomInstagram (username IG)
- brideName (nama mempelai wanita)
- bridePhoto (URL foto)
- brideChildOrder
- brideFatherName
- brideMotherName
- brideInstagram
- weddingDate (DateTime — tanggal utama pernikahan)
- heroImage (URL gambar hero section 1)
- quoteText (hadist/quote di section 2)
- quoteSource (sumber hadist)
- akadDay, akadDate, akadTime, akadLocation, akadMapsUrl
- resepsiDay, resepsiDate, resepsiTime, resepsiLocation, resepsiMapsUrl
- giftMessage (teks di section wedding gift)
- createdAt, updatedAt

### `GuestPhoto` (foto couple di section 2 — image card)
- id, imageUrl, caption, order, createdAt

### `Guest`
- id, name, slug (unique, auto-generate dari nama + random string), 
- attendance (enum: PENDING, ATTENDING, NOT_ATTENDING)
- numberOfGuests (jumlah tamu yang hadir)
- wishes (ucapan dari tamu)
- createdAt

### `GalleryPhoto`
- id, imageUrl, caption, order, createdAt

### `LoveStory`
- id, title, date, description, imageUrl, order, createdAt

### `GiftAccount`
- id, bankName, accountNumber, accountHolder, logoUrl, order, createdAt

---

## Halaman Undangan (`/[slug]`) — Detail Per Section

Seluruh halaman undangan adalah **single-page scrollable** dengan animasi reveal on scroll (gunakan Framer Motion `whileInView`). Desain harus **elegan, romantis, mobile-first**. Gunakan font kombinasi seperti:
- Display/heading: `Playfair Display` atau `Cormorant Garamond`
- Body: `Poppins` atau `Montserrat`
- Accent/script: `Great Vibes` atau `Dancing Script`

Warna tema default: soft gold (#D4AF37), cream/ivory (#FFFDF5), dark charcoal (#2C2C2C), soft pink (#F5E6E0). Semua warna bisa di-hardcode dulu.

---

### 🔲 Opening Popup (Cover / Overlay)

- Fullscreen overlay yang muncul saat pertama kali buka halaman
- Background: gambar blur atau warna gradient gelap elegan
- Konten di tengah (centered vertically & horizontally):
  - Tulisan "WEDDING INVITATION" (uppercase, letter-spacing lebar)
  - Nama kedua mempelai dengan font script/display yang indah (ambil dari DB: `groomName` & `brideName`)
  - Tanggal pernikahan (format: "Sabtu, 15 Juni 2026" — ambil dari `weddingDate`)
  - Tulisan "Kepada Yth:" 
  - **Nama tamu** (ambil dari DB `Guest.name` berdasarkan slug di URL)
  - Tombol "Buka Undangan" — klik untuk dismiss overlay dengan animasi fade-out/slide-up, lalu mulai play background music (opsional)
- Jika slug tidak ditemukan di database, tampilkan halaman 404 atau pesan "Undangan tidak ditemukan"

---

### Section 1 — Hero Image

- Full-width image (dari `heroImage` di WeddingSettings)
- Aspect ratio responsif, object-fit cover
- Bisa ditambahkan overlay teks nama mempelai & tanggal (opsional)
- Animasi: fade-in saat scroll

---

### Section 2 — "We Found Love"

- Heading: "We Found Love" (font script)
- Grid/carousel foto couple (dari tabel `GuestPhoto`) — tampilkan dalam image card dengan efek hover
- Di bawah foto: tampilkan **hadist/quote** (dari `quoteText` dan `quoteSource`)
- Animasi: stagger reveal untuk cards

---

### Section 3 — Bride & Groom

- Heading: "Bride & Groom"
- Layout dua kolom (atau stacked di mobile):

**Mempelai Pria:**
- Foto circular/rounded (dari `groomPhoto`)
- Nama (dari `groomName`) — font display besar
- Teks: "Putra [groomChildOrder] dari Bapak [groomFatherName] & Ibu [groomMotherName]"
- Icon Instagram yang link ke `https://instagram.com/[groomInstagram]`

**Mempelai Wanita:**
- Foto circular/rounded (dari `bridePhoto`)
- Nama (dari `brideName`) — font display besar
- Teks: "Putri [brideChildOrder] dari Bapak [brideFatherName] & Ibu [brideMotherName]"
- Icon Instagram yang link ke `https://instagram.com/[brideInstagram]`

- Animasi: slide-in dari kiri (pria) dan kanan (wanita)

---

### Section 4 — Save The Date

- Heading: "Save The Date"
- **Countdown timer** (hitung mundur ke `weddingDate`) — tampilkan Hari, Jam, Menit, Detik dalam card/box terpisah, update real-time
- Tombol **"Add to Google Calendar"** — generate Google Calendar URL dengan parameter:
  - Title: "Pernikahan [groomName] & [brideName]"
  - Date: dari weddingDate
  - Location: dari akadLocation atau resepsiLocation

---

### Section 5 — Acara Pernikahan

- Heading teks: "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri acara pernikahan kami:"
- **Card Akad Nikah:**
  - Icon/ornamen akad
  - Hari & tanggal (dari `akadDay`, `akadDate`)
  - Jam (dari `akadTime`)
  - Lokasi (dari `akadLocation`)
  - Button "Lihat Lokasi" → buka `akadMapsUrl` di tab baru
  
- **Card Resepsi:**
  - Icon/ornamen resepsi
  - Hari & tanggal (dari `resepsiDay`, `resepsiDate`)
  - Jam (dari `resepsiTime`)
  - Lokasi (dari `resepsiLocation`)
  - Button "Lihat Lokasi" → buka `resepsiMapsUrl` di tab baru

- Kedua card side-by-side di desktop, stacked di mobile
- Animasi: scale-up reveal

---

### Section 6 — Gallery

- Heading: "Our Gallery"
- Grid layout foto (dari tabel `GalleryPhoto`, ordered by `order`)
- Klik foto → lightbox/modal full-screen dengan navigasi prev/next
- Responsif: 2 kolom di mobile, 3-4 kolom di desktop
- Animasi: masonry/stagger fade-in

---

### Section 7 — Love Story

- Heading: "Our Love Story"
- Format: **vertical timeline** atau **horizontal slider/carousel**
- Setiap slide/point berisi (dari tabel `LoveStory`, ordered by `order`):
  - Tanggal (`date`)
  - Judul (`title`)
  - Deskripsi (`description`)
  - Foto (`imageUrl`) — opsional
- Navigasi: swipe (mobile) atau arrow buttons (desktop)
- Animasi: slide transition

---

### Section 8 — Wedding Gift

- Heading: "Wedding Gift"
- Teks: dari `giftMessage` di WeddingSettings (default: "Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.")
- **Cards rekening** (dari tabel `GiftAccount`, ordered by `order`):
  - Logo bank (`logoUrl`)
  - Nama bank (`bankName`)
  - Nomor rekening (`accountNumber`) + tombol copy ke clipboard
  - Atas nama (`accountHolder`)
- Animasi: fade-in

---

### Section 9 — RSVP & Ucapan (Tambahan yang direkomendasikan)

- Form RSVP:
  - Konfirmasi kehadiran (Ya / Tidak) — update `Guest.attendance`
  - Jumlah tamu — update `Guest.numberOfGuests`
  - Ucapan & doa — update `Guest.wishes`
- Di bawah form: tampilkan daftar ucapan dari tamu lain (read-only, paginated)
- Animasi: slide-up

---

### Footer

- Tulisan "Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i berkenan hadir."
- Nama kedua mempelai
- Ornamen/border bawah
- Credit kecil: "Built with ❤️"

---

### Fitur Tambahan di Halaman Undangan

- **Background Music**: audio player floating (tombol play/pause di pojok), auto-play setelah klik "Buka Undangan". File musik di-upload via admin.
- **Scroll-to-top button**: floating button
- **WhatsApp Share**: tombol floating untuk share link undangan

---

## Dashboard Admin (`/admin`) — Detail

Gunakan **Mantine UI v7** untuk seluruh dashboard. Layout: sidebar navigation + main content area. Responsive.

### Halaman Dashboard

#### `/admin` — Overview
- Summary: jumlah tamu, yang sudah konfirmasi hadir, yang belum, yang tidak hadir
- Quick links ke setiap bagian

#### `/admin/settings` — Pengaturan Umum
- Form edit semua field di `WeddingSettings`:
  - Upload hero image, foto mempelai pria & wanita
  - Input nama, child order, nama orang tua, IG
  - Date picker untuk weddingDate
  - Input detail akad & resepsi (hari, tanggal, jam, lokasi, maps URL)
  - Textarea untuk quote/hadist dan gift message
  - Upload background music (mp3)
- Tombol Save — update via API

#### `/admin/guests` — Manajemen Tamu
- Tabel daftar tamu (searchable, sortable, paginated) dengan kolom:
  - Nama, Slug, Link Undangan (copyable), Status kehadiran, Jumlah tamu, Ucapan
- Tombol tambah tamu baru (modal form: input nama → auto-generate slug)
- Tombol edit & hapus per baris
- Bulk import tamu dari CSV (opsional)
- Tombol "Copy Link" per tamu → copy `https://domain.com/[slug]`

#### `/admin/photos` — Foto Couple (Section 2)
- Upload, reorder (drag & drop), delete foto couple
- Input caption per foto

#### `/admin/gallery` — Gallery (Section 6)
- Upload multiple foto
- Reorder (drag & drop), delete, edit caption

#### `/admin/love-story` — Love Story (Section 7)
- CRUD love story items
- Form: title, date, description, upload image
- Reorder drag & drop

#### `/admin/gift` — Wedding Gift (Section 8)
- CRUD rekening/account
- Form: nama bank, nomor rekening, atas nama, upload logo bank
- Reorder drag & drop

#### `/admin/wishes` — Ucapan Tamu
- Read-only list semua ucapan dari tamu (bisa delete yang tidak pantas)

---

## API Routes (Route Handlers)

Buat API routes di `app/api/...`:

```
POST   /api/auth/login
GET    /api/settings
PUT    /api/settings
GET    /api/guests
POST   /api/guests
PUT    /api/guests/[id]
DELETE /api/guests/[id]
GET    /api/guests/by-slug/[slug]
POST   /api/guests/[id]/rsvp
GET    /api/photos
POST   /api/photos
PUT    /api/photos/[id]
DELETE /api/photos/[id]
GET    /api/gallery
POST   /api/gallery
DELETE /api/gallery/[id]
GET    /api/love-story
POST   /api/love-story
PUT    /api/love-story/[id]
DELETE /api/love-story/[id]
GET    /api/gift
POST   /api/gift
PUT    /api/gift/[id]
DELETE /api/gift/[id]
GET    /api/wishes
DELETE /api/wishes/[id]
POST   /api/upload (file upload handler)
```

Semua route admin harus dilindungi middleware auth (cek session).

---

## Instruksi Implementasi

1. **Mulai dari database**: Setup Prisma schema → migrate → seed data dummy
2. **Bangun API routes** dulu, test dengan Postman/curl
3. **Bangun dashboard admin** — settings dulu, lalu guests, lalu sisanya
4. **Bangun halaman undangan** section per section, pastikan data dari DB muncul
5. **Tambahkan animasi** dengan Framer Motion
6. **Polish**: responsif, loading states, error handling, SEO meta tags per tamu

---

## Catatan Penting

- Semua teks dan konten harus bisa diubah dari dashboard admin, BUKAN hardcoded
- Slug tamu harus unik dan URL-friendly (contoh: `budi-santoso-x7k2`)
- Gunakan ISR atau SSR untuk halaman undangan agar SEO-friendly dan data selalu fresh
- Optimasi gambar dengan `next/image`
- Handle edge case: slug tidak ditemukan → 404 page yang cantik
- Mobile-first design — mayoritas tamu akan buka di HP
- Env variables: DATABASE_URL, NEXTAUTH_SECRET, UPLOAD_SERVICE_KEY

---

## Yang Perlu Ditanyakan ke User Nanti

1. **Gallery (Section 6)**: Apakah gallery-nya berupa grid biasa, masonry layout, atau carousel/slider? Apakah perlu fitur lightbox (klik foto untuk full-screen)?
2. **Love Story (Section 7)**: Apakah "slide per point" maksudnya horizontal carousel, vertical timeline, atau card slider? Berapa banyak poin love story yang akan ada?
3. **Wedding Gift (Section 8)**: Berapa banyak rekening yang ditampilkan? Apakah perlu fitur copy nomor rekening ke clipboard? Apakah perlu QR code untuk transfer?
4. **Hosting/Database**: Apakah sudah punya akun Supabase/Neon/PlanetScale untuk database PostgreSQL? Atau mau pakai SQLite dulu untuk development?
5. **Domain**: Apakah sudah punya domain? Ini mempengaruhi format link undangan.
6. **Background Music**: Apakah mau fitur autoplay musik? Lagu apa yang akan digunakan?
