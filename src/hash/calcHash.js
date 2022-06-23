import crypto from 'crypto';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

export const calculateHash = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const destination = path.join(
    __dirname,
    'files',
    'fileToCalculateHashFor.txt'
  );

  let file = null;
  try {
    file = await fs.readFile(destination);
  } catch (error) {
    throw error;
  }

  const hash = crypto.createHash('sha256').update(file).digest('hex');
  console.log(hash);
};

calculateHash();
