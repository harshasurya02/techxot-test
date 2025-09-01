// /components/ArticleCard.tsx
import React from "react";
import ArticleByline from "./ArticleByline";
import Link from "next/link";

export default function ArticleCard({ article }: { article: any }) {
  return (
    <article className="border rounded-md p-4 hover:shadow-sm">
      <Link href={`/uptick/article/${article.id}`}>
        <h3 className="text-lg font-semibold">{article.title}</h3>
      </Link>
      <p className="text-sm text-gray-600">{article.excerpt}</p>
      <div className="mt-3">
        <ArticleByline
          author={article.author}
          publishedAt={article.publishedAt}
          readingMinutes={article.readingMinutes}
        />
      </div>
    </article>
  );
}
