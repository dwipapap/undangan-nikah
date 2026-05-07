import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin, jsonError } from "@/lib/api-helpers";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("love_stories")
    .select("*")
    .order("order", { ascending: true });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const body = await req.json();
  if (!body.title) return jsonError("title required");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("love_stories")
    .insert({
      title: body.title,
      date: body.date ?? null,
      description: body.description ?? null,
      image_url: body.image_url ?? null,
      order: body.order ?? 0,
    })
    .select()
    .single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}
