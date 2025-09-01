
export default function LoadingArticleDetail() {
  return (
    <main className="max-w-3xl mx-auto p-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
      <div className="h-64 bg-gray-200 rounded mb-6" />
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </main>
  );
}
