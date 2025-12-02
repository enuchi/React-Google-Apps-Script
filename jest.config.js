export default {
  globalSetup: './test/global-setup.js',
  globalTeardown: './test/global-teardown.js',
  testEnvironment: './test/puppeteer-environment.js',
  reporters: ['default', '<rootDir>/test/utils/image-reporter.js'],
  testTimeout: 120000,
  setupFilesAfterEnv: ['./test/jest.setup.js'],
};
