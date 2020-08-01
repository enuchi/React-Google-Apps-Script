# Client (our React code)

This directory is where we store the source code for our client-side React apps.

We have multiple directories in here because our app creates menu items that open multiple dialog windows. Each dialog opens a separate app, so each directory here represents its own distinct React app. Our webpack configuration will generate a separate bundle for each React app.

## Requirements

Each React app will need:
- an entrypoint, usually a file named `index.js`, that loads the app
- an HTML file that acts as a template, in which the bundled React app is loaded

You'll need to declare the following in [webpack.config.js](../../webpack.config.js):
- **name**: just a name to print in the webpack console, e.g. 'CLIENT - Dialog Demo'
- **entry**: the path to the entry point for the app, e.g. './src/client/dialog-demo/index.js'
- **filename**: the name of the html file that is generated. The server code will reference this filename to load the app into a dialog window. E.g. 'dialog-demo'
- **template**: the path to the HTML template for the app, e.g. './src/client/dialog-demo/index.html'


### Adding or removing an entrypoint
Your app or use case may only require a single dialog or sidebar, or you may want to add more than are included in the sample app.

To edit the entrypoints, you will need to:

1. Create or remove the entrypoint directories in the client source code. For instance, you can remove `./src/client/sidebar-about-page` altogether, or copy it and modify the source code. See above [requirements](#requirements).

2. Modify the server-side code to load the correct menu items and expose the correct public functions:
    - [ui file](../server/ui.js)
    - [index file](../server/index.js)

3. Modify the `clientEntrypoints` config in the [webpack config file](../../webpack.config.js).
