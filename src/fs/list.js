import { readdir } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const notExist = (error) => error.code === 'ENOENT';

export const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const destination = path.join(__dirname, 'files');

  try {
    const files = await readdir(destination);
    console.log(files);
  } catch (error) {
    if (notExist(error)) {
      throw Error('FS operation failed');
    } else {
      throw error;
    }
  }
};

list();
