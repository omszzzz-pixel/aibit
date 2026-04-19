import { NextRequest } from "next/server";
import { getUserCreds } from "@/lib/user-creds";
import { getOrderHistory } from "@/lib/ascendex";

export async function GET(request: NextRequest) {
  const creds = await getUserCreds();
  if (!creds) {
    return Response.json({ error: "로그인 또는 API Key 등록이 필요합니다" }, { status: 401 });
  }

  const n = parseInt(request.nextUrl.searchParams.get("n") || "50");
  const symbol = request.nextUrl.searchParams.get("symbol") || undefined;
  const data = await getOrderHistory(creds, n, symbol);
  return Response.json(data);
}
