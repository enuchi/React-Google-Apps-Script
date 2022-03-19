const ssId = "1XQN2QB4Sww9jCEUfSwZOKFBs-yExMl6QAGOKzErY078";

export const doGet = () => {
  const html = HtmlService.createTemplateFromFile('dialog-demo-bootstrap.html');
  return html.evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1').setTitle('React App');
}
const getSheets = () => SpreadsheetApp.openById(ssId).getSheets();

const getActiveSheetName = () => SpreadsheetApp.openById(ssId).getActiveSheet().getSheetName();

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = sheetTitle => {
  SpreadsheetApp.openById(ssId).insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = sheetIndex => {
  const sheets = getSheets();
  SpreadsheetApp.openById(ssId).deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = sheetName => {
  SpreadsheetApp.openById(ssId)
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
};
