/* Loan pages: how the amount financed is built, where the total of payments goes, and what changes the payment. The arithmetic is a copy of the page's own formula. These are comparisons, not offers. */
(function () {
  'use strict';
  var box = document.getElementById('detailBox');
  if (!box || !window.DCHCalculator) return;
  var D = {
 "es": {
  "How the amount financed is built": "Cómo se forma el importe financiado",
  "From price to amount financed": "Del precio al importe financiado",
  "Item": "Concepto",
  "Amount financed": "Importe financiado",
  "The amount financed is the price plus the added items, minus the cash and credits you put in. It cannot go below zero.": "El importe financiado es el precio más los conceptos añadidos, menos el efectivo y los créditos que aportas. No puede ser inferior a cero.",
  "Where the total of payments goes": "Adónde va el total de los pagos",
  "Principal and interest over the whole term": "Capital e intereses durante todo el plazo",
  "Share of payments": "Parte de los pagos",
  "Principal (amount financed)": "Capital (importe financiado)",
  "Interest": "Intereses",
  "Total of payments": "Total de los pagos",
  "Interest is the total of all monthly payments minus the amount financed.": "Los intereses son el total de todos los pagos mensuales menos el importe financiado.",
  "What changes the payment": "Qué cambia el pago",
  "Monthly payment and total interest if one entry changes": "Pago mensual e intereses totales si cambia una entrada",
  "Change": "Cambio",
  "Monthly payment": "Pago mensual",
  "Versus now": "Frente a ahora",
  "Total interest": "Intereses totales",
  "As entered": "Según tus datos",
  "Rate 1 point lower": "Tasa 1 punto menos",
  "Rate 1 point higher": "Tasa 1 punto más",
  "Term 1 year shorter": "Plazo 1 año menos",
  "Term 1 year longer": "Plazo 1 año más",
  "{0} more cash up front": "{0} más de efectivo al inicio",
  "{0} less cash up front": "{0} menos de efectivo al inicio",
  "Each row changes one entry and re-runs the calculator’s own loan arithmetic. The other entries stay as you typed them. These are comparisons, not offers or approvals.": "Cada fila cambia una entrada y vuelve a ejecutar la aritmética de préstamo de la calculadora. Las demás entradas quedan como las escribiste. Son comparaciones, no ofertas ni aprobaciones.",
  "Rows marked n/a fall outside the range the calculator accepts, such as a rate or cash amount below zero.": "Las filas marcadas n/d quedan fuera del rango que acepta la calculadora, por ejemplo una tasa o un efectivo inferior a cero.",
  "Part": "Parte",
  "Amount": "Importe",
  "n/a": "n/d"
 },
 "zh-CN": {
  "How the amount financed is built": "融资金额是怎么得出的",
  "From price to amount financed": "从价格到融资金额",
  "Item": "项目",
  "Amount financed": "融资金额",
  "The amount financed is the price plus the added items, minus the cash and credits you put in. It cannot go below zero.": "融资金额等于价格加上各项附加费用，再减去您投入的现金和抵免额，且不会低于零。",
  "Where the total of payments goes": "还款总额的构成",
  "Principal and interest over the whole term": "整个期限内的本金与利息",
  "Share of payments": "占还款总额比例",
  "Principal (amount financed)": "本金（融资金额）",
  "Interest": "利息",
  "Total of payments": "还款总额",
  "Interest is the total of all monthly payments minus the amount financed.": "利息等于所有月供之和减去融资金额。",
  "What changes the payment": "哪些变化会影响月供",
  "Monthly payment and total interest if one entry changes": "改变某一项输入后的月供和利息总额",
  "Change": "变化",
  "Monthly payment": "月供",
  "Versus now": "与当前相比",
  "Total interest": "利息总额",
  "As entered": "按当前输入",
  "Rate 1 point lower": "利率降低 1 个百分点",
  "Rate 1 point higher": "利率提高 1 个百分点",
  "Term 1 year shorter": "期限缩短 1 年",
  "Term 1 year longer": "期限延长 1 年",
  "{0} more cash up front": "前期多付现金 {0}",
  "{0} less cash up front": "前期少付现金 {0}",
  "Each row changes one entry and re-runs the calculator’s own loan arithmetic. The other entries stay as you typed them. These are comparisons, not offers or approvals.": "每一行只改变一个输入，并重新运行计算器自身的贷款算术，其余输入保持您填写的值。这些只是对比，不是报价或批准。",
  "Rows marked n/a fall outside the range the calculator accepts, such as a rate or cash amount below zero.": "标记为“不适用”的行超出了计算器可接受的范围，例如利率或现金低于零。",
  "Part": "部分",
  "Amount": "金额",
  "n/a": "不适用"
 },
 "fil": {
  "How the amount financed is built": "Paano nabubuo ang halagang pinondohan",
  "From price to amount financed": "Mula presyo hanggang halagang pinondohan",
  "Item": "Bagay",
  "Amount financed": "Halagang pinondohan",
  "The amount financed is the price plus the added items, minus the cash and credits you put in. It cannot go below zero.": "Ang halagang pinondohan ay ang presyo kasama ang mga idinagdag na bayarin, bawas ang perang inilagay mo at mga credit. Hindi ito bababa sa zero.",
  "Where the total of payments goes": "Saan napupunta ang kabuuang bayad",
  "Principal and interest over the whole term": "Principal at interes sa buong termino",
  "Share of payments": "Bahagi ng kabuuang bayad",
  "Principal (amount financed)": "Principal (halagang pinondohan)",
  "Interest": "Interes",
  "Total of payments": "Kabuuang bayad",
  "Interest is the total of all monthly payments minus the amount financed.": "Ang interes ay ang kabuuan ng lahat ng buwanang bayad bawas ang halagang pinondohan.",
  "What changes the payment": "Ano ang nagpapabago sa bayad",
  "Monthly payment and total interest if one entry changes": "Buwanang bayad at kabuuang interes kapag may isang input na nagbago",
  "Change": "Pagbabago",
  "Monthly payment": "Buwanang bayad",
  "Versus now": "Kumpara ngayon",
  "Total interest": "Kabuuang interes",
  "As entered": "Ayon sa inilagay",
  "Rate 1 point lower": "Rate na 1 punto na mas mababa",
  "Rate 1 point higher": "Rate na 1 punto na mas mataas",
  "Term 1 year shorter": "Termino na 1 taon na mas maikli",
  "Term 1 year longer": "Termino na 1 taon na mas mahaba",
  "{0} more cash up front": "{0} dagdag na pera sa simula",
  "{0} less cash up front": "{0} bawas na pera sa simula",
  "Each row changes one entry and re-runs the calculator’s own loan arithmetic. The other entries stay as you typed them. These are comparisons, not offers or approvals.": "Binabago ng bawat hilera ang isang input at inuulit ang sariling aritmetika ng calculator para sa loan. Nananatili ang ibang input ayon sa inilagay mo. Mga paghahambing ito, hindi alok o pag-apruba.",
  "Rows marked n/a fall outside the range the calculator accepts, such as a rate or cash amount below zero.": "Ang mga hilerang may markang \"wala\" ay lampas sa saklaw na tinatanggap ng calculator, tulad ng rate o perang mas mababa sa zero.",
  "Part": "Bahagi",
  "Amount": "Halaga",
  "n/a": "wala"
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

  var FR = !!document.getElementById('projectCost');
  var K = FR
    ? {a: 'projectCost', cash: 'ownerCash', cred: 'otherCredits', fees: 'loanFees', rate: 'interestRate', years: 'loanYears'}
    : {a: 'purchasePrice', cash: 'downPayment', tax: 'taxRate', fees: 'fees', rate: 'interestRate', years: 'loanYears'};
  var IDS = FR ? [K.a, K.cash, K.cred, K.fees, K.rate, K.years] : [K.a, K.cash, K.tax, K.fees, K.rate, K.years];

  /* Copy of the page's own formula. */
  function run(v) {
    var i, x;
    for (i = 0; i < IDS.length; i++) { x = v[IDS[i]]; if (typeof x !== 'number' || !isFinite(x)) return null; }
    var a = v[K.a], cash = v[K.cash], fees = v[K.fees], rate = v[K.rate], years = v[K.years], principal, taxAmt = 0, cred = 0;
    if (a < 0 || cash < 0 || fees < 0 || rate < 0 || years <= 0) return null;
    if (FR) {
      cred = v[K.cred]; if (cred < 0) return null;
      principal = Math.max(0, a - cash - cred + fees);
    } else {
      var tax = v[K.tax]; if (tax < 0) return null;
      taxAmt = a * tax / 100;
      principal = Math.max(0, a + taxAmt + fees - cash);
    }
    var months = Math.round(years * 12), payment = window.DCHCalculator.loanPayment(principal, rate, months);
    var total = payment * months, interest = total - principal;
    if (![payment, total, interest].every(isFinite)) return null;
    return {payment: payment, principal: principal, total: total, interest: interest, taxAmt: taxAmt, a: a, cash: cash, fees: fees, cred: cred};
  }

  function render() {
    box.textContent = '';
    var ctrl = window.DCHCalculator.getController && window.DCHCalculator.getController();
    if (!ctrl || !ctrl.ok) { box.hidden = true; return; }
    try {
      var vals = {}, i;
      for (i = 0; i < IDS.length; i++) {
        var e = document.getElementById(IDS[i]);
        if (!e) { box.hidden = true; return; }
        vals[IDS[i]] = window.DCHCalculator.numeric(e.value);
      }
      var b = run(vals);
      if (b === null) { box.hidden = true; return; }
      box.hidden = false; box.className = 'dch-detail dch-costbd';

      box.appendChild(el('h3', t('How the amount financed is built')));
      var rows = [];
      function r(label, amt, cls) { rows.push({label: label, cls: cls, cells: [cell(money(amt), amt)]}); }
      r(plainLabel(K.a), b.a);
      if (!FR) r(plainLabel(K.tax), b.taxAmt);
      r(plainLabel(K.fees), b.fees);
      r(plainLabel(K.cash), -b.cash);
      if (FR) r(plainLabel(K.cred), -b.cred);
      r(t('Amount financed'), b.principal, 'dch-total');
      box.appendChild(table(t('From price to amount financed'), [t('Item'), t('Amount')], rows));
      box.appendChild(el('p', t('The amount financed is the price plus the added items, minus the cash and credits you put in. It cannot go below zero.'), 'dch-note'));

      box.appendChild(el('h3', t('Where the total of payments goes')));
      box.appendChild(table(t('Principal and interest over the whole term'), [t('Part'), t('Amount'), t('Share of payments')], [
        {label: t('Principal (amount financed)'), cells: [cell(money(b.principal), b.principal), cell(share(b.principal, b.total), b.total > 0 ? b.principal / b.total : '')]},
        {label: t('Interest'), cells: [cell(money(b.interest), b.interest), cell(share(b.interest, b.total), b.total > 0 ? b.interest / b.total : '')]},
        {label: t('Total of payments'), cls: 'dch-total', cells: [cell(money(b.total), b.total), cell(b.total > 0 ? share(b.total, b.total) : t('n/a'), b.total > 0 ? 1 : '')]}
      ]));
      box.appendChild(el('p', t('Interest is the total of all monthly payments minus the amount financed.'), 'dch-note'));

      function v(id, val) { var o = {}, k; for (k in vals) o[k] = vals[k]; o[id] = val; return run(o); }
      var variants = [
        {label: t('Rate 1 point lower'), out: vals[K.rate] - 1 >= 0 ? v(K.rate, vals[K.rate] - 1) : null},
        {label: t('Rate 1 point higher'), out: v(K.rate, vals[K.rate] + 1)},
        {label: t('Term 1 year shorter'), out: vals[K.years] - 1 >= 0.1 ? v(K.years, vals[K.years] - 1) : null},
        {label: t('Term 1 year longer'), out: v(K.years, vals[K.years] + 1)},
        {label: t('{0} more cash up front', money(1000)), out: v(K.cash, vals[K.cash] + 1000)},
        {label: t('{0} less cash up front', money(1000)), out: vals[K.cash] - 1000 >= 0 ? v(K.cash, vals[K.cash] - 1000) : null}
      ];
      var srows = [{label: t('As entered'), cls: 'dch-total', cells: [cell(money(b.payment), b.payment), cell('\u2014', 0), cell(money(b.interest), b.interest)]}];
      variants.forEach(function (x) {
        var o = x.out;
        var d = o ? o.payment - b.payment : null;
        srows.push({label: x.label, cells: [
          cell(o ? money(o.payment) : t('n/a'), o ? o.payment : ''),
          cell(o ? (d >= 0 ? '+' : '\u2212') + money(Math.abs(d)) : t('n/a'), o ? d : ''),
          cell(o ? money(o.interest) : t('n/a'), o ? o.interest : '')]});
      });
      box.appendChild(el('h3', t('What changes the payment')));
      box.appendChild(table(t('Monthly payment and total interest if one entry changes'), [t('Change'), t('Monthly payment'), t('Versus now'), t('Total interest')], srows, 'dch-costbd-sens'));
      box.appendChild(el('p', t('Each row changes one entry and re-runs the calculator\u2019s own loan arithmetic. The other entries stay as you typed them. These are comparisons, not offers or approvals.'), 'dch-note'));
      box.appendChild(el('p', t('Rows marked n/a fall outside the range the calculator accepts, such as a rate or cash amount below zero.'), 'dch-note'));
    } catch (err) { box.hidden = true; }
  }

  var queued = false;
  function schedule() { if (queued) return; queued = true; setTimeout(function () { queued = false; render(); }, 0); }
  document.querySelectorAll('.form-control').forEach(function (f) { f.addEventListener('input', schedule); });
  var cb = document.getElementById('calculateButton'); if (cb) cb.addEventListener('click', schedule);
  window.addEventListener('load', function () { setTimeout(render, 700); });
  setTimeout(render, 900);
})();
