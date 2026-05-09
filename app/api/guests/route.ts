import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin, jsonError } from "@/lib/api-helpers";
import { generateSlug } from "@/lib/utils";

export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const { name } = await req.json();
  if (!name || typeof name !== "string") return jsonError("Name is required");
  const supabase = await createClient();
  let slug = generateSlug(name);
  
  // Check if the base slug already exists to prevent unique constraint errors
  const { data: existing } = await supabase
    .from("guests")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    // Only append a random string if there is a collision
    const random = Math.random().toString(36).slice(2, 6);
    slug = `${slug}-${random}`;
  }

  const { data, error } = await supabase
    .from("guests")
    .insert({ name, slug })
    .select()
    .single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}
