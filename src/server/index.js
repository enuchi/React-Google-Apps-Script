import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';

// Expose public functions by attaching to `global`
global.onOpen = publicUiFunctions.onOpen;
global.openDialog = publicUiFunctions.openDialog;
global.openDialogBootstrap = publicUiFunctions.openDialogBootstrap;
global.openAboutSidebar = publicUiFunctions.openAboutSidebar;
global.getSheetsData = publicSheetFunctions.getSheetsData;
global.addSheet = publicSheetFunctions.addSheet;
global.deleteSheet = publicSheetFunctions.deleteSheet;
global.setActiveSheet = publicSheetFunctions.setActiveSheet;

/**
 * DEVELOPMENT settings below.
 *
 * This code will only get bundled during development builds (when you run
 * npm run build:dev, npm run deploy:dev or npm run start). During production
 * (npm run build and npm run deploy), this code will not get bundled.
 *
 * Note that the expression process.env.NODE_ENV === 'development' gets
 * evaluated at build, not at run time. See "webpack.DefinePlugin" sections
 * in the webpack.config.js file.
 */

if (process.env.NODE_ENV === 'development') {
  global.openDialogDevelopment = publicUiFunctions.openDialogDevelopment;
  global.openDialogBootstrapDevelopment =
    publicUiFunctions.openDialogBootstrapDevelopment;
  global.openAboutSidebarDevelopment =
    publicUiFunctions.openAboutSidebarDevelopment;
}
