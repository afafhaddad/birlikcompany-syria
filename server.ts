import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Parse port and host from CLI args if provided (e.g. --port 3000 --host 0.0.0.0)
let port = parseInt(process.env.PORT || '3000', 10);
let host = '0.0.0.0';

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port' && args[i + 1]) {
    port = parseInt(args[i + 1], 10);
  }
  if (args[i] === '--host' && args[i + 1]) {
    host = args[i + 1];
  }
}

// Allow large payloads for image uploads (up to 50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ensure upload directory exists
const uploadsDir = path.resolve(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve public uploads statically
app.use('/uploads', express.static(uploadsDir));

// Direct download route for the full project ZIP
app.get('/download-project.zip', (req, res) => {
  const completeZip = path.resolve(__dirname, 'public', 'birlik-complete-project.zip');
  const fallbackZip = path.resolve(__dirname, 'public', 'birlik-project.zip');
  const target = fs.existsSync(completeZip) ? completeZip : fallbackZip;
  if (fs.existsSync(target)) {
    return res.download(target, 'birlik-complete-project.zip');
  }
  return res.status(404).send('ZIP file is still generating or not found.');
});

// Pre-compiled ready-to-upload ZIP for GoDaddy cPanel (no npm required)
app.get('/godaddy-upload.zip', (req, res) => {
  const zipPath = path.resolve(__dirname, 'public', 'godaddy-upload.zip');
  if (fs.existsSync(zipPath)) {
    return res.download(zipPath, 'birlik-godaddy-ready.zip');
  }
  return res.status(404).send('ZIP file not found.');
});

const registryPath = path.resolve(__dirname, 'src', 'data', 'mediaRegistry.json');

// Get current media registry
app.get('/api/media/registry', (req, res) => {
  try {
    let filesOnDisk: string[] = [];
    if (fs.existsSync(uploadsDir)) {
      try {
        filesOnDisk = fs.readdirSync(uploadsDir);
      } catch (e) {
        console.warn('Could not read uploadsDir:', e);
      }
    }

    if (fs.existsSync(registryPath)) {
      const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
      return res.json({
        ...data,
        serverFilesOnDisk: filesOnDisk,
      });
    }
    return res.json({ hero: '', founder: '', categories: {}, products: {}, uploadedImages: [], serverFilesOnDisk: filesOnDisk });
  } catch (error) {
    console.error('Error reading media registry:', error);
    return res.status(500).json({ error: 'Failed to read registry' });
  }
});

// Helper to extract base64 data to file on disk
function saveBase64ToFile(dataUrl: string, prefix: string): string {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    return dataUrl;
  }
  const commaIdx = dataUrl.indexOf(',');
  if (commaIdx === -1) return dataUrl;

  try {
    const meta = dataUrl.slice(0, commaIdx);
    const base64Data = dataUrl.slice(commaIdx + 1);
    const buffer = Buffer.from(base64Data, 'base64');

    let ext = '.jpg';
    if (meta.includes('png')) ext = '.png';
    else if (meta.includes('webp')) ext = '.webp';
    else if (meta.includes('svg')) ext = '.svg';

    const safePrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
    const filename = `${Date.now()}_${safePrefix}${ext}`;
    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);
    return `/uploads/${filename}`;
  } catch (e) {
    console.error('Error saving base64 to file:', e);
    return dataUrl;
  }
}

// Update media registry
app.post('/api/media/registry', (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid registry payload' });
    }

    // Sanitize any embedded base64 to server files on disk
    if (data.hero && data.hero.startsWith('data:')) {
      data.hero = saveBase64ToFile(data.hero, 'hero');
    }
    if (data.founder && data.founder.startsWith('data:')) {
      data.founder = saveBase64ToFile(data.founder, 'founder');
    }
    if (data.categories && typeof data.categories === 'object') {
      for (const [k, v] of Object.entries(data.categories)) {
        if (typeof v === 'string' && v.startsWith('data:')) {
          data.categories[k] = saveBase64ToFile(v, `cat_${k}`);
        }
      }
    }
    if (data.products && typeof data.products === 'object') {
      for (const [prodId, p] of Object.entries(data.products as Record<string, any>)) {
        if (p && typeof p === 'object') {
          if (p.main && typeof p.main === 'string' && p.main.startsWith('data:')) {
            p.main = saveBase64ToFile(p.main, `prod_${prodId}_main`);
          }
          if (Array.isArray(p.gallery)) {
            p.gallery = p.gallery.map((g: any, i: number) => {
              if (typeof g === 'string' && g.startsWith('data:')) {
                return saveBase64ToFile(g, `prod_${prodId}_gal_${i}`);
              }
              return g;
            });
          }
        }
      }
    }
    if (Array.isArray(data.uploadedImages)) {
      data.uploadedImages = data.uploadedImages.map((img: any, i: number) => {
        if (img && typeof img.url === 'string' && img.url.startsWith('data:')) {
          const name = img.name || `image_${i}`;
          img.url = saveBase64ToFile(img.url, name);
        }
        return img;
      });
    }

    fs.writeFileSync(registryPath, JSON.stringify(data, null, 2), 'utf8');
    return res.json({ success: true, registry: data });
  } catch (error) {
    console.error('Error saving media registry:', error);
    return res.status(500).json({ error: 'Failed to write registry' });
  }
});

// Sync/Restore images from client browser cache back to server disk
app.post('/api/media/sync', (req, res) => {
  try {
    const { items, registry: clientRegistry } = req.body;
    let syncedCount = 0;

    if (Array.isArray(items)) {
      for (const item of items) {
        if (!item || !item.url || !item.dataUrl) continue;

        if (typeof item.url === 'string' && item.url.startsWith('/uploads/')) {
          const filename = path.basename(item.url);
          const targetPath = path.join(uploadsDir, filename);

          if (!fs.existsSync(targetPath)) {
            const commaIdx = item.dataUrl.indexOf(',');
            if (commaIdx !== -1) {
              const base64Data = item.dataUrl.slice(commaIdx + 1);
              const buffer = Buffer.from(base64Data, 'base64');
              fs.writeFileSync(targetPath, buffer);
              syncedCount++;
            }
          }
        }
      }
    }

    if (clientRegistry && typeof clientRegistry === 'object') {
      try {
        let serverTimestamp = 0;
        if (fs.existsSync(registryPath)) {
          const raw = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
          serverTimestamp = raw.cleanSlateTimestamp || 0;
        }
        if (!serverTimestamp || (clientRegistry.cleanSlateTimestamp && clientRegistry.cleanSlateTimestamp >= serverTimestamp)) {
          fs.writeFileSync(registryPath, JSON.stringify(clientRegistry, null, 2), 'utf8');
        }
      } catch (e) {
        console.warn('Could not update registry during sync:', e);
      }
    }

    return res.json({ success: true, syncedCount });
  } catch (error) {
    console.error('Error in media sync:', error);
    return res.status(500).json({ error: 'Failed to sync media' });
  }
});

// Clear entire media library (Clean slate)
app.post('/api/media/clear-library', (req, res) => {
  try {
    const cleanSlateTimestamp = Date.now();

    // Clean uploads directory
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      for (const file of files) {
        try {
          fs.unlinkSync(path.join(uploadsDir, file));
        } catch (e) {
          console.warn('Could not remove file during library clear:', file, e);
        }
      }
    }

    const cleanRegistry = {
      hero: '',
      founder: '',
      categories: {},
      products: {},
      uploadedImages: [],
      cleanSlateTimestamp,
    };

    fs.writeFileSync(registryPath, JSON.stringify(cleanRegistry, null, 2), 'utf8');
    return res.json({ success: true, registry: cleanRegistry, cleanSlateTimestamp });
  } catch (error) {
    console.error('Error clearing media library:', error);
    return res.status(500).json({ error: 'Failed to clear media library' });
  }
});

// Upload image endpoint
app.post('/api/media/upload', (req, res) => {
  try {
    const { filename, dataUrl } = req.body;
    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'No dataUrl provided' });
    }

    // Extract base64 data safely without regex
    const commaIndex = dataUrl.indexOf(',');
    if (commaIndex === -1) {
      return res.status(400).json({ error: 'Invalid dataUrl format' });
    }

    const metaPart = dataUrl.slice(0, commaIndex);
    const base64Data = dataUrl.slice(commaIndex + 1);
    const mimeMatch = metaPart.match(/data:([^;]+)/);
    const mimeType = mimeMatch ? mimeMatch[1].toLowerCase() : 'image/jpeg';
    const buffer = Buffer.from(base64Data, 'base64');

    // Extension from mime type or filename
    let ext = '.jpg';
    if (mimeType.includes('png')) ext = '.png';
    else if (mimeType.includes('webp')) ext = '.webp';
    else if (mimeType.includes('svg')) ext = '.svg';
    else if (mimeType.includes('jpeg') || mimeType.includes('jpg')) ext = '.jpg';

    // Generate unique safe filename
    const safeBase = (filename || 'image')
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const uniqueName = `${Date.now()}_${safeBase}${ext}`;
    const filePath = path.join(uploadsDir, uniqueName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    return res.json({ success: true, url: publicUrl, name: uniqueName, size: buffer.length });
  } catch (error) {
    console.error('Error saving uploaded file:', error);
    return res.status(500).json({ error: 'Failed to save file' });
  }
});

// Delete media endpoint
app.post('/api/media/delete', (req, res) => {
  try {
    const { url, id } = req.body;
    
    // Delete file from disk if in /uploads/
    if (url && typeof url === 'string' && url.startsWith('/uploads/')) {
      const filename = path.basename(url);
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not unlink file:', filePath, e);
        }
      }
    }

    // Also update server registry if file exists
    if (fs.existsSync(registryPath)) {
      try {
        const raw = fs.readFileSync(registryPath, 'utf8');
        const data = JSON.parse(raw);

        if (Array.isArray(data.uploadedImages)) {
          data.uploadedImages = data.uploadedImages.filter(
            (i: any) => i.id !== id && i.url !== url
          );
        }
        if (data.hero === url) data.hero = '';
        if (data.founder === url) data.founder = '';
        if (data.categories) {
          for (const key of Object.keys(data.categories)) {
            if (data.categories[key] === url) delete data.categories[key];
          }
        }
        if (data.products) {
          for (const pKey of Object.keys(data.products)) {
            const p = data.products[pKey];
            if (p) {
              if (p.main === url) {
                p.main = p.gallery?.[0] || '';
                p.gallery = p.gallery?.slice(1) || [];
              } else if (Array.isArray(p.gallery)) {
                p.gallery = p.gallery.filter((u: string) => u !== url);
              }
            }
          }
        }

        fs.writeFileSync(registryPath, JSON.stringify(data, null, 2), 'utf8');
      } catch (regErr) {
        console.warn('Could not update registry file on delete:', regErr);
      }
    }

    return res.json({ success: true });
  } catch (error) {
    console.error('Error in media delete:', error);
    return res.status(500).json({ error: 'Failed to delete media' });
  }
});

async function startServer() {
  if (!isProduction) {
    // Vite middleware in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Static serve in production
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, host, () => {
    console.log(`> Server running on http://${host}:${port} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
