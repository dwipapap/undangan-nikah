import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin, jsonError } from "@/lib/api-helpers";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("order", { ascending: true });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const { image_url, caption, order } = await req.json();
  if (!image_url) return jsonError("image_url required");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_photos")
    .insert({ image_url, caption: caption ?? null, order: order ?? 0 })
    .select()
    .single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}
