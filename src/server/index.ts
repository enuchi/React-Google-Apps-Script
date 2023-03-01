import {
  onOpen,
  openDialog,
  openDialogBootstrap,
  openDialogMUI,
  openDialogTailwindCSS,
  openAboutSidebar,
} from './ui';

import { getSheetsData, addSheet, deleteSheet, setActiveSheet } from './sheets';

// Public functions must be exported as named exports
export {
  onOpen,
  openDialog,
  openDialogBootstrap,
  openDialogMUI,
  openDialogTailwindCSS,
  openAboutSidebar,
  getSheetsData,
  addSheet,
  deleteSheet,
  setActiveSheet,
};

global.onOpen = onOpen
global.openDialog = openDialog
global.openDialogBootstrap = openDialogBootstrap
global.openDialogMUI = openDialogMUI
global.openDialogTailwindCSS = openDialogTailwindCSS
global.openAboutSidebar = openAboutSidebar
global.getSheetsData = getSheetsData
global.addSheet = addSheet
global.deleteSheet = deleteSheet
global.setActiveSheet = setActiveSheet
