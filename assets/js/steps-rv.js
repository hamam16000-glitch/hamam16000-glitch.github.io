/* Show the steps for the reviewed calculator pages: works the answer out by hand from the entries and shows it only when it agrees with the result the page displays after Calculate. */
(function () {
  'use strict';
  var form = document.getElementById('calculator-form'), rv = document.getElementById('result-value'), box = document.getElementById('detailBox');
  if (!form || !rv || !box) return;
  var slug = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  var D = {
 "es": {
  "Show the steps": "Mostrar los pasos",
  "These steps are worked out by hand from your entries. They are shown only when they agree with the result above, and they are for learning, not a replacement for the calculator.": "Estos pasos se calculan a mano a partir de tus datos. Solo se muestran cuando coinciden con el resultado de arriba y sirven para aprender, no sustituyen a la calculadora.",
  "Add the two x values and halve the sum: ({0} + {1}) / 2 = {2}.": "Suma los dos valores de x y divide la suma entre 2: ({0} + {1}) / 2 = {2}.",
  "Add the two y values and halve the sum: ({0} + {1}) / 2 = {2}.": "Suma los dos valores de y y divide la suma entre 2: ({0} + {1}) / 2 = {2}.",
  "The midpoint is ({0}, {1}).": "El punto medio es ({0}, {1}).",
  "Check the distance between the endpoints: the square root of ({0})² + ({1})² is {2}.": "Comprueba la distancia entre los extremos: la raíz cuadrada de ({0})² + ({1})² es {2}.",
  "Find the changes: Δx = {0} − {1} = {2} and Δy = {3} − {4} = {5}.": "Halla los cambios: Δx = {0} − {1} = {2} y Δy = {3} − {4} = {5}.",
  "Δx is 0, so the line is vertical. Its equation is x = {0} and its slope is undefined.": "Δx es 0, así que la recta es vertical. Su ecuación es x = {0} y su pendiente no está definida.",
  "Divide the change in y by the change in x: m = {0} / {1} = {2}.": "Divide el cambio en y entre el cambio en x: m = {0} / {1} = {2}.",
  "Find the y-intercept: b = y₁ − m × x₁ = {0} − {1} × {2} = {3}.": "Halla la ordenada al origen: b = y₁ − m × x₁ = {0} − {1} × {2} = {3}.",
  "Write the line: y = {0}.": "Escribe la recta: y = {0}.",
  "Divide a by b to get the quantity per one reference unit: {0} / {1} = {2}.": "Divide a entre b para obtener la cantidad por cada unidad de referencia: {0} / {1} = {2}.",
  "Multiply by c to scale it to the new reference amount: {0} × {1} = {2}.": "Multiplica por c para llevarlo a la nueva cantidad de referencia: {0} × {1} = {2}.",
  "So x = {0}, which makes {1} / {2} equal to x / {3}.": "Entonces x = {0}, con lo que {1} / {2} es igual a x / {3}.",
  "Multiply the length by the width: {0} × {1} = {2}.": "Multiplica el largo por el ancho: {0} × {1} = {2}.",
  "Multiply the base by the perpendicular height: {0} × {1} = {2}.": "Multiplica la base por la altura perpendicular: {0} × {1} = {2}.",
  "Halve the product: {0} / 2 = {1}.": "Divide el producto entre 2: {0} / 2 = {1}.",
  "Square the radius: {0}² = {1}.": "Eleva el radio al cuadrado: {0}² = {1}.",
  "Multiply by π: π × {0} = {1}.": "Multiplica por π: π × {0} = {1}.",
  "Add the two parallel sides: {0} + {1} = {2}.": "Suma los dos lados paralelos: {0} + {1} = {2}.",
  "Multiply the sum by the perpendicular height: {0} × {1} = {2}.": "Multiplica la suma por la altura perpendicular: {0} × {1} = {2}.",
  "The area is {0}.": "El área es {0}.",
  "The measurement is a diameter, so the radius is half of it: {0} / 2 = {1}.": "La medida es un diámetro, así que el radio es su mitad: {0} / 2 = {1}.",
  "The measurement is the radius: r = {0}.": "La medida es el radio: r = {0}.",
  "Circumference C = 2 × π × r = 2 × π × {0} = {1}.": "Circunferencia C = 2 × π × r = 2 × π × {0} = {1}.",
  "Area A = π × r² = π × {0}² = {1}. The diameter is 2 × r = {2}.": "Área A = π × r² = π × {0}² = {1}. El diámetro es 2 × r = {2}."
 },
 "zh-CN": {
  "Show the steps": "查看计算步骤",
  "These steps are worked out by hand from your entries. They are shown only when they agree with the result above, and they are for learning, not a replacement for the calculator.": "这些步骤根据您输入的数据手工推算而得，只有在与上方结果一致时才会显示，仅供学习参考，不能替代计算器。",
  "Add the two x values and halve the sum: ({0} + {1}) / 2 = {2}.": "把两个 x 值相加再除以 2：({0} + {1}) / 2 = {2}。",
  "Add the two y values and halve the sum: ({0} + {1}) / 2 = {2}.": "把两个 y 值相加再除以 2：({0} + {1}) / 2 = {2}。",
  "The midpoint is ({0}, {1}).": "中点是 ({0}, {1})。",
  "Check the distance between the endpoints: the square root of ({0})² + ({1})² is {2}.": "核对两端点之间的距离：({0})² + ({1})² 的平方根是 {2}。",
  "Find the changes: Δx = {0} − {1} = {2} and Δy = {3} − {4} = {5}.": "求变化量：Δx = {0} − {1} = {2}，Δy = {3} − {4} = {5}。",
  "Δx is 0, so the line is vertical. Its equation is x = {0} and its slope is undefined.": "Δx 为 0，所以直线是竖直的。它的方程是 x = {0}，斜率没有定义。",
  "Divide the change in y by the change in x: m = {0} / {1} = {2}.": "用 y 的变化量除以 x 的变化量：m = {0} / {1} = {2}。",
  "Find the y-intercept: b = y₁ − m × x₁ = {0} − {1} × {2} = {3}.": "求 y 轴截距：b = y₁ − m × x₁ = {0} − {1} × {2} = {3}。",
  "Write the line: y = {0}.": "写出直线方程：y = {0}。",
  "Divide a by b to get the quantity per one reference unit: {0} / {1} = {2}.": "用 a 除以 b，得到每个参考单位对应的量：{0} / {1} = {2}。",
  "Multiply by c to scale it to the new reference amount: {0} × {1} = {2}.": "乘以 c，换算到新的参考量：{0} × {1} = {2}。",
  "So x = {0}, which makes {1} / {2} equal to x / {3}.": "所以 x = {0}，这使 {1} / {2} 等于 x / {3}。",
  "Multiply the length by the width: {0} × {1} = {2}.": "长乘以宽：{0} × {1} = {2}。",
  "Multiply the base by the perpendicular height: {0} × {1} = {2}.": "底乘以垂直高：{0} × {1} = {2}。",
  "Halve the product: {0} / 2 = {1}.": "把乘积除以 2：{0} / 2 = {1}。",
  "Square the radius: {0}² = {1}.": "把半径平方：{0}² = {1}。",
  "Multiply by π: π × {0} = {1}.": "再乘以 π：π × {0} = {1}。",
  "Add the two parallel sides: {0} + {1} = {2}.": "把两条平行边相加：{0} + {1} = {2}。",
  "Multiply the sum by the perpendicular height: {0} × {1} = {2}.": "把和乘以垂直高：{0} × {1} = {2}。",
  "The area is {0}.": "面积是 {0}。",
  "The measurement is a diameter, so the radius is half of it: {0} / 2 = {1}.": "您输入的是直径，所以半径是它的一半：{0} / 2 = {1}。",
  "The measurement is the radius: r = {0}.": "您输入的是半径：r = {0}。",
  "Circumference C = 2 × π × r = 2 × π × {0} = {1}.": "周长 C = 2 × π × r = 2 × π × {0} = {1}。",
  "Area A = π × r² = π × {0}² = {1}. The diameter is 2 × r = {2}.": "面积 A = π × r² = π × {0}² = {1}。直径是 2 × r = {2}。"
 },
 "fil": {
  "Show the steps": "Ipakita ang mga hakbang",
  "These steps are worked out by hand from your entries. They are shown only when they agree with the result above, and they are for learning, not a replacement for the calculator.": "Ang mga hakbang na ito ay kinukuwenta nang mano-mano mula sa iyong mga ipinasok. Lumalabas lamang ito kapag tugma sa resulta sa itaas, at para sa pag-aaral ito, hindi kapalit ng calculator.",
  "Add the two x values and halve the sum: ({0} + {1}) / 2 = {2}.": "Pagsamahin ang dalawang halaga ng x at hatiin ang kabuuan sa 2: ({0} + {1}) / 2 = {2}.",
  "Add the two y values and halve the sum: ({0} + {1}) / 2 = {2}.": "Pagsamahin ang dalawang halaga ng y at hatiin ang kabuuan sa 2: ({0} + {1}) / 2 = {2}.",
  "The midpoint is ({0}, {1}).": "Ang midpoint ay ({0}, {1}).",
  "Check the distance between the endpoints: the square root of ({0})² + ({1})² is {2}.": "Suriin ang distansya ng mga dulo: ang square root ng ({0})² + ({1})² ay {2}.",
  "Find the changes: Δx = {0} − {1} = {2} and Δy = {3} − {4} = {5}.": "Hanapin ang mga pagbabago: Δx = {0} − {1} = {2} at Δy = {3} − {4} = {5}.",
  "Δx is 0, so the line is vertical. Its equation is x = {0} and its slope is undefined.": "Ang Δx ay 0, kaya patayo ang linya. Ang equation nito ay x = {0} at hindi tinutukoy ang slope nito.",
  "Divide the change in y by the change in x: m = {0} / {1} = {2}.": "Hatiin ang pagbabago sa y sa pagbabago sa x: m = {0} / {1} = {2}.",
  "Find the y-intercept: b = y₁ − m × x₁ = {0} − {1} × {2} = {3}.": "Hanapin ang y-intercept: b = y₁ − m × x₁ = {0} − {1} × {2} = {3}.",
  "Write the line: y = {0}.": "Isulat ang linya: y = {0}.",
  "Divide a by b to get the quantity per one reference unit: {0} / {1} = {2}.": "Hatiin ang a sa b para makuha ang dami bawat isang yunit ng sanggunian: {0} / {1} = {2}.",
  "Multiply by c to scale it to the new reference amount: {0} × {1} = {2}.": "I-multiply sa c para i-scale sa bagong batayang halaga: {0} × {1} = {2}.",
  "So x = {0}, which makes {1} / {2} equal to x / {3}.": "Kaya x = {0}, kaya ang {1} / {2} ay katumbas ng x / {3}.",
  "Multiply the length by the width: {0} × {1} = {2}.": "I-multiply ang haba sa lapad: {0} × {1} = {2}.",
  "Multiply the base by the perpendicular height: {0} × {1} = {2}.": "I-multiply ang base sa patayong taas: {0} × {1} = {2}.",
  "Halve the product: {0} / 2 = {1}.": "Hatiin sa 2 ang produkto: {0} / 2 = {1}.",
  "Square the radius: {0}² = {1}.": "I-square ang radius: {0}² = {1}.",
  "Multiply by π: π × {0} = {1}.": "I-multiply sa π: π × {0} = {1}.",
  "Add the two parallel sides: {0} + {1} = {2}.": "Pagsamahin ang dalawang magkaparehong gilid: {0} + {1} = {2}.",
  "Multiply the sum by the perpendicular height: {0} × {1} = {2}.": "I-multiply ang kabuuan sa patayong taas: {0} × {1} = {2}.",
  "The area is {0}.": "Ang lawak ay {0}.",
  "The measurement is a diameter, so the radius is half of it: {0} / 2 = {1}.": "Diameter ang sukat, kaya ang radius ay kalahati nito: {0} / 2 = {1}.",
  "The measurement is the radius: r = {0}.": "Radius ang sukat: r = {0}.",
  "Circumference C = 2 × π × r = 2 × π × {0} = {1}.": "Circumference C = 2 × π × r = 2 × π × {0} = {1}.",
  "Area A = π × r² = π × {0}² = {1}. The diameter is 2 × r = {2}.": "Lawak A = π × r² = π × {0}² = {1}. Ang diameter ay 2 × r = {2}."
 }
};
  function curLang() { return (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || document.documentElement.lang || 'en'; }
  function t(tpl) {
    var a = Array.prototype.slice.call(arguments, 1), d = D[curLang()];
    return ((d && d[tpl]) || tpl).replace(/\{(\d+)\}/g, function (m, i) { return a[+i]; });
  }
  var nf = {};
  function fe(x, p) {
    p = p === undefined ? 12 : p;
    if (x === 0) x = 0;
    if (!isFinite(x)) throw new Error('nan');
    if (x !== 0 && Math.abs(x) < 1e-7) return x.toExponential(8);
    nf[p] = nf[p] || new Intl.NumberFormat('en-US', {maximumFractionDigits: p});
    return nf[p].format(x);
  }
  function fp(x) { var s = fe(x); return x < 0 ? '(' + s + ')' : s; }
  function val(name) {
    var e = form.elements[name]; if (!e || e.disabled) throw new Error('no ' + name);
    var s = String(e.value).trim();
    if (!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?$/i.test(s)) throw new Error('nan');
    return Number(s);
  }
  function lead(s) { var m = String(s).replace(/,/g, '').match(/^\s*(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i); return m ? parseFloat(m[1]) : NaN; }
  function strongs() { return Array.prototype.slice.call(document.querySelectorAll('#result-breakdown li strong')).map(function (e) { return e.textContent.trim(); }); }
  function close(a, b) { return isFinite(a) && isFinite(b) && Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)); }
  function must(c) { if (!c) throw new Error('disagree'); }
  var rtxt = function () { return rv.textContent.trim(); };
  var P = {};
  P['midpoint-calculator'] = function () {
    var x1 = val('x1'), y1 = val('y1'), x2 = val('x2'), y2 = val('y2');
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy);
    var m = rtxt().match(/^\((.+), (.+)\)$/); must(m);
    must(close(lead(m[1]), mx)); must(close(lead(m[2]), my)); must(close(lead(strongs()[0]), d));
    return [
      t('Add the two x values and halve the sum: ({0} + {1}) / 2 = {2}.', fe(x1), fp(x2), fe(mx)),
      t('Add the two y values and halve the sum: ({0} + {1}) / 2 = {2}.', fe(y1), fp(y2), fe(my)),
      t('The midpoint is ({0}, {1}).', fe(mx), fe(my)),
      t('Check the distance between the endpoints: the square root of ({0})² + ({1})² is {2}.', fe(dx), fe(dy), fe(d))
    ];
  };
  P['slope-calculator'] = function () {
    var x1 = val('x1'), y1 = val('y1'), x2 = val('x2'), y2 = val('y2'), dx = x2 - x1, dy = y2 - y1;
    must(!(dx === 0 && dy === 0));
    var s = strongs(), first = t('Find the changes: Δx = {0} − {1} = {2} and Δy = {3} − {4} = {5}.', fe(x2), fp(x1), fe(dx), fe(y2), fp(y1), fe(dy));
    if (dx === 0) {
      must(s.length >= 3 && /^x = /.test(s[2]));
      return [first, t('Δx is 0, so the line is vertical. Its equation is x = {0} and its slope is undefined.', fe(x1))];
    }
    var m = dy / dx, b = y1 - m * x1;
    must(close(lead(rtxt()), m)); must(close(lead(s[0]), dx)); must(close(lead(s[1]), dy));
    var eq = fe(m) + 'x ' + (b < 0 ? '− ' : '+ ') + fe(Math.abs(b));
    must(s[2] === 'y = ' + eq);
    return [first,
      t('Divide the change in y by the change in x: m = {0} / {1} = {2}.', fe(dy), fp(dx), fe(m)),
      t('Find the y-intercept: b = y₁ − m × x₁ = {0} − {1} × {2} = {3}.', fe(y1), fp(m), fp(x1), fe(b)),
      t('Write the line: y = {0}.', eq)];
  };
  P['proportion-calculator'] = function () {
    var a = val('a'), b = val('b'), c = val('c'); must(b > 0 && c > 0);
    var r = a / b, x = r * c; must(close(lead(rtxt()), x));
    return [
      t('Divide a by b to get the quantity per one reference unit: {0} / {1} = {2}.', fe(a), fe(b), fe(r)),
      t('Multiply by c to scale it to the new reference amount: {0} × {1} = {2}.', fe(r), fe(c), fe(x)),
      t('So x = {0}, which makes {1} / {2} equal to x / {3}.', fe(x), fe(a), fe(b), fe(c))];
  };
  P['area-calculator'] = function () {
    var sh = form.elements.shape.value, a = val('a'), A, steps;
    if (sh === 'rectangle') { var b = val('b'); A = a * b; steps = [t('Multiply the length by the width: {0} × {1} = {2}.', fe(a), fe(b), fe(A))]; }
    else if (sh === 'triangle') { var b2 = val('b'), p = a * b2; A = p / 2; steps = [t('Multiply the base by the perpendicular height: {0} × {1} = {2}.', fe(a), fe(b2), fe(p)), t('Halve the product: {0} / 2 = {1}.', fe(p), fe(A))]; }
    else if (sh === 'circle') { var q = a * a; A = Math.PI * q; steps = [t('Square the radius: {0}² = {1}.', fe(a), fe(q)), t('Multiply by π: π × {0} = {1}.', fe(q), fe(A))]; }
    else if (sh === 'trapezoid') { var b3 = val('b'), h = val('h'), s = a + b3, sh2 = s * h; A = sh2 / 2; steps = [t('Add the two parallel sides: {0} + {1} = {2}.', fe(a), fe(b3), fe(s)), t('Multiply the sum by the perpendicular height: {0} × {1} = {2}.', fe(s), fe(h), fe(sh2)), t('Halve the product: {0} / 2 = {1}.', fe(sh2), fe(A))]; }
    else must(false);
    must(close(lead(rtxt()), A));
    steps.push(t('The area is {0}.', rtxt()));
    return steps;
  };
  P['circumference-calculator'] = function () {
    var mode = form.elements.mode.value, x = val('size'), r, steps = [];
    if (mode === 'diameter') { r = x / 2; steps.push(t('The measurement is a diameter, so the radius is half of it: {0} / 2 = {1}.', fe(x), fe(r))); }
    else if (mode === 'radius') { r = x; steps.push(t('The measurement is the radius: r = {0}.', fe(r))); }
    else must(false);
    var C = 2 * Math.PI * r, A = Math.PI * r * r, s = strongs();
    must(close(lead(rtxt()), C)); must(close(lead(s[2]), A));
    steps.push(t('Circumference C = 2 × π × r = 2 × π × {0} = {1}.', fe(r), fe(C)));
    steps.push(t('Area A = π × r² = π × {0}² = {1}. The diameter is 2 × r = {2}.', fe(r), fe(A), fe(2 * r)));
    return steps;
  };
  var fn = P[slug]; if (!fn) return;
  var busy = false, mo = null;
  function render() {
    if (busy) return; busy = true;
    while (box.firstChild) box.removeChild(box.firstChild);
    var steps;
    try { steps = fn(); } catch (e) { box.hidden = true; if (mo) mo.takeRecords(); busy = false; return; }
    box.hidden = false; box.className = 'dch-detail dch-costbd';
    var h = document.createElement('h3'); h.textContent = t('Show the steps'); box.appendChild(h);
    var ol = document.createElement('ol'); ol.style.paddingLeft = '1.3em'; ol.style.margin = '0 0 .6em'; ol.className = 'dch-steps';
    steps.forEach(function (s) { var li = document.createElement('li'); li.textContent = s; li.style.margin = '.4em 0'; li.style.overflowWrap = 'anywhere'; ol.appendChild(li); });
    box.appendChild(ol);
    var n = document.createElement('p'); n.className = 'dch-note'; n.textContent = t('These steps are worked out by hand from your entries. They are shown only when they agree with the result above, and they are for learning, not a replacement for the calculator.'); box.appendChild(n);
    if (mo) mo.takeRecords(); busy = false;
  }
  var timer = 0;
  function schedule(ms) { if (timer) clearTimeout(timer); timer = setTimeout(function () { timer = 0; render(); }, ms || 80); }
  /* The page writes the result after Calculate, and clears it when an entry changes: follow the result text itself. */
  if (window.MutationObserver) { mo = new MutationObserver(function () { if (!busy) schedule(120); }); mo.observe(document.getElementById('result-breakdown').parentNode, {childList: true, subtree: true, characterData: true}); }
  ['input', 'change', 'click'].forEach(function (ev) { form.addEventListener(ev, function () { schedule(150); }); });
  window.addEventListener('load', function () { schedule(700); });
  schedule(900);
})();
