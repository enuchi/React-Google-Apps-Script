module.exports = {
  launch: {
    headless: false,
    product: 'chrome',
    args: [
      '--force-color-profile=srgb|generic-rgb|color-spin-gamma24',
      '--font-render-hinting=none',
    ],
  },
  browserContext: 'default',
};
