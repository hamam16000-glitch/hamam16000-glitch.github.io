(function () {
  'use strict';
  var get = function (id) { return document.getElementById(id); };
  function number(id) { var value = get(id).value.trim(); return value === '' ? NaN : Number(value); }
  function fail() { get('main').textContent = 'Invalid input'; get('total').textContent = '—'; get('interest').textContent = '—'; }
  function money(value) {
    var locale = window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US';
    return new Intl.NumberFormat(locale, {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value);
  }
  function calculate() {
    var amount = number('amount'), rate = number('rate') / 1200, months = number('years') * 12;
    if (![amount, rate, months].every(Number.isFinite) || amount <= 0 || rate < 0 || months <= 0) { fail(); return; }
    var payment = rate === 0 ? amount / months : amount * rate / (1 - Math.pow(1 + rate, -months));
    var total = payment * months;
    if (!Number.isFinite(payment) || !Number.isFinite(total)) { fail(); return; }
    get('main').textContent = money(payment); get('total').textContent = money(total);
    get('interest').textContent = money(Math.max(0, total - amount));
  }
  calculate=window.DCHCalculator.wrap(calculate,{"fields":[],"outputs":["main","total","interest"],"primary":"main"});get('calculateButton').onclick = calculate; calculate();
}());
