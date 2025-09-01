"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  topics: { id: string; name: string }[];
  currentTopic: string;
  currentQ: string;
};

export default function ArticleListFilters({
  topics,
  currentTopic,
  currentQ,
}: Props) {
  const router = useRouter();
  const [topic, setTopic] = useState(currentTopic);
  const [q, setQ] = useState(currentQ);

  // update URL with filters, reset page to 1
  const pushParams = (newTopic: string, newQ: string) => {
    const params = new URLSearchParams();
    if (newTopic) params.set("topic", newTopic);
    if (newQ) params.set("q", newQ);
    params.set("page", "1"); // reset page
    router.push(`?${params.toString()}`);
  };

  // handle topic change immediately
  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    pushParams(newTopic, q);
  };

  // debounce search (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      pushParams(topic, q);
    }, 300);

    return () => clearTimeout(handler);
  }, [q, topic]); // run whenever q or topic changes

  return (
    <div className="flex gap-3 mb-6">
      <select
        value={topic}
        onChange={(e) => handleTopicChange(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">All Topics</option>
        {topics.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
      />
    </div>
  );
}
