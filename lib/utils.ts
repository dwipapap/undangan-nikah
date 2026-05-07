import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40);
  const random = Math.random().toString(36).slice(2, 6);
  return `${base}-${random}`;
}

export function formatDateID(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function googleCalendarUrl(opts: {
  title: string;
  start: string;
  end?: string;
  location?: string;
  details?: string;
}) {
  const fmt = (d: string) => {
    const date = new Date(d);
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };
  const startTs = fmt(opts.start);
  const endTs = opts.end
    ? fmt(opts.end)
    : fmt(new Date(new Date(opts.start).getTime() + 4 * 60 * 60 * 1000).toISOString());
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    dates: `${startTs}/${endTs}`,
    location: opts.location ?? "",
    details: opts.details ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function whatsappShareUrl(text: string, url: string) {
  return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
}
