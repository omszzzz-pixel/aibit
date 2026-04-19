import { getSessionUser } from "@/lib/auth";
import { supabase } from "@/lib/db";

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const { data: user } = await supabase
    .from("users")
    .select("id, email, nickname, phone, created_at")
    .eq("id", session.userId)
    .single();

  if (!user) {
    return Response.json({ error: "사용자를 찾을 수 없습니다" }, { status: 404 });
  }

  const { data: apiKeyRow } = await supabase
    .from("api_keys")
    .select("id")
    .eq("user_id", session.userId)
    .single();

  return Response.json({ ...user, hasApiKey: !!apiKeyRow });
}
