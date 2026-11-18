const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:500,height:500}});
for(const f of fs.readdirSync(''+__dirname+'/svg')){const n=f.replace('.svg','');await p.setContent('<html><body style="margin:0;background:transparent">'+fs.readFileSync(''+__dirname+'/svg/'+f,'utf8')+'</body></html>');await p.screenshot({path:''+__dirname+'/raw_'+n+'.png',omitBackground:true,clip:{x:0,y:0,width:500,height:500}})}
await b.close()})();
