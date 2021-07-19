const fs = require('fs');
const path = require('path');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const dotenv = require('dotenv').config();

expect.extend({ toMatchImageSnapshot });
jest.setTimeout(30000);

const srcTestFile = path.join(
  __dirname,
  '../src/client/dialog-demo-bootstrap/components/SheetEditor.jsx'
);

describe('Local Mode', () => {
  beforeAll(async () => {
    await page.setViewport({
      width: 1600,
      height: 1600,
      deviceScaleFactor: 2,
    });
    await page.goto(process.env.SHEET_URL);
    await page.waitForTimeout(1000);

    await page.click('a:nth-child(2)');
    await page.waitForSelector('input[name="identifier"]');
    await page.type('input[name="identifier"]', process.env.USERNAME);
    await page.click('#identifierNext');
    await page.waitForTimeout(1000);
    await page.type('input[name="password"]', process.env.PASSWORD);
    await page.waitForTimeout(1000);
    await page.click('#passwordNext');
    await page.waitForTimeout(10000);

    await page.evaluate(() => {
      const addOnMenuButton = document.querySelector(
        'div.menu-button.goog-control.goog-inline-block:nth-child(11)'
      );
      addOnMenuButton.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );
      addOnMenuButton.dispatchEvent(
        new MouseEvent('mouseup', { bubbles: true })
      );
    });

    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      const bootstrapMenuButton = document.querySelector(
        'div.goog-menu.goog-menu-vertical.apps-menu-hide-mnemonics:last-child > div:nth-child(2) > div'
      );
      bootstrapMenuButton.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );
      bootstrapMenuButton.dispatchEvent(
        new MouseEvent('mouseup', { bubbles: true })
      );
      bootstrapMenuButton.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true })
      );
      bootstrapMenuButton.dispatchEvent(
        new MouseEvent('mouseup', { bubbles: true })
      );
    });
    await page.waitForTimeout(5000);
  });

  it('should load Bootstrap example', async () => {
    const scriptModal = await page.$('.script-app-dialog');
    const image = await scriptModal.screenshot();
    await expect(image).toMatchImageSnapshot();
  });

  it('should modify Bootstrap title example', async () => {
    const data = await fs.promises.readFile(srcTestFile, 'utf8');
    const result = data.replace(
      '<b>☀️ Bootstrap demo! ☀️</b>',
      '<b>☀️ This is modified text in local development ☀️</b>'
    );
    await fs.promises.writeFile(srcTestFile, result, 'utf8');
    await page.waitForTimeout(4000);
    const scriptModal = await page.$('.script-app-dialog');
    const image = await scriptModal.screenshot();
    await expect(image).toMatchImageSnapshot();
  });

  it('should modify Bootstrap title example back to original', async () => {
    const data = await fs.promises.readFile(srcTestFile, 'utf8');
    const result = data.replace(
      '<b>☀️ This is modified text in local development ☀️</b>',
      '<b>☀️ Bootstrap demo! ☀️</b>'
    );
    await fs.promises.writeFile(srcTestFile, result, 'utf8');
    await page.waitForTimeout(4000);
    const scriptModal = await page.$('.script-app-dialog');
    const image = await scriptModal.screenshot();
    await expect(image).toMatchImageSnapshot();
  });
});
