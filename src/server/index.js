import {
  onOpen,
  openDialog,
  openDialogBootstrap,
  openAboutSidebar,
} from './ui';
import { getSheetsData, addSheet, deleteSheet, setActiveSheet } from './sheets';

// Public functions must be exported as named exports
global.onOpen = onOpen;
global.openDialog = openDialog;
global.openDialogBootstrap = openDialogBootstrap;
global.openAboutSidebar = openAboutSidebar;
global.getSheetsData = getSheetsData;
global.addSheet = addSheet;
global.deleteSheet = deleteSheet;
global.setActiveSheet = setActiveSheet;
