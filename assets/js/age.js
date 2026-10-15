(function () {
  'use strict';
  var birth = document.getElementById('birth'), today = document.getElementById('today');
  var output = document.getElementById('main');
  function parseDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    var date = new Date(value + 'T00:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
  }
  function addMonths(date, months) {
    var target = new Date(date.getTime());
    target.setUTCDate(1);
    target.setUTCMonth(date.getUTCMonth() + months);
    var last = new Date(target.getTime());
    last.setUTCMonth(last.getUTCMonth() + 1);
    last.setUTCDate(0);
    target.setUTCDate(Math.min(date.getUTCDate(), last.getUTCDate()));
    return target;
  }
  function calculate() {
    var start = parseDate(birth.value), end = parseDate(today.value);
    if (!start || !end || end < start) { output.textContent = 'Invalid dates'; return; }
    var months = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth();
    if (addMonths(start, months) > end) months--;
    var days = Math.round((end.getTime() - addMonths(start, months).getTime()) / 86400000);
    output.textContent = Math.floor(months / 12) + ' years, ' + (months % 12) + ' months, ' + days + ' days';
  }
  var now = new Date();
  today.value = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
  calculate=window.DCHCalculator.wrap(calculate,{"fields":[],"outputs":["main"],"primary":"main"});document.getElementById('calculateButton').onclick = calculate;
}());
