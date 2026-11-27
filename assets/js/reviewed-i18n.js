/* Live text for the reviewed calculator pages: error messages, the result line and the save button.
   Everything else (labels, notes, buttons, headings) is translated by guide-i18n.js through its dictionaries;
   this script re-runs that pass after each calculation and translates the messages that contain entered values. */
(function () {
  'use strict';
  var IDX = {es: 0, 'zh-CN': 1, fil: 2};
  function lang() { return (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || document.documentElement.lang || 'en'; }
  function dict(l) { return window.DCH_GUIDE_I18N && window.DCH_GUIDE_I18N[l]; }
  function lab(s, l) { var d = dict(l); return (d && d[s]) || s; }
  var EXACT = {
    'Result exceeds the supported range. Try smaller amounts, rates or periods.': ['El resultado supera el intervalo admitido. Prueba con cantidades, tasas o plazos menores.', '结果超出支持范围。请尝试更小的金额、利率或期限。', 'Lampas ang resulta sa suportadong saklaw. Subukan ang mas maliliit na halaga, rate o panahon.'],
    'Two identical points do not determine a unique line.': ['Dos puntos idénticos no determinan una recta única.', '两个相同的点无法确定唯一的直线。', 'Ang dalawang magkaparehong punto ay hindi tumutukoy sa natatanging linya.'],
    'Choose radius or diameter.': ['Elige radio o diámetro.', '请选择半径或直径。', 'Pumili ng radius o diameter.'],
    'Choose a supported shape.': ['Elige una figura admitida.', '请选择支持的形状。', 'Pumili ng suportadong hugis.']
  };
  var PRE = [
    [/^(.+): enter a number using a dot for decimals and no grouping commas\.$/, ['{0}: introduce un número usando un punto para los decimales y sin comas de agrupación.', '{0}：请输入数字，小数用点号，不要使用千位分隔逗号。', '{0}: maglagay ng numero na may tuldok para sa decimal at walang kuwit na panggrupo.']],
    [/^(.+): this nonzero input is too small for supported numerical precision\.$/, ['{0}: este valor distinto de cero es demasiado pequeño para la precisión numérica admitida.', '{0}：这个非零输入太小，超出了所支持的数值精度。', '{0}: masyadong maliit ang hindi-zero na input na ito para sa suportadong katumpakan ng bilang.']],
    [/^(.+) must be greater than zero\.$/, ['{0} debe ser mayor que cero.', '{0}必须大于零。', 'Dapat mas malaki sa zero ang {0}.']],
    [/^(.+) square units$/, ['{0} unidades cuadradas', '{0} 平方单位', '{0} parisukat na yunit'], true]
  ];
  var SAVE = {es: ['Guardar calculadora', 'Calculadora guardada', 'Guardar esta calculadora en favoritos', 'Quitar esta calculadora de favoritos'],
    'zh-CN': ['保存计算器', '已保存的计算器', '将此计算器加入收藏', '从收藏中移除此计算器'],
    fil: ['I-save ang calculator', 'Naka-save na calculator', 'I-save ang calculator na ito sa mga paborito', 'Alisin ang calculator na ito sa mga paborito']};
  function fill(t, a) { return t.replace('{0}', a); }
  function msg(s, l) {
    var i = IDX[l], d = dict(l), m;
    if (i === undefined || !s) return s;
    if (EXACT[s]) return EXACT[s][i];
    if (d && d[s]) return d[s];
    m = s.match(/^(.+): enter a valid (whole )?number(?: from (\S+))?(?: to (\S+))?\.$/);
    if (m) {
      var L = lab(m[1], l), w = m[2], f = m[3], t = m[4];
      if (l === 'es') return L + ': introduce un número ' + (w ? 'entero ' : '') + 'válido' + (f ? ' desde ' + f : '') + (t ? ' hasta ' + t : '') + '.';
      if (l === 'zh-CN') return L + '：请输入有效的' + (w ? '整数' : '数字') + (f ? '，范围从 ' + f : '') + (t ? ' 到 ' + t : '') + '。';
      return L + ': maglagay ng wastong ' + (w ? 'buong ' : '') + 'bilang' + (f ? ' mula ' + f : '') + (t ? ' hanggang ' + t : '') + '.';
    }
    for (var k = 0; k < PRE.length; k++) {
      m = s.match(PRE[k][0]);
      if (m) return fill(PRE[k][1][i], PRE[k][2] ? m[1] : lab(m[1], l));
    }
    return s;
  }
  var busy = false, timer = 0, mo = null;
  function pass() {
    timer = 0;
    var l = lang();
    if (busy || IDX[l] === undefined || !dict(l)) return;
    busy = true;
    ['calc-error', 'result-value'].forEach(function (id) {
      var e = document.getElementById(id); if (!e) return;
      var cur = e.textContent.trim(), r = msg(cur, l);
      if (r !== cur) e.textContent = r;
    });
    var fav = document.querySelector('.reviewed-favorite');
    if (fav) {
      var s = SAVE[l], x = fav.textContent;
      if (/Saved calculator/.test(x)) fav.textContent = x.replace('Saved calculator', s[1]);
      else if (/Save calculator/.test(x)) fav.textContent = x.replace('Save calculator', s[0]);
      var a = fav.getAttribute('aria-label');
      if (a === 'Save this calculator to favorites') fav.setAttribute('aria-label', s[2]);
      else if (a === 'Remove this calculator from favorites') fav.setAttribute('aria-label', s[3]);
    }
    if (window.DCHGuideI18N && window.DCHGuideI18N.apply) window.DCHGuideI18N.apply(l);
    if (mo) mo.takeRecords();
    busy = false;
  }
  function queue() { if (!busy && !timer) timer = setTimeout(pass, 30); }
  function start() {
    if (window.MutationObserver) {
      mo = new MutationObserver(queue);
      mo.observe(document.body, {childList: true, subtree: true, characterData: true});
    }
    queue();
  }
  document.addEventListener('dch:guideapplied', queue);
  document.addEventListener('dch:languagechange', queue);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true}); else start();
}());
