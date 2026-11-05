(() => {
  'use strict';
  const script = document.currentScript;
  if (!script || document.getElementById('cma-portal-return')) return;
  const portal = new URL(script.dataset.portal, location.href);
  if (portal.origin !== location.origin) return;
  const section = script.dataset.section || 'mathematiques';
  portal.hash = section;
  const names = { mathematiques: 'Mathématiques', 'physique-chimie': 'Physique-Chimie', sciences: 'Physique-Chimie', positionnements: 'Positionnements' };
  const bar = document.createElement('aside');
  bar.id = 'cma-portal-return';
  bar.setAttribute('aria-label', 'Retour au portail pédagogique');
  const link = document.createElement('a');
  link.href = portal.href;
  link.className = 'cma-portal-return-link';
  const icon = document.createElement('span'); icon.textContent = '←'; icon.setAttribute('aria-hidden', 'true');
  const text = document.createElement('span'); text.textContent = 'Retour au portail';
  link.append(icon, text);
  const label = document.createElement('span');
  label.className = 'cma-portal-return-context';
  label.textContent = names[section] + ' · ' + script.dataset.label;
  bar.append(link, label);
  document.body.append(bar);
  document.body.classList.add('cma-has-portal-return');
  let dirty = false, leaving = false;
  function beforeUnload(event) {
    if (!dirty || leaving) return;
    event.preventDefault(); event.returnValue = '';
  }
  function markDirty(event) {
    const target = event.target;
    if (!target || !target.matches) return;
    if ((event.type !== 'click' && target.matches('textarea,select,input:not([type=range]):not([type=color]):not([type=button]):not([type=submit]):not([type=reset]):not([type=hidden])')) ||
        (event.type === 'click' && target.closest('[data-answer],[data-choice],[data-ticket],[data-group],[data-value],[data-total],[data-most],.answer-option'))) {
      if (!dirty) { dirty = true; window.addEventListener('beforeunload', beforeUnload); }
    }
  }
  document.addEventListener('input', markDirty, true);
  document.addEventListener('change', markDirty, true);
  document.addEventListener('click', markDirty, true);
  // Harmonise aussi les anciens liens de retour, sans toucher aux liens entre outils.
  for (const anchor of document.querySelectorAll('a[href]')) {
    try {
      const url = new URL(anchor.getAttribute('href'), location.href);
      if (url.origin === portal.origin && url.pathname === portal.pathname) anchor.href = portal.href;
    } catch {}
  }
  document.addEventListener('click', event => {
    const anchor = event.target.closest && event.target.closest('a[href]');
    if (!anchor || event.defaultPrevented || event.button > 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin !== portal.origin || url.pathname !== portal.pathname) return;
    if (dirty && !window.confirm('Tu as commencé cette activité. En revenant au portail, tes réponses et ta progression dans cette page pourraient être perdues. Revenir au portail ?')) {
      event.preventDefault(); return;
    }
    leaving = true;
  }, true);
  window.addEventListener('pageshow', () => { leaving = false; });
})();
