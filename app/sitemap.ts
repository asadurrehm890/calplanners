// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { blogPosts } from '@/app/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calplanners.online';

  // 1. Define your essential static routes
  const routes = ['', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 2. Add all your calculator pages
  const calculators = [
    '/candle-calculator',
    '/fly-tying-estimator',
    '/turtle-tank-calculator',
    '/fursuit-fur-calculator',
    '/calligraphy-ink-calculator',
    '/equipment-roi-calculator',
    '/meeting-cost-calculator',
    '/protein-calculator',
    '/weight-loss-timeline',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // Slightly higher priority for your main tools
  }));

  // 3. Add all your blog posts dynamically from your data file
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Combine all routes into a single array
  return [...routes, ...calculators, ...blogRoutes];
}