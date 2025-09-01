import React from "react";
import ArticleByline from "@/components/ArticleByline";
// import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { notFound } from "next/navigation";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/seo/articles/${(await params).id}`, {
    cache: "no-store",
  });

  if (!res.ok) return { title: "Article Not Found" };

  const json = await res.json();
  return json.data;
}

export default async function ArticlePage({ params }: Params) {
  const id = (await params).id;

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/articles/${id}`, { cache: "no-store" });

  if (res.status === 404) {
    notFound();
    // return <div className="p-6">Article not found.</div>;
  }

  if (!res.ok) {
    // basic fallback
    return <div className="p-6">Error loading article.</div>;
  }

  const json = await res.json();
  const article = json.data;

  const safeBody = sanitizeHtml(article.body || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt"],
    },
  });

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
      {article.heroImage && (
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <ArticleByline
        author={article.author}
        publishedAt={article.publishedAt}
        readingMinutes={article.readingMinutes}
      />
      <div
        className="mt-6 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: safeBody }}
      />
      {article.cta && (
        <div className="mt-8">
          {article.cta.type === "subscribe" ? (
            <a
              href={article.cta.target}
              className="inline-block px-4 py-2 border rounded"
            >
              {article.cta.label}
            </a>
          ) : (
            <a
              href={article.cta.target}
              className="inline-block px-4 py-2 border rounded"
            >
              {article.cta.label}
            </a>
          )}
        </div>
      )}
    </main>
  );
}
