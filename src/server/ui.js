export const onOpen = () => {
  SpreadsheetApp.getUi()
    .createMenu('My Sample React Project') // edit me!
    .addItem('Sheet Name Editor', 'openDialog')
    .addItem('About me', 'openAboutSidebar')
    .addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('main')
    .setWidth(400)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('about');
  SpreadsheetApp.getUi().showSidebar(html);
};
