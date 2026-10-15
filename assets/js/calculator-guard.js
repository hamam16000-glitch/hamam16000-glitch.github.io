/* Required numeric inputs, declared field bounds and result cleanup.
   Each engine supplies its own field/output list; this does not certify its model. */
(function () {
  'use strict';
  function element(id) { return document.getElementById(id); }
  function enabled(rule) {
    return !rule.when || (element(rule.when[0]) && element(rule.when[0]).value === rule.when[1]);
  }
  function valid(config) {
    return config.fields.every(function (rule) {
      if (!enabled(rule)) return true;
      var field = element(rule.id), raw = field && String(field.value).trim();
      if (!raw) return false;
      var value = Number(raw);
      return Number.isFinite(value) &&
        (rule.min === undefined || value >= rule.min) &&
        (rule.max === undefined || value <= rule.max) &&
        (!rule.integer || Number.isSafeInteger(value));
    });
  }
  function clear(config, message) {
    config.outputs.forEach(function (id) { var field = element(id); if (field) field.textContent = '—'; });
    var primary = element(config.primary);
    if (primary) primary.textContent = message;
  }
  function wrap(calculate, config) {
    config.fields.forEach(function (rule) {
      var field = element(rule.id);
      if (field && field.addEventListener) field.addEventListener('input', function () {
        if (!valid(config)) clear(config, 'Invalid input');
      });
    });
    return function () {
      if (!valid(config)) { clear(config, 'Invalid input'); return; }
      try { calculate.apply(this, arguments); }
      catch (error) {
        if (error.name !== 'RangeError') throw error;
        clear(config, 'Result is outside the supported numeric range'); return;
      }
      var primary = element(config.primary), message = primary ? primary.textContent : '';
      var bad = config.outputs.some(function (id) {
        var field = element(id); return field && /NaN|Infinity|∞/.test(field.textContent);
      });
      if (bad) { clear(config, 'Result is outside the supported numeric range'); return; }
      if (/^(Invalid|Enter |Select |Payment (?:is )?too low|Payoff exceeds)/i.test(message)) clear(config, message);
    };
  }
  function parseList(raw) {
    var text = String(raw).trim();
    if (!text) return null;
    // A comma/semicolon separates values. Dots are decimal separators in lists.
    var tokens = /[,;،]/.test(text) ? text.split(/[,;،]/).map(function (token) { return token.trim(); }) : text.split(/\s+/);
    if (!tokens.length || tokens.some(function (value) { return !value; })) return null;
    var values = tokens.map(function (value) {
      value = value.replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); })
        .replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); }).replace(/٫/g, '.');
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?$/.test(value) ? Number(value) : NaN;
    });
    return values.every(Number.isFinite) ? values : null;
  }
  window.DCHCalculator = {wrap: wrap, parseList: parseList};
})();
