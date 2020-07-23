export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('My Sample React Project') // edit me!
    .addItem('Sheet Editor', 'openDialog')
    .addItem('Sheet Editor (Bootstrap)', 'openDialogBootstrap')
    .addItem('About me', 'openAboutSidebar');

  if (process.env.NODE_ENV === 'development') {
    menu
      .addItem('Development: Sheet Editor', 'openDialogDevelopment')
      .addItem(
        'Development: Sheet Editor (Bootstrap)',
        'openDialogBootstrapDevelopment'
      )
      .addItem('Development: About me', 'openAboutSidebarDevelopment');
  }

  menu.addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor');
};

export const openDialogBootstrap = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-bootstrap')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (Bootstrap)');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page');
  SpreadsheetApp.getUi().showSidebar(html);
};

// Functions for opening the development windows need to load the development html files
export const openDialogDevelopment = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-development')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor');
};

export const openDialogBootstrapDevelopment = () => {
  const html = HtmlService.createHtmlOutputFromFile(
    'dialog-demo-bootstrap-development'
  )
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (Bootstrap)');
};

export const openAboutSidebarDevelopment = () => {
  const html = HtmlService.createHtmlOutputFromFile(
    'sidebar-about-page-development'
  );
  SpreadsheetApp.getUi().showSidebar(html);
};
