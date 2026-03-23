import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'landing',
  title: 'Landing',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Titular', type: 'string' },
        { name: 'subheadline', title: 'Subtítulo', type: 'text', rows: 3 },
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
});
