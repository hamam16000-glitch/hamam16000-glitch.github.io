(function () {
  'use strict';
  var amount = document.getElementById('amount'), rate = document.getElementById('rate'), output = document.getElementById('main');
  function calculate() {
    var a = amount.value.trim() === '' ? NaN : Number(amount.value), r = rate.value.trim() === '' ? NaN : Number(rate.value), converted = a * r;
    if (![a, r, converted].every(Number.isFinite) || r <= 0) { output.textContent = 'Enter an amount and a positive exchange rate.'; return; }
    output.textContent = converted.toFixed(2);
  }
  calculate=window.DCHCalculator.wrap(calculate,{"fields":[],"outputs":["main"],"primary":"main"});document.getElementById('calculateButton').onclick = calculate; calculate();
}());
