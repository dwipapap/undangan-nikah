export type AttendanceStatus = "PENDING" | "ATTENDING" | "NOT_ATTENDING";

export interface WeddingSettings {
  id: string;
  groom_name: string;
  groom_photo: string | null;
  groom_child_order: string | null;
  groom_father_name: string | null;
  groom_mother_name: string | null;
  groom_instagram: string | null;
  bride_name: string;
  bride_photo: string | null;
  bride_child_order: string | null;
  bride_father_name: string | null;
  bride_mother_name: string | null;
  bride_instagram: string | null;
  wedding_date: string | null;
  hero_image: string | null;
  quote_text: string | null;
  quote_source: string | null;
  akad_day: string | null;
  akad_date: string | null;
  akad_time: string | null;
  akad_location: string | null;
  akad_maps_url: string | null;
  resepsi_day: string | null;
  resepsi_date: string | null;
  resepsi_time: string | null;
  resepsi_location: string | null;
  resepsi_maps_url: string | null;
  gift_message: string | null;
  music_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  name: string;
  slug: string;
  attendance: AttendanceStatus;
  number_of_guests: number;
  wishes: string | null;
  created_at: string;
}

export interface GuestPhoto {
  id: string;
  image_url: string;
  caption: string | null;
  order: number;
  created_at: string;
}

export interface GalleryPhoto {
  id: string;
  image_url: string;
  caption: string | null;
  order: number;
  created_at: string;
}

export interface LoveStory {
  id: string;
  title: string;
  date: string | null;
  description: string | null;
  image_url: string | null;
  order: number;
  created_at: string;
}

export interface GiftAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_holder: string;
  logo_url: string | null;
  order: number;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
  password: string;
  created_at: string;
}
