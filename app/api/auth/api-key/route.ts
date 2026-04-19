import { NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { supabase } from "@/lib/db";
import { encrypt } from "@/lib/crypto";
import { getAccountInfo } from "@/lib/ascendex";

export async function POST(request: NextRequest) {
  const session = await getSessionUser();
  if (!session) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const { apiKey, apiSecret } = await request.json();
  if (!apiKey || !apiSecret) {
    return Response.json({ error: "API Key와 Secret을 입력하세요" }, { status: 400 });
  }

  // AscendEX에서 account group 가져오기
  let accountGroup = "";
  try {
    const info = await getAccountInfo({ apiKey, apiSecret, accountGroup: "" });
    if (info.code === 0 && info.data?.accountGroup !== undefined) {
      accountGroup = String(info.data.accountGroup);
    } else {
      return Response.json(
        { error: "API Key가 유효하지 않습니다: " + (info.message || "unknown error") },
        { status: 400 }
      );
    }
  } catch {
    return Response.json({ error: "AscendEX 연결에 실패했습니다" }, { status: 502 });
  }

  const apiKeyEnc = encrypt(apiKey);
  const apiSecretEnc = encrypt(apiSecret);

  // upsert: 이미 있으면 업데이트
  const { error } = await supabase
    .from("api_keys")
    .upsert(
      {
        user_id: session.userId,
        api_key_enc: apiKeyEnc,
        api_secret_enc: apiSecretEnc,
        account_group: accountGroup,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (error) {
    return Response.json({ error: "API Key 저장에 실패했습니다" }, { status: 500 });
  }

  return Response.json({ ok: true, accountGroup });
}
