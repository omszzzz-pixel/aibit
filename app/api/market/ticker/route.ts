import { NextRequest } from "next/server";
import { getFuturesTicker } from "@/lib/ascendex";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol") || undefined;
  const data = await getFuturesTicker(symbol);
  return Response.json(data);
}
