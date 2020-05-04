<img width="75" height="39" src="https://i.imgur.com/yg6skMo.png">


# React & Google Apps Script
_Use this project as your boilerplate for React apps inside Google Sheets, Docs and Forms dialogs._

This project uses labnol's excellent [apps-script-starter](https://github.com/labnol/apps-script-starter) as a starting point for developing server-side projects, and adds support for building React apps inside Google Sheets, Forms, and Docs dialogs. Simply clone this project and modify the source code to get started developing React apps with Google Apps Script.

![Google Apps Script / React development](https://i.imgur.com/z99uP89.png 'Start a React project for Google Apps Script')
_The included demo React app for Google Sheets shows insertion, deletion and selection of sheets through the dialog window._

&nbsp;

## Installation

1.  Clone the sample project and install dependencies:
    ```bash
    > git clone https://github.com/enuchi/React-Google-Apps-Script.git
    > cd React-Google-Apps-Script
    > npm install
    ```
2.  Enable the Google Apps Script API for your account by visiting[(script.google.com/home/usersettings)](https://script.google.com/home/usersettings):

    ![Enable Google Apps Script](https://i.imgur.com/vuwkzMU.png 'enable the Google Apps Script API')

3.  Log in to `clasp`:
    ```bash
    > npm run login
    ```
    This will use `clasp` to manage your login credentials. `clasp` is [Google's tool](https://github.com/google/clasp) that helps you develop and manage Apps Script projects locally.
4.  Run the setup command to generate a new Google Sheets spreadsheet and bound Google Scripts project for your React project:

    ```bash
    > npm run setup

    Created new Google Sheet: https://drive.google.com/open?id=1lVQUPZ*************************************
    Created new Google Sheets Add-on script: https://script.google.com/d/1K7MPtCH*************************************-**/edit
    ```

    This will use `clasp` to create the new files, and save the project's ID to the `.clasp.json` file in your root directory. If you don't want to create a new spreadsheet and script, and instead want to use this React project with an existing project, [see the section below](#Using-an-existing-Sheet).

    Okay, now you've created a new sheet and bound script project! (But they're still empty for now.)

5.  Deploy the app with the command below:
    ```bash
    > npm run deploy
    ```
    This will build and push your code to your script project. Open the new spreadsheet in Google Sheets and your new React app will be available from the menu bar!

### Using an existing Sheet

If you want to use an existing google script for your project:

1. Copy your existing script project's `scriptId`. You can find it by opening your spreadsheet, selecting **Tools > Script Editor** from the menubar, then **File > Project properties**.

2. Run the command below using your project's `scriptId`:

   ```bash
   # If your scriptId is 1K7MPtCHkjasdf93238234asdKFDF3sa9 then run
   > npm run setup:use-id 1K7MPtCHkjasdf93238234asdKFDF3sa9
   ```

   This command will add the existing project's `scriptId` to your`.clasp.json` file. (You can also just edit the `.clasp.json` file directly. Make sure not to remove `"rootDir": "dist"` from the `.clasp.json` file.)

### Making changes to the code

Modify the server-side and client-side source code in the `src` folder. [Add any additional scopes](https://developers.google.com/apps-script/concepts/scopes) to `appsscript.json` as needed. When you're ready, build the app and deploy! You can run `npm run deploy` to build and deploy, or `npm run build` just to build the bundled files in the `./dist` directory.

## The sample app

Insert/activate/delete sheets through a simple HTML dialog, built with React. Access the dialog through the new menu item that appears. You may need to refresh the spreadsheet and approve the app's permissions the first time you use it.

## Features

- Includes popular `eslint` and `prettier` configs for clean, standardized code.
- `import` CSS from another file:
  ```js
  import './styles.css';
  ```
- This project uses promises to call and handle responses from the server, instead of using `google.script.run`:
  ```js
  // Google's documentation wants you to do this. Boo.
  google.script.run
    .withSuccessHandler(response => doSomething(response))
    .withFailureHandler(err => handleError(err))
    .addSheet(sheetTitle);
  ```

// Poof! With a little magic we can now do this:
import server from '../server';

// We now have access to all our server functions, which return promises!
const { addSheet } = server;
addSheet(sheetTitle)
.then(response => doSomething(response))
.catch(handleError(err));

// Or we can use async/await:
async () => {
try {
const response = await addSheet(sheetTitle);
doSomething(response);
} catch (err) {
handleError(err)
}
}

````
Now we can use familiar Promises in our client-side code and have easy access to all server functions. See [the code](./src/client/server.js) for the implementation details.

## Full Autocompletion
This project includes support for autocompletion and complete type definitions for all Google Apps Script methods.

![autocomplete support](https://i.imgur.com/W0Ks6Wj.gif "autocomplete")

- Lists all available methods from the appropriate Google Apps Script API
- Full definitions with links to official documentation, plus information on argument and return type


## Extending this app
### Adding new libraries and packages
To add new client-side libraries for your React app:
1. Install from npm, e.g. `npm install react-transition-group`
2. Grap a CDN url and declare it in the [webpack file, here](./webpack.config.js#L129).

Longer explanation:

Google Apps Script requires all HTML to be in a single file that is loaded into the dialog. Therefore, webpack has been configured to inline all generated client JS code into a single HTML file (in this case [main.html](./dist/main.html) and [about.html](./dist/about.html)). Inlining all code into a single file can result in large output files, which take longer to load, and can also sometimes cause the Google Apps Script editor to crash when you open it. So to reduce bundle size this project takes advantage of [dynamic-cdn-webpack-plugin](https://github.com/mastilver/dynamic-cdn-webpack-plugin) to automatically load popular libraries found in your app, such as `react` and `react-dom`, from a CDN. It doesn't know about all libraries (only [these](https://github.com/mastilver/module-to-cdn/blob/master/modules.json)), so if you've installed new packages, especially large packages, you should add a CDN url to the [webpack file](./webpack.config.js#L129) to reduce bundle size.

### Expose all public functions
Make sure to expose all public functions, including `onOpen` and any functions you are calling from the client. Example below shows assignment to `global` object:
```js
const onOpen = () => {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .createMenu('Dialog')
        .addItem('Add sheets', 'openDialog')
        .addToUi();
}

global.onOpen = onOpen
````

## Multiple dialogs

This project now supports multiple dialogs and sidebars. See the `server` code at [src/server/ui.js](./src/server/ui.js) for a 'main.html' dialog and an 'about.html' sidebar:

```js
// ./src/server/ui.js

export const onOpen = () => {
  SpreadsheetApp.getUi()
    .createMenu('My Sample React Project') // edit me!
    .addItem('Sheet Name Editor', 'openDialog')
    .addItem('About me', 'openAboutSidebar')
    .addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('main')
    .setWidth(400)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('about');
  SpreadsheetApp.getUi().showSidebar(html);
};
```

And here is the configuration in webpack that creates multiple html files. You will need to edit this if you want to add more dialog html files:

```js
// ./webpack.config.js

// Client entrypoints:
const clientEntrypoints = [
  {
    name: 'CLIENT - main dialog',
    entry: './src/client/MainDialog.jsx',
    filename: 'main.html',
  },
  {
    name: 'CLIENT - about sidebar',
    entry: './src/client/AboutDialog.jsx',
    filename: 'about.html',
  },
];
```

## Suggestions

Pull requests welcome!
