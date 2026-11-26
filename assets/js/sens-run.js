/* What moves the result most: re-runs the page's own calculator with each entry 10% lower and 10% higher, one at a time, and reads the headline result it shows. Nothing is re-implemented, so every figure matches what the calculator shows for the same entries. These are comparisons, not quotes or forecasts. */
(function () {
  'use strict';
  var box = document.getElementById('detailBox');
  if (!box || !window.DCHCalculator) return;
  var D = {
 "es": {
  "Entry": "Entrada",
  "10% lower": "10% menos",
  "10% higher": "10% más",
  "Swing": "Variación",
  "n/a": "n/d",
  "Effect of a 10% change in each entry, largest first": "Efecto de un cambio del 10% en cada entrada, de mayor a menor",
  "What moves the result most": "Qué mueve más el resultado",
  "Result as entered: {0}.": "Resultado con tus datos: {0}.",
  "The entry with the largest swing is \"{0}\": a 10% change moves the result between {1} and {2}.": "La entrada con mayor variación es \"{0}\": un cambio del 10% mueve el resultado entre {1} y {2}.",
  "Each row changes one entry by 10% of its own value and runs the calculator again. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.": "Cada fila cambia una entrada en el 10% de su propio valor y vuelve a ejecutar la calculadora. Las demás entradas quedan como las escribiste. Son comparaciones, no cotizaciones ni pronósticos.",
  "Rows marked n/a fall outside the range the calculator accepts. Entries that are zero or empty are left out, and drop-down choices are not changed.": "Las filas marcadas n/d quedan fuera del rango que acepta la calculadora. Las entradas en cero o vacías se omiten, y las opciones de las listas desplegables no se modifican."
 },
 "zh-CN": {
  "Entry": "输入项",
  "10% lower": "降低 10%",
  "10% higher": "提高 10%",
  "Swing": "变动幅度",
  "n/a": "不适用",
  "Effect of a 10% change in each entry, largest first": "每个输入变动 10% 的影响，按影响从大到小排列",
  "What moves the result most": "哪些输入对结果影响最大",
  "Result as entered: {0}.": "按您输入的数据，结果为：{0}。",
  "The entry with the largest swing is \"{0}\": a 10% change moves the result between {1} and {2}.": "变动幅度最大的输入项是“{0}”：变动 10% 会使结果在 {1} 和 {2} 之间变化。",
  "Each row changes one entry by 10% of its own value and runs the calculator again. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.": "每一行把一个输入项按其自身数值的 10% 调高或调低，并重新运行计算器。其他输入项保持您输入的数值。这些只是比较，不是报价或预测。",
  "Rows marked n/a fall outside the range the calculator accepts. Entries that are zero or empty are left out, and drop-down choices are not changed.": "标为“不适用”的行超出了计算器可接受的范围。数值为零或为空的输入项不列出，下拉选项也不会改变。"
 },
 "fil": {
  "Entry": "Input",
  "10% lower": "10% mas mababa",
  "10% higher": "10% mas mataas",
  "Swing": "Pagbabago",
  "n/a": "n/a",
  "Effect of a 10% change in each entry, largest first": "Epekto ng 10% na pagbabago sa bawat input, pinakamalaki muna",
  "What moves the result most": "Ano ang pinakagumagalaw sa resulta",
  "Result as entered: {0}.": "Resulta batay sa inilagay mo: {0}.",
  "The entry with the largest swing is \"{0}\": a 10% change moves the result between {1} and {2}.": "Ang input na may pinakamalaking pagbabago ay \"{0}\": ang 10% na pagbabago ay naglalagay sa resulta sa pagitan ng {1} at {2}.",
  "Each row changes one entry by 10% of its own value and runs the calculator again. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.": "Binabago ng bawat hanay ang isang input ng 10% ng sarili nitong halaga at pinapatakbo muli ang calculator. Nananatili ang ibang input ayon sa tinype mo. Mga paghahambing ito, hindi quotation o forecast.",
  "Rows marked n/a fall outside the range the calculator accepts. Entries that are zero or empty are left out, and drop-down choices are not changed.": "Ang mga hanay na may markang n/a ay lampas sa saklaw na tinatanggap ng calculator. Hindi isinasama ang mga input na zero o walang laman, at hindi binabago ang mga pagpipilian sa drop-down."
 }
};
  function curLang() { return (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || document.documentElement.lang || 'en'; }
  function t(tpl) {
    var a = Array.prototype.slice.call(arguments, 1), d = D[curLang()];
    return ((d && d[tpl]) || tpl).replace(/\{(\d+)\}/g, function (m, i) { return a[+i]; });
  }
  function locale() { return window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US'; }
  function el(tag, text, cls) { var e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }
  function cell(text, v) { var c = el('td', text); if (v !== undefined && v !== null) c.setAttribute('data-v', String(v)); return c; }
  function table(caption, heads, rows, cls) {
    var wrap = el('div', undefined, 'dch-scenario-table dch-costbd-table ' + (cls || '')), tb = el('table');
    tb.appendChild(el('caption', caption));
    var hr = el('tr'), thead = el('thead');
    heads.forEach(function (h) { var c = el('th', h); c.setAttribute('scope', 'col'); hr.appendChild(c); });
    thead.appendChild(hr); tb.appendChild(thead);
    var body = el('tbody');
    rows.forEach(function (r) {
      var tr = el('tr'); if (r.cls) tr.className = r.cls;
      var th = el('th', r.label); th.setAttribute('scope', 'row'); tr.appendChild(th);
      r.cells.forEach(function (c) { tr.appendChild(c); });
      body.appendChild(tr);
    });
    tb.appendChild(body); wrap.appendChild(tb);
    return wrap;
  }
  function plainLabel(id) {
    var l = document.querySelector('label[for="' + id + '"]');
    return (l ? l.textContent.replace(/\s+/g, ' ').trim() : id).replace(/\s*[\uff08(][^)\uff09]*[)\uff09]\s*$/, '').replace(/[:\uff1a]\s*$/, '');
  }
  var st = document.createElement('style');
  st.setAttribute('data-dch-costbd-style', '1');
  st.textContent = '.dch-costbd-table table{table-layout:fixed;width:100%}.dch-costbd-table th,.dch-costbd-table td{overflow-wrap:break-word!important;word-break:normal!important;hyphens:none!important;padding:8px 3px!important;font-size:.76rem!important}@media (max-width:480px){.dch-costbd{font-size:.7rem}.dch-costbd th,.dch-costbd td{padding:6px 2px}}.dch-costbd-sens thead th:first-child{width:30%}.dch-costbd-sens th,.dch-costbd-sens td{font-size:.72rem!important;padding:6px 2px!important}';
  document.head.appendChild(st);

  var NUMRE = /^\s*([-\u2212]?)\s*\$?\s*([\d,]+(?:\.\d+)?)\s*([%x]?)\s*$/;
  function parseEn(txt) {
    var m = NUMRE.exec(txt || '');
    if (!m) return null;
    var v = parseFloat(m[2].replace(/,/g, ''));
    return m[1] ? -v : v;
  }
  function runCalc() { if (typeof window.calc === 'function') window.calc(); }
  /* Runs the page's calculator once with a forced en-US locale (to read the number) and once in the current locale (to show the text). */
  function probe() {
    var mr = document.getElementById('mainResult'), shown = mr.textContent, num, I = window.DCHI18N, orig = I && I.getLocale;
    if (I && orig) I.getLocale = function () { return 'en-US'; };
    try { runCalc(); num = parseEn(mr.textContent); } finally { if (I && orig) I.getLocale = orig; }
    runCalc(); shown = mr.textContent;
    return {num: num, text: shown};
  }
  function fmtDelta(x, kind) {
    var o = {maximumFractionDigits: 2};
    if (kind === 'money') return new Intl.NumberFormat(locale(), {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', useGrouping: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(x);
    return new Intl.NumberFormat(locale(), o).format(x) + (kind === 'percent' ? '%' : kind === 'ratio' ? 'x' : '');
  }
  function fmtVal(r, kind) { return r.text; }
  function fmtStr(x) { var s = String(Math.round(x * 1e8) / 1e8); return s; }

  var busy = false;
  function render() {
    if (busy) return;
    var mr = document.getElementById('mainResult');
    box.textContent = '';
    var ctrl = window.DCHCalculator.getController && window.DCHCalculator.getController();
    if (!mr || (ctrl && !ctrl.ok)) { box.hidden = true; return; }
    busy = true;
    var saved = [], inputs = [].slice.call(document.querySelectorAll('input.form-control'));
    try {
      var base = probe();
      if (base.num === null || !isFinite(base.num)) { box.hidden = true; return; }
      var txt0 = mr.textContent, enBase = null;
      var kind = /%\s*$/.test(base.text) ? 'percent' : /x\s*$/.test(base.text) ? 'ratio' : /\$/.test(base.text) ? 'money' : 'plain';
      inputs.forEach(function (e) { saved.push([e, e.value]); });
      var rows = [];
      inputs.forEach(function (e) {
        var orig = e.value, v = window.DCHCalculator.numeric(orig);
        if (!isFinite(v) || v === 0) return;
        var res = [0.9, 1.1].map(function (f) {
          e.value = fmtStr(v * f);
          var p = probe();
          e.value = orig;
          return p;
        });
        var a = res[0].num, b = res[1].num;
        var ok = a !== null && b !== null && isFinite(a) && isFinite(b);
        rows.push({id: e.id, lo: res[0], hi: res[1], swing: ok ? Math.abs(b - a) : -1, ok: ok});
      });
      saved.forEach(function (s) { s[0].value = s[1]; });
      runCalc();
      if (!rows.length) { box.hidden = true; return; }
      rows.sort(function (x, y) { return y.swing - x.swing; });
      box.hidden = false; box.className = 'dch-detail dch-costbd';
      box.appendChild(el('h3', t('What moves the result most')));
      box.appendChild(el('p', t('Result as entered: {0}.', mr.textContent), 'dch-note'));
      box.appendChild(table(t('Effect of a 10% change in each entry, largest first'), [t('Entry'), t('10% lower'), t('10% higher'), t('Swing')], rows.map(function (r) {
        return {label: plainLabel(r.id), cells: [
          cell(r.lo.num === null ? t('n/a') : r.lo.text, r.lo.num === null ? '' : r.lo.num),
          cell(r.hi.num === null ? t('n/a') : r.hi.text, r.hi.num === null ? '' : r.hi.num),
          cell(r.ok ? fmtDelta(r.swing, kind) : t('n/a'), r.ok ? r.swing : '')]};
      }), 'dch-costbd-sens'));
      var top = rows[0];
      if (top && top.ok && top.swing > 0) box.appendChild(el('p', t('The entry with the largest swing is "{0}": a 10% change moves the result between {1} and {2}.', plainLabel(top.id), top.lo.text, top.hi.text), 'dch-note'));
      box.appendChild(el('p', t('Each row changes one entry by 10% of its own value and runs the calculator again. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.'), 'dch-note'));
      box.appendChild(el('p', t('Rows marked n/a fall outside the range the calculator accepts. Entries that are zero or empty are left out, and drop-down choices are not changed.'), 'dch-note'));
    } catch (err) {
      saved.forEach(function (s) { s[0].value = s[1]; });
      try { runCalc(); } catch (e2) {}
      box.hidden = true;
    } finally { busy = false; }
  }

  var queued = false;
  function schedule() { if (queued) return; queued = true; setTimeout(function () { queued = false; render(); }, 0); }
  document.querySelectorAll('.form-control').forEach(function (f) { f.addEventListener('input', function () { if (!busy) schedule(); }); f.addEventListener('change', function () { if (!busy) schedule(); }); });
  var cb = document.getElementById('calculateButton'); if (cb) cb.addEventListener('click', schedule);
  window.addEventListener('load', function () { setTimeout(render, 700); });
  setTimeout(render, 900);
})();
