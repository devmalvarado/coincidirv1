import { defineArrayMember, defineField, defineType } from 'sanity';

const postTags = [
  { title: 'Recomendación', value: 'recomendacion' },
  { title: 'Datos', value: 'datos' },
  { title: 'Investigación', value: 'investigacion' },
  { title: 'Publicación', value: 'publicacion' },
  { title: 'Nota / artículo breve', value: 'nota' },
] as const;

export default defineType({
  name: 'post',
  title: 'Artículo (Blog)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas (tipo de contenido)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [...postTags],
        layout: 'grid',
      },
      description:
        'Puedes marcar varias. Sirve para clasificar: recomendación, datos, investigación, publicación o una nota más informal.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de imágenes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Texto alternativo' },
            { name: 'caption', type: 'string', title: 'Pie de foto' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Vídeo (URL)',
      type: 'url',
      description: 'YouTube, Vimeo u otra URL embebible. Opcional.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Cuerpo',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', tags: 'tags' },
    prepare({ title, media, tags }) {
      const tagStr = Array.isArray(tags) && tags.length ? tags.join(', ') : '';
      return {
        title: title ?? 'Sin título',
        subtitle: tagStr || 'Sin etiquetas',
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Fecha, más reciente',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
