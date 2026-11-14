/**
 * Product models.
 *
 * Each product lives in its own file: content/products/<id>.json. The file name is the
 * product's address on the site (/ar/<category>/<id>/), so renaming a file changes its URL.
 * These files are what the TinaCMS editor (/admin/) shows as forms; you can also edit them
 * directly on GitHub. Products are listed in ascending "order".
 */
import { ProductModel } from '../types';

type ProductFile = Omit<ProductModel, 'id'> & { order?: number };

const files = import.meta.glob<ProductFile>('../../content/products/*.json', { eager: true, import: 'default' });

const nonEmpty = (u: unknown): u is string => typeof u === 'string' && u.trim() !== '';

export const ALL_PRODUCT_MODELS: ProductModel[] = Object.entries(files)
  .map(([file, data]) => {
    const id = file.slice(file.lastIndexOf('/') + 1).replace(/\.json$/, '');
    const { order = 9999, ...rest } = data;
    return {
      order,
      model: {
        ...rest,
        id,
        images: (rest.images || []).filter(nonEmpty),
        specs: rest.specs || [],
        waterproof: rest.waterproof ?? true,
      } as ProductModel,
    };
  })
  .sort((a, b) => a.order - b.order || a.model.id.localeCompare(b.model.id))
  .map((x) => x.model);
