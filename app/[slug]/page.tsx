import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { InvitationView } from "@/components/invitation/InvitationView";
import type {
  Guest,
  WeddingSettings,
  GuestPhoto,
  GalleryPhoto,
  LoveStory,
  GiftAccount,
} from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

async function loadAll(slug: string) {
  const supabase = await createClient();
  const [guestRes, settingsRes, photosRes, galleryRes, loveStoryRes, giftRes] = await Promise.all([
    supabase.from("guests").select("*").eq("slug", slug).single(),
    supabase.from("wedding_settings").select("*").order("created_at", { ascending: true }).limit(1).single(),
    supabase.from("guest_photos").select("*").order("order", { ascending: true }),
    supabase.from("gallery_photos").select("*").order("order", { ascending: true }),
    supabase.from("love_stories").select("*").order("order", { ascending: true }),
    supabase.from("gift_accounts").select("*").order("order", { ascending: true }),
  ]);

  return {
    guest: guestRes.data as Guest | null,
    settings: settingsRes.data as WeddingSettings | null,
    photos: (photosRes.data ?? []) as GuestPhoto[],
    gallery: (galleryRes.data ?? []) as GalleryPhoto[],
    loveStory: (loveStoryRes.data ?? []) as LoveStory[],
    gift: (giftRes.data ?? []) as GiftAccount[],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { guest, settings } = await loadAll(slug);
  if (!guest || !settings) {
    return { title: "Undangan tidak ditemukan" };
  }
  const title = `Undangan Pernikahan ${settings.groom_name} & ${settings.bride_name}`;
  const description = `Kepada Yth. ${guest.name}, Anda diundang untuk menghadiri pernikahan kami.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: settings.hero_image ? [settings.hero_image] : [],
    },
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await loadAll(slug);
  if (!data.guest || !data.settings) notFound();
  return <InvitationView {...data} guest={data.guest} settings={data.settings} />;
}
