const config = () => ({
  PORT: parseInt(process.env.PORT, 10),
  DATABASE_URL: '',
  NODE_ENV: 'development',
});

export default config;