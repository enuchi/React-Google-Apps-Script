// Use custom jest puppeteer preset as described here:
// jestjs.io/docs/puppeteer#custom-example-without-jest-puppeteer-preset
// This allows using stealth mode.

import fs from 'fs';
import os from 'os';
import path from 'path';
import puppeteer from 'puppeteer-extra';

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import jestPuppeteerConfig from './jest-puppeteer.config.js';

const fsPromises = fs.promises;
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

export default async function globalSetup() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch(jestPuppeteerConfig.launch);
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browser;

  // use the file system to expose the wsEndpoint for TestEnvironments
  await fsPromises.mkdir(DIR, { recursive: true });
  await fsPromises.writeFile(
    path.join(DIR, 'wsEndpoint'),
    browser.wsEndpoint()
  );
}
