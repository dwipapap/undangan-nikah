import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin, jsonError } from "@/lib/api-helpers";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("wedding_settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const body = await req.json();
  const supabase = await createClient();

  // Get the singleton row
  const { data: existing } = await supabase
    .from("wedding_settings")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  const payload = { ...body, updated_at: new Date().toISOString() };
  delete payload.id;
  delete payload.created_at;

  if (existing) {
    const { data, error } = await supabase
      .from("wedding_settings")
      .update(payload)
      .eq("id", existing.id)
      .select()
      .single();
    if (error) return jsonError(error.message, 500);
    return NextResponse.json(data);
  }
  const { data, error } = await supabase
    .from("wedding_settings")
    .insert(payload)
    .select()
    .single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}
