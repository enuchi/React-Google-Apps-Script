import Server from 'gas-client';

const server = new Server({
  // this is necessary for local development but will be ignored in production
  allowedDevelopmentDomains: origin =>
    /https:\/\/.*\.googleusercontent\.com$/.test(origin),
  parentTargetOrigin: '*',
});

export default server;
