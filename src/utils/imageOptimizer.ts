/**
 * Client-side high-fidelity image optimizer for fast, bulletproof uploads
 */

export interface OptimizedImageResult {
  dataUrl: string;
  name: string;
  size: number;
  width?: number;
  height?: number;
}

const MAX_DIMENSION = 2048; // Crisp 2K resolution, perfect for architectural surface textures
const COMPRESSION_QUALITY = 0.9; // Visually lossless JPEG quality
const RESIZE_THRESHOLD_BYTES = 1024 * 1024; // 1 MB

/**
 * Reads a File and produces a fast, lightweight DataURL without locking the UI
 */
export async function optimizeImageForUpload(file: File): Promise<OptimizedImageResult> {
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');

  // Read file as base64 with strict timeout
  const rawDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    const timeout = setTimeout(() => {
      reader.abort();
      reject(new Error('FileReader timed out'));
    }, 15000);

    reader.onload = (e) => {
      clearTimeout(timeout);
      resolve((e.target?.result as string) || '');
    };
    reader.onerror = (e) => {
      clearTimeout(timeout);
      reject(e);
    };
    reader.readAsDataURL(file);
  });

  // If not an image or is SVG/GIF, return as is
  if (!file.type.startsWith('image/') || file.type.includes('svg') || file.type.includes('gif')) {
    return {
      dataUrl: rawDataUrl,
      name: cleanName,
      size: file.size,
    };
  }

  // If already small (< 1MB), no need to compress through canvas
  if (file.size <= RESIZE_THRESHOLD_BYTES) {
    return {
      dataUrl: rawDataUrl,
      name: cleanName,
      size: file.size,
    };
  }

  // Optimize large photos (e.g. mobile phone camera photos 5MB-20MB)
  try {
    const optimized = await new Promise<OptimizedImageResult>((resolve) => {
      const img = new Image();
      const imgTimeout = setTimeout(() => {
        // Fallback to raw if image loading hangs
        resolve({
          dataUrl: rawDataUrl,
          name: cleanName,
          size: file.size,
        });
      }, 8000);

      img.onload = () => {
        clearTimeout(imgTimeout);
        try {
          let { width, height } = img;
          if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            if (width > height) {
              height = Math.round((height * MAX_DIMENSION) / width);
              width = MAX_DIMENSION;
            } else {
              width = Math.round((width * MAX_DIMENSION) / height);
              height = MAX_DIMENSION;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve({
              dataUrl: rawDataUrl,
              name: cleanName,
              size: file.size,
            });
          }

          // Draw image
          ctx.drawImage(img, 0, 0, width, height);

          // Output format: keep PNG if transparent, otherwise JPEG
          const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const optimizedDataUrl = canvas.toDataURL(outputType, COMPRESSION_QUALITY);

          // Approximate size from base64 length
          const base64Len = optimizedDataUrl.length - (optimizedDataUrl.indexOf(',') + 1);
          const approxSize = Math.round((base64Len * 3) / 4);

          resolve({
            dataUrl: optimizedDataUrl,
            name: cleanName,
            size: approxSize,
            width,
            height,
          });
        } catch {
          resolve({
            dataUrl: rawDataUrl,
            name: cleanName,
            size: file.size,
          });
        }
      };

      img.onerror = () => {
        clearTimeout(imgTimeout);
        resolve({
          dataUrl: rawDataUrl,
          name: cleanName,
          size: file.size,
        });
      };

      img.src = rawDataUrl;
    });

    return optimized;
  } catch {
    return {
      dataUrl: rawDataUrl,
      name: cleanName,
      size: file.size,
    };
  }
}
