import { Transform } from 'stream';

export const transform = async () => {
  try {
    const transformStream = new Transform({
      writableObjectMode: true,

      transform(chunk, encoding, callback) {
        callback(null, chunk.toString().split('').reverse().join(''));
      },
    });

    process.stdin.pipe(transformStream).pipe(process.stdout);
  } catch (error) {
    throw error;
  }
};

transform();
