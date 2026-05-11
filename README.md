# Wedding Invitation App

*Read this in other languages: [English](README.md) | [Bahasa Indonesia](README.id.md)*

A digital wedding invitation platform built with modern web technologies. This application allows you to create customizable, elegant, and responsive wedding invitations, complete with RSVP tracking, dynamic settings, and a rich user interface.

## Features

- **Elegant UI/UX:** Responsive design powered by Tailwind CSS and Mantine, featuring smooth animations via Framer Motion.
- **Dynamic Content:** Real-time data fetching and rendering for the groom, bride, event details, and gallery using Supabase.
- **RSVP Management:** Built-in forms for guests to submit RSVPs directly, with data stored securely.
- **Modern Tech Stack:** Utilizes Next.js 15 App Router, React 18, and TypeScript for a robust, type-safe development experience.

## Prerequisites

- [Node.js](https://nodejs.org/) v18+ 
- [npm](https://www.npmjs.com/) or another preferred package manager
- A [Supabase](https://supabase.com/) project (for Database and Authentication)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Install dependencies

Run the following command in the project root to install all required packages:

```bash
npm install
```

> [!NOTE]
> The `postinstall` script in `package.json` handles client generation automatically during installation.

### 2. Configure environment variables

Create a `.env` or `.env.local` file at the root of your project and configure your variables. You will typically need the following for Supabase:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 3. Run the development server

Start the local server in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `app/` - Next.js App Router layout, pages, and API routes.
- `components/` - Reusable React components (UI elements, layout components, sections like Footer, etc.).
- `lib/` - Shared utilities, types, and configuration files.
- `types/` - TypeScript definitions.

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **UI Components:** Mantine, Tabler Icons, Lucide React
- **Animation:** Framer Motion
- **Database & Auth:** Supabase, NextAuth.js
- **Forms & Validation:** React Hook Form, Zod
