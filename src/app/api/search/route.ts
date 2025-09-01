// /app/api/search/route.ts
import { NextResponse } from "next/server";
import { listArticles } from "../../../lib/bff/articles";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  // re-use listArticles with q param
  const { data } = await listArticles({ q, limit: 20, offset: 0 });
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=30",
    },
  });
}
