const config = () => ({
  PORT: parseInt(process.env.PORT, 10),
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: 'development',
  keys: {
    ACCESS_KEY: 'asecret',
    REFRESH_KEY: 'asecret',
  },
});

export default config;
