import { cp } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const notExist = (error) => error.code === 'ENOENT';
const copyAlreadyExist = (error) => error.code === 'ERR_FS_CP_EEXIST';

export const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const source = path.join(__dirname, 'files');
  const destination = path.join(__dirname, 'files_copy');

  try {
    await cp(source, destination, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });
  } catch (error) {
    if (notExist(error) || copyAlreadyExist(error)) {
      throw Error('FS operation failed');
    }
    throw error;
  }
};

copy();
