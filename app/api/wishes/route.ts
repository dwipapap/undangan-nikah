import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { jsonError } from "@/lib/api-helpers";

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
