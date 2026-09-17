const PHONE = "+380966958712";
const PHONE_DISPLAY = "096 695 87 12";
const TG_USER = "a_kovtyn";

function buildMessage(costume, date){
  const d = date ? new Date(date).toLocaleDateString('uk-UA', {day:'2-digit', month:'2-digit', year:'numeric'}) : "уточнити дату";
  return `Вітаю! Хочу орендувати костюм «${costume}» на ${d}. Підкажіть, будь ласка, чи вільний він?`;
}

function openModal(costumeName){
  const overlay = document.getElementById('bookingModal');
  const select = document.getElementById('costumeSelect');
  if(costumeName){ select.value = costumeName; }
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  updateLinks();
}

function closeModal(){
  document.getElementById('bookingModal').classList.remove('open');
  document.body.style.overflow = '';
}

function updateLinks(){
  const costume = document.getElementById('costumeSelect').value;
  const date = document.getElementById('dateInput').value;
  const msg = buildMessage(costume, date);
  const enc = encodeURIComponent(msg);

  document.getElementById('viberBtn').href = `viber://chat?number=%2B380966958712`;
  document.getElementById('tgBtn').href = `https://t.me/${TG_USER}?text=${enc}`;
  document.getElementById('callBtn').href = `tel:${PHONE}`;
  document.getElementById('msgPreview').textContent = msg;
}

function copyMessage(){
  const text = document.getElementById('msgPreview').textContent;
  navigator.clipboard.writeText(text).then(()=>{
    const b = document.getElementById('copyBtn');
    const old = b.textContent;
    b.textContent = 'Скопійовано ✓';
    setTimeout(()=>{ b.textContent = old; }, 1800);
  }).catch(()=>{});
}

function switchThumb(cardId, index){
  const card = document.getElementById(cardId);
  const items = card.querySelectorAll('[data-media]');
  const thumbs = card.querySelectorAll('.thumbs button');
  items.forEach((el,i)=>{
    el.style.display = i===index ? 'block' : 'none';
    if(el.tagName === 'VIDEO'){
      if(i===index){ el.play().catch(()=>{}); } else { el.pause(); }
    }
  });
  thumbs.forEach((t,i)=> t.classList.toggle('active', i===index));
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[data-book]').forEach(btn=>{
    btn.addEventListener('click', ()=> openModal(btn.getAttribute('data-book')));
  });
  document.getElementById('costumeSelect').addEventListener('change', updateLinks);
  document.getElementById('dateInput').addEventListener('change', updateLinks);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('bookingModal').addEventListener('click', (e)=>{
    if(e.target.id === 'bookingModal') closeModal();
  });
  document.getElementById('copyBtn').addEventListener('click', copyMessage);

  // autoplay first video-first cards when visible
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const v = entry.target;
      if(entry.isIntersecting){ v.play().catch(()=>{}); }
      else { v.pause(); }
    });
  }, {threshold:.4});
  document.querySelectorAll('.media-frame video').forEach(v=> observer.observe(v));
});
