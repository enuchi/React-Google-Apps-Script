import {
  onOpen,
  openDialog,
  openDialogBootstrap,
  openAboutSidebar,
} from './ui';

import { getSheetsData, addSheet, deleteSheet, setActiveSheet } from './sheets';

const getActiveUserEmail = () => {
  return Session.getActiveUser().getEmail();
};

// Public functions must be exported as named exports
export {
  onOpen,
  openDialog,
  openDialogBootstrap,
  openAboutSidebar,
  getSheetsData,
  addSheet,
  deleteSheet,
  setActiveSheet,
  getActiveUserEmail,
};
