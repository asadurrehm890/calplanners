export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
  content: string;
  author: string;
  authorImage?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
 



];

// Helper function to get a post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get related posts
export function getRelatedPosts(currentPostId: number, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit);
}