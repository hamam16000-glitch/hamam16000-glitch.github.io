/* Cost-share breakdown and what-if table for the out-of-pocket calculators.
   It repeats the page's own arithmetic from the same input fields, so the numbers
   shown here follow the figures the visitor entered. It is not a plan rule engine. */
(function () {
  'use strict';
  var box = document.getElementById('costShare');
  if (!box) return;
  var get = function (id) { return document.getElementById(id); };
  var kind = box.getAttribute('data-model');          // 'visits' or 'bill'
  var unitWord = box.getAttribute('data-unit') || 'unit';
  var main = get('mainResult');
  if (!main || !window.DCHCalculator) return;

  function locale() { return window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US'; }
  function money(x) {
    return new Intl.NumberFormat(locale(), {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', useGrouping: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(x);
  }
  function pct(x) { return new Intl.NumberFormat(locale(), {minimumFractionDigits: 1, maximumFractionDigits: 1}).format(x) + '%'; }
  function val(id) { return window.DCHCalculator.numeric(get(id).value); }

  // Page model, kind 'visits': allowed = count*unit + other; you = min(allowed, deductible + coins% of the rest + count*copay).
  // Page model, kind 'bill': gross = units*unitCost + fees; you = min(gross, deductible + (100-coverage)% of the rest + copay).
  function read() {
    if (kind === 'visits') {
      return {n: val('count'), c: [val('unit') * val('count'), val('other')], ded: val('deductible'), share: val('coins'), copay: val('copay') * val('count'), per: val('count'),
              raw: {unit: val('unit'), other: val('other'), count: val('count')}};
    }
    var n = val('units');
    return {n: n, c: [n * val('unitCost'), val('providerFee') + val('facilityFee') + val('otherFee')], ded: val('deductible'), share: 100 - val('coverageRate'), copay: val('copay'), per: n,
            raw: {units: n, unitCost: val('unitCost'), fees: val('providerFee') + val('facilityFee') + val('otherFee')}};
  }
  function split(allowed, ded, share, copay) {
    var d = Math.min(allowed, ded), rest = Math.max(0, allowed - d), co = rest * share / 100;
    var you = Math.min(allowed, d + co + copay);
    return {allowed: allowed, ded: d, coins: co, copay: Math.max(0, you - d - co), you: you, plan: Math.max(0, allowed - you), cap: d + co + copay > allowed};
  }
  function scaled(m, f) {   // every charge field scaled by f; deductible, rate and copays stay as entered
    return (m.c[0] + m.c[1]) * f;
  }
  function el(tag, text, cls) { var e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }
  function cell(row, text, head, scope) { var c = el(head ? 'th' : 'td', text); if (scope) c.setAttribute('scope', scope); row.appendChild(c); return c; }
  function table(caption, heads, rows) {
    var wrap = el('div', undefined, 'dch-table-wrap'), t = el('table', undefined, 'dch-table num');
    t.appendChild(el('caption', caption));
    var hr = el('tr'); heads.forEach(function (h) { cell(hr, h, true, 'col'); });
    var th = el('thead'); th.appendChild(hr); t.appendChild(th);
    var tb = el('tbody');
    rows.forEach(function (r) {
      var tr = el('tr'); if (r.cls) tr.className = r.cls;
      r.cells.forEach(function (c, i) { cell(tr, c, i === 0, i === 0 ? 'row' : null); });
      tb.appendChild(tr);
    });
    t.appendChild(tb); wrap.appendChild(t); return wrap;
  }
  function render() {
    box.textContent = '';
    var ctrl = window.DCHCalculator.getController && window.DCHCalculator.getController();
    if (!ctrl || !ctrl.ok) { box.hidden = true; return; }
    var m = read(), allowed = m.c[0] + m.c[1];
    if (![allowed, m.ded, m.share, m.copay].every(Number.isFinite)) { box.hidden = true; return; }
    box.hidden = false;
    var base = split(allowed, m.ded, m.share, m.copay);
    var share = function (x) { return allowed > 0 ? pct(100 * x / allowed) : '0.0%'; };
    var shareLabel = kind === 'visits' ? 'coinsurance (' + m.share + '% of the amount after the deductible)' : 'your percentage share (' + Math.round(m.share * 100) / 100 + '% of the amount after the deductible)';
    var copayLabel = kind === 'visits' ? 'entered copays (' + m.per + ' x ' + money(m.copay / (m.per || 1)) + ')' : 'entered copay';

    box.appendChild(el('h3', 'Who pays what in this estimate'));
    var as = el('ul', undefined, 'dch-order dch-assume');
    ['Every amount you entered is treated as a plan-allowed charge that the percentage applies to.',
     'The deductible comes off first, then your share of what is left, then the copay you entered is added on top.',
     'There is no out-of-pocket maximum, annual benefit limit or exclusion in this model, so real coverage may differ.',
     'The plan figure is only what remains of the charges after your part. It is not a coverage decision.'].forEach(function (t) { as.appendChild(el('li', t)); });
    box.appendChild(as);
    var bar = el('div', undefined, 'dch-split'); bar.setAttribute('role', 'img');
    bar.setAttribute('aria-label', 'Share of charges entered: you ' + share(base.you) + ', estimated plan contribution ' + share(base.plan));
    var youW = allowed > 0 ? 100 * base.you / allowed : 0;
    var a = el('span', undefined, 'dch-split-you'); a.style.width = youW + '%';
    var b = el('span', undefined, 'dch-split-plan'); b.style.width = (100 - youW) + '%';
    bar.appendChild(a); bar.appendChild(b); box.appendChild(bar);
    var legend = el('p', 'You: ' + share(base.you) + '. Estimated plan contribution: ' + share(base.plan) + '. Percentages are shares of the ' + money(allowed) + ' of charges entered, rounded to one decimal. Amounts are rounded to cents, so displayed rows can differ from the total by a cent.', 'dch-note'); box.appendChild(legend);
    box.appendChild(table('Split of the entered charges between you and the plan', ['Line', 'Amount', 'Share of charges'], [
      {cells: ['Charges entered', money(allowed), allowed > 0 ? '100.0%' : '0.0%']},
      {cells: ['You: deductible applied', money(base.ded), share(base.ded)]},
      {cells: ['You: ' + shareLabel, money(base.coins), share(base.coins)]},
      {cells: ['You: ' + copayLabel, money(base.copay), share(base.copay)]},
      {cls: 'dch-total', cells: ['You pay in total', money(base.you), share(base.you)]},
      {cells: ['Estimated plan contribution (what is left of the charges, an arithmetic remainder)', money(base.plan), share(base.plan)]}
    ]));
    if (base.cap) box.appendChild(el('p', 'Capped: the deductible, your percentage share and the entered copays added up to more than the charges entered. Your total is held at the charges, and the copay line shows only the part that fits (' + money(base.copay) + ' of ' + money(m.copay) + ' entered), so the rows above add up to your total.', 'dch-note'));
    if (m.per > 1) box.appendChild(el('p', 'Your total per ' + unitWord + ': ' + money(base.you / m.per) + ' (' + money(base.you) + ' over ' + m.per + ').', 'dch-note'));

    box.appendChild(el('h3', 'What if the numbers were different?'));
    var rows = [{cells: ['As entered', money(base.you), money(base.plan), '-']}];
    function add(label, s) {
      var diff = s.you - base.you;
      rows.push({cells: [label, money(s.you), money(s.plan), Math.abs(diff) < 0.005 ? 'no change' : (diff > 0 ? '+' : '-') + money(Math.abs(diff))]});
    }
    add('Deductible already met (remaining = 0)', split(allowed, 0, m.share, m.copay));
    var lower = Math.max(0, m.share - 10);
    add(kind === 'visits' ? 'Coinsurance 10 points lower (' + lower + '%)' : 'Plan share 10 points higher (' + Math.round((100 - lower) * 100) / 100 + '%)', split(allowed, m.ded, lower, m.copay));
    if (m.copay > 0) add('Copays removed', split(allowed, m.ded, m.share, 0));
    add('Charges 10% higher (deductible and copays unchanged)', split(scaled(m, 1.1), m.ded, m.share, m.copay));
    add('Charges 10% lower (deductible and copays unchanged)', split(scaled(m, 0.9), m.ded, m.share, m.copay));
    box.appendChild(table('Your cost under changed assumptions, using the same arithmetic as the calculator', ['Scenario', 'You pay', 'Plan est.', 'Change'], rows));
    box.appendChild(el('p', 'Each row changes one thing and re-runs the calculator\u2019s own arithmetic. These are comparisons of the figures you entered, not coverage determinations. Because the model applies no out-of-pocket maximum or annual benefit limit, a plan with one could cost you less than shown.', 'dch-note'));
  }
  var queued = false;
  function schedule() { if (queued) return; queued = true; setTimeout(function () { queued = false; render(); }, 0); }
  new MutationObserver(schedule).observe(main, {childList: true, characterData: true, subtree: true});
  document.querySelectorAll('.form-control').forEach(function (f) { f.addEventListener('input', schedule); });
  var btn = get('calculateButton'); if (btn) btn.addEventListener('click', schedule);
  render();
})();
