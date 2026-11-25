(function () {
  'use strict';
  window.DCHDebtStrategy = function (strategy) {
    var get = function (id) { return document.getElementById(id); };
    function n(id) { var s = get(id).value.trim(); return s === '' ? NaN : Number(s); }
    function money(x) {
      var locale = window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US';
      return new Intl.NumberFormat(locale, {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(x);
    }
    function fail(message) {
      get('mainResult').textContent = message;
      ['interest', 'paid', 'first'].forEach(function (id) { get(id).textContent = '—'; });
      get('detailOut').textContent = '';
    }
    function orderFor(which) {
      return which === 'avalanche' ? function (a, b) { return b.rate - a.rate; } : function (a, b) { return a.balance - b.balance; };
    }
    function whole(x) {
      var locale = window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US';
      return new Intl.NumberFormat(locale, {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 0, maximumFractionDigits: 0}).format(x);
    }
    var NAMES = {snowball: 'Snowball', avalanche: 'Avalanche'};
    // The payoff model is the one this page has always used: interest is added
    // monthly, every open debt gets its minimum, and the rest of a fixed budget
    // goes to the first debt in the chosen order.
    function simulate(list, extra, which) {
      var order = orderFor(which);
      var debts = list.map(function (d) { return {id: d.id, balance: d.balance, rate: d.rate, minimum: d.minimum}; });
      var budget = debts.reduce(function (sum, d) { return sum + d.minimum; }, extra);
      var months = 0, interest = 0, paid = 0, cleared = [], rows = [];
      var bad = false;
      while (debts.length && months < 1200) {
        months++;
        var available = budget, monthInterest = 0, monthPaid = 0;
        debts.forEach(function (d) { var accrued = d.balance * d.rate / 1200; d.balance += accrued; interest += accrued; monthInterest += accrued; });
        if (!Number.isFinite(interest)) { bad = true; break; }
        debts.forEach(function (d) {
          var p = Math.min(d.minimum, d.balance, available);
          d.balance -= p; available -= p; paid += p; monthPaid += p;
        });
        debts.forEach(function (d) { if (d.balance <= 1e-8 && !d.done) { d.done = true; cleared.push({id: d.id, month: months}); } });
        debts = debts.filter(function (d) { return d.balance > 1e-8; });
        debts.sort(order);
        for (var j = 0; j < debts.length && available > 0; j++) {
          var p2 = Math.min(available, debts[j].balance);
          debts[j].balance -= p2; available -= p2; paid += p2; monthPaid += p2;
        }
        debts.forEach(function (d) { if (d.balance <= 1e-8 && !d.done) { d.done = true; cleared.push({id: d.id, month: months}); } });
        debts = debts.filter(function (d) { return d.balance > 1e-8; });
        rows.push({interest: monthInterest, paid: monthPaid, balance: debts.reduce(function (s, d) { return s + d.balance; }, 0)});
      }
      return {bad: bad, months: months, interest: interest, paid: paid, done: debts.length === 0,
        cleared: cleared, left: debts.map(function (d) { return d.id; }), rows: rows};
    }
    function el(tag, text, cls) { var e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }
    function span(months) {
      var y = Math.floor(months / 12), m = months % 12, out = [];
      if (y) out.push(y + (y === 1 ? ' year' : ' years'));
      if (m || !y) out.push(m + (m === 1 ? ' month' : ' months'));
      return out.join(' ');
    }
    function orderText(sim) {
      if (!sim.cleared.length && !sim.left.length) return 'No debts';
      var groups = [], last = null;
      sim.cleared.forEach(function (c) {
        if (last && last.month === c.month) last.names.push('Debt ' + c.id);
        else { last = {month: c.month, names: ['Debt ' + c.id]}; groups.push(last); }
      });
      var text = groups.map(function (g) { return g.names.join(' + '); }).join(' → ');
      if (sim.left.length) text += (text ? ' → ' : '') + 'not cleared: ' + sim.left.map(function (i) { return 'Debt ' + i; }).join(', ');
      return text;
    }
    function cell(row, text, head, scope) {
      var c = el(head ? 'th' : 'td', text); if (scope) c.setAttribute('scope', scope); row.appendChild(c); return c;
    }
    function table(caption, heads, cls) {
      var wrap = el('div', undefined, 'dch-table-wrap'), t = el('table', undefined, 'dch-table' + (cls ? ' ' + cls : ''));
      t.appendChild(el('caption', caption));
      var tr = el('tr'); heads.forEach(function (h) { cell(tr, h, true, 'col'); });
      var th = el('thead'); th.appendChild(tr); t.appendChild(th);
      var tb = el('tbody'); t.appendChild(tb); wrap.appendChild(t);
      return {wrap: wrap, body: tb};
    }
    function render(debts, extra, sims, main) {
      var box = get('detailOut'); box.textContent = '';
      if (!debts.length) { return; }
      var other = strategy === 'avalanche' ? 'snowball' : 'avalanche';
      // 1. Side-by-side comparison on the same debts
      box.appendChild(el('h3', 'Snowball vs avalanche on your numbers'));
      var t1 = table('Same debts, same monthly budget, two payoff orders', ['', 'Snowball', 'Avalanche']);
      function line(label, f) { var tr = el('tr'); cell(tr, label, true, 'row'); cell(tr, f(sims.snowball)); cell(tr, f(sims.avalanche)); t1.body.appendChild(tr); }
      line('Time to debt-free', function (s) { return s.bad ? 'Out of range' : s.done ? s.months + ' months (' + span(s.months) + ')' : 'Not repaid within 100 years'; });
      line('Total interest', function (s) { return s.bad || !s.done ? '—' : money(s.interest); });
      line('Debts cleared in this order', orderText);
      box.appendChild(t1.wrap);
      var a = sims.snowball, b = sims.avalanche, msg;
      if (a.bad || b.bad) msg = 'These values exceed the calculation range.';
      else if (a.done && b.done) {
        var di = a.interest - b.interest, dm = a.months - b.months;
        if (Math.abs(di) < 0.005 && dm === 0) msg = 'Both orders give the same result here. That happens when the smallest balance also carries the highest rate, or when the budget clears everything at once.';
        else if (di > 0) msg = 'On these numbers, avalanche costs ' + money(di) + ' less interest and finishes ' + (dm === 0 ? 'in the same number of months' : dm + (dm === 1 ? ' month' : ' months') + ' sooner') + '. Snowball clears its first debt in month ' + (a.cleared[0] ? a.cleared[0].month : 0) + ' against month ' + (b.cleared[0] ? b.cleared[0].month : 0) + ' for avalanche.';
        else msg = 'On these numbers, snowball costs ' + money(-di) + ' less interest, which is unusual. Recheck the rates and minimums you typed.';
      } else msg = 'At least one order does not clear the debts within 100 years, so interest is not compared. A larger extra payment or higher minimums would be needed.';
      box.appendChild(el('p', msg, 'dch-note'));
      // 2. Effect of the extra payment, same method as the page
      if (extra > 0) {
        var base = simulate(debts, 0, strategy);
        if (main.done && base.done) {
          box.appendChild(el('p', 'Compared with paying only the entered minimums in ' + NAMES[strategy].toLowerCase() + ' order (' + base.months + ' months, ' + money(base.interest) + ' interest), the extra ' + money(extra) + ' a month (freed minimums still roll over in both runs) saves ' + money(base.interest - main.interest) + ' of interest and ' + (base.months - main.months) + (base.months - main.months === 1 ? ' month.' : ' months.'), 'dch-note'));
        }
      }
      // 3. Year-by-year summary of this page's method
      box.appendChild(el('h3', NAMES[strategy] + ' plan, year by year'));
      var t2 = table(NAMES[strategy] + ' plan year by year', ['Year', 'Paid', 'Interest', 'Balance left'], 'num');
      var years = Math.ceil(main.rows.length / 12), shown = Math.min(years, 10);
      for (var y = 0; y < shown; y++) {
        var from = y * 12, to = Math.min(main.rows.length, from + 12), paid = 0, intr = 0;
        for (var k = from; k < to; k++) { paid += main.rows[k].paid; intr += main.rows[k].interest; }
        var tr = el('tr'); cell(tr, to - from === 12 ? String(y + 1) : (y + 1) + ' (months ' + (from + 1) + '-' + to + ')', true, 'row');
        cell(tr, whole(paid)); cell(tr, whole(intr)); cell(tr, whole(main.rows[to - 1].balance)); t2.body.appendChild(tr);
      }
      box.appendChild(t2.wrap);
      box.appendChild(el('p', (years > shown ? 'Showing the first ' + shown + ' of ' + years + ' years. ' : '') + 'Yearly figures are rounded to the dollar.', 'dch-note'));
      if (main.done && main.cleared.length) {
        var ul = el('ol', undefined, 'dch-order');
        main.cleared.forEach(function (c) { ul.appendChild(el('li', 'Debt ' + c.id + ' is paid off in month ' + c.month + (c.month >= 12 ? ' (' + span(c.month) + ').' : '.'))); });
        box.appendChild(el('h3', 'When each debt disappears')); box.appendChild(ul);
      }
    }
    var okRun = false;
    function calc() {
      okRun = false;
      var debts = [];
      for (var i = 1; i <= 3; i++) {
        var balance = n('b' + i), rate = n('r' + i), minimum = n('min' + i);
        if (![balance, rate, minimum].every(Number.isFinite) || Math.min(balance, rate, minimum) < 0) return fail('Enter nonnegative balances, rates and minimum payments.');
        if (balance > 0) debts.push({id: i, balance: balance, rate: rate, minimum: minimum});
      }
      var extra = n('extra');
      if (!Number.isFinite(extra) || extra < 0) return fail('Enter a nonnegative extra payment.');
      var budget = debts.reduce(function (sum, d) { return sum + d.minimum; }, extra);
      if (debts.length && budget <= 0) return fail('Enter a positive monthly payment.');
      var first = debts.length ? debts.slice().sort(orderFor(strategy))[0] : null;
      var firstLabel = first ? money(first.balance) + ' at ' + first.rate.toFixed(2) + '% APR' : 'None';
      var sims = {snowball: simulate(debts, extra, 'snowball'), avalanche: simulate(debts, extra, 'avalanche')};
      var main = sims[strategy];
      if (main.bad) return fail('These values exceed the calculation range.');
      okRun = true;
      if (!main.done) {
        get('mainResult').textContent = 'Not repaid within 100 years';
        get('interest').textContent = 'Not available: payoff not completed within 100 years';
        get('paid').textContent = money(main.paid) + ' simulated through the 100-year limit (payoff incomplete)';
        get('first').textContent = firstLabel;
        render(debts, extra, sims, main);
        return;
      }
      get('mainResult').textContent = main.months + ' months';
      get('interest').textContent = money(main.interest);
      get('paid').textContent = money(main.paid);
      get('first').textContent = firstLabel;
      render(debts, extra, sims, main);
    }
    calc = window.DCHCalculator.wrap(calc, {"fields": [{"id": "b1", "min": 0.0}, {"id": "r1", "min": 0.0}, {"id": "b2", "min": 0.0}, {"id": "r2", "min": 0.0}, {"id": "b3", "min": 0.0}, {"id": "r3", "min": 0.0}, {"id": "min1", "min": 0.0}, {"id": "min2", "min": 0.0}, {"id": "min3", "min": 0.0}, {"id": "extra", "min": 0.0}], "outputs": ["mainResult", "interest", "paid", "first"], "primary": "mainResult"});
    ['b1', 'r1', 'b2', 'r2', 'b3', 'r3', 'min1', 'min2', 'min3', 'extra'].forEach(function (id) {
      get(id).addEventListener('input', function () { if (get('mainResult').textContent === 'Invalid input') get('detailOut').textContent = ''; });
    });
    var wrapped = calc;
    function run2() {
      wrapped.apply(this, arguments);
      if (!okRun) get('detailOut').textContent = '';
    }
    get('calculateButton').onclick = run2;
    run2();
  };
}());
