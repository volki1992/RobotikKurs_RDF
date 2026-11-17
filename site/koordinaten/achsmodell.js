"use strict";

// Mesh geometry from the singularity model in bewegungen/handachsen.js.
// The supplied pose determines the link endpoints and the flange direction.
function motionRobotBody(pose, projectPoint, azimuth) {
    const faces = [];
    const fixed = point => point;
    const arm = ([x,y,z]) => [x*Math.cos(azimuth)-y*Math.sin(azimuth),
        x*Math.sin(azimuth)+y*Math.cos(azimuth),z];
    // Depth along the camera ray for the oblique projection in modul.js.
    const project = point => [...projectPoint(point), .6364*point[0]-2.2496*point[1]+.8483*point[2]];
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
    shaft(7,24,24,vertical(arm));

    const radial = point => point[0]*Math.cos(azimuth)+point[1]*Math.sin(azimuth);
    const shoulder = pose.shoulder, elbow = pose.elbow, wrist = pose.wrist;
    const ex = radial(elbow), wx = radial(wrist);
    const mx = ex + .70*(wx-ex), mz = elbow[2] + .70*(wrist[2]-elbow[2]);
    link(0,24,0,shoulder[2],15);
    joint(0,shoulder[2],13);
    link(0,shoulder[2],ex,elbow[2],12);
    joint(ex,elbow[2],14);
    link(ex,elbow[2],mx,mz,11);
    link(mx,mz,wx,wrist[2],8);
    joint(wx,wrist[2],8);
    const flange = ([length,side,up]) => arm([
        wx+length*Math.cos(pose.pitch)-up*Math.sin(pose.pitch),side,
        wrist[2]+length*Math.sin(pose.pitch)+up*Math.cos(pose.pitch)]);
    shaft(0,8,8,flange,true);
    shaft(8,13,6,flange,true);
    shaft(13,34,2,flange,true);
    return faces.sort((a,b)=>a.depth-b.depth).map(face=>face.svg).join("");
}
