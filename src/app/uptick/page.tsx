
import React from "react";
import ArticleCard from "@/components/ArticleCard";
import ArticleListFilters from "@/components/ArticleListFilters";
import Link from "next/link";
// import ArticleListFilters from "@/components/ArticleListFilters";

type SearchParams = {
  topic?: string;
  q?: string;
  page?: string;
};

export default async function UptickListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const searchParamsObj = await searchParams;

  const topic = searchParamsObj.topic ?? "";
  const q = searchParamsObj.q ?? "";
  const page = parseInt(searchParamsObj.page ?? "1", 10);
  const limit = 5;
  const offset = (page - 1) * limit;

  // fetch topics for filter dropdown
  const topicsRes = await fetch(`${base}/api/topics`, { cache: "no-store" });
  const topicsJson = await topicsRes.json();
  const topics = topicsJson.data ?? [];

  // fetch articles
  const url = new URL(`${base}/api/articles`);
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("offset", offset.toString());
  if (topic) url.searchParams.set("topic", topic);
  if (q) url.searchParams.set("q", q);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return <div className="p-6">Failed to load articles.</div>;
  const json = await res.json();
  const { data: articles, total } = json;

  const totalPages = Math.ceil(total / limit);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Latest Articles</h1>

      {/* Filters (client component) */}
      <ArticleListFilters topics={topics} currentTopic={topic} currentQ={q} />

      {/* Articles list */}
      <div className="grid gap-6 md:grid-cols-2">
        {articles.length > 0 ? (
          articles.map((a: any) => <ArticleCard key={a.id} article={a} />)
        ) : (
          <p>No articles found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`?topic=${topic}&q=${q}&page=${p}`}
            className={`px-3 py-1 border rounded ${
              p === page ? "bg-gray-200" : ""
            }`}
          >
            {p}
          </Link>
        ))}
      </div>
    </main>
  );
}
