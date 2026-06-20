(function () {
  if (window.innerWidth >= 768) return;

  // ── Styles ────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '@media (max-width: 767px) {',
    '  body { padding-bottom: 72px !important; }',

    /* hide top nav-links on mobile — bottom bar replaces them */
    '  .nav-links { display: none !important; }',

    /* keep the top nav brand but tighten it */
    '  nav { padding: 10px 16px !important; }',
    '  .nav-brand { gap: 8px !important; }',
    '  .nav-brand img { height: 24px !important; }',
    '  .nav-tag { display: none !important; }',

    /* sticky-nav: let it scroll but shrink font */
    '  .sticky-nav { padding: 0 12px !important; gap: 6px !important; }',
    '  .snav-btn { font-size: 11px !important; padding: 6px 10px !important; }',

    /* bottom bar */
    '  #atlas-mobile-nav {',
    '    display: flex !important;',
    '  }',
    '}',

    '#atlas-mobile-nav {',
    '  display: none;',
    '  position: fixed !important;',
    '  top: auto !important;',
    '  bottom: 0 !important; left: 0 !important; right: 0 !important;',
    '  z-index: 9999 !important;',
    '  background: rgba(4, 6, 15, 0.92);',
    '  backdrop-filter: blur(18px);',
    '  -webkit-backdrop-filter: blur(18px);',
    '  border-top: 1px solid rgba(0, 200, 255, 0.18);',
    '  box-shadow: 0 -4px 24px rgba(0,0,0,0.6);',
    '  padding-bottom: env(safe-area-inset-bottom);',
    '}',

    '.amn-btn {',
    '  flex: 1;',
    '  display: flex;',
    '  flex-direction: column;',
    '  align-items: center;',
    '  justify-content: center;',
    '  gap: 4px;',
    '  min-height: 60px;',
    '  padding: 8px 4px;',
    '  color: #64748b;',
    '  text-decoration: none;',
    '  font-size: 10px;',
    '  font-weight: 600;',
    '  letter-spacing: .06em;',
    '  text-transform: uppercase;',
    '  background: none;',
    '  border: none;',
    '  cursor: pointer;',
    '  -webkit-tap-highlight-color: transparent;',
    '  transition: color .2s, transform .15s;',
    '  font-family: inherit;',
    '}',

    '.amn-btn:active { transform: scale(0.88); }',

    '.amn-btn.amn-primary {',
    '  color: #00c8ff;',
    '  filter: drop-shadow(0 0 6px rgba(0,200,255,.6));',
    '}',

    '.amn-btn.amn-cta {',
    '  color: #04060f;',
    '  background: linear-gradient(180deg, #dff3ff, #7fd8ff 60%, #36b8ff);',
    '  border-radius: 8px;',
    '  margin: 8px 4px;',
    '  min-height: 44px;',
    '  padding: 4px 8px;',
    '  font-size: 10px;',
    '  flex: 1.2;',
    '}',

    '.amn-icon { font-size: 18px; line-height: 1; }',
  ].join('\n');
  document.head.appendChild(style);

  // ── Read links from the existing top nav ──────────────────
  var navLinks = document.querySelectorAll('.nav-links a.nav-link, .nav-links button.nav-link');
  if (!navLinks.length) return;

  // ── Build bottom bar ──────────────────────────────────────
  var bar = document.createElement('div');
  bar.id = 'atlas-mobile-nav';
  bar.setAttribute('role', 'navigation');
  bar.setAttribute('aria-label', 'Mobile navigation');

  var ICONS = {
    'return': '←',
    'exam':   '📋',
    'practice': '🧪',
    'enroll': '🚀',
    'portal': '🏠',
    'sign':   '🔑',
  };

  function iconFor(text) {
    var t = text.toLowerCase();
    if (t.includes('return') || t.includes('portal') && t.includes('return')) return ICONS['return'];
    if (t.includes('exam'))     return ICONS['exam'];
    if (t.includes('practice')) return ICONS['practice'];
    if (t.includes('enroll'))   return ICONS['enroll'];
    if (t.includes('portal'))   return ICONS['portal'];
    if (t.includes('sign'))     return ICONS['sign'];
    return '•';
  }

  function labelFor(text) {
    var t = text.trim();
    // strip trailing arrow chars
    t = t.replace(/[›»→º]+$/, '').trim();
    if (t.length > 10) {
      if (t.includes('Return')) return 'Back';
      if (t.includes('Exam'))   return 'Exam';
      if (t.includes('Practice')) return 'Practice';
      if (t.includes('Enroll')) return 'Enroll';
      if (t.includes('Student')) return 'Portal';
      if (t.includes('Sign'))   return 'Sign In';
      return t.substring(0, 9);
    }
    return t;
  }

  navLinks.forEach(function (el) {
    var rawText = el.textContent || '';
    // skip disabled / coming-soon items
    if (rawText.includes('Coming Soon')) return;

    var btn = document.createElement('a');
    var isCta = el.classList.contains('cta');
    var isReturn = rawText.includes('Return');

    btn.className = 'amn-btn' + (isCta ? ' amn-cta' : '') + (isReturn ? ' amn-primary' : '');
    btn.setAttribute('aria-label', rawText.trim());

    if (el.tagName === 'A') {
      btn.href = el.getAttribute('href') || '#';
      if (el.getAttribute('target')) btn.target = el.getAttribute('target');
    } else {
      // button with onclick
      btn.href = '#';
      var onclick = el.getAttribute('onclick');
      if (onclick) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          // eslint-disable-next-line no-eval
          try { eval(onclick); } catch(err) {}
        });
      }
    }

    btn.innerHTML =
      '<span class="amn-icon">' + iconFor(rawText) + '</span>' +
      '<span>' + labelFor(rawText) + '</span>';

    bar.appendChild(btn);
  });

  document.body.appendChild(bar);
})();
