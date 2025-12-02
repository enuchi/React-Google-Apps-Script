// Use custom jest puppeteer preset as described here:
// jestjs.io/docs/puppeteer#custom-example-without-jest-puppeteer-preset
// This allows using stealth mode.

import { readFile } from 'fs/promises';
import os from 'os';
import path from 'path';
import puppeteer from 'puppeteer';
import NodeEnvironment from 'jest-environment-node';

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

// Debug the NodeEnvironment structure
console.log('NodeEnvironment import type:', typeof NodeEnvironment);
console.log('Has default property:', 'default' in NodeEnvironment);
if ('default' in NodeEnvironment) {
  console.log('Default property type:', typeof NodeEnvironment.default);
}

// More robust determination of the correct Environment class
let NodeEnvironmentClass;
try {
  if (typeof NodeEnvironment === 'function') {
    console.log('Using NodeEnvironment directly as constructor');
    NodeEnvironmentClass = NodeEnvironment;
  } else if (
    NodeEnvironment.default &&
    typeof NodeEnvironment.default === 'function'
  ) {
    console.log('Using NodeEnvironment.default as constructor');
    NodeEnvironmentClass = NodeEnvironment.default;
  } else if (NodeEnvironment.__esModule && NodeEnvironment.NodeEnvironment) {
    // Some ESM patterns expose the class differently
    console.log('Using NodeEnvironment.NodeEnvironment as constructor');
    NodeEnvironmentClass = NodeEnvironment.NodeEnvironment;
  } else {
    console.log('Falling back to direct import');
    NodeEnvironmentClass = NodeEnvironment;
  }

  // Verify we have a valid constructor
  if (typeof NodeEnvironmentClass !== 'function') {
    console.error(
      'Final NodeEnvironmentClass is not a constructor!',
      typeof NodeEnvironmentClass
    );
    // Last resort fallback - use dynamic import to avoid linter warning
    // eslint-disable-next-line no-new-func
    const fallbackEnv = Function('return require("jest-environment-node")')();
    NodeEnvironmentClass = fallbackEnv.default || fallbackEnv;
  }
} catch (error) {
  console.error('Error determining NodeEnvironment class:', error);
  throw new Error(`Failed to load Jest NodeEnvironment: ${error.message}`);
}

export default class PuppeteerEnvironment extends NodeEnvironmentClass {
  async setup() {
    await super.setup();
    // get the wsEndpoint
    const wsEndpoint = await readFile(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // connect to puppeteer
    this.global.__BROWSER_GLOBAL__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}
