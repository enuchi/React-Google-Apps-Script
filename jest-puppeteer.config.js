// see for puppeteer-extra setup: github.com/smooth-code/jest-puppeteer/issues/260

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

require.cache[require.resolve('puppeteer')] =
  require.cache[require.resolve('puppeteer-extra')];

module.exports = {
  launch: {
    dumpio: true,
    headless: false,
    product: 'chrome',
  },
  browserContext: 'default',
};
