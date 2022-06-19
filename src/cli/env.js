import process from 'process';

export const parseEnv = () => {
  const PREFIX = 'RSS_';

  const withPrefix = Object.entries(process.env).filter(([key]) =>
    key.includes(PREFIX)
  );

  const formattedEnv = withPrefix
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  console.log(formattedEnv);
};
parseEnv();
