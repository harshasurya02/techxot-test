
export default function LoadingArticles() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Articles</h1>

      {/* Filters skeleton (search + dropdown) */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-full md:w-1/2" />
        <div className="h-10 bg-gray-200 rounded w-full md:w-48" />
      </div>

      {/* Article cards skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden animate-pulse"
          >
            <div className="h-40 bg-gray-200 w-full" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
