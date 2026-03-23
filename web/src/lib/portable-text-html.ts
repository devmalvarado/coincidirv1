import type { PortableTextBlock } from '@portabletext/types';
import { toHTML } from '@portabletext/to-html';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlForImage } from './sanity';

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

/** Contenido antiguo guardado como texto plano (párrafos separados por líneas en blanco). */
export function legacyPlainTextToHtml(text: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return text
    .split(/\n\n+/)
    .map((para) => `<p>${esc(para).replace(/\n/g, '<br />')}</p>`)
    .join('');
}

export function portableBlocksToHtml(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return toHTML(blocks as PortableTextBlock[], {
    components: {
      types: {
        image: ({ value }) => {
          const src = urlForImage(value as SanityImageSource)?.width(900).url();
          if (!src) return '';
          const alt =
            typeof (value as { alt?: string }).alt === 'string'
              ? (value as { alt: string }).alt
              : '';
          return `<figure class="coin-article__figure"><img src="${src}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async" /></figure>`;
        },
      },
    },
    onMissingComponent: false,
  });
}
