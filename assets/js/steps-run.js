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
  "This is the same as moving the decimal point two places to the right, then adding the percent sign.": "Es lo mismo que mover el punto decimal dos lugares a la derecha y añadir el signo de porcentaje.",
  "Add all the values together: {0} = {1}.": "Suma todos los valores: {0} = {1}.",
  "Divide the sum by how many values there are: {0} ÷ {1} = {2}.": "Divide la suma entre la cantidad de valores: {0} ÷ {1} = {2}.",
  "The smallest value is {0} and the largest is {1}, so the range is {1} − {0} = {2}.": "El valor menor es {0} y el mayor es {1}, así que el rango es {1} − {0} = {2}.",
  "The cube root of {0} is the number that gives {0} when it is multiplied by itself three times.": "La raíz cúbica de {0} es el número que da {0} al multiplicarlo por sí mismo tres veces.",
  "The cube root is {0}.": "La raíz cúbica es {0}.",
  "Check: {0} × {0} × {0} = {1}.": "Comprobación: {0} × {0} × {0} = {1}.",
  "The nearest whole number to the root is {0}, and {1} × {1} × {1} = {2}.": "El número entero más cercano a la raíz es {0}, y {1} × {1} × {1} = {2}.",
  "Multiply the base by itself {0} times: {1} = {2}.": "Multiplica la base por sí misma {0} veces: {1} = {2}.",
  "Multiply the base by itself {0} times: {1} × {1} × … × {1} = {2}.": "Multiplica la base por sí misma {0} veces: {1} × {1} × … × {1} = {2}.",
  "Any non-zero number raised to the power 0 equals 1.": "Cualquier número distinto de cero elevado a la potencia 0 es igual a 1.",
  "A negative whole exponent means one divided by the base raised to the positive exponent: 1 ÷ {0}^{1} = 1 ÷ {2} = {3}.": "Un exponente entero negativo significa uno dividido entre la base elevada al exponente positivo: 1 ÷ {0}^{1} = 1 ÷ {2} = {3}.",
  "For a fractional exponent, use x^y = e^(y × ln x): {0} × ln({1}) = {2}, and e^{2} = {3}.": "Para un exponente fraccionario, usa x^y = e^(y × ln x): {0} × ln({1}) = {2}, y e^{2} = {3}.",
  "The result is {0}^{1} = {2}.": "El resultado es {0}^{1} = {2}.",
  "Related values: {0}² = {1}, {0}³ = {2}, and the reciprocal of {0} is 1 ÷ {0} = {3}.": "Valores relacionados: {0}² = {1}, {0}³ = {2}, y el recíproco de {0} es 1 ÷ {0} = {3}.",
  "The square root of {0} is the number that gives {0} when it is multiplied by itself.": "La raíz cuadrada de {0} es el número que da {0} al multiplicarlo por sí mismo.",
  "{0} × {0} = {1}, so the square root is exactly {0}.": "{0} × {0} = {1}, así que la raíz cuadrada es exactamente {0}.",
  "The square root of {0} is not a whole number. The calculator shows {1}.": "La raíz cuadrada de {0} no es un número entero. La calculadora muestra {1}.",
  "Check: {0} × {0} = {1}.": "Comprobación: {0} × {0} = {1}.",
  "Related values: the cube root is {0}, the number squared is {1}, and the reciprocal is {2}.": "Valores relacionados: la raíz cúbica es {0}, el número al cuadrado es {1} y el recíproco es {2}.",
  "Add the {0} values and divide by {0} to get the mean: {1} ÷ {0} = {2}.": "Suma los {0} valores y divide entre {0} para obtener la media: {1} ÷ {0} = {2}.",
  "Subtract the mean from each value and square the result: {0}.": "Resta la media a cada valor y eleva el resultado al cuadrado: {0}.",
  "Add the squared differences: {0}.": "Suma las diferencias al cuadrado: {0}.",
  "Population variance divides by n = {0}: {1} ÷ {0} = {2}.": "La varianza poblacional se divide entre n = {0}: {1} ÷ {0} = {2}.",
  "Sample variance divides by n − 1 = {0}: {1} ÷ {0} = {2}.": "La varianza muestral se divide entre n − 1 = {0}: {1} ÷ {0} = {2}.",
  "The population standard deviation is the square root of the population variance: {0}.": "La desviación estándar poblacional es la raíz cuadrada de la varianza poblacional: {0}.",
  "Square each leg: {0}² = {1} and {2}² = {3}.": "Eleva al cuadrado cada cateto: {0}² = {1} y {2}² = {3}.",
  "Add the squares: {0} + {1} = {2}. This equals c².": "Suma los cuadrados: {0} + {1} = {2}. Esto es igual a c².",
  "Take the square root: c = √{0} = {1}.": "Calcula la raíz cuadrada: c = √{0} = {1}.",
  "Area = ½ × {0} × {1} = {2}. Perimeter = {0} + {1} + {3} = {4}.": "Área = ½ × {0} × {1} = {2}. Perímetro = {0} + {1} + {3} = {4}.",
  "The angle opposite a is arctan({0} ÷ {1}) = {2}, and the other angle is {3}.": "El ángulo opuesto a a es arctan({0} ÷ {1}) = {2}, y el otro ángulo es {3}.",
  "Find the greatest common factor of {0} and {1} with the Euclidean method: {2}.": "Halla el máximo común divisor de {0} y {1} con el método de Euclides: {2}.",
  "The greatest common factor is {0}.": "El máximo común divisor es {0}.",
  "Divide both numbers by {0}: {1} ÷ {0} = {2} and {3} ÷ {0} = {4}, so the ratio is {5}.": "Divide ambos números entre {0}: {1} ÷ {0} = {2} y {3} ÷ {0} = {4}, así que la razón es {5}.",
  "First ÷ second = {0} ÷ {1} = {2}, which is {3} as a percentage.": "Primero ÷ segundo = {0} ÷ {1} = {2}, que es {3} como porcentaje.",
  "Multiply each value by its weight: {0}.": "Multiplica cada valor por su peso: {0}.",
  "Add the products: {0}. Add the weights: {1}.": "Suma los productos: {0}. Suma los pesos: {1}.",
  "Divide the weighted total by the total weight: {0} ÷ {1} = {2}.": "Divide el total ponderado entre el peso total: {0} ÷ {1} = {2}.",
  "For comparison, the simple average of the four values is {0}.": "A modo de comparación, el promedio simple de los cuatro valores es {0}.",
  "undefined": "indefinido"
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
  "This is the same as moving the decimal point two places to the right, then adding the percent sign.": "这相当于把小数点向右移动两位，再加上百分号。",
  "Add all the values together: {0} = {1}.": "把所有数值相加：{0} = {1}。",
  "Divide the sum by how many values there are: {0} ÷ {1} = {2}.": "用总和除以数值的个数：{0} ÷ {1} = {2}。",
  "The smallest value is {0} and the largest is {1}, so the range is {1} − {0} = {2}.": "最小值为 {0}，最大值为 {1}，因此极差为 {1} − {0} = {2}。",
  "The cube root of {0} is the number that gives {0} when it is multiplied by itself three times.": "{0} 的立方根是一个数，将它自乘三次（三个相乘）后得到 {0}。",
  "The cube root is {0}.": "立方根是 {0}。",
  "Check: {0} × {0} × {0} = {1}.": "验算：{0} × {0} × {0} = {1}。",
  "The nearest whole number to the root is {0}, and {1} × {1} × {1} = {2}.": "最接近该根的整数是 {0}，而 {1} × {1} × {1} = {2}。",
  "Multiply the base by itself {0} times: {1} = {2}.": "把底数连乘 {0} 次：{1} = {2}。",
  "Multiply the base by itself {0} times: {1} × {1} × … × {1} = {2}.": "把底数连乘 {0} 次：{1} × {1} × … × {1} = {2}。",
  "Any non-zero number raised to the power 0 equals 1.": "任何非零数的 0 次方都等于 1。",
  "A negative whole exponent means one divided by the base raised to the positive exponent: 1 ÷ {0}^{1} = 1 ÷ {2} = {3}.": "负整数指数表示 1 除以底数的正指数次幂：1 ÷ {0}^{1} = 1 ÷ {2} = {3}。",
  "For a fractional exponent, use x^y = e^(y × ln x): {0} × ln({1}) = {2}, and e^{2} = {3}.": "对于非整数指数，使用 x^y = e^(y × ln x)：{0} × ln({1}) = {2}，e^{2} = {3}。",
  "The result is {0}^{1} = {2}.": "结果是 {0}^{1} = {2}。",
  "Related values: {0}² = {1}, {0}³ = {2}, and the reciprocal of {0} is 1 ÷ {0} = {3}.": "相关数值：{0}² = {1}，{0}³ = {2}，{0} 的倒数是 1 ÷ {0} = {3}。",
  "The square root of {0} is the number that gives {0} when it is multiplied by itself.": "{0} 的平方根是一个数，将它自乘后得到 {0}。",
  "{0} × {0} = {1}, so the square root is exactly {0}.": "{0} × {0} = {1}，所以平方根正好是 {0}。",
  "The square root of {0} is not a whole number. The calculator shows {1}.": "{0} 的平方根不是整数，计算器显示的结果是 {1}。",
  "Check: {0} × {0} = {1}.": "验算：{0} × {0} = {1}。",
  "Related values: the cube root is {0}, the number squared is {1}, and the reciprocal is {2}.": "相关数值：立方根是 {0}，该数的平方是 {1}，倒数是 {2}。",
  "Add the {0} values and divide by {0} to get the mean: {1} ÷ {0} = {2}.": "把 {0} 个数值相加再除以 {0}，得到平均数：{1} ÷ {0} = {2}。",
  "Subtract the mean from each value and square the result: {0}.": "每个数值减去平均数，再把差平方：{0}。",
  "Add the squared differences: {0}.": "把这些平方差相加：{0}。",
  "Population variance divides by n = {0}: {1} ÷ {0} = {2}.": "总体方差除以 n = {0}：{1} ÷ {0} = {2}。",
  "Sample variance divides by n − 1 = {0}: {1} ÷ {0} = {2}.": "样本方差除以 n − 1 = {0}：{1} ÷ {0} = {2}。",
  "The population standard deviation is the square root of the population variance: {0}.": "总体标准差是总体方差的平方根：{0}。",
  "Square each leg: {0}² = {1} and {2}² = {3}.": "先把两条直角边分别平方：{0}² = {1}，{2}² = {3}。",
  "Add the squares: {0} + {1} = {2}. This equals c².": "把两个平方相加：{0} + {1} = {2}，这等于 c²。",
  "Take the square root: c = √{0} = {1}.": "开平方：c = √{0} = {1}。",
  "Area = ½ × {0} × {1} = {2}. Perimeter = {0} + {1} + {3} = {4}.": "面积 = ½ × {0} × {1} = {2}。周长 = {0} + {1} + {3} = {4}。",
  "The angle opposite a is arctan({0} ÷ {1}) = {2}, and the other angle is {3}.": "与 a 相对的角是 arctan({0} ÷ {1}) = {2}，另一个角是 {3}。",
  "Find the greatest common factor of {0} and {1} with the Euclidean method: {2}.": "用欧几里得算法求 {0} 和 {1} 的最大公因数：{2}。",
  "The greatest common factor is {0}.": "最大公因数是 {0}。",
  "Divide both numbers by {0}: {1} ÷ {0} = {2} and {3} ÷ {0} = {4}, so the ratio is {5}.": "两个数都除以 {0}：{1} ÷ {0} = {2}，{3} ÷ {0} = {4}，所以比值为 {5}。",
  "First ÷ second = {0} ÷ {1} = {2}, which is {3} as a percentage.": "第一个数 ÷ 第二个数 = {0} ÷ {1} = {2}，换算成百分比是 {3}。",
  "Multiply each value by its weight: {0}.": "把每个数值乘以它的权重：{0}。",
  "Add the products: {0}. Add the weights: {1}.": "把乘积相加：{0}。把权重相加：{1}。",
  "Divide the weighted total by the total weight: {0} ÷ {1} = {2}.": "用加权总和除以总权重：{0} ÷ {1} = {2}。",
  "For comparison, the simple average of the four values is {0}.": "作为对比，这四个数值的简单平均数是 {0}。",
  "undefined": "未定义"
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
  "This is the same as moving the decimal point two places to the right, then adding the percent sign.": "Pareho ito ng paglipat ng decimal point nang dalawang puwesto pakanan, saka idagdag ang simbolo ng porsyento.",
  "Add all the values together: {0} = {1}.": "Pagsamahin ang lahat ng halaga: {0} = {1}.",
  "Divide the sum by how many values there are: {0} ÷ {1} = {2}.": "Hatiin ang kabuuan sa dami ng mga halaga: {0} ÷ {1} = {2}.",
  "The smallest value is {0} and the largest is {1}, so the range is {1} − {0} = {2}.": "Ang pinakamaliit na halaga ay {0} at ang pinakamalaki ay {1}, kaya ang saklaw ay {1} − {0} = {2}.",
  "The cube root of {0} is the number that gives {0} when it is multiplied by itself three times.": "Ang cube root ng {0} ay ang bilang na magbibigay ng {0} kapag pinarami sa sarili nito nang tatlong beses.",
  "The cube root is {0}.": "Ang cube root ay {0}.",
  "Check: {0} × {0} × {0} = {1}.": "Pagsusuri: {0} × {0} × {0} = {1}.",
  "The nearest whole number to the root is {0}, and {1} × {1} × {1} = {2}.": "Ang pinakamalapit na buong bilang sa ugat ay {0}, at {1} × {1} × {1} = {2}.",
  "Multiply the base by itself {0} times: {1} = {2}.": "Paramihin ang base sa sarili nito nang {0} beses: {1} = {2}.",
  "Multiply the base by itself {0} times: {1} × {1} × … × {1} = {2}.": "Paramihin ang base sa sarili nito nang {0} beses: {1} × {1} × … × {1} = {2}.",
  "Any non-zero number raised to the power 0 equals 1.": "Anumang bilang na hindi zero na itinaas sa kapangyarihang 0 ay katumbas ng 1.",
  "A negative whole exponent means one divided by the base raised to the positive exponent: 1 ÷ {0}^{1} = 1 ÷ {2} = {3}.": "Ang negatibong buong exponent ay nangangahulugang isang hinati sa base na itinaas sa positibong exponent: 1 ÷ {0}^{1} = 1 ÷ {2} = {3}.",
  "For a fractional exponent, use x^y = e^(y × ln x): {0} × ln({1}) = {2}, and e^{2} = {3}.": "Para sa fractional na exponent, gamitin ang x^y = e^(y × ln x): {0} × ln({1}) = {2}, at e^{2} = {3}.",
  "The result is {0}^{1} = {2}.": "Ang resulta ay {0}^{1} = {2}.",
  "Related values: {0}² = {1}, {0}³ = {2}, and the reciprocal of {0} is 1 ÷ {0} = {3}.": "Mga kaugnay na halaga: {0}² = {1}, {0}³ = {2}, at ang reciprocal ng {0} ay 1 ÷ {0} = {3}.",
  "The square root of {0} is the number that gives {0} when it is multiplied by itself.": "Ang square root ng {0} ay ang bilang na magbibigay ng {0} kapag pinarami sa sarili nito.",
  "{0} × {0} = {1}, so the square root is exactly {0}.": "{0} × {0} = {1}, kaya ang square root ay eksaktong {0}.",
  "The square root of {0} is not a whole number. The calculator shows {1}.": "Ang square root ng {0} ay hindi buong bilang. Ipinapakita ng calculator ang {1}.",
  "Check: {0} × {0} = {1}.": "Pagsusuri: {0} × {0} = {1}.",
  "Related values: the cube root is {0}, the number squared is {1}, and the reciprocal is {2}.": "Mga kaugnay na halaga: ang cube root ay {0}, ang parisukat ng bilang ay {1}, at ang reciprocal ay {2}.",
  "Add the {0} values and divide by {0} to get the mean: {1} ÷ {0} = {2}.": "Pagsamahin ang {0} halaga at hatiin sa {0} para makuha ang mean: {1} ÷ {0} = {2}.",
  "Subtract the mean from each value and square the result: {0}.": "Ibawas ang mean sa bawat halaga at i-square ang resulta: {0}.",
  "Add the squared differences: {0}.": "Pagsamahin ang mga squared difference: {0}.",
  "Population variance divides by n = {0}: {1} ÷ {0} = {2}.": "Ang population variance ay hinahati sa n = {0}: {1} ÷ {0} = {2}.",
  "Sample variance divides by n − 1 = {0}: {1} ÷ {0} = {2}.": "Ang sample variance ay hinahati sa n − 1 = {0}: {1} ÷ {0} = {2}.",
  "The population standard deviation is the square root of the population variance: {0}.": "Ang population standard deviation ay ang square root ng population variance: {0}.",
  "Square each leg: {0}² = {1} and {2}² = {3}.": "I-square ang bawat tagiliran: {0}² = {1} at {2}² = {3}.",
  "Add the squares: {0} + {1} = {2}. This equals c².": "Pagsamahin ang mga parisukat: {0} + {1} = {2}. Katumbas ito ng c².",
  "Take the square root: c = √{0} = {1}.": "Kunin ang square root: c = √{0} = {1}.",
  "Area = ½ × {0} × {1} = {2}. Perimeter = {0} + {1} + {3} = {4}.": "Lawak = ½ × {0} × {1} = {2}. Perimeter = {0} + {1} + {3} = {4}.",
  "The angle opposite a is arctan({0} ÷ {1}) = {2}, and the other angle is {3}.": "Ang anggulong katapat ng a ay arctan({0} ÷ {1}) = {2}, at ang isa pang anggulo ay {3}.",
  "Find the greatest common factor of {0} and {1} with the Euclidean method: {2}.": "Hanapin ang pinakamalaking karaniwang salik ng {0} at {1} gamit ang paraan ni Euclid: {2}.",
  "The greatest common factor is {0}.": "Ang pinakamalaking karaniwang salik ay {0}.",
  "Divide both numbers by {0}: {1} ÷ {0} = {2} and {3} ÷ {0} = {4}, so the ratio is {5}.": "Hatiin ang dalawang bilang sa {0}: {1} ÷ {0} = {2} at {3} ÷ {0} = {4}, kaya ang ratio ay {5}.",
  "First ÷ second = {0} ÷ {1} = {2}, which is {3} as a percentage.": "Una ÷ ikalawa = {0} ÷ {1} = {2}, na {3} bilang porsyento.",
  "Multiply each value by its weight: {0}.": "Paramihin ang bawat halaga sa timbang nito: {0}.",
  "Add the products: {0}. Add the weights: {1}.": "Pagsamahin ang mga produkto: {0}. Pagsamahin ang mga timbang: {1}.",
  "Divide the weighted total by the total weight: {0} ÷ {1} = {2}.": "Hatiin ang weighted total sa kabuuang timbang: {0} ÷ {1} = {2}.",
  "For comparison, the simple average of the four values is {0}.": "Bilang paghahambing, ang simpleng average ng apat na halaga ay {0}.",
  "undefined": "hindi tinukoy"
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

  function sq(x) { return x * x; }
  function pr(v) { return v < 0 ? '(' + fmt(v) + ')' : fmt(v); }
  P['average-calculator'] = function () {
    var v = ['v1', 'v2', 'v3', 'v4', 'v5'].map(num), n = v.length, s = 0, i;
    for (i = 0; i < n; i++) s += v[i];
    var mean = s / n, mn = Math.min.apply(null, v), mx = Math.max.apply(null, v);
    must(close(mean, pn(plain('mainResult')))); must(close(s, pn(plain('sumOut')))); must(close(mn, pn(plain('minOut')))); must(close(mx, pn(plain('maxOut')))); must(close(mx - mn, pn(plain('rangeOut'))));
    return [
      t('Add all the values together: {0} = {1}.', v.map(fmt).join(' + '), fmt(s)),
      t('Divide the sum by how many values there are: {0} ÷ {1} = {2}.', fmt(s), fmt(n), fmt(mean)),
      t('The smallest value is {0} and the largest is {1}, so the range is {1} − {0} = {2}.', fmt(mn), fmt(mx), fmt(mx - mn))
    ];
  };
  P['cube-root-calculator'] = function () {
    var x = num('numberValue'), r = Math.cbrt(x), c = r * r * r, nr = Math.round(r);
    must(close(r, pn(plain('mainResult')))); must(close(c, pn(plain('cubeOut')))); must(nr === pn(plain('nearestOut')));
    return [
      t('The cube root of {0} is the number that gives {0} when it is multiplied by itself three times.', fmt(x)),
      t('The cube root is {0}.', plain('mainResult')),
      t('Check: {0} × {0} × {0} = {1}.', pr(r), fmt(c)),
      t('The nearest whole number to the root is {0}, and {1} × {1} × {1} = {2}.', fmt(nr), pr(nr), fmt(nr * nr * nr))
    ];
  };
  P['exponent-calculator'] = function () {
    var x = num('baseValue'), y = num('exponentValue'), r = Math.pow(x, y), first;
    must(isFinite(r) && x !== 0 && close(r, pn(plain('mainResult')), 1e-8));
    must(close(x * x, pn(plain('squareOut')))); must(close(x * x * x, pn(plain('cubeOut')))); must(close(1 / x, pn(plain('reciprocalOut')))); must(close(Math.sqrt(Math.abs(x)), pn(plain('rootOut')), 1e-8));
    var ay = Math.abs(y), integer = y === Math.floor(y);
    if (integer && y >= 1 && y <= 6) {
      var f = []; for (var i = 0; i < y; i++) f.push(pr(x));
      first = t('Multiply the base by itself {0} times: {1} = {2}.', fmt(y), f.join(' × '), fmt(r));
    } else if (integer && y > 6) {
      first = t('Multiply the base by itself {0} times: {1} × {1} × … × {1} = {2}.', fmt(y), pr(x), fmt(r));
    } else if (y === 0) {
      first = t('Any non-zero number raised to the power 0 equals 1.');
    } else if (integer) {
      first = t('A negative whole exponent means one divided by the base raised to the positive exponent: 1 ÷ {0}^{1} = 1 ÷ {2} = {3}.', pr(x), fmt(ay), fmt(Math.pow(x, ay)), fmt(r));
    } else {
      must(x > 0);
      first = t('For a fractional exponent, use x^y = e^(y × ln x): {0} × ln({1}) = {2}, and e^{2} = {3}.', fmt(y), fmt(x), fmt(y * Math.log(x)), fmt(r));
    }
    return [
      first,
      t('The result is {0}^{1} = {2}.', pr(x), pr(y), plain('mainResult')),
      t('Related values: {0}² = {1}, {0}³ = {2}, and the reciprocal of {0} is 1 ÷ {0} = {3}.', pr(x), fmt(x * x), fmt(x * x * x), fmt(1 / x))
    ];
  };
  P['square-root-calculator'] = function () {
    var x = num('numberValue'); must(x >= 0);
    var r = Math.sqrt(x);
    must(close(r, pn(plain('mainResult')))); must(close(Math.cbrt(x), pn(plain('cubeOut')))); must(close(x * x, pn(plain('squareOut'))));
    var perfect = Math.abs(r - Math.round(r)) < 1e-12;
    return [
      t('The square root of {0} is the number that gives {0} when it is multiplied by itself.', fmt(x)),
      perfect ? t('{0} × {0} = {1}, so the square root is exactly {0}.', fmt(r), fmt(x)) : t('The square root of {0} is not a whole number. The calculator shows {1}.', fmt(x), plain('mainResult')),
      t('Check: {0} × {0} = {1}.', plain('mainResult'), fmt(r * r)),
      t('Related values: the cube root is {0}, the number squared is {1}, and the reciprocal is {2}.', fmt(Math.cbrt(x)), fmt(x * x), x === 0 ? t('undefined') : fmt(1 / x))
    ];
  };
  P['variance-calculator'] = function () {
    var raw = document.getElementById('values').value.split(/[;\s,]+/).filter(function (s) { return s !== ''; });
    var v = raw.map(function (s) { return window.DCHCalculator && window.DCHCalculator.numeric ? window.DCHCalculator.numeric(s) : parseFloat(s); });
    must(v.length >= 2 && v.every(isFinite) && v.length <= 200);
    var n = v.length, s = 0, i; for (i = 0; i < n; i++) s += v[i];
    var m = s / n, ss = 0, dev = []; for (i = 0; i < n; i++) { dev.push(sq(v[i] - m)); ss += sq(v[i] - m); }
    var pv = ss / n, sv = ss / (n - 1);
    must(n === pn(plain('countOut'))); must(close(m, pn(plain('meanOut')))); must(close(pv, pn(plain('mainResult')))); must(close(sv, pn(plain('sampleOut')))); must(close(Math.sqrt(pv), pn(plain('sdOut'))));
    var shown = dev.length > 6 ? dev.slice(0, 5).map(fmt).concat(['…', fmt(dev[n - 1])]) : dev.map(fmt);
    return [
      t('Add the {0} values and divide by {0} to get the mean: {1} ÷ {0} = {2}.', fmt(n), fmt(s), fmt(m)),
      t('Subtract the mean from each value and square the result: {0}.', shown.join(', ')),
      t('Add the squared differences: {0}.', fmt(ss)),
      t('Population variance divides by n = {0}: {1} ÷ {0} = {2}.', fmt(n), fmt(ss), fmt(pv)),
      t('Sample variance divides by n − 1 = {0}: {1} ÷ {0} = {2}.', fmt(n - 1), fmt(ss), fmt(sv)),
      t('The population standard deviation is the square root of the population variance: {0}.', plain('sdOut'))
    ];
  };
  P['pythagorean-theorem-calculator'] = function () {
    var a = num('legA'), b = num('legB'); must(a > 0 && b > 0);
    var c2 = a * a + b * b, c = Math.sqrt(c2), A = Math.atan(a / b) * 180 / Math.PI;
    must(close(c, pn(plain('mainResult')))); must(close(a * b / 2, pn(plain('areaOut')))); must(close(a + b + c, pn(plain('perimeterOut')))); must(close(A, pn(plain('angleAOut')), 1e-7));
    return [
      t('Square each leg: {0}² = {1} and {2}² = {3}.', fmt(a), fmt(a * a), fmt(b), fmt(b * b)),
      t('Add the squares: {0} + {1} = {2}. This equals c².', fmt(a * a), fmt(b * b), fmt(c2)),
      t('Take the square root: c = √{0} = {1}.', fmt(c2), plain('mainResult')),
      t('Area = ½ × {0} × {1} = {2}. Perimeter = {0} + {1} + {3} = {4}.', fmt(a), fmt(b), fmt(a * b / 2), plain('mainResult'), fmt(a + b + c)),
      t('The angle opposite a is arctan({0} ÷ {1}) = {2}, and the other angle is {3}.', fmt(a), fmt(b), plain('angleAOut'), plain('angleBOut'))
    ];
  };
  P['ratio-calculator'] = function () {
    var a = num('ratioA'), b = num('ratioB'); must(a > 0 && b > 0 && a === Math.floor(a) && b === Math.floor(b));
    var x = Math.max(a, b), y = Math.min(a, b), lines = [];
    while (y) { lines.push(fmt(x) + ' = ' + fmt(Math.floor(x / y)) + ' × ' + fmt(y) + ' + ' + fmt(x % y)); var r = x % y; x = y; y = r; }
    var g = x;
    must(plain('mainResult').replace(/\s/g, '') === (a / g) + ':' + (b / g)); must(g === pn(plain('factorOut'))); must(close(a / b, pn(plain('decimalOut')), 1e-8)); must(close(a / b * 100, pn(plain('percentOut')), 1e-4));
    if (lines.length > 6) lines = lines.slice(0, 6).concat(['…']);
    return [
      t('Find the greatest common factor of {0} and {1} with the Euclidean method: {2}.', fmt(a), fmt(b), lines.join('; ')),
      t('The greatest common factor is {0}.', fmt(g)),
      t('Divide both numbers by {0}: {1} ÷ {0} = {2} and {3} ÷ {0} = {4}, so the ratio is {5}.', fmt(g), fmt(a), fmt(a / g), fmt(b), fmt(b / g), plain('mainResult')),
      t('First ÷ second = {0} ÷ {1} = {2}, which is {3} as a percentage.', fmt(a), fmt(b), fmt(a / b), plain('percentOut'))
    ];
  };
  P['weighted-average-calculator'] = function () {
    var v = [], w = [], i, sw = 0, sp = 0, st = 0, prods = [];
    for (i = 1; i <= 4; i++) { v.push(num('v' + i)); w.push(num('w' + i)); }
    for (i = 0; i < 4; i++) { sw += w[i]; sp += v[i] * w[i]; st += v[i]; prods.push(fmt(v[i]) + ' × ' + fmt(w[i]) + ' = ' + fmt(v[i] * w[i])); }
    must(sw > 0); var wa = sp / sw;
    must(close(wa, pn(plain('mainResult')))); must(close(sw, pn(plain('weightOut')))); must(close(st / 4, pn(plain('simpleOut'))));
    return [
      t('Multiply each value by its weight: {0}.', prods.join('; ')),
      t('Add the products: {0}. Add the weights: {1}.', fmt(sp), fmt(sw)),
      t('Divide the weighted total by the total weight: {0} ÷ {1} = {2}.', fmt(sp), fmt(sw), fmt(wa)),
      t('For comparison, the simple average of the four values is {0}.', plain('simpleOut'))
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
