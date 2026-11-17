"use strict";
(() => {
  const list = el("program-lines");
  const status = el("station-status");
  const run = el("run-program");
  const clear = el("clear-program");
  const addButtons = [...el("add-lines").querySelectorAll("button")];
  // Physical X/Z positions in mm. The SVG uses 2.4 drawing units per mm.
  const positions = [[0,60],[30,35],[30,15],[100,15],[100,35]];
  const sequence = ["move","move","on","move","off","move"];
  const from = [0,1,2,2,3,3];
  const to = [1,2,2,3,3,4];
  function draw(x,z,seam){
    const px=38+2.4*x, py=179-2.4*z;
    el("station-motion").innerHTML=(seam ? line(110,143,110+168*seam,143,orange,5) : "")
      +`<g transform="translate(${px} ${py}) scale(.60)">${nozzle(0,0,0)}</g>`+dot(px,py,3,"#34484b");
  }
  function edit(){
    stop("station");
    draw(...positions[0],0);
    for(const row of list.children) row.classList.remove("active");
    run.disabled=clear.disabled=!list.children.length;
    for(const btn of addButtons) btn.disabled=list.children.length>=6;
    [...list.children].forEach((row,i)=>{
      row.querySelector('[data-action="up"]').disabled=i===0;
      row.querySelector('[data-action="down"]').disabled=i===list.children.length-1;
    });
    status.textContent=list.children.length ? "Programm bereit zum Bearbeiten oder Testen." : "Das Programm ist leer.";
  }
  function add(kind){
    const row=document.createElement("li");
    row.dataset.kind=kind;
    row.innerHTML=(kind==="move" ?
      '<label>Bewegung <select class="path"><option>PTP</option><option>LIN</option></select></label><label>Zielangabe <select class="mode"><option>absolut</option><option>relativ</option></select></label><label>X (mm) <input type="number" step="any" class="x"></label><label>Z (mm) <input type="number" step="any" class="z"></label>' :
      '<strong>Klebstoff '+(kind==="on"?"EIN":"AUS")+'</strong>')+
      '<span class="line-actions"><button type="button" data-action="up" aria-label="Zeile nach oben">↑</button> <button type="button" data-action="down" aria-label="Zeile nach unten">↓</button> <button type="button" data-action="remove">Entfernen</button></span>';
    list.append(row);edit();
    row.querySelector("select,button:not(:disabled)").focus();
  }
  addButtons.forEach(btn=>btn.onclick=()=>add(btn.dataset.add));
  list.oninput=edit;
  list.onclick=event=>{
    const btn=event.target.closest("[data-action]");
    if(!btn)return;
    const row=btn.closest("li");
    const nextFocus=row.nextElementSibling||row.previousElementSibling;
    switch(btn.dataset.action){
      case "up": row.previousElementSibling.before(row);break;
      case "down": row.nextElementSibling.after(row);break;
      default: row.remove();
    }
    edit();
    const focusRow=row.isConnected?row:nextFocus;
    (focusRow?.querySelector("select,button:not(:disabled)")||addButtons[0]).focus();
  };
  clear.onclick=()=>{list.replaceChildren();edit();addButtons[0].focus();};
  function check(row,i){
    const kind=row.dataset.kind;
    if(kind!==sequence[i]){
      if(kind==="on")return "Hier würde Klebstoff außerhalb des Nahtanfangs austreten.";
      if(kind==="off")return "Hier würde der Auftrag vor dem vollständigen Nahtende abgeschaltet oder wäre bereits aus.";
      return i===2?"Die Düse steht am Nahtanfang, der Klebstoff ist noch aus.":"Die Naht ist vollständig, aber beim Abheben würde weiter Klebstoff austreten.";
    }
    if(kind!=="move")return "";
    const path=row.querySelector(".path").value;
    if(path!==(i===0?"PTP":"LIN"))return i===0?"Für die freie Anfahrt ist PTP gefordert.":"Diese Strecke muss gerade sein. PTP gibt die TCP-Bahn nicht vor.";
    const relative=row.querySelector(".mode").value==="relativ";
    const target=["x","z"].map((axis,j)=>row.querySelector("."+axis).valueAsNumber+(relative?positions[from[i]][j]:0));
    if(!target.every(Number.isFinite))return "Trage beide Zahlenwerte ein. Für eine unveränderte Achse ist bei relativer Fahrt der Weg 0.";
    const [x,z]=target;
    if(!target.every((v,j)=>Math.abs(v-positions[to[i]][j])<1e-8)){
      const hints={0:"Lies die X-Lage des Rings und seine Höhe über dem Ursprung ab.",1:"Die Spitze soll senkrecht bis auf die Deckeloberfläche fahren.",3:"Die zweite waagrechte Maßlinie gibt die Länge der Naht ab A an.",5:"Hebe in Z auf Ringhöhe ab. Die X-Position bleibt erhalten."};
      return `Deine Zeile ergibt X = ${x}, Z = ${z} mm. `+hints[i];
    }
    return "";
  }
  run.onclick=()=>{
    edit();run.disabled=true;
    const rows=[...list.children];
    function step(i){
      if(i===rows.length){
        status.textContent=i===6?"✓ Programm korrekt. Die ganze Naht ist aufgetragen, die Düse ist abgehoben und der Klebstoff ist aus.":"Bis hierhin korrekt. Ergänze die fehlenden Programmzeilen.";
        run.disabled=false;return;
      }
      rows.forEach((r,j)=>r.classList.toggle("active",j===i));
      const error=check(rows[i],i);
      if(error){status.textContent="Zeile "+(i+1)+" · "+error;run.disabled=false;return;}
      const [x,z]=positions[from[i]], [u,v]=positions[to[i]];
      status.textContent="Zeile "+(i+1)+" · "+(sequence[i]==="move"?"Fahrt":sequence[i]==="on"?"Klebstoff EIN":"Klebstoff AUS");
      play("station",t=>draw(blend(x,u,t),blend(z,v,t)+(i===0?6*Math.sin(t*Math.PI):0),i===3?t:i>3?1:0),()=>step(i+1),sequence[i]==="move"?850:450);
    }
    step(0);
  };
  edit();
})();
