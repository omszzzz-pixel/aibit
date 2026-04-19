import { NextRequest } from "next/server";
import { getUserCreds } from "@/lib/user-creds";
import { changeMarginType } from "@/lib/ascendex";

export async function POST(request: NextRequest) {
  const creds = await getUserCreds();
  if (!creds) {
    return Response.json({ error: "로그인 또는 API Key 등록이 필요합니다" }, { status: 401 });
  }

  const { symbol, marginType } = await request.json();
  if (!symbol || !marginType) {
    return Response.json({ error: "symbol과 marginType은 필수입니다" }, { status: 400 });
  }

  const data = await changeMarginType(creds, symbol, marginType);
  return Response.json(data);
}
