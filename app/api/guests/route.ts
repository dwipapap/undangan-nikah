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
  const slug = generateSlug(name);
  const { data, error } = await supabase
    .from("guests")
    .insert({ name, slug })
    .select()
    .single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}
