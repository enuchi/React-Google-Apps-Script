// Use ES6/7 code
const onOpen = () => {
	SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      	.createMenu('Dialog')
      	.addItem('Add sheets', 'openDialog')
		.addToUi();
}

const openDialog = () => {
	var html = HtmlService.createHtmlOutputFromFile('dialog');
	SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
		.showModalDialog(html, 'Sheet Editor');
}

const getSheets = () => SpreadsheetApp
	.getActive()
	.getSheets();

const getActiveSheetName = () => SpreadsheetApp
	.getActive()
	.getSheetName();

const getSheetsData = () => {
	let activeSheetName = getActiveSheetName();
	return getSheets()
		.map((sheet,index) => {
			let sheetName = sheet.getName();
			return {
				text: sheetName,
				sheetIndex: index,
				isActive: sheetName === activeSheetName
			}
		});
}

const addSheet = (sheetTitle) => {
	SpreadsheetApp.getActive().insertSheet(sheetTitle);
	return getSheetsData();
}

const deleteSheet = (sheetIndex) => {
	var sheets = getSheets();
	SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
	return getSheetsData();
}

//Must expose public functions
global.onOpen = onOpen;
global.openDialog = openDialog;
global.getSheetsData = getSheetsData;
global.addSheet = addSheet;
global.deleteSheet = deleteSheet;