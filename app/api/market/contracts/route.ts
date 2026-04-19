import { getContractInfo } from "@/lib/ascendex";

export async function GET() {
  const data = await getContractInfo();
  return Response.json(data);
}
