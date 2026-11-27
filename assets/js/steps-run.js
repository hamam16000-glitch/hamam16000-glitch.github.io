/* Show the steps: works out the answer by hand from the entries on the page, one step at a time, and shows the steps only when the hand calculation agrees with the result the calculator displays. */
(function () {
  'use strict';
  var box = document.getElementById('detailBox');
  var mr = document.getElementById('mainResult');
  if (!box || !mr) return;
  var slug = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  var D = {
 "es": {
  "Show the steps": "Mostrar los pasos",
  "These steps are worked out by hand from your entries. They are shown only when they agree with the result above, and they are for learning, not a replacement for the calculator.": "Estos pasos se calculan a mano a partir de tus datos. Solo se muestran cuando coinciden con el resultado de arriba y sirven para aprender, no sustituyen a la calculadora.",
  "Factorial means multiplying every whole number from {0} down to 1.": "Factorial significa multiplicar todos los números enteros desde {0} hasta 1.",
  "Multiplying them gives {0}! = {1}.": "Al multiplicarlos se obtiene {0}! = {1}.",
  "Trailing zeros: count the factors of 5 up to {0} (5, 25, 125 and so on). That gives {1}.": "Ceros finales: cuenta los factores de 5 hasta {0} (5, 25, 125 y así sucesivamente). Resultan {1}.",
  "Divide {0} by 2 again and again, writing down each remainder (0 or 1), until the quotient is 0.": "Divide {0} entre 2 una y otra vez, anotando cada residuo (0 o 1), hasta que el cociente sea 0.",
  "Read the remainders from the last one to the first: {0}.": "Lee los residuos del último al primero: {0}.",
  "Group the bits in fours from the right and write each group as a hex digit: {0}.": "Agrupa los bits de cuatro en cuatro desde la derecha y escribe cada grupo como un dígito hexadecimal: {0}.",
  "Find the greatest common factor with the Euclidean method: divide, keep the remainder, and repeat with the last two numbers.": "Halla el máximo común divisor con el método de Euclides: divide, conserva el residuo y repite con los dos últimos números.",
  "The last non-zero remainder is {0}, so the greatest common factor is {0}.": "El último residuo distinto de cero es {0}, así que el máximo común divisor es {0}.",
  "The least common multiple is {0} × {1} ÷ {2} = {3}.": "El mínimo común múltiplo es {0} × {1} ÷ {2} = {3}.",
  "Permutations count ordered choices: multiply {0} numbers starting at {1} and counting down.": "Las permutaciones cuentan elecciones ordenadas: multiplica {0} números empezando en {1} y bajando.",
  "Divide by r! = {0} because the order does not matter in a combination.": "Divide entre r! = {0}, porque en una combinación el orden no importa.",
  "C({0}, {1}) = {2} ÷ {3} = {4}.": "C({0}, {1}) = {2} ÷ {3} = {4}.",
  "Move the decimal point {0} places to the right: {1} × {2} = {3}.": "Mueve el punto decimal {0} lugares a la derecha: {1} × {2} = {3}.",
  "Round that to the nearest whole number (a fraction of exactly 0.5 rounds up): {0}.": "Redondea eso al número entero más cercano (una fracción de exactamente 0,5 se redondea hacia arriba): {0}.",
  "Move the decimal point back: {0} ÷ {1} = {2}.": "Devuelve el punto decimal a su lugar: {0} ÷ {1} = {2}.",
  "The first non-zero digit of {0} sits in the 10^{1} place, so the leading position is {1}.": "El primer dígito distinto de cero de {0} está en la posición 10^{1}, así que la posición inicial es {1}.",
  "Keep {0} significant figures, so the last kept digit is in the 10^{1} place.": "Conserva {0} cifras significativas, así que el último dígito conservado está en la posición 10^{1}.",
  "Round to that place: {0}.": "Redondea a esa posición: {0}.",
  "In scientific notation this is {0}.": "En notación científica es {0}.",
  "The logarithm of x to base b equals ln(x) ÷ ln(b).": "El logaritmo de x en base b es igual a ln(x) ÷ ln(b).",
  "ln({0}) = {1} and ln({2}) = {3}.": "ln({0}) = {1} y ln({2}) = {3}.",
  "{0} ÷ {1} = {2}.": "{0} ÷ {1} = {2}.",
  "Check: {0} raised to the power {1} gives back {2}.": "Comprobación: {0} elevado a {1} devuelve {2}.",
  "Divide the numerator by the denominator: {0} ÷ {1} = {2}.": "Divide el numerador entre el denominador: {0} ÷ {1} = {2}.",
  "Multiply by 100 to turn the decimal into a percent: {0} × 100 = {1}%.": "Multiplica por 100 para convertir el decimal en porcentaje: {0} × 100 = {1}%.",
  "The page shows the same answer: {0}.": "La página muestra la misma respuesta: {0}.",
  "Subtract the mean from the observed value: {0} − {1} = {2}.": "Resta la media al valor observado: {0} − {1} = {2}.",
  "Divide by the standard deviation: {0} ÷ {1} = {2}.": "Divide entre la desviación estándar: {0} ÷ {1} = {2}.",
  "This value equals the mean.": "Este valor es igual a la media.",
  "This value is {0} standard deviations above the mean.": "Este valor está {0} desviaciones estándar por encima de la media.",
  "This value is {0} standard deviations below the mean.": "Este valor está {0} desviaciones estándar por debajo de la media.",
  "Percent means per hundred, so divide by 100: {0} ÷ 100 = {1}.": "Porcentaje significa por cada cien, así que divide entre 100: {0} ÷ 100 = {1}.",
  "This is the same as moving the decimal point two places to the left.": "Es lo mismo que mover el punto decimal dos lugares a la izquierda.",
  "Multiply the decimal by 100: {0} × 100 = {1}.": "Multiplica el decimal por 100: {0} × 100 = {1}.",
  "This is the same as moving the decimal point two places to the right, then adding the percent sign.": "Es lo mismo que mover el punto decimal dos lugares a la derecha y añadir el signo de porcentaje."
 },
 "zh-CN": {
  "Show the steps": "查看计算步骤",
  "These steps are worked out by hand from your entries. They are shown only when they agree with the result above, and they are for learning, not a replacement for the calculator.": "这些步骤根据您输入的数据手工推算而得，只有在与上方结果一致时才会显示，仅供学习参考，不能替代计算器。",
  "Factorial means multiplying every whole number from {0} down to 1.": "阶乘就是把从 {0} 到 1 的所有整数相乘。",
  "Multiplying them gives {0}! = {1}.": "相乘得到 {0}! = {1}。",
  "Trailing zeros: count the factors of 5 up to {0} (5, 25, 125 and so on). That gives {1}.": "末尾的零：统计 {0} 以内 5 的因数个数（5、25、125 等），共 {1} 个。",
  "Divide {0} by 2 again and again, writing down each remainder (0 or 1), until the quotient is 0.": "把 {0} 不断除以 2，记下每次的余数（0 或 1），直到商为 0。",
  "Read the remainders from the last one to the first: {0}.": "从最后一个余数读到第一个余数：{0}。",
  "Group the bits in fours from the right and write each group as a hex digit: {0}.": "从右往左每四位分为一组，每组写成一个十六进制数字：{0}。",
  "Find the greatest common factor with the Euclidean method: divide, keep the remainder, and repeat with the last two numbers.": "用欧几里得算法求最大公因数：做除法，保留余数，再用最后两个数重复。",
  "The last non-zero remainder is {0}, so the greatest common factor is {0}.": "最后一个非零余数是 {0}，所以最大公因数是 {0}。",
  "The least common multiple is {0} × {1} ÷ {2} = {3}.": "最小公倍数是 {0} × {1} ÷ {2} = {3}。",
  "Permutations count ordered choices: multiply {0} numbers starting at {1} and counting down.": "排列数计算有顺序的选法：从 {1} 开始往下取 {0} 个数相乘。",
  "Divide by r! = {0} because the order does not matter in a combination.": "除以 r! = {0}，因为组合不考虑顺序。",
  "C({0}, {1}) = {2} ÷ {3} = {4}.": "C({0}, {1}) = {2} ÷ {3} = {4}。",
  "Move the decimal point {0} places to the right: {1} × {2} = {3}.": "把小数点向右移动 {0} 位：{1} × {2} = {3}。",
  "Round that to the nearest whole number (a fraction of exactly 0.5 rounds up): {0}.": "四舍五入到最接近的整数（小数部分恰好为 0.5 时向上进位）：{0}。",
  "Move the decimal point back: {0} ÷ {1} = {2}.": "再把小数点移回原位：{0} ÷ {1} = {2}。",
  "The first non-zero digit of {0} sits in the 10^{1} place, so the leading position is {1}.": "{0} 的第一个非零数字位于 10^{1} 位，因此首位指数为 {1}。",
  "Keep {0} significant figures, so the last kept digit is in the 10^{1} place.": "保留 {0} 位有效数字，所以保留的最后一位在 10^{1} 位。",
  "Round to that place: {0}.": "四舍五入到该位：{0}。",
  "In scientific notation this is {0}.": "用科学记数法表示为 {0}。",
  "The logarithm of x to base b equals ln(x) ÷ ln(b).": "以 b 为底 x 的对数等于 ln(x) ÷ ln(b)。",
  "ln({0}) = {1} and ln({2}) = {3}.": "ln({0}) = {1}，ln({2}) = {3}。",
  "{0} ÷ {1} = {2}.": "{0} ÷ {1} = {2}。",
  "Check: {0} raised to the power {1} gives back {2}.": "验算：{0} 的 {1} 次方等于 {2}。",
  "Divide the numerator by the denominator: {0} ÷ {1} = {2}.": "用分子除以分母：{0} ÷ {1} = {2}。",
  "Multiply by 100 to turn the decimal into a percent: {0} × 100 = {1}%.": "乘以 100 把小数变成百分数：{0} × 100 = {1}%。",
  "The page shows the same answer: {0}.": "页面显示的答案相同：{0}。",
  "Subtract the mean from the observed value: {0} − {1} = {2}.": "用观测值减去平均值：{0} − {1} = {2}。",
  "Divide by the standard deviation: {0} ÷ {1} = {2}.": "再除以标准差：{0} ÷ {1} = {2}。",
  "This value equals the mean.": "该值等于平均值。",
  "This value is {0} standard deviations above the mean.": "该值比平均值高 {0} 个标准差。",
  "This value is {0} standard deviations below the mean.": "该值比平均值低 {0} 个标准差。",
  "Percent means per hundred, so divide by 100: {0} ÷ 100 = {1}.": "百分数表示每一百中的数量，所以除以 100：{0} ÷ 100 = {1}。",
  "This is the same as moving the decimal point two places to the left.": "这相当于把小数点向左移动两位。",
  "Multiply the decimal by 100: {0} × 100 = {1}.": "把小数乘以 100：{0} × 100 = {1}。",
  "This is the same as moving the decimal point two places to the right, then adding the percent sign.": "这相当于把小数点向右移动两位，再加上百分号。"
 },
 "fil": {
  "Show the steps": "Ipakita ang mga hakbang",
  "These steps are worked out by hand from your entries. They are shown only when they agree with the result above, and they are for learning, not a replacement for the calculator.": "Ang mga hakbang na ito ay kinukuwenta nang mano-mano mula sa iyong mga ipinasok. Lumalabas lamang ito kapag tugma sa resulta sa itaas, at para sa pag-aaral ito, hindi kapalit ng calculator.",
  "Factorial means multiplying every whole number from {0} down to 1.": "Ang factorial ay pagpaparami ng lahat ng buong bilang mula {0} pababa hanggang 1.",
  "Multiplying them gives {0}! = {1}.": "Ang resulta ng pagpaparami ay {0}! = {1}.",
  "Trailing zeros: count the factors of 5 up to {0} (5, 25, 125 and so on). That gives {1}.": "Mga zero sa dulo: bilangin ang mga salik na 5 hanggang {0} (5, 25, 125 at iba pa). Lumalabas na {1}.",
  "Divide {0} by 2 again and again, writing down each remainder (0 or 1), until the quotient is 0.": "Hatiin ang {0} sa 2 nang paulit-ulit, isulat ang bawat natira (0 o 1), hanggang maging 0 ang quotient.",
  "Read the remainders from the last one to the first: {0}.": "Basahin ang mga natira mula sa huli hanggang sa una: {0}.",
  "Group the bits in fours from the right and write each group as a hex digit: {0}.": "Pagsama-samahin ang mga bit nang tig-aapat mula sa kanan at isulat ang bawat grupo bilang hex digit: {0}.",
  "Find the greatest common factor with the Euclidean method: divide, keep the remainder, and repeat with the last two numbers.": "Hanapin ang pinakamalaking karaniwang salik gamit ang paraan ni Euclid: hatiin, itabi ang natira, at ulitin gamit ang huling dalawang bilang.",
  "The last non-zero remainder is {0}, so the greatest common factor is {0}.": "Ang huling natirang hindi zero ay {0}, kaya ang pinakamalaking karaniwang salik ay {0}.",
  "The least common multiple is {0} × {1} ÷ {2} = {3}.": "Ang pinakamaliit na karaniwang multiple ay {0} × {1} ÷ {2} = {3}.",
  "Permutations count ordered choices: multiply {0} numbers starting at {1} and counting down.": "Ang permutation ay bilang ng mga pagpiling may pagkakasunod-sunod: paramihin ang {0} bilang simula sa {1} at pababa.",
  "Divide by r! = {0} because the order does not matter in a combination.": "Hatiin sa r! = {0} dahil hindi mahalaga ang pagkakasunod-sunod sa combination.",
  "C({0}, {1}) = {2} ÷ {3} = {4}.": "C({0}, {1}) = {2} ÷ {3} = {4}.",
  "Move the decimal point {0} places to the right: {1} × {2} = {3}.": "Ilipat ang decimal point nang {0} puwesto pakanan: {1} × {2} = {3}.",
  "Round that to the nearest whole number (a fraction of exactly 0.5 rounds up): {0}.": "I-round sa pinakamalapit na buong bilang (ang bahaging eksaktong 0.5 ay ni-round pataas): {0}.",
  "Move the decimal point back: {0} ÷ {1} = {2}.": "Ibalik ang decimal point: {0} ÷ {1} = {2}.",
  "The first non-zero digit of {0} sits in the 10^{1} place, so the leading position is {1}.": "Ang unang digit na hindi zero ng {0} ay nasa 10^{1} na puwesto, kaya ang unang posisyon ay {1}.",
  "Keep {0} significant figures, so the last kept digit is in the 10^{1} place.": "Panatilihin ang {0} makabuluhang digit, kaya ang huling digit na itatago ay nasa 10^{1} na puwesto.",
  "Round to that place: {0}.": "I-round sa puwestong iyon: {0}.",
  "In scientific notation this is {0}.": "Sa scientific notation, ito ay {0}.",
  "The logarithm of x to base b equals ln(x) ÷ ln(b).": "Ang logarithm ng x sa base b ay katumbas ng ln(x) ÷ ln(b).",
  "ln({0}) = {1} and ln({2}) = {3}.": "ln({0}) = {1} at ln({2}) = {3}.",
  "{0} ÷ {1} = {2}.": "{0} ÷ {1} = {2}.",
  "Check: {0} raised to the power {1} gives back {2}.": "Pagsusuri: ang {0} na itinaas sa {1} ay nagbabalik ng {2}.",
  "Divide the numerator by the denominator: {0} ÷ {1} = {2}.": "Hatiin ang numerator sa denominator: {0} ÷ {1} = {2}.",
  "Multiply by 100 to turn the decimal into a percent: {0} × 100 = {1}%.": "Paramihin sa 100 para gawing porsyento ang decimal: {0} × 100 = {1}%.",
  "The page shows the same answer: {0}.": "Pareho ang sagot na ipinapakita ng pahina: {0}.",
  "Subtract the mean from the observed value: {0} − {1} = {2}.": "Ibawas ang mean sa naobserbahang halaga: {0} − {1} = {2}.",
  "Divide by the standard deviation: {0} ÷ {1} = {2}.": "Hatiin sa standard deviation: {0} ÷ {1} = {2}.",
  "This value equals the mean.": "Ang halagang ito ay katumbas ng mean.",
  "This value is {0} standard deviations above the mean.": "Ang halagang ito ay {0} standard deviation na mas mataas kaysa sa mean.",
  "This value is {0} standard deviations below the mean.": "Ang halagang ito ay {0} standard deviation na mas mababa kaysa sa mean.",
  "Percent means per hundred, so divide by 100: {0} ÷ 100 = {1}.": "Ang porsyento ay kada isang daan, kaya hatiin sa 100: {0} ÷ 100 = {1}.",
  "This is the same as moving the decimal point two places to the left.": "Pareho ito ng paglipat ng decimal point nang dalawang puwesto pakaliwa.",
  "Multiply the decimal by 100: {0} × 100 = {1}.": "Paramihin ang decimal sa 100: {0} × 100 = {1}.",
  "This is the same as moving the decimal point two places to the right, then adding the percent sign.": "Pareho ito ng paglipat ng decimal point nang dalawang puwesto pakanan, saka idagdag ang simbolo ng porsyento."
 }
};
  function curLang() { return (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || document.documentElement.lang || 'en'; }
  function t(tpl) {
    var a = Array.prototype.slice.call(arguments, 1), d = D[curLang()];
    return ((d && d[tpl]) || tpl).replace(/\{(\d+)\}/g, function (m, i) { return a[+i]; });
  }
  function locale() { return window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US'; }
  function fmt(x) {
    if (typeof x === 'bigint') return x.toLocaleString(locale());
    if (!isFinite(x)) return String(x);
    var r = parseFloat(x.toPrecision(12));
    if (r !== 0 && (Math.abs(r) < 1e-9 || Math.abs(r) >= 1e21)) return String(r);
    return r.toLocaleString(locale(), {maximumFractionDigits: 12});
  }
  function num(id) {
    var e = document.getElementById(id); if (!e) throw new Error('no ' + id);
    var v = window.DCHCalculator && window.DCHCalculator.numeric ? window.DCHCalculator.numeric(e.value) : parseFloat(e.value);
    if (!isFinite(v)) throw new Error('nan');
    return v;
  }
  function txt(id) { var e = document.getElementById(id); return e ? e.textContent.trim() : ''; }
  function seps() { var g = ',', d = '.'; try { Intl.NumberFormat(locale()).formatToParts(1234567.5).forEach(function (p) { if (p.type === 'group') g = p.value; if (p.type === 'decimal') d = p.value; }); } catch (e) {} return {g: g, d: d}; }
  function pn(s) {
    var sp = seps(), x = String(s).replace(/[\u2212]/g, '-');
    x = x.split(sp.g).join('').replace(/[\s\u00a0\u202f]/g, '');
    if (sp.d !== '.') x = x.split(sp.d).join('.');
    var m = x.match(/-?\d+(\.\d+)?(e[+-]?\d+)?/i); return m ? parseFloat(m[0]) : NaN;
  }
  function close(a, b, tol) { return isFinite(a) && isFinite(b) && Math.abs(a - b) <= (tol || 1e-9) * Math.max(1, Math.abs(a), Math.abs(b)); }
  function must(c) { if (!c) throw new Error('disagree'); }
  function plain(id) { return txt(id); }

  var P = {};
  P['factorial-calculator'] = function () {
    var n = num('nValue'); must(n >= 0 && n === Math.floor(n) && n <= 170);
    var p = 1, parts = [];
    for (var i = n; i >= 1; i--) { p *= i; }
    if (n <= 1) parts = ['1']; else if (n <= 6) { for (var j = n; j >= 1; j--) parts.push(j); } else parts = [n, n - 1, n - 2, '…', 2, 1];
    var z = 0, q = 5; while (q <= n) { z += Math.floor(n / q); q *= 5; }
    must(close(p, pn(plain('mainResult')) ) || Math.abs(p - pn(plain('mainResult'))) / p < 1e-9);
    must(z === pn(plain('zerosOut')));
    return [
      t('Factorial means multiplying every whole number from {0} down to 1.', fmt(n)),
      fmt(n) + '! = ' + parts.join(' × '),
      t('Multiplying them gives {0}! = {1}.', fmt(n), plain('mainResult')),
      t('Trailing zeros: count the factors of 5 up to {0} (5, 25, 125 and so on). That gives {1}.', fmt(n), fmt(z))
    ];
  };
  P['binary-calculator'] = function () {
    var raw = document.getElementById('decimalInteger').value.replace(/[,\s]/g, '');
    must(/^\d+$/.test(raw)); var n = BigInt(raw); must(n <= 9007199254740991n);
    var lines = [], x = n, k = 0;
    if (x === 0n) lines.push('0 ÷ 2 = 0 r 0');
    while (x > 0n) { if (k < 5) lines.push(x + ' ÷ 2 = ' + (x / 2n) + ' r ' + (x % 2n)); x = x / 2n; k++; }
    if (k > 5) lines.push('…');
    var bin = n.toString(2), hex = n.toString(16).toUpperCase();
    must(bin === plain('mainResult')); must(hex === plain('hexOut'));
    return [
      t('Divide {0} by 2 again and again, writing down each remainder (0 or 1), until the quotient is 0.', fmt(n)),
      lines.join('; '),
      t('Read the remainders from the last one to the first: {0}.', bin),
      t('Group the bits in fours from the right and write each group as a hex digit: {0}.', hex)
    ];
  };
  P['lcm-gcf-calculator'] = function () {
    var a = num('aValue'), b = num('bValue'); must(a >= 1 && b >= 1 && a === Math.floor(a) && b === Math.floor(b));
    var x = a, y = b, lines = [];
    while (y) { lines.push(fmt(x) + ' = ' + fmt(Math.floor(x / y)) + ' × ' + fmt(y) + ' + ' + fmt(x % y)); var r = x % y; x = y; y = r; }
    var g = x, l = a / g * b;
    must(g === pn(plain('mainResult'))); must(close(l, pn(plain('lcmOut'))));
    if (lines.length > 6) lines = lines.slice(0, 6).concat(['…']);
    return [
      t('Find the greatest common factor with the Euclidean method: divide, keep the remainder, and repeat with the last two numbers.'),
      lines.join('; '),
      t('The last non-zero remainder is {0}, so the greatest common factor is {0}.', fmt(g)),
      t('The least common multiple is {0} × {1} ÷ {2} = {3}.', fmt(a), fmt(b), fmt(g), fmt(l))
    ];
  };
  function bigFact(n) { var r = 1n; for (var i = 2n; i <= BigInt(n); i++) r *= i; return r; }
  P['permutation-combination-calculator'] = function () {
    var n = num('nValue'), r = num('rValue'); must(n >= 0 && r >= 0 && r <= n && n === Math.floor(n) && r === Math.floor(r) && n <= 170);
    var perm = bigFact(n) / bigFact(n - r), rf = bigFact(r), comb = perm / rf;
    var terms = []; for (var i = 0; i < r; i++) terms.push(n - i);
    var shown = terms.length > 5 ? terms.slice(0, 3).concat(['…', terms[terms.length - 1]]) : terms;
    must(close(Number(comb), pn(plain('mainResult')))); must(close(Number(perm), pn(plain('permutationOut'))));
    return [
      t('Permutations count ordered choices: multiply {0} numbers starting at {1} and counting down.', fmt(r), fmt(n)),
      'P(' + fmt(n) + ', ' + fmt(r) + ') = ' + (shown.length ? shown.join(' × ') : '1') + ' = ' + fmt(perm),
      t('Divide by r! = {0} because the order does not matter in a combination.', fmt(rf)),
      t('C({0}, {1}) = {2} ÷ {3} = {4}.', fmt(n), fmt(r), fmt(perm), fmt(rf), fmt(comb))
    ];
  };
  P['rounding-calculator'] = function () {
    var x = num('numberValue'), d = num('decimalPlaces'); must(d >= 0 && d === Math.floor(d) && d <= 12);
    var s = Math.pow(10, d), shifted = x * s, rounded = Math.round(shifted) / s;
    must(close(rounded, pn(plain('mainResult'))));
    return [
      t('Move the decimal point {0} places to the right: {1} × {2} = {3}.', fmt(d), fmt(x), fmt(s), fmt(shifted)),
      t('Round that to the nearest whole number (a fraction of exactly 0.5 rounds up): {0}.', fmt(Math.round(shifted))),
      t('Move the decimal point back: {0} ÷ {1} = {2}.', fmt(Math.round(shifted)), fmt(s), plain('mainResult'))
    ];
  };
  P['significant-figures-calculator'] = function () {
    var x = num('numberValue'), s = num('sigFigs'); must(x !== 0 && s >= 1 && s === Math.floor(s) && s <= 15);
    var m = Math.floor(Math.log10(Math.abs(x))), v = parseFloat(x.toPrecision(s));
    var mr2 = Math.floor(Math.log10(Math.abs(v))), pm = pn(plain('magnitudeOut'));
    must(close(v, parseFloat(plain('mainResult').replace(/\s/g, '').replace(',', '.')))); must(pm === m || pm === mr2);
    return [
      t('The first non-zero digit of {0} sits in the 10^{1} place, so the leading position is {1}.', fmt(x), fmt(m)),
      t('Keep {0} significant figures, so the last kept digit is in the 10^{1} place.', fmt(s), fmt(m - s + 1)),
      t('Round to that place: {0}.', plain('mainResult')),
      t('In scientific notation this is {0}.', plain('scientificOut'))
    ];
  };
  P['logarithm-calculator'] = function () {
    var x = num('numberValue'), b = num('baseValue'); must(x > 0 && b > 0 && b !== 1);
    var lx = Math.log(x), lb = Math.log(b), r = lx / lb;
    must(close(r, pn(plain('mainResult')))); must(close(lx, pn(plain('lnOut'))));
    return [
      t('The logarithm of x to base b equals ln(x) ÷ ln(b).'),
      t('ln({0}) = {1} and ln({2}) = {3}.', fmt(x), fmt(lx), fmt(b), fmt(lb)),
      t('{0} ÷ {1} = {2}.', fmt(lx), fmt(lb), plain('mainResult')),
      t('Check: {0} raised to the power {1} gives back {2}.', fmt(b), plain('mainResult'), plain('checkOut'))
    ];
  };
  P['fraction-to-percent-calculator'] = function () {
    var n = num('numerator'), d = num('denominator'); must(d !== 0);
    var dec = n / d, pct = dec * 100;
    must(close(pct, pn(plain('mainResult')), 1e-6)); must(close(dec, pn(plain('decimalOut')), 1e-6));
    return [
      t('Divide the numerator by the denominator: {0} ÷ {1} = {2}.', fmt(n), fmt(d), fmt(dec)),
      t('Multiply by 100 to turn the decimal into a percent: {0} × 100 = {1}%.', fmt(dec), fmt(pct)),
      t('The page shows the same answer: {0}.', plain('mainResult'))
    ];
  };
  P['z-score-calculator'] = function () {
    var v = num('value'), m = num('mean'), s = num('sd'); must(s > 0);
    var dev = v - m, z = dev / s;
    must(close(z, pn(plain('mainResult')))); must(close(dev, pn(plain('deviationOut'))));
    var pos = Math.abs(z) < 1e-12 ? t('This value equals the mean.') : t(z > 0 ? 'This value is {0} standard deviations above the mean.' : 'This value is {0} standard deviations below the mean.', fmt(Math.abs(z)));
    return [
      t('Subtract the mean from the observed value: {0} − {1} = {2}.', fmt(v), fmt(m), fmt(dev)),
      t('Divide by the standard deviation: {0} ÷ {1} = {2}.', fmt(dev), fmt(s), fmt(z)),
      pos
    ];
  };
  P['percent-to-decimal-calculator'] = function () {
    var p = num('percentValue'), d = p / 100;
    must(close(d, pn(plain('mainResult'))));
    return [
      t('Percent means per hundred, so divide by 100: {0} ÷ 100 = {1}.', fmt(p), fmt(d)),
      t('This is the same as moving the decimal point two places to the left.')
    ];
  };
  P['decimal-to-percent-calculator'] = function () {
    var d = num('decimalValue'), p = d * 100;
    must(close(p, pn(plain('mainResult'))));
    return [
      t('Multiply the decimal by 100: {0} × 100 = {1}.', fmt(d), fmt(p)),
      t('This is the same as moving the decimal point two places to the right, then adding the percent sign.')
    ];
  };

  var fn = P[slug]; if (!fn) return;
  function render() {
    while (box.firstChild) box.removeChild(box.firstChild);
    var steps;
    try { steps = fn(); } catch (e) {
      try { if (typeof window.calc === 'function') window.calc(); steps = fn(); } catch (e2) { box.hidden = true; return; }
    }
    box.hidden = false; box.className = 'dch-detail dch-costbd';
    var h = document.createElement('h3'); h.textContent = t('Show the steps'); box.appendChild(h);
    var ol = document.createElement('ol'); ol.style.paddingLeft = '1.3em'; ol.style.margin = '0 0 .6em'; ol.className = 'dch-steps';
    steps.forEach(function (s) { var li = document.createElement('li'); li.textContent = s; li.style.margin = '.4em 0'; li.style.overflowWrap = 'anywhere'; ol.appendChild(li); });
    box.appendChild(ol);
    var n = document.createElement('p'); n.className = 'dch-note'; n.textContent = t('These steps are worked out by hand from your entries. They are shown only when they agree with the result above, and they are for learning, not a replacement for the calculator.'); box.appendChild(n);
  }
  var q = false;
  function schedule(ms) { if (q) return; q = true; setTimeout(function () { q = false; render(); }, ms || 30); }
  document.querySelectorAll('.form-control').forEach(function (f) { f.addEventListener('input', function () { schedule(); }); f.addEventListener('change', function () { schedule(); }); });
  var cb = document.getElementById('calculateButton'); if (cb) cb.addEventListener('click', function () { schedule(60); });
  window.addEventListener('load', function () { setTimeout(render, 700); });
  setTimeout(render, 900);
})();
