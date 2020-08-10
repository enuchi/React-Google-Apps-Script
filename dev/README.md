# Development App Wrapper

This directory contains the app needed to run the "development" mode.

It utilizes special Webpack configurations as well as two packages, [gas-client](https://github.com/enuchi/gas-client) and a customized [Webpack Dev Server for Google Apps Script](https://github.com/enuchi/Google-Apps-Script-Webpack-Dev-Server), in order to achieve hot reloading inside of a dialog window.

## How it works

Running `npm run start` will build and deploy the development app, and then serve files locally.

The simple React app in this directory, found at [index.js](./index.js), is meant for development builds. It loads an iframe with the source pointing to `https://localhost:${PORT}/gas/${FILENAME}-impl.html`. During the build step, we will replace `FILENAME` with the appropriate name of the HTML file to load.

As an example, during the development build, the file `dialog-demo-bootstrap.html` will be generated from the app in this directory, using `dialog-demo-bootstrap` as the `FILENAME` for the iframe source of this page. Opening the menu items in the Google Spreadsheet will load this app, and webpack's devServer settings will serve `https://localhost:3000/gas/dialog-demo-bootstrap-impl.html` within the iframe, using the customized Webpack Dev Server build.

The customized Google Apps Script Webpack Dev Server acts very similarly to Webpack Dev Server's iframe mode, but is able to pass requests to Google Apps Script server functions back and forth between all the iframes being used in development.
