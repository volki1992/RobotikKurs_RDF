// Coordinates are expressed in model units; Y is vertical.
(() => {
  const housing = [255, 137, 42], steel = [177, 185, 190], dark = [82, 85, 87];
  const flange = [105, 110, 113], mint = [95, 218, 172];
  const linkage = [126, 132, 135];
  const add=(a,b)=>a.map((n,i)=>n+b[i]);
  const sub=(a,b)=>a.map((n,i)=>n-b[i]);
  const scale=(v,n)=>v.map(x=>x*n);
  const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const unit=v=>scale(v,1/(Math.hypot(...v)||1));
  const mix=(a,b,t)=>add(a,scale(sub(b,a),t));
  const up=[0,1,0], target=[1.22,.48,.25];
  const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
  function draw(canvas,name,t) {
    const ctx=canvas.getContext('2d'), W=640,H=400;
    ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);
    const bg=ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#21353c');bg.addColorStop(1,'#101a20');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    const right=unit([.89,0,-.45]), eye=unit([.42,.33,.83]), vertical=unit(cross(eye,right));
    function project(p){const q=sub(p,[.32,1,0]);return [320+dot(q,right)*141,195-dot(q,vertical)*141]}
    function path(points){ctx.beginPath();points.forEach((p,i)=>{const [x,y]=project(p);if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y)});}
    for(let i=-4;i<=4;i++){ctx.strokeStyle='#354950';ctx.lineWidth=.8;
      path([[i*.5,0,-2],[i*.5,0,2]]);ctx.stroke();path([[-2,0,i*.5],[2,0,i*.5]]);ctx.stroke();}
    const faces=[];
    function face(points,color,normal){
      const light=.55+.45*Math.max(0,dot(unit(normal),unit([-.4,1,.8])));
      faces.push({points,depth:points.reduce((v,p)=>v+dot(p,eye),0)/points.length,
        fill:'rgb('+color.map(c=>Math.round(c*light)).join(',')+')'});
    }
    function rod(a,b,r,color,sides=16){
      const dir=unit(sub(b,a)), u=unit(cross(dir,Math.abs(dir[1])>.9?[1,0,0]:up)), v=cross(dir,u);
      const normals=Array.from({length:sides},(_,i)=>add(scale(u,Math.cos(i*2*Math.PI/sides)),scale(v,Math.sin(i*2*Math.PI/sides))));
      const ring=p=>normals.map(n=>add(p,scale(n,r)));
      const low=ring(a),high=ring(b);
      normals.forEach((n,i)=>{const j=(i+1)%sides;face([low[i],low[j],high[j],high[i]],color,add(n,normals[j]))});
      face(low,color,scale(dir,-1));face(high,color,dir);
    }
    function tower(x,z,h){rod([x,.02,z],[x,.12,z],.32,dark);rod([x,.12,z],[x,h,z],.19,steel)}
    function joint(p,axis){rod(add(p,scale(axis,-.14)),add(p,scale(axis,.14)),.16,dark);rod(add(p,scale(axis,.14)),add(p,scale(axis,.16)),.10,steel)}
    function gripper(p,direction){
      const d=unit(direction), wrist=add(p,scale(d,-.23));
      rod(wrist,add(p,scale(d,-.09)),.065,flange);
      for(const side of [-1,1]){const gap=[0,0,.055*side];rod(add(add(p,gap),scale(d,-.11)),add(p,gap),.024,steel)}
    }
    const turn=smooth(t/.55), finish=smooth((t-.55)/.4);
    let label;
    if(name==='SCARA'||name==='Knickarmroboter'){
      rod([target[0],0,target[2]],[target[0],target[1]-.03,target[2]],.095,mint);
      const base=[-.72,1.32,-.25];
      if(name==='SCARA'){
        tower(base[0],base[2],base[1]);
        const p=mix([.1,.87,1.05],add(target,[0,.42,0]),turn);p[1]-=.42*finish;
        const dx=p[0]-base[0],dz=p[2]-base[2],length=1.08;
        const bend=Math.acos(Math.min(1,(dx*dx+dz*dz-2*length**2)/(2*length**2)));
        const a=Math.atan2(dz,dx)-bend/2, elbow=add(base,[length*Math.cos(a),0,length*Math.sin(a)]);
        const end=[p[0],base[1],p[2]];
        rod(base,elbow,.13,housing);rod(elbow,end,.105,housing);joint(base,up);joint(elbow,up);
        rod(end,add(p,[0,.2,0]),.055,steel);gripper(p,[0,-1,0]);
        label=turn<1?'Arm schwenkt in der Horizontalen':'Z-Achse senkt den senkrechten Greifer';
      }else{
        tower(base[0],base[2],.44);
        const shoulder=[base[0],.48,base[2]], tip=mix([.06,1.48,.65],target,turn);
        const angle=.12+1.08*finish, d=[Math.sin(angle),-Math.cos(angle),0], wrist=add(tip,scale(d,-.36));
        const delta=sub(wrist,shoulder), dist=Math.hypot(...delta), axis=unit(delta);
        const hinge=unit(cross(axis,up)), elbow=add(mix(shoulder,wrist,.5),scale(unit(cross(hinge,axis)),Math.sqrt(Math.max(0,1.12**2-dist**2/4))));
        rod(shoulder,elbow,.14,housing);rod(elbow,wrist,.105,housing);joint(shoulder,hinge);joint(elbow,hinge);
        rod(wrist,add(tip,scale(d,-.18)),.072,flange);gripper(tip,d);
        label=turn<1?'Schulter und Ellenbogen führen das Werkzeug':'Spitze am Ziel · Handgelenk kippt';
      }
    }else if(name==='Portalroboter'){
      for(const z of [-.75,.75]){for(const x of [-1,1.65])tower(x,z,1.72);rod([-1,1.72,z],[1.65,1.72,z],.08,steel)}
      const x=-.72+1.94*turn,z=-.55+.8*turn;
      rod([x,1.72,-.75],[x,1.72,.75],.10,housing);
      const p=[x,1.1-.62*finish,z];rod([x,1.8,z],add(p,[0,.18,0]),.066,steel);gripper(p,[0,-1,0]);
      label=turn<1?'X und Y versetzen den Schlitten':'Z fährt nach unten';
    }else{
      const center=[.18+.65*turn,.78-.30*finish,.15*turn];
      rod([.3,1.97,0],[.3,2.1,0],.8,housing);rod(add(center,[0,-.045,0]),add(center,[0,.045,0]),.23,housing);
      for(let i=0;i<3;i++){
        const a=i*Math.PI*2/3, radial=[Math.cos(a),0,Math.sin(a)], tangent=cross(up,radial);
        const base=add([.3,1.98,0],scale(radial,.67)), end=add(center,scale(radial,.19));
        const delta=sub(end,base), x=dot(delta,radial),y=delta[1], L=.53,F=1.27;
        const m=(dot(delta,delta)+L*L-F*F)/(2*L);
        const angle=Math.atan2(y,x)+Math.acos(Math.max(-1,Math.min(1,m/Math.hypot(x,y))));
        const elbow=add(base,add(scale(radial,L*Math.cos(angle)),[0,L*Math.sin(angle),0]));
        rod(base,elbow,.077,housing);for(const sign of [-1,1]){const offset=scale(tangent,sign*.047);rod(add(elbow,offset),add(end,offset),.028,linkage)}
      }
      gripper(add(center,[0,-.24,0]),[0,-1,0]);label='Drei Arme führen die waagerechte Plattform';
    }
    faces.sort((a,b)=>a.depth-b.depth);
    for(const f of faces){path(f.points);ctx.closePath();ctx.fillStyle=f.fill;ctx.fill();ctx.strokeStyle=f.fill;ctx.lineWidth=.6;ctx.stroke()}
    ctx.fillStyle='#e0eae9';ctx.font='bold 16px system-ui';ctx.fillText(label,18,380);
  }
  const notes={
    Portalroboter:'Die Brücke fährt über die Fläche, anschließend senkt sich die Hubachse.',
    SCARA:'Verfolge die grü­ne Zielmarke: Beide Armglieder bleiben auf derselben Höhe. Den letzten Weg nach unten übernimmt der Hub.',
    Knickarmroboter:'Dieselbe Zielmarke wie beim SCARA: Nach dem Anfahren kippt das Werkzeug. Schulter und Ellenbogen gleichen die Bewegung aus, damit die Spitze am Ziel bleibt.',
    Deltaroboter:'Die Hauptantriebe schwenken die Oberarme. Die gekoppelten Stangen führen die Plattform ohne Kippen.'
  };

  for (const tile of document.querySelectorAll('.tile')) {
    const summary = tile.querySelector('summary'), name = summary.querySelector('b').textContent;
    if (!notes[name]) continue;
    const canvas = document.createElement('canvas');
    canvas.width=800; canvas.height=500; canvas.hidden=true;
    canvas.setAttribute('role','img'); canvas.setAttribute('aria-label',notes[name]);
    summary.querySelector('img').after(canvas);
    summary.querySelector('span').textContent='Bewegung ansehen';
    const caption=document.createElement('p'), button=document.createElement('button');
    caption.textContent=notes[name]; button.type='button'; button.textContent='Bewegung wiederholen';
    tile.querySelector('.inside').prepend(caption,button);
    let frame;
    function play() {
      cancelAnimationFrame(frame);
      const start=performance.now();
      function step(now) {
        const phase=Math.min((now-start)/5000,1);
        draw(canvas,name,phase);
        if (phase<1 && tile.open) frame=requestAnimationFrame(step);
      }
      step(start);
    }
    tile.addEventListener('toggle',() => {
      cancelAnimationFrame(frame);
      canvas.hidden=!tile.open;
      summary.querySelector('img').hidden=tile.open;
      if (!tile.open) return;
      draw(canvas,name,0);
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) button.textContent='Bewegung abspielen';
      else play();
    });
    button.addEventListener('click',play);
  }
})();


