import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  try {
    const destination = join(__dirname, 'files', 'fileToWrite.txt');
    const ws = createWriteStream(destination, { encoding: 'utf8' });
    process.stdin.pipe(ws);
  } catch (err) {
    throw Error(err.message);
  }
};

write();
