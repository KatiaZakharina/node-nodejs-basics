import { readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const notExist = (error) => error.code === 'ENOENT';

export const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const destination = path.resolve(__dirname, 'files', 'fileToRead.txt');

  try {
    const file = await readFile(destination, 'utf8');
    console.log(file);
  } catch (error) {
    if (notExist(error)) {
      throw Error('FS operation failed');
    } else {
      throw error;
    }
  }
};
read();
