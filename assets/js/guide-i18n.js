/* Sentence-level translation for the long English guide sections.
   Dictionaries (assets/js/guide-i18n-<lang>.js) map an English sentence or text node to its translation.
   Text without an entry stays English and is counted, so coverage can be measured. English is always restorable. */
(function () {
  'use strict';
  var SEL = '[data-dch-guide-root], [lang="en"][data-dch-no-i18n], p.seo-summary-v12[data-dch-no-i18n], label[data-dch-no-i18n], .toc-v12-content, .page-meta-v12';
  var SKIP = '#costModel,#costShare,script,style,pre,code,.dch-guide-language-note,[data-dch-keep-en]';
  var orig = new WeakMap(), loaded = {}, loading = {};
  function lang() { return (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || document.documentElement.lang || 'en'; }
  function units(text) {
    var m = String(text).match(/^(\s*)([\s\S]*?)(\s*)$/);
    var core = m[2];
    if (!core) return {pre: m[1], parts: [], post: m[3]};
    var parts = core.split(/(?<=[.!?])(?<!\b[A-Z]\.)(?<!\b(?:e\.g|i\.e|vs|approx|No)\.)\s+(?=[A-Z0-9(\u201c"])/);
    return {pre: m[1], parts: parts, post: m[3]};
  }
  function textNodes() {
    var out = [];
    document.querySelectorAll(SEL).forEach(function (root) {
      if (root.closest('#costModel,#costShare')) return;
      root.setAttribute('data-dch-guide-root', '1');
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
      while ((n = w.nextNode())) {
        var p = n.parentElement;
        if (!p || p.closest(SKIP) || !n.nodeValue.trim()) continue;
        out.push(n);
      }
    });
    return out;
  }
  var ATTRS = ['Back to home', 'Site information'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function dated(s, l) {
    var r = s.match(/^Updated (January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4}) \u2022 Estimated reading time: (\d+) ?\S+$/);
    if (r) {
      var d2 = new Date(Date.UTC(+r[3], MONTHS.indexOf(r[1]), +r[2])), lc = l === 'es' ? 'es-ES' : l === 'zh-CN' ? 'zh-CN' : 'fil-PH';
      var f2 = new Intl.DateTimeFormat(lc, {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}).format(d2), k = r[4];
      if (l === 'es') return 'Actualizado: ' + f2 + ' \u2022 Tiempo estimado de lectura: ' + k + ' min';
      if (l === 'zh-CN') return '更新日期：' + f2 + ' \u2022 预计阅读时间：' + k + ' 分钟';
      return 'Na-update: ' + f2 + ' \u2022 Tinatayang oras ng pagbasa: ' + k + ' min';
    }
    var m = s.match(/^Updated (January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4})\.?$/);
    if (!m) return null;
    var dt = new Date(Date.UTC(+m[3], MONTHS.indexOf(m[1]), +m[2])), loc = l === 'es' ? 'es-ES' : l === 'zh-CN' ? 'zh-CN' : 'fil-PH';
    var f = new Intl.DateTimeFormat(loc, {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}).format(dt);
    return (l === 'es' ? 'Actualizado: ' : l === 'zh-CN' ? '更新日期：' : 'Na-update: ') + f + (l === 'zh-CN' || !/\.$/.test(s) ? '' : '.');
  }
  var DYN = ['Check the waist, neck and hip measurements.', 'Enter positive measurements in inches and a positive weight in pounds.', 'These measurements do not produce a valid estimate.', 'Invalid input', 'Enter valid values.', 'Check the vehicle price, down payment and fees.', 'Enter an amount and a positive exchange rate.', 'Enter a valid first day of the last period.', '40 weeks'];
  var MANGLED = {'Check the vehicle price, down payment and fees.': ['Check the vehicle price, down payment y fees.'], '40 weeks': ['40 Linggo']};
  function fixInvalid() {
    var l = lang(), all = window.DCH_GUIDE_I18N || {}, d = l === 'en' ? null : all[l];
    document.querySelectorAll('.result-main, #weeks').forEach(function (e) {
      var cur = e.textContent.trim();
      DYN.forEach(function (k) {
        var variants = [k, k.replace(/ and /g, ' y '), k.replace(/ and /g, ' at ')].concat(MANGLED[k] || []);
        Object.keys(all).forEach(function (g) { if (all[g][k]) variants.push(all[g][k]); });
        if (variants.indexOf(cur) < 0) return;
        var t = (d && d[k]) || k;
        if (cur !== t) e.textContent = t;
      });
    });
  }
  ['input', 'click', 'change'].forEach(function (ev) { document.addEventListener(ev, function () { setTimeout(fixInvalid, 30); }, true); });
  var uiTimer = 0, uiRuns = 0; var UIKEYS = ['Save calculator', 'Saved \u2713'], UIBAD = {'I-i-print / PDF': 'I-print / PDF'}, uiBusy = false;
  function fixUi() {
    if (uiBusy) return; uiBusy = true;
    var l = lang(), all = window.DCH_GUIDE_I18N || {}, d = l === 'en' ? null : all[l];
    document.querySelectorAll('.dch-favorite-btn span:last-child').forEach(function (e) {
      var cur = e.textContent.trim();
      UIKEYS.forEach(function (k) {
        var v = [k]; Object.keys(all).forEach(function (g) { if (all[g][k]) v.push(all[g][k]); });
        if (v.indexOf(cur) < 0) return;
        var t = (d && d[k]) || k; if (cur !== t) e.textContent = t;
      });
    });
    document.querySelectorAll('.result-list li strong').forEach(function (e) {
      var cur = e.textContent.trim(); ['Estimate calculated'].forEach(function (k) {
        var v = [k]; Object.keys(all).forEach(function (g) { if (all[g][k]) v.push(all[g][k]); });
        if (v.indexOf(cur) < 0) return; var t = (d && d[k]) || k; if (cur !== t) e.textContent = t; });
    });
    var LBL = {'Total interest over full term:': ['Kabuuang Tagal ng interes sa loob ng buo:'], 'Remaining balance after elapsed years:': ['Natitirang balanse pagkatapos ng elapsed Taon:'], 'Paid off after:': [], 'Total interest with the extra payment:': [], 'Interest saved:': [], 'Calculation status:': [], 'Total payments simulated:': []};
    document.querySelectorAll('.result-list li').forEach(function (li) {
      var n = li.firstChild; if (!n || n.nodeType !== 3) return;
      var cur = n.nodeValue.trim();
      Object.keys(LBL).forEach(function (k) {
        var v = [k].concat(LBL[k]); Object.keys(all).forEach(function (g) { if (all[g][k]) v.push(all[g][k]); });
        if (v.indexOf(cur) < 0) return;
        var t = ((d && d[k]) || k) + ' ';
        if (n.nodeValue !== t) n.nodeValue = t;
      });
    });
    if (l === 'fil') document.querySelectorAll('button').forEach(function (b) { var c = b.textContent.trim(); if (UIBAD[c]) b.textContent = UIBAD[c]; });
    uiBusy = false;
  }
  if (window.MutationObserver) new MutationObserver(function () { if (uiTimer || uiRuns > 40) return; uiTimer = setTimeout(function () { uiTimer = 0; uiRuns++; fixUi(); }, 60); }).observe(document.documentElement, {childList: true, subtree: true, characterData: true});
  function dict(l) { return window.DCH_GUIDE_I18N && window.DCH_GUIDE_I18N[l]; }
  function apply(l) {
    var d = l === 'en' ? null : dict(l), missing = 0, total = 0, missList = [];
    textNodes().forEach(function (n) {
      var r = orig.get(n);
      if (!r) { r = {o: n.nodeValue, t: null}; orig.set(n, r); }
      else if (n.nodeValue !== r.o && n.nodeValue !== r.t) { r.o = n.nodeValue; r.t = null; }
      var rec = r.o;
      if (!d) { if (n.nodeValue !== rec) n.nodeValue = rec; r.t = null; return; }
      if (!/[A-Za-z\u00C0-\u024F\u4e00-\u9fff]/.test(rec)) { r.t = null; return; }
      if (n.parentElement.closest('.page-meta-v12') && !/^Updated /.test(rec)) { r.t = null; return; }
      var u = units(rec), whole = d[u.parts.join(' ')];
      if (!whole && u.parts.length === 1) whole = dated(u.parts[0], l);
      var out;
      if (whole) out = whole;
      else out = u.parts.map(function (s) { total++; var t = d[s] || dated(s, l); if (t) return t; missing++; missList.push(s); return s; }).join(' ');
      if (whole) total++;
      r.t = u.pre + out + u.post; n.nodeValue = r.t;
    });
    fixInvalid();
    uiRuns = 0; fixUi();
    document.querySelectorAll('[aria-label],[title]').forEach(function (e) {
      ['aria-label', 'title'].forEach(function (a) {
        var v = e.getAttribute(a), k = 'dchGuideO' + a.replace('-', '');
        if (v === null) return;
        var o = e.dataset[k];
        if (o === undefined) { if (ATTRS.indexOf(v) < 0) return; o = v; e.dataset[k] = v; }
        var t = d && d[o];
        e.setAttribute(a, t || o);
      });
    });
    document.querySelectorAll(SEL).forEach(function (r) { if (!r.closest('#costModel,#costShare')) r.setAttribute('lang', l === 'en' || !d ? 'en' : l); });
    document.querySelectorAll('.dch-guide-language-note').forEach(function (note) { if (d && missing === 0) { note.setAttribute('data-dch-guide-complete', 'true'); note.hidden = true; } else note.removeAttribute('data-dch-guide-complete'); });
    window.DCHGuideI18N.lastCoverage = {language: l, units: total, missing: missing, list: missList};
    document.dispatchEvent(new CustomEvent('dch:guideapplied', {detail: {language: l}}));
  }
  function load(l, cb) {
    if (l === 'en' || dict(l)) { cb(); return; }
    if (loading[l]) { loading[l].push(cb); return; }
    loading[l] = [cb];
    var s = document.createElement('script');
    s.src = 'assets/js/guide-i18n-' + l + '.js?v=20261202';
    s.onload = s.onerror = function () { var q = loading[l]; loading[l] = null; q.forEach(function (f) { f(); }); };
    document.head.appendChild(s);
  }
  function run() { var l = lang(); load(l, function () { if (lang() === l) apply(l); }); }
  window.DCHGuideI18N = {units: units, textNodes: textNodes, apply: apply, run: run, lastCoverage: null};
  document.addEventListener('dch:languagechange', run);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once: true}); else run();
  if (window.DCHI18NLoader && window.DCHI18NLoader.ready) window.DCHI18NLoader.ready.then(run);

  /* Keep the user's entries when the language is switched. The shared loader reloads the page on a switch, which
     used to put every input back to its start value and drop a shown result or error. We save the entries and the
     last calculated entries before the reload, then restore: re-calculate the calculated entries, then put back
     any edits that were not calculated yet, without calculating them. */
  (function scenarioText() {
    var T = {
      'Enter a valid scenario before saving or comparing.': ['Ingresa un escenario válido antes de guardar o comparar.', '保存或比较之前，请先输入有效的情景。', 'Maglagay ng wastong senaryo bago mag-save o magkumpara.'],
      'Previous comparison \u2014 inputs have changed': ['Comparación anterior: los datos han cambiado', '上一次比较：输入已更改', 'Nakaraang paghahambing: nagbago ang mga input'],
      'Inputs changed. Select Compare current to refresh the comparison.': ['Los datos cambiaron. Selecciona Comparar actual para actualizar la comparación.', '输入已更改。选择“比较当前”以刷新比较。', 'Nagbago ang mga input. Piliin ang Ikumpara ang kasalukuyan para i-refresh ang paghahambing.'],
      'Baseline and current scenario': ['Base y escenario actual', '基准与当前情景', 'Baseline at kasalukuyang senaryo'],
      'Saved baseline': ['Base guardada', '已保存的基准', 'Naka-save na baseline'],
      'Input or result': ['Dato o resultado', '输入或结果', 'Input o resulta'],
      'Current calculation': ['Cálculo actual', '当前计算', 'Kasalukuyang kalkulasyon'],
      'Inputs': ['Datos', '输入', 'Mga input'],
      'Results': ['Resultados', '结果', 'Mga resulta'],
      'Not used': ['No se usa', '未使用', 'Hindi ginamit'],
      'Not compared yet': ['Aún sin comparar', '尚未比较', 'Hindi pa naikukumpara'],
      'Baseline saved. Change an input, then select Compare current.': ['Base guardada. Cambia un dato y luego selecciona Comparar actual.', '基准已保存。请修改一个输入，然后选择“比较当前”。', 'Na-save ang baseline. Magpalit ng input, saka piliin ang Ikumpara ang kasalukuyan.'],
      'Comparison updated from the inputs shown in each column.': ['Comparación actualizada con los datos mostrados en cada columna.', '比较已根据各列显示的输入更新。', 'Na-update ang paghahambing batay sa mga input na ipinapakita sa bawat column.'],
      'Saved comparison cleared.': ['Se borró la comparación guardada.', '已清除保存的比较。', 'Nabura na ang naka-save na paghahambing.'],
      'Comparison copied.': ['Comparación copiada.', '比较已复制。', 'Nakopya ang paghahambing.'],
      'Copy is unavailable here. You can select and copy the comparison table.': ['Aquí no se puede copiar. Puedes seleccionar y copiar la tabla de comparación.', '此处无法复制。您可以选中并复制比较表。', 'Hindi available ang pagkopya rito. Maaari mong piliin at kopyahin ang talahanayan ng paghahambing.'],
      'The worked example inputs are loaded.': ['Se cargaron los datos del ejemplo resuelto.', '已载入示例输入。', 'Na-load ang mga input ng halimbawa.'],
      'The page\u2019s starting values are restored.': ['Se restauraron los valores iniciales de la página.', '已恢复页面的初始值。', 'Naibalik ang mga panimulang halaga ng pahina.']
    };
    var IDX = {es: 0, 'zh-CN': 1, fil: 2}, busy = false, timer = 0;
    function run() {
      timer = 0;
      var l = lang(), i = IDX[l], root = document.getElementById('dch-scenarios');
      if (i === undefined || !root) return;
      busy = true;
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n, list = [];
      while ((n = w.nextNode())) { var v = n.nodeValue.trim(); if (T[v] && !n.parentElement.closest('button')) list.push([n, v]); }
      list.forEach(function (x) { x[0].nodeValue = x[0].nodeValue.replace(x[1], T[x[1]][i]); });
      busy = false;
    }
    function queue() { if (busy || timer) return; timer = setTimeout(run, 20); }
    function start() {
      var root = document.getElementById('dch-scenarios');
      if (!root || !window.MutationObserver) return false;
      new MutationObserver(queue).observe(root, {childList: true, subtree: true, characterData: true});
      queue(); return true;
    }
    var tries = 0, iv = setInterval(function () { if (start() || ++tries > 40) clearInterval(iv); }, 250);
    window.addEventListener('dchlanguagechange', queue);
  }());
  (function keepState() {
    var KEY = 'dchLangKeep:' + location.pathname, lastCalc = null, base = null, cur = null;
    function fields() { return Array.prototype.slice.call(document.querySelectorAll('main input, main select, main textarea')).filter(function (e) { return e.id !== 'dchLanguageSelect' && e.id !== 'pageCalculatorSearch' && e.type !== 'search' && e.type !== 'button' && e.type !== 'submit' && e.type !== 'hidden' && !e.closest('.dch-language-control'); }); }
    function keyOf(e, i) { return (e.id || e.name || ('#' + i)) + (e.type === 'radio' ? '=' + e.value : ''); }
    function read() { var o = {}; fields().forEach(function (e, i) { o[keyOf(e, i)] = (e.type === 'checkbox' || e.type === 'radio') ? e.checked : e.value; }); return o; }
    function write(o, fire, quietText) {
      fields().forEach(function (e, i) {
        var k = keyOf(e, i); if (!(k in o)) return;
        if (e.type === 'checkbox' || e.type === 'radio') { if (e.checked !== o[k]) { e.checked = o[k]; if (fire) e.dispatchEvent(new Event('change', {bubbles: true})); } }
        else if (e.value !== o[k]) { e.value = o[k]; if (fire && !(quietText && e.tagName !== 'SELECT')) e.dispatchEvent(new Event(e.tagName === 'SELECT' ? 'change' : 'input', {bubbles: true})); }
      });
    }
    function mark() { lastCalc = read(); }
    document.addEventListener('click', function (ev) { if (ev.target && ev.target.closest && ev.target.closest('#calculateButton')) mark(); }, true);
    function sc(n) { return document.querySelector('[data-scenario="' + n + '"]'); }
    document.addEventListener('click', function (ev) {
      var b = ev.target && ev.target.closest && ev.target.closest('[data-scenario]'); if (!b) return;
      var n = b.getAttribute('data-scenario'), snap = read();
      if (n === 'save') { var c = sc('compare'); if (c && !c.disabled) { base = snap; cur = null; } }
      else if (n === 'compare') { var p = sc('copy'); if (base && p && !p.disabled) cur = snap; }
      else if (n === 'clear') { base = null; cur = null; }
    }, false);
    document.addEventListener('submit', mark, true);
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && ev.target && ev.target.closest && ev.target.closest('main') && ev.target.tagName === 'INPUT') mark(); }, true);
    document.addEventListener('change', function (ev) {
      if (!ev.target || ev.target.id !== 'dchLanguageSelect') return;
      try { sessionStorage.setItem(KEY, JSON.stringify({ts: Date.now(), E: read(), C: lastCalc, B: base, V: cur, y: window.pageYOffset})); } catch (_) {}
    }, true);
    function restore() {
      var raw = null, st = null;
      try { raw = sessionStorage.getItem(KEY); if (raw) sessionStorage.removeItem(KEY); } catch (_) {}
      if (!raw) return;
      try { st = JSON.parse(raw); } catch (_) { return; }
      if (!st || Date.now() - st.ts > 30000) return;
      var btn = document.getElementById('calculateButton');
      if (st.B && sc('save')) {
        write(st.B, true); sc('save').click(); base = st.B;
        if (st.V && sc('compare')) { write(st.V, true); sc('compare').click(); cur = st.V; }
      }
      if (st.C && btn) { write(st.C, true); btn.click(); lastCalc = st.C; }
      write(st.E, true, false);
      if (st.y) window.scrollTo(0, st.y);
    }
    function go() { setTimeout(restore, 250); }
    if (document.readyState === 'complete') go(); else window.addEventListener('load', go, {once: true});
  }());
}());
