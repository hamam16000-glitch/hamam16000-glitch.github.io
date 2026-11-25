(function () {
  'use strict';
  var get = function (id) { return document.getElementById(id); };
  function n(id) { var s = get(id).value.trim(); return s === '' ? NaN : Number(s); }
  function money(x) {
    var locale = window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US';
    return new Intl.NumberFormat(locale, {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(x);
  }
  function whole(x) {
    var locale = window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US';
    return new Intl.NumberFormat(locale, {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(x);
  }
  var OUT = ['totalInterest', 'remaining', 'extraPayoff', 'extraInterest', 'extraSaved'];
  function fail(message) {
    get('mainResult').textContent = message || 'Enter valid values.';
    OUT.forEach(function (id) { get(id).textContent = '—'; });
    get('extraList').hidden = true;
    get('schedOut').textContent = '';
  }
  function span(months) {
    var y = Math.floor(months / 12), m = months % 12, out = [];
    if (y) out.push(y + (y === 1 ? ' year' : ' years'));
    if (m || !y) out.push(m + (m === 1 ? ' month' : ' months'));
    return out.join(' ');
  }
  // Month-by-month balance. Interest is balance x monthly rate, the same
  // model as the closed-form payment above, with no rounding to cents.
  function run(P, r, pay, months) {
    var bal = P, interest = 0, rows = [];
    for (var k = 1; k <= months && bal > 1e-7; k++) {
      var i = bal * r, p = Math.min(pay, bal + i);
      bal = bal + i - p; if (bal < 1e-7) bal = 0;
      interest += i; rows.push({interest: i, principal: p - i, balance: bal});
    }
    return {interest: interest, months: rows.length, rows: rows};
  }
  function el(tag, text, cls) { var e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }
  function cell(row, text, head, scope) { var c = el(head ? 'th' : 'td', text); if (scope) c.setAttribute('scope', scope); row.appendChild(c); }
  function schedule(base, plan, hasExtra, m) {
    var box = get('schedOut'); box.textContent = '';
    box.appendChild(el('h3', 'Year-by-year schedule' + (hasExtra ? ' with the extra payment' : '')));
    var heads = ['Year', 'Interest', 'Principal', hasExtra ? 'Balance (with extra)' : 'Balance'];
    if (hasExtra) heads.push('Balance (no extra)');
    var wrap = el('div', undefined, 'dch-table-wrap'), t = el('table', undefined, 'dch-table num');
    t.appendChild(el('caption', 'Interest, principal and ending balance for each year of the loan'));
    var hr = el('tr'); heads.forEach(function (h) { cell(hr, h, true, 'col'); });
    var th = el('thead'); th.appendChild(hr); t.appendChild(th);
    var tb = el('tbody');
    var years = Math.ceil(plan.rows.length / 12), shown = Math.min(years, 50);
    for (var y = 0; y < shown; y++) {
      var from = y * 12, to = Math.min(plan.rows.length, from + 12), ip = 0, pp = 0;
      for (var k = from; k < to; k++) { ip += plan.rows[k].interest; pp += plan.rows[k].principal; }
      var tr = el('tr');
      cell(tr, to - from === 12 ? String(y + 1) : (y + 1) + ' (months ' + (from + 1) + '-' + to + ')', true, 'row');
      cell(tr, whole(ip)); cell(tr, whole(pp)); cell(tr, whole(plan.rows[to - 1].balance));
      if (hasExtra) {
        var bi = Math.min(base.rows.length, to) - 1;
        cell(tr, whole(to > base.rows.length ? 0 : base.rows[bi].balance));
      }
      tb.appendChild(tr);
    }
    t.appendChild(tb); wrap.appendChild(t); box.appendChild(wrap);
    if (years > shown) box.appendChild(el('p', 'Showing the first ' + shown + ' of ' + years + ' years.', 'dch-note'));
    box.appendChild(el('p', 'Yearly figures add up the monthly payments and are rounded to the dollar. A lender rounds each payment to the cent, so the last payment on a real loan can differ by a few dollars.', 'dch-note'));
  }
  var okRun = false;
  function calc() {
    okRun = false;
    var P = n('principal'), r = n('rate') / 1200, m = n('years') * 12, e = n('elapsed') * 12, x = n('extra');
    if (![P, r, m, e, x].every(Number.isFinite) || P <= 0 || r < 0 || m <= 0 || e < 0 || x < 0) return fail();
    var k = Math.min(m, e), pay = r === 0 ? P / m : P / window.DCHCalculator.annuityFactor(r, m);
    var remaining = r === 0 ? P * (m - k) / m : pay * window.DCHCalculator.annuityFactor(r, m - k);
    if (![pay, remaining, pay * m].every(Number.isFinite)) return fail();
    get('mainResult').textContent = money(pay);
    get('totalInterest').textContent = money(Math.max(0, pay * m - P));
    get('remaining').textContent = money(Math.max(0, remaining));
    var box = get('schedOut'); box.textContent = '';
    ['extraPayoff', 'extraInterest', 'extraSaved'].forEach(function (id) { get(id).textContent = '—'; });
    get('extraList').hidden = true;
    okRun = true;
    var whole = Math.abs(m - Math.round(m)) < 1e-9;
    if (!whole) {
      box.appendChild(el('p', 'The year-by-year schedule and the extra-payment result need a term that is a whole number of months (years x 12). Try a term such as 15, 20 or 7.5 years.', 'dch-note'));
      return;
    }
    m = Math.round(m);
    var base = run(P, r, pay, m);
    var plan = x > 0 ? run(P, r, pay + x, m) : base;
    if (x > 0) {
      get('extraList').hidden = false;
      get('extraPayoff').textContent = plan.months === m ? span(m) + ' (' + m + ' payments, no earlier than the schedule)' : span(plan.months) + ' (' + plan.months + (plan.months === 1 ? ' payment' : ' payments') + ' instead of ' + m + ')';
      get('extraInterest').textContent = money(plan.interest);
      get('extraSaved').textContent = money(Math.max(0, base.interest - plan.interest));
    }
    schedule(base, plan, x > 0, m);
  }
  calc = window.DCHCalculator.wrap(calc, {"fields": [{"id": "principal"}, {"id": "rate"}, {"id": "years"}, {"id": "elapsed"}, {"id": "extra", "min": 0}], "outputs": ["mainResult", "totalInterest", "remaining", "extraPayoff", "extraInterest", "extraSaved"], "primary": "mainResult"});
  ['principal', 'rate', 'years', 'elapsed', 'extra'].forEach(function (id) {
    get(id).addEventListener('input', function () { if (get('mainResult').textContent === 'Invalid input') { get('schedOut').textContent = ''; get('extraList').hidden = true; } });
  });
  var wrapped = calc;
  function run2() {
    wrapped.apply(this, arguments);
    if (!okRun) { get('schedOut').textContent = ''; get('extraList').hidden = true; }
  }
  get('calculateButton').onclick = run2;
  run2();
}());
