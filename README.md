## React + Google Apps Script + Typescript

_Use this demo project as your boilerplate React app for HTML dialogs in Google Sheets, Docs and Forms._

This project uses labnol's excellent [apps-script-starter](https://github.com/labnol/apps-script-starter) and enuchi's [React-Google-Apps-Script](https://github.com/enuchi/React-Google-Apps-Script.git) as a starting point, adding support for Typescript. It demonstrates how easy it is to build React apps that interact with Google Apps server-side scripts. Simply clone this project and modify the source code to get started developing with React for Google Apps Script client-side dialogs.

![Google Apps Script / React development](https://i.imgur.com/0yYQoYj.jpg 'Start a React project for Google Apps Script')
_The demo app for Google Sheets shows insertion/deletion/activation of sheets through React-built HTML dialog._

## Installation

1.  Clone the sample project and install dependencies:

```
> git clone https://github.com/msembinelli/React-Google-Apps-Script.git
> cd React-Google-Apps-Script
> npm install
```

2. Enable the Google Apps Script API [(script.google.com/home/usersettings)](https://script.google.com/home/usersettings):
   ![Enable Google Apps Script](https://i.imgur.com/PxuNbP3.png 'enable the Google Apps Script API')

3. Log in to `clasp` to manage your Google Apps Scripts from the command line:

```
> npm run login
```

4. Create a new Google Sheets file and a bound Google Scripts project for your React project:

```
> npm run setup
Created new Google Sheet: https://drive.google.com/open?id=1lVQUPZ*************************************
Created new Google Sheets Add-on script: https://script.google.com/d/1K7MPtCH*************************************-**/edit
```

You've created a new Sheet and attached Script file! (But they're still empty for now.) See the notes below if you want to use an existing Google Sheet and Script instead of creating a new one.

5. Build the app and deploy!

```
> npm run deploy
```

You can now visit your Google Sheet and see your new React app.

### Using an existing Sheet

The above installation instructions create a new Google Sheets spreadsheet and 'bound' Apps Script, and saves the credentials to a `.clasp.json` file in the root directory. If you want to use an existing sheet's script file, then simply copy the scriptId into the `.clasp.json` file as below. You can find the script's scriptId by opening your sheet, selecting **Tools > Script Editor**, then **File > Project properties**.

Paste the `scriptId` into the `.clasp.json` file. \*Make sure to include `"rootDir": "dist"` in this file:

```
// .clasp.json
{"rootDir": "dist", "scriptId":"...paste scriptId here..."}
```

### Making changes to the code

Modify the server-side and client-side source code in the `src` folder using ES6/7 and React. Change the scopes in `appsscript.json` if needed. When you're ready, build the app and deploy! You can run `npm run deploy` to build and deploy, or `npm run build` just to build the bundled files in the `./dist` directory.

## The sample app

Insert/activate/delete sheets through a simple HTML dialog, built with React. Access the dialog through the new menu item that appears. You may need to refresh the spreadsheet and approve the app's permissions the first time you use it.

## How it works

"[Google Apps Script](https://en.wikipedia.org/wiki/Google_Apps_Script) is based on JavaScript 1.6 with some portions of 1.7 and 1.8 and provides subset of ECMAScript 5 API."

That means many JavaScript tools used today in modern web development will not work in the Google Apps Script environment, including `let`/`const` declarations, arrow functions, spread operator, etc.

This project circumvents those restrictions by transpiling newer code to older code that Google Apps Script understands using Babel, and also bundles separate files and modules using Webpack.

On the client-side, Google Apps Scripts has restrictions on the way HTML dialogs are used. While in normal web development you can simply reference a separate css file, e.g.

```
<link rel="stylesheet" href="styles.css">
```

in the Google Apps Script environment you need to use [HTML templates](https://developers.google.com/apps-script/guides/html/templates), which can be cumbersome to work with. With this project, all files are bundled together by inlining .css and .js files. Using a transpiler and bundling tool also allows us to use JSX syntax, and external libraries such as React.

## Features

- Support for Typescript & [gts](https://github.com/google/gts)

`tsconfig.json`

```
{
  "extends": "./node_modules/gts/tsconfig-google.json",
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node",
    "lib": ["es6", "dom", "es2017"],
    "target": "es3",
    "jsx": "react",
    "rootDir": "./src",
    "outDir": "./dist",
    "types": ["google-apps-script"],
    "strict": true,
    "typeRoots": ["./node_modules/@types", "./typings"],
    "esModuleInterop": true,
    "declaration": false
  },
  "include": ["src/**/*.ts", "test/**/*.ts", "typings/**/*d.ts"],
  "exclude": ["node_modules"]
}
```

`tslint.json`

```
{
  "extends": ["gts/tslint.json", "tslint-react", "tslint-react-hooks"],
  "rules": {
    "jsx-no-lambda": false,
    "jsx-no-multiline-js": false
  },
  "linterOptions": {
    "exclude": ["**/*.json"]
  }
}
```

- Support for JSX syntax:

```
return <div>Name: {person.firstName}</div>
```

- Support for external packages. Simply install with npm or from a file and `import`:

```
$ npm install react-addons-css-transition-group
```

```
// index.jsx
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
```

- `import` CSS from another file:

```
import "./styles.css";
```

- Use promises with e.g. `.then`/`.catch` instead of `google.script.run`:

```
// instead of this:
google.script.run
  .withSuccessHandler(successHandler)
  .withFailureHandler(failureHandler)
  .getSheetsData()

// you can do this:
import server from '../server';
// access all your server functions here:
const { getSheetsData } = server;
addSheet(newSheetTitle)
  .then(successHandler)
  .catch(failureHandler);
```

How does this work? We rewrite `google.script.run` to support Promises:

```
// ./src/client/server.js

const serverMethods = {};

// skip the reserved methods
const ignoredMethods = [
  'withFailureHandler',
  'withLogger',
  'withSuccessHandler',
  'withUserObject',
];

for (const method in google.script.run) {
  if (!ignoredMethods.includes(method)) {
    serverMethods[method] = (...args) => {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler(resolve)
          .withFailureHandler(reject)[method](...args);
      });
    };
  }
}
export default serverMethods;
```

Now we can use familiar Promises in our client-side code and have easy access to all server functions!

- Use newer ES6/7 code, including arrow functions, spread operators, `const`/`let`, and more:

```
const getSheetsData = () => {
  let activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    let sheetName = sheet.getName();
    return {
      text: sheetName,
      sheetIndex: index,
      isActive: sheetName === activeSheetName,
    };
  });
};
```

## Tern support

This project includes support for GAS definitions and autocomplete through a [Tern](http://ternjs.net/) plugin. Tern is a code-analysis engine for JavaScript, providing many useful tools for developing. See Tern's site for setup instructions for many popular code editors, such as Sublime, Vim and others.

Tern provides many indispensable tools for working with Google Apps Script, such as autocompletion on variables and properties, function argument hints and querying the type of an expression.

- Autocomplete example. Lists all available methods from the appropriate Google Apps Script API:
  ![tern support](https://i.imgur.com/s1OrQNr.png 'autocomplete and intelligent type detection with Tern')

- Full definitions with links to official documentation, plus information on argument and return type:
  ![tern support](https://i.imgur.com/yg5VwAC.png 'definitions with links to official documentation make developing with Google Apps Script')

## Extending this app

- You can split up server-side code into multiple files and folders using `import` and `export` statements.
- Make sure to expose all public functions including `onOpen` and any functions you are calling from the client. Example below shows assignment to `global` object:

```
const onOpen = () => {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .createMenu('Dialog')
        .addItem('Add sheets', 'openDialog')
        .addToUi();
}

global.onOpen = onOpen
```

- You may wish to remove automatic linting when running Webpack. You can do so by editing the Webpack config file and commenting out the eslintConfig line in client or server settings:

```
// webpack.config.js

const clientConfig = Object.assign({}, sharedConfigSettings, {
  ...
  module: {
    rules: [
      // eslintConfig,
      {
```

## Multiple dialogs

This project now supports multiple dialogs and sidebars. Here is an example of the `server` code for a 'main.html' dialog and an 'about.html' sidebar:

```
// ./src/server/sheets-utilities.js

const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('main')
    .setWidth(400)
    .setHeight(600);
  SpreadsheetApp
    .getUi() // Or DocumentApp or FormApp.
    .showModalDialog(html, 'Sheet Editor');
};

const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('about');
  SpreadsheetApp
    .getUi()
    .showSidebar(html);
};
```

And here is the configuration in webpack that creates multiple html files. You will need to edit this if you want to add more dialog html files:

```
// ./webpack.config.js

// Client entrypoints:
const clientEntrypoints = [
  {
    name: "CLIENT - main dialog",
    entry: "./src/client/main.jsx",
    filename: "main.html"
  },
  {
    name: "CLIENT - about sidebar",
    entry: "./src/client/about.jsx",
    filename: "about.html"
  },
];
```

## Suggestions

Open a pull request!
