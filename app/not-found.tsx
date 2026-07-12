import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-black dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
        Post Not Found
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        The blog post you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
}