import { MediaRegistryData } from '../context/MediaContext';

const LOCAL_STORAGE_REGISTRY_KEY = 'birlik_media_registry_v2';
const LEGACY_STORAGE_KEY = 'birlik_media_registry_v1';
const DB_NAME = 'birlik_media_db';
const STORE_NAME = 'media_registry_store';
const FILES_STORE_NAME = 'media_files_data_store';
const KEY_NAME = 'current_registry';

export interface StoredImageFile {
  key: string;
  dataUrl: string;
  name: string;
  size?: number;
  updatedAt?: number;
}

let cachedDb: IDBDatabase | null = null;
let isOpening = false;
const openWaiters: Array<(db: IDBDatabase | null) => void> = [];

/**
 * Open IndexedDB for robust large payload storage (Registry + Image Blobs/DataURLs)
 * Implements connection caching, onblocked handling, and a strict timeout so it NEVER hangs
 */
function openDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }

  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  if (isOpening) {
    return new Promise((resolve) => {
      openWaiters.push(resolve);
      // Failsafe timeout for queued waiters
      setTimeout(() => resolve(cachedDb), 1500);
    });
  }

  isOpening = true;

  return new Promise((resolve) => {
    let resolved = false;

    const finish = (result: IDBDatabase | null) => {
      if (resolved) return;
      resolved = true;
      isOpening = false;
      cachedDb = result;
      resolve(result);
      while (openWaiters.length > 0) {
        const waiter = openWaiters.shift();
        waiter?.(result);
      }
    };

    // Strict 1.5-second timeout: never let IndexedDB block the UI or file uploads
    const timer = setTimeout(() => {
      console.warn('IndexedDB open timed out, proceeding with memory/localStorage fallback');
      finish(null);
    }, 1500);

    try {
      const request = indexedDB.open(DB_NAME, 2);

      request.onblocked = () => {
        clearTimeout(timer);
        console.warn('IndexedDB upgrade blocked by another connection');
        finish(cachedDb);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
        if (!db.objectStoreNames.contains(FILES_STORE_NAME)) {
          db.createObjectStore(FILES_STORE_NAME);
        }
      };

      request.onsuccess = () => {
        clearTimeout(timer);
        const db = request.result;
        db.onversionchange = () => {
          db.close();
          cachedDb = null;
        };
        finish(db);
      };

      request.onerror = () => {
        clearTimeout(timer);
        console.warn('IndexedDB open error:', request.error);
        finish(null);
      };
    } catch (e) {
      clearTimeout(timer);
      console.warn('IndexedDB exception:', e);
      finish(null);
    }
  });
}

/**
 * Read registry from IndexedDB
 */
export async function getFromIndexedDB(): Promise<MediaRegistryData | null> {
  const db = await openDB();
  if (!db || !db.objectStoreNames.contains(STORE_NAME)) return null;

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 1500);
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_NAME);
      req.onsuccess = () => {
        clearTimeout(timer);
        resolve(req.result || null);
      };
      req.onerror = () => {
        clearTimeout(timer);
        resolve(null);
      };
      tx.onabort = () => {
        clearTimeout(timer);
        resolve(null);
      };
    } catch {
      clearTimeout(timer);
      resolve(null);
    }
  });
}

/**
 * Save registry to IndexedDB
 */
export async function saveToIndexedDB(data: MediaRegistryData): Promise<void> {
  const db = await openDB();
  if (!db || !db.objectStoreNames.contains(STORE_NAME)) return;

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(), 1500);
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(data, KEY_NAME);
      tx.oncomplete = () => {
        clearTimeout(timer);
        resolve();
      };
      tx.onerror = () => {
        clearTimeout(timer);
        resolve();
      };
      tx.onabort = () => {
        clearTimeout(timer);
        resolve();
      };
    } catch {
      clearTimeout(timer);
      resolve();
    }
  });
}

/**
 * Save actual image file payload (base64 dataUrl) to IndexedDB
 */
export async function saveImageFileData(
  key: string,
  dataUrl: string,
  name: string,
  size?: number
): Promise<void> {
  const db = await openDB();
  if (!db || !db.objectStoreNames.contains(FILES_STORE_NAME)) return;

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(), 2000);
    try {
      const tx = db.transaction(FILES_STORE_NAME, 'readwrite');
      const store = tx.objectStore(FILES_STORE_NAME);
      const item: StoredImageFile = {
        key,
        dataUrl,
        name,
        size: size || dataUrl.length,
        updatedAt: Date.now(),
      };
      store.put(item, key);
      tx.oncomplete = () => {
        clearTimeout(timer);
        resolve();
      };
      tx.onerror = () => {
        clearTimeout(timer);
        resolve();
      };
      tx.onabort = () => {
        clearTimeout(timer);
        resolve();
      };
    } catch {
      clearTimeout(timer);
      resolve();
    }
  });
}

/**
 * Get stored image file payload by key (URL or ID)
 */
export async function getImageFileData(key: string): Promise<string | null> {
  const db = await openDB();
  if (!db || !db.objectStoreNames.contains(FILES_STORE_NAME)) return null;

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 1500);
    try {
      const tx = db.transaction(FILES_STORE_NAME, 'readonly');
      const store = tx.objectStore(FILES_STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        clearTimeout(timer);
        const res = req.result as StoredImageFile | undefined;
        resolve(res?.dataUrl || null);
      };
      req.onerror = () => {
        clearTimeout(timer);
        resolve(null);
      };
      tx.onabort = () => {
        clearTimeout(timer);
        resolve(null);
      };
    } catch {
      clearTimeout(timer);
      resolve(null);
    }
  });
}

/**
 * Get all stored image files from IndexedDB
 */
export async function getAllImageFilesData(): Promise<StoredImageFile[]> {
  const db = await openDB();
  if (!db || !db.objectStoreNames.contains(FILES_STORE_NAME)) return [];

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve([]), 2000);
    try {
      const tx = db.transaction(FILES_STORE_NAME, 'readonly');
      const store = tx.objectStore(FILES_STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        clearTimeout(timer);
        resolve(req.result || []);
      };
      req.onerror = () => {
        clearTimeout(timer);
        resolve([]);
      };
      tx.onabort = () => {
        clearTimeout(timer);
        resolve([]);
      };
    } catch {
      clearTimeout(timer);
      resolve([]);
    }
  });
}

/**
 * Delete stored image file payload from IndexedDB
 */
export async function deleteImageFileData(key: string): Promise<void> {
  const db = await openDB();
  if (!db || !db.objectStoreNames.contains(FILES_STORE_NAME)) return;

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(), 1500);
    try {
      const tx = db.transaction(FILES_STORE_NAME, 'readwrite');
      const store = tx.objectStore(FILES_STORE_NAME);
      store.delete(key);
      tx.oncomplete = () => {
        clearTimeout(timer);
        resolve();
      };
      tx.onerror = () => {
        clearTimeout(timer);
        resolve();
      };
      tx.onabort = () => {
        clearTimeout(timer);
        resolve();
      };
    } catch {
      clearTimeout(timer);
      resolve();
    }
  });
}

/**
 * Wipe all local storage (IndexedDB stores + localStorage keys) for a clean slate
 */
export async function clearAllLocalMediaStorage(): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(LOCAL_STORAGE_REGISTRY_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // Safe-guard
    }
  }

  const db = await openDB();
  if (!db) return;

  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(), 2000);
    try {
      const stores = [STORE_NAME, FILES_STORE_NAME].filter((s) => db.objectStoreNames.contains(s));
      if (stores.length === 0) {
        clearTimeout(timer);
        return resolve();
      }
      const tx = db.transaction(stores, 'readwrite');
      stores.forEach((s) => {
        try {
          tx.objectStore(s).clear();
        } catch {
          // ignore
        }
      });
      tx.oncomplete = () => {
        clearTimeout(timer);
        resolve();
      };
      tx.onerror = () => {
        clearTimeout(timer);
        resolve();
      };
      tx.onabort = () => {
        clearTimeout(timer);
        resolve();
      };
    } catch {
      clearTimeout(timer);
      resolve();
    }
  });
}

/**
 * Strips any dataUrl strings before writing to localStorage, ensuring localStorage
 * ONLY holds lightweight URLs/IDs (< 30 KB) and never exceeds the browser 5MB quota.
 */
function sanitizeRegistryForLocalStorage(data: MediaRegistryData): MediaRegistryData {
  const sanitizeUrl = (url: string | undefined): string => {
    if (!url) return '';
    // If it is a huge DataURL, do not keep in localStorage (IndexedDB and memory hold it)
    if (url.startsWith('data:') && url.length > 500) {
      return '';
    }
    return url;
  };

  const cleanCategories: Record<string, string> = {};
  for (const [k, v] of Object.entries(data.categories || {})) {
    cleanCategories[k] = sanitizeUrl(v);
  }

  const cleanProducts: Record<string, { main?: string; gallery?: string[] }> = {};
  for (const [prodId, prod] of Object.entries(data.products || {})) {
    cleanProducts[prodId] = {
      main: sanitizeUrl(prod.main),
      gallery: Array.isArray(prod.gallery) ? prod.gallery.map(sanitizeUrl).filter(Boolean) : [],
    };
  }

  // Only keep lightweight image metadata in localStorage (recent 60 images)
  const cleanUploaded = (data.uploadedImages || []).slice(0, 60).map((img) => ({
    id: img.id,
    url: sanitizeUrl(img.url),
    name: img.name,
    uploadedAt: img.uploadedAt,
    size: img.size,
  }));

  return {
    hero: sanitizeUrl(data.hero),
    founder: sanitizeUrl(data.founder),
    categories: cleanCategories,
    products: cleanProducts,
    uploadedImages: cleanUploaded,
    cleanSlateTimestamp: data.cleanSlateTimestamp,
  };
}

/**
 * Load saved registry from localStorage and IndexedDB
 */
export function getFromLocalStorage(): MediaRegistryData | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_REGISTRY_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch {
        // Safe-guard
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Could not read from localStorage:', e);
  }
  return null;
}

/**
 * Save to both localStorage and IndexedDB with full quota protection
 */
export async function persistRegistryLocally(data: MediaRegistryData): Promise<void> {
  // 1. LocalStorage (Lightweight metadata only)
  if (typeof window !== 'undefined') {
    try {
      const sanitized = sanitizeRegistryForLocalStorage(data);
      localStorage.setItem(LOCAL_STORAGE_REGISTRY_KEY, JSON.stringify(sanitized));
    } catch {
      // If quota is somehow reached, clean legacy keys and save minimal structure
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        const minimal = {
          hero: data.hero && !data.hero.startsWith('data:') ? data.hero : '',
          founder: data.founder && !data.founder.startsWith('data:') ? data.founder : '',
          categories: data.categories || {},
          products: data.products || {},
          uploadedImages: (data.uploadedImages || []).slice(0, 20).filter((i) => !i.url?.startsWith('data:')),
        };
        localStorage.setItem(LOCAL_STORAGE_REGISTRY_KEY, JSON.stringify(minimal));
      } catch {
        // IndexedDB handles full persistence below
      }
    }
  }

  // 2. Full persistence in IndexedDB (Gigabytes storage quota)
  await saveToIndexedDB(data);
}

/**
 * Deep merge local registry with server registry.
 * Guarantees that no user-assigned images (products, categories, hero, founder, or library)
 * are ever overwritten or lost when reloading or restarting the app!
 */
export function deepMergeRegistries(
  local: Partial<MediaRegistryData> | null | undefined,
  server: Partial<MediaRegistryData> | null | undefined
): MediaRegistryData {
  const l = local || {};
  const s = server || {};

  // Check if server issued a clean slate that is newer than local cache
  const isServerCleanSlate = Boolean(
    s.cleanSlateTimestamp && (!l.cleanSlateTimestamp || s.cleanSlateTimestamp > l.cleanSlateTimestamp)
  );

  // 1. Uploaded library images (merge and deduplicate)
  const imgMap = new Map<string, MediaRegistryData['uploadedImages'][0]>();
  
  // First add server images
  if (Array.isArray(s.uploadedImages)) {
    s.uploadedImages.forEach((img) => {
      if (img && img.id) {
        imgMap.set(img.id, img);
      } else if (img && img.url) {
        imgMap.set(img.url, img);
      }
    });
  }

  // Then add local images ONLY if server didn't issue a clean slate
  if (!isServerCleanSlate && Array.isArray(l.uploadedImages)) {
    l.uploadedImages.forEach((img) => {
      if (img && img.id) {
        imgMap.set(img.id, img);
      } else if (img && img.url) {
        imgMap.set(img.url, img);
      }
    });
  }

  const uploadedImages = Array.from(imgMap.values());

  // 2. Hero: prefer local if explicitly set and not clean slate, else server, else empty
  const hero = (!isServerCleanSlate && l.hero !== undefined) ? l.hero : (s.hero || '');

  // 3. Founder: prefer local if explicitly set and not clean slate, else server, else empty
  const founder = (!isServerCleanSlate && l.founder !== undefined) ? l.founder : (s.founder || '');

  // 4. Categories: merge objects
  const categories: Record<string, string> = isServerCleanSlate
    ? { ...(s.categories || {}) }
    : {
        ...(s.categories || {}),
        ...(l.categories || {}),
      };

  // 5. Products: DEEP MERGE product models!
  const products: Record<string, { main?: string; gallery?: string[] }> = {};

  const allProductKeys = new Set([
    ...Object.keys(s.products || {}),
    ...(isServerCleanSlate ? [] : Object.keys(l.products || {})),
  ]);

  for (const prodId of allProductKeys) {
    const lProd = l.products?.[prodId];
    const sProd = s.products?.[prodId];

    if (lProd && sProd) {
      // Local changes take precedence for main image if set
      const main = lProd.main !== undefined ? lProd.main : sProd.main;
      
      // Combine galleries without duplicates
      const gallerySet = new Set<string>();
      if (Array.isArray(sProd.gallery)) {
        sProd.gallery.forEach((url) => {
          if (url && url !== main) gallerySet.add(url);
        });
      }
      if (Array.isArray(lProd.gallery)) {
        lProd.gallery.forEach((url) => {
          if (url && url !== main) gallerySet.add(url);
        });
      }

      products[prodId] = {
        main,
        gallery: Array.from(gallerySet),
      };
    } else if (lProd) {
      // Product was assigned in local browser -> PRESERVE IT!
      products[prodId] = {
        main: lProd.main,
        gallery: Array.isArray(lProd.gallery) ? [...lProd.gallery] : [],
      };
    } else if (sProd) {
      // Product on server
      products[prodId] = {
        main: sProd.main,
        gallery: Array.isArray(sProd.gallery) ? [...sProd.gallery] : [],
      };
    }
  }

  return {
    hero,
    founder,
    categories,
    products,
    uploadedImages,
    cleanSlateTimestamp: s.cleanSlateTimestamp || l.cleanSlateTimestamp,
  };
}
