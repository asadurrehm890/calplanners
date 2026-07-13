import PostCard from "@/app/components/PostCard";
import { blogPosts } from "@/app/data/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Free Online Calculators for Business & Crafting',
  description: 'Discover free tools to calculate candle costs, fly tying materials, meeting expenses, equipment ROI, protein intake, weight loss timeline, and more. Start planning smarter today.',
  openGraph: {
    title: 'Free Online Calculators for Business & Crafting | CalPlanners',
    description: 'Discover free tools to calculate candle costs, fly tying materials, meeting expenses, equipment ROI, and more.',
    url: 'https://calplanners.online',
  },
  alternates: {
    canonical: 'https://calplanners.online',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Discover the latest insights and stories from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}