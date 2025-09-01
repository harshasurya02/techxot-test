import { NextResponse } from "next/server";
import { getArticleById } from "@/lib/bff/articles";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const article = await getArticleById(params.id);
    if (!article) {
      return NextResponse.json(
        { error: { code: "NotFound", message: "Article not found" } },
        { status: 404 }
      );
    }

    const seo = {
      title: article.seo?.title ?? article.title,
      description: article.seo?.description ?? article.excerpt,
      openGraph: {
        title: article.seo?.title ?? article.title,
        description: article.seo?.description ?? article.excerpt,
        images: [article.heroImage].filter(Boolean),
      },
    };

    return new Response(JSON.stringify({ data: seo }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: { code: "Internal", message: "Server error" } },
      { status: 500 }
    );
  }
}
