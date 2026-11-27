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
  "Area A = π × r² = π × {0}² = {1}. The diameter is 2 × r = {2}.": "Área A = π × r² = π × {0}² = {1}. El diámetro es 2 × r = {2}.",
  "Find the mean: the {0} values add up to {1}, and {1} / {0} = {2}.": "Halla la media: los {0} valores suman {1}, y {1} / {0} = {2}.",
  "Add up the squared deviations Σ(x − mean)² = {0}.": "Suma las desviaciones al cuadrado: Σ(x − media)² = {0}.",
  "Sample: divide by n − 1 = {0} to get the variance: {1} / {0} = {2}.": "Muestra: divide entre n − 1 = {0} para obtener la varianza: {1} / {0} = {2}.",
  "Population: divide by n = {0} to get the variance: {1} / {0} = {2}.": "Población: divide entre n = {0} para obtener la varianza: {1} / {0} = {2}.",
  "Take the square root of the variance: √{0} = {1}.": "Toma la raíz cuadrada de la varianza: √{0} = {1}.",
  "Add the {0} values: the sum is {1}.": "Suma los {0} valores: la suma es {1}.",
  "Divide the sum by the number of values: {0} / {1} = {2}.": "Divide la suma entre la cantidad de valores: {0} / {1} = {2}.",
  "Sort the values and take the middle one (or the average of the two middle ones): the median is {0}.": "Ordena los valores y toma el del medio (o el promedio de los dos del medio): la mediana es {0}.",
  "The value or values that repeat most often ({0} times each): {1}.": "El valor o valores que más se repiten ({0} veces cada uno): {1}.",
  "No value repeats, so there is no repeated-value mode.": "Ningún valor se repite, así que no hay moda de valores repetidos.",
  "Range = maximum − minimum = {0} − {1} = {2}.": "Rango = máximo − mínimo = {0} − {1} = {2}.",
  "a, b and c are all 0, so the equation 0 = 0 is true for every x.": "a, b y c son todos 0, así que la ecuación 0 = 0 se cumple para cualquier x.",
  "a and b are 0 but c is not, so the equation c = 0 can never be true: there is no solution.": "a y b son 0 pero c no, así que la ecuación c = 0 nunca se cumple: no hay solución.",
  "a is 0, so the equation is linear: bx + c = 0.": "a es 0, así que la ecuación es lineal: bx + c = 0.",
  "Solve it: x = −c / b = −{0} / {1} = {2}.": "Resuélvela: x = −c / b = −{0} / {1} = {2}.",
  "Find the discriminant: D = b² − 4ac = {0}² − 4 × {1} × {2} = {3}.": "Halla el discriminante: D = b² − 4ac = {0}² − 4 × {1} × {2} = {3}.",
  "D is negative, so the roots are a complex pair.": "D es negativo, así que las raíces son un par complejo.",
  "Real part: −b / (2a) = {0}. Imaginary part: √(−D) / (2|a|) = {1}. The roots are {0} ± {1}i.": "Parte real: −b / (2a) = {0}. Parte imaginaria: √(−D) / (2|a|) = {1}. Las raíces son {0} ± {1}i.",
  "D is zero, so there is one repeated real root.": "D es cero, así que hay una raíz real repetida.",
  "x = −b / (2a) = {0} / {1} = {2}.": "x = −b / (2a) = {0} / {1} = {2}.",
  "D is positive, so there are two real roots.": "D es positivo, así que hay dos raíces reales.",
  "The square root of D is {0}, so x = (−b ± √D) / (2a) gives {1} and {2}.": "La raíz cuadrada de D es {0}, así que x = (−b ± √D) / (2a) da {1} y {2}.",
  "Add: {0}/{1} + {2}/{3} = ({0} × {3} + {2} × {1}) / ({1} × {3}) = {4}/{5}.": "Suma: {0}/{1} + {2}/{3} = ({0} × {3} + {2} × {1}) / ({1} × {3}) = {4}/{5}.",
  "Subtract: {0}/{1} − {2}/{3} = ({0} × {3} − {2} × {1}) / ({1} × {3}) = {4}/{5}.": "Resta: {0}/{1} − {2}/{3} = ({0} × {3} − {2} × {1}) / ({1} × {3}) = {4}/{5}.",
  "Multiply the numerators and the denominators: ({0} × {2}) / ({1} × {3}) = {4}/{5}.": "Multiplica los numeradores y los denominadores: ({0} × {2}) / ({1} × {3}) = {4}/{5}.",
  "Divide by multiplying by the reciprocal: ({0} × {3}) / ({1} × {2}) = {4}/{5}.": "Divide multiplicando por el recíproco: ({0} × {3}) / ({1} × {2}) = {4}/{5}.",
  "The greatest common factor is 1, so {0}/{1} is already reduced.": "El máximo común divisor es 1, así que {0}/{1} ya está reducida.",
  "Divide the top and bottom by their greatest common factor {0}: {1}/{2} = {3}/{4}.": "Divide el numerador y el denominador entre su máximo común divisor {0}: {1}/{2} = {3}/{4}.",
  "As a mixed number this is {0}.": "Como número mixto es {0}.",
  "Turn the percentages into probabilities: p = {0} / 100 = {1} and q = {2} / 100 = {3}.": "Convierte los porcentajes en probabilidades: p = {0} / 100 = {1} y q = {2} / 100 = {3}.",
  "Both events: p × q = {0} × {1} = {2}, which is {3}%.": "Ambos sucesos: p × q = {0} × {1} = {2}, es decir, {3} %.",
  "At least one: p + q − pq = {0} + {1} − {2} = {3}, which is {4}%.": "Al menos uno: p + q − pq = {0} + {1} − {2} = {3}, es decir, {4} %.",
  "Neither: (1 − p)(1 − q) = {0} × {1} = {2}, which is {3}%.": "Ninguno: (1 − p)(1 − q) = {0} × {1} = {2}, es decir, {3} %.",
  "Exactly one: p(1 − q) + q(1 − p) = {0} × {1} + {2} × {3} = {4}, which is {5}%.": "Exactamente uno: p(1 − q) + q(1 − p) = {0} × {1} + {2} × {3} = {4}, es decir, {5} %."
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
  "Area A = π × r² = π × {0}² = {1}. The diameter is 2 × r = {2}.": "面积 A = π × r² = π × {0}² = {1}。直径是 2 × r = {2}。",
  "Find the mean: the {0} values add up to {1}, and {1} / {0} = {2}.": "求平均值：这 {0} 个数值之和为 {1}，{1} / {0} = {2}。",
  "Add up the squared deviations Σ(x − mean)² = {0}.": "把偏差的平方相加：Σ(x − 平均值)² = {0}。",
  "Sample: divide by n − 1 = {0} to get the variance: {1} / {0} = {2}.": "样本：除以 n − 1 = {0} 得到方差：{1} / {0} = {2}。",
  "Population: divide by n = {0} to get the variance: {1} / {0} = {2}.": "总体：除以 n = {0} 得到方差：{1} / {0} = {2}。",
  "Take the square root of the variance: √{0} = {1}.": "对方差开平方：√{0} = {1}。",
  "Add the {0} values: the sum is {1}.": "把 {0} 个数值相加：总和是 {1}。",
  "Divide the sum by the number of values: {0} / {1} = {2}.": "用总和除以数值个数：{0} / {1} = {2}。",
  "Sort the values and take the middle one (or the average of the two middle ones): the median is {0}.": "把数值排序，取正中间的一个（或中间两个的平均数）：中位数是 {0}。",
  "The value or values that repeat most often ({0} times each): {1}.": "出现次数最多的数值（各出现 {0} 次）：{1}。",
  "No value repeats, so there is no repeated-value mode.": "没有数值重复出现，因此没有重复值的众数。",
  "Range = maximum − minimum = {0} − {1} = {2}.": "极差 = 最大值 − 最小值 = {0} − {1} = {2}。",
  "a, b and c are all 0, so the equation 0 = 0 is true for every x.": "a、b、c 都是 0，所以方程 0 = 0 对任何 x 都成立。",
  "a and b are 0 but c is not, so the equation c = 0 can never be true: there is no solution.": "a 和 b 为 0 而 c 不为 0，所以方程 c = 0 永远不成立：无解。",
  "a is 0, so the equation is linear: bx + c = 0.": "a 为 0，所以方程是线性的：bx + c = 0。",
  "Solve it: x = −c / b = −{0} / {1} = {2}.": "求解：x = −c / b = −{0} / {1} = {2}。",
  "Find the discriminant: D = b² − 4ac = {0}² − 4 × {1} × {2} = {3}.": "求判别式：D = b² − 4ac = {0}² − 4 × {1} × {2} = {3}。",
  "D is negative, so the roots are a complex pair.": "D 为负数，所以两个根是一对复数。",
  "Real part: −b / (2a) = {0}. Imaginary part: √(−D) / (2|a|) = {1}. The roots are {0} ± {1}i.": "实部：−b / (2a) = {0}。虚部：√(−D) / (2|a|) = {1}。两个根是 {0} ± {1}i。",
  "D is zero, so there is one repeated real root.": "D 为零，所以有一个重实根。",
  "x = −b / (2a) = {0} / {1} = {2}.": "x = −b / (2a) = {0} / {1} = {2}。",
  "D is positive, so there are two real roots.": "D 为正数，所以有两个实根。",
  "The square root of D is {0}, so x = (−b ± √D) / (2a) gives {1} and {2}.": "D 的平方根是 {0}，所以 x = (−b ± √D) / (2a) 得到 {1} 和 {2}。",
  "Add: {0}/{1} + {2}/{3} = ({0} × {3} + {2} × {1}) / ({1} × {3}) = {4}/{5}.": "相加：{0}/{1} + {2}/{3} = ({0} × {3} + {2} × {1}) / ({1} × {3}) = {4}/{5}。",
  "Subtract: {0}/{1} − {2}/{3} = ({0} × {3} − {2} × {1}) / ({1} × {3}) = {4}/{5}.": "相减：{0}/{1} − {2}/{3} = ({0} × {3} − {2} × {1}) / ({1} × {3}) = {4}/{5}。",
  "Multiply the numerators and the denominators: ({0} × {2}) / ({1} × {3}) = {4}/{5}.": "分子相乘，分母相乘：({0} × {2}) / ({1} × {3}) = {4}/{5}。",
  "Divide by multiplying by the reciprocal: ({0} × {3}) / ({1} × {2}) = {4}/{5}.": "除以一个分数，等于乘以它的倒数：({0} × {3}) / ({1} × {2}) = {4}/{5}。",
  "The greatest common factor is 1, so {0}/{1} is already reduced.": "最大公因数是 1，所以 {0}/{1} 已经是最简分数。",
  "Divide the top and bottom by their greatest common factor {0}: {1}/{2} = {3}/{4}.": "分子和分母同时除以它们的最大公因数 {0}：{1}/{2} = {3}/{4}。",
  "As a mixed number this is {0}.": "写成带分数是 {0}。",
  "Turn the percentages into probabilities: p = {0} / 100 = {1} and q = {2} / 100 = {3}.": "把百分数转换为概率：p = {0} / 100 = {1}，q = {2} / 100 = {3}。",
  "Both events: p × q = {0} × {1} = {2}, which is {3}%.": "两个事件同时发生：p × q = {0} × {1} = {2}，即 {3}%。",
  "At least one: p + q − pq = {0} + {1} − {2} = {3}, which is {4}%.": "至少一个发生：p + q − pq = {0} + {1} − {2} = {3}，即 {4}%。",
  "Neither: (1 − p)(1 − q) = {0} × {1} = {2}, which is {3}%.": "两个都不发生：(1 − p)(1 − q) = {0} × {1} = {2}，即 {3}%。",
  "Exactly one: p(1 − q) + q(1 − p) = {0} × {1} + {2} × {3} = {4}, which is {5}%.": "恰好一个发生：p(1 − q) + q(1 − p) = {0} × {1} + {2} × {3} = {4}，即 {5}%。"
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
  "Area A = π × r² = π × {0}² = {1}. The diameter is 2 × r = {2}.": "Lawak A = π × r² = π × {0}² = {1}. Ang diameter ay 2 × r = {2}.",
  "Find the mean: the {0} values add up to {1}, and {1} / {0} = {2}.": "Hanapin ang mean: ang {0} halaga ay may kabuuang {1}, at {1} / {0} = {2}.",
  "Add up the squared deviations Σ(x − mean)² = {0}.": "Idagdag ang mga squared deviation: Σ(x − mean)² = {0}.",
  "Sample: divide by n − 1 = {0} to get the variance: {1} / {0} = {2}.": "Sample: hatiin sa n − 1 = {0} para makuha ang variance: {1} / {0} = {2}.",
  "Population: divide by n = {0} to get the variance: {1} / {0} = {2}.": "Populasyon: hatiin sa n = {0} para makuha ang variance: {1} / {0} = {2}.",
  "Take the square root of the variance: √{0} = {1}.": "Kunin ang square root ng variance: √{0} = {1}.",
  "Add the {0} values: the sum is {1}.": "Idagdag ang {0} halaga: ang kabuuan ay {1}.",
  "Divide the sum by the number of values: {0} / {1} = {2}.": "Hatiin ang kabuuan sa bilang ng mga halaga: {0} / {1} = {2}.",
  "Sort the values and take the middle one (or the average of the two middle ones): the median is {0}.": "Pagsunud-sunurin ang mga halaga at kunin ang nasa gitna (o ang average ng dalawang nasa gitna): ang median ay {0}.",
  "The value or values that repeat most often ({0} times each): {1}.": "Ang halaga o mga halagang pinakamadalas umulit ({0} beses bawat isa): {1}.",
  "No value repeats, so there is no repeated-value mode.": "Walang halagang umuulit, kaya walang mode ng paulit-ulit na halaga.",
  "Range = maximum − minimum = {0} − {1} = {2}.": "Range = maximum − minimum = {0} − {1} = {2}.",
  "a, b and c are all 0, so the equation 0 = 0 is true for every x.": "Parehong 0 ang a, b at c, kaya ang equation na 0 = 0 ay totoo para sa bawat x.",
  "a and b are 0 but c is not, so the equation c = 0 can never be true: there is no solution.": "0 ang a at b pero hindi ang c, kaya hindi kailanman magiging totoo ang equation na c = 0: walang solusyon.",
  "a is 0, so the equation is linear: bx + c = 0.": "0 ang a, kaya linear ang equation: bx + c = 0.",
  "Solve it: x = −c / b = −{0} / {1} = {2}.": "Lutasin ito: x = −c / b = −{0} / {1} = {2}.",
  "Find the discriminant: D = b² − 4ac = {0}² − 4 × {1} × {2} = {3}.": "Hanapin ang discriminant: D = b² − 4ac = {0}² − 4 × {1} × {2} = {3}.",
  "D is negative, so the roots are a complex pair.": "Negatibo ang D, kaya ang mga ugat ay isang pares na complex.",
  "Real part: −b / (2a) = {0}. Imaginary part: √(−D) / (2|a|) = {1}. The roots are {0} ± {1}i.": "Real part: −b / (2a) = {0}. Imaginary part: √(−D) / (2|a|) = {1}. Ang mga ugat ay {0} ± {1}i.",
  "D is zero, so there is one repeated real root.": "Zero ang D, kaya may isang paulit-ulit na tunay na ugat.",
  "x = −b / (2a) = {0} / {1} = {2}.": "x = −b / (2a) = {0} / {1} = {2}.",
  "D is positive, so there are two real roots.": "Positibo ang D, kaya may dalawang tunay na ugat.",
  "The square root of D is {0}, so x = (−b ± √D) / (2a) gives {1} and {2}.": "Ang square root ng D ay {0}, kaya ang x = (−b ± √D) / (2a) ay nagbibigay ng {1} at {2}.",
  "Add: {0}/{1} + {2}/{3} = ({0} × {3} + {2} × {1}) / ({1} × {3}) = {4}/{5}.": "Pagdaragdag: {0}/{1} + {2}/{3} = ({0} × {3} + {2} × {1}) / ({1} × {3}) = {4}/{5}.",
  "Subtract: {0}/{1} − {2}/{3} = ({0} × {3} − {2} × {1}) / ({1} × {3}) = {4}/{5}.": "Pagbabawas: {0}/{1} − {2}/{3} = ({0} × {3} − {2} × {1}) / ({1} × {3}) = {4}/{5}.",
  "Multiply the numerators and the denominators: ({0} × {2}) / ({1} × {3}) = {4}/{5}.": "I-multiply ang mga numerator at ang mga denominator: ({0} × {2}) / ({1} × {3}) = {4}/{5}.",
  "Divide by multiplying by the reciprocal: ({0} × {3}) / ({1} × {2}) = {4}/{5}.": "Hatiin sa pamamagitan ng pagpaparami sa reciprocal: ({0} × {3}) / ({1} × {2}) = {4}/{5}.",
  "The greatest common factor is 1, so {0}/{1} is already reduced.": "Ang greatest common factor ay 1, kaya reduced na ang {0}/{1}.",
  "Divide the top and bottom by their greatest common factor {0}: {1}/{2} = {3}/{4}.": "Hatiin ang itaas at ibaba sa kanilang greatest common factor na {0}: {1}/{2} = {3}/{4}.",
  "As a mixed number this is {0}.": "Bilang mixed number, ito ay {0}.",
  "Turn the percentages into probabilities: p = {0} / 100 = {1} and q = {2} / 100 = {3}.": "I-convert ang mga porsyento sa probabilidad: p = {0} / 100 = {1} at q = {2} / 100 = {3}.",
  "Both events: p × q = {0} × {1} = {2}, which is {3}%.": "Pareho ng pangyayari: p × q = {0} × {1} = {2}, ibig sabihin {3}%.",
  "At least one: p + q − pq = {0} + {1} − {2} = {3}, which is {4}%.": "Kahit isa: p + q − pq = {0} + {1} − {2} = {3}, ibig sabihin {4}%.",
  "Neither: (1 − p)(1 − q) = {0} × {1} = {2}, which is {3}%.": "Wala: (1 − p)(1 − q) = {0} × {1} = {2}, ibig sabihin {3}%.",
  "Exactly one: p(1 − q) + q(1 − p) = {0} × {1} + {2} × {3} = {4}, which is {5}%.": "Eksaktong isa: p(1 − q) + q(1 − p) = {0} × {1} + {2} × {3} = {4}, ibig sabihin {5}%."
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
  function plist(name) {
    var e = form.elements[name]; if (!e) throw new Error('no ' + name);
    var parts = String(e.value).split(/[\s,;]+/).filter(function (x) { return x !== ''; });
    must(parts.length >= 1 && parts.length <= 1000);
    return parts.map(function (s) { must(/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?$/i.test(s)); var v = Number(s); must(Math.abs(v) <= 1e12); return v; });
  }
  function nums(s) { return (String(s).match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi) || []).map(parseFloat); }
  P['standard-deviation'] = function () {
    var xs = plist('values'), n = xs.length, mode = form.elements.mode.value, sum = 0, i;
    must(mode === 'sample' || mode === 'population'); must(mode === 'population' || n >= 2);
    for (i = 0; i < n; i++) sum += xs[i];
    var mean = sum / n, ss = 0;
    for (i = 0; i < n; i++) ss += (xs[i] - mean) * (xs[i] - mean);
    var den = mode === 'sample' ? n - 1 : n, v = ss / den, sd = Math.sqrt(v), s = strongs();
    must(close(lead(rtxt()), sd)); must(close(lead(s[0]), v)); must(close(lead(s[1]), mean)); must(close(lead(s[4]), ss));
    return [
      t('Find the mean: the {0} values add up to {1}, and {1} / {0} = {2}.', n, fe(sum), fe(mean)),
      t('Add up the squared deviations Σ(x − mean)² = {0}.', fe(ss)),
      mode === 'sample' ? t('Sample: divide by n − 1 = {0} to get the variance: {1} / {0} = {2}.', den, fe(ss), fe(v)) : t('Population: divide by n = {0} to get the variance: {1} / {0} = {2}.', den, fe(ss), fe(v)),
      t('Take the square root of the variance: √{0} = {1}.', fe(v), fe(sd))];
  };
  P['mean-median-mode'] = function () {
    var xs = plist('values'), n = xs.length, i, sum = 0;
    for (i = 0; i < n; i++) sum += xs[i];
    var sorted = xs.slice().sort(function (a, b) { return a - b; }), mid = Math.floor(n / 2), med = n % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2, mean = sum / n;
    var cnt = {}, maxf = 0; xs.forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; if (cnt[x] > maxf) maxf = cnt[x]; });
    var modes = maxf > 1 ? Object.keys(cnt).filter(function (k) { return cnt[k] === maxf; }).map(Number).sort(function (a, b) { return a - b; }) : [];
    var mn = sorted[0], mx = sorted[n - 1], s = strongs();
    must(close(lead(rtxt()), mean)); must(close(lead(s[0]), med)); must(close(lead(s[3]), sum)); must(close(lead(s[6]), mx - mn));
    if (modes.length) must(close(lead(s[1]), modes[0])); else must(isNaN(lead(s[1])));
    var out = [
      t('Add the {0} values: the sum is {1}.', n, fe(sum)),
      t('Divide the sum by the number of values: {0} / {1} = {2}.', fe(sum), n, fe(mean)),
      t('Sort the values and take the middle one (or the average of the two middle ones): the median is {0}.', fe(med))];
    out.push(modes.length ? t('The value or values that repeat most often ({0} times each): {1}.', maxf, modes.map(function (x) { return fe(x); }).join(', ')) : t('No value repeats, so there is no repeated-value mode.'));
    out.push(t('Range = maximum − minimum = {0} − {1} = {2}.', fe(mx), fp(mn), fe(mx - mn)));
    return out;
  };
  P['quadratic-formula-calculator'] = function () {
    var a = val('a'), b = val('b'), c = val('c'), s = strongs(), r = nums(rtxt());
    if (a === 0) {
      if (b === 0) { must(!/\d/.test(rtxt())); return c === 0 ? [t('a, b and c are all 0, so the equation 0 = 0 is true for every x.')] : [t('a and b are 0 but c is not, so the equation c = 0 can never be true: there is no solution.')]; }
      var x = -c / b; must(r.length === 1 && close(r[0], x));
      return [t('a is 0, so the equation is linear: bx + c = 0.'), t('Solve it: x = −c / b = −{0} / {1} = {2}.', fp(c), fp(b), fe(x))];
    }
    var D = b * b - 4 * a * c; must(s.length >= 2 && close(lead(s[1]), D));
    var d1 = t('Find the discriminant: D = b² − 4ac = {0}² − 4 × {1} × {2} = {3}.', fp(b), fp(a), fp(c), fe(D));
    if (D < 0) {
      var re = -b / (2 * a), im = Math.sqrt(-D) / (2 * Math.abs(a));
      must(r.length === 2 && close(r[0], re) && close(r[1], im));
      return [d1, t('D is negative, so the roots are a complex pair.'), t('Real part: −b / (2a) = {0}. Imaginary part: √(−D) / (2|a|) = {1}. The roots are {0} ± {1}i.', fe(re), fe(im))];
    }
    if (D === 0) { var x0 = -b / (2 * a); must(r.length === 1 && close(r[0], x0)); return [d1, t('D is zero, so there is one repeated real root.'), t('x = −b / (2a) = {0} / {1} = {2}.', fe(-b), fe(2 * a), fe(x0))]; }
    var sq = Math.sqrt(D), q = -0.5 * (b + (b >= 0 ? 1 : -1) * sq), r1 = q / a, r2 = c / q, lo = Math.min(r1, r2), hi = Math.max(r1, r2);
    must(r.length === 2 && close(r[0], lo) && close(r[1], hi));
    return [d1, t('D is positive, so there are two real roots.'), t('The square root of D is {0}, so x = (−b ± √D) / (2a) gives {1} and {2}.', fe(sq), fe(lo), fe(hi))];
  };
  function bi(name) { var e = form.elements[name]; if (!e) throw new Error('no ' + name); var s = String(e.value).trim(); must(/^[-+]?\d{1,18}$/.test(s)); return BigInt(s); }
  function gcdB(x, y) { x = x < 0n ? -x : x; y = y < 0n ? -y : y; while (y) { var tt = x % y; x = y; y = tt; } return x; }
  function fb(x) { return x < 0n ? '(' + x + ')' : String(x); }
  P['fraction-calculator'] = function () {
    var a = bi('a'), b = bi('b'), c = bi('c'), d = bi('d'), op = form.elements.operation.value, N, Dn, line;
    must(b !== 0n && d !== 0n);
    var K;
    if (op === 'add') { N = a * d + c * b; Dn = b * d; K = 'Add: {0}/{1} + {2}/{3} = ({0} × {3} + {2} × {1}) / ({1} × {3}) = {4}/{5}.'; }
    else if (op === 'subtract') { N = a * d - c * b; Dn = b * d; K = 'Subtract: {0}/{1} − {2}/{3} = ({0} × {3} − {2} × {1}) / ({1} × {3}) = {4}/{5}.'; }
    else if (op === 'multiply') { N = a * c; Dn = b * d; K = 'Multiply the numerators and the denominators: ({0} × {2}) / ({1} × {3}) = {4}/{5}.'; }
    else if (op === 'divide') { must(c !== 0n); N = a * d; Dn = b * c; K = 'Divide by multiplying by the reciprocal: ({0} × {3}) / ({1} × {2}) = {4}/{5}.'; }
    else must(false);
    if (Dn < 0n) { N = -N; Dn = -Dn; }
    line = t(K, fb(a), fb(b), fb(c), fb(d), String(N), String(Dn));
    var g = gcdB(N, Dn); if (g === 0n) g = 1n;
    var rn = N / g, rd = Dn / g;
    must(rtxt().replace(/\s/g, '') === String(rn) + (rd === 1n ? '' : '/' + rd));
    var out = [line, g === 1n ? t('The greatest common factor is 1, so {0}/{1} is already reduced.', String(N), String(Dn)) : t('Divide the top and bottom by their greatest common factor {0}: {1}/{2} = {3}/{4}.', String(g), String(N), String(Dn), String(rn), String(rd))];
    var ab = rn < 0n ? -rn : rn;
    if (rd !== 1n && ab > rd) out.push(t('As a mixed number this is {0}.', strongs()[1]));
    return out;
  };
  P['probability-calculator'] = function () {
    var a = val('a'), b = val('b'); must(a >= 0 && a <= 100 && b >= 0 && b <= 100);
    var p = a / 100, q = b / 100, both = p * q, either = p + q - both, nei = (1 - p) * (1 - q), one = p * (1 - q) + q * (1 - p), s = strongs();
    must(close(lead(rtxt()), both * 100)); must(close(lead(s[0]), either * 100)); must(close(lead(s[1]), one * 100)); must(close(lead(s[2]), nei * 100));
    var pc = function (x) { return fe(x * 100, 10); };
    return [
      t('Turn the percentages into probabilities: p = {0} / 100 = {1} and q = {2} / 100 = {3}.', fe(a), fe(p), fe(b), fe(q)),
      t('Both events: p × q = {0} × {1} = {2}, which is {3}%.', fe(p), fe(q), fe(both), pc(both)),
      t('At least one: p + q − pq = {0} + {1} − {2} = {3}, which is {4}%.', fe(p), fe(q), fe(both), fe(either), pc(either)),
      t('Neither: (1 − p)(1 − q) = {0} × {1} = {2}, which is {3}%.', fe(1 - p), fe(1 - q), fe(nei), pc(nei)),
      t('Exactly one: p(1 − q) + q(1 − p) = {0} × {1} + {2} × {3} = {4}, which is {5}%.', fe(p), fe(1 - q), fe(q), fe(1 - p), fe(one), pc(one))];
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
