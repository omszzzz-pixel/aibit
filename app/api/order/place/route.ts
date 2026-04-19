import { NextRequest } from "next/server";
import { getUserCreds } from "@/lib/user-creds";
import { placeOrder, type PlaceOrderParams } from "@/lib/ascendex";

export async function POST(request: NextRequest) {
  const creds = await getUserCreds();
  if (!creds) {
    return Response.json({ error: "로그인 또는 API Key 등록이 필요합니다" }, { status: 401 });
  }

  const body = await request.json();
  const { symbol, orderQty, orderType, side, orderPrice, stopPrice, posStopLossPrice, posTakeProfitPrice } = body;

  if (!symbol || !orderQty || !orderType || !side) {
    return Response.json({ error: "symbol, orderQty, orderType, side는 필수입니다" }, { status: 400 });
  }

  const params: PlaceOrderParams = {
    symbol,
    orderQty,
    orderType,
    side,
    orderPrice,
    stopPrice,
    posStopLossPrice,
    posTakeProfitPrice,
  };

  const data = await placeOrder(creds, params);
  return Response.json(data);
}
