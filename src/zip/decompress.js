import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

export const decompress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToCompress.txt');
  const archivePath = join(__dirname, 'files', 'archive.gz');

  try {
    const r = fs.createReadStream(archivePath);
    const z = zlib.createGunzip();
    const w = fs.createWriteStream(filePath);
    r.pipe(z).pipe(w);
  } catch (error) {
    throw error;
  }
};

decompress();
