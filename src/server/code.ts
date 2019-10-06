// Use ES6/7 code
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    .createMenu('Custom scripts')
    .addItem('Edit sheets [sample React project]', 'openDialog')
    .addItem('About me', 'openAboutSidebar')
    .addToUi();
}

function openDialog() {
  const html = HtmlService.createHtmlOutputFromFile('main')
    .setWidth(400)
    .setHeight(600);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    .showModalDialog(html, 'Sheet Editor');
}

function openAboutSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('about');
  SpreadsheetApp.getUi().showSidebar(html);
}

function getSheets() {
  return SpreadsheetApp.getActive().getSheets();
}

function getActiveSheetName() {
  return SpreadsheetApp.getActive().getSheetName();
}

function getSheetsData() {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const sheetName = sheet.getName();
    return {
      text: sheetName,
      sheetIndex: index,
      isActive: sheetName === activeSheetName,
    };
  });
}

function addSheet(sheetTitle: string) {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
}

function deleteSheet(sheetIndex: number) {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
}

function setActiveSheet(sheetName: string) {
  SpreadsheetApp.getActive()
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
}

global.onOpen = onOpen;
global.openDialog = openDialog;
global.openAboutSidebar = openAboutSidebar;
global.getSheets = getSheets;
global.getActiveSheetName = getActiveSheetName;
global.getSheetsData = getSheetsData;
global.addSheet = addSheet;
global.deleteSheet = deleteSheet;
global.setActiveSheet = setActiveSheet;
