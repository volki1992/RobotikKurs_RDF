// Orthographic teaching models. Y is vertical. Profiles specify radius and height.
const profiles={
 scara:[[.48,.3],[1.35,.3],[1.35,1.18],[.48,1.18]],
 knick:[[.4,.12],[1.16,.12],[1.43,.65],[1.36,1.16],[1,1.68],[.58,1.91],[.10,1.98],[.10,1.12],[.32,.92],[.46,.56]],
 delta:[[.02,.22],[.62,.3],[.98,.52],[1.2,.88],[1.24,1.1],[.96,1.2],[.02,1.2]]
};
function workspaceScene(type,angle){
 const c=Math.cos(angle),s=Math.sin(angle), faces=[],grid=[],edges=[];
 function project([x,y,z]){const d=x*s+z*c;return [160+69*(x*c-z*s),136+69*(d*.43-y*.903),d*.903+y*.43];}
 const points=list=>list.map(p=>project(p).slice(0,2).map(n=>n.toFixed(1)).join(',')).join(' ');
 function line(list,color,width,layer=edges){layer.push('<polyline points="'+points(list)+'" fill="none" stroke="'+color+'" stroke-width="'+width+'" stroke-linejoin="round" stroke-linecap="round"/>');}
 function face(list,color,opacity){faces.push([list.reduce((sum,p)=>sum+project(p)[2],0)/list.length,'<polygon points="'+points(list)+'" fill="'+color+'" fill-opacity="'+opacity+'"/>']);}
 for(let n=-2;n<=2;n+=.5){line([[n,0,-2],[n,0,2]],'#354455',.7,grid);line([[-2,0,n],[2,0,n]],'#354455',.7,grid);}
 const frame=list=>line(list,'#b5c6d4',4);
 if(type==='portal'){
  const ring=y=>[[-1.25,y,-.78],[1.25,y,-.78],[1.25,y,.78],[-1.25,y,.78]];
  const low=ring(.18), high=ring(1.43);
  face(low,'#cc9633',.24);face(high,'#ffe19b',.52);
  for(let i=0;i<4;i++){const j=(i+1)%4;face([low[i],low[j],high[j],high[i]],i%2?'#edaa38':'#ffd473',.36);line([low[i],high[i]],'#edc278',1);}
  for(const r of [low,high])line([...r,r[0]],'#ffe4a4',1.2);
  frame([[-1.45,0,-.97],[-1.45,1.65,-.97],[1.45,1.65,-.97],[1.45,0,-.97]]);
 }else{
  const profile=profiles[type],sweep=Math.PI*({scara:1.55,knick:1.65,delta:2}[type]), steps=40;
  const point=([r,y],a)=>[r*Math.cos(a),y,r*Math.sin(a)];
  for(let i=0;i<steps;i++){
   const a=.6+sweep*i/steps,b=.6+sweep*(i+1)/steps;
   const color='rgb(255,'+Math.round(175+35*Math.cos(a-angle))+',85)';
   profile.forEach((p,j)=>{const q=profile[(j+1)%profile.length];face([point(p,a),point(p,b),point(q,b),point(q,a)],color,.29);});
  }
  if(type!=='delta')for(const a of [.6,.6+sweep]){const rim=profile.map(p=>point(p,a));face(rim,'#ffc568',.45);line([...rim,rim[0]],'#ffe5a1',1.2);}
  for(const j of type==='scara'?[0,1,2,3]:[1,2,4])line(Array.from({length:steps+1},(_,i)=>point(profile[j],.6+sweep*i/steps)),'#e6b960',1);
  if(type==='scara')frame([[0,0,0],[0,1.36,0],[.56,1.36,.2],[.92,1.36,-.13],[.92,1,-.13]]);
  if(type==='knick')frame([[0,0,0],[0,.43,0],[-.37,1.14,0],[.46,1.35,.15],[.61,1.17,.18]]);
  if(type==='delta'){const base=[];for(let i=0;i<3;i++){const a=i*Math.PI*2/3,x=Math.cos(a),z=Math.sin(a);
    base.push([.7*x,1.9,.7*z]);frame([base[i],[.9*x,1.47,.9*z],[.15*x,.92,.15*z]]);
  }frame([...base,base[0]]);}
 }
 return grid.join('')+faces.sort((a,b)=>a[0]-b[0]).map(f=>f[1]).join('')+edges.join('');
}
for(const fig of document.querySelectorAll('[data-workspace]')){
 const slider=fig.querySelector('input'), svg=fig.querySelector('svg');
 const draw=()=>{svg.innerHTML=workspaceScene(fig.dataset.workspace,Number(slider.value)*Math.PI/180)};
 draw();slider.addEventListener('input',draw);
}

