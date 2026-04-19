import { NextRequest } from "next/server";
import { getUserCreds } from "@/lib/user-creds";
import { changeLeverage } from "@/lib/ascendex";

export async function POST(request: NextRequest) {
  const creds = await getUserCreds();
  if (!creds) {
    return Response.json({ error: "로그인 또는 API Key 등록이 필요합니다" }, { status: 401 });
  }

  const { symbol, leverage } = await request.json();
  if (!symbol || !leverage) {
    return Response.json({ error: "symbol과 leverage는 필수입니다" }, { status: 400 });
  }

  const data = await changeLeverage(creds, symbol, leverage);
  return Response.json(data);
}
