import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID?.trim() ?? '';
const dataset = (process.env.SANITY_STUDIO_DATASET?.trim() || 'production');

if (!projectId) {
  throw new Error(
    '[Coincidir Studio] Falta SANITY_STUDIO_PROJECT_ID.\n' +
      '1) Copia studio/.env.example → studio/.env\n' +
      '2) Pega tu Project ID desde https://www.sanity.io/manage → Proyecto → Settings → API\n' +
      'Guía: studio/README.md'
  );
}

export default defineConfig({
  name: 'default',
  title: 'Coincidir CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
