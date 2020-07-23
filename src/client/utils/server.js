import Server from 'gas-client';

const { PORT } = process.env;

const server = new Server({
  // this will be ignored in production
  allowedDevelopmentDomains: `https://localhost:${PORT}`,
});

export default server;
