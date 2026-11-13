// 9148 / Street paintings. Original procedural illustration, no image assets.
// Each neighborhood has its own light, pigment, landmark and architectural
// language. Bake once: all movement remains in the 3D scene.
export const STREETS = ['washington-square', 'dumbo', 'soho', 'coney-island'];
const W = 2048, H = 1024, HOR = 563, TAU = Math.PI * 2;
export const STREET_ART = {
  'washington-square': {
    sky: ['#183b60', '#6c9baa', '#ffd39b'], haze:'#fbd0a0',
    ground:'#c78b68', ink:'#313b4d', shade:'#725b68',
    bright:'#ffe9c1', accents:['#f7a44c','#ffcf7a','#4c8b80'], sun:[1640,205,104]
  },
  dumbo: {
    sky:['#434f83','#94a9c2','#ffe0c3'], haze:'#e3b5ad',
    ground:'#737e86', ink:'#28374e', shade:'#855c68',
    bright:'#fce0b7', accents:['#e9a486','#edd8b8','#75b8b6'], sun:[320,180,76]
  },
  soho: {
    sky:['#302e63','#805678','#f0a67e'], haze:'#eea58a',
    ground:'#58516b', ink:'#242739', shade:'#5d425e',
    bright:'#ffddac', accents:['#f28d75','#e8c083','#7eb8ab'], sun:[1530,285,90]
  },
  'coney-island': {
    sky:['#121f40','#28385e','#72586d'], haze:'#80627d',
    ground:'#70566a', ink:'#172740', shade:'#483e60',
    bright:'#ffe5a4', accents:['#ff8579','#ffd16f','#55c7b3'], sun:[1830,155,55]
  }
};
function random(seed) {
  let a=seed>>>0;
  return () => {
    a=(a+0x6d2b79f5) | 0;
    let t=Math.imul(a^(a>>>15),1|a);
    t=(t+Math.imul(t^(t>>>7),61|t))^t;
    return ((t^(t>>>14))>>>0)/4294967296;
  };
}
function canvas() { const c=document.createElement('canvas'); c.width=W; c.height=H; return c; }
function rect(g,x,y,w,h,c) { g.fillStyle=c; g.fillRect(x,y,w,h); }
function path(g,pts,fill,stroke,width=2) {
  g.beginPath(); g.moveTo(pts[0][0],pts[0][1]);
  for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);
  g.closePath();
  if(fill){g.fillStyle=fill;g.fill();}
  if(stroke){g.strokeStyle=stroke;g.lineWidth=width;g.stroke();}
}
function line(g,x1,y1,x2,y2,c,w=3,a=1) {
  g.save();g.globalAlpha=a;g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';
  g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();g.restore();
}
function disc(g,x,y,rx,ry,color,a=1) {
  g.save();g.globalAlpha=a;g.fillStyle=color;g.beginPath();
  g.ellipse(x,y,rx,ry,0,0,TAU);g.fill();g.restore();
}
function brush(g,x,y,dx,dy,c,w=4,a=.55) {
  line(g,x-dx*.5,y-dy*.5,x+dx*.5,y+dy*.5,c,w,a);
}
function paintSky(g,p,r) {
  const grad=g.createLinearGradient(0,0,0,HOR);
  grad.addColorStop(0,p.sky[0]);grad.addColorStop(.57,p.sky[1]);grad.addColorStop(1,p.sky[2]);
  rect(g,0,0,W,HOR,grad);
  // Broad atmospheric bands have irregular hand-painted edges, never noise.
  for(let i=0;i<15;i++){
    const yy=65+i*35+(r()-.5)*24;
    const x=r()*W, width=180+r()*440;
    line(g,x-width*.5,yy,x+width*.5,yy+(r()-.5)*18,
      i>9?p.sky[2]:p.sky[1],6+r()*15,.07+r()*.13);
  }
  const [sx,sy,sr]=p.sun;
  disc(g,sx,sy,sr*2.4,sr*2.4,p.bright,.055);
  disc(g,sx,sy,sr*1.45,sr*1.45,p.bright,.11);
  disc(g,sx,sy,sr,sr,p.bright,.9);
  for(let i=0;i<24;i++){
    const x=r()*W,y=65+r()*320,length=45+r()*220;
    brush(g,x,y,length,8*(r()-.5),r()>.5?p.bright:p.haze,2+r()*6,.08+r()*.12);
  }
}
function skyline(g,p,r,yBase=HOR) {
  // Two subdued distant layers create depth without stealing the subject.
  for(const [layer,height,ink] of [[0,165,p.sky[1]],[1,120,p.shade]]) {
    g.save();g.globalAlpha=layer===0?.42:.38;
    for(let x=-20;x<W;){
      const w=40+r()*85,h=24+r()*height;
      rect(g,x,yBase-h,w+2,h,ink);
      if(r()>.78)rect(g,x+w*.44,yBase-h-10,4,11,ink);
      x+=w-1;
    }
    g.restore();
  }
}
function windows(g,x,y,w,h,p,r,columns=3,rows=4,arched=false) {
  const margin=19, gapX=(w-2*margin)/columns, gapY=(h-38)/rows;
  for(let row=0;row<rows;row++)for(let col=0;col<columns;col++){
    const ww=Math.min(31,gapX*.44),hh=Math.min(44,gapY*.59);
    const xx=x+margin+col*gapX+(gapX-ww)*.5;
    const yy=y+22+row*gapY;
    const lit=r()>.49;
    rect(g,xx-3,yy-3,ww+6,hh+6,p.ink);
    rect(g,xx,yy,ww,hh,lit?p.bright:p.sky[0]);
    if(arched){
      disc(g,xx+ww*.5,yy+2,ww*.5,8,lit?p.bright:p.sky[0]);
      rect(g,xx,yy+1,ww,7,lit?p.bright:p.sky[0]);
    }
    line(g,xx+ww*.5,yy+4,xx+ww*.5,yy+hh-3,p.shade,2,.8);
    if(lit)line(g,xx+4,yy+4,xx+ww-5,yy+4,'#ffffff',2,.26);
  }
}
function facade(g,x,top,w,p,r,opts={}) {
  const h=HOR-top, base=opts.base||p.shade, dark=opts.dark||p.ink;
  rect(g,x,top,w,h,base);
  path(g,[[x,top],[x+14,top-14],[x+w+11,top-14],[x+w,top]],dark);
  rect(g,x,top+8,w,6,dark);
  rect(g,x,top+h*.46,w,5,dark);
  rect(g,x+w-15,top,15,h,dark);
  rect(g,x+8,top,5,h,p.bright);
  g.save();g.globalAlpha=.24;rect(g,x+20,top+18,w*.18,h-24,p.bright);g.restore();
  if(w>110)windows(g,x,top+30,w,h-52,p,r,Math.max(2,Math.round(w/85)),
    opts.rows||3,opts.arched||false);
  if(opts.awning){
    rect(g,x, HOR-78,w,15,dark);
    for(let a=0;a<Math.floor(w/26);a++){
      rect(g,x+a*26,HOR-63,25,31,a%2?p.bright:opts.awning);
    }
  }
}
function tree(g,x,base,scale,p,r){
  const hh=145*scale;
  line(g,x,base,x-4*scale,base-hh,p.ink,17*scale);
  for(const [dx,dy,rx,ry,color] of [
    [-66,-156,70,54,p.ink],[48,-173,87,64,p.shade],
    [-14,-197,88,59,p.accents[2]],[72,-134,63,54,p.accents[2]],
    [-68,-135,56,45,p.shade]
  ])disc(g,x+dx*scale,base+dy*scale,rx*scale,ry*scale,color);
  for(let i=0;i<22;i++){
    const xx=x+(r()-.5)*155*scale,yy=base-(119+r()*117)*scale;
    brush(g,xx,yy,(8+r()*24)*scale,(-7-r()*13)*scale,p.bright,3*scale,.2);
  }
}
function lamp(g,x,base,p,scale=1) {
  line(g,x,base,x,base-181*scale,p.ink,7*scale);
  line(g,x,base-182*scale,x+36*scale,base-182*scale,p.ink,6*scale);
  line(g,x+36*scale,base-182*scale,x+36*scale,base-171*scale,p.ink,5*scale);
  disc(g,x+36*scale,base-168*scale,18*scale,17*scale,p.bright,.12);
  disc(g,x+36*scale,base-168*scale,8*scale,9*scale,p.bright,.97);
}
function washington(g,p,r) {
  skyline(g,p,r);
  facade(g,45,333,320,p,r,{base:'#756a75',rows:3,arched:true});
  facade(g,1670,295,360,p,r,{base:'#795f64',rows:4,arched:true});
  // Trees and iron fence surround the white stone arch; open sightline.
  tree(g,255,HOR,1.12,p,r);tree(g,1710,HOR,1.17,p,r);
  for(let x=380;x<1670;x+=17){
    line(g,x,HOR,x,HOR-48,p.ink,3,.7);
  }
  line(g,370,HOR-37,1670,HOR-37,p.ink,6,.7);
  // Washington Square Arch: colored stone planes, inset masonry, vaulted gap.
  const x=850,y=196,w=348;
  rect(g,x-18,y-26,w+36,34,p.ink);
  rect(g,x-13,y-19,w+26,18,'#f9dfb7');
  rect(g,x,y,w,61,'#f2cfac');
  rect(g,x,y+56,w,15,'#a87670');
  rect(g,x+7,y+72,68,HOR-(y+72),'#f5d8b8');
  rect(g,x+w-75,y+72,68,HOR-(y+72),'#d4a98f');
  rect(g,x+75,y+72,w-150,HOR-(y+72),p.ink);
  // Carve the arch opening in the color of the distant atmosphere.
  g.fillStyle=p.haze;g.beginPath();g.moveTo(x+75,HOR);g.lineTo(x+75,y+244);
  g.arc(x+w/2,y+244,w/2-75,Math.PI,0);
  g.lineTo(x+w-75,HOR);g.closePath();g.fill();
  line(g,x+75,y+244,x+75,HOR,p.shade,7);
  line(g,x+w-75,y+244,x+w-75,HOR,p.shade,7);
  line(g,x+68,y+81,x+w-68,y+81,p.ink,4,.55);
  for(let i=0;i<5;i++){
    line(g,x+16+i*8,y+112,x+42+i*4,y+112,'#ffffff',2,.28);
    line(g,x+w-46+i*4,y+140,x+w-28+i*3,y+140,p.bright,2,.4);
  }
  // Stone inscription, side pilasters and crown.
  rect(g,x+113,y+16,122,7,p.shade);
  rect(g,x+124,y+30,100,4,p.bright);
  lamp(g,570,HOR,p,.8);lamp(g,1450,HOR,p,.8);
}
function dumbo(g,p,r) {
  skyline(g,p,r);
  // East River opens at the right of the bridge.
  rect(g,1370,HOR-37,678,38,'#7b9ea7');
  for(let i=0;i<45;i++){const x=1400+r()*610;line(g,x,HOR-24+r()*24,x+12+r()*40,HOR-24+r()*24,p.bright,1.8,.34);}
  facade(g,0,281,337,p,r,{base:'#a66b69',rows:4});
  facade(g,1170,347,272,p,r,{base:'#926a78',rows:3});
  facade(g,1810,300,250,p,r,{base:'#92606b',rows:4});
  for(const bx of [0,1170]){
    for(let y=358;y<HOR;y+=23){
      line(g,bx,y,bx+275,y,p.ink,1.4,.35);
      for(let x=bx+(y%46===0?14:0);x<bx+275;x+=42)line(g,x,y,x,y+18,p.ink,1,.24);
    }
  }
  // Manhattan Bridge tower, buttresses, suspension lines and deck.
  const cx=652;
  rect(g,cx-109,165,218,43,'#75849b');
  rect(g,cx-85,208,170,355,'#7b8b9f');
  rect(g,cx+64,208,21,355,'#3d546e');
  rect(g,cx-98,197,196,14,p.ink);
  g.fillStyle=p.haze;g.beginPath();g.moveTo(cx-53,HOR);
  g.lineTo(cx-53,338);g.arc(cx,338,53,Math.PI,0);g.lineTo(cx+53,HOR);g.closePath();g.fill();
  rect(g,0,465,W,17,p.ink);
  line(g,0,451,W,451,'#d2b1a7',6);
  for(let i=0;i<23;i++){
    const xx=i*92;
    const yy=182+255*Math.pow(Math.abs(xx-cx)/1100,1.6);
    line(g,xx,yy,xx,450,'#d7b6aa',2,.65);
  }
  for(const sg of [-1,1]){
    g.strokeStyle=p.bright;g.lineWidth=5;g.globalAlpha=.75;g.beginPath();
    g.moveTo(cx+sg*84,163);
    g.bezierCurveTo(cx+sg*270,260,cx+sg*530,360,cx+sg*1160,405);
    g.stroke();g.globalAlpha=1;
  }
  for(let x=0;x<W;x+=33)line(g,x,465,x+14,465,p.bright,2,.5);
  lamp(g,1644,HOR,p,.65);
}
function soho(g,p,r) {
  skyline(g,p,r);
  const xs=[[-30,321,290,'#695874'],[244,282,260,'#66536d'],[491,325,291,'#8b6472'],
    [772,261,283,'#65506b'],[1040,308,302,'#70516b'],[1320,281,297,'#825e73'],
    [1606,332,255,'#77546a'],[1843,294,240,'#64506a']];
  for(const [x,y,w,color] of xs){
    facade(g,x,y,w,p,r,{base:color,rows:3,arched:true,awning:p.accents[0]});
    for(let k=0;k<3;k++)line(g,x-3,y+30+k*97,x+w,y+30+k*97,p.ink,4,.7);
  }
  // Cast-iron fire escapes: landings, railings, diagonal stairs.
  for(const x of [410,1220,1825]){
    for(let y=355;y<535;y+=66){
      line(g,x,y,x+90,y,p.ink,7);
      for(let k=0;k<7;k++)line(g,x+k*14,y,x+k*14,y-14,p.ink,2);
      line(g,x+5,y,x+68,y+61,p.ink,4);
      line(g,x+68,y,x+12,y+61,p.ink,4);
    }
  }
  // Rooftop water towers and cornice silhouette.
  for(const x of [635,1520]){
    line(g,x,298,x,231,p.ink,9);line(g,x+62,298,x+62,231,p.ink,9);
    rect(g,x-6,211,77,67,'#684e64');rect(g,x-12,207,89,9,p.ink);
    path(g,[[x-14,207],[x+31,178],[x+77,207]],p.ink);
    for(let xx=x+10;xx<x+70;xx+=13)line(g,xx,213,xx,275,p.bright,2,.28);
  }
  lamp(g,140,HOR,p,.88);lamp(g,1940,HOR,p,.86);
  // Small storefront color accents, not large floating labels.
  for(const [x,w] of [[78,152],[810,180],[1380,170]]){
    rect(g,x,512,w,15,p.ink);
    rect(g,x+8,519,w-16,6,p.accents[1]);
  }
}
function coney(g,p,r) {
  skyline(g,p,r);
  for(let i=0;i<85;i++){
    const x=r()*W,y=r()*415;
    disc(g,x,y,r()*1.4+1,r()*1.4+1,p.bright,.25+r()*.5);
  }
  // Parachute Jump tower: thin girders with unmistakable bright crown.
  const tx=346,ty=169;
  line(g,tx,ty,250,HOR,p.ink,11);line(g,tx,ty,445,HOR,p.ink,11);
  for(let y=222;y<HOR;y+=43){
    const t=(y-ty)/(HOR-ty),wide=18+t*87;
    line(g,tx-wide,y,tx+wide,y+34,p.accents[1],3,.75);
    line(g,tx+wide,y,tx-wide,y+34,p.accents[1],3,.75);
  }
  disc(g,tx,ty,41,12,p.accents[0]);
  disc(g,tx,ty,17,17,p.bright);
  // Wonder Wheel: structural ink rim + offset neon rims + gondolas.
  const wx=1030,wy=329,wr=180;
  for(const [rr,col,thick] of [[wr+8,p.ink,17],[wr+2,p.accents[0],8],[wr-9,p.accents[1],3]]){
    g.strokeStyle=col;g.lineWidth=thick;g.beginPath();g.arc(wx,wy,rr,0,TAU);g.stroke();
  }
  for(let i=0;i<16;i++){
    const a=i*TAU/16;
    const px=wx+Math.cos(a)*wr,py=wy+Math.sin(a)*wr;
    line(g,wx,wy,px,py,p.accents[i%3],3,.72);
    rect(g,px-12,py-2,24,18,p.ink);
    rect(g,px-9,py+1,18,11,p.accents[(i+1)%3]);
  }
  disc(g,wx,wy,25,25,p.ink);disc(g,wx,wy,14,14,p.bright);
  line(g,wx,wy,908,HOR,p.ink,14);line(g,wx,wy,1152,HOR,p.ink,14);
  // Boardwalk rides and lit striped canopy at the horizon.
  for(const [x,y,w] of [[1370,395,250],[1685,443,280],[23,465,195]]){
    path(g,[[x,y+64],[x+w*.5,y-15],[x+w,y+64]],p.accents[0],p.ink,6);
    for(let k=0;k<7;k++){
      const xx=x+k*w/7;
      line(g,xx,y+64,xx+w/14,y+26,p.accents[k%3],8,.82);
    }
    rect(g,x,y+64,w,HOR-y-64,'#393a59');
    for(let j=0;j<8;j++)disc(g,x+14+j*(w-28)/7,y+77,5,5,p.accents[j%3]);
  }
  // Cyclone silhouette at far right.
  for(let x=1460;x<2050;x+=34){
    const peak=220+Math.abs(x-1730)*.8;
    line(g,x,peak,x,HOR,p.ink,3,.7);
  }
  g.strokeStyle=p.accents[1];g.lineWidth=7;g.beginPath();
  g.moveTo(1440,HOR);g.quadraticCurveTo(1740,205,2048,HOR-84);g.stroke();
}
function paintGroundInPanorama(g,p,r) {
  rect(g,0,HOR,W,H-HOR,p.ground);
  path(g,[[0,HOR],[W,HOR],[W,700],[0,795]],p.shade);
  for(let k=-7;k<=7;k++){
    const x=W*.5+k*114;
    line(g,x,HOR,x+k*35,H,p.ink,1.6,.22);
  }
  for(let i=0;i<130;i++){
    const x=r()*W,y=HOR+r()*(H-HOR);
    brush(g,x,y,10+r()*64,(r()-.5)*9,p.bright,1+r()*3,.06+r()*.12);
  }
}
function grainAndPaint(g,p,r,density,strokes) {
  if(!strokes)return;
  // Directional pigment deposited over the architecture, sampled from the
  // underlying rendered canvas so the brushwork belongs to each facade.
  const data=g.getImageData(0,0,W,H).data;
  const colorAt=(x,y,bright)=>{
    const k=(((y|0)*W+(x|0))*4);
    const a=[data[k],data[k+1],data[k+2]];
    return 'rgb('+a.map(c=>Math.round(Math.min(255,c*bright))).join(',')+')';
  };
  const n=Math.round(1450*Math.max(.2,Math.min(1.8,density)));
  for(let i=0;i<n;i++){
    const x=Math.floor(r()*(W-2))+1,y=Math.floor(r()*(HOR-2))+1;
    const sky=y<HOR*.43,theta=sky?(r()-.5)*.20:
      (y>HOR*.75?Math.PI/2+(r()-.5)*.42:(r()-.5)*.65);
    const len=sky?18+r()*62:8+r()*33;
    brush(g,x,y,Math.cos(theta)*len,Math.sin(theta)*len,
      colorAt(x,y,.75+r()*.5),1+r()*4,.15+r()*.24);
  }
  for(let i=0;i<240;i++){
    const x=r()*W,y=HOR*.75+r()*(HOR*.25);
    brush(g,x,y,4+r()*28,(r()-.5)*20,p.bright,1+r()*3,.07+r()*.16);
  }
}
export function paintStreet(name,{strokes=true,density=1}={}) {
  const p=STREET_ART[name];
  if(!p)throw new Error('Unknown street: '+name);
  const c=canvas(),g=c.getContext('2d');
  let seed=17319;for(const code of name)seed=(seed*33+code.charCodeAt(0))>>>0;
  const r=random(seed);
  paintSky(g,p,r);
  if(name==='washington-square')washington(g,p,r);
  else if(name==='dumbo')dumbo(g,p,r);
  else if(name==='soho')soho(g,p,r);
  else coney(g,p,r);
  paintGroundInPanorama(g,p,r);
  grainAndPaint(g,p,random(seed+733),density,strokes);
  return c;
}
