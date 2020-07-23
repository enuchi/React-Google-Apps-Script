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

if (process.env.NODE_ENV === 'development') {
  global.openDialogDevelopment = publicUiFunctions.openDialogDevelopment;
  global.openDialogBootstrapDevelopment =
    publicUiFunctions.openDialogBootstrapDevelopment;
  global.openAboutSidebarDevelopment =
    publicUiFunctions.openAboutSidebarDevelopment;
}
