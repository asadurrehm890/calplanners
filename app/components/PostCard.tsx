import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    slug: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {/* Placeholder Image */}
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold p-5">
            {post.title}
          </div>
          {/* Uncomment for real images */}
          {/* <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          /> */}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
            <span>{post.readTime}</span>
          </div>

          {/* <h2 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h2> */}

          <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3 text-sm sm:text-base">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
            Read More
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </article>
    </Link>
  );
}