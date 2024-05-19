export default {
  launch: {
    headless: true,
    product: 'chrome',
    args: [
      '--force-color-profile=generic-rgb',
      '--font-render-hinting=none',
      '--disable-font-subpixel-positioning',
      '--enable-font-antialiasing',
      '--disable-gpu',
    ],
  },
  browserContext: 'default',
};
