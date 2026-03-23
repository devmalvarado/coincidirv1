export const POST_TAG_LABELS_ES: Record<string, string> = {
  recomendacion: 'Recomendación',
  datos: 'Datos',
  investigacion: 'Investigación',
  publicacion: 'Publicación',
  nota: 'Nota',
};

export const POST_TAG_LABELS_EN: Record<string, string> = {
  recomendacion: 'Recommendation',
  datos: 'Data',
  investigacion: 'Research',
  publicacion: 'Publication',
  nota: 'Short post',
};

export function formatPostTags(
  tags: string[] | null | undefined,
  labels: Record<string, string>,
): string[] {
  if (!tags?.length) return [];
  return tags.map((t) => labels[t] ?? t);
}
