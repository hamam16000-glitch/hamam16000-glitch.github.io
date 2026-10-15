(function () {
  'use strict';
  var get = function (id) { return document.getElementById(id); };
  function number(id) { var value = get(id).value.trim(); return value === '' ? NaN : Number(value); }
  function fail(message) {
    get('mainResult').textContent = message;
    get('fatMass').textContent = '—'; get('category').textContent = '—';
  }
  function calculate() {
    var height = number('height'), neck = number('neck'), waist = number('waist');
    var weight = number('weightHidden'), male = get('sex').value === 'male', hip = male ? 0 : number('hip');
    if (![height, neck, waist, weight, hip].every(Number.isFinite) || Math.min(height, neck, waist, weight) <= 0 || (!male && hip <= 0)) {
      fail('Enter positive measurements in inches and a positive weight in pounds.'); return;
    }
    var circumference = male ? waist - neck : waist + hip - neck;
    if (circumference <= 0) { fail('Check the waist, neck and hip measurements.'); return; }
    var fat = male ? 86.010 * Math.log10(circumference) - 70.041 * Math.log10(height) + 36.76
      : 163.205 * Math.log10(circumference) - 97.684 * Math.log10(height) - 78.387;
    if (!Number.isFinite(fat) || fat < 0 || fat > 100) { fail('These measurements do not produce a valid estimate.'); return; }
    var locale = window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US';
    get('mainResult').textContent = new Intl.NumberFormat(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(fat) + '%';
    get('fatMass').textContent = new Intl.NumberFormat(locale, {minimumFractionDigits: 1, maximumFractionDigits: 1}).format(weight * fat / 100) + ' lb';
    get('category').textContent = 'Estimate calculated';
  }
  calculate=window.DCHCalculator.wrap(calculate,{"fields":[],"outputs":["mainResult","fatMass","category"],"primary":"mainResult"});get('calculateButton').onclick = calculate; calculate();
}());
