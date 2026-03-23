import { sanityClient } from './sanity';

export type BlogPostPreview = {
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  mainImage: unknown;
  publishedAt: string | null;
  tags: string[] | null;
};

const BLOG_POST_LIST_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...24] {
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  tags
}`;

export async function fetchBlogPosts(): Promise<BlogPostPreview[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(BLOG_POST_LIST_QUERY);
}
