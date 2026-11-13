/**
 * Read-only media registry.
 *
 * Which image is shown for the hero, founder, each category and each product is
 * defined in src/data/mediaRegistry.json. To change an image, edit that file in
 * GitHub (paste the new Vercel Blob URL) and push — Vercel redeploys automatically.
 *
 * The previous in-browser admin panel (passcode login, drag & drop, media library)
 * was removed: its passcode was public in the bundle, and its edits were only saved
 * in the editor's own browser, never published to visitors.
 */
import React, { createContext, useContext, ReactNode } from 'react';
import mediaRegistryJson from '../data/mediaRegistry.json';
import { optimizeImage, ImageWidth } from '../utils/optimizeImage';

export interface MediaTarget {
  type: 'hero' | 'founder' | 'category' | 'product';
  id?: string;
  name?: string;
  mode?: 'add' | 'replace';
}

export interface MediaRegistryData {
  hero?: string;
  founder: string;
  categories: Record<string, string>;
  products: Record<string, { main?: string; gallery?: string[] }>;
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
  products: raw.products || {},
};

const nonEmpty = (u: string | undefined): u is string => typeof u === 'string' && u.trim() !== '';

const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85';

const getHeroImageUrl = (d: string) => optimizeImage(nonEmpty(registry.hero) ? registry.hero : d, 1600);

const getCategoryImageUrl = (id: string, d: string, width: ImageWidth = 1080) => {
  const custom = registry.categories[id];
  return optimizeImage(nonEmpty(custom) ? custom : d, width);
};

const getProductGalleryUrls = (id: string, defaults: string[]) => {
  const p = registry.products[id];
  const list: string[] = [];
  if (p) {
    if (nonEmpty(p.main)) list.push(p.main);
    (p.gallery || []).forEach((g) => {
      if (nonEmpty(g) && !list.includes(g)) list.push(g);
    });
  }
  const cleanDefaults = (defaults || []).filter(nonEmpty);
  const chosen = list.length > 0 ? list : cleanDefaults.length > 0 ? cleanDefaults : [DEFAULT_PRODUCT_IMAGE];
  return chosen.map((u) => optimizeImage(u, 1080));
};

const getProductImageUrl = (id: string, d: string, width: ImageWidth = 1080) => {
  const p = registry.products[id];
  const first = p ? [p.main, ...(p.gallery || [])].find(nonEmpty) : undefined;
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
