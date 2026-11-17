"use strict";

const el = id => document.getElementById(id);
const rad = degrees => degrees * Math.PI / 180;
const deg = radians => radians * 180 / Math.PI;
const yaw = rad(25);
const upper = 92, lower = 83, stylus = 34, shoulderHeight = 42;
const origin = [0, 0, 0];

function spatial(radius, height) {
  return [radius * Math.cos(yaw), radius * Math.sin(yaw), height];
}
function offset(point, vector, factor = 1) {
  return point.map((value, i) => value + vector[i] * factor);
}
function along(pitch) {
  return spatial(Math.cos(pitch), Math.sin(pitch));
}
// A1 sets azimuth. A2, A3 and A5 pitch the links in the radial plane.
// Forearm roll A4 and flange roll A6 remain zero on this trajectory.
function posture(a2, a3, a5) {
  const shoulder = spatial(0, shoulderHeight);
  const elbow = offset(shoulder, along(a2), upper);
  const wrist = offset(elbow, along(a2 + a3), lower);
  const pitch = a2 + a3 + a5;
  const tip = offset(wrist, along(pitch), stylus);
  return {shoulder, elbow, wrist, tip, pitch, angles:[25, deg(a2), deg(a3), 0, deg(a5), 0]};
}
const middle = posture(rad(65), rad(-80), rad(-40));
function displaced(horizontal, vertical, start = middle) {
  const radius = Math.hypot(start.wrist[0], start.wrist[1]) + horizontal;
  const height = start.wrist[2] - shoulderHeight + vertical;
  const cosine = (radius ** 2 + height ** 2 - upper ** 2 - lower ** 2) / (2 * upper * lower);
  const a3 = -Math.acos(Math.max(-1, Math.min(1, cosine)));
  const a2 = Math.atan2(height, radius) - Math.atan2(lower * Math.sin(a3), upper + lower * Math.cos(a3));
  return posture(a2, a3, start.pitch - a2 - a3);
}
const liftStart = posture(rad(65), rad(-110), rad(65));
const liftHeight = 65;
function trajectory(percent) {
  if (percent <= 50) return posture(rad(32 + 33 * percent / 50), rad(-110), rad(65));
  return displaced(0, liftHeight * (percent - 50) / 50, liftStart);
}
// Oblique projection keeps vertical distances vertical and separates X and Y.
function screen([x,y,z]) { return [79 + 1.52 * x + .43 * y, 229 + .17 * x - .51 * y - 1.48 * z]; }
function path(points, color, width, extra = "") {
  return '<polyline points="' + points.map(p => screen(p).join(",")).join(" ") + '" fill="none" stroke="' + color + '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round" ' + extra + '/>';
}
function dot(point, radius, color) {
  const [x,y] = screen(point);
  return '<circle cx="'+x+'" cy="'+y+'" r="'+radius+'" fill="'+color+'"/>';
}
function label(point, text, dx, dy) {
  const [x,y] = screen(point);
  return '<text x="'+(x+dx)+'" y="'+(y+dy)+'">'+text+'</text>';
}
const baseDirections = [[1,0,0],[0,1,0],[0,0,1]];
const axisColors = ["#ffad9c","#b1e4ae","#98d4ff"];
function axes(at, directions, size) {
  return directions.map((direction,i) => {
    const end = offset(at,direction,size);
    const [x,y] = screen(end), [sx,sy] = screen(at);
    const angle = deg(Math.atan2(y-sy,x-sx));
    return path([at,end],axisColors[i],2) + '<path d="M0 0l-7 -3v6z" fill="'+axisColors[i]+'" transform="translate('+x+' '+y+') rotate('+angle+')"/>' + label(end,"+"+"XYZ"[i],i===1?-17:3,i===0?11:-3);
  }).join("") + dot(at,2.8,"white");
}
function annotatedRobot(p) {
  const forearm = p.elbow.map((v,i)=>v + .7*(p.wrist[i]-v));
  const flange = offset(p.wrist,along(p.pitch),12);
  let art = '<defs><marker id="turn-motion" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L8 4 0 8Z" fill="#76dfd2"/></marker></defs>';
  art += motionRobotBody(p, screen, yaw);
  const joints=[origin,p.shoulder,p.elbow,forearm,p.wrist,flange];
  const labels=[[-41,9],[-38,1],[-25,-16],[-10,-17],[4,-15],[15,4]];
  joints.forEach((joint,i)=>{
    // Sample each rotation in the plane perpendicular to its physical axis.
    const lateral = [-Math.sin(yaw), Math.cos(yaw), 0];
    let u = along(0), v = [0,0,1];
    if (i === 0) { u = baseDirections[0]; v = baseDirections[1]; }
    if (i === 3 || i === 5) {
      const pitch = i === 3 ? rad(p.angles[1] + p.angles[2]) : p.pitch;
      u = lateral;
      v = along(pitch + Math.PI / 2);
    }
    const radius = [15,10,9,6,6,5][i];
    const arc = Array.from({length:23}, (_, step) => {
      const angle = rad(i === 1 ? 35 + step * 11 : 135 - step * 11);
      return offset(offset(joint,u,radius*Math.cos(angle)),v,radius*Math.sin(angle));
    });
    art += path(arc,"#76dfd2",1.6,`marker-end="url(#turn-motion)"`);
    art+=label(joint,"A"+(i+1),...labels[i]);
  });
  return art + dot(p.tip,4,"white") + label(p.tip,"TCP",7,12);
}
function floor() {
  let art="";
  for(let i=0;i<=160;i+=20) art+=path([[i,-30,0],[i,90,0]],"#425564",.7);
  for(let i=-30;i<=90;i+=20) art+=path([[0,i,0],[160,i,0]],"#425564",.7);
  return art;
}
const background = floor();
function readout(id,names,values) {
  el(id).innerHTML=names.map((name,i)=>'<div><dt>'+name+'</dt><dd>'+values[i].toLocaleString("de-DE",{minimumFractionDigits:1,maximumFractionDigits:1})+'</dd></div>').join("");
}
function updateMotion() {
  const percent=Number(el("travel").value), pose=trajectory(percent);
  const [x,y]=pose.tip;
  const points=[origin,[x,0,0],[x,y,0],pose.tip];
  const swing = Array.from({length: Math.min(percent,50)+1}, (_,i) => trajectory(i).tip);
  el("motion").innerHTML=background + annotatedRobot(pose) + axes(origin,baseDirections,26)
    + axisColors.map((c,i)=>path(points.slice(i,i+2),c,1.5,'stroke-dasharray="3 3"')).join("")
    + path(swing,"#ffe092",3)
    + (percent > 50 ? path([liftStart.tip,pose.tip],"#76dfd2",3) : "")
    + dot(swing[0],3,"#ffe092") + dot(pose.tip,4,"white");
  readout("angles",["A1","A2","A3","A4","A5","A6"],pose.angles);
  readout("position",["X","Y","Z"],pose.tip);
  el("percent").value=percent+" %";
}
el("travel").addEventListener("input",updateMotion);
updateMotion();

const work = offset(middle.tip,[-16,0,-12]);
const frames = {
  Basis:"Der Ursprung liegt am Sockel. Basis-Z zeigt hier senkrecht nach oben.",
  Werkstück:"Der Nullpunkt liegt an der oberen Gehäuseecke. Die Achsen folgen den Bauteilkanten und dienen als Bezug für Prüfpositionen.",
  Werkzeug:"Der Ursprung liegt an der Stiftspitze. Werkzeug-Z zeigt in diesem Beispiel von der Spitze zum Halter.",
  Welt:"Die Bodenmarke legt den gemeinsamen Bezug der Zelle fest. Mehrere Roboter können darin einen Übergabepunkt beschreiben."
};
const toolDirections=[along(middle.pitch+Math.PI/2),[-Math.sin(yaw),Math.cos(yaw),0],along(middle.pitch).map(v=>-v)];
let selected="Basis", current=middle, animation=0;
const trails=new Map();
function cellAxes(at) {
  const dirs = selected === "Werkzeug" ? toolDirections : baseDirections;
  const [ox,oy] = screen(at);
  // Put the letters outside the arrowheads. Tool Y is foreshortened in this view.
  const labels = selected === "Werkzeug" ? [[12,1],[18,-13],[-17,-8]] : [[7,14],[10,-5],[-12,-8]];
  let art = "";
  dirs.forEach((dir,i) => {
    const end = offset(at,dir,35);
    const [x,y] = screen(end);
    const angle = deg(Math.atan2(y-oy,x-ox));
    const [dx,dy] = labels[i];
    art += path([at,end],"#14232a",4.8) + path([at,end],axisColors[i],2.6);
    art += `<path d="M0 0l-7 -3v6z" transform="translate(${x} ${y}) rotate(${angle})" fill="${axisColors[i]}"/>
      <path d="M${x} ${y}l${dx*.65} ${dy*.65}" stroke="${axisColors[i]}" stroke-width="1"/>
      <text class="axis-name" x="${x+dx}" y="${y+dy}" text-anchor="${dx<0?'end':'start'}" dominant-baseline="middle">+${"XYZ"[i]}</text>`;
  });
  return art + `<circle cx="${ox}" cy="${oy}" r="5" fill="#203139" stroke="white" stroke-width="2"/>`;
}
function drawCell() {
  const a=work,b=offset(a,[36,0,0]),c=offset(b,[0,24,0]),d=offset(a,[0,24,0]);
  const points=[a,b,c,d,a].map(p=>screen(p).join(",")).join(" ");
  const at={Basis:origin,Welt:[-26,-16,0],Werkstück:work,Werkzeug:current.tip}[selected];
  let art=background+'<polygon points="'+points+'" fill="#708a9a"/>'+path([a,b,c,d,a],"#c2d2da",1.5)+path([a,offset(a,[0,0,-13]),offset(b,[0,0,-13]),b],"#8399a9",2);
  art+=motionRobotBody(current, screen, yaw);
  for(const [name,target] of trails) art+=path([middle.tip,target],name==="Basis"?"#9edbff":"#ffe092",3);
  el("cell").innerHTML=art + cellAxes(at) + dot(current.tip,3,"white") +
    `<text x="10" y="4">${selected}system</text>`;
}
function choose(name) {
  selected=name;
  for(const button of el("frames").children) button.setAttribute("aria-pressed",String(button.textContent===name));
  el("frame-note").textContent=frames[name];
  drawCell();
}
for(const name of Object.keys(frames)){
  const button=document.createElement("button");
  button.textContent=name;
  button.onclick=()=>choose(name);
  el("frames").append(button);
}
function move(name) {
  cancelAnimationFrame(animation);
  choose(name);
  const direction=name==="Basis"?[0,1]:[-Math.cos(middle.pitch),-Math.sin(middle.pitch)];
  const start=performance.now(), duration=matchMedia("(prefers-reduced-motion: reduce)").matches?0:1300;
  function frame(now) {
    const elapsed=duration?Math.min(1,(now-start)/duration):1;
    const progress=elapsed*elapsed*(3-2*elapsed);
    current=displaced(direction[0]*40*progress,direction[1]*40*progress);
    trails.set(name,current.tip);
    drawCell();
    if(elapsed<1) animation=requestAnimationFrame(frame);
    else el("step-note").textContent="Endlage nach 40 mm in +Z im "+name+"system. Blau zeigt den Basisweg, Gelb den Werkzeugweg.";
  }
  el("step-note").textContent="Fahrt im "+name+"system.";
  frame(start);
}
el("base-step").onclick=()=>move("Basis");
el("tool-step").onclick=()=>move("Werkzeug");
el("reset").onclick=()=>{cancelAnimationFrame(animation);current=middle;trails.clear();drawCell();el("step-note").textContent="Der Prüfstift steht in Ausgangslage.";};
choose("Basis");
