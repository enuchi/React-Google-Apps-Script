
## React + Google Apps Script 
*Use this demo project as your boilerplate React app for HTML dialogs in Google Sheets, Docs and Forms.*

This project uses labnol's excellent [apps-script-starter](https://github.com/labnol/apps-script-starter) as a starting point, adding support for React. It demonstrates how easy it is to build React apps that interact with Google Apps server-side scripts. Simply clone this project and modify the source code to get started developing with React for Google Apps Script client-side dialogs.

![Google Apps Script / React development](https://i.imgur.com/0yYQoYj.jpg "Start a React project for Google Apps Script")
*The demo app for Google Sheets shows insertion/deletion/activation of sheets through React-built HTML dialog.* 

## Installation

 Clone the sample project and install dependencies:
```
git clone https://github.com/enuchi/React-Google-Apps-Script.git
cd React-Google-Apps-Script
npm install
```
Then [create a new Google Sheets spreadsheet](https://sheets.google.com). Open the Script Editor and copy the script's scriptId. [**Tools > Script Editor**, then **File > Project properties**].

Paste the **scriptId** into the .clasp.json file as below:
```
// .clasp.json
{"rootDir": "dist",
 "scriptId":"...paste scriptId here..."}
```
Log into CLASP to push code to the server from the command line:
```
npx clasp login
```
Modify the server-side and client-side source code in the `src` folder using ES6/7 and React. Change the scopes in `appsscript.json` if needed. When you're ready, build the app!
```
npm run build
```
Webpack will display any linting errors, and then bundle your files in `dist`. Finally, push your files to Google's servers using CLASP:
```
clasp push
```


## The sample app
Insert/activate/delete sheets through a simple HTML dialog, built with React. Access the dialog through the new menu item that appears. You may need to refresh the spreadsheet and approve the app's permissions the first time you use it.

## How it works
"[Google Apps Script](https://en.wikipedia.org/wiki/Google_Apps_Script) is based on JavaScript 1.6 with some portions of 1.7 and 1.8 and provides subset of ECMAScript 5 API."

That means many JavaScript tools used today in modern web development will not work in the Google Apps Script environment, including `let`/`const` declarations, arrow functions, spread operator, etc.

This project circumvents those restrictions by transpiling newer code to older code that Google Apps Script understands using Babel, and also bundles separate files and modules using Webpack.

On the client-side, there are restrictions on the way HTML dialogs are used in Google Apps (Sheets, Docs and Forms). In web development you can simply reference a separate css file:
```
<link rel="stylesheet" href="styles.css">
```
In the Google Apps Script environment you need to use [HTML templates](https://developers.google.com/apps-script/guides/html/templates), which can be cumbersome. With this project, all files are bundled together by inlining .css and .js files. Using a transpiler and bundling tool also allows us to use JSX syntax, and external libraries such as React.

## Features
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
 - Make server calls in React with `google.script.run`:
 ```
componentDidMount() {
   google.script.run
      .withSuccessHandler((data) => this.setState({names: data}))
      .withFailureHandler((error) => alert(error))
      .getSheetsData()
}
  ```
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
![tern support](https://i.imgur.com/s1OrQNr.png "autocomplete and intelligent type detection with Tern")

- Full definitions with links to official documentation, plus information on argument and return type:
![tern support](https://i.imgur.com/yg5VwAC.png "definitions with links to official documentation make developing with Google Apps Script")



## Extending this app
- You can split up server-side code into multiple files and folders using `import` and `export` statements.
- Make sure to expose all public functions including any functions called from the client with `google.script.run` as well as onOpen. Example below shows assignment to `global` object:
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
## Suggestions
Open a pull request!