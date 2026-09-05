/* ============================================================
   Логіка сайту: каталог, календар, форма бронювання.
   Дані про зайняті дати беруться з Google-таблиці через Apps Script
   (CONFIG.apiUrl). Поки він не підключений — працює резервний режим.
   ============================================================ */
(() => {
"use strict";

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const CFG = window.CONFIG;
const COSTUMES = window.COSTUMES;
const IMG = "https://alina2000806-afk.github.io/restoran/";

const MONTHS = ["січень","лютий","березень","квітень","травень","червень",
                "липень","серпень","вересень","жовтень","листопад","грудень"];

/* ─────────── дати ─────────── */
const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const fromIso = s => { const [y,m,d] = s.split("-").map(Number); return new Date(y, m-1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
const today = () => { const t = new Date(); t.setHours(0,0,0,0); return t; };
const human = s => { const d = fromIso(s); return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0,3)}`; };
const daysBetween = (a, b) => Math.round((fromIso(b) - fromIso(a)) / 86400000) + 1;

/* ─────────── стан ─────────── */
const state = {
  costume: null,
  from: null,
  to: null,
  ship: false,
  month: (() => { const t = today(); return new Date(t.getFullYear(), t.getMonth(), 1); })(),
  busy: {}          // { costumeId: { "2026-09-10": "rent" | "ship" } }
};

/* ============================================================
   КАТАЛОГ
   ============================================================ */
function renderCards(filter = "all") {
  const list = COSTUMES.filter(c => filter === "all" || c.type === filter);
  $("#cards").innerHTML = list.map(c => `
    <button class="card" data-id="${c.id}" type="button">
      <div class="card__ph">
        <img src="${c.photos[0]}" alt="${c.name}" loading="lazy" width="928" height="1160">
        <span class="card__type">${c.type === "fit" ? "облягаючий" : "надувний"}</span>
        <span class="card__price">${c.price} ₴/доба</span>
      </div>
      <div class="card__meta">
        <h3>${c.name}</h3>
        <p class="card__sub">${c.sub}</p>
        <div class="card__row">
          <span>${c.height}</span>
          <span class="card__go">Детальніше →</span>
        </div>
      </div>
    </button>`).join("");
}

$$(".chip").forEach(chip => chip.addEventListener("click", () => {
  $$(".chip").forEach(c => { c.classList.remove("is-on"); c.setAttribute("aria-selected","false"); });
  chip.classList.add("is-on"); chip.setAttribute("aria-selected","true");
  renderCards(chip.dataset.filter);
}));

/* ============================================================
   МОДАЛКА КОСТЮМА
   ============================================================ */
const modal = $("#modal");

function openModal(id) {
  const c = COSTUMES.find(x => x.id === id);
  if (!c) return;
  $("#modalBody").innerHTML = `
    <div class="mdl">
      <div class="mdl__gal">${c.photos.map(p => `<img src="${p}" alt="${c.name}" loading="lazy">`).join("")}</div>
      <div class="mdl__top"><h2 id="mTitle">${c.name}</h2><span class="mdl__sub">${c.sub}</span></div>
      <p class="mdl__tag">${c.tagline}</p>
      <p class="mdl__about">${c.about}</p>
      <dl class="mdl__specs">
        <div><dt>Ціна</dt><dd>${c.price} ₴ / доба</dd></div>
        <div><dt>Зріст</dt><dd>${c.height}</dd></div>
        <div><dt>Кому</dt><dd>${c.gender}</dd></div>
        <div><dt>Застава</dt><dd>${CFG.pricing.deposit} ₴</dd></div>
      </dl>
      <div class="mdl__lists">
        <div><h4>У комплекті</h4><ul>${c.kit.map(k => `<li>${k}</li>`).join("")}</ul></div>
        <div><h4>Для чого беруть</h4><ul>${c.good.map(g => `<li>${g}</li>`).join("")}</ul></div>
      </div>
      <button class="btn btn--wide" type="button" data-book="${c.id}">Обрати дати для цього костюма</button>
    </div>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }

document.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) return openModal(card.dataset.id);

  if (e.target.closest("[data-close]")) return closeModal();

  const book = e.target.closest("[data-book]");
  if (book) {
    closeModal();
    selectCostume(book.dataset.book);
    $("#booking").scrollIntoView({ behavior: "smooth" });
  }
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

/* ============================================================
   ВИБІР КОСТЮМА
   ============================================================ */
function renderPicks() {
  $("#picks").innerHTML = COSTUMES.map(c => `
    <button class="pick${state.costume === c.id ? " is-on" : ""}" type="button" data-pick="${c.id}">
      <img src="${c.photos[0]}" alt="" loading="lazy">
      <span class="pick__t"><b>${c.name}</b><span>${c.price} ₴</span></span>
    </button>`).join("");
  $$("[data-pick]").forEach(b => b.addEventListener("click", () => selectCostume(b.dataset.pick)));
}

function selectCostume(id) {
  state.costume = id;
  state.from = state.to = null;
  renderPicks();
  loadBusy(id).then(() => { renderCal(); renderSummary(); });
}

/* ============================================================
   ЗАЙНЯТІ ДАТИ
   ============================================================ */
async function loadBusy(id) {
  if (state.busy[id]) return;

  let rows = window.FALLBACK_BOOKINGS || [];
  if (CFG.apiUrl) {
    try {
      const r = await fetch(`${CFG.apiUrl}?action=busy`, { method: "GET" });
      const j = await r.json();
      if (Array.isArray(j.bookings)) rows = j.bookings;
    } catch (_) { /* мережа впала — лишаємось на резервних даних */ }
  }

  const map = {};
  rows.filter(b => b.costume === id).forEach(b => {
    let d = fromIso(b.from);
    const end = fromIso(b.to);
    while (d <= end) { map[iso(d)] = b.kind === "ship" ? "ship" : "rent"; d = addDays(d, 1); }
  });
  state.busy[id] = map;
}

const busyKind = d => (state.busy[state.costume] || {})[d] || null;

/* ============================================================
   КАЛЕНДАР
   ============================================================ */
function shipPad() { return state.ship ? (CFG.shippingDays || 0) : 0; }

/* Повний діапазон, який займає бронь: оренда + дні дороги з обох боків. */
function fullRange(from, to) {
  const pad = shipPad();
  return { start: iso(addDays(fromIso(from), -pad)), end: iso(addDays(fromIso(to), pad)) };
}

function rangeIsFree(from, to) {
  const { start, end } = fullRange(from, to);
  let d = fromIso(start);
  const last = fromIso(end);
  while (d <= last) { if (busyKind(iso(d))) return false; d = addDays(d, 1); }
  return true;
}

function renderCal() {
  const grid = $("#calGrid");
  const m = state.month;
  $("#calTitle").textContent = `${MONTHS[m.getMonth()]} ${m.getFullYear()}`;

  const now = today();
  const first = new Date(m.getFullYear(), m.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7;                       // понеділок перший
  const total = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();

  $("#calPrev").disabled = m.getFullYear() === now.getFullYear() && m.getMonth() === now.getMonth();

  let html = "";
  for (let i = 0; i < lead; i++) html += `<span class="day is-empty"></span>`;

  for (let n = 1; n <= total; n++) {
    const d = new Date(m.getFullYear(), m.getMonth(), n);
    const s = iso(d);
    const cls = ["day"];
    let dis = "";

    if (!state.costume || d < now) { dis = "disabled"; }
    else {
      const bk = busyKind(s);
      if (bk) { cls.push(bk === "ship" ? "is-busy is-shipbusy" : "is-busy"); dis = "disabled"; }
    }

    if (state.from && state.to) {
      const { start, end } = fullRange(state.from, state.to);
      if (s === state.from || s === state.to) cls.push("is-pick");
      else if (s > state.from && s < state.to) cls.push("is-mid");
      else if (s >= start && s <= end) cls.push("is-ship");
    } else if (state.from === s) cls.push("is-pick");

    html += `<button type="button" class="${cls.join(" ")}" data-d="${s}" ${dis}>${n}</button>`;
  }
  grid.innerHTML = html;

  $$("[data-d]", grid).forEach(b => b.addEventListener("click", () => pickDay(b.dataset.d)));

  $("#calHint").textContent = !state.costume
    ? "Оберіть костюм, щоб побачити вільні дати."
    : !state.from ? "Натисніть день початку оренди."
    : !state.to   ? "Тепер натисніть останній день. Один день = одна доба."
    : state.ship  ? "Фіолетовим позначені дні дороги Новою поштою — вони теж закріплені за вами."
                  : "Готово. Можна змінити, натиснувши іншу дату.";
}

function pickDay(s) {
  if (!state.costume) return;

  if (!state.from || (state.from && state.to)) {          // новий вибір
    state.from = s; state.to = null;
  } else if (s < state.from) {
    state.from = s;
  } else {
    if (!rangeIsFree(state.from, s)) {
      state.to = null;
      flash("У цьому проміжку є зайняті дні — оберіть інший.");
    } else state.to = s;
  }
  if (state.from && !state.to && !rangeIsFree(state.from, state.from)) state.from = null;
  renderCal(); renderSummary();
}

$("#calPrev").addEventListener("click", () => { state.month = new Date(state.month.getFullYear(), state.month.getMonth()-1, 1); renderCal(); });
$("#calNext").addEventListener("click", () => { state.month = new Date(state.month.getFullYear(), state.month.getMonth()+1, 1); renderCal(); });

$("#isShip").addEventListener("change", e => {
  state.ship = e.target.checked;
  $("#npWrap").hidden = !state.ship;
  if (state.from && state.to && !rangeIsFree(state.from, state.to)) {
    state.to = null;
    flash("З урахуванням дороги цей проміжок не вільний — оберіть інші дати.");
  }
  renderCal(); renderSummary();
});

/* ============================================================
   ПІДСУМОК
   ============================================================ */
function renderSummary() {
  const c = COSTUMES.find(x => x.id === state.costume);
  $("#sumCostume").textContent = c ? c.name : "—";

  if (state.from && state.to) {
    const days = daysBetween(state.from, state.to);
    $("#sumDates").textContent = `${human(state.from)} — ${human(state.to)}`;
    $("#sumDays").textContent = days;
    $("#sumPrice").textContent = `${days * c.price} ₴`;
  } else if (state.from) {
    $("#sumDates").textContent = `${human(state.from)} — ?`;
    $("#sumDays").textContent = "—";
    $("#sumPrice").textContent = "—";
  } else {
    $("#sumDates").textContent = "—";
    $("#sumDays").textContent = "—";
    $("#sumPrice").textContent = "—";
  }
}

/* ============================================================
   ВІДПРАВКА
   ============================================================ */
function flash(text, ok = false) {
  const el = $("#formMsg");
  el.textContent = text;
  el.className = "formmsg " + (ok ? "is-ok" : "is-bad");
}

/* Панель відправки: готовий текст заявки та вибір месенджера.
   У WhatsApp і Direct текст підставляється сам, у Telegram — з буфера. */
function showCopy(text) {
  let box = $("#copyBox");
  if (!box) {
    box = document.createElement("div");
    box.id = "copyBox";
    box.className = "copybox";

    const ways = [];
    if (CFG.whatsapp) ways.push(["WhatsApp", t => `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(t)}`]);
    if (CFG.telegram) ways.push(["Telegram", () => `https://t.me/${CFG.telegram}`]);
    ways.push(["Direct", () => `https://ig.me/m/${CFG.instagram}`]);
    if (CFG.viber) ways.push(["Viber", () => `viber://chat?number=${encodeURIComponent(CFG.viber)}`]);

    box.innerHTML = `
      <p class="copybox__t">Заявка готова:</p>
      <textarea readonly rows="7"></textarea>
      <div class="copybox__ways">${ways.map((w, i) =>
        `<button type="button" class="flink" data-way="${i}">${w[0]}</button>`).join("")}</div>
      <button type="button" class="btn btn--wide" data-copy>Скопіювати текст</button>`;
    $("#summary").appendChild(box);

    box.querySelectorAll("[data-way]").forEach(b => b.addEventListener("click", () => {
      const t = box.querySelector("textarea").value;
      window.open(ways[+b.dataset.way][1](t), "_blank", "noopener");
    }));
    box.querySelector("[data-copy]").addEventListener("click", async e => {
      try { await navigator.clipboard.writeText(box.querySelector("textarea").value); }
      catch (_) { box.querySelector("textarea").select(); document.execCommand("copy"); }
      e.target.textContent = "Скопійовано ✓";
      setTimeout(() => (e.target.textContent = "Скопіювати текст"), 2200);
    });
  }
  box.querySelector("textarea").value = text;
  box.hidden = false;
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function bookingText() {
  const c = COSTUMES.find(x => x.id === state.costume);
  const days = daysBetween(state.from, state.to);
  const lines = [
    "Бронювання з сайту",
    `Костюм: ${c.name}`,
    `Дати: ${state.from} — ${state.to} (${days} доб.)`,
    `Сума оренди: ${days * c.price} ₴`,
    `Ім'я: ${$("#fName").value.trim()}`,
    `Телефон: ${$("#fPhone").value.trim()}`,
    state.ship ? `Нова пошта: ${$("#fNp").value.trim() || "—"}` : "Самовивіз: Харків, Левада"
  ];
  const note = $("#fNote").value.trim();
  if (note) lines.push(`Коментар: ${note}`);
  return lines.join("\n");
}


$("#book").addEventListener("submit", async e => {
  e.preventDefault();

  const name = $("#fName"), phone = $("#fPhone");
  [name, phone].forEach(f => f.classList.remove("is-bad"));

  if (!state.costume)            return flash("Оберіть костюм.");
  if (!state.from || !state.to)  return flash("Оберіть дати оренди.");
  if (name.value.trim().length < 2) { name.classList.add("is-bad"); name.focus(); return flash("Вкажіть ім'я."); }
  if (phone.value.replace(/\D/g,"").length < 9) { phone.classList.add("is-bad"); phone.focus(); return flash("Вкажіть телефон."); }
  if (state.ship && !$("#fNp").value.trim())    return flash("Вкажіть місто й відділення Нової пошти.");

  const c = COSTUMES.find(x => x.id === state.costume);
  const days = daysBetween(state.from, state.to);
  const payload = {
    action: "book",
    costume: c.id, costumeName: c.name,
    from: state.from, to: state.to, days,
    price: days * c.price, deposit: CFG.pricing.deposit,
    ship: state.ship, shippingDays: shipPad(),
    np: state.ship ? $("#fNp").value.trim() : "",
    name: name.value.trim(), phone: phone.value.trim(),
    note: $("#fNote").value.trim(),
    createdAt: new Date().toISOString()
  };

  const btn = $("#submitBtn");
  btn.disabled = true; btn.textContent = "Надсилаємо…";

  if (!CFG.apiUrl) {                                   // резервний режим
    const text = bookingText();
    try { await navigator.clipboard.writeText(text); } catch (_) {}
    showCopy(text);
    btn.disabled = false; btn.textContent = "Забронювати";
    return flash("Заявка готова й уже скопійована. Оберіть, куди її надіслати — текст вставиться сам.", true);
  }

  try {
    const r = await fetch(CFG.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },   // без preflight
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "fail");

    delete state.busy[c.id];
    await loadBusy(c.id);
    state.from = state.to = null;
    $("#book").reset(); state.ship = false; $("#npWrap").hidden = true;
    renderCal(); renderSummary();
    flash("Бронь прийнято. Ми напишемо вам, щоб підтвердити й узгодити оплату.", true);
  } catch (_) {
    showCopy(bookingText());
    flash("Не вдалось надіслати автоматично — оберіть месенджер нижче.", true);
  } finally {
    btn.disabled = false; btn.textContent = "Забронювати";
  }
});

/* ============================================================
   ВІДГУКИ Й КОНТАКТИ
   ============================================================ */
function renderReviews() {
  const n = 6;
  $("#revs").innerHTML = Array.from({ length: n }, (_, i) =>
    `<figure class="rev"><img src="${IMG}rev_${i+1}.jpg" alt="Відгук клієнта" loading="lazy"
       onerror="this.closest('.rev').remove()"></figure>`).join("");
}

function renderFooter() {
  const links = [];
  if (CFG.phone)    links.push([`tel:${CFG.phone}`, "Подзвонити", CFG.phone]);
  if (CFG.telegram) links.push([`https://t.me/${CFG.telegram}`, "Telegram", "@" + CFG.telegram]);
  if (CFG.viber)    links.push([`viber://chat?number=${encodeURIComponent(CFG.viber)}`, "Viber", CFG.viber]);
  if (CFG.whatsapp) links.push([`https://wa.me/${CFG.whatsapp}`, "WhatsApp", "написати"]);
  links.push([`https://instagram.com/${CFG.instagram}`, "Instagram", "@" + CFG.instagram]);
  links.push([`https://threads.com/@${CFG.threads}`, "Threads", "@" + CFG.threads]);

  $("#footLinks").innerHTML = links.map(([href, label, val]) =>
    `<a class="flink" href="${href}" target="_blank" rel="noopener"><b>${label}</b><span>${val}</span></a>`).join("");
}

/* ============================================================
   ГЕРОЙ: карусель по всіх костюмах
   ============================================================ */
function heroStage() {
  const stage = $("#stage"), dots = $("#stageDots"), tag = $("#stageTag");
  if (!stage) return;

  stage.innerHTML = COSTUMES.map((c, i) =>
    `<img src="${c.photos[0]}" alt="${c.name}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}
       width="928" height="1160" class="${i ? "" : "is-on"}">`).join("");
  dots.innerHTML = COSTUMES.map((c, i) =>
    `<button type="button" class="${i ? "" : "is-on"}" data-go="${i}" aria-label="${c.name}"></button>`).join("");

  const imgs = $$("img", stage), btns = $$("button", dots);
  let i = 0, timer;

  const show = n => {
    i = (n + COSTUMES.length) % COSTUMES.length;
    imgs.forEach((el, k) => el.classList.toggle("is-on", k === i));
    btns.forEach((el, k) => el.classList.toggle("is-on", k === i));
    tag.textContent = `${COSTUMES[i].name} · ${COSTUMES[i].price} ₴`;
  };
  const play = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 3400); };

  btns.forEach(b => b.addEventListener("click", () => { show(+b.dataset.go); play(); }));
  stage.addEventListener("click", () => openModal(COSTUMES[i].id));
  show(0); play();
}

/* ============================================================
   СТАРТ
   ============================================================ */
heroStage();
renderCards();
renderPicks();
renderCal();
renderSummary();
renderReviews();
renderFooter();

const hdr = $("#hdr");
addEventListener("scroll", () => hdr.classList.toggle("is-stuck", scrollY > 12), { passive: true });

})();
