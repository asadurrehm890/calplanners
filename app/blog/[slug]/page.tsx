// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/app/data/posts";
import Link from "next/link";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Asad ur Rehman - Shopify Developer`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const relatedPosts = post ? getRelatedPosts(post.id) : [];

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-2 text-[#475569] font-semibold hover:text-[#2563eb] transition-colors hover:gap-3 mb-6"
      >
        <i className="fas fa-arrow-left"></i> Back to blog
      </Link>

      <article className="bg-white rounded-[30px] p-6 md:p-12 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4 text-sm text-[#64748b] mb-4">
          <span><i className="far fa-calendar-alt mr-1"></i> {post.date}</span>
          <span><i className="far fa-clock mr-1"></i> {post.readTime}</span>
          <span><i className="fas fa-tags mr-1"></i> {post.tags.join(", ")}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#0a0a0f]">{post.title}</h1>

        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 bg-[#2563eb] rounded-full flex items-center justify-center text-white font-bold">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-[#0a0a0f]">{post.author}</p>
            <p className="text-sm text-[#64748b]">Shopify Developer • 8+ Years Experience</p>
          </div>
        </div>

        <div 
          className="prose prose-lg max-w-none text-[#1e293b]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#0a0a0f] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2563eb] transition-colors"
          >
            <i className="fas fa-paper-plane"></i> Discuss your project
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 border-2 border-[#0a0a0f] text-[#0a0a0f] px-6 py-3 rounded-full font-semibold hover:bg-[#0a0a0f] hover:text-white transition-colors"
          >
            <i className="fas fa-code"></i> Explore services
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-[#0a0a0f]">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform block"
              >
                <div className="flex gap-4 text-xs text-[#64748b] mb-2">
                  <span><i className="far fa-calendar-alt mr-1"></i>{related.date}</span>
                  <span><i className="far fa-clock mr-1"></i>{related.readTime}</span>
                </div>
                <h4 className="text-lg font-bold text-[#0a0a0f] mb-2">{related.title}</h4>
                <p className="text-sm text-[#475569]">{related.excerpt.substring(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-12 bg-[#0a0a0f] text-white rounded-[30px] p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to Build Your Custom Shopify App?</h3>
        <p className="text-white/80 max-w-xl mx-auto mb-6">
          With 8+ years of experience in custom Shopify development, I can help you build the perfect solution for your business.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-[#2563eb] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1d4ed8] transition-colors"
        >
          <i className="fas fa-paper-plane mr-2"></i> Let's Talk
        </Link>
      </div>
    </div>
  );
}