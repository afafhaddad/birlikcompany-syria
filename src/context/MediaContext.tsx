/**
 * Read-only media registry.
 *
 * Which image is shown for the hero, founder and each category is defined in
 * src/data/mediaRegistry.json ("Site photos" in the /admin/ editor). Product photos
 * live in each product's own file, content/products/<id>.json.
 *
 * The previous in-browser admin panel (passcode login, drag & drop, media library)
 * was removed: its passcode was public in the bundle, and its edits were only saved
 * in the editor's own browser, never published to visitors.
 */
import React, { createContext, useContext, ReactNode } from 'react';
import mediaRegistryJson from '../data/mediaRegistry.json';
import { ALL_PRODUCT_MODELS } from '../data/productModels';
import { optimizeImage, ImageWidth } from '../utils/optimizeImage';

export interface MediaTarget {
  type: 'hero' | 'founder' | 'category' | 'product';
  id?: string;
  name?: string;
  mode?: 'add' | 'replace';
}

export interface StoryPhotos {
  main?: string;
  top?: string;
  bottom?: string;
}

export interface MediaRegistryData {
  hero?: string;
  founder: string;
  categories: Record<string, string>;
  /** Home page range chapters: three photos per range ("Site photos" in the editor) */
  homeStory: Record<string, StoryPhotos>;
}

interface MediaContextType {
  /** Always false: kept so existing components compile; admin-only UI never renders. */
  isAdmin: boolean;
  registry: MediaRegistryData;
  getHeroImageUrl: (defaultImage: string) => string;
  getCategoryImageUrl: (categoryId: string, defaultImage: string, width?: ImageWidth) => string;
  getProductImageUrl: (productId: string, defaultImage: string, width?: ImageWidth) => string;
  getProductGalleryUrls: (productId: string, defaultImages: string[]) => string[];
  getFounderImageUrl: (defaultImage: string) => string;
  /** The three home-page story photos of a range (raw paths; empty entries fall back in the component) */
  getStoryPhotos: (categoryId: string) => StoryPhotos;
  // No-op stubs for legacy admin UI paths (unreachable because isAdmin is false)
  uploadFiles: (files: FileList | File[], target?: MediaTarget) => Promise<string[]>;
  removeProductImage: (productId: string, imageUrl: string) => Promise<void>;
  setProductMainImage: (productId: string, imageUrl: string) => Promise<void>;
  openMediaLibrary: (target?: MediaTarget) => void;
  resetProductToDefaults: (productId: string) => Promise<void>;
}

const raw = mediaRegistryJson as Partial<MediaRegistryData>;
const registry: MediaRegistryData = {
  hero: raw.hero || '',
  founder: raw.founder || '',
  categories: raw.categories || {},
  homeStory: raw.homeStory || {},
};

const nonEmpty = (u: string | undefined): u is string => typeof u === 'string' && u.trim() !== '';

const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85';

const getHeroImageUrl = (d: string) => optimizeImage(nonEmpty(registry.hero) ? registry.hero : d, 1600);

const getCategoryImageUrl = (id: string, d: string, width: ImageWidth = 1080) => {
  const custom = registry.categories[id];
  return optimizeImage(nonEmpty(custom) ? custom : d, width);
};

// Product photos live in each product's file (content/products/<id>.json → "images").
const productImages = new Map(ALL_PRODUCT_MODELS.map((m) => [m.id, m.images]));

const getProductGalleryUrls = (id: string, defaults: string[]) => {
  const list = [...new Set((productImages.get(id) || []).filter(nonEmpty))];
  const cleanDefaults = (defaults || []).filter(nonEmpty);
  const chosen = list.length > 0 ? list : cleanDefaults.length > 0 ? cleanDefaults : [DEFAULT_PRODUCT_IMAGE];
  return chosen.map((u) => optimizeImage(u, 1080));
};

const getProductImageUrl = (id: string, d: string, width: ImageWidth = 1080) => {
  const first = (productImages.get(id) || []).find(nonEmpty);
  return optimizeImage(first || d, width);
};

const getFounderImageUrl = (d: string) => optimizeImage(nonEmpty(registry.founder) ? registry.founder : d, 640);

const noopAsync = async () => {};

const value: MediaContextType = {
  isAdmin: false,
  registry,
  getHeroImageUrl,
  getCategoryImageUrl,
  getProductImageUrl,
  getProductGalleryUrls,
  getFounderImageUrl,
  getStoryPhotos: (id: string) => {
    const s = registry.homeStory[id] || {};
    return { main: nonEmpty(s.main) ? s.main : undefined, top: nonEmpty(s.top) ? s.top : undefined, bottom: nonEmpty(s.bottom) ? s.bottom : undefined };
  },
  uploadFiles: async () => [],
  removeProductImage: noopAsync,
  setProductMainImage: noopAsync,
  openMediaLibrary: () => {},
  resetProductToDefaults: noopAsync,
};

const MediaContext = createContext<MediaContextType>(value);

export const MediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
);

export const useMedia = () => useContext(MediaContext);
