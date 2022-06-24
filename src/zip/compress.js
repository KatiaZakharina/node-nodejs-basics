import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

export const compress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToCompress.txt');
  const archivePath = join(__dirname, 'files', 'archive.gz');

  try {
    const r = fs.createReadStream(filePath);
    const z = zlib.createGzip();
    const w = fs.createWriteStream(archivePath);
    r.pipe(z).pipe(w);
  } catch (error) {
    throw error;
  }
};

compress();
