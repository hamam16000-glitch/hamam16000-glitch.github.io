/* Required numeric inputs, declared field bounds and result cleanup.
   Each engine supplies its own field/output list; this does not certify its model. */
(function () {
  'use strict';
  function element(id) { return document.getElementById(id); }
  function enabled(rule) {
    return !rule.when || (element(rule.when[0]) && element(rule.when[0]).value === rule.when[1]);
  }
  // Reject malformed decimals and nonzero values that Number would silently
  // underflow to zero. In particular Number('0x10') and parseFloat('0x10')
  // disagree; a decimal input must never be interpreted both ways.
  function numeric(raw) {
    var text = String(raw).trim();
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(text)) return NaN;
    var value = Number(text);
    if (!Number.isFinite(value) || (value === 0 && /[1-9]/.test(text.split(/[eE]/)[0]))) return NaN;
    return value;
  }
  function valid(config) {
    return config.fields.every(function (rule) {
      if (!enabled(rule)) return true;
      var field = element(rule.id), raw = field && String(field.value).trim();
      if (!raw) return false;
      var value = numeric(raw);
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
      return numeric(value);
    });
    return values.every(Number.isFinite) ? values : null;
  }
  // Present value of n equal end-of-period payments of 1. log1p/expm1
  // preserve small rates and avoid the overflow of (1+r)^n at long terms.
  function annuityFactor(rate, periods) {
    return rate === 0 ? periods : -Math.expm1(-periods * Math.log1p(rate)) / rate;
  }
  function loanPayment(principal, annualPercent, months) {
    if (!(principal >= 0) || !(annualPercent >= 0) || !(months > 0)) return NaN;
    return principal / annuityFactor(annualPercent / 1200, months);
  }
  function loanBalance(principal, annualPercent, paid, total) {
    var remaining = Math.max(0, total - Math.min(total, Math.max(0, paid)));
    return principal * annuityFactor(annualPercent / 1200, remaining) /
      annuityFactor(annualPercent / 1200, total);
  }
  function futureValue(principal, deposit, rate, periods) {
    if (rate === 0) return principal + deposit * periods;
    var exponent = periods * Math.log1p(rate);
    return principal * Math.exp(exponent) + deposit * Math.expm1(exponent) / rate;
  }
  function formatNumber(value, digits) {
    var locale = window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US';
    var options = {maximumFractionDigits: digits};
    if (digits > 0 && value !== 0 && Math.abs(value) < 0.5 * Math.pow(10, -digits))
      options = {notation: 'scientific', maximumSignificantDigits: Math.min(15, Math.max(3, digits))};
    return new Intl.NumberFormat(locale, options).format(value);
  }
  function roundDecimal(raw, places, mode) {
    var match = String(raw).trim().match(/^([+-]?)(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/);
    var negative = match[1] === '-', fraction = match[3] || '';
    var integer = BigInt((match[2] || '0') + fraction);
    if (integer === 0n) return 0;
    var shift = Number(match[4] || 0) - fraction.length + places;
    if (shift >= 0) return Number((negative ? '-' : '') + integer.toString() + 'e' + (shift - places));
    var divisor = 10n ** BigInt(-shift), q = integer / divisor, rem = integer % divisor;
    var increment = mode === 'floor' ? negative && rem > 0n :
      mode === 'ceil' ? !negative && rem > 0n :
      mode === 'trunc' ? false : negative ? 2n * rem > divisor : 2n * rem >= divisor;
    if (increment) q++;
    return Number((negative ? '-' : '') + q.toString() + 'e' + (-places));
  }
  window.DCHCalculator = {wrap: wrap, parseList: parseList, numeric: numeric,
    annuityFactor: annuityFactor, loanPayment: loanPayment,
    loanBalance: loanBalance, futureValue: futureValue, formatNumber: formatNumber,
    roundDecimal: roundDecimal};
})();
