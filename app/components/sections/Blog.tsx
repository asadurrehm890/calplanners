import Link from "next/link";
import { blogPosts } from "@/app/data/blogPosts";

export default function Blog() {
  return (
    <section id="blog" className="py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Insights & expertise</h2>
        <p className="text-gray-600 max-w-2xl mb-10">
          Tips, trends, and deep dives from my work in the Shopify ecosystem.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-[28px] p-6 border border-gray-100 card-hover">
              <div className="flex gap-4 text-sm text-gray-500 mb-3">
                <span><i className="far fa-calendar-alt mr-1"></i> {post.date}</span>
                <span><i className="far fa-clock mr-1"></i> {post.readTime}</span>
              </div>
              <h4 className="text-xl font-bold mb-2">{post.title}</h4>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-secondary font-semibold mt-4 hover:gap-2 transition-all"
              >
                Read more <i className="fas fa-arrow-right text-sm"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}