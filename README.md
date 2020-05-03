

## React + Google Apps Script
*Use this project as your boilerplate for React apps inside Google Sheets, Docs and Forms pages.*

This project uses labnol's excellent [apps-script-starter](https://github.com/labnol/apps-script-starter) as a starting point, and adds support for building React apps inside Google Sheets, Forms, and Docs pages. Simply clone this project and modify the source code to get started developing React apps with Google Apps Script.

![Google Apps Script / React development](https://i.imgur.com/0yYQoYj.jpg "Start a React project for Google Apps Script")
*The demo app for Google Sheets shows insertion/deletion/activation of sheets through React-built HTML dialog.*

## Installation

 1. Clone the sample project and install dependencies:
    ```bash
    > git clone https://github.com/enuchi/React-Google-Apps-Script.git
    > cd React-Google-Apps-Script
    > npm install
    ```
 2. Enable the Google Apps Script API [(script.google.com/home/usersettings)](https://script.google.com/home/usersettings):
 
    ![Enable Google Apps Script](https://i.imgur.com/PxuNbP3.png "enable the Google Apps Script API")

3. Log in to `clasp`, google's tool to help you manage your Google Apps Script projects from the command line.
    ```bash
    > npm run login
    ```
4. Create a new Google Sheets file and a bound Google Scripts project for your React project:
    ```bash
    > npm run setup

    Created new Google Sheet: https://drive.google.com/open?id=1lVQUPZ*************************************
    Created new Google Sheets Add-on script: https://script.google.com/d/1K7MPtCH*************************************-**/edit
    ```
    This will use `clasp` to create a new Google Sheets spreadsheet and a 'bound' Google Apps Script project, and save the credentials to the `.clasp.json` file in your root directory. If you don't want to create a new spreadsheet and script, and instead want to use this project with an existing project, [see the section below](#Using-an-existing-Sheet).

    Okay, now you've created a new sheet and bound script file! (But they're still empty for now.)

5. Deploy the app!
    ```bash
    > npm run deploy
    ```
    Open your new spreadsheet in Google Sheets. Your new React app will be available from a new menu item!

### Using an existing Sheet
If you want to use an existing google script for your project:
1. Copy the existing script project's `scriptId`. You can find it by opening your sheet, selecting **Tools > Script Editor**, then **File > Project properties**.

2. Run the command below to add the existing project's `scriptId` to your`.clasp.json` file. (You can also just edit the `.clasp.json` file directly. Make sure not to remove `"rootDir": "dist"` from the `.clasp.json` file.)

    ```bash
    # If your scriptId is 1K7MPtCHkjasdf93238234asdKFDF3sa9 then run
    > npm run setup:use-id 1K7MPtCHkjasdf93238234asdKFDF3sa9
    ```

### Making changes to the code
Modify the server-side and client-side source code in the `src` folder. [Add any additional scopes](https://developers.google.com/apps-script/concepts/scopes) to `appsscript.json` as needed. When you're ready, build the app and deploy! You can run `npm run deploy` to build and deploy, or `npm run build` just to build the bundled files in the `./dist` directory.


## The sample app
Insert/activate/delete sheets through a simple HTML dialog, built with React. Access the dialog through the new menu item that appears. You may need to refresh the spreadsheet and approve the app's permissions the first time you use it.


## Features
- Support for external packages. Simply install with npm or from a file and `import`:
  ```bash
  > npm install react-transition-group
  ```
  ```js
  // index.jsx
  import { TransitionGroup, CSSTransition } from 'react-transition-group';
  ```
- `import` CSS from another file:
  ```js
  import "./styles.css";
  ```
 - Use promises to call and handle responses from the server instead of using `google.script.run`:
    ```js
    // Google's documentation wants you to do this. Boo.
    google.script.run
      .withSuccessHandler(response => doSomething(response))
      .withFailureHandler(err => handleError(err))
      .addSheet(sheetTitle)


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
    ```
Now we can use familiar Promises in our client-side code and have easy access to all server functions. See [the code](./src/client/server.js) for the implementation details.

## Full Autocompletion
This project includes support for the full autocompletion and type definitions.

![autocomplete support](https://i.imgur.com/W0Ks6Wj.gif "autocomplete")

- Lists all available methods from the appropriate Google Apps Script API:
- Full definitions with links to official documentation, plus information on argument and return type:


## Extending this app
- You can split up server-side code into multiple files and folders using `import` and `export` statements.
- Make sure to expose all public functions including `onOpen` and any functions you are calling from the client. Example below shows assignment to `global` object:
  ```js
  const onOpen = () => {
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
          .createMenu('Dialog')
          .addItem('Add sheets', 'openDialog')
          .addToUi();
  }

  global.onOpen = onOpen
  ```
- You may wish to remove automatic linting when running Webpack. You can do so by editing the Webpack config file and commenting out the eslintConfig line in client or server settings:
  ```js
  // webpack.config.js

  const clientConfig = Object.assign({}, sharedConfigSettings, {
    ...
    module: {
      rules: [
        // eslintConfig,
        {
  ```

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
