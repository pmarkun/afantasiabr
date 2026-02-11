const SHEET_ID = '10Yh18Nh7OnZk1e4GYHqkEdi5hufI5jxnw48_bsKyho8';
const SHEET_NAME = 'Respostas';

const HEADERS = [
  'Timestamp',
  'Resultado VVIQ',
  'Nome',
  'Idade',
  'E-mail',
  'Profissao',
  'Relato'
];

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const sheet = getSheet_();

    ensureHeaders_(sheet);

    sheet.appendRow([
      new Date(),
      payload.result || '',
      payload.name || '',
      payload.age || '',
      payload.email || '',
      payload.profession || '',
      payload.experience || ''
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, message: 'Afantasia Web App ativo.' });
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  const contents = e.postData.contents.trim();
  if (!contents) {
    return {};
  }

  try {
    return JSON.parse(contents);
  } catch (error) {
    return queryToObject_(contents);
  }
}

function queryToObject_(query) {
  const data = {};
  query.split('&').forEach((pair) => {
    const parts = pair.split('=');
    const key = decodeURIComponent(parts[0] || '').trim();
    const value = decodeURIComponent(parts[1] || '').trim();
    if (key) {
      data[key] = value;
    }
  });
  return data;
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.getSheets()[0] || spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = HEADERS.every((header, index) => firstRow[index] === header);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
