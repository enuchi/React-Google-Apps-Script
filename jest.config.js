module.exports = {
  testTimeout: 10000,
  maxConcurrency: 3,
  maxWorkers: '50%',
  globalSetup: './test/global-setup.js',
  globalTeardown: './test/global-teardown.js',
  testEnvironment: './test/puppeteer-environment.js',
  reporters: ['default', '<rootDir>/test/utils/image-reporter.js'],
};
