const {chromium}=require('playwright');const path=require('path');
const OUT='/home/user/event-marketing/assets/';
(async()=>{
 const b=await chromium.launch();
 const src=await b.newPage();await src.goto('file:///home/user/event-marketing/index.html');await src.waitForTimeout(500);
 const data=await src.evaluate(()=>{IMG=false;const o={artists:[],venues:[],rivals:[],staff:[],merch:[]};
  const inner=h=>h.slice(h.indexOf('<svg'),h.lastIndexOf('</svg>')+6);
  ARTISTS.forEach(a=>{o.artists.push({id:a.id,c:a.c,full:artistArt(a),cut:`<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">${artistDecor(a)}${artistFigs(a)}</svg>`});MERCH.forEach(m=>o.merch.push({a:a.id,m:m.id,svg:merchArt(m.id,a,128)}));});
  VENUES.forEach(v=>o.venues.push({id:v.id,svg:venueArt(v)}));
  RIVALS0.forEach((r,i)=>o.rivals.push({i,c:r.c,svg:inner(rivalAva(r,256))}));
  STAFF.forEach(s=>o.staff.push({id:s.id,c:s.f.out,svg:inner(staffAva(s,256))}));
  o.coach=inner(coachAva(256));o.player=inner(playerAva(256));return o;});
 await src.close();
 const pg=await b.newPage({viewport:{width:900,height:600},deviceScaleFactor:1});
 const grain=`<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:.10;mix-blend-mode:overlay"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
 const vign=`<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 45%,rgba(10,4,14,.55) 100%)"></div>`;
 const bokeh=(n,seed)=>{let h='';let r=seed;const rnd=()=>(r=(r*9301+49297)%233280)/233280;for(let i=0;i<n;i++){const x=rnd()*100,y=rnd()*70,s=20+rnd()*70,o=.06+rnd()*.14;h+=`<div style="position:absolute;left:${x}%;top:${y}%;width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,${o}) 0%,rgba(255,255,255,0) 70%);mix-blend-mode:screen"></div>`;}return h;};
 const shot=async(html,w,h,file,transparent)=>{await pg.setContent(`<html><body style="margin:0;background:${transparent?'transparent':'#150c1b'}"><div id="x" style="width:${w}px;height:${h}px;position:relative;overflow:hidden">${html}</div></body></html>`);await pg.waitForTimeout(40);await (await pg.$('#x')).screenshot({path:OUT+file,omitBackground:!!transparent});};
 const fit=s=>s.replace('<svg ','<svg style="position:absolute;inset:0;width:100%;height:100%" ');
 let n=0;
 for(const [k,a] of data.artists.entries()){
  await shot(fit(a.full)+bokeh(14,k*7+3)+`<div style="position:absolute;left:0;right:0;bottom:0;height:22%;background:linear-gradient(0deg,rgba(0,0,0,.45),transparent)"></div>`+vign+grain,800,480,`artist-${a.id}.png`);
  await shot(fit(a.cut).replace('<svg style="','<svg style="filter:drop-shadow(0 4px 8px rgba(0,0,0,.5));'),800,480,`artist-${a.id}-cut.png`,true);n+=2;}
 for(const v of data.venues){await shot(fit(v.svg)+vign+grain,800,400,`venue-${v.id}.png`);n++;}
 const port=(svg0,c)=>{const svg=svg0.replace('viewBox="25 14 50 50"','viewBox="14 18 72 72"').replace(/<rect[^>]*opacity="\.[0-9]+"\/>/,'');return `<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 35%,${c},#1a0f20 85%)"></div>`+fit(svg)+`<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,transparent 55%,rgba(10,4,14,.5) 100%)"></div>`+grain;};
 for(const r of data.rivals){await shot(port(r.svg,r.c),256,256,`rival-${r.i}.png`);n++;}
 for(const s of data.staff){await shot(port(s.svg,s.c),256,256,`staff-${s.id}.png`);n++;}
 await shot(port(data.coach,'#7a5a2a'),256,256,'coach.png');await shot(port(data.player,'#2a4f9a'),256,256,'player.png');n+=2;
 for(const m of data.merch){await shot(m.svg.replace('<svg ','<svg style="position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 3px 5px rgba(0,0,0,.5))" ').replace(/width="128" height="128"/,''),128,128,`merch-${m.a}-${m.m}.png`,true);n++;}
 console.log('exported',n);await b.close();
})();
