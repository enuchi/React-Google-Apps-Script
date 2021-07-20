const fs = require('fs');
const path = require('path');
const Webpack = require('webpack');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const WebpackDevServer = require('webpack-dev-server/lib/Server');
const webpackConfig = require('../webpack.config');
const { openAddon } = require('./utils/openAddon');

require('dotenv').config();

expect.extend({ toMatchImageSnapshot });
jest.setTimeout(120000);

process.env.NODE_ENV = 'development';

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig[0].devServer };

const srcTestFile = path.join(
  __dirname,
  '../src/client/dialog-demo-bootstrap/components/SheetEditor.jsx'
);

describe('Local Mode', () => {
  let server;

  afterAll(async () => {
    await page.waitForTimeout(3000);
    server.close(() => {});
    await page.waitForTimeout(3000);
  });

  beforeAll(async () => {
    server = new WebpackDevServer(compiler, devServerOptions);
    server.listen(3000, '127.0.0.1', () => {
      console.log('sttarted');
    });
    process.env.NODE_ENV = 'test';
    await page.waitForTimeout(15000);

    await openAddon();
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
