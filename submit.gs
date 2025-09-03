
function doPost(e) {
  const sheet = SpreadsheetApp.openById('1Ik7LSaXo7B7dTBGSE8cwsjxRDzUEvcjZTtnZn4doyco').getSheetByName('Sheet1');
  const data = e.parameter;
  sheet.appendRow([
    data.name || '',
    data.url || '',
    data.thumbnail || '',
    data.category || '',
    data.tags || '',
    data.description || ''
  ]);
  return ContentService.createTextOutput('OK');
}
