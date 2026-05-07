import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin, jsonError } from "@/lib/api-helpers";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const { id } = await params;
  const body = await req.json();
  delete body.id;
  delete body.created_at;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guests")
    .update(body)
    .eq("id", id)
    .select()
    .single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const { id } = await params;
  const supabase = await createClient();
  const { error } = await supabase.from("guests").delete().eq("id", id);
  if (error) return jsonError(error.message, 500);
  return NextResponse.json({ ok: true });
}
