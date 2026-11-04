(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const wrap = (inside, cls = '', label = '') => `<svg class="${cls}" viewBox="0 0 200 160" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'} xmlns="http://www.w3.org/2000/svg">${inside}</svg>`;
  const line = 'fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"';
  const handPath = 'M62 144 L57 114 39 86 Q32 72 43 69 Q50 67 56 77 L65 89 65 40 Q65 28 75 28 Q85 28 85 40 L85 72 87 23 Q88 11 98 13 Q108 14 107 25 L106 70 111 33 Q113 23 122 25 Q132 27 129 39 L123 77 130 54 Q134 44 143 49 Q150 53 146 65 L137 110 Q132 130 120 142 L118 151 64 151 Z';
  const glove = wrap(`<path d="${handPath}" fill="#62b7d2" stroke="#244c65" stroke-width="4" stroke-linejoin="round"/><path d="M65 136L121 136" stroke="#244c65" stroke-width="3"/><path d="M76 93Q91 83 109 91" fill="none" stroke="#32849e" stroke-width="3"/>`, 'equipment', 'Gant de protection à manchette');
  const hand = wrap(`<path d="${handPath}" fill="#dba47f" stroke="#674738" stroke-width="4" stroke-linejoin="round"/><path d="M75 104Q94 90 112 104" fill="none" stroke="#9e7059" stroke-width="3"/>`, '', 'Une main');
  const goggles = wrap('<path d="M27 66L13 58 7 75 24 89 M173 66L187 58 193 75 176 89" fill="none" stroke="#345767" stroke-width="7"/><path d="M31 56Q100 38 169 56L177 106Q150 123 111 108L107 91 93 91 89 108Q49 122 23 106Z" fill="#bce5ee" stroke="#345767" stroke-width="5"/><path d="M45 62L33 94M59 60L46 96M139 59L129 98M154 63L144 98" stroke="white" stroke-width="6" stroke-linecap="round"/>', 'equipment', 'Lunettes de protection enveloppantes');
  const eyes = wrap('<path d="M18 81Q56 34 91 80Q56 127 18 81Z M109 80Q146 34 182 81Q146 127 109 80Z" fill="#fff" stroke="#674738" stroke-width="5"/><circle cx="56" cy="80" r="18" fill="#6f9675"/><circle cx="146" cy="80" r="18" fill="#6f9675"/><circle cx="56" cy="80" r="8" fill="#2a2525"/><circle cx="146" cy="80" r="8" fill="#2a2525"/><path d="M23 44Q52 24 81 39 M119 38Q149 23 178 44" fill="none" stroke="#674738" stroke-width="7" stroke-linecap="round"/>', '', 'Les yeux');
  const apron = wrap('<path d="M73 47L81 18Q100 4 119 18L127 47" fill="none" stroke="#255368" stroke-width="9"/><path d="M68 37L132 37 137 66 161 94 149 152 51 152 39 94 63 66Z" fill="#4a94a9" stroke="#255368" stroke-width="4"/><path d="M38 95L12 107 M162 95L188 107" stroke="#255368" stroke-width="7" stroke-linecap="round"/><path d="M75 96L125 96 124 123Q100 136 76 123Z" fill="#6db3c3" stroke="#255368" stroke-width="3"/>', 'equipment', 'Tablier de protection');
  const body = wrap('<path d="M65 28L79 17Q100 36 121 17L135 28 171 59 150 83 135 71 140 150 60 150 65 71 50 83 29 59Z" fill="#cdb1a8" stroke="#674738" stroke-width="4"/><path d="M80 20Q100 51 120 20" fill="none" stroke="#674738" stroke-width="4"/>', '', 'Le corps et les vêtements');
  const eyeIcon = wrap(`<path d="M20 80Q100 3 180 80Q100 157 20 80Z" ${line}/><circle cx="100" cy="80" r="27" ${line}/>`);
  const tapIcon = wrap(`<path d="M80 140L47 102Q40 92 50 86Q56 82 65 91L80 104V39Q80 26 91 26Q102 26 102 39V82L117 68Q127 61 135 71L151 91 142 140" ${line}/><path d="M57 48L43 38M121 28L131 15M44 69L26 69" ${line}/>`);
  const personIcon = wrap(`<circle cx="100" cy="37" r="24" ${line}/><path d="M46 144V111Q46 76 100 76Q154 76 154 111V144" ${line}/>`);
  const bookIcon = wrap(`<path d="M100 135Q61 111 24 124V29Q62 16 100 42Q138 16 176 29V124Q138 111 100 135Z M100 42V135" ${line}/>`);
  const icons = { eye: eyeIcon, tap: tapIcon, person: personIcon, book: bookIcon };
  document.querySelectorAll('[data-icon]').forEach(e => { e.innerHTML = icons[e.dataset.icon]; });
  const items = [
    { id: 'mains', part: 'Mes mains', title: 'Des gants', question: 'Je protège mes mains.', partImage: hand, equipment: glove, caption: 'Des gants adaptés au produit, en bon état.', lsf: 'mains' },
    { id: 'yeux', part: 'Mes yeux', title: 'Des lunettes', question: 'Je protège mes yeux.', partImage: eyes, equipment: goggles, caption: 'Des lunettes de protection adaptées aux projections.', lsf: 'yeux' },
    { id: 'corps', part: 'Mon corps', title: 'Un tablier', question: 'Je protège mon corps.', partImage: body, equipment: apron, caption: 'Un tablier de protection adapté au produit.', lsf: 'corps' }
  ];
  for (const item of items) {
    const card = document.createElement('article'); card.className = 'association';
    card.innerHTML = `<div class="body-part">${item.partImage}<p>${item.part}</p></div><span class="visual-arrow" aria-hidden="true">↓</span>${item.equipment}<h3>${item.title}</h3>`;
    $('associations').append(card);
  }
  let currentView = 'observer';
  function showView(view) {
    currentView = view;
    for (const id of ['observer', 'choisir', 'equiper']) {
      $(id).hidden = id !== view;
      const b = $('nav-' + id);
      if (id === view) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    }
    $('titre-' + view).focus();
  }
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
  document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => showView(b.dataset.go)));
  let question = 0, locked = false;
  // Vary answer positions so the learner associates images instead of a fixed position.
  const order = [[2, 0, 1], [1, 2, 0], [0, 1, 2]];
  function renderQuestion() {
    locked = false; const item = items[question];
    $('question-count').textContent = `${question + 1} / 3`;
    $('question-title').textContent = item.question;
    $('question-image').innerHTML = item.partImage;
    $('answers').replaceChildren(); $('feedback').replaceChildren(); $('feedback').className = 'feedback';
    $('retry').hidden = true; $('next-question').hidden = true;
    for (const n of order[question]) {
      const choice = items[n]; const b = document.createElement('button');
      b.type = 'button'; b.className = 'answer'; b.dataset.choice = choice.id;
      b.setAttribute('aria-label', choice.title); b.innerHTML = choice.equipment + `<span class="label">${choice.title}</span>`;
      b.addEventListener('click', () => choose(choice.id)); $('answers').append(b);
    }
  }
  function choose(id) {
    if (locked) return; locked = true;
    const item = items[question], success = id === item.id;
    const selected = Array.from($('answers').children).find(b => b.dataset.choice === id);
    selected.classList.add(success ? 'correct' : 'review'); selected.setAttribute('aria-pressed', 'true');
    const marker = document.createElement('span'); marker.className = 'marker'; marker.setAttribute('aria-hidden', 'true'); marker.textContent = success ? '✓' : '↺'; selected.append(marker);
    const feedback = $('feedback'); feedback.className = 'feedback' + (success ? ' success' : '');
    feedback.innerHTML = `<p><strong>${success ? '✓ Oui !' : '↺ Je regarde, puis je réessaie.'}</strong></p><div class="explanation">${item.partImage}<span class="big-symbol" aria-hidden="true">→</span>${item.equipment}</div>`;
    if (success) {
      $('next-question').hidden = false;
      $('next-question').textContent = question === 2 ? 'Voir la démonstration →' : 'Suivant →';
    } else $('retry').hidden = false;
  }
  $('retry').addEventListener('click', () => { renderQuestion(); $('answers').querySelector('button').focus(); });
  $('next-question').addEventListener('click', () => {
    if (question < 2) { question++; renderQuestion(); $('question-title').setAttribute('tabindex', '-1'); $('question-title').focus(); }
    else { question = 0; renderQuestion(); demoStep = 0; renderDemo(); showView('equiper'); }
  });
  function personScene(step) {
    const hasHands = step >= 2, hasEyes = step >= 1, hasApron = step >= 0;
    return `<svg viewBox="0 0 420 410" role="img" aria-label="${['Personne équipée d’un tablier de protection','Personne équipée d’un tablier et de lunettes de protection','Personne équipée d’un tablier, de lunettes et de gants de protection'][step]}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="340" width="420" height="70" rx="0" fill="#e4d6ce"/>
      <rect x="285" y="246" width="58" height="79" rx="9" fill="#e9e0c8" stroke="#7c6d5e" stroke-width="3"/><rect x="296" y="233" width="35" height="16" rx="4" fill="#687b89"/><rect x="292" y="266" width="44" height="39" rx="3" fill="#fff"/><path d="M299 278H329M299 287H329M299 296H320" stroke="#b0a69c" stroke-width="3"/>
      <path d="M154 182Q207 163 260 184L278 319H134Z" fill="#e6b8b4" stroke="#79524f" stroke-width="3"/>
      <path d="M152 191L105 252 80 218M261 195L286 226" fill="none" stroke="#dba47f" stroke-width="27" stroke-linecap="round"/>
      <path d="M192 146V181Q210 196 229 180V147" fill="#dba47f" stroke="#79524f" stroke-width="3"/>
      <path d="M158 93Q156 26 212 27Q268 27 264 101L253 150 165 146Z" fill="#59423c"/>
      <ellipse cx="211" cy="109" rx="48" ry="58" fill="#dba47f" stroke="#79524f" stroke-width="3"/>
      <path d="M164 85Q169 38 218 43Q247 42 260 85Q229 87 207 64Q188 86 164 85Z" fill="#59423c"/>
      <circle cx="192" cy="108" r="4" fill="#30262a"/><circle cx="231" cy="108" r="4" fill="#30262a"/>
      <path d="M208 113L204 129 214 129M196 143Q210 151 225 141" fill="none" stroke="#875c4b" stroke-width="3" stroke-linecap="round"/>
      ${hasApron ? `<g class="${step === 0 ? 'demo-highlight' : ''}"><path d="M190 181L195 168Q209 162 227 169L233 182" fill="none" stroke="#255368" stroke-width="7"/><path d="M182 180H240L246 205 263 221 263 319H157V220L176 204Z" fill="#4a94a9" stroke="#255368" stroke-width="3"/><path d="M186 254H235V282Q211 294 186 282Z" fill="#74b8c6" stroke="#255368" stroke-width="2"/></g>` : ''}
      ${hasHands ? `<g class="${step === 2 ? 'demo-highlight' : ''}"><path d="M70 223L61 209 59 182Q61 172 67 180L72 193 73 162Q76 151 82 161L86 185 88 168Q91 159 96 169L98 192 101 182Q106 177 111 186L106 213 94 234Z" fill="#62b7d2" stroke="#244c65" stroke-width="3"/><path d="M276 217L294 210 306 222 316 221Q327 222 324 231L304 248 287 244Z" fill="#62b7d2" stroke="#244c65" stroke-width="3"/></g>` : ''}
      ${hasEyes ? `<g class="${step === 1 ? 'demo-highlight' : ''}"><path d="M172 94Q211 84 252 94L248 120Q234 129 217 119L214 110 207 110 204 119Q188 128 174 120Z" fill="#bce5ee" fill-opacity=".72" stroke="#345767" stroke-width="4"/><path d="M184 97L180 115M238 95L234 115" stroke="#fff" stroke-width="4"/></g>` : ''}
      <path d="M44 340H372" stroke="#a68b7b" stroke-width="7" stroke-linecap="round"/>
      <circle cx="371" cy="52" r="24" fill="#e4f2e7"/><path d="M359 52L368 61 384 42" fill="none" stroke="#2e794d" stroke-width="5" stroke-linecap="round"/>
    </svg>`;
  }
  let demoStep = 0;
  function renderDemo() {
    const item = [items[2], items[1], items[0]][demoStep]; $('demo-count').textContent = `${demoStep + 1} / 3`;
    $('demo-title').textContent = item.title; $('demo-equipment').innerHTML = item.equipment;
    $('demo-caption').textContent = item.caption; $('demo-scene').innerHTML = personScene(demoStep);
    $('demo-back').disabled = demoStep === 0;
    $('demo-next').textContent = demoStep === 2 ? 'Recommencer ↺' : 'Suivant →';
  }
  $('demo-back').addEventListener('click', () => { if (demoStep > 0) demoStep--; renderDemo(); });
  $('demo-next').addEventListener('click', () => { demoStep = (demoStep + 1) % 3; renderDemo(); });
  $('demo-replay').addEventListener('click', renderDemo);
  renderQuestion(); renderDemo();
  // Only a locally supplied, explicitly validated clip can enable a LSF button.
  // No generated signing, empty player or imitation of LSF is shown.
  let lsf = {};
  const validClip = clip => clip && clip.validee === true && typeof clip.src === 'string' && /^lsf\/[A-Za-z0-9_.-]+\.mp4$/.test(clip.src);
  function refreshLSF() {
    document.querySelectorAll('[data-lsf]').forEach(b => {
      const clip = lsf[b.dataset.lsf]; b.disabled = !validClip(clip);
      b.textContent = b.disabled ? '▶ LSF · à venir' : '▶ Voir en LSF';
    });
  }
  document.querySelectorAll('[data-lsf]').forEach(b => b.addEventListener('click', () => {
    const clip = lsf[b.dataset.lsf]; if (!validClip(clip)) return;
    $('lsf-video').src = clip.src; $('lsf-dialog').showModal();
  }));
  $('close-lsf').addEventListener('click', () => $('lsf-dialog').close());
  $('lsf-dialog').addEventListener('close', () => { $('lsf-video').pause(); $('lsf-video').removeAttribute('src'); $('lsf-video').load(); });
  fetch('lsf.json').then(r => { if (!r.ok) throw new Error('LSF non configurée'); return r.json(); }).then(async data => {
    lsf = data;
    await Promise.all(Object.keys(lsf).map(async key => {
      if (!validClip(lsf[key])) return;
      try { const response = await fetch(lsf[key].src, { method: 'HEAD' }); if (!response.ok) lsf[key].validee = false; }
      catch { lsf[key].validee = false; }
    }));
    refreshLSF();
    const notice = document.querySelector('.lsf-notice');
    if (['intro','choix','equipement'].every(key => validClip(lsf[key]))) notice.hidden = true;
  }).catch(() => { refreshLSF(); });
})();
