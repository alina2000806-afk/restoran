// Заявки з одностраничників → Google-таблиця.
// Вставити в script.google.com → Розгорнути → Веб-застосунок (Виконувати від: Я, Доступ: Усі).
// Отриману адресу вписати в akula/config.js → window.ORDERS_API.
var SHEET = 'Замовлення';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create('Замовлення з сайтів');
    var sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['№', 'Дата', 'Товар', 'Кількість', 'Сума, ₴', 'Оплата', 'Клієнт', 'Нова пошта', 'Джерело', 'Статус']);
    }
    var id = sh.getLastRow();
    sh.appendRow([id, new Date(), d.product, d.qty, d.total,
      d.pay === 'full' ? 'уся сума на карту' : 'передоплата 200 ₴',
      d.contact, d.city, d.source, 'нова']);
    return json({ ok: true, id: id });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
