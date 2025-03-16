import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import dotenv from 'dotenv';
import { openAddon } from './utils/open-addon';

dotenv.config();

const isExtended = `${process.env.IS_EXTENDED}` === 'true';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.04,
  failureThresholdType: 'percent',
  customDiffConfig: {
    threshold: 0.1,
  },
  blur: 2,
  allowSizeMismatch: true,
});
expect.extend({ toMatchImageSnapshot });
jest.setTimeout(180000);

const srcTestFile = path.join(
  __dirname,
  '../src/client/dialog-demo-bootstrap/components/SheetEditor.jsx'
);

const viteDevServerReady = async (process) => {
  console.log('Waiting for vite to serve...');
  return new Promise((resolve) => {
    process.stdout.on('data', (data) => {
      if (data.includes('ready in')) {
        resolve();
      }
    });
  });
};

describe(`Local setup ${isExtended ? '*extended*' : ''}`, () => {
  let page;
  let process;
  const containerSelector = isExtended ? 'div[role="dialog"]' : 'body';

  beforeAll(async () => {
    process = exec('yarn dev');
    page = await global.__BROWSER_GLOBAL__.newPage();

    await page.setViewport({
      width: 800,
      height: 800,
      deviceScaleFactor: 1,
    });

    await viteDevServerReady(process);

    if (isExtended) {
      await openAddon(page);
    } else {
      await page.goto(
        'https://localhost:3000/dialog-demo-bootstrap/index.html'
      );
      await page.waitForTimeout(3000);
    }
  });

  afterAll(() => {
    console.log('Closing process.');
    process.kill();
  });

  it('should load Bootstrap example', async () => {
    const container = await page.$(containerSelector);
    const image = await container.screenshot();
    await expect(image).toMatchImageSnapshot();
  });

  it('should modify Bootstrap title example', async () => {
    const data = await fs.promises.readFile(srcTestFile, 'utf8');
    const result = data
      .replace(
        '<b>☀️ Bootstrap demo! ☀️</b>',
        '<b>☀️ This is modified text in local development ☀️</b>'
      )
      .replace(
        "{ padding: '3px', overflowX: 'hidden' }",
        "{ padding: '3px', overflowX: 'hidden', backgroundColor: 'black', color: 'white' }"
      );
    await fs.promises.writeFile(srcTestFile, result, 'utf8');
    await page.waitForTimeout(4000);
    const container = await page.$(containerSelector);
    const image = await container.screenshot();
    await expect(image).toMatchImageSnapshot();
  });

  it('should modify Bootstrap title example back to original', async () => {
    const data = await fs.promises.readFile(srcTestFile, 'utf8');
    const result = data
      .replace(
        '<b>☀️ This is modified text in local development ☀️</b>',
        '<b>☀️ Bootstrap demo! ☀️</b>'
      )
      .replace(
        "{ padding: '3px', overflowX: 'hidden', backgroundColor: 'black', color: 'white' }",
        "{ padding: '3px', overflowX: 'hidden' }"
      );
    await fs.promises.writeFile(srcTestFile, result, 'utf8');
    await page.waitForTimeout(4000);
    const container = await page.$(containerSelector);
    const image = await container.screenshot();
    await expect(image).toMatchImageSnapshot();
  });
});
