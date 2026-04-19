import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/db";
import { createToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email, password, nickname, phone } = await request.json();

  if (!email || !password || !nickname) {
    return Response.json({ error: "이메일, 비밀번호, 닉네임은 필수입니다" }, { status: 400 });
  }

  if (password.length < 6) {
    return Response.json({ error: "비밀번호는 6자 이상이어야 합니다" }, { status: 400 });
  }

  // 이메일 중복 확인
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return Response.json({ error: "이미 가입된 이메일입니다" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { data: user, error } = await supabase
    .from("users")
    .insert({ email, password_hash: passwordHash, nickname, phone: phone || "" })
    .select("id")
    .single();

  if (error || !user) {
    return Response.json({ error: "회원가입에 실패했습니다" }, { status: 500 });
  }

  const token = await createToken(user.id);
  await setSessionCookie(token);

  return Response.json({ ok: true, userId: user.id });
}
