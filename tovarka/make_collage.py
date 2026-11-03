import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps
D=sys.argv[1]; OUT=sys.argv[2]
F="/usr/share/fonts/opentype/inter/"
def font(n,s): return ImageFont.truetype(F+n,s)

def clean(im):
    a=np.array(im); al=a[...,3]
    al[al<40]=0
    im=Image.fromarray(a); return im.crop(im.getbbox())

def recolor(im, hue_rgb, strength=0.75):
    a=np.array(im).astype(float)
    rgb=a[...,:3]/255; al=a[...,3]
    mx=rgb.max(-1); mn=rgb.min(-1); sat=(mx-mn)/(mx+1e-6)
    lum=rgb.mean(-1)
    # grey body: low saturation, not white belly, not dark seams
    mask=((sat<0.18)&(lum>0.25)&(lum<0.80)).astype(float)
    mask=np.array(Image.fromarray((mask*255).astype('uint8')).filter(ImageFilter.GaussianBlur(2)))/255.0
    tint=np.array(hue_rgb)/255.0
    col=np.clip(tint*(lum[...,None]/0.55),0,1)
    out=rgb*(1-mask[...,None]*strength)+col*(mask[...,None]*strength)
    o=np.dstack([np.clip(out*255,0,255),al]).astype('uint8')
    return Image.fromarray(o)

rat=clean(Image.open(f"{D}/rat_g.png").convert('RGBA'))
shark=clean(Image.open(f"{D}/shark_s.png").convert('RGBA'))
skel=clean(Image.open("/home/user/restoran/akula/shark_a.webp").convert('RGBA'))
blue=recolor(shark,(70,150,230)); pink=recolor(shark,(245,120,175))

W,H=1080,1350
bg=Image.new('RGB',(W,H))
top=np.array([238,233,224]); bot=np.array([214,206,194])
g=np.linspace(0,1,H)[:,None]
arr=(top*(1-g)+bot*g)[:,None,:].repeat(W,1)
bg=Image.fromarray(arr.astype('uint8')).convert('RGBA')
d=ImageDraw.Draw(bg)
# floor
d.rectangle([0,700,W,H],fill=(205,196,183,255))

def place(im,h,cx,base,flip=False):
    im=im.resize((int(im.width*h/im.height),h),Image.LANCZOS)
    if flip: im=ImageOps.mirror(im)
    # shadow
    sh=Image.new('RGBA',bg.size,(0,0,0,0)); sd=ImageDraw.Draw(sh)
    w=int(im.width*0.75); sd.ellipse([cx-w//2,base-16,cx+w//2,base+16],fill=(60,45,30,110))
    sh=sh.filter(ImageFilter.GaussianBlur(10)); bg.alpha_composite(sh)
    bg.alpha_composite(im,(int(cx-im.width/2),int(base-im.height)))

# back row: 5 rats
for i,(cx,fl) in enumerate([(130,False),(325,True),(540,False),(755,True),(950,False)]):
    place(rat,500,cx,810,fl)
# front row sharks
place(blue,480,115,1150,False)
place(pink,480,325,1160,True)
place(skel,520,540,1165,False)
place(pink,480,755,1160,False)
place(blue,480,965,1150,True)

d=ImageDraw.Draw(bg)
ink=(28,24,20,255); acc=(214,72,40,255)
d.text((W//2,64),"ОРЕНДА НАДУВНИХ КОСТЮМІВ",font=font("InterDisplay-Black.otf",62),fill=ink,anchor="mm")
d.text((W//2,128),"Харків · по Україні Новою поштою",font=font("Inter-SemiBold.otf",34),fill=(90,80,70,255),anchor="mm")
d.text((W//2,182),"5 щурів · 4 акули · акула-скелет",font=font("InterDisplay-Bold.otf",38),fill=acc,anchor="mm")
# bottom band
d.rectangle([0,1180,W,H],fill=(28,24,20,255))
d.text((W//2,1228),"250 ₴ / доба · можна взяти компанією",font=font("InterDisplay-ExtraBold.otf",44),fill=(255,255,255,255),anchor="mm")
d.text((W//2,1294),"Дзвоніть або Viber: 096 695 87 12",font=font("InterDisplay-Black.otf",50),fill=(255,170,60,255),anchor="mm")
bg.convert('RGB').save(OUT,quality=92)
