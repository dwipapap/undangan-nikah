import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin, jsonError } from "@/lib/api-helpers";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guests")
    .select("id, name, attendance, wishes, created_at")
    .not("wishes", "is", null)
    .neq("wishes", "")
    .order("created_at", { ascending: false });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function DELETE() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const supabase = await createClient();
  
  // Update all guests to set wishes to null
  const { error } = await supabase
    .from("guests")
    .update({ wishes: null })
    .not("wishes", "is", null); // We just need to clear ones that have wishes
    
  if (error) return jsonError(error.message, 500);
  return NextResponse.json({ ok: true });
}
