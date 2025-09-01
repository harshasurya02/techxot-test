// /app/api/articles/route.ts
import { NextResponse } from "next/server";
import { listArticles } from "@/lib/bff/articles";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const topic = url.searchParams.get("topic") ?? undefined;
    const q = url.searchParams.get("q") ?? undefined;
    const limit = Number(url.searchParams.get("limit") ?? "10");
    const offset = Number(url.searchParams.get("offset") ?? "0");
    const sort = (url.searchParams.get("sort") as any) ?? "publishedAt_desc";

    if (Number.isNaN(limit) || limit < 0) {
      return NextResponse.json(
        {
          error: { code: "BadRequest", message: "Invalid query param: limit" },
        },
        { status: 400 }
      );
    }

    const { data, total } = await listArticles({
      topic,
      q,
      limit,
      offset,
      sort,
    });

    const res = { data, total, limit, offset };
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: { code: "Internal", message: "Something went wrong" } },
      { status: 500 }
    );
  }
}
