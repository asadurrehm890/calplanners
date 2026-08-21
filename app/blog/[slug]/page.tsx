import { notFound } from "next/navigation";
import { blogPosts } from "@/app/data/blogPosts";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | AsadDev`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-16 max-w-4xl mx-auto">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all mb-6"
      >
        <i className="fas fa-arrow-left"></i> Back to blog
      </Link>

      <article className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <span><i className="far fa-calendar-alt mr-1"></i> {post.date}</span>
          <span><i className="far fa-clock mr-1"></i> {post.readTime}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

        <div className="prose prose-lg max-w-none">
          <p>{post.excerpt}</p>
          <p>
            This is a detailed blog post about {post.title.toLowerCase()}. Here you would include the full
            content of the article with insights, tips, and practical advice.
          </p>
          <h2>Key Takeaways</h2>
          <ul>
            <li>Understanding the importance of custom Shopify apps</li>
            <li>How to leverage Shopify's API for business growth</li>
            <li>Best practices for Shopify app development</li>
          </ul>
          <p>
            Stay tuned for more insights and expertise from Asad ur Rehman, a full-stack Shopify developer
            with 8+ years of experience.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#1e293b] text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-all"
          >
            <i className="fas fa-paper-plane"></i> Discuss your project
          </Link>
        </div>
      </article>
    </div>
  );
}