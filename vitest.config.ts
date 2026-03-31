import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globalSetup: ['./test/global-setup.js'],
    testTimeout: 180000,
    reporters: ['default'],
    include: ['test/**/*.test.js'],
  },
});
