// Use custom jest puppeteer preset as described here:
// jestjs.io/docs/puppeteer#custom-example-without-jest-puppeteer-preset
// This allows using stealth mode.

import fs from 'fs';
const fsPromises = fs.promises;
import os from 'os';
import path from 'path';

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
export default async function globalTeardown() {
  // close the browser instance
  await global.__BROWSER_GLOBAL__.close();

  // clean-up the wsEndpoint file
  await fsPromises.rmdir(DIR, { recursive: true, force: true });
};
