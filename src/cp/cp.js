import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const spawnChildProcess = async (args) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const destination = join(__dirname, 'files', 'script.js');

  const childProcess = spawn('node', [destination, ...args]);

  childProcess.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  process.stdin.on('data', (data) => {
    childProcess.stdin.write(data.toString().trim());
  });

  childProcess.on('close', (data) => {
    process.exit(data);
  });
};

// node ./src/cp/cp.js arg1 arg2 arg3 arg4
const argsArray = process.argv.slice(2);
spawnChildProcess(argsArray);
