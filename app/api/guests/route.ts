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
  const body = await req.json();

  const supabase = await createClient();

  if (body.names && Array.isArray(body.names)) {
    // Bulk insert
    const names = body.names.filter((n: any) => typeof n === "string" && n.trim().length > 0);
    if (names.length === 0) return jsonError("No valid names provided");

    const guestsToInsert = [];
    for (const name of names) {
      let slug = generateSlug(name);
      // We do a simple check. For bulk, let's just append a short random string always to be fast,
      // or we can just append it if we catch an error. Actually, it's safer to just do the random string for bulk if we want to avoid multiple DB lookups, but let's do a simple generation.
      const random = Math.random().toString(36).slice(2, 6);
      slug = `${slug}-${random}`;
      guestsToInsert.push({ name: name.trim(), slug });
    }

    const { data, error } = await supabase
      .from("guests")
      .insert(guestsToInsert)
      .select();
    
    if (error) return jsonError(error.message, 500);
    return NextResponse.json(data);
  }

  // Single insert
  const { name } = body;
  if (!name || typeof name !== "string") return jsonError("Name is required");
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
