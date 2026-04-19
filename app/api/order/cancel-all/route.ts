import { NextRequest } from "next/server";
import { getUserCreds } from "@/lib/user-creds";
import { cancelAllOrders } from "@/lib/ascendex";

export async function POST(request: NextRequest) {
  const creds = await getUserCreds();
  if (!creds) {
    return Response.json({ error: "로그인 또는 API Key 등록이 필요합니다" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const data = await cancelAllOrders(creds, body.symbol);
  return Response.json(data);
}
