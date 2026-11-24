'use strict';
(() => {
  const byId = id => document.getElementById(id);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // These are explanatory models, not a machine controller or a safety simulation.
  const cell = { door: false, ready: false, running: false, phase: 0 };
  const teach = { position: 'released', rearm: false, held: false, phase: 0 };
  let frame = 0, previous = 0;
  function teachRunning() { return teach.position === 'middle' && !teach.rearm && teach.held; }
  function updateCell(message) {
    byId('door-leaf').setAttribute('d', cell.door ? 'M265 305L265 225' : 'M265 305H355');
    byId('door-toggle').textContent = cell.door ? 'Tür schließen' : 'Tür öffnen';
    byId('door-toggle').setAttribute('aria-pressed', String(cell.door));
    byId('cell-label').textContent = cell.running ? 'Automatik läuft' : cell.door ? 'Stillstand · Tür offen' : cell.ready ? 'Stillstand · startbereit' : 'Stillstand · nicht quittiert';
    byId('cell-status').textContent = message + (cell.running && reduced.matches ? ' Die Grafik bleibt wegen reduzierter Bewegung statisch.' : '');
    schedule();
  }
  function updateTeach() {
    const moving = teachRunning();
    byId('teach-label').textContent = moving ? 'Fahrbefehl aktiv · Bewegung' : 'Stillstand';
    byId('enable-key').setAttribute('fill', teach.position === 'middle' && !teach.rearm ? '#2b8a75' : teach.position === 'pressed' ? '#b74e42' : '#829298');
    byId('command-lamp').setAttribute('fill', teach.held ? '#9acbb7' : '#f5f6f2');
    let message;
    if (teach.position === 'released') message = 'Losgelassen: keine Zustimmung. Der Roboter steht.';
    else if (teach.position === 'pressed') message = 'Durchgedrückt: Halt. Vor einer neuen Freigabe zuerst ganz loslassen.';
    else if (teach.rearm) message = 'Rückweg durch die Mittelstellung: weiterhin gesperrt. Zuerst ganz loslassen.';
    else if (moving) message = 'Zustimmung und Fahrbefehl liegen vor: Der Arm bewegt sich im manuellen Betrieb mit reduzierter Geschwindigkeit.';
    else message = 'Mittelstellung: Zustimmung liegt vor. Ohne zusätzlichen Fahrbefehl bleibt der Roboter stehen.';
    if (moving && reduced.matches) message += ' Die Grafik bleibt wegen reduzierter Bewegung statisch.';
    byId('teach-status').textContent = message;
    schedule();
  }
  function schedule() {
    if (!reduced.matches && (cell.running || teachRunning())) {
      if (!frame) frame = requestAnimationFrame(animate);
    } else { cancelAnimationFrame(frame); frame = 0; previous = 0; }
  }
  function animate(time) {
    frame = 0;
    const dt = previous ? Math.min(time - previous, 50) : 0;
    previous = time;
    if (cell.running) {
      cell.phase += dt / 1500;
      byId('moving-arm').setAttribute('transform', `rotate(${Math.sin(cell.phase) * 22} 217 180)`);
    }
    if (teachRunning()) {
      teach.phase += dt / 2300;
      byId('teach-arm').setAttribute('transform', `rotate(${Math.sin(teach.phase) * 18} 300 224)`);
    }
    schedule();
  }
  byId('door-toggle').addEventListener('click', () => {
    cell.door = !cell.door; cell.ready = false; cell.running = false;
    updateCell(cell.door ? 'Tür offen: Die Sicherheitsfunktion löst den Halt aus. Im Modell ohne Nachlauf dargestellt.' : 'Tür geschlossen: Der Roboter bleibt stehen. Bereich kontrollieren, quittieren und anschließend gesondert starten.');
  });
  byId('cell-reset').addEventListener('click', () => {
    if (cell.door) { updateCell('Quittierung gesperrt: Zuerst die Tür schließen und den Gefahrenbereich kontrollieren.'); return; }
    if (cell.running) { updateCell('Automatik läuft bereits. Quittieren löst keine zusätzliche Bewegung aus.'); return; }
    cell.ready = true;
    updateCell('Bereich als frei bestätigt (Annahme im Modell). Quittiert: Der Roboter steht weiterhin. Erst der Startbefehl bewegt ihn.');
  });
  byId('cell-start').addEventListener('click', () => {
    if (cell.door || !cell.ready) { updateCell('Start gesperrt: Tür schließen, Gefahrenbereich kontrollieren und quittieren.'); return; }
    cell.running = true;
    updateCell('Automatik läuft. Öffne die Tür und beobachte den Zustand nach dem erneuten Schließen.');
  });
  byId('cell-restart').addEventListener('click', () => {
    Object.assign(cell, { door: false, ready: false, running: false, phase: 0 });
    byId('moving-arm').removeAttribute('transform');
    updateCell('Ausgangslage: Tür geschlossen, Roboter steht. Die Quittierung fehlt noch.');
  });
  document.querySelectorAll('input[name="enable"]').forEach(input => input.addEventListener('change', () => {
    teach.position = input.value;
    teach.held = false; // A new command is required after a change of permission.
    if (teach.position === 'pressed') teach.rearm = true;
    if (teach.position === 'released') teach.rearm = false;
    updateTeach();
  }));
  const move = byId('teach-move');
  function release() { if (teach.held) { teach.held = false; updateTeach(); } }
  move.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    move.setPointerCapture(event.pointerId);
    teach.held = true; updateTeach();
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(name => move.addEventListener(name, release));
  move.addEventListener('keydown', event => {
    if (![' ', 'Enter'].includes(event.key)) return;
    event.preventDefault();
    if (!event.repeat) { teach.held = true; updateTeach(); }
  });
  move.addEventListener('keyup', event => {
    if ([' ', 'Enter'].includes(event.key)) { event.preventDefault(); release(); }
  });
  move.addEventListener('blur', release);
  window.addEventListener('blur', release);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      release();
      if (cell.running) { cell.running = false; updateCell('Modell angehalten, weil die Seite verlassen wurde. Mit einem neuen Startbefehl fortsetzen.'); }
    }
  });
  byId('teach-reset').addEventListener('click', () => {
    Object.assign(teach, { position: 'released', rearm: false, held: false, phase: 0 });
    document.querySelector('input[name="enable"][value="released"]').checked = true;
    byId('teach-arm').removeAttribute('transform');
    updateTeach();
  });
  reduced.addEventListener('change', () => { release(); schedule(); if (cell.running) updateCell('Automatik läuft.'); });
  const openedForPrint = new Set();
  window.addEventListener('beforeprint', () => {
    release(); cell.running = false; updateCell('Stillstand im Lehrmodell. Schließen, Quittieren und Starten sind getrennte Handlungen.');
    document.querySelectorAll('details:not([open])').forEach(d => { openedForPrint.add(d); d.open = true; });
  });
  window.addEventListener('afterprint', () => { openedForPrint.forEach(d => { d.open = false; }); openedForPrint.clear(); });
  byId('export-pdf').addEventListener('click', () => window.print());
})();
