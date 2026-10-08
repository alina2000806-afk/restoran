/* Записи, які веде Стас. Сторінка підтягує їх і зливає зі змінами Аліни (за id).
   ship — коли костюм пішов від нас; from/to — дні оренди; back — коли клієнт відправляє його назад.
   Застави: depTaken/depTakenAt — коли застава прийшла до нас, depBack/depBackAt — коли повернули клієнту. */
window.OBLIK_SEED = [
 {id:"b-pavuk-0923", type:"rent", costume:"Павук", client:"клієнт з Direct", city:"Харків",
  ttn:"", ship:"2026-09-22", from:"2026-09-23", to:"2026-09-23", back:"2026-09-24",
  sum:200, dep:500, paid:true, sent:true, returned:true, done:true,
  depTaken:true, depTakenAt:"2026-09-22", depBack:true, depBackAt:"2026-09-24",
  note:"віддали 22.09, оренда 23.09, повернули 24.09. Застава 500 ₴ — домовились індивідуально, узяли 22.09 і віддали назад 24.09."},
 {id:"b-batman-0927", type:"rent", costume:"Бетмен", client:"anastasia (Direct)", city:"Нова пошта",
  ttn:"20451543462280", ship:"2026-09-23", from:"2026-09-27", to:"2026-09-27", back:"2026-09-28",
  sum:200, dep:800, paid:true, sent:true, returned:true, done:true,
  depTaken:true, depTakenAt:"2026-09-27", depBack:true, depBackAt:"2026-09-28",
  note:"оренда оплачена, застава 800 ₴ прийшла накладеним платежем за ТТН. Відправили 23.09, оренда в неділю 27.09, 28.09 відправили назад — заставу повернули тим же днем. Дві маски в комплекті."},
 {id:"b-rats-1101", type:"rent", costume:"Щур ×3", client:"бронь з Direct", city:"Харків",
  ttn:"", ship:"2026-10-31", from:"2026-11-01", to:"2026-11-01", back:"2026-11-02",
  sum:750, dep:2400, paid:true,
  note:"оренда 750 ₴ уже оплачена. Три щури: віддаємо 31.10, оренда 01.11, повертають 02.11. Заставу 2 400 ₴ беремо при видачі 31.10 і повертаємо 02.11, коли костюми будуть у нас."}
];
/* Старі демо-записи, які треба прибрати з браузера Аліни */
window.OBLIK_DROP = function(o){
 return (o.client==="anastasia (Direct)" && String(o.id).charAt(0)==="z") ||
        (o.costume==="Павук" && o.ship==="2026-09-25");
};
/* Разова правка записів, які вже лежать у браузері Аліни (сід їх не перезаписує).
   id правки застосовується один раз — після цього сторінка більше в них не лізе.
   Міняєш дані — підніми id (дата), інакше правка не застосується. */
window.OBLIK_PATCH = {
 id: "2026-10-08-zastavy",
 fix: {
  "b-pavuk-0923": {depTaken:true, depTakenAt:"2026-09-22", depBack:true, depBackAt:"2026-09-24", returned:true, done:true},
  "b-batman-0927": {depTaken:true, depTakenAt:"2026-09-27", depBack:true, depBackAt:"2026-09-28", returned:true, done:true}
 }
};
