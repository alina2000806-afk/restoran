import glob,os
from PIL import Image, ImageFilter
names=[]
for f in sorted(glob.glob('/tmp/st/gen/raw_*.png')):
    n=os.path.basename(f)[4:-4];names.append(n)
    im=Image.open(f).convert('RGBA');bb=im.getbbox();im=im.crop(bb);s=max(im.size)
    c=Image.new('RGBA',(s,s),(0,0,0,0));c.paste(im,((s-im.size[0])//2,(s-im.size[1])//2))
    c=c.resize((430,430),Image.LANCZOS);fr=Image.new('RGBA',(500,500),(0,0,0,0));fr.paste(c,(35,35))
    al=fr.getchannel('A').filter(ImageFilter.MaxFilter(17)).filter(ImageFilter.GaussianBlur(1.5))
    w=Image.new('RGBA',(500,500),(255,255,255,0));w.putalpha(al);w.alpha_composite(fr);w.save(f'/tmp/st/gen/out_{n}.png')
cols=4;rows=(len(names)+cols-1)//cols
pv=Image.new('RGBA',(cols*300,rows*300),(255,240,210,255))
for i,n in enumerate(names):
    pv.alpha_composite(Image.open(f'/tmp/st/gen/out_{n}.png').resize((300,300),Image.LANCZOS),((i%cols)*300,(i//cols)*300))
pv.save('/tmp/st/gen/sheet.png');print(names)
