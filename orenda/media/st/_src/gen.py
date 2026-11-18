# Генератор стікерів «Облік»: один стиль для всіх костюмів
def grad(id,c1,c2,c3):
    return f'<radialGradient id="{id}" cx="35%" cy="28%" r="80%"><stop offset="0" stop-color="{c1}"/><stop offset=".5" stop-color="{c2}"/><stop offset="1" stop-color="{c3}"/></radialGradient>'
SKIN=grad('sk','#ffe6cf','#ffd2b0','#eeac83')
def defs(*g):return '<defs>'+SKIN+''.join(g)+'<linearGradient id="hl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>'
def svg(body):return f'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">{body}</svg>'
def face(cx=250,cy=176,hair='#5a3418',hairstyle='boy',mouth=True):
    h=''
    if hairstyle=='boy':h=f'<path d="M{cx-62} {cy-20} Q{cx-50} {cy-80} {cx} {cy-78} Q{cx+56} {cy-80} {cx+64} {cy-16} Q{cx+40} {cy-50} {cx} {cy-46} Q{cx-36} {cy-52} {cx-62} {cy-20} Z" fill="{hair}"/>'
    elif hairstyle=='girl':h=f'<path d="M{cx-66} {cy+50} Q{cx-80} {cy-80} {cx} {cy-80} Q{cx+80} {cy-80} {cx+66} {cy+50} Q{cx+58} {cy-30} {cx} {cy-46} Q{cx-58} {cy-30} {cx-66} {cy+50} Z" fill="{hair}"/>'
    elif hairstyle=='none':h=''
    elif hairstyle=='hood':h=f'<path d="M{cx-50} {cy-26} Q{cx-20} {cy-58} {cx} {cy-56} Q{cx+26} {cy-58} {cx+52} {cy-24} Q{cx+26} {cy-40} {cx} {cy-38} Q{cx-24} {cy-40} {cx-50} {cy-26} Z" fill="{hair}"/>'
    m=f'<path d="M{cx-14} {cy+26} Q{cx} {cy+42} {cx+14} {cy+26} Q{cx} {cy+33} {cx-14} {cy+26} Z" fill="#b8323f" stroke="#86202c" stroke-width="2"/>' if mouth else ''
    return (f'<ellipse cx="{cx}" cy="{cy}" rx="58" ry="54" fill="url(#sk)"/>'+h+
     f'<ellipse cx="{cx-22}" cy="{cy+2}" rx="10" ry="12" fill="#3b2412"/><ellipse cx="{cx+22}" cy="{cy+2}" rx="10" ry="12" fill="#3b2412"/>'
     f'<circle cx="{cx-19}" cy="{cy-2}" r="4" fill="#fff"/><circle cx="{cx+25}" cy="{cy-2}" r="4" fill="#fff"/>'
     f'<ellipse cx="{cx-38}" cy="{cy+22}" rx="10" ry="6" fill="#ff8f86" opacity=".55"/><ellipse cx="{cx+38}" cy="{cy+22}" rx="10" ry="6" fill="#ff8f86" opacity=".55"/>'+m)
def shine(x,y,rx=34,ry=13,rot=-25):return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="url(#hl)" transform="rotate({rot} {x} {y})"/>'
O=lambda c:f'stroke="{c}" stroke-width="3" stroke-linejoin="round"'
def suit_kid(main,dark,legs=None,ldark=None,boots=None,bdark=None,glove=None,gdark=None,extra_back='',extra_front='',head='',belt=''):
    legs=legs or main;ldark=ldark or dark;boots=boots or 'url(#bt)';glove=glove or main;gdark=gdark or dark
    return (extra_back+
     f'<path d="M206 380 v50 q0 16 -16 16 h-30 q-12 0 -10 -12 q4 -14 22 -16 v-38 z" fill="{boots}" {O(bdark or "#111")}/>'
     f'<path d="M294 380 v50 q0 16 16 16 h30 q12 0 10 -12 q-4 -14 -22 -16 v-38 z" fill="{boots}" {O(bdark or "#111")}/>'
     f'<path d="M196 300 L192 400 Q192 410 214 410 L238 410 L250 340 L262 410 L286 410 Q308 410 308 400 L304 300 Z" fill="{legs}" {O(ldark)}/>'
     f'<path d="M180 252 Q176 230 214 222 L286 222 Q324 230 320 252 L318 330 Q318 346 296 346 L204 346 Q182 346 182 330 Z" fill="{main}" {O(dark)}/>'
     f'<path d="M184 242 Q150 214 140 172 Q150 156 166 170 Q176 206 202 228 Z" fill="{main}" {O(dark)}/>'
     f'<ellipse cx="150" cy="158" rx="17" ry="20" fill="{glove}" {O(gdark)}/>'
     f'<path d="M316 246 Q344 276 340 318 Q328 326 318 312 Q318 284 300 262 Z" fill="{main}" {O(dark)}/>'
     f'<ellipse cx="332" cy="322" rx="15" ry="17" fill="{glove}" {O(gdark)}/>'
     +belt+extra_front+head)
COMMON=defs(grad('bt','#4a4a4a','#262626','#0c0c0c'))
P={}
# --- Павук: чорно-червоний костюм-маска з павутиною
web=''.join(f'<path d="M250 {176} L{250+int(90*__import__("math").cos(a))} {176+int(90*__import__("math").sin(a))}" stroke="#2a0a0a" stroke-width="2" opacity=".55"/>' for a in [i*0.785 for i in range(8)])
P['pavuk']=svg(defs(grad('m','#ff6b6b','#e0202e','#8f0c16'),grad('k','#555','#262626','#0b0b0b'),grad('bt','#ff6b6b','#e0202e','#8f0c16'))+
 suit_kid('url(#k)','#000',boots='url(#bt)',bdark='#5a0a10',glove='url(#m)',gdark='#5a0a10',
  belt='<path d="M232 236 l18 30 l18 -30 l-18 10 z" fill="#e0202e"/><path d="M196 300 L304 300 L300 312 L200 312 Z" fill="#e0202e" opacity=".9"/>',
  head='<ellipse cx="250" cy="170" rx="74" ry="72" fill="url(#k)" stroke="#000" stroke-width="3"/>'
  '<g stroke="#e0202e" stroke-width="2.2" fill="none" opacity=".9"><path d="M250 98 V242 M176 170 H324 M198 118 L302 222 M302 118 L198 222"/><ellipse cx="250" cy="170" rx="30" ry="28"/><ellipse cx="250" cy="170" rx="54" ry="52"/></g>'
  '<path d="M196 160 Q214 130 242 156 Q234 192 200 182 Z" fill="#fff" stroke="#000" stroke-width="5"/><path d="M304 160 Q286 130 258 156 Q266 192 300 182 Z" fill="#fff" stroke="#000" stroke-width="5"/>'+shine(212,124)))
# --- Бетмен: темно-фіолетовий, маска з вушками, плащ, жовтий пояс
P['batman']=svg(defs(grad('m','#8d6bd8','#4b2f8f','#24154d'),grad('c','#5a4a7a','#2a1f45','#120c20'),grad('bt','#4a4a4a','#262626','#0c0c0c'),grad('y','#fff2a0','#f2c230','#b8860b'))+
 suit_kid('url(#m)','#1a0f36',glove='url(#c)',gdark='#120c20',
  extra_back='<path d="M190 226 Q130 330 150 420 Q200 400 250 420 Q300 400 350 420 Q370 330 310 226 Z" fill="url(#c)" stroke="#0c0716" stroke-width="3"/>',
  belt='<rect x="186" y="292" width="128" height="18" rx="6" fill="url(#y)" stroke="#8a6a08" stroke-width="2"/><path d="M228 252 q8 -10 22 -4 q14 -6 22 4 q-8 0 -10 8 q-12 -6 -24 0 q-2 -8 -10 -8 z" fill="#111"/>',
  head=face(hairstyle='none')+'<path d="M190 176 Q186 112 214 100 L206 62 L234 94 Q250 88 266 94 L294 62 L286 100 Q314 112 310 176 Q290 168 272 174 Q262 160 250 160 Q238 160 228 174 Q210 168 190 176 Z" fill="url(#c)" stroke="#0c0716" stroke-width="3"/>'
  '<path d="M210 168 Q226 158 240 170" stroke="#fff" stroke-width="4" fill="none" opacity=".0"/>'+shine(226,108,26,10)))
# --- Охоронець: рожевий комбінезон з капюшоном, чорна маска з колом
P['guard']=svg(defs(grad('m','#ff9cc4','#f2457f','#a8174b'),grad('k','#4a4a4a','#1c1c1c','#050505'),grad('bt','#4a4a4a','#262626','#0c0c0c'))+
 suit_kid('url(#m)','#7a0f36',glove='url(#k)',gdark='#000',
  belt='<rect x="184" y="292" width="132" height="14" rx="6" fill="#1c1c1c"/><path d="M250 226 V340" stroke="#a8174b" stroke-width="3"/>',
  head='<path d="M172 186 Q164 92 250 88 Q336 92 328 186 Q330 250 250 254 Q170 250 172 186 Z" fill="url(#m)" stroke="#7a0f36" stroke-width="3"/>'
  '<ellipse cx="250" cy="178" rx="58" ry="62" fill="url(#k)" stroke="#000" stroke-width="3"/><circle cx="250" cy="176" r="28" fill="none" stroke="#fff" stroke-width="7"/>'+shine(212,112)+shine(232,140,18,7,-30)))
# --- Біомеханіка: дівчинка в біло-сріблястому костюмі
P['biomeh']=svg(defs(grad('m','#ffffff','#e3e6ee','#a9afbf'),grad('g','#c9cfdc','#8d95a8','#5a6275'),grad('bt','#ffffff','#d8dce6','#9aa1b2'))+
 suit_kid('url(#m)','#7d8496',boots='url(#bt)',bdark='#7d8496',glove='url(#g)',gdark='#4a5164',
  belt='<g fill="url(#g)" stroke="#4a5164" stroke-width="2"><path d="M212 236 h76 l-8 22 h-60 z"/><rect x="226" y="268" width="48" height="22" rx="6"/><rect x="226" y="296" width="48" height="22" rx="6"/><rect x="200" y="340" width="20" height="44" rx="8"/><rect x="280" y="340" width="20" height="44" rx="8"/></g><circle cx="250" cy="246" r="7" fill="#7fd8ff"/>',
  head=face(hair='#3b2414',hairstyle='girl')+shine(226,128,24,9)))
# --- Супермен
P['superman']=svg(defs(grad('m','#7ea6ff','#2f5ee0','#163591'),grad('r','#ff7a74','#e3262e','#9c0f17'),grad('y','#fff2a0','#f2c230','#b8860b'))+
 suit_kid('url(#m)','#0f2468',boots='url(#r)',bdark='#6a0a10',
  extra_back='<path d="M196 226 Q140 330 160 420 Q250 400 340 420 Q360 330 304 226 Z" fill="url(#r)" stroke="#6a0a10" stroke-width="3"/>',
  belt='<rect x="186" y="292" width="128" height="16" rx="6" fill="url(#y)" stroke="#8a6a08" stroke-width="2"/><path d="M226 242 h48 l10 12 l-34 34 l-34 -34 z" fill="url(#r)" stroke="url(#y)" stroke-width="4"/>',
  head=face(hair='#1b1b22')))
# --- Щур (надувний): сірий капюшон з вушками, обличчя в отворі
def inflatable(main,dark,belly,bdark,top='',back='',front='',rim=None,teeth=False):
    rim=rim or main
    t=''
    if teeth:t='<g fill="#fff" stroke="#c8c8c8" stroke-width="1.5">'+''.join(f'<path d="M{x} {y} l{dx} {dy} l{ex} {ey} z"/>' for x,y,dx,dy,ex,ey in [(190,150,14,2,-6,13),(206,124,13,9,-10,9),(230,110,11,12,-13,4),(250,106,9,14,-15,0),(272,110,2,16,-13,-4),(294,124,-2,17,-11,-8),(310,150,-7,15,-7,-12),(196,212,13,-3,-4,13),(304,212,-13,-3,4,13)])+'</g>'
    return (back+
     f'<path d="M190 380 v52 q0 14 22 14 h24 q12 0 12 -14 v-52 z" fill="{main}" {O(dark)}/><path d="M252 380 v52 q0 14 12 14 h24 q22 0 22 -14 v-52 z" fill="{main}" {O(dark)}/>'
     f'<ellipse cx="250" cy="300" rx="112" ry="108" fill="{main}" {O(dark)}/>'
     f'<ellipse cx="250" cy="318" rx="68" ry="76" fill="{belly}" stroke="{bdark}" stroke-width="2"/>'
     f'<path d="M146 276 Q108 246 112 214 Q128 206 140 228 Q150 252 170 262 Z" fill="{main}" {O(dark)}/>'
     f'<path d="M352 268 Q384 284 388 306 Q374 314 362 298 Q352 290 342 288 Z" fill="{main}" {O(dark)}/>'
     f'<path d="M148 168 Q148 52 250 50 Q352 52 352 168 Q352 254 250 256 Q148 254 148 168 Z" fill="{main}" {O(dark)}/>'
     +top+f'<ellipse cx="250" cy="174" rx="78" ry="68" fill="{rim}" {O(dark)}/>'+face(cy=180,hairstyle='hood')+t+front+shine(196,86)+'<ellipse cx="184" cy="272" rx="20" ry="38" fill="#fff" opacity=".22"/>')
P['rat']=svg(defs(grad('m','#d9dbe2','#9a9ea9','#5f636e'),grad('b','#fff3e6','#ead6c0','#c9ab8c'),grad('pk','#ffd0d6','#f59bab','#d0627a'))+
 inflatable('url(#m)','#4a4e58','url(#b)','#b8987a',
  back='<path d="M336 370 Q430 370 440 300 Q452 290 456 304 Q448 392 340 404 Z" fill="url(#pk)" stroke="#a84a5e" stroke-width="3"/>',
  top='<circle cx="168" cy="76" r="40" fill="url(#m)" stroke="#4a4e58" stroke-width="3"/><circle cx="168" cy="76" r="24" fill="url(#pk)"/><circle cx="332" cy="76" r="40" fill="url(#m)" stroke="#4a4e58" stroke-width="3"/><circle cx="332" cy="76" r="24" fill="url(#pk)"/>'
  '<ellipse cx="250" cy="96" rx="20" ry="14" fill="url(#pk)" stroke="#a84a5e" stroke-width="2"/><g stroke="#4a4e58" stroke-width="2"><path d="M222 100 h-36 M222 108 h-32 M278 100 h36 M278 108 h32"/></g>',
  rim='#7a7e89'))
def shark(main,dark,c1,c2,c3,skel=False):
    g=defs(grad('m',c1,c2,c3),grad('b','#ffffff','#f1f2f5','#c9ccd6'))
    fin='<path d="M330 120 Q392 96 404 70 Q406 150 352 196 Z" fill="url(#m)" stroke="'+dark+'" stroke-width="3"/>'
    tail='<path d="M334 372 Q410 380 440 330 Q452 380 418 400 Q446 420 440 446 Q400 420 338 410 Z" fill="url(#m)" stroke="'+dark+'" stroke-width="3"/>'
    eyes='<circle cx="196" cy="112" r="11" fill="#111"/><circle cx="304" cy="112" r="11" fill="#111"/><circle cx="199" cy="109" r="4" fill="#fff"/><circle cx="307" cy="109" r="4" fill="#fff"/>'
    belly='url(#b)';bd='#b9bcc8'
    front=''
    if skel:
        belly='#1b1b1f';bd='#000'
        front=('<g stroke="#f4f4f0" stroke-width="7" stroke-linecap="round" fill="none"><path d="M250 268 V368"/>'+''.join(f'<path d="M250 {y} Q{250-w} {y+4} {250-w-6} {y+16} M250 {y} Q{250+w} {y+4} {250+w+6} {y+16}"/>' for y,w in [(272,40),(294,44),(316,40),(338,32)])+
               '</g><path d="M212 372 q38 -16 76 0 q-10 26 -38 22 q-28 4 -38 -22 z" fill="#f4f4f0"/><circle cx="236" cy="380" r="6" fill="#1b1b1f"/><circle cx="264" cy="380" r="6" fill="#1b1b1f"/>'
               '<circle cx="196" cy="112" r="16" fill="#fff"/><circle cx="304" cy="112" r="16" fill="#fff"/>')
    return svg(g+inflatable('url(#m)',dark,belly,bd,back=fin+tail,top=eyes+'<g stroke="'+dark+'" stroke-width="3" fill="none" opacity=".7"><path d="M340 172 q10 10 4 24 M334 186 q10 10 4 24"/></g>',rim='url(#m)',teeth=True,front=front))
P['shark_pink']=shark('#f05a9a','#9c2a5c','#ffc2dc','#f472ad','#b8326f')
P['shark_blue']=shark('#4fb3f0','#1d5f8f','#c6ecff','#5fbdf2','#2a74ad')
P['shark_skeleton']=shark('#333','#000','#6a6a72','#2a2a30','#0b0b0e',skel=True)
import os
os.makedirs('svg',exist_ok=True)
for k,v in P.items():open(f'svg/{k}.svg','w').write(v)
print(' '.join(P))
