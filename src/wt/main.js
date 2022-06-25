import { dirname, join } from 'path';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

export const performCalculations = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const workerPath = join(__dirname, 'worker.js');

  try {
    const countCpus = cpus().length;
    const threads = [];

    for (let i = 0; i < countCpus; i++) {
      threads.push(
        new Promise((res) => {
          const thread = new Worker(workerPath, {
            workerData: 10 + i,
          });

          thread.once('message', (value) =>
            res({
              status: 'resolved',
              data: value,
            })
          );
          thread.once('error', () =>
            res({
              status: 'error',
              data: null,
            })
          );
        })
      );
    }

    return await Promise.allSettled(threads);
  } catch (error) {
    throw error;
  }
};

console.log(await performCalculations());
