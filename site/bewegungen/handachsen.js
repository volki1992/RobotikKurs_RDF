"use strict";
(() => {
  const svg = el("wrist");
  const phase = el("wrist-phase");
  const camera = el("wrist-view");
  const rad = Math.PI / 180;
  const rotateZ = ([x,y,z], a) => [x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a),z];
  function render() {
    const roll = Number(phase.value);
    const yaw = Number(camera.value)*rad;
    const faces = [];
    const project = ([x,y,z]) => {
      const depth = x*Math.sin(yaw)+y*Math.cos(yaw);
      return [200+x*Math.cos(yaw)-y*Math.sin(yaw),207-z*.94-depth*.34,-depth*.94+z*.34];
    };
    const fixed = p => p;
    const arm = p => rotateZ(p,roll*rad);
    const tool = p => arm(rotateZ(p,-roll*rad));
    function face(points,color) {
      const vertices = points.map(project);
      faces.push({depth:vertices.reduce((sum,p)=>sum+p[2],0)/vertices.length,
        svg:'<polygon points="'+vertices.map(p=>p.slice(0,2).join(",")).join(" ")+'" fill="'+color+'" stroke="'+color+'" stroke-width=".65"/>'});
    }
    function shaft(start,end,r,transform,metal=false) {
      const ring = (x,i) => transform([x,r*Math.cos(i*Math.PI/12),r*Math.sin(i*Math.PI/12)]);
      for(let i=0;i<24;i++){
        const light = Math.round(42+14*Math.sin((i+.5)*Math.PI/12));
        face([ring(start,i),ring(end,i),ring(end,i+1),ring(start,i+1)],metal?'hsl(195 12% '+light+'%)':'hsl(25 87% '+light+'%)');
      }
      for(const x of [start,end]) face(Array.from({length:24},(_,i)=>ring(x,i)),metal?"#95a3a7":"#c06022");
    }
    function segment(a,b,color,width,dash=""){
      const [x,y]=project(a),[u,v]=project(b);
      return line(x,y,u,v,color,width,dash);
    }
    // Link centre lines lie in a vertical plane that turns with the base.
    function link(x,z,u,v,r) {
      const length=Math.hypot(u-x,v-z);
      const dx=(u-x)/length, dz=(v-z)/length;
      const local=([along,side,up])=>arm([x+along*dx-up*dz,side,z+along*dz+up*dx]);
      // Chamfered cast housing, with a wider drive end and a narrower nose.
      const rim=(along,width,height)=>[
        [-.7,-1],[.7,-1],[1,-.65],[1,.65],[.7,1],[-.7,1],[-1,.65],[-1,-.65]
      ].map(([side,up])=>local([along,side*width,up*height]));
      const rings=[rim(0,r*.8,r),rim(length*.22,r*1.1,r*1.16),rim(length,r*.74,r*.80)];
      const enamel=["#9d4315","#bd5418","#e37327","#f39a47","#ffc07b","#f69543","#da6a25","#a94b19"];
      for(let n=1;n<rings.length;n++){
        for(let i=0;i<8;i++){
          const j=(i+1)%8;
          face([rings[n-1][i],rings[n-1][j],rings[n][j],rings[n][i]],enamel[i]);
        }
      }
      face(rings[0],"#ae501b");face(rings[2],"#cc6424");
    }
    function joint(x,z,r) {
      const axle=([along,side,up])=>arm([x+side,along,z+up]);
      shaft(-16,16,r,axle,true);
      for(const sign of [-1,1]){
        const cap=(depth,radius,color)=>face(Array.from({length:20},(_,i)=>{
          const a=i*Math.PI/10;
          return axle([sign*depth,radius*Math.cos(a),radius*Math.sin(a)]);
        }),color);
        cap(17,r*.94,"#304048");cap(18,r*.77,"#a8b5bb");cap(19,r*.42,"#53616a");
        for(let i=0;i<6;i++){
          const a=i*Math.PI/3;
          face(Array.from({length:6},(_,k)=>axle([sign*19,r*.61*Math.cos(a)+1.3*Math.cos(k*Math.PI/3),r*.61*Math.sin(a)+1.3*Math.sin(k*Math.PI/3)])),"#36434c");
        }
      }
    }
    const vertical = transform => ([height,x,y])=>transform([x,y,height]);
    const plate=[[-32,-24],[32,-24],[36,-20],[36,20],[32,24],[-32,24],[-36,20],[-36,-20]];
    face(plate.map(([x,y])=>[x,y,3]),"#a3b1b6");
    plate.forEach(([x,y],i)=>{
      const [u,v]=plate[(i+1)%plate.length];
      face([[x,y,0],[u,v,0],[u,v,3],[x,y,3]],"#54636c");
    });
    for(const x of [-29,29]) for(const y of [-18,18]){
      face(Array.from({length:6},(_,i)=>[x+2.5*Math.cos(i*Math.PI/3),y+2.5*Math.sin(i*Math.PI/3),3.5]),"#37454c");
    }
    shaft(3,9,24,vertical(fixed),true);
    shaft(7,28,24,vertical(arm));
    link(0,24,-12,53,17);
    joint(-12,53,17);
    link(-12,53,-112,66,13);
    joint(-112,66,18);
    link(-112,66,-57,109,14);
    link(-57,109,0,150,12);
    joint(0,150,14);
    shaft(151,161,14,vertical(arm),true);
    shaft(161,167,12,vertical(tool),true);
    shaft(167,172,5,vertical(tool),true);
    face([[0,0,163],[23,0,163],[23,0,168],[0,0,168]].map(tool),"#ffffff");
    let grid="";
    for(let i=-120;i<=120;i+=30){
      grid+=segment([i,-60,0],[i,60,0],"#344951",.7);
      grid+=segment([-140,i/2,0],[140,i/2,0],"#344951",.7);
    }
    const [targetX,targetY]=project([0,0,172]);
    const [tx,ty]=project(tool([0,0,172]));
    function axisLabel(name,height,labelY){
      const [x,y]=project([0,0,height]);
      return line(62,labelY,115,labelY,"#eff5f6",1.4)
        +line(115,labelY,x,y,"#eff5f6",1.4)
        +dot(x,y,2.5,"#fff","#374349")
        +`<rect x="25" y="${labelY-11}" width="38" height="22" rx="4" fill="#253840" stroke="#a3bfbd"/>
           <text x="44" y="${labelY+5}" text-anchor="middle" style="fill:white;font-weight:700">${name}</text>`;
    }
    svg.innerHTML=grid+faces.sort((a,b)=>a.depth-b.depth).map(f=>f.svg).join("")
      +segment([0,0,0],[0,0,191],"#7cddd3",1.5,"5 5")
      +dot(targetX,targetY,10,"none","#ffffff")
      +line(targetX+10,targetY+5,targetX+28,targetY+21,"#ffffff",1)
      +`<text x="${targetX+30}" y="${targetY+30}" style="fill:white">TCP</text>`
      +dot(tx,ty,4,"#80eee1","#213739")
      +axisLabel("A1",14,212)+axisLabel("A6",162,27);
    el("wrist-status").textContent="A1 = +"+roll+"° · A6 = −"+roll+"° · TCP-Verschiebung: 0 mm";
  }
  const button=el("wrist-play");
  let frameId=null;
  const duration=2400;
  function pause(){
    cancelAnimationFrame(frameId);
    frameId=null;
    button.textContent="Animation starten";
  }
  phase.oninput=()=>{pause();render();};
  camera.oninput=render;
  button.onclick=()=>{
    if(frameId!==null){pause();return;}
    const initialAngle=Number(phase.value);
    if(matchMedia("(prefers-reduced-motion: reduce)").matches){
      phase.value=initialAngle<90?180:0;
      render();
      return;
    }
    const start=performance.now()-Math.acos(1-initialAngle/90)*duration/(2*Math.PI);
    button.textContent="Animation anhalten";
    function animate(now){
      const angle=Math.round(90*(1-Math.cos((now-start)*2*Math.PI/duration)));
      if(angle!==Number(phase.value)){phase.value=angle;render();}
      frameId=requestAnimationFrame(animate);
    }
    frameId=requestAnimationFrame(animate);
  };
  render();
})();
