(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const svg = (body, label = '') => `<svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}>${body}</svg>`;
  const scissors = svg('<circle cx="42" cy="96" r="20" fill="#fff" stroke="#496375" stroke-width="7"/><circle cx="111" cy="96" r="20" fill="#fff" stroke="#496375" stroke-width="7"/><path d="M53 80L115 15Q125 5 122 21L82 76M101 80L40 15Q30 5 33 21L73 76" fill="#ced9dd" stroke="#496375" stroke-width="5"/><circle cx="78" cy="69" r="7" fill="#ee3c3d"/>', 'Ciseaux : coupe');
  const dryer = svg('<path d="M36 25H106Q130 25 130 50Q130 75 106 75H36L21 64V36Z" fill="#69aebd" stroke="#285669" stroke-width="5"/><path d="M21 36H7V64H21M62 75L72 112H96L88 75" fill="#477f95" stroke="#285669" stroke-width="5"/><path d="M94 110Q120 129 140 114" fill="none" stroke="#285669" stroke-width="5"/><circle cx="108" cy="49" r="13" fill="#fff" stroke="#285669" stroke-width="3"/><path d="M104 37V61M112 38V60" stroke="#285669" stroke-width="2"/>', 'Sèche-cheveux : brushing');
  const colour = svg('<path d="M84 72L115 13 129 21 99 80" fill="#965564" stroke="#68323d" stroke-width="4"/><path d="M111 18L105 31 127 42 134 28Z" fill="#b79a85" stroke="#68323d" stroke-width="3"/><path d="M25 66H132Q125 114 80 114Q35 114 25 66Z" fill="#bd6074" stroke="#68323d" stroke-width="5"/><ellipse cx="78" cy="66" rx="53" ry="13" fill="#f6e4cc" stroke="#68323d" stroke-width="4"/><path d="M131 70L148 65V82L132 83" fill="none" stroke="#68323d" stroke-width="5"/>', 'Bol et pinceau : coloration');
  const balayage = svg('<path d="M47 23L105 12 132 110 65 120Z" fill="#d5dce0" stroke="#5a6b75" stroke-width="4"/><path d="M64 25Q92 53 84 107M77 22Q108 51 98 109M88 21Q120 52 111 105" fill="none" stroke="#bd914d" stroke-width="7"/><path d="M42 16L69 53 56 63 27 27Z" fill="#6e4e44" stroke="#4b3936" stroke-width="3"/><path d="M52 47L76 72 60 86 36 61Z" fill="#b49274" stroke="#4b3936" stroke-width="3"/>', 'Mèche et pinceau : balayage');
  const care = svg('<rect x="46" y="44" width="68" height="75" rx="12" fill="#95ba9f" stroke="#42694e" stroke-width="5"/><path d="M61 44V30H100V44M78 30V14H122V28H107" fill="#d0ddd0" stroke="#42694e" stroke-width="5"/><rect x="58" y="61" width="44" height="42" rx="5" fill="#f6f5df"/><path d="M80 69Q100 84 80 98Q60 84 80 69Z" fill="#739976"/>', 'Flacon de soin capillaire');
  const eye = svg('<path d="M12 65Q80 -2 148 65Q80 132 12 65Z" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="80" cy="65" r="22" fill="none" stroke="currentColor" stroke-width="6"/>');
  const tap = svg('<path d="M65 120L35 89Q28 80 37 74L60 88V30Q60 17 71 17Q82 17 82 30V65L96 54Q105 50 111 59L131 81 122 120" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M39 32L27 24M103 21L111 9" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>');
  const table = svg('<rect x="18" y="15" width="124" height="100" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M18 48H142M18 80H142M60 15V115M103 15V115" stroke="currentColor" stroke-width="5"/>');
  const basket = svg('<path d="M19 51H141L123 113H38Z M45 51L64 15M116 51L97 15" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M62 66L66 99M97 66L93 99" stroke="currentColor" stroke-width="5"/>');
  const icons = {eye,tap,table,basket};
  document.querySelectorAll('[data-icon]').forEach(e => { e.innerHTML = icons[e.dataset.icon]; });
  const services = { C:{name:'Coupe',image:scissors}, K:{name:'Coloration',image:colour}, B:{name:'Balayage',image:balayage}, S:{name:'Soin',image:care}, R:{name:'Brushing',image:dryer} };
  const smallSeries = ['C','R','K','C','R','C','K','R','C','K','R','C'];
  const fullSeries = window.STAT_VISUAL_DATA.slice();
  let mode = 12, series = smallSeries.slice(), categories = ['C','R','K'];
  let assigned = new Set(), selected = null, exampleTarget = null;
  let goodRows = new Set(), wrongRows = {}, totalGood = false, mostGood = false;
  function counts() { const result = {}; for (const key of categories) result[key] = series.filter(c => c === key).length; return result; }
  function show(view) {
    for (const name of ['observer','trier','tableau']) {
      $(name).hidden = name !== view;
      if (name === view) $('nav-'+name).setAttribute('aria-current','step'); else $('nav-'+name).removeAttribute('aria-current');
    }
    if (view === 'tableau') renderTable();
    $('titre-'+view).focus();
  }
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => show(b.dataset.view)));
  document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => show(b.dataset.go)));
  function setMode(n) {
    mode = n; series = (n === 12 ? smallSeries : fullSeries).slice(); categories = n === 12 ? ['C','R','K'] : ['C','K','B','S','R'];
    assigned = new Set(); selected = null; exampleTarget = null; goodRows = new Set(); wrongRows = {}; totalGood = false; mostGood = false;
    $('mode12').setAttribute('aria-pressed',String(n === 12)); $('mode40').setAttribute('aria-pressed',String(n === 40));
    $('sort-feedback').replaceChildren(); renderLegend(); renderSort(); renderTable(); show('observer');
  }
  $('mode12').addEventListener('click', () => setMode(12)); $('mode40').addEventListener('click', () => setMode(40));
  $('restart').addEventListener('click', () => setMode(mode));
  function renderLegend() {
    $('legend').replaceChildren();
    for (const code of categories) {
      const card = document.createElement('article'); card.className = 'legend-card';
      card.innerHTML = services[code].image + `<h3>${services[code].name}</h3>`; $('legend').append(card);
    }
    $('one-ticket').innerHTML = services.C.image;
  }
  function renderSort() {
    $('tickets').replaceChildren(); $('groups').replaceChildren();
    $('sort-progress').max = series.length; $('sort-progress').value = assigned.size;
    $('sort-count').textContent = `${assigned.size} / ${series.length}`;
    series.forEach((code,i) => {
      const b = document.createElement('button'); b.type = 'button';
      b.className = 'ticket' + (assigned.has(i) ? ' sorted' : selected === i ? ' selected' : '');
      b.setAttribute('aria-label', `${services[code].name}, prestation ${i+1}${assigned.has(i)?', déjà regroupée':''}`);
      b.setAttribute('aria-pressed',String(selected === i)); b.dataset.ticket = String(i); b.disabled = assigned.has(i); b.innerHTML = services[code].image;
      b.addEventListener('click', () => { selected = i; exampleTarget = null; $('sort-feedback').replaceChildren(); renderSort(); });
      $('tickets').append(b);
    });
    for (const code of categories) {
      const group = document.createElement('article'); group.className = 'group' + (exampleTarget === code ? ' demo-running' : '');
      const button = document.createElement('button'); button.type='button'; button.dataset.group=code;
      button.setAttribute('aria-label','Groupe '+services[code].name); button.innerHTML=services[code].image+`<span>${services[code].name}</span>`;
      button.addEventListener('click',()=>place(code)); group.append(button);
      const tally = categories.includes(code) ? [...assigned].filter(i=>series[i]===code).length : 0;
      const label=document.createElement('div');label.className='group-count';label.innerHTML=`<span>Effectif</span><b>${tally}</b>`;group.append(label);
      const mini=document.createElement('div');mini.className='miniatures';mini.setAttribute('aria-hidden','true');mini.innerHTML=services[code].image.repeat(tally);group.append(mini);$('groups').append(group);
    }
    $('show-example').disabled = assigned.size === series.length;
  }
  function pictureFeedback(text,code,success) {
    const f=$('sort-feedback');f.className='feedback'+(success?' success':'');
    f.innerHTML=`<p><strong>${text}</strong></p><div class="association-correction">${services[code].image}<span aria-hidden="true">→</span><span class="small-icon">${basket}</span>${services[code].image}</div>`;
  }
  function place(code) {
    if(selected === null) { $('sort-feedback').innerHTML=`<p><strong>1 · Je touche d’abord une image.</strong></p><span class="small-icon">${tap}</span>`; return; }
    const actual=series[selected];
    if(code !== actual) { pictureFeedback('↺ Je cherche le même dessin.',actual,false);return; }
    assigned.add(selected);selected=null;exampleTarget=null;pictureFeedback('✓ Dans le même groupe.',actual,true);renderSort();
    if(assigned.size===series.length)$('sort-feedback').innerHTML=`<p><strong>✓ ${series.length} / ${series.length}</strong></p><p>Toutes les images sont regroupées.</p><span class="small-icon">${table}</span>`;
  }
  $('show-example').addEventListener('click',()=>{
    const i=series.findIndex((_,i)=>!assigned.has(i));if(i<0)return;
    selected=i;exampleTarget=series[i];renderSort();pictureFeedback('Je touche cette image, puis le groupe avec le même dessin.',series[i],false);
  });
  $('go-table').addEventListener('click',()=>show('tableau'));
  function options(correct, code) { const values=[Math.max(0,correct-1),correct,correct+1];const offset=categories.indexOf(code)%3;return values.slice(offset).concat(values.slice(0,offset)); }
  function renderTable() {
    const n=counts();$('visual-table').replaceChildren();
    for(const code of categories) {
      const row=document.createElement('div');row.className='visual-row';
      const label=document.createElement('div');label.className='row-service';label.innerHTML=services[code].image+`<strong>${services[code].name}</strong>`;row.append(label);
      const images=document.createElement('div');images.className='row-images';images.setAttribute('aria-label',`${n[code]} prestations ${services[code].name}`);images.innerHTML=services[code].image.repeat(n[code]);row.append(images);
      const answer=document.createElement('div');answer.className='row-answer';const numbers=document.createElement('div');numbers.className='number-options';numbers.setAttribute('role','group');numbers.setAttribute('aria-label','Effectif de '+services[code].name);
      for(const value of options(n[code], code)) {
        const b=document.createElement('button');b.type='button';b.dataset.code=code;b.dataset.value=String(value);
        b.id=`effectif-${code}-${value}`;b.className='number-button'+(goodRows.has(code)&&value===n[code]?' right':wrongRows[code]===value?' wrong':'');
        b.textContent=String(value)+(goodRows.has(code)&&value===n[code]?' ✓':'');b.setAttribute('aria-label',`${value} ${services[code].name}`);b.disabled=goodRows.has(code);
        b.addEventListener('click',()=>{
          if(value===n[code]) {goodRows.add(code);delete wrongRows[code];} else wrongRows[code]=value;
          renderTable();if(!goodRows.has(code))$(`effectif-${code}-${value}`).focus();
        });numbers.append(b);
      }
      answer.append(numbers);const feedback=document.createElement('p');feedback.className='row-feedback';feedback.setAttribute('role','status');feedback.textContent=goodRows.has(code)?'✓ Effectif trouvé':wrongRows[code]!==undefined?'↺ Je recompte les images.':'Je compte les images.';answer.append(feedback);row.append(answer);$('visual-table').append(row);
    }
    renderTotal(n);renderMost(n);
  }
  function renderTotal(n) {
    const target=$('total-question');target.replaceChildren();const title=document.createElement('div');title.className='total-title';title.innerHTML=table+'<span>Tout le salon = ?</span>';target.append(title);
    const sum=document.createElement('div');sum.className='sum';
    categories.forEach((code,i)=>{if(i){const plus=document.createElement('span');plus.textContent='+';sum.append(plus);}const term=document.createElement('span');term.className='sum-term';term.innerHTML=services[code].image+`<b>${goodRows.has(code)?n[code]:'?'}</b>`;sum.append(term);});target.append(sum);
    const numbers=document.createElement('div');numbers.className='number-options';numbers.setAttribute('role','group');numbers.setAttribute('aria-label','Effectif total');
    for(const v of [series.length-2,series.length,series.length+2]) {
      const b=document.createElement('button');b.type='button';b.dataset.total=String(v);b.className='number-button'+(totalGood&&v===series.length?' right':'');b.textContent=String(v)+(totalGood&&v===series.length?' ✓':'');b.disabled=goodRows.size!==categories.length||totalGood;
      b.addEventListener('click',()=>{if(v===series.length){totalGood=true;renderTable();}else {b.classList.add('wrong');const msg=document.createElement('p');msg.className='row-feedback';msg.setAttribute('role','status');msg.textContent='↺ Je réunis tous les groupes.';numbers.querySelectorAll('.row-feedback').forEach(e=>e.remove());numbers.append(msg);}});numbers.append(b);
    }target.append(numbers);
    const caption=document.createElement('p');caption.className='row-feedback';caption.textContent=totalGood?'✓ Effectif total : '+series.length:goodRows.size===categories.length?'Je réunis tous les groupes.':'Je complète d’abord chaque ligne.';target.append(caption);
  }
  function renderMost(n) {
    const target=$('most-question');target.hidden=!totalGood;target.replaceChildren();if(!totalGood)return;
    const heading=document.createElement('h3');heading.className='center';heading.textContent='Quel groupe est le plus grand ?';target.append(heading);
    const choices=document.createElement('div');choices.className='most-options';
    const maximum=Math.max(...Object.values(n));
    for(const code of categories) {
      const b=document.createElement('button');b.type='button';b.dataset.most=code;b.setAttribute('aria-label',services[code].name);b.innerHTML=services[code].image+`<span>${services[code].name}</span>`;
      b.addEventListener('click',()=>{
        const correct=n[code]===maximum;mostGood=correct;const f=document.createElement('div');f.className='most-feedback';f.setAttribute('role','status');
        f.innerHTML=correct?`<strong>✓</strong> ${services[code].image} <strong>${n[code]}</strong><p>Le plus grand effectif.</p>`:'<strong>↺</strong><p>Je compare les nombres du tableau.</p>';
        target.querySelector('.most-feedback')?.remove();target.append(f);
      });choices.append(b);
    }target.append(choices);
  }
  let lsf={};const validClip=c=>c&&c.validee===true&&typeof c.src==='string'&&/^lsf\/[A-Za-z0-9_.-]+\.mp4$/.test(c.src);
  function refreshLSF(){document.querySelectorAll('[data-lsf]').forEach(b=>{b.disabled=!validClip(lsf[b.dataset.lsf]);b.textContent=b.disabled?'▶ LSF · à venir':'▶ Voir en LSF';});}
  document.querySelectorAll('[data-lsf]').forEach(b=>b.addEventListener('click',()=>{const clip=lsf[b.dataset.lsf];if(!validClip(clip))return;$('lsf-video').src=clip.src;$('lsf-dialog').showModal();}));
  $('close-lsf').addEventListener('click',()=>$('lsf-dialog').close());$('lsf-dialog').addEventListener('close',()=>{$('lsf-video').pause();$('lsf-video').removeAttribute('src');$('lsf-video').load();});
  fetch('lsf.json').then(r=>{if(!r.ok)throw Error('LSF absente');return r.json();}).then(async data=>{if(!data||typeof data!=='object')return;lsf=data;await Promise.all(Object.keys(lsf).map(async key=>{if(!validClip(lsf[key]))return;try{if(!(await fetch(lsf[key].src,{method:'HEAD'})).ok)lsf[key].validee=false;}catch{lsf[key].validee=false;}}));refreshLSF();if(['observer','trier','tableau'].every(k=>validClip(lsf[k])))document.querySelector('.lsf-notice').hidden=true;}).catch(refreshLSF);
  setMode(12);
})();
