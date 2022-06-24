import { createReadStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const destination = join(__dirname, 'files', 'fileToRead.txt');

  try {
    const rs = createReadStream(destination);
    rs.pipe(process.stdout);
  } catch (error) {
    throw error;
  }
};

read();
