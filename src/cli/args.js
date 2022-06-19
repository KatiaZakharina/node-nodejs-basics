import process from 'process';

export const parseArgs = () => {
  const args = process.argv.slice(2);

  const argsObject = args.reduce((acc, curr, index, arr) => {
    if (!(index % 2)) acc[curr.slice(2)] = arr[index + 1];
    return acc;
  }, {});

  const formattedEnv = Object.entries(argsObject)
    .map(([key, value]) => `${key} is ${value}`)
    .join(', ');

  console.log(formattedEnv);
};

parseArgs();
