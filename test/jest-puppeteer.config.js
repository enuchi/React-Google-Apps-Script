export default {
  launch: {
    headless: false,
    product: 'chrome',
    args: [
      '--force-color-profile=generic-rgb',
      '--font-render-hinting=none',
      '--disable-font-subpixel-positioning',
      '--enable-font-antialiasing',
      '--disable-gpu',
    ],
    timeout: 60000,
  },
  browserContext: 'default',
};
