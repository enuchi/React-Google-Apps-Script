export function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

export function doPost() {
  return HtmlService.createHtmlOutputFromFile('index');
}

export function getServerUrl() {
  return ScriptApp.getService().getUrl();
}
