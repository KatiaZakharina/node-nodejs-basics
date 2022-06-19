import { unlink } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const notExist = (error) => error.code === 'ENOENT';

export const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const destination = path.join(__dirname, 'files', 'fileToRemove.txt');
  try {
    await unlink(destination);
  } catch (error) {
    if (notExist(error)) {
      throw Error('FS operation failed');
    } else {
      throw error;
    }
  }
};
remove();
