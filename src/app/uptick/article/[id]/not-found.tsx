import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <main className="max-w-3xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, we couldn’t find the article you were looking for.
      </p>
      <Link
        href="/uptick"
        className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Back to Articles
      </Link>
    </main>
  );
}
