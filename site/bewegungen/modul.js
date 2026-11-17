"use strict";
const el = id => document.getElementById(id);
const mint = "#08786f", orange = "#e97a23", steel = "#83959d";
function line(x,y,u,v,color,width=2,dash="") {
  return `<line x1="${x}" y1="${y}" x2="${u}" y2="${v}" stroke="${color}" stroke-width="${width}" stroke-dasharray="${dash}" stroke-linecap="round"/>`;
}
function dot(x,y,r,fill,stroke="none") {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}
function label(x,y,message) { return `<text x="${x}" y="${y}">${message}</text>`; }
function arrow(x,y,u,v,color) {
  const angle = Math.atan2(v-y,u-x)*180/Math.PI;
  return line(x,y,u,v,color,2)
    + `<path d="M0 0l-8 -4v8z" transform="translate(${u} ${v}) rotate(${angle})" fill="${color}"/>`;
}
function bearing(x,y,r) {
  return dot(x,y,r,"#374349")+dot(x,y,r*.72,"#aebbc0")+dot(x,y,r*.32,"#f4f7f7");
}
function nozzle(x,y,angle) {
  return `<g transform="translate(${x} ${y}) rotate(${angle})"><path d="M-11 -49 H11 V-20 L3 -6 H-3 L-11 -20Z" fill="${orange}"/><path d="M-4 -11 H4 L2 0 H-2Z" fill="#45535b"/><path d="M-13 -42 H13" stroke="#5e8186" stroke-width="6"/></g>`;
}
// Each drawing keeps its own clock so restarting one experiment cannot interrupt another.
const clocks = new Map();
function stop(id) { cancelAnimationFrame(clocks.get(id)); }
function play(id,draw,done,durationMs=2200) {
  stop(id);
  const start = performance.now();
  const duration = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : durationMs;
  function frame(now) {
    const t = duration ? Math.min(1,(now-start)/duration) : 1;
    draw(t);
    if (t < 1) clocks.set(id,requestAnimationFrame(frame));
    else done();
  }
  clocks.set(id,requestAnimationFrame(frame));
}
const blend = (a,b,t) => a+(b-a)*t;
const sx = x => 38+2.06*x;
const sy = y => 184-2.06*y;
let historyXY;
function drawXY(x,y) {
  let drawing = "";
  for(let n=0;n<=160;n+=20) {
    drawing += line(sx(n),sy(0),sx(n),sy(80),"#c4cfd1",1)+label(sx(n)-6,202,n);
  }
  for(let n=0;n<=80;n+=20) {
    drawing += line(sx(0),sy(n),sx(160),sy(n),"#c4cfd1",1)+label(10,sy(n)+4,n);
  }
  drawing += arrow(sx(0),sy(0),384,sy(0),steel)+arrow(sx(0),sy(0),sx(0),7,steel)
    +label(312,218,"+X (mm)")+label(50,15,"+Y (mm) · Werkstück")+dot(sx(0),sy(0),3,"#374349");
  const points = [...historyXY,[x,y]];
  for(let i=1;i<points.length;i++) {
    const [a,b]=points[i-1], [c,d]=points[i];
    drawing += line(sx(a),sy(b),sx(c),sy(d),mint,4)+dot(sx(a),sy(b),5,"white",mint);
  }
  el("xy").innerHTML=drawing+dot(sx(x),sy(y),6,orange);
}
function resetXY() {
  stop("xy");
  const x=Number(el("origin").value);
  historyXY=[[x,30]];
  drawXY(x,30);
  el("xy-status").textContent=`Start · X = ${x} mm, Y = 30 mm`;
  el("xy-go").disabled=false;
  el("xy-go").textContent="Anweisung ausführen";
}
el("origin").onchange=el("mode").onchange=el("xy-reset").onclick=resetXY;
el("xy-go").onclick=()=>{
  const [x,y]=historyXY.at(-1);
  const relative=el("mode").value==="rel";
  const [u,v]=relative ? [x+60,y+20] : [60,20];
  el("xy-go").disabled=true;
  play("xy",t=>drawXY(blend(x,u,t),blend(y,v,t)),()=>{
    historyXY.push([u,v]);
    el("xy-status").textContent=`Ausführung ${historyXY.length-1} · X = ${u} mm, Y = ${v} mm`+(x===u && y===v ? " · Ziel bereits erreicht, Weg 0 mm." : "");
    el("xy-go").disabled=historyXY.length===3;
    el("xy-go").textContent="Erneut ausführen";
  });
};
resetXY();
// Two rigid links, one elbow configuration throughout. Invert the linkage for LIN.
const lengthArm=100, baseX=190, baseY=210;
function angles(x,y) {
  const elbow=Math.acos((x*x+y*y-2*lengthArm**2)/(2*lengthArm**2));
  return [Math.atan2(y,x)-elbow/2,elbow];
}
const startArm=angles(-110,110), endArm=angles(110,110);
function joints(t) {
  const [a,b]=el("path").selectedIndex ? angles(blend(-110,110,t),110)
    : startArm.map((angle,i)=>blend(angle,endArm[i],t));
  const ex=baseX+lengthArm*Math.cos(a), ey=baseY-lengthArm*Math.sin(a);
  return [ex,ey,ex+lengthArm*Math.cos(a+b),ey-lengthArm*Math.sin(a+b)];
}
function drawArm(t) {
  const [ex,ey,x,y]=joints(t);
  const trace=[];
  for(let i=0;i<=60;i++) trace.push(joints(t*i/60).slice(2).join(","));
  el("arm").innerHTML=line(80,100,300,100,steel,2,"5 4")+label(56,103,"A")+label(314,103,"B")
    +line(baseX,baseY,ex,ey,"#c75f18",15)+line(ex,ey,x,y,orange,12)
    +bearing(baseX,baseY,11)+bearing(ex,ey,8)
    +`<polyline points="${trace.join(" ")}" fill="none" stroke="${mint}" stroke-width="4"/>`
    +dot(80,100,6,"none",mint)+dot(300,100,6,"none",mint)+dot(x,y,5,"#374349",mint);
  el("progress").value=Math.round(100*t);
}
function armStatus(){el("arm-status").textContent=el("path").value+" · Fahrtverlauf "+el("progress").value+" %";}
el("progress").oninput=()=>{stop("arm");drawArm(el("progress").value/100);armStatus();};
el("path").onchange=()=>{stop("arm");drawArm(el("progress").value/100);armStatus();};
el("arm-go").onclick=()=>play("arm",drawArm,armStatus);
drawArm(0);armStatus();
