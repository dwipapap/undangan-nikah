import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { jsonError } from "@/lib/api-helpers";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const attendance = body.attendance as "ATTENDING" | "NOT_ATTENDING" | "PENDING";
  const number_of_guests = Math.max(1, Math.min(10, Number(body.number_of_guests ?? 1)));
  const wishes = (body.wishes ?? "").toString().slice(0, 1000);

  if (!["ATTENDING", "NOT_ATTENDING", "PENDING"].includes(attendance)) {
    return jsonError("Invalid attendance");
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guests")
    .update({ attendance, number_of_guests, wishes })
    .eq("id", id)
    .select()
    .single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}
