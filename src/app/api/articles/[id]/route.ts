// /app/api/articles/[id]/route.ts
import { NextResponse } from "next/server";
import { getArticleById } from "@/lib/bff/articles";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json(
        { error: { code: "NotFound", message: "Article not found" } },
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ data: article }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: { code: "Internal", message: "Server error" } },
      { status: 500 }
    );
  }
}
