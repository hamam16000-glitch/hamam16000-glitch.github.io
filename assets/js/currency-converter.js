(function () {
  'use strict';
  var amount = document.getElementById('amount'), rate = document.getElementById('rate'), output = document.getElementById('main');
  function msg(k) { var l = (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || 'en', d = window.DCH_GUIDE_I18N && window.DCH_GUIDE_I18N[l]; return (l !== 'en' && d && d[k]) || k; }
  function again() { if (!Number.isFinite(Number(output.textContent))) { calculate(); } }
  document.addEventListener('dch:guideapplied', function () { setTimeout(again, 0); });
  function calculate() {
    var a = amount.value.trim() === '' ? NaN : Number(amount.value), r = rate.value.trim() === '' ? NaN : Number(rate.value), converted = a * r;
    if (![a, r, converted].every(Number.isFinite) || r <= 0) { output.textContent = msg('Enter an amount and a positive exchange rate.'); return; }
    output.textContent = converted.toFixed(2);
  }
  calculate=window.DCHCalculator.wrap(calculate,{"fields":[{"id":"amount"},{"id":"rate"}],"outputs":["main"],"primary":"main"});document.getElementById('calculateButton').onclick = calculate; calculate();
}());
