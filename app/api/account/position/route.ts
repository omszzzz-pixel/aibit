import { getUserCreds } from "@/lib/user-creds";
import { getPosition } from "@/lib/ascendex";

export async function GET() {
  const creds = await getUserCreds();
  if (!creds) {
    return Response.json({ error: "로그인 또는 API Key 등록이 필요합니다" }, { status: 401 });
  }

  const data = await getPosition(creds);
  return Response.json(data);
}
