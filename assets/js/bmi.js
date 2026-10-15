(function () {
  'use strict';
  var get = function (id) { return document.getElementById(id); };
  function calculate() {
    var w = get('weight').value.trim(), h = get('height').value.trim();
    var weight = w === '' ? NaN : Number(w), height = h === '' ? NaN : Number(h) / 100;
    var result = weight / (height * height);
    if (![weight, height, result].every(Number.isFinite) || weight <= 0 || height <= 0) {
      get('main').textContent = 'Invalid input'; get('category').textContent = '—'; return;
    }
    get('main').textContent = result.toFixed(1);
    get('category').textContent = result < 18.5 ? 'Underweight' : result < 25 ? 'Healthy range' : result < 30 ? 'Overweight' : 'Obesity range';
  }
  calculate=window.DCHCalculator.wrap(calculate,{"fields":[],"outputs":["main","category"],"primary":"main"});get('calculateButton').onclick = calculate; calculate();
}());
