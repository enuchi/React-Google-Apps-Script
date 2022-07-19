const flowbitePlugin = require('flowbite/plugin');

module.exports = {
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  content: [
    './src/client/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [flowbitePlugin],
};
