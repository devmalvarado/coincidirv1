import { sanityClient } from './sanity';

/**
 * Debe coincidir con `name` en `studio/schemas/post.ts`.
 * En Studio el documento se llama «Artículo (Blog)»; en GROQ el tipo es siempre este string.
 */
export const SANITY_BLOG_DOCUMENT_TYPE = 'post' as const;

export type BlogPostPreview = {
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  mainImage: unknown;
  publishedAt: string | null;
  tags: string[] | null;
};

const BLOG_POST_LIST_QUERY = `*[_type == "${SANITY_BLOG_DOCUMENT_TYPE}" && defined(slug.current)] | order(publishedAt desc) [0...24] {
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
