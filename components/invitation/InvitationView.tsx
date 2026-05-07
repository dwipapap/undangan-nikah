"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type {
  Guest,
  WeddingSettings,
  GuestPhoto,
  GalleryPhoto,
  LoveStory,
  GiftAccount,
} from "@/lib/types";
import { OpeningOverlay } from "./sections/OpeningOverlay";
import { HeroSection } from "./sections/HeroSection";
import { WeFoundLoveSection } from "./sections/WeFoundLoveSection";
import { BrideAndGroomSection } from "./sections/BrideAndGroomSection";
import { SaveTheDateSection } from "./sections/SaveTheDateSection";
import { AcaraSection } from "./sections/AcaraSection";
import { GallerySection } from "./sections/GallerySection";
import { LoveStorySection } from "./sections/LoveStorySection";
import { GiftSection } from "./sections/GiftSection";
import { RsvpSection } from "./sections/RsvpSection";
import { Footer } from "./sections/Footer";
import { FloatingActions } from "./FloatingActions";

interface Props {
  guest: Guest;
  settings: WeddingSettings;
  photos: GuestPhoto[];
  gallery: GalleryPhoto[];
  loveStory: LoveStory[];
  gift: GiftAccount[];
}

export function InvitationView({
  guest,
  settings,
  photos,
  gallery,
  loveStory,
  gift,
}: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative bg-cream text-charcoal overflow-hidden">
      <AnimatePresence>
        {!opened && (
          <OpeningOverlay
            guest={guest}
            settings={settings}
            onOpen={() => setOpened(true)}
          />
        )}
      </AnimatePresence>

      <main className={opened ? "opacity-100 transition-opacity" : "opacity-0 pointer-events-none"}>
        <HeroSection settings={settings} />
        <WeFoundLoveSection photos={photos} settings={settings} />
        <BrideAndGroomSection settings={settings} />
        <SaveTheDateSection settings={settings} />
        <AcaraSection settings={settings} />
        <GallerySection photos={gallery} />
        <LoveStorySection items={loveStory} />
        <GiftSection accounts={gift} message={settings.gift_message} />
        <RsvpSection guest={guest} />
        <Footer settings={settings} />
      </main>

      {opened && <FloatingActions musicUrl={settings.music_url} guestName={guest.name} />}
    </div>
  );
}
