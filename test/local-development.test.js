const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const { openAddon } = require('./utils/open-addon');

require('dotenv').config();

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.04,
  failureThresholdType: 'percent',
  customDiffConfig: {
    threshold: 0.1,
  },
  blur: 1,
});
expect.extend({ toMatchImageSnapshot });
jest.setTimeout(120000);

const srcTestFile = path.join(
  __dirname,
  '../src/client/dialog-demo-bootstrap/components/SheetEditor.jsx'
);

describe('Local Mode', () => {
  let page;
  let process;

  beforeAll(async () => {
    process = exec('npm run serve');
    page = await global.__BROWSER_GLOBAL__.newPage();
    await openAddon(page);
  });

  afterAll(() => {
    process.kill();
  });

  it('should load Bootstrap example', async () => {
    const scriptModal = await page.$('.script-app-dialog');
    const image = await scriptModal.screenshot();
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
        "{ padding: '3px', overflowX: 'hidden', backgroundColor: 'pink' }"
      );
    await fs.promises.writeFile(srcTestFile, result, 'utf8');
    await page.waitForTimeout(4000);
    const scriptModal = await page.$('.script-app-dialog');
    const image = await scriptModal.screenshot();
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
        "{ padding: '3px', overflowX: 'hidden', backgroundColor: 'pink' }",
        "{ padding: '3px', overflowX: 'hidden' }"
      );
    await fs.promises.writeFile(srcTestFile, result, 'utf8');
    await page.waitForTimeout(4000);
    const scriptModal = await page.$('.script-app-dialog');
    const image = await scriptModal.screenshot();
    await expect(image).toMatchImageSnapshot();
  });
});
