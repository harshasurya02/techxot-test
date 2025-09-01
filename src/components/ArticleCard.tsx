
import React from "react";
import ArticleByline from "./ArticleByline";
import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({ article }: { article: any }) {
  return (
    <article className="border rounded-lg overflow-hidden hover:shadow-sm transition">
      <Link href={`/uptick/article/${article.id}`}>
        {article.heroImage ? (
          <div className="relative w-full h-40">
            <Image
              src={article.heroImage}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-40 bg-gray-200" />
        )}
      </Link>

      <div className="p-4">
        <Link href={`/uptick/article/${article.id}`}>
          <h3 className="text-lg font-semibold hover:underline">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-3">
          <ArticleByline
            author={article.author}
            publishedAt={article.publishedAt}
            readingMinutes={article.readingMinutes}
          />
        </div>
      </div>
    </article>
  );
}
