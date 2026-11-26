/* Range cost pages: where the midpoint goes, how wide the range is, and a 10% sensitivity check. The arithmetic is a copy of the page's own formula, so every figure matches the page for the same entries. These are comparisons, not quotes. */
(function () {
  'use strict';
  var box = document.getElementById('detailBox');
  if (!box || !window.DCHCalculator) return;
  var D = {
 "es": {
  "Where the midpoint goes": "Adónde va el punto medio",
  "Midpoint as entered: {0}.": "Punto medio con tus datos: {0}.",
  "Share of midpoint": "Parte del punto medio",
  "Split of the midpoint into parts": "División del punto medio en partes",
  "Quantity at the midpoint rate": "Cantidad a la tarifa del punto medio",
  "Fixed or additional costs": "Costos fijos o adicionales",
  "The midpoint is the average of the low and high ends. It splits into your quantity priced at the middle of your two rates, plus the fixed or additional costs you entered once.": "El punto medio es el promedio de los extremos bajo y alto. Se divide en tu cantidad valorada a la mitad de tus dos tarifas, más los costos fijos o adicionales que introdujiste una sola vez.",
  "How wide the range is": "Qué tan amplio es el intervalo",
  "Low end, high end and the gap between them": "Extremo bajo, extremo alto y la diferencia entre ambos",
  "Measure": "Medida",
  "Low end": "Extremo bajo",
  "High end": "Extremo alto",
  "Gap between the ends": "Diferencia entre los extremos",
  "Gap as a share of the midpoint": "Diferencia como parte del punto medio",
  "The gap comes only from the difference between your low and high rates multiplied by the quantity. The fixed amount is the same at both ends.": "La diferencia proviene solo de la distancia entre tus tarifas baja y alta multiplicada por la cantidad. El monto fijo es el mismo en ambos extremos.",
  "What moves the midpoint most": "Qué mueve más el punto medio",
  "The entry with the largest swing is \"{0}\": a 10% change moves the midpoint between {1} and {2}.": "La entrada con mayor variación es \"{0}\": un cambio del 10% mueve el punto medio entre {1} y {2}.",
  "Part": "Parte",
  "Amount": "Importe",
  "Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.": "Cada fila cambia una entrada en un 10% de su propio valor y vuelve a ejecutar la aritmética de la calculadora. Las demás entradas quedan como las escribiste. Son comparaciones, no cotizaciones ni pronósticos.",
  "Effect of a 10% change in each entry, largest first": "Efecto de un cambio del 10% en cada entrada, de mayor a menor",
  "Entry": "Entrada",
  "10% lower": "10% menos",
  "10% higher": "10% más",
  "Swing": "Variación",
  "n/a": "n/d",
  "Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.": "Las filas marcadas n/d quedan fuera del rango que acepta la calculadora. Las entradas de números enteros solo se prueban con números enteros, así que una fila puede mostrar n/d cuando el 10% de la entrada no es un número entero."
 },
 "zh-CN": {
  "Where the midpoint goes": "中间值的构成",
  "Midpoint as entered: {0}.": "按当前输入的中间值：{0}。",
  "Share of midpoint": "占中间值比例",
  "Split of the midpoint into parts": "中间值的构成拆分",
  "Quantity at the midpoint rate": "数量按中间单价计算",
  "Fixed or additional costs": "固定或额外费用",
  "The midpoint is the average of the low and high ends. It splits into your quantity priced at the middle of your two rates, plus the fixed or additional costs you entered once.": "中间值是低端与高端的平均数，由两部分构成：按两个单价的中间值计价的数量费用，以及您只计入一次的固定或额外费用。",
  "How wide the range is": "区间有多宽",
  "Low end, high end and the gap between them": "低端、高端及两端之差",
  "Measure": "指标",
  "Low end": "低端",
  "High end": "高端",
  "Gap between the ends": "两端之差",
  "Gap as a share of the midpoint": "两端之差占中间值比例",
  "The gap comes only from the difference between your low and high rates multiplied by the quantity. The fixed amount is the same at both ends.": "两端之差只来自您输入的高、低单价之差乘以数量，固定金额在两端相同。",
  "What moves the midpoint most": "哪些输入对中间值影响最大",
  "The entry with the largest swing is \"{0}\": a 10% change moves the midpoint between {1} and {2}.": "变动幅度最大的输入项是“{0}”：变动 10% 会使中间值在 {1} 与 {2} 之间变化。",
  "Part": "部分",
  "Amount": "金额",
  "Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.": "每一行只把一个输入改动其自身数值的 10%，并重新运行计算器自身的算术，其余输入保持您填写的值。这些只是对比，不是报价或预测。",
  "Effect of a 10% change in each entry, largest first": "每个输入变动 10% 的影响，按影响从大到小排列",
  "Entry": "输入项",
  "10% lower": "降低 10%",
  "10% higher": "提高 10%",
  "Swing": "变动幅度",
  "n/a": "不适用",
  "Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.": "标记为“不适用”的行超出了计算器可接受的范围。整数类输入只按整数测试，因此当输入的 10% 不是整数时，该行可能显示“不适用”。"
 },
 "fil": {
  "Where the midpoint goes": "Saan napupunta ang midpoint",
  "Midpoint as entered: {0}.": "Midpoint ayon sa inilagay: {0}.",
  "Share of midpoint": "Bahagi ng midpoint",
  "Split of the midpoint into parts": "Paghahati ng midpoint sa mga bahagi",
  "Quantity at the midpoint rate": "Dami sa midpoint na rate",
  "Fixed or additional costs": "Fixed o karagdagang gastos",
  "The midpoint is the average of the low and high ends. It splits into your quantity priced at the middle of your two rates, plus the fixed or additional costs you entered once.": "Ang midpoint ay ang average ng mababa at mataas na dulo. Hinahati ito sa dami mo na may presyong nasa gitna ng dalawang rate mo, at sa fixed o karagdagang gastos na isang beses mong inilagay.",
  "How wide the range is": "Gaano kalawak ang saklaw",
  "Low end, high end and the gap between them": "Mababang dulo, mataas na dulo, at ang agwat nila",
  "Measure": "Sukat",
  "Low end": "Mababang dulo",
  "High end": "Mataas na dulo",
  "Gap between the ends": "Agwat ng dalawang dulo",
  "Gap as a share of the midpoint": "Agwat bilang bahagi ng midpoint",
  "The gap comes only from the difference between your low and high rates multiplied by the quantity. The fixed amount is the same at both ends.": "Ang agwat ay galing lamang sa pagkakaiba ng mababa at mataas mong rate na minultiply sa dami. Pareho ang fixed na halaga sa magkabilang dulo.",
  "What moves the midpoint most": "Ano ang pinakamalaking nagpapagalaw sa midpoint",
  "The entry with the largest swing is \"{0}\": a 10% change moves the midpoint between {1} and {2}.": "Ang input na may pinakamalaking galaw ay \"{0}\": ang 10% na pagbabago ay naglilipat sa midpoint sa pagitan ng {1} at {2}.",
  "Part": "Bahagi",
  "Amount": "Halaga",
  "Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.": "Binabago ng bawat hilera ang isang input nang 10% ng sarili nitong halaga at inuulit ang sariling aritmetika ng calculator. Nananatili ang ibang input ayon sa inilagay mo. Mga paghahambing ito, hindi quote o forecast.",
  "Effect of a 10% change in each entry, largest first": "Epekto ng 10% na pagbabago sa bawat input, pinakamalaki muna",
  "Entry": "Input",
  "10% lower": "10% mas mababa",
  "10% higher": "10% mas mataas",
  "Swing": "Galaw",
  "n/a": "wala",
  "Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.": "Ang mga hilerang may markang \"wala\" ay lampas sa saklaw na tinatanggap ng calculator. Ang mga input na buong numero ay sinusubok lamang sa buong numero, kaya maaaring \"wala\" ang isang hilera kapag hindi buong numero ang 10% ng input."
 }
};
  function curLang() { return (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || document.documentElement.lang || 'en'; }
  function t(tpl) {
    var a = Array.prototype.slice.call(arguments, 1), d = D[curLang()];
    return ((d && d[tpl]) || tpl).replace(/\{(\d+)\}/g, function (m, i) { return a[+i]; });
  }
  function locale() { return window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US'; }
  function money(x) { return new Intl.NumberFormat(locale(), {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', useGrouping: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(x); }
  function share(x, total) { if (!(total > 0)) return t('n/a'); return new Intl.NumberFormat(locale(), {style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1}).format(x / total); }
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
  st.textContent = '.dch-costbd-table table{table-layout:fixed;width:100%}.dch-costbd-table thead th:first-child{width:38%}.dch-costbd-table th,.dch-costbd-table td{overflow-wrap:break-word!important;word-break:normal!important;hyphens:none!important;padding:8px 3px!important;font-size:.76rem!important}@media (max-width:480px){.dch-costbd{font-size:.7rem}.dch-costbd th,.dch-costbd td{padding:6px 2px}}.dch-costbd-sens thead th:first-child{width:30%}.dch-costbd-sens th,.dch-costbd-sens td{font-size:.72rem!important;padding:6px 2px!important}.dch-costbd-table tr.dch-total th,.dch-costbd-table tr.dch-total td{font-weight:700}';
  document.head.appendChild(st);

  var IDS = ['qty', 'low', 'high', 'fixed'], PER = {es: '{0} por unidad', 'zh-CN': '{0} 每单位', fil: '{0} bawat unit'};

  /* Copy of the page's own formula: low end = qty x low + fixed, high end = qty x high + fixed, headline = midpoint. */
  function run(v) {
    var qty = v.qty, low = v.low, high = v.high, fixed = v.fixed;
    var all = [qty, low, high, fixed];
    for (var i = 0; i < all.length; i++) { if (typeof all[i] !== 'number' || !isFinite(all[i]) || all[i] < 0) return null; }
    if (high < low) return null;
    var lo = qty * low + fixed, hi = qty * high + fixed, mid = (lo + hi) / 2;
    return {mid: mid, lo: lo, hi: hi, units: qty * (low + high) / 2, fixed: fixed};
  }

  function render() {
    box.textContent = '';
    var ctrl = window.DCHCalculator.getController && window.DCHCalculator.getController();
    if (!ctrl || !ctrl.ok) { box.hidden = true; return; }
    try {
      var vals = {};
      for (var i = 0; i < IDS.length; i++) {
        var e = document.getElementById(IDS[i]);
        if (!e) { box.hidden = true; return; }
        vals[IDS[i]] = window.DCHCalculator.numeric(e.value);
      }
      var b = run(vals);
      if (b === null) { box.hidden = true; return; }
      box.hidden = false; box.className = 'dch-detail dch-costbd';

      box.appendChild(el('h3', t('Where the midpoint goes')));
      box.appendChild(el('p', t('Midpoint as entered: {0}.', money(b.mid)), 'dch-note'));
      box.appendChild(table(t('Split of the midpoint into parts'), [t('Part'), t('Amount'), t('Share of midpoint')], [
        {label: t('Quantity at the midpoint rate'), cells: [cell(money(b.units), b.units), cell(share(b.units, b.mid), b.mid > 0 ? b.units / b.mid : '')]},
        {label: t('Fixed or additional costs'), cells: [cell(money(b.fixed), b.fixed), cell(share(b.fixed, b.mid), b.mid > 0 ? b.fixed / b.mid : '')]}
      ]));
      box.appendChild(el('p', t('The midpoint is the average of the low and high ends. It splits into your quantity priced at the middle of your two rates, plus the fixed or additional costs you entered once.'), 'dch-note'));

      var spread = b.hi - b.lo;
      box.appendChild(el('h3', t('How wide the range is')));
      box.appendChild(table(t('Low end, high end and the gap between them'), [t('Measure'), t('Amount')], [
        {label: t('Low end'), cells: [cell(money(b.lo), b.lo)]},
        {label: t('High end'), cells: [cell(money(b.hi), b.hi)]},
        {label: t('Gap between the ends'), cells: [cell(money(spread), spread)]},
        {label: t('Gap as a share of the midpoint'), cells: [cell(share(spread, b.mid), b.mid > 0 ? spread / b.mid : '')]}
      ]));
      box.appendChild(el('p', t('The gap comes only from the difference between your low and high rates multiplied by the quantity. The fixed amount is the same at both ends.'), 'dch-note'));

      var rows = IDS.map(function (id) {
        var lo = {}, hi = {}, k;
        for (k in vals) { lo[k] = vals[k]; hi[k] = vals[k]; }
        lo[id] = vals[id] * 0.9; hi[id] = vals[id] * 1.1;
        var ao = run(lo), bo = run(hi);
        var a = ao ? ao.mid : null, c = bo ? bo.mid : null;
        return {id: id, a: a, b: c, swing: (a === null || c === null) ? -1 : Math.abs(c - a)};
      });
      rows.sort(function (x, y) { return y.swing - x.swing; });
      box.appendChild(el('h3', t('What moves the midpoint most')));
      box.appendChild(table(t('Effect of a 10% change in each entry, largest first'), [t('Entry'), t('10% lower'), t('10% higher'), t('Swing')], rows.map(function (r) {
        return {label: plainLabel(r.id), cells: [
          cell(r.a === null ? t('n/a') : money(r.a), r.a === null ? '' : r.a),
          cell(r.b === null ? t('n/a') : money(r.b), r.b === null ? '' : r.b),
          cell(r.swing < 0 ? t('n/a') : money(r.swing), r.swing < 0 ? '' : r.swing)]};
      }), 'dch-costbd-sens'));
      var top = rows[0];
      if (top && top.swing > 0) box.appendChild(el('p', t('The entry with the largest swing is "{0}": a 10% change moves the midpoint between {1} and {2}.', plainLabel(top.id), money(top.a), money(top.b)), 'dch-note'));
      box.appendChild(el('p', t('Each row changes one entry by 10% of its own value and re-runs the calculator\u2019s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.'), 'dch-note'));
      box.appendChild(el('p', t('Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.'), 'dch-note'));
    } catch (err) { box.hidden = true; }
  }

  /* The page writes " per unit" in English next to the midpoint per unit; show it in the chosen language. */
  var busy = false;
  function fixUnit() {
    if (busy) return; var o = document.getElementById('o2'), tpl = PER[curLang()];
    if (!o || !tpl) return;
    var m = o.textContent.match(/^(.*\S)\s+per unit$/);
    if (!m) return;
    busy = true; o.textContent = tpl.replace('{0}', m[1]); busy = false;
  }
  var o2 = document.getElementById('o2');
  if (o2 && window.MutationObserver) new MutationObserver(function () { setTimeout(fixUnit, 0); }).observe(o2, {childList: true, characterData: true, subtree: true});

  var queued = false;
  function schedule() { if (queued) return; queued = true; setTimeout(function () { queued = false; render(); fixUnit(); }, 0); }
  document.querySelectorAll('.form-control').forEach(function (f) { f.addEventListener('input', schedule); });
  var cb = document.getElementById('calculateButton'); if (cb) cb.addEventListener('click', schedule);
  window.addEventListener('load', function () { setTimeout(function () { render(); fixUnit(); }, 700); });
  setTimeout(function () { render(); fixUnit(); }, 900);
})();
