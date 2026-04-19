import { NextRequest } from "next/server";
import { getBarHist } from "@/lib/ascendex";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  const interval = request.nextUrl.searchParams.get("interval") || "60";
  const n = request.nextUrl.searchParams.get("n");

  if (!symbol) {
    return Response.json({ error: "symbol is required" }, { status: 400 });
  }

  const data = await getBarHist(symbol, interval, n ? parseInt(n) : undefined);
  return Response.json(data);
}
