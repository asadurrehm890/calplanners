// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { blogPosts } from '@/app/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calplanners.online';

  // 1. Define your essential static routes
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 1.0, // Highest priority for homepage
    },
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date().toISOString(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // },
    // {
    //   url: `${baseUrl}/contact`,
    //   lastModified: new Date().toISOString(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // },
  ];

  // 2. Add all your calculator pages (these are your main tools)
  const calculators = [
    {
      slug: '/candle-calculator',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      slug: '/fly-tying-estimator',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      slug: '/turtle-tank-calculator',
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    },
    {
      slug: '/fursuit-fur-calculator',
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    },
    {
      slug: '/calligraphy-ink-calculator',
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    },
    {
      slug: '/equipment-roi-calculator',
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    },
    {
      slug: '/meeting-cost-calculator',
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    },
    {
      slug: '/protein-calculator',
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    },
    {
      slug: '/weight-loss-timeline',
      priority: 0.85,
      changeFrequency: 'monthly' as const,
    },
    {
    slug: '/gpa-calculator',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
   {
    slug: '/word-counter',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  ].map((calc) => ({
    url: `${baseUrl}${calc.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: calc.changeFrequency,
    priority: calc.priority,
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