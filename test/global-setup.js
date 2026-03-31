// Custom Puppeteer setup for Vitest
// Launches a shared browser instance and exposes the wsEndpoint via filesystem

import fs from 'fs';
import os from 'os';
import path from 'path';
import puppeteer from 'puppeteer-extra';

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import jestPuppeteerConfig from './jest-puppeteer.config.js';

const fsPromises = fs.promises;
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

let browser;

export async function setup() {
  puppeteer.use(StealthPlugin());
  browser = await puppeteer.launch(jestPuppeteerConfig.launch);

  // use the file system to expose the wsEndpoint for test files
  await fsPromises.mkdir(DIR, { recursive: true });
  await fsPromises.writeFile(
    path.join(DIR, 'wsEndpoint'),
    browser.wsEndpoint()
  );
}

export async function teardown() {
  await browser.close();

  // clean-up the wsEndpoint file
  await fsPromises.rm(DIR, { recursive: true, force: true });
}
