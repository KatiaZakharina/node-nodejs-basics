import { writeFile, open } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const alreadyExist = (error) => error.code === 'EEXIST';

export const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const destination = path.join(__dirname, 'files', 'fresh.txt');

  try {
    await open(destination, 'wx');
    // The exclusive flag 'x' causes the operation to return an error (EEXIST) if the path already exists.
    await writeFile(destination, 'I am fresh and young');
  } catch (error) {
    if (alreadyExist(error)) {
      throw Error('FS operation failed');
    } else {
      throw Error(error.message);
    }
  }
};

create();
