import { NextRequest } from "next/server";
import { getUserCreds } from "@/lib/user-creds";
import { cancelOrder } from "@/lib/ascendex";

export async function POST(request: NextRequest) {
  const creds = await getUserCreds();
  if (!creds) {
    return Response.json({ error: "로그인 또는 API Key 등록이 필요합니다" }, { status: 401 });
  }

  const { orderId, symbol } = await request.json();
  if (!orderId || !symbol) {
    return Response.json({ error: "orderId와 symbol은 필수입니다" }, { status: 400 });
  }

  const data = await cancelOrder(creds, orderId, symbol);
  return Response.json(data);
}
