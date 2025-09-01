// /app/api/authors/route.ts
import { listAuthors } from "@/lib/bff/authors";

export async function GET() {
  const data = await listAuthors();
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
