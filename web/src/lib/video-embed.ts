export type VideoEmbed =
  | { kind: 'iframe'; src: string }
  | { kind: 'link'; href: string };

/** YouTube / Vimeo → iframe src; resto → enlace externo */
export function resolveVideoEmbed(url: string | null | undefined): VideoEmbed | null {
  if (!url || typeof url !== 'string') return null;
  const u = url.trim();
  if (!u) return null;

  const yt =
    u.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([\w-]{11})/) ??
    u.match(/youtube\.com\/shorts\/([\w-]{11})/);
  if (yt) {
    return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${yt[1]}` };
  }

  const vim = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vim) {
    return { kind: 'iframe', src: `https://player.vimeo.com/video/${vim[1]}` };
  }

  return { kind: 'link', href: u };
}
