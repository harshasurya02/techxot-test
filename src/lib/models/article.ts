import { z } from "zod";

export const CTA = z.object({
  type: z.enum(["subscribe", "internalLink"]).optional(),
  label: z.string(),
  target: z.string(),
});

export const SEO = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const ArticleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  body: z.string().optional(),
  heroImage: z.string().optional(),
  authorId: z.string(),
  topicIds: z.array(z.string()).optional(),
  publishedAt: z.string().optional(),
  readingMinutes: z.number().optional(),
  cta: CTA.optional(),
  seo: SEO.optional(),
});

export type Article = z.infer<typeof ArticleSchema>;

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
});
export type Author = z.infer<typeof AuthorSchema>;

export const TopicSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});
export type Topic = z.infer<typeof TopicSchema>;
