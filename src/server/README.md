# Server (our Google Apps Script code)

This directory is where we store the source code for our Google Apps Script code, which runs on Google's servers.

## Requirements

The server code will need:
- an entrypoint, usually a file named `index.js`, that loads the app.
- the entry point will need to declare any public functions by attaching them to the "`global`" object, like this:
  ```javascript
  global.onOpen = someFunction;
  ```

See the [ui.js](./ui.js) file for how to open menu items and set up the development settings properly.

## Build

Server-side code here will be compiled using settings that are compatible with the V8 or Rhino runtime (https://developers.google.com/apps-script/guides/v8-runtime). Update the [appsscript.json](../../appsscript.json) file as needed to switch runtimes.

