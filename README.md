## React + Google Apps Script 
*Use this repo as your boilerplate React app for use with HTML dialogs in Google Sheets, Docs and Forms.*

This project uses labnol's excellent [apps-script-starter](https://github.com/labnol/apps-script-starter) as a starting point, adding support for client-side dialogs built with React. It demonstrates how easy it is to build React apps that interact with Google Apps server-side scripts.

## Installation

 Set up the sample project:
```
mkdir my-gas-react-app && cd my-gas-react-app
git clone https://github.com/enuchi/React-Google-Apps-Script.git
npm install
```
Create a new Google Sheets spreadsheet. Open the Script Editor (Tools --> Script Editor) and copy the ScriptId (File --> Project properties).

Add the ScriptId to the .clasp.json file:
```
// .clasp.json
{"rootDir": "dist",
 "scriptId":"...paste scriptId here..."}
```
Log into CLASP, a tool that lets you develop Apps Script projects locally, and follow the authorization flow:
```
npx clasp login
```
Modify your server-side and client-side code in the `src` folder using ES6/7 and React. Change the scopes in `appsscript.json`. When you're ready, build the app!
```
npm run build
```
Webpack will bundle your files in `dist`. Push your files to Google's servers using CLASP:
```
clasp push
```


## The sample app
Insert new sheets and delete sheets through a simple dialog, built with React:

## How it works
Code is written in the `src` directory and bundled into the `dist` directory when `npm run build` is run. CLASP pushes files from `dist` to Script Editor files.

Multiple Webpack entry points are used to generate code that is compatible with the Google Apps Script environment on both server and client. On the server side that means ending up as (basically) ES5. On the client side, the challenge is that GAS does not easily support multiple pages, so a single HTML page is created. This is done with the help of some Webpack plugins that use HTML templates and add the necessary CSS and JavaScript/React assets inline. (You'll see the original output bundle, `main.js`, in the `dist` directory, but it's ignored through .clasp.ignore). The appsscript.json manifest file is simply copied into `dist`.

## Features
- Support for JSX syntax:
```
render() {
   return (<div className="formBlock"><span>Add a sheet: </span>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <input onChange={this.handleChange} value={this.state.text} />
              </form>
            </div>);
}
```
- Support for npm packages. Simply install with npm and `import`:
```
import React from "react";
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
```
- `import` CSS from another file:
```
import "./styles.css";
```
 - Shows how server calls are made in React using `google.script.run`:
 ```
componentDidMount() {
   google.script.run
      .withSuccessHandler((data) => this.setState({names: data}))
      .withFailureHandler((error) => alert(error))
      .getSheetsData()
}
  ```

## Extending this app
- You can split up server-side code into multiple files and folders . Simply use `import` and `export`.
- Make sure to expose all public functions (functions called from the client with `google.script.run`) as well as onOpen using e.g.:
```
const onOpen = () => {
	SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      	.createMenu('Dialog')
      	.addItem('Add sheets', 'openDialog')
		    .addToUi();
}

global.onOpen = onOpen
```