export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('My Sample React Project') // edit me!
    .addItem('Sheet Editor', 'openDialog')
    .addItem('Sheet Editor (Bootstrap)', 'openDialogBootstrap')
    .addItem('Sheet Editor (Tailwind CSS)', 'openDialogTailwindCSS')
    .addItem('About me', 'openAboutSidebar');

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

export const openDialogTailwindCSS = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-tailwindcss')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (Tailwind CSS)');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page');
  SpreadsheetApp.getUi().showSidebar(html);
};
