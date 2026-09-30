export type Language = 'ar' | 'en' | 'tr';

export type ProductCategory = 
  | 'all'
  | 'ps_wood'
  | 'pvc_marble'
  | 'spc_wall'
  | 'spc_flooring'
  | 'ps_slats'
  | 'ps_baseboards'
  | 'pvc'
  | 'ps'
  | 'spc'
  | 'polystyrene_slats'
  | 'polystyrene_baseboards'
  | 'walls'
  | 'slats'
  | 'baseboards';

export interface ModelSpecItem {
  key: string;
  label: {
    ar: string;
    en: string;
    tr: string;
  };
  value: {
    ar: string;
    en: string;
    tr: string;
  };
}

export interface CategoryInfo {
  id: ProductCategory;
  name: {
    ar: string;
    en: string;
    tr: string;
  };
  subtitle: {
    ar: string;
    en: string;
    tr: string;
  };
  description: {
    ar: string;
    en: string;
    tr: string;
  };
  image: string;
  specs: {
    dimensions: string;
    thickness: string;
    waterproof: {
      ar: string;
      en: string;
      tr: string;
    };
    composition: {
      ar: string;
      en: string;
      tr: string;
    };
    applications: {
      ar: string;
      en: string;
      tr: string;
    };
  };
}

export interface ProductModel {
  id: string;
  code: string; // Model Code e.g. SPC-CAL-101
  category: ProductCategory;
  name: {
    ar: string;
    en: string;
    tr: string;
  };
  subtitle: {
    ar: string;
    en: string;
    tr: string;
  };
  description: {
    ar: string;
    en: string;
    tr: string;
  };
  // Multiple photos for each model (at least 3 to 4 photos per model)
  images: string[];
  dimensions: string;
  thickness: string;
  waterproof: boolean;
  colorHex?: string;
  // Extensible specifications list so the user can easily add/modify specs for each model
  specs: ModelSpecItem[];
}
