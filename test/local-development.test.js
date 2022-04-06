const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const { openAddon } = require('./utils/open-addon');

require('dotenv').config();

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

const webpackDevServerReady = async process => {
  return new Promise(resolve => {
    process.stdout.on('data', data => {
      if (data.includes('Compiled successfully.')) resolve();
    });
  });
};

describe(`Local setup ${isExtended ? '*extended*' : ''}`, () => {
  let page;
  let process;
  const containerSelector = isExtended ? '.script-app-dialog' : 'body';

  beforeAll(async () => {
    process = exec('npm run serve');
    page = await global.__BROWSER_GLOBAL__.newPage();

    await page.setViewport({
      width: 800,
      height: 800,
      deviceScaleFactor: 1,
    });

    await webpackDevServerReady(process);

    if (isExtended) {
      await openAddon(page);
    } else {
      await page.goto('https://localhost:3000/dialog-demo-bootstrap.html');
      await page.waitForTimeout(3000);
    }
  });

  afterAll(() => {
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
