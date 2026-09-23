/* Записи, які веде Стас. Сторінка підтягує їх і зливає зі змінами Аліни (за id).
   ship — коли костюм пішов від нас; from/to — дні оренди; back — коли клієнт відправляє його назад. */
window.OBLIK_SEED = [
 {id:"b-pavuk-0923", type:"rent", costume:"Павук", client:"клієнт з Direct", city:"Харків",
  ttn:"", ship:"2026-09-22", from:"2026-09-23", to:"2026-09-23", back:"2026-09-24",
  sum:200, dep:800, paid:true, depTaken:true, sent:true,
  note:"віддали 22.09, оренда 23.09, повертають 24.09"},
 {id:"b-batman-0927", type:"rent", costume:"Бетмен", client:"anastasia (Direct)", city:"Нова пошта",
  ttn:"20451543462280", ship:"2026-09-23", from:"2026-09-27", to:"2026-09-27", back:"2026-09-28",
  sum:200, dep:800, paid:true, sent:true,
  note:"оплачено, відправили 23.09, оренда в неділю 27.09, у понеділок 28.09 відправляють назад. Дві маски в комплекті."},
 {id:"b-rats-1101", type:"rent", costume:"Щур ×3", client:"бронь з Direct", city:"Харків",
  ttn:"", ship:"2026-10-31", from:"2026-11-01", to:"2026-11-01", back:"2026-11-02",
  sum:750, dep:2400, paid:false,
  note:"три щури: віддаємо 31.10, оренда 01.11, повертають 02.11"}
];
/* Старі демо-записи, які треба прибрати з браузера Аліни */
window.OBLIK_DROP = function(o){
 return (o.client==="anastasia (Direct)" && String(o.id).charAt(0)==="z") ||
        (o.costume==="Павук" && o.ship==="2026-09-25");
};
