import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/db";
import { createToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ error: "이메일과 비밀번호를 입력하세요" }, { status: 400 });
  }

  const { data: user } = await supabase
    .from("users")
    .select("id, password_hash, nickname")
    .eq("email", email)
    .single();

  if (!user) {
    return Response.json({ error: "이메일 또는 비밀번호가 올바르지 않습니다" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return Response.json({ error: "이메일 또는 비밀번호가 올바르지 않습니다" }, { status: 401 });
  }

  const token = await createToken(user.id);
  await setSessionCookie(token);

  return Response.json({ ok: true, userId: user.id, nickname: user.nickname });
}
