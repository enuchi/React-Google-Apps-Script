#React + Google Apps Script#

Use this repo as your boilerplate React app for use with Google Apps Script html dialogs.

It uses labnol's excellent [apps-script-starter](https://github.com/labnol/apps-script-starter) project as a starting point, but adds support for client-side dialogs built with React, and shows how React pages can interact with Google Apps server-side script.

**Installation**

 Set up the sample project:
```
mkdir my-gas-react-app && cd my-gas-react-app
clone https://github.com/enuchi/React-Google-Apps-Script.git
npm install
```
Create a new Google Sheets spreadsheet. Open the Script Editor (Tools --> Script Editor) and copy the ScriptId (File --> Project properties).

Add the ScriptId to the .clasp.json file:
```
// .clasp.json
{
   "rootDir": "dist",
   "scriptId":"...paste scriptId here..."
}
```
Log into CLASP, which lets you develop Apps Script projects locally, and follow the authorization flow:
```
npx clasp login
```
Build and deploy the app!
```
npm run build
npm run deploy
```
