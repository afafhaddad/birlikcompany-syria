import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import initialMediaRegistry from '../data/mediaRegistry.json';
import { ALL_PRODUCT_MODELS } from '../data/productModels';
import { 
  getFromLocalStorage, 
  persistRegistryLocally, 
  getFromIndexedDB, 
  deepMergeRegistries,
  saveImageFileData,
  getAllImageFilesData,
  deleteImageFileData,
  clearAllLocalMediaStorage
} from '../utils/mediaStorage';
import { optimizeImageForUpload } from '../utils/imageOptimizer';

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
  uploadedImages: Array<{
    id: string;
    url: string;
    name: string;
    uploadedAt: string;
    size?: number;
  }>;
  cleanSlateTimestamp?: number;
}

interface MediaContextType {
  isAdmin: boolean;
  adminPreviewAsVisitor: boolean;
  isMediaLibraryOpen: boolean;
  activeTarget: MediaTarget | null;
  registry: MediaRegistryData;
  fileDataCache: Map<string, string>;
  resolveMediaUrl: (url: string | undefined) => string;
  loginAsAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  toggleVisitorPreview: () => void;
  openMediaLibrary: (target?: MediaTarget) => void;
  closeMediaLibrary: () => void;
  uploadFiles: (files: FileList | File[], autoAssignTarget?: MediaTarget) => Promise<string[]>;
  assignImage: (target: MediaTarget, imageUrl: string, mode?: 'add' | 'replace') => Promise<void>;
  resetTargetImage: (target: MediaTarget) => Promise<void>;
  resetProductToDefaults: (productId: string) => Promise<void>;
  deleteUploadedImage: (imageId: string) => Promise<void>;
  clearEntireLibrary: () => Promise<void>;
  addProductImage: (productId: string, imageUrl: string) => Promise<void>;
  removeProductImage: (productId: string, imageUrl: string) => Promise<void>;
  setProductMainImage: (productId: string, imageUrl: string) => Promise<void>;
  getHeroImageUrl: (defaultImage: string) => string;
  getCategoryImageUrl: (categoryId: string, defaultImage: string) => string;
  getProductImageUrl: (productId: string, defaultImage: string) => string;
  getProductGalleryUrls: (productId: string, defaultImages: string[]) => string[];
  getFounderImageUrl: (defaultImage: string) => string;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

const LOCAL_STORAGE_ADMIN_KEY = 'birlik_admin_auth_v1';
export const ADMIN_PASSCODE = 'birlik2026';

export const MediaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_ADMIN_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminPreviewAsVisitor, setAdminPreviewAsVisitor] = useState(false);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<MediaTarget | null>(null);

  // In-memory cache of binary image payloads (DataURLs) mapped by URL and ID
  const [fileDataCache, setFileDataCache] = useState<Map<string, string>>(new Map());
  const fileDataCacheRef = useRef<Map<string, string>>(new Map());
  const serverFilesOnDiskRef = useRef<Set<string> | null>(null);

  // Fast resolver from URL (or /uploads/... or ID) to working DataURL / Blob URL
  const resolveMediaUrl = useCallback((url: string | undefined): string => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;

    // Check direct key
    const direct = fileDataCacheRef.current.get(url);
    if (direct) return direct;

    // Check filename-only match if url is /uploads/xyz.png
    if (url.startsWith('/uploads/')) {
      const filename = url.replace('/uploads/', '');
      const byFilename = fileDataCacheRef.current.get(filename);
      if (byFilename) return byFilename;

      // If known server files list is available, check if file exists on server disk
      if (serverFilesOnDiskRef.current !== null && !serverFilesOnDiskRef.current.has(filename)) {
        // Missing from both client IndexedDB and server disk: return empty string so default photo is used
        return '';
      }
    }

    return url;
  }, []);

  // Initial state safely restored from localStorage, merged with initialMediaRegistry
  const [registry, setRegistry] = useState<MediaRegistryData>(() => {
    const saved = getFromLocalStorage();
    return deepMergeRegistries(saved, initialMediaRegistry as unknown as MediaRegistryData);
  });

  // Sync with IndexedDB and backend API on mount
  useEffect(() => {
    let isMounted = true;

    async function initRegistry() {
      // 1. Fetch from backend API first to check canonical server state and clean slate flag
      let serverData: any = null;
      try {
        const res = await fetch('/api/media/registry');
        if (res.ok) {
          serverData = await res.json();
        }
      } catch {
        // Local offline / static mode fallback
      }

      // If server has a clean slate newer than local cache, purge local storage
      const localSaved = getFromLocalStorage();
      const isCleanSlate = Boolean(
        serverData?.cleanSlateTimestamp &&
        (!localSaved?.cleanSlateTimestamp || serverData.cleanSlateTimestamp > localSaved.cleanSlateTimestamp)
      );

      if (isCleanSlate && isMounted) {
        await clearAllLocalMediaStorage();
        fileDataCacheRef.current.clear();
        setFileDataCache(new Map());
        serverFilesOnDiskRef.current = new Set(serverData?.serverFilesOnDisk || []);
        setRegistry(serverData);
        await persistRegistryLocally(serverData);
        return;
      }

      // 2. Load all stored binary images from IndexedDB into memory cache
      try {
        const storedFiles = await getAllImageFilesData();
        if (storedFiles.length > 0 && isMounted) {
          const map = new Map<string, string>();
          storedFiles.forEach((f) => {
            if (f.key && f.dataUrl) {
              map.set(f.key, f.dataUrl);
              if (f.key.startsWith('/uploads/')) {
                map.set(f.key.replace('/uploads/', ''), f.dataUrl);
              }
            }
          });
          fileDataCacheRef.current = map;
          setFileDataCache(new Map(map));

          // Auto-rehydrate / restore files to the server's public/uploads/ disk
          fetch('/api/media/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: storedFiles.map((f) => ({
                url: f.key,
                dataUrl: f.dataUrl,
                name: f.name,
              })),
            }),
          }).catch(() => {});
        }
      } catch (err) {
        console.warn('Error reading stored files from IndexedDB:', err);
      }

      // 3. Check IndexedDB in case it has data that exceeded localStorage quota
      try {
        const idbData = await getFromIndexedDB();
        if (idbData && isMounted) {
          setRegistry((prev) => deepMergeRegistries(idbData, prev));
        }
      } catch (err) {
        console.warn('Error reading from IndexedDB:', err);
      }

      // 4. Merge server data if available
      if (serverData && typeof serverData === 'object' && isMounted) {
        setRegistry((prev) => {
          // Deep merge: local assignments in spots always preserved
          const merged = deepMergeRegistries(prev, serverData);
          // Save locally to both localStorage and IndexedDB
          persistRegistryLocally(merged);

          // Background check: if any server files are missing on disk, sync them from cache
          const serverFiles = new Set<string>(serverData.serverFilesOnDisk || []);
          serverFilesOnDiskRef.current = serverFiles;
          const syncItems: Array<{ url: string; dataUrl: string; name: string }> = [];

          if (merged.uploadedImages && fileDataCacheRef.current.size > 0) {
            for (const img of merged.uploadedImages) {
              if (img.url && img.url.startsWith('/uploads/')) {
                const fname = img.url.replace('/uploads/', '');
                if (!serverFiles.has(fname)) {
                  const dUrl = fileDataCacheRef.current.get(img.url) || fileDataCacheRef.current.get(img.id);
                  if (dUrl) {
                    syncItems.push({ url: img.url, dataUrl: dUrl, name: img.name });
                  }
                }
              }
            }
          }

          if (syncItems.length > 0) {
            fetch('/api/media/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: syncItems }),
            }).catch(() => {});
          }

          return merged;
        });
      }
    }

    initRegistry();

    return () => {
      isMounted = false;
    };
  }, []);

  // Save to state, localStorage, IndexedDB, and backend server
  const saveRegistry = useCallback(async (newRegistry: MediaRegistryData) => {
    // 1. Instant React state update
    setRegistry(newRegistry);

    // 2. Local persistence in background (IndexedDB + localStorage)
    persistRegistryLocally(newRegistry).catch((err) => {
      console.warn('Local persistence warning:', err);
    });

    // 3. Server sync with 6-second timeout failsafe
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      await fetch('/api/media/registry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify(newRegistry),
      });
      clearTimeout(timer);
    } catch {
      // LocalStorage and IndexedDB are already securely preserved
    }
  }, []);

  const loginAsAdmin = (passcode: string): boolean => {
    if (passcode.trim() === ADMIN_PASSCODE) {
      setIsAdmin(true);
      setAdminPreviewAsVisitor(false);
      try {
        localStorage.setItem(LOCAL_STORAGE_ADMIN_KEY, 'true');
      } catch {
        // Safe-guard
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminPreviewAsVisitor(false);
    setIsMediaLibraryOpen(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_ADMIN_KEY);
    } catch {
      // Safe-guard
    }
  };

  const toggleVisitorPreview = () => {
    setAdminPreviewAsVisitor((prev) => !prev);
  };

  const openMediaLibrary = (target?: MediaTarget) => {
    setActiveTarget(target || null);
    setIsMediaLibraryOpen(true);
  };

  const closeMediaLibrary = () => {
    setIsMediaLibraryOpen(false);
    setActiveTarget(null);
  };

  // Convert File to Base64 or upload to server
  const uploadFiles = async (
    files: FileList | File[],
    autoAssignTarget?: MediaTarget
  ): Promise<string[]> => {
    const fileArray = Array.from(files);
    const uploadedUrls: string[] = [];
    const newItems: MediaRegistryData['uploadedImages'] = [];

    for (const file of fileArray) {
      let base64 = '';
      let cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      let fileSize = file.size;

      // 1. Fast, optimized read
      try {
        const opt = await optimizeImageForUpload(file);
        base64 = opt.dataUrl;
        cleanFileName = opt.name;
        fileSize = opt.size;
      } catch (err) {
        console.warn('Image optimization skipped, using direct FileReader:', err);
        base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          const timer = setTimeout(() => {
            reader.abort();
            reject(new Error('FileReader timeout'));
          }, 10000);
          reader.onload = (e) => {
            clearTimeout(timer);
            resolve((e.target?.result as string) || '');
          };
          reader.onerror = () => {
            clearTimeout(timer);
            reject(new Error('FileReader error'));
          };
          reader.readAsDataURL(file);
        });
      }

      if (!base64) continue;

      let finalUrl = '';

      // 2. Try uploading to server endpoint with 8-second timeout
      const controller = new AbortController();
      const uploadTimer = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch('/api/media/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            filename: cleanFileName,
            dataUrl: base64,
          }),
        });
        clearTimeout(uploadTimer);

        if (res.ok) {
          const json = await res.json();
          if (json.url) {
            finalUrl = json.url;
          }
        }
      } catch {
        clearTimeout(uploadTimer);
        // Fallback gracefully without hanging
      }

      const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
      
      // If server was unreachable, use a clean lightweight reference URL so registry never stores multi-megabyte strings
      if (!finalUrl) {
        finalUrl = `/uploads/local_${imageId}.jpg`;
      }

      // 3. Immediately prime in-memory cache for instant UI availability
      fileDataCacheRef.current.set(finalUrl, base64);
      fileDataCacheRef.current.set(imageId, base64);
      if (finalUrl.startsWith('/uploads/')) {
        const fname = finalUrl.replace('/uploads/', '');
        fileDataCacheRef.current.set(fname, base64);
        serverFilesOnDiskRef.current?.add(fname);
      }
      setFileDataCache(new Map(fileDataCacheRef.current));

      // 4. Background persist to IndexedDB (non-blocking)
      saveImageFileData(finalUrl, base64, file.name, fileSize).catch(() => {});

      uploadedUrls.push(finalUrl);
      newItems.push({
        id: imageId,
        url: finalUrl,
        name: file.name,
        uploadedAt: new Date().toISOString(),
        size: fileSize,
      });
    }

    const updatedRegistry: MediaRegistryData = {
      ...registry,
      uploadedImages: [...newItems, ...(registry.uploadedImages || [])],
    };

    // Auto assign if requested
    if (autoAssignTarget && uploadedUrls.length > 0) {
      if (autoAssignTarget.type === 'hero') {
        updatedRegistry.hero = uploadedUrls[0];
      } else if (autoAssignTarget.type === 'founder') {
        updatedRegistry.founder = uploadedUrls[0];
      } else if (autoAssignTarget.type === 'category' && autoAssignTarget.id) {
        updatedRegistry.categories = {
          ...updatedRegistry.categories,
          [autoAssignTarget.id]: uploadedUrls[0],
        };
      } else if (autoAssignTarget.type === 'product' && autoAssignTarget.id) {
        const prodId = autoAssignTarget.id;
        const currentProd = updatedRegistry.products[prodId] || {};
        
        // Find default model info
        const modelDef = ALL_PRODUCT_MODELS.find((m) => m.id === prodId);
        const defaultMain = modelDef?.images?.[0] || '';
        const defaultGallery = modelDef?.images?.slice(1) || [];

        const currentMain = currentProd.main !== undefined ? currentProd.main : defaultMain;
        const currentGallery = Array.isArray(currentProd.gallery) ? [...currentProd.gallery] : [...defaultGallery];

        if (autoAssignTarget.mode === 'replace') {
          const [newMain, ...newRest] = uploadedUrls;
          const mergedGallery = Array.from(new Set([...currentGallery, ...newRest])).filter((u) => u !== newMain);
          updatedRegistry.products = {
            ...updatedRegistry.products,
            [prodId]: {
              main: newMain,
              gallery: mergedGallery,
            },
          };
        } else {
          // Add to gallery
          if (!currentMain) {
            const [newMain, ...newRest] = uploadedUrls;
            const mergedGallery = Array.from(new Set([...currentGallery, ...newRest])).filter((u) => u !== newMain);
            updatedRegistry.products = {
              ...updatedRegistry.products,
              [prodId]: {
                main: newMain,
                gallery: mergedGallery,
              },
            };
          } else {
            const mergedGallery = Array.from(new Set([...currentGallery, ...uploadedUrls])).filter((u) => u !== currentMain);
            updatedRegistry.products = {
              ...updatedRegistry.products,
              [prodId]: {
                main: currentMain,
                gallery: mergedGallery,
              },
            };
          }
        }
      }
    }

    await saveRegistry(updatedRegistry);
    return uploadedUrls;
  };

  const assignImage = async (
    target: MediaTarget, 
    imageUrl: string, 
    mode: 'add' | 'replace' = 'add'
  ) => {
    const updated = { 
      ...registry,
      categories: { ...registry.categories },
      products: { ...registry.products },
    };

    if (target.type === 'hero') {
      updated.hero = imageUrl;
    } else if (target.type === 'founder') {
      updated.founder = imageUrl;
    } else if (target.type === 'category' && target.id) {
      updated.categories[target.id] = imageUrl;
    } else if (target.type === 'product' && target.id) {
      const prodId = target.id;
      const current = updated.products[prodId] || {};

      // Retrieve default images for model if not yet customized
      const modelDef = ALL_PRODUCT_MODELS.find((m) => m.id === prodId);
      const defaultMain = modelDef?.images?.[0] || '';
      const defaultGallery = modelDef?.images?.slice(1) || [];

      const currentMain = current.main !== undefined ? current.main : defaultMain;
      const currentGallery = Array.isArray(current.gallery) ? [...current.gallery] : [...defaultGallery];

      const shouldReplace = mode === 'replace' || target.mode === 'replace' || !currentMain;

      if (shouldReplace) {
        const newGallery = currentGallery.filter((u) => u !== imageUrl);
        updated.products[prodId] = {
          main: imageUrl,
          gallery: newGallery,
        };
      } else {
        // Mode is 'add' - Keep current main and add to gallery
        const newGallery = Array.from(new Set([...currentGallery, imageUrl])).filter((u) => u !== currentMain);
        updated.products[prodId] = {
          main: currentMain,
          gallery: newGallery,
        };
      }
    }

    await saveRegistry(updated);
  };

  const addProductImage = async (productId: string, imageUrl: string) => {
    await assignImage({ type: 'product', id: productId }, imageUrl, 'add');
  };

  const setProductMainImage = async (productId: string, imageUrl: string) => {
    const updated = { 
      ...registry,
      products: { ...registry.products },
    };
    const current = updated.products[productId] || {};
    
    const modelDef = ALL_PRODUCT_MODELS.find((m) => m.id === productId);
    const defaultMain = modelDef?.images?.[0] || '';
    const defaultGallery = modelDef?.images?.slice(1) || [];

    const oldMain = current.main !== undefined ? current.main : defaultMain;
    const currentGallery = Array.isArray(current.gallery) ? [...current.gallery] : [...defaultGallery];

    const newGallery = currentGallery.filter((u) => u !== imageUrl);
    if (oldMain && oldMain !== imageUrl && !newGallery.includes(oldMain)) {
      newGallery.unshift(oldMain);
    }

    updated.products[productId] = {
      main: imageUrl,
      gallery: newGallery,
    };

    await saveRegistry(updated);
  };

  const removeProductImage = async (productId: string, imageUrl: string) => {
    const updated = { 
      ...registry,
      products: { ...registry.products },
    };

    const modelDef = ALL_PRODUCT_MODELS.find((m) => m.id === productId);
    const defaultImages = modelDef?.images && modelDef.images.length > 0 ? modelDef.images : [];
    
    // Get the exact list of images currently displayed for this product
    const currentImages = getProductGalleryUrls(productId, defaultImages);
    const newImages = currentImages.filter((u) => u !== imageUrl);

    const newMain = newImages[0] || '';
    const newGallery = newImages.slice(1);

    // Save explicitly to products so that it stays removed and never reverts back
    updated.products[productId] = {
      main: newMain,
      gallery: newGallery,
    };

    await saveRegistry(updated);
  };

  const resetProductToDefaults = async (productId: string) => {
    const updated = { 
      ...registry,
      products: { ...registry.products },
    };
    delete updated.products[productId];
    await saveRegistry(updated);
  };

  const resetTargetImage = async (target: MediaTarget) => {
    const updated = { 
      ...registry,
      categories: { ...registry.categories },
      products: { ...registry.products },
    };

    if (target.type === 'hero') {
      updated.hero = '';
    } else if (target.type === 'founder') {
      updated.founder = '';
    } else if (target.type === 'category' && target.id) {
      delete updated.categories[target.id];
    } else if (target.type === 'product' && target.id) {
      delete updated.products[target.id];
    }

    await saveRegistry(updated);
  };

  const deleteUploadedImage = async (imageId: string) => {
    const targetItem = (registry.uploadedImages || []).find((i) => i.id === imageId);
    const imageUrl = targetItem?.url;

    const updatedImages = (registry.uploadedImages || []).filter((i) => i.id !== imageId);

    const updated: MediaRegistryData = {
      ...registry,
      uploadedImages: updatedImages,
      hero: registry.hero === imageUrl ? '' : registry.hero,
      founder: registry.founder === imageUrl ? '' : registry.founder,
      categories: { ...registry.categories },
      products: { ...registry.products },
    };

    if (imageUrl) {
      // Clean up from IndexedDB cache
      deleteImageFileData(imageUrl).catch(() => {});
      deleteImageFileData(imageId).catch(() => {});
      fileDataCacheRef.current.delete(imageUrl);
      fileDataCacheRef.current.delete(imageId);
      if (imageUrl.startsWith('/uploads/')) {
        const fname = imageUrl.replace('/uploads/', '');
        deleteImageFileData(fname).catch(() => {});
        fileDataCacheRef.current.delete(fname);
      }
      setFileDataCache(new Map(fileDataCacheRef.current));

      // Clean up from categories
      for (const [catId, url] of Object.entries(updated.categories)) {
        if (url === imageUrl) {
          delete updated.categories[catId];
        }
      }

      // Clean up from products
      for (const [prodId, pData] of Object.entries(updated.products)) {
        if (!pData) continue;
        let main = pData.main;
        let gallery = Array.isArray(pData.gallery) ? pData.gallery.filter((u) => u !== imageUrl) : [];

        if (main === imageUrl) {
          main = gallery[0] || '';
          gallery = gallery.slice(1);
        }

        updated.products[prodId] = {
          main,
          gallery,
        };
      }

      // Send delete request to backend server
      try {
        await fetch('/api/media/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: imageUrl, id: imageId }),
        });
      } catch {
        // Backend optional
      }
    }

    await saveRegistry(updated);
  };

  const clearEntireLibrary = async () => {
    try {
      const res = await fetch('/api/media/clear-library', { method: 'POST' });
      let newRegistry: MediaRegistryData;
      if (res.ok) {
        const json = await res.json();
        newRegistry = json.registry;
      } else {
        newRegistry = {
          hero: '',
          founder: '',
          categories: {},
          products: {},
          uploadedImages: [],
          cleanSlateTimestamp: Date.now(),
        };
      }

      // 1. Wipe local memory cache
      fileDataCacheRef.current.clear();
      setFileDataCache(new Map());
      serverFilesOnDiskRef.current = new Set();

      // 2. Wipe browser local stores
      await clearAllLocalMediaStorage();

      // 3. Save clean registry locally
      await persistRegistryLocally(newRegistry);

      // 4. Update state
      setRegistry(newRegistry);
    } catch (err) {
      console.error('Error in clearEntireLibrary:', err);
    }
  };

  // Helper getters
  const getHeroImageUrl = (defaultImage: string): string => {
    const resolved = resolveMediaUrl(registry.hero);
    return resolved && resolved.trim() !== '' ? resolved : defaultImage;
  };

  const getCategoryImageUrl = (categoryId: string, defaultImage: string): string => {
    const custom = registry.categories?.[categoryId];
    const resolved = resolveMediaUrl(custom);
    return resolved && resolved.trim() !== '' ? resolved : defaultImage;
  };

  const getProductImageUrl = (productId: string, defaultImage: string): string => {
    if (productId in (registry.products || {})) {
      const custom = registry.products[productId];
      if (custom?.main) {
        const resolved = resolveMediaUrl(custom.main);
        if (resolved && resolved.trim() !== '') return resolved;
      }
      if (Array.isArray(custom?.gallery)) {
        for (const g of custom.gallery) {
          const resolved = resolveMediaUrl(g);
          if (resolved && resolved.trim() !== '') return resolved;
        }
      }
    }
    return defaultImage;
  };

  const getProductGalleryUrls = (productId: string, defaultImages: string[]): string[] => {
    const cleanDefaults = (defaultImages || []).filter((u) => typeof u === 'string' && u.trim().length > 0);
    const fallback = cleanDefaults.length > 0
      ? cleanDefaults
      : ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85'];

    if (productId in (registry.products || {})) {
      const custom = registry.products[productId];
      if (!custom) return fallback;

      const customList: string[] = [];
      if (custom.main) {
        const resolved = resolveMediaUrl(custom.main);
        if (resolved && resolved.trim() !== '') {
          customList.push(resolved);
        }
      }
      if (Array.isArray(custom.gallery)) {
        custom.gallery.forEach((url) => {
          if (url) {
            const resolved = resolveMediaUrl(url);
            if (resolved && resolved.trim() !== '' && !customList.includes(resolved)) {
              customList.push(resolved);
            }
          }
        });
      }

      if (customList.length > 0) {
        return customList;
      }
    }
    return fallback;
  };

  const getFounderImageUrl = (defaultImage: string): string => {
    const resolved = resolveMediaUrl(registry.founder);
    return resolved && resolved.trim() !== '' ? resolved : defaultImage;
  };

  return (
    <MediaContext.Provider
      value={{
        isAdmin: isAdmin && !adminPreviewAsVisitor,
        adminPreviewAsVisitor,
        isMediaLibraryOpen,
        activeTarget,
        registry,
        fileDataCache,
        resolveMediaUrl,
        loginAsAdmin,
        logoutAdmin,
        toggleVisitorPreview,
        openMediaLibrary,
        closeMediaLibrary,
        uploadFiles,
        assignImage,
        resetTargetImage,
        resetProductToDefaults,
        deleteUploadedImage,
        clearEntireLibrary,
        addProductImage,
        removeProductImage,
        setProductMainImage,
        getHeroImageUrl,
        getCategoryImageUrl,
        getProductImageUrl,
        getProductGalleryUrls,
        getFounderImageUrl,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};
