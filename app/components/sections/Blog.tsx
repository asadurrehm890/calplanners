import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Why Custom Shopify Apps Beat Off-the-Shelf Solutions",
    excerpt:
      "Off-the-shelf apps can't match the flexibility and performance of a custom-built solution tailored to your workflows.",
    date: "May 12, 2026",
    readTime: "6 min read",
    slug: "why-custom-shopify-apps-beat-off-the-shelf",
    color: "blue",
  },
  {
    id: 2,
    title: "Live Selling: The Future of E-commerce",
    excerpt:
      "How real-time streaming with chat and instant checkout can boost conversion rates by over 30%.",
    date: "April 28, 2026",
    readTime: "4 min read",
    slug: "live-selling-future-of-ecommerce",
    color: "purple",
  },
  {
    id: 3,
    title: "Bulk Imports: Overcoming Shopify's Limitations",
    excerpt:
      "Learn how to import complex product data (variants, metafields, media) seamlessly using custom APIs.",
    date: "April 10, 2026",
    readTime: "5 min read",
    slug: "bulk-imports-overcoming-shopify-limitations",
    color: "green",
  },
];

const colorMap = {
  blue: "border-blue-500",
  purple: "border-purple-500",
  green: "border-green-500",
};

export default function Blog() {
  return (
    <section id="blog" className="section-padding bg-[#f8fafc]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge badge-green mb-4">Insights</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Latest Articles
          </h2>
          <p className="text-[#475569] text-lg">
            Tips, trends, and deep dives from my work in the Shopify ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className={`card border-t-4 ${colorMap[post.color as keyof typeof colorMap]} hover:border-[#2563eb]`}
            >
              <div className="flex gap-4 text-sm text-[#64748b] mb-3">
                <span><i className="far fa-calendar-alt mr-1"></i> {post.date}</span>
                <span><i className="far fa-clock mr-1"></i> {post.readTime}</span>
              </div>
              <h4 className="text-xl font-bold mb-2">{post.title}</h4>
              <p className="text-[#475569] text-sm leading-relaxed">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-[#2563eb] font-semibold mt-4 hover:gap-2 transition-all"
              >
                Read More <i className="fas fa-arrow-right text-xs"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}