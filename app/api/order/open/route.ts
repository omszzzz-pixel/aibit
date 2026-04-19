import { NextRequest } from "next/server";
import { getUserCreds } from "@/lib/user-creds";
import { getOpenOrders } from "@/lib/ascendex";

export async function GET(request: NextRequest) {
  const creds = await getUserCreds();
  if (!creds) {
    return Response.json({ error: "로그인 또는 API Key 등록이 필요합니다" }, { status: 401 });
  }

  const symbol = request.nextUrl.searchParams.get("symbol") || undefined;
  const data = await getOpenOrders(creds, symbol);
  return Response.json(data);
}
