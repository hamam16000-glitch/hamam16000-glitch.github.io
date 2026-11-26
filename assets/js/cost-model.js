/* Breakdown and what-if tables for fee, ad ROI, compliance and education ROI calculators.
   Each model repeats the page's own arithmetic from the same input fields; it is not a quote,
   forecast or advice. The data-model attribute on #costModel selects the model. */
(function () {
  'use strict';
  var box = document.getElementById('costModel');
  if (!box) return;
  var get = function (id) { return document.getElementById(id); };
  var kind = box.getAttribute('data-model');
  var main = get('mainResult');
  if (!main || !window.DCHCalculator) return;
  function curLang() { return (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || document.documentElement.lang || 'en'; }
  function t(tpl) {
    var args = Array.prototype.slice.call(arguments, 1), l = curLang();
    var d = l !== 'en' && window.DCH_GUIDE_I18N && window.DCH_GUIDE_I18N[l];
    return ((d && d[tpl]) || tpl).replace(/\{(\d+)\}/g, function (m, i) { return args[+i]; });
  }
  function locale() { return window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US'; }
  function money(x) { return new Intl.NumberFormat(locale(), {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', useGrouping: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(x); }
  function num(x, d) { return new Intl.NumberFormat(locale(), {useGrouping: 'always', minimumFractionDigits: d, maximumFractionDigits: d}).format(x); }
  function pct(x) { return num(x, 1) + '%'; }
  function val(id) { return window.DCHCalculator.numeric(get(id).value); }
  function el(tag, text, cls) { var e = document.createElement(tag); if (text !== undefined) e.textContent = t(text); if (cls) e.className = cls; return e; }
  function cell(row, text, head, scope) { var c = el(head ? 'th' : 'td', text); if (scope) c.setAttribute('scope', scope); row.appendChild(c); }
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
  function list(items) { var u = el('ul', undefined, 'dch-order dch-assume'); items.forEach(function (t) { u.appendChild(el('li', t)); }); return u; }
  function change(a, b, isMoney) {
    var d = a - b; if (Math.abs(d) < 0.005) return t('no change');
    return (d > 0 ? '+' : '-') + (isMoney === false ? num(Math.abs(d), 1) : money(Math.abs(d)));
  }
  var DIFF_NOTE = 'Each row changes one thing and re-runs the calculator\u2019s own arithmetic on the numbers you entered. These are comparisons, not quotes or forecasts.';

  // ---- legal fee: legal = max(flat, hours*rate); external = court + specialist + other
  function legal(h, r, f, ext) { var hourly = h * r, fee = Math.max(f, hourly); return {hourly: hourly, fee: fee, total: fee + ext, flatWins: f >= hourly}; }
  function renderLegal() {
    var h = val('attorneyHours'), r = val('hourlyRate'), f = val('flatFee'), c = val('courtFees'), s = val('specialistFees'), o = val('otherCosts');
    var ext = c + s + o, b = legal(h, r, f, ext);
    box.appendChild(el('h3', 'Where the total comes from'));
    box.appendChild(list(['The legal fee is the larger of the hourly work (hours x rate) and the flat, package or minimum fee. The flat figure works as a floor, not as a second fee on top.',
      'Court, specialist and other costs are added after that, exactly as entered.',
      'Real engagements can bill retainers, trust deposits, tax or travel differently; this page does not model them.']));
    box.appendChild(table('Legal fee: the two candidates', ['Candidate', 'Amount', 'Used?'], [
      {cells: [t('Hourly work ({0} h x {1})', num(h, 2), money(r)), money(b.hourly), b.flatWins ? 'No' : 'Yes, larger']},
      {cells: ['Flat, package or minimum fee', money(f), b.flatWins ? 'Yes, larger' : 'No']}
    ]));
    box.appendChild(el('p', 'Only the larger candidate goes into the total. The two are not added together, so the table above has no share column.', 'dch-note'));
    box.appendChild(table('What the total is made of', ['Line', 'Amount', 'Share of total'], [
      {cells: [t('Legal fee used ({0})', t(b.flatWins ? 'flat fee' : 'hourly work')), money(b.fee), b.total > 0 ? pct(100 * b.fee / b.total) : '0.0%']},
      {cells: ['Court, filing and government fees', money(c), b.total > 0 ? pct(100 * c / b.total) : '0.0%']},
      {cells: ['Specialist and professional fees', money(s), b.total > 0 ? pct(100 * s / b.total) : '0.0%']},
      {cells: ['Other case-related costs', money(o), b.total > 0 ? pct(100 * o / b.total) : '0.0%']},
      {cls: 'dch-total', cells: ['Estimated total', money(b.total), b.total > 0 ? '100.0%' : '0.0%']}
    ]));
    if (r > 0) box.appendChild(el('p', t('Break-even: hourly work passes the flat fee at {0} hours ({1} / {2}). Below that, this model keeps the flat fee; above it, each extra hour adds {2}.', num(f / r, 2), money(f), money(r)), 'dch-note'));
    box.appendChild(el('h3', 'What if the hours or rate were different?'));
    var rows = [{cells: ['As entered', money(b.total), '-']}];
    function add(label, x) { rows.push({cells: [label, money(x.total), change(x.total, b.total)]}); }
    add('Hours 25% lower', legal(h * 0.75, r, f, ext));
    add('Hours 25% higher', legal(h * 1.25, r, f, ext));
    add('Hourly rate 10% higher', legal(h, r * 1.1, f, ext));
    add('Hourly rate 10% lower', legal(h, r * 0.9, f, ext));
    add('No hourly work (flat fee only)', legal(0, r, f, ext));
    box.appendChild(table('Estimated total under changed hours or rate', ['Scenario', 'Total', 'Change'], rows));
    box.appendChild(el('p', DIFF_NOTE, 'dch-note'));
  }

  // ---- ads: clicks from spend and CPC (or CPM x CTR); profit = revenue x margin - spend - other
  function ads(p) {
    var clicks = p.cpm ? p.spend / p.metric * 1000 * p.ctr / 100 : p.spend / p.metric;
    var conv = clicks * p.conv / 100, rev = conv * p.order, gp = rev * p.margin / 100, profit = gp - p.spend - p.other;
    var cost = p.spend + p.other;
    return {clicks: clicks, conv: conv, rev: rev, gp: gp, profit: profit, roi: cost > 0 ? profit / cost * 100 : NaN, roas: p.spend > 0 ? rev / p.spend : 0, cost: cost};
  }
  function renderAds() {
    var cpm = !!get('ctrRate');
    var p = {cpm: cpm, spend: val('adSpend'), metric: val('costMetric'), ctr: cpm ? val('ctrRate') : 0, conv: val('conversionRate'), order: val('averageOrder'), margin: val('grossMargin'), other: val('otherCosts')};
    var a = ads(p);
    box.appendChild(el('h3', 'From ad spend to profit'));
    box.appendChild(list([cpm ? 'Clicks come from spend and CPM: impressions = spend / CPM x 1,000, then clicks = impressions x click-through rate.' : 'Clicks come from spend divided by the average cost per click.',
      'Profit is revenue x gross margin, minus the ad spend and the other campaign costs. ROI divides that profit by spend plus other costs.',
      'ROAS here is revenue divided by ad spend only, so it ignores the other campaign costs that ROI includes.',
      'The model assumes the rates you enter hold at any spend level. Real campaigns usually do not.']));
    box.appendChild(table('Funnel and profit for the entered campaign', ['Step', 'Result'], [
      {cells: ['Clicks', num(a.clicks, 0)]},
      {cells: [t('Conversions ({0}% of clicks)', p.conv), num(a.conv, 1)]},
      {cells: ['Revenue', money(a.rev)]},
      {cells: [t('Gross profit ({0}% margin)', p.margin), money(a.gp)]},
      {cells: ['Less ad spend', money(-p.spend)]},
      {cells: ['Less other campaign costs', money(-p.other)]},
      {cls: 'dch-total', cells: ['Profit', money(a.profit)]},
      {cells: ['ROI', Number.isFinite(a.roi) ? pct(a.roi) : t('Undefined (zero cost)')]},
      {cells: ['ROAS (revenue / ad spend)', num(a.roas, 2) + 'x']}
    ]));
    var perConv = a.conv > 0 ? a.cost / a.conv : NaN;
    var revNeeded = p.margin > 0 ? a.cost / (p.margin / 100) : NaN;
    var bConv = (a.clicks > 0 && p.order > 0 && p.margin > 0) ? 100 * a.cost / (a.clicks * p.order * p.margin / 100) : NaN;
    var msg = [];
    if (Number.isFinite(bConv)) msg.push(t(bConv > 100 ? 'Break-even: at your other inputs the conversion rate must reach {0}% for profit to be zero (above 100%, so this campaign cannot break even as entered).' : 'Break-even: at your other inputs the conversion rate must reach {0}% for profit to be zero.', num(bConv, 2)));
    if (Number.isFinite(revNeeded) && p.spend > 0) msg.push(t('Revenue must reach {0} (ROAS {1}x) to cover spend plus other costs at this margin.', money(revNeeded), num(revNeeded / p.spend, 2)));
    if (Number.isFinite(perConv)) msg.push(t('Cost per conversion: {0}.', money(perConv)));
    msg.forEach(function (m) { box.appendChild(el('p', m, 'dch-note')); });
    box.appendChild(el('h3', 'What if the rates were different?'));
    var rows = [{cells: ['As entered', money(a.profit), Number.isFinite(a.roi) ? pct(a.roi) : '-', '-']}];
    function add(label, q) { var x = ads(q); rows.push({cells: [label, money(x.profit), Number.isFinite(x.roi) ? pct(x.roi) : '-', change(x.profit, a.profit)]}); }
    function mod(k, f) { var q = {}; for (var i in p) q[i] = p[i]; q[k] = Math.min(k === 'conv' || k === 'ctr' ? 100 : Infinity, q[k] * f); return q; }
    add('Conversion rate 25% lower', mod('conv', 0.75));
    add('Conversion rate 25% higher', mod('conv', 1.25));
    if (cpm) { add('Click-through rate 25% lower', mod('ctr', 0.75)); add('Click-through rate 25% higher', mod('ctr', 1.25)); }
    add(t(cpm ? 'CPM 20% higher' : 'Cost per click 20% higher'), mod('metric', 1.2));
    add('Gross margin 10% lower', mod('margin', 0.9));
    box.appendChild(table('Profit and ROI under changed rates', ['Scenario', 'Profit', 'ROI', 'Change in profit'], rows));
    box.appendChild(el('p', DIFF_NOTE, 'dch-note'));
  }

  // ---- compliance: project = base + audit + remediation; tools = monthly x 12; training = employees x per-head
  function comp(p) { var project = p.base + p.audit + p.rem, tools = p.tool * 12, train = p.emp * p.trn; return {project: project, tools: tools, train: train, total: project + tools + train}; }
  function renderComp() {
    var p = {emp: val('employees'), base: val('base'), audit: val('audit'), tool: val('tooling'), trn: val('training'), rem: val('remediation')};
    var c = comp(p), sh = function (x) { return c.total > 0 ? pct(100 * x / c.total) : '0.0%'; };
    box.appendChild(el('h3', 'What the total is made of'));
    box.appendChild(list(['The total adds readiness, assessment and remediation amounts, twelve months of tooling, and training for every employee entered.',
      'This page does not say which of these repeat every year. Tooling and training often do, but only your own scope and quotes can settle that, so the table keeps each line separate.',
      'Amounts are the ones you enter. The page does not look up fees or scope requirements.']));
    box.appendChild(table('Lines that make up the estimated total', ['Line', 'Amount', 'Share of total'], [
      {cells: ['Readiness and consulting', money(p.base), sh(p.base)]},
      {cells: ['Assessment or audit', money(p.audit), sh(p.audit)]},
      {cells: ['Technical remediation', money(p.rem), sh(p.rem)]},
      {cells: [t('Tooling ({0} x 12 months)', money(p.tool)), money(c.tools), sh(c.tools)]},
      {cells: [t('Training ({0} x {1})', num(p.emp, 0), money(p.trn)), money(c.train), sh(c.train)]},
      {cls: 'dch-total', cells: ['Estimated total', money(c.total), c.total > 0 ? '100.0%' : '0.0%']}
    ]));
    box.appendChild(el('p', t('Per employee: {0} across {1} employees or in-scope users. Of the total, {2} comes from the tooling and training lines.', money(c.total / p.emp), num(p.emp, 0), money(c.tools + c.train)), 'dch-note'));
    box.appendChild(el('h3', 'What if the scope were different?'));
    var rows = [{cells: ['As entered', money(c.total), '-']}];
    function add(label, k, f) { var q = {}; for (var i in p) q[i] = p[i]; q[k] = f(q[k]); var x = comp(q); rows.push({cells: [label, money(x.total), change(x.total, c.total)]}); }
    add('Half the employees in scope', 'emp', function (v) { return Math.max(1, Math.round(v / 2)); });
    add('Twice the employees in scope', 'emp', function (v) { return v * 2; });
    add('Remediation budget 25% lower', 'rem', function (v) { return v * 0.75; });
    add('Remediation budget 25% higher', 'rem', function (v) { return v * 1.25; });
    add('Tooling 6 months instead of 12', 'tool', function (v) { return v / 2; });
    box.appendChild(table('Estimated total under changed scope', ['Scenario', 'Total', 'Change'], rows));
    box.appendChild(el('p', DIFF_NOTE, 'dch-note'));
  }

  // ---- education: cost = max(0,(tuition-aid)*years) + current*years; gain = max(0, after-current)*workyears
  function edu(p) {
    var direct = Math.max(0, (p.tuition - p.aid) * p.years), opp = p.current * p.years, cost = direct + opp;
    var uplift = Math.max(0, p.after - p.current), gain = uplift * p.work, net = gain - cost;
    return {direct: direct, opp: opp, cost: cost, uplift: uplift, gain: gain, net: net, roi: cost > 0 ? net / cost * 100 : NaN, payback: p.after > p.current ? cost / (p.after - p.current) : Infinity};
  }
  function renderEdu() {
    var p = {tuition: val('tuition'), years: val('years'), aid: val('aid'), current: val('current'), after: val('after'), work: val('workyears')};
    var e = edu(p);
    box.appendChild(el('h3', 'Cost, gain and break-even'));
    box.appendChild(list(['Cost is tuition minus aid for each program year (not below zero), plus the earnings you give up while studying.',
      'Gain is the yearly earnings increase multiplied by the comparison years. Nothing is discounted, and loan interest, taxes and raises are left out.',
      'If aid is larger than tuition, the extra is not counted as income.']));
    box.appendChild(table('Cost and gain for the entered program', ['Line', 'Amount'], [
      {cells: [t('Tuition less aid ({0} years)', num(p.years, 2)), money(e.direct)]},
      {cells: ['Earnings given up while studying', money(e.opp)]},
      {cls: 'dch-total', cells: ['Total cost', money(e.cost)]},
      {cells: ['Yearly earnings increase', money(e.uplift)]},
      {cells: [t('Gain over {0} comparison years', num(p.work, 2)), money(e.gain)]},
      {cls: 'dch-total', cells: ['Net financial benefit', money(e.net)]}
    ]));
    box.appendChild(el('p', Number.isFinite(e.payback) ? t('Break-even: the cost is recovered after {0} years of the earnings increase.', num(e.payback, 1)) + ' ' + t(e.payback <= p.work ? 'That is inside the {0} comparison years.' : 'That is beyond the {0} comparison years, so the net benefit is negative.', num(p.work, 2)) : t('There is no earnings increase in this scenario, so the cost is never recovered.'), 'dch-note'));
    var rows = [], n = Math.min(Math.ceil(p.work), 15), step = 1;
    for (var y = 1; y <= n; y++) {
      var yrs = Math.min(y, p.work), cum = e.uplift * yrs - e.cost;
      rows.push({cells: [String(y) + (y > p.work ? '' : ''), money(e.uplift * yrs), money(cum)], cls: cum >= 0 && (y === 1 || e.uplift * Math.min(y - 1, p.work) - e.cost < 0) ? 'dch-total' : ''});
    }
    box.appendChild(el('h3', 'Year by year after the program'));
    box.appendChild(table('Cumulative earnings increase and net position by year', ['Year', 'Cumulative increase', 'Net of cost'], rows));
    box.appendChild(el('p', n < Math.ceil(p.work) ? t('Only the first 15 years are listed. The comparison above uses all {0} years.', num(p.work, 2)) : t('The bold row is the first year in which the net position is not negative.'), 'dch-note'));
    box.appendChild(el('h3', 'What if the inputs were different?'));
    var rr = [{cells: ['As entered', money(e.net), Number.isFinite(e.roi) ? pct(e.roi) : '-', '-']}];
    function add(label, k, f) { var q = {}; for (var i in p) q[i] = p[i]; q[k] = f(q[k]); var x = edu(q); rr.push({cells: [label, money(x.net), Number.isFinite(x.roi) ? pct(x.roi) : '-', change(x.net, e.net)]}); }
    add('Earnings after the program 10% lower', 'after', function (v) { return v * 0.9; });
    add('Earnings after the program 10% higher', 'after', function (v) { return v * 1.1; });
    add('No grants or aid', 'aid', function () { return 0; });
    add('Comparison period 25% shorter', 'work', function (v) { return v * 0.75; });
    add('Comparison period 25% longer', 'work', function (v) { return v * 1.25; });
    box.appendChild(table('Net benefit and ROI under changed inputs', ['Scenario', 'Net benefit', 'ROI', 'Change'], rr));
    box.appendChild(el('p', DIFF_NOTE, 'dch-note'));
  }

  function render() {
    box.textContent = '';
    var ctrl = window.DCHCalculator.getController && window.DCHCalculator.getController();
    if (!ctrl || !ctrl.ok) { box.hidden = true; return; }
    box.hidden = false;
    try {
      if (kind === 'legal') renderLegal(); else if (kind === 'ads') renderAds(); else if (kind === 'compliance') renderComp(); else if (kind === 'education') renderEdu();
    } catch (e) { box.textContent = ''; box.hidden = true; }
  }
  var queued = false;
  function schedule() { if (queued) return; queued = true; setTimeout(function () { queued = false; render(); }, 0); }
  new MutationObserver(schedule).observe(main, {childList: true, characterData: true, subtree: true});
  document.querySelectorAll('.form-control').forEach(function (f) { f.addEventListener('input', schedule); });
  var btn = get('calculateButton'); if (btn) btn.addEventListener('click', schedule);
  render();
  box.setAttribute('data-dch-no-i18n', 'true');
  document.addEventListener('dch:guideapplied', function () { box.setAttribute('data-dch-no-i18n', 'true'); render(); });
})();
