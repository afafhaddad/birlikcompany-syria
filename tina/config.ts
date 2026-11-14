/**
 * TinaCMS: the product editor at https://www.birlik-insaat.com/admin/
 *
 * Every save in the editor becomes a commit on GitHub (main), and Vercel redeploys the
 * site in about two minutes. Nothing here is loaded by the public website.
 *
 * Needs two environment variables (Vercel → Project → Settings → Environment Variables):
 *   TINA_CLIENT_ID  and  TINA_TOKEN   — both from app.tina.io → your project.
 * Without them the build simply skips the editor (see scripts/build-cms.mjs).
 */
import { defineConfig, type Template, type TinaField } from 'tinacms';

const LANG_LABELS = { ar: 'Arabic · عربي', en: 'English', tr: 'Turkish · Türkçe' } as const;

/** One text per language, shown as three boxes. */
const threeLangs = (name: string, label: string, description?: string, textarea = false): TinaField => ({
  type: 'object',
  name,
  label,
  description,
  fields: (Object.keys(LANG_LABELS) as Array<keyof typeof LANG_LABELS>).map((lang) => ({
    type: 'string',
    name: lang,
    label: LANG_LABELS[lang],
    required: true,
    ...(textarea ? { ui: { component: 'textarea' } } : {}),
  })),
});

const CATEGORY_OPTIONS = [
  { value: 'ps_wood', label: 'PS Wall Panels · بديل الخشب' },
  { value: 'pvc_marble', label: 'PVC Wall Panels · بديل الرخام' },
  { value: 'spc_wall', label: 'SPC Wall Panels · بديل الشيبورد الحجري' },
  { value: 'spc_flooring', label: 'SPC Flooring · بديل الباركيه' },
  { value: 'ps_slats', label: 'PS Wall Slats · قضبان بي إس' },
  { value: 'ps_baseboards', label: 'PS Baseboards · نعلات بي إس' },
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const PREFIX: Record<string, string> = {
  ps_wood: 'ps',
  pvc_marble: 'pvc',
  spc_wall: 'spc',
  spc_flooring: 'flr',
  ps_slats: 'slat',
  ps_baseboards: 'base',
};

const specItem: Template['fields'][number] = {
  type: 'object',
  name: 'specs',
  label: 'Extra specifications table',
  description: 'Rows shown in the product’s specification table. Optional.',
  list: true,
  ui: {
    itemProps: (item: { label?: { en?: string }; value?: { en?: string } }) => ({
      label: [item?.label?.en, item?.value?.en].filter(Boolean).join(': ') || 'New row',
    }),
    defaultItem: { key: 'spec' },
  },
  fields: [
    { type: 'string', name: 'key', label: 'Internal key (letters only, e.g. thickness)', required: true },
    threeLangs('label', 'Row name'),
    threeLangs('value', 'Value'),
  ],
};

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: { outputFolder: 'admin', publicFolder: 'public' },

  // Photos uploaded in the editor are stored in the repository under public/uploads
  // and served (resized to WebP/AVIF) by Vercel's image optimizer.
  media: { tina: { mediaRoot: 'uploads', publicFolder: 'public' } },

  schema: {
    collections: [
      {
        name: 'product',
        label: 'Products · المنتجات',
        path: 'content/products',
        format: 'json',
        ui: {
          filename: {
            // The file name is the product's web address — it can only be set when creating.
            readonly: true,
            slugify: (values: { category?: string; name?: { en?: string } }) =>
              [PREFIX[values?.category || ''] || 'item', slug(values?.name?.en || '')].filter(Boolean).join('-'),
          },
        },
        defaultItem: () => ({ order: 9000, waterproof: true, images: [], specs: [] }),
        fields: [
          threeLangs('name', 'Model name', 'Usually the same Latin name in all three, e.g. “Kara”.'),
          {
            type: 'string',
            name: 'category',
            label: 'Category · الفئة',
            required: true,
            options: CATEGORY_OPTIONS,
          },
          { type: 'string', name: 'code', label: 'Model code · كود الموديل', required: true },
          {
            type: 'image',
            name: 'images',
            label: 'Photos · الصور',
            description: 'The first photo is the main one (cards, Google, social shares). Drag to reorder.',
            list: true,
          },
          threeLangs('subtitle', 'Short tagline', 'One line under the model name.', true),
          threeLangs('description', 'Short description', 'One or two sentences: size, thickness, finish.', true),
          { type: 'string', name: 'dimensions', label: 'Size · المقاس', description: 'e.g. 122 cm × 240 cm', required: true },
          { type: 'string', name: 'thickness', label: 'Thickness · السماكة', description: 'e.g. 2.5 mm', required: true },
          { type: 'boolean', name: 'waterproof', label: 'Waterproof · مقاوم للماء' },
          { type: 'string', name: 'colorHex', label: 'Main colour (for colour dots)', ui: { component: 'color' } },
          specItem,
          {
            type: 'number',
            name: 'order',
            label: 'Position in lists',
            description: 'Smaller numbers show first. Existing products use steps of 10, so 125 sits between 120 and 130.',
          },
        ],
      },
      {
        name: 'sitePhotos',
        label: 'Site photos · صور الموقع',
        path: 'src/data',
        format: 'json',
        match: { include: 'mediaRegistry' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'image', name: 'hero', label: 'Home page photo (shown before the video loads)' },
          { type: 'image', name: 'founder', label: 'Founder photo' },
          {
            type: 'object',
            name: 'categories',
            label: 'Category photos',
            fields: CATEGORY_OPTIONS.map((c) => ({ type: 'image' as const, name: c.value, label: c.label })),
          },
        ],
      },
    ],
  },
});
