// /app/api/topics/route.ts
import { listTopics } from "@/lib/bff/topics";

export async function GET() {
  const data = await listTopics();
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
