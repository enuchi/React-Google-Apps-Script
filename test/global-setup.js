// Use custom jest puppeteer preset as described here:
// jestjs.io/docs/puppeteer#custom-example-without-jest-puppeteer-preset
// This allows using stealth mode.

const { mkdir, writeFile } = require('fs').promises;
const { exec } = require('child_process');
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const jestPuppeteerConfig = require('./jest-puppeteer.config');

module.exports = async function() {
  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch(jestPuppeteerConfig.launch);
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browser;
  global.__SERVE_PROCESS__ = exec('npm run serve');

  // use the file system to expose the wsEndpoint for TestEnvironments
  await mkdir(DIR, { recursive: true });
  await writeFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
