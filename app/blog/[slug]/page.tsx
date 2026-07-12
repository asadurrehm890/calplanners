import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getRelatedPosts, blogPosts } from "@/app/data/posts";

// Generate static params for all posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.id);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>

        {/* Post Content */}
        <article className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-96 w-full bg-zinc-100 dark:bg-zinc-800">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold p-5">
              {post.title}
            </div>
            {/* Uncomment for real images */}
            {/* <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            /> */}
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
              <span>{post.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
              <span>By {post.author}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6">
              {post.title}
            </h1> */}

            {/* Content */}
            <div 
              className="prose prose-zinc dark:prose-invert max-w-none prose-headings:text-black dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-zinc-800 dark:prose-code:text-zinc-200 prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-200 dark:prose-pre:border-zinc-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Section */}
            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white">{post.author}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Author</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <div className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-32 bg-zinc-100 dark:bg-zinc-800">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold p-5">
                        {relatedPost.title}
                      </div>
                    </div>
                    <div className="p-4">
                      {/* <h3 className="font-semibold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3> */}
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {relatedPost.readTime}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}