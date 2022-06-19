import fs, { access } from 'fs/promises';
import { constants } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const notExist = (error) => error.code === 'ENOENT';
const alreadyExist = (error) => error.code === 'ERR_FS_CP_EEXIST';

const isFileExist = (path) => {
  return new Promise((resolve, reject) => {
    access(path, constants.F_OK)
      .then(() => reject(new Error('FS operation failed')))
      .catch(() => resolve(path));
  });
};

export const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
  const newPath = path.join(__dirname, 'files', 'properFilename.md');

  try {
    await isFileExist(newPath);
    await fs.rename(oldPath, newPath);
  } catch (error) {
    console.log(error.code);
    if (notExist(error) || alreadyExist(error)) {
      throw Error('FS operation failed');
    }
    console.log(error.code);
    throw error;
  }
};
rename();
