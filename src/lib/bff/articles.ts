// /lib/bff/articles.ts
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { ArticleSchema, Article, Author, Topic } from "../models/article";

const DATA_DIR = path.join(process.cwd(), "src/mocks");

async function readJSON<T>(file: string) {
  const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

export type ListParams = {
  topic?: string;
  q?: string;
  limit?: number;
  offset?: number;
  sort?: "publishedAt_desc" | "publishedAt_asc";
};

function articleToSummary(a: Article) {
  const { body, ...rest } = a;
  return rest as Omit<Article, "body">;
}

export async function listArticles(params: ListParams = {}) {
  const {
    topic,
    q,
    limit = 10,
    offset = 0,
    sort = "publishedAt_desc",
  } = params;
  const articles = await readJSON<Article[]>("articles.json");
  let filtered = articles.slice();

  if (topic) {
    filtered = filtered.filter((a) => (a.topicIds || []).includes(topic));
  }

  if (q) {
    const qlc = q.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        (a.title && a.title.toLowerCase().includes(qlc)) ||
        (a.excerpt && a.excerpt.toLowerCase().includes(qlc)) ||
        (a.seo?.description && a.seo.description.toLowerCase().includes(qlc))
    );
  }

  filtered.sort((a, b) => {
    const ta = new Date(a.publishedAt || 0).getTime();
    const tb = new Date(b.publishedAt || 0).getTime();
    return sort === "publishedAt_asc" ? ta - tb : tb - ta;
  });

  const total = filtered.length;
  const paged = filtered.slice(offset, offset + limit).map(articleToSummary);

  return { data: paged, total };
}

export async function getArticleById(id: string) {
  const articles = await readJSON<Article[]>("articles.json");
  const authors = await readJSON<Author[]>("authors.json");
  const topics = await readJSON<Topic[]>("topics.json");

  const found = articles.find((a) => a.id === id);
  if (!found) return null;

  // expand author and topics
  const author = authors.find((au) => au.id === found.authorId) ?? null;
  const topicObjs = (found.topicIds || [])
    .map((tid) => topics.find((t) => t.id === tid))
    .filter(Boolean);

  return { ...found, author, topics: topicObjs };
}
