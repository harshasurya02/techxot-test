// /components/ArticleByline.tsx
import React from "react";

type Props = {
  author?: { name: string; avatar?: string; role?: string } | null;
  publishedAt?: string;
  readingMinutes?: number;
};

export default function ArticleByline({
  author,
  publishedAt,
  readingMinutes,
}: Props) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-600">
      {author?.avatar && (
        <img
          src={author.avatar}
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <div>
        <div className="font-semibold text-gray-900">{author?.name}</div>
        <div className="text-xs">
          {author?.role} —{" "}
          {publishedAt ? new Date(publishedAt).toLocaleDateString() : "Unknown"}{" "}
          • {readingMinutes ?? "—"} min read
        </div>
      </div>
    </div>
  );
}
