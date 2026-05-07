import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin, jsonError } from "@/lib/api-helpers";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gift_accounts")
    .select("*")
    .order("order", { ascending: true });
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  const body = await req.json();
  if (!body.bank_name || !body.account_number || !body.account_holder) {
    return jsonError("Missing required fields");
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gift_accounts")
    .insert({
      bank_name: body.bank_name,
      account_number: body.account_number,
      account_holder: body.account_holder,
      logo_url: body.logo_url ?? null,
      order: body.order ?? 0,
    })
    .select()
    .single();
  if (error) return jsonError(error.message, 500);
  return NextResponse.json(data);
}
