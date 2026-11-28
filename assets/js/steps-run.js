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
  "undefined": "indefinido",
  "Count the digits after the decimal point: there are {0}, so write the number over 10^{0} = {1}: {2}/{1}.": "Cuenta los dígitos después del punto decimal: hay {0}, así que escribe el número sobre 10^{0} = {1}: {2}/{1}.",
  "Find the greatest common factor of {0} and {1}: it is {2}.": "Halla el máximo común divisor de {0} y {1}: es {2}.",
  "Divide the top and the bottom by {0}: {1} ÷ {0} = {2} and {3} ÷ {0} = {4}.": "Divide el numerador y el denominador entre {0}: {1} ÷ {0} = {2} y {3} ÷ {0} = {4}.",
  "The fraction in lowest terms is {0}.": "La fracción en su forma más simple es {0}.",
  "Multiply the whole number by the denominator: {0} × {1} = {2}.": "Multiplica el número entero por el denominador: {0} × {1} = {2}.",
  "Add the numerator: {0} + {1} = {2}, so the improper fraction is {2}/{3}.": "Suma el numerador: {0} + {1} = {2}, así que la fracción impropia es {2}/{3}.",
  "The page shows it as {0}. Divide the top by the bottom to check: {1} ÷ {2} = {3}.": "La página lo muestra como {0}. Para comprobarlo, divide el numerador entre el denominador: {1} ÷ {2} = {3}.",
  "Divide the top by the bottom: {0} ÷ {1} = {2} with a remainder.": "Divide el numerador entre el denominador: {0} ÷ {1} = {2} con resto.",
  "The whole part is {0}. The remainder is what is left over: {1} − {2} × {0} = {3}.": "La parte entera es {0}. El resto es lo que sobra: {1} − {2} × {0} = {3}.",
  "Put the remainder over the original denominator: {0}/{1}. The mixed number is {2}.": "Pon el resto sobre el denominador original: {0}/{1}. El número mixto es {2}.",
  "Divide by the smallest prime that fits, again and again, until nothing is left: {0}.": "Divide entre el menor primo que encaje, una y otra vez, hasta que no quede nada: {0}.",
  "Collect the primes that were used: {0}.": "Reúne los primos que se usaron: {0}.",
  "Check: multiplying these primes gives back {0}.": "Comprobación: al multiplicar estos primos se obtiene de nuevo {0}.",
  "The number of divisors is the product of (exponent + 1) for each prime: {0}.": "El número de divisores es el producto de (exponente + 1) de cada primo: {0}.",
  "Move the decimal point until one non-zero digit is left in front of it. The power of 10 is {0}.": "Mueve el punto decimal hasta que quede un solo dígito distinto de cero delante. La potencia de 10 es {0}.",
  "Keep {0} significant figures for the front number: {1}.": "Conserva {0} cifras significativas para el número de delante: {1}.",
  "Write it as the front number times 10 to that power: {0}.": "Escríbelo como el número de delante por 10 elevado a esa potencia: {0}.",
  "In E notation this is {0}.": "En notación E es {0}.",
  "Subtract the birth date {0} from the reference date {1}, counting whole years first, then months, then days: {2} years, {3} months, {4} days.": "Resta la fecha de nacimiento {0} de la fecha de referencia {1}, contando primero los años completos, luego los meses y luego los días: {2} años, {3} meses, {4} días.",
  "Counting every calendar day from {0} to {1} gives {2} days.": "Contando cada día de calendario de {0} a {1} resultan {2} días.",
  "Dividing {0} days by 7 gives {1} weeks (rounded to two decimals).": "Dividir {0} días entre 7 da {1} semanas (redondeado a dos decimales).",
  "The next birthday after the reference date is {0}.": "El próximo cumpleaños después de la fecha de referencia es el {0}.",
  "Start on {0} and count {1} business days, skipping Saturdays and Sundays.": "Empieza el {0} y cuenta {1} días hábiles, saltándote sábados y domingos.",
  "The count ends on {0}, which is {1} calendar days away.": "El recuento termina el {0}, a {1} días de calendario de distancia.",
  "{0} calendar days minus {1} business days leaves {2} weekend days that were skipped.": "{0} días de calendario menos {1} días hábiles dejan {2} días de fin de semana que se saltaron.",
  "The end date falls on {0}.": "La fecha final cae en {0}.",
  "Start from the date {0}.": "Parte de la fecha {0}.",
  "Move it by {0} calendar days (a negative number moves backward): {1}.": "Desplázala {0} días de calendario (un número negativo retrocede): {1}.",
  "Check: {0} plus {1} days is {2}.": "Comprobación: {0} más {1} días es {2}.",
  "That date falls on {0}.": "Esa fecha cae en {0}.",
  "Add the lengths of the months before month {0}: {1} days. Then add the day {2}: day {3} of the year.": "Suma la duración de los meses anteriores al mes {0}: {1} días. Luego suma el día {2}: día {3} del año.",
  "The year {0} has {1} days, so {2} days remain after this date: {1} − {3} = {2}.": "El año {0} tiene {1} días, así que quedan {2} días después de esta fecha: {1} − {3} = {2}.",
  "The date {0} falls on {1}.": "La fecha {0} cae en {1}.",
  "Its ISO week number is {0}.": "Su número de semana ISO es {0}.",
  "Start from the reference date {0} and shift it by {1} calendar days (a negative number moves backward): {2}.": "Parte de la fecha de referencia {0} y desplázala {1} días de calendario (un número negativo retrocede): {2}.",
  "The resulting date falls on {0}.": "La fecha resultante cae en {0}.",
  "The size of the shift is {0} days.": "El tamaño del desplazamiento es de {0} días.",
  "Splitting {0} days into sevens gives {1} weeks and {2} days.": "Dividir {0} días en grupos de siete da {1} semanas y {2} días.",
  "Convert both times to minutes after midnight: {0}:{1} is {2} and {3}:{4} is {5}.": "Convierte ambas horas a minutos desde la medianoche: {0}:{1} es {2} y {3}:{4} es {5}.",
  "The end is earlier than the start, so it is read as the next day: add 1,440 minutes, giving {0}.": "El fin es anterior al inicio, así que se interpreta como del día siguiente: suma 1,440 minutos, lo que da {0}.",
  "The end is not earlier than the start, so both times are on the same day.": "El fin no es anterior al inicio, así que ambas horas son del mismo día.",
  "Gross span: {0} − {1} = {2} minutes, which is {3} hours.": "Intervalo bruto: {0} − {1} = {2} minutos, que son {3} horas.",
  "Subtract the {0}-minute unpaid break: {1} − {0} = {2} minutes.": "Resta el descanso no remunerado de {0} minutos: {1} − {0} = {2} minutos.",
  "{0} minutes is {1} hr {2} min, or {3} in decimal hours.": "{0} minutos son {1} h {2} min, o {3} en horas decimales.",
  "Count whole calendar months from the earlier date {0}: {1} months later is {2}.": "Cuenta los meses de calendario completos desde la fecha anterior {0}: {1} meses después es el {2}.",
  "From {0} to {1} there are {2} days left over.": "De {0} a {1} sobran {2} días.",
  "Counting every calendar day from {0} to {1} gives {2} days in total.": "Contando cada día de calendario de {0} a {1} resultan {2} días en total.",
  "The decimal view divides the days by a fixed average month of 30.436875 days: {0} ÷ 30.436875 = {1}.": "La vista decimal divide los días entre un mes medio fijo de 30.436875 días: {0} ÷ 30.436875 = {1}.",
  "Count the calendar days between {0} and {1}: {2} days.": "Cuenta los días de calendario entre {0} y {1}: {2} días.",
  "Divide by 7: {0} ÷ 7 = {1} weeks.": "Divide entre 7: {0} ÷ 7 = {1} semanas.",
  "Full weeks and leftover days: {0} × 7 + {1} = {2}, so {0} full weeks and {1} days.": "Semanas completas y días sobrantes: {0} × 7 + {1} = {2}, es decir, {0} semanas completas y {1} días.",
  "The later of the two dates is {0}.": "La más tardía de las dos fechas es el {0}.",
  "Convert the start time to minutes after midnight: {0}:{1} is {2} minutes.": "Convierte la hora inicial a minutos desde la medianoche: {0}:{1} son {2} minutos.",
  "Convert the addition to minutes: {0} × 60 + {1} = {2} minutes.": "Convierte la suma a minutos: {0} × 60 + {1} = {2} minutos.",
  "Add them: {0} + {1} = {2} minutes.": "Súmalos: {0} + {1} = {2} minutos.",
  "{0} minutes is {1}, still the same day.": "{0} minutos son las {1}, todavía el mismo día.",
  "The sum is outside one day (0 to 1,439), so it wraps by {0} day(s) to {1} minutes after midnight, which reads {2}.": "La suma queda fuera de un día (0 a 1,439), así que da la vuelta {0} día(s) hasta {1} minutos después de medianoche, que se lee {2}.",
  "Count back 266 days from the due date {0} to estimate conception: {1}.": "Cuenta hacia atrás 266 días desde la fecha prevista de parto {0} para estimar la concepción: {1}.",
  "Count back 280 days from the due date to estimate the last menstrual period: {0}.": "Cuenta hacia atrás 280 días desde la fecha prevista de parto para estimar la última menstruación: {0}.",
  "From {0} to the reference date {1} is {2} days, which is {3} weeks and {4} days.": "De {0} a la fecha de referencia {1} hay {2} días, que son {3} semanas y {4} días.",
  "From the reference date to the due date is {0} days.": "De la fecha de referencia a la fecha prevista de parto hay {0} días.",
  "Today is {0} on this device and the target date is {1}.": "Hoy es {0} en este dispositivo y la fecha objetivo es {1}.",
  "Counting whole calendar days from today to the target date gives {0} days.": "Contando los días de calendario completos desde hoy hasta la fecha objetivo resultan {0} días.",
  "The target is in the future, so the count goes down by one each day until then.": "El objetivo está en el futuro, así que el recuento baja una unidad cada día hasta entonces.",
  "The target date has already passed, so the count shows the days since then.": "La fecha objetivo ya ha pasado, así que el recuento muestra los días transcurridos desde entonces.",
  "The target is today, so the count is 0.": "El objetivo es hoy, así que el recuento es 0.",
  "Dividing {0} days by 7 gives {1} weeks (rounded to one decimal).": "Dividir {0} días entre 7 da {1} semanas (redondeado a un decimal).",
  "Span: {0} − {1} = {2} minutes.": "Intervalo: {0} − {1} = {2} minutos.",
  "Take the first day of the last period: {0}.": "Toma el primer día de la última menstruación: {0}.",
  "Add 280 days (40 weeks) to get the estimated due date: {0}.": "Suma 280 días (40 semanas) para obtener la fecha prevista de parto: {0}.",
  "Add 14 days to estimate conception: {0}.": "Suma 14 días para estimar la concepción: {0}.",
  "The weeks line shows the 40-week pregnancy length that the model assumes.": "La línea de semanas muestra la duración de embarazo de 40 semanas que supone el modelo.",
  "Add the cycle length to the first day of the last period: {0} + {1} days = {2}. That is the estimated next period.": "Suma la duración del ciclo al primer día de la última menstruación: {0} + {1} días = {2}. Esa es la próxima menstruación estimada.",
  "Count back 14 days from the next period: the estimated ovulation date is {0}.": "Cuenta hacia atrás 14 días desde la próxima menstruación: la fecha estimada de ovulación es {0}.",
  "The fertile window runs from 5 days before to 1 day after that date: {0} to {1}.": "La ventana fértil va desde 5 días antes hasta 1 día después de esa fecha: del {0} al {1}."
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
  "undefined": "未定义",
  "Count the digits after the decimal point: there are {0}, so write the number over 10^{0} = {1}: {2}/{1}.": "数一数小数点后的位数：共 {0} 位，所以把这个数写成分母为 10^{0} = {1} 的分数：{2}/{1}。",
  "Find the greatest common factor of {0} and {1}: it is {2}.": "求 {0} 和 {1} 的最大公因数：是 {2}。",
  "Divide the top and the bottom by {0}: {1} ÷ {0} = {2} and {3} ÷ {0} = {4}.": "分子和分母同时除以 {0}：{1} ÷ {0} = {2}，{3} ÷ {0} = {4}。",
  "The fraction in lowest terms is {0}.": "最简分数是 {0}。",
  "Multiply the whole number by the denominator: {0} × {1} = {2}.": "整数部分乘以分母：{0} × {1} = {2}。",
  "Add the numerator: {0} + {1} = {2}, so the improper fraction is {2}/{3}.": "再加上分子：{0} + {1} = {2}，所以假分数是 {2}/{3}。",
  "The page shows it as {0}. Divide the top by the bottom to check: {1} ÷ {2} = {3}.": "页面显示为 {0}。用分子除以分母来验算：{1} ÷ {2} = {3}。",
  "Divide the top by the bottom: {0} ÷ {1} = {2} with a remainder.": "用分子除以分母：{0} ÷ {1} = {2}，还有余数。",
  "The whole part is {0}. The remainder is what is left over: {1} − {2} × {0} = {3}.": "整数部分是 {0}。余数是剩下的部分：{1} − {2} × {0} = {3}。",
  "Put the remainder over the original denominator: {0}/{1}. The mixed number is {2}.": "把余数放在原来的分母上：{0}/{1}。带分数是 {2}。",
  "Divide by the smallest prime that fits, again and again, until nothing is left: {0}.": "不断除以能整除的最小质数，直到除尽：{0}。",
  "Collect the primes that were used: {0}.": "把用到的质数汇总起来：{0}。",
  "Check: multiplying these primes gives back {0}.": "验算：把这些质数相乘就得回 {0}。",
  "The number of divisors is the product of (exponent + 1) for each prime: {0}.": "约数的个数等于各质数（指数 + 1）的乘积：{0}。",
  "Move the decimal point until one non-zero digit is left in front of it. The power of 10 is {0}.": "移动小数点，使其前面只剩一位非零数字。10 的指数是 {0}。",
  "Keep {0} significant figures for the front number: {1}.": "前面的数保留 {0} 位有效数字：{1}。",
  "Write it as the front number times 10 to that power: {0}.": "写成前面的数乘以 10 的该次幂：{0}。",
  "In E notation this is {0}.": "用 E 记数法表示为 {0}。",
  "Subtract the birth date {0} from the reference date {1}, counting whole years first, then months, then days: {2} years, {3} months, {4} days.": "用参考日期 {1} 减去出生日期 {0}，先数整年，再数月，最后数天：{2} 年 {3} 个月 {4} 天。",
  "Counting every calendar day from {0} to {1} gives {2} days.": "把 {0} 到 {1} 之间的每个日历日都算上，共 {2} 天。",
  "Dividing {0} days by 7 gives {1} weeks (rounded to two decimals).": "{0} 天除以 7 得 {1} 周（保留两位小数）。",
  "The next birthday after the reference date is {0}.": "参考日期之后的下一个生日是 {0}。",
  "Start on {0} and count {1} business days, skipping Saturdays and Sundays.": "从 {0} 开始，数 {1} 个工作日，跳过周六和周日。",
  "The count ends on {0}, which is {1} calendar days away.": "计数在 {0} 结束，相隔 {1} 个日历日。",
  "{0} calendar days minus {1} business days leaves {2} weekend days that were skipped.": "{0} 个日历日减去 {1} 个工作日，剩下 {2} 个被跳过的周末日。",
  "The end date falls on {0}.": "结束日期是{0}。",
  "Start from the date {0}.": "从日期 {0} 开始。",
  "Move it by {0} calendar days (a negative number moves backward): {1}.": "将它移动 {0} 个日历日（负数表示向前倒推）：{1}。",
  "Check: {0} plus {1} days is {2}.": "验证：{0} 加 {1} 天是 {2}。",
  "That date falls on {0}.": "该日期是{0}。",
  "Add the lengths of the months before month {0}: {1} days. Then add the day {2}: day {3} of the year.": "把第 {0} 月之前各月的天数相加：{1} 天。再加上日 {2}：即一年中的第 {3} 天。",
  "The year {0} has {1} days, so {2} days remain after this date: {1} − {3} = {2}.": "{0} 年共有 {1} 天，所以这一天之后还剩 {2} 天：{1} − {3} = {2}。",
  "The date {0} falls on {1}.": "日期 {0} 是{1}。",
  "Its ISO week number is {0}.": "它的 ISO 周数是 {0}。",
  "Start from the reference date {0} and shift it by {1} calendar days (a negative number moves backward): {2}.": "从参考日期 {0} 开始，移动 {1} 个日历日（负数表示向前倒推）：{2}。",
  "The resulting date falls on {0}.": "得到的日期是{0}。",
  "The size of the shift is {0} days.": "移动的幅度是 {0} 天。",
  "Splitting {0} days into sevens gives {1} weeks and {2} days.": "把 {0} 天按七天一组拆分，得到 {1} 周 {2} 天。",
  "Convert both times to minutes after midnight: {0}:{1} is {2} and {3}:{4} is {5}.": "把两个时间都换算成午夜之后的分钟数：{0}:{1} 是 {2}，{3}:{4} 是 {5}。",
  "The end is earlier than the start, so it is read as the next day: add 1,440 minutes, giving {0}.": "结束时间早于开始时间，所以按次日处理：加上 1,440 分钟，得到 {0}。",
  "The end is not earlier than the start, so both times are on the same day.": "结束时间不早于开始时间，所以两个时间在同一天。",
  "Gross span: {0} − {1} = {2} minutes, which is {3} hours.": "总时长：{0} − {1} = {2} 分钟，即 {3} 小时。",
  "Subtract the {0}-minute unpaid break: {1} − {0} = {2} minutes.": "减去 {0} 分钟的无薪休息：{1} − {0} = {2} 分钟。",
  "{0} minutes is {1} hr {2} min, or {3} in decimal hours.": "{0} 分钟即 {1} 小时 {2} 分钟，或十进制小时 {3}。",
  "Count whole calendar months from the earlier date {0}: {1} months later is {2}.": "从较早的日期 {0} 起数完整的日历月：{1} 个月之后是 {2}。",
  "From {0} to {1} there are {2} days left over.": "从 {0} 到 {1} 还剩 {2} 天。",
  "Counting every calendar day from {0} to {1} gives {2} days in total.": "把 {0} 到 {1} 之间的每个日历日都算上，总共 {2} 天。",
  "The decimal view divides the days by a fixed average month of 30.436875 days: {0} ÷ 30.436875 = {1}.": "十进制视图用天数除以固定的平均月长 30.436875 天：{0} ÷ 30.436875 = {1}。",
  "Count the calendar days between {0} and {1}: {2} days.": "数一数 {0} 与 {1} 之间的日历天数：{2} 天。",
  "Divide by 7: {0} ÷ 7 = {1} weeks.": "除以 7：{0} ÷ 7 = {1} 周。",
  "Full weeks and leftover days: {0} × 7 + {1} = {2}, so {0} full weeks and {1} days.": "整周数和剩余天数：{0} × 7 + {1} = {2}，即 {0} 整周 {1} 天。",
  "The later of the two dates is {0}.": "两个日期中较晚的是 {0}。",
  "Convert the start time to minutes after midnight: {0}:{1} is {2} minutes.": "把起始时间换算成午夜之后的分钟数：{0}:{1} 是 {2} 分钟。",
  "Convert the addition to minutes: {0} × 60 + {1} = {2} minutes.": "把增量换算成分钟：{0} × 60 + {1} = {2} 分钟。",
  "Add them: {0} + {1} = {2} minutes.": "相加：{0} + {1} = {2} 分钟。",
  "{0} minutes is {1}, still the same day.": "{0} 分钟即 {1}，仍在同一天。",
  "The sum is outside one day (0 to 1,439), so it wraps by {0} day(s) to {1} minutes after midnight, which reads {2}.": "总和超出了一天（0 到 1,439），因此回绕 {0} 天，变为午夜之后 {1} 分钟，即 {2}。",
  "Count back 266 days from the due date {0} to estimate conception: {1}.": "从预产期 {0} 倒推 266 天来估算受孕日期：{1}。",
  "Count back 280 days from the due date to estimate the last menstrual period: {0}.": "从预产期倒推 280 天来估算末次月经：{0}。",
  "From {0} to the reference date {1} is {2} days, which is {3} weeks and {4} days.": "从 {0} 到参考日期 {1} 共 {2} 天，即 {3} 周 {4} 天。",
  "From the reference date to the due date is {0} days.": "从参考日期到预产期共 {0} 天。",
  "Today is {0} on this device and the target date is {1}.": "此设备上的今天是 {0}，目标日期是 {1}。",
  "Counting whole calendar days from today to the target date gives {0} days.": "统计从今天到目标日期之间完整的日历天数，得到 {0} 天。",
  "The target is in the future, so the count goes down by one each day until then.": "目标在未来，所以在那之前天数每天减少一天。",
  "The target date has already passed, so the count shows the days since then.": "目标日期已经过去，所以天数显示的是此后经过的天数。",
  "The target is today, so the count is 0.": "目标就是今天，所以天数为 0。",
  "Dividing {0} days by 7 gives {1} weeks (rounded to one decimal).": "{0} 天除以 7 得 {1} 周（保留一位小数）。",
  "Span: {0} − {1} = {2} minutes.": "时长：{0} − {1} = {2} 分钟。",
  "Take the first day of the last period: {0}.": "取末次月经的第一天：{0}。",
  "Add 280 days (40 weeks) to get the estimated due date: {0}.": "加上 280 天（40 周），得到预产期：{0}。",
  "Add 14 days to estimate conception: {0}.": "加上 14 天来估算受孕日期：{0}。",
  "The weeks line shows the 40-week pregnancy length that the model assumes.": "周数一行显示模型所假定的 40 周孕期长度。",
  "Add the cycle length to the first day of the last period: {0} + {1} days = {2}. That is the estimated next period.": "把周期长度加到末次月经第一天上：{0} + {1} 天 = {2}。这就是预计的下次月经。",
  "Count back 14 days from the next period: the estimated ovulation date is {0}.": "从下次月经倒推 14 天：预计排卵日是 {0}。",
  "The fertile window runs from 5 days before to 1 day after that date: {0} to {1}.": "受孕窗口从该日期前 5 天到后 1 天：{0} 至 {1}。"
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
  "undefined": "hindi tinukoy",
  "Count the digits after the decimal point: there are {0}, so write the number over 10^{0} = {1}: {2}/{1}.": "Bilangin ang mga digit pagkatapos ng decimal point: {0} ang mga ito, kaya isulat ang bilang sa ibabaw ng 10^{0} = {1}: {2}/{1}.",
  "Find the greatest common factor of {0} and {1}: it is {2}.": "Hanapin ang pinakamalaking karaniwang salik ng {0} at {1}: ito ay {2}.",
  "Divide the top and the bottom by {0}: {1} ÷ {0} = {2} and {3} ÷ {0} = {4}.": "Hatiin ang itaas at ibaba sa {0}: {1} ÷ {0} = {2} at {3} ÷ {0} = {4}.",
  "The fraction in lowest terms is {0}.": "Ang praksyon sa pinakamababang termino ay {0}.",
  "Multiply the whole number by the denominator: {0} × {1} = {2}.": "Paramihin ang buong bilang sa denominator: {0} × {1} = {2}.",
  "Add the numerator: {0} + {1} = {2}, so the improper fraction is {2}/{3}.": "Idagdag ang numerator: {0} + {1} = {2}, kaya ang improper na praksyon ay {2}/{3}.",
  "The page shows it as {0}. Divide the top by the bottom to check: {1} ÷ {2} = {3}.": "Ipinapakita ito ng pahina bilang {0}. Hatiin ang itaas sa ibaba para suriin: {1} ÷ {2} = {3}.",
  "Divide the top by the bottom: {0} ÷ {1} = {2} with a remainder.": "Hatiin ang itaas sa ibaba: {0} ÷ {1} = {2} na may natira.",
  "The whole part is {0}. The remainder is what is left over: {1} − {2} × {0} = {3}.": "Ang buong bahagi ay {0}. Ang natira ay ang matitira: {1} − {2} × {0} = {3}.",
  "Put the remainder over the original denominator: {0}/{1}. The mixed number is {2}.": "Ilagay ang natira sa ibabaw ng orihinal na denominator: {0}/{1}. Ang mixed number ay {2}.",
  "Divide by the smallest prime that fits, again and again, until nothing is left: {0}.": "Hatiin sa pinakamaliit na prime na akma, paulit-ulit, hanggang wala nang matira: {0}.",
  "Collect the primes that were used: {0}.": "Tipunin ang mga prime na ginamit: {0}.",
  "Check: multiplying these primes gives back {0}.": "Pagsusuri: ang pagpaparami ng mga prime na ito ay nagbabalik ng {0}.",
  "The number of divisors is the product of (exponent + 1) for each prime: {0}.": "Ang bilang ng mga divisor ay ang produkto ng (exponent + 1) para sa bawat prime: {0}.",
  "Move the decimal point until one non-zero digit is left in front of it. The power of 10 is {0}.": "Ilipat ang decimal point hanggang isang digit na hindi zero na lang ang nasa unahan. Ang kapangyarihan ng 10 ay {0}.",
  "Keep {0} significant figures for the front number: {1}.": "Panatilihin ang {0} makabuluhang digit para sa bilang sa unahan: {1}.",
  "Write it as the front number times 10 to that power: {0}.": "Isulat ito bilang bilang sa unahan beses 10 sa kapangyarihang iyon: {0}.",
  "In E notation this is {0}.": "Sa E notation ito ay {0}.",
  "Subtract the birth date {0} from the reference date {1}, counting whole years first, then months, then days: {2} years, {3} months, {4} days.": "Ibawas ang petsa ng kapanganakan {0} sa petsa ng sanggunian {1}, bilangin muna ang buong taon, saka buwan, saka araw: {2} taon, {3} buwan, {4} araw.",
  "Counting every calendar day from {0} to {1} gives {2} days.": "Sa pagbilang ng bawat araw sa kalendaryo mula {0} hanggang {1}, may {2} araw.",
  "Dividing {0} days by 7 gives {1} weeks (rounded to two decimals).": "Ang paghahati ng {0} araw sa 7 ay {1} linggo (naka-round sa dalawang decimal).",
  "The next birthday after the reference date is {0}.": "Ang susunod na kaarawan pagkatapos ng petsa ng sanggunian ay {0}.",
  "Start on {0} and count {1} business days, skipping Saturdays and Sundays.": "Magsimula sa {0} at bilangin ang {1} araw ng negosyo, nilalaktawan ang Sabado at Linggo.",
  "The count ends on {0}, which is {1} calendar days away.": "Nagtatapos ang bilang sa {0}, na {1} araw sa kalendaryo ang layo.",
  "{0} calendar days minus {1} business days leaves {2} weekend days that were skipped.": "Ang {0} araw sa kalendaryo bawas ang {1} araw ng negosyo ay nag-iiwan ng {2} araw ng weekend na nilaktawan.",
  "The end date falls on {0}.": "Ang petsa ng pagtatapos ay pumapatak sa {0}.",
  "Start from the date {0}.": "Magsimula sa petsang {0}.",
  "Move it by {0} calendar days (a negative number moves backward): {1}.": "Ilipat ito ng {0} araw sa kalendaryo (ang negatibong bilang ay paurong): {1}.",
  "Check: {0} plus {1} days is {2}.": "Pagsusuri: ang {0} dagdag {1} araw ay {2}.",
  "That date falls on {0}.": "Ang petsang iyon ay pumapatak sa {0}.",
  "Add the lengths of the months before month {0}: {1} days. Then add the day {2}: day {3} of the year.": "Idagdag ang haba ng mga buwan bago ang buwan {0}: {1} araw. Pagkatapos idagdag ang araw {2}: araw {3} ng taon.",
  "The year {0} has {1} days, so {2} days remain after this date: {1} − {3} = {2}.": "Ang taong {0} ay may {1} araw, kaya {2} araw ang natitira pagkatapos ng petsang ito: {1} − {3} = {2}.",
  "The date {0} falls on {1}.": "Ang petsang {0} ay pumapatak sa {1}.",
  "Its ISO week number is {0}.": "Ang numero nito ng ISO week ay {0}.",
  "Start from the reference date {0} and shift it by {1} calendar days (a negative number moves backward): {2}.": "Magsimula sa petsa ng sanggunian {0} at ilipat ito ng {1} araw sa kalendaryo (ang negatibong bilang ay paurong): {2}.",
  "The resulting date falls on {0}.": "Ang resultang petsa ay pumapatak sa {0}.",
  "The size of the shift is {0} days.": "Ang laki ng paglipat ay {0} araw.",
  "Splitting {0} days into sevens gives {1} weeks and {2} days.": "Ang paghahati ng {0} araw sa grupo ng pito ay {1} linggo at {2} araw.",
  "Convert both times to minutes after midnight: {0}:{1} is {2} and {3}:{4} is {5}.": "I-convert ang parehong oras sa minuto pagkatapos ng hatinggabi: ang {0}:{1} ay {2} at ang {3}:{4} ay {5}.",
  "The end is earlier than the start, so it is read as the next day: add 1,440 minutes, giving {0}.": "Mas maaga ang pagtatapos kaysa sa simula, kaya binabasa ito bilang kinabukasan: idagdag ang 1,440 minuto, na nagbibigay ng {0}.",
  "The end is not earlier than the start, so both times are on the same day.": "Hindi mas maaga ang pagtatapos kaysa sa simula, kaya parehong araw ang dalawang oras.",
  "Gross span: {0} − {1} = {2} minutes, which is {3} hours.": "Gross na pagitan: {0} − {1} = {2} minuto, na {3} oras.",
  "Subtract the {0}-minute unpaid break: {1} − {0} = {2} minutes.": "Ibawas ang {0}-minutong walang bayad na break: {1} − {0} = {2} minuto.",
  "{0} minutes is {1} hr {2} min, or {3} in decimal hours.": "Ang {0} minuto ay {1} oras {2} min, o {3} sa decimal na oras.",
  "Count whole calendar months from the earlier date {0}: {1} months later is {2}.": "Bilangin ang buong buwan sa kalendaryo mula sa mas maagang petsa {0}: ang {1} buwan pagkatapos ay {2}.",
  "From {0} to {1} there are {2} days left over.": "Mula {0} hanggang {1}, may natitirang {2} araw.",
  "Counting every calendar day from {0} to {1} gives {2} days in total.": "Sa pagbilang ng bawat araw sa kalendaryo mula {0} hanggang {1}, may kabuuang {2} araw.",
  "The decimal view divides the days by a fixed average month of 30.436875 days: {0} ÷ 30.436875 = {1}.": "Hinahati ng decimal na tanaw ang mga araw sa nakatakdang karaniwang buwan na 30.436875 araw: {0} ÷ 30.436875 = {1}.",
  "Count the calendar days between {0} and {1}: {2} days.": "Bilangin ang mga araw sa kalendaryo sa pagitan ng {0} at {1}: {2} araw.",
  "Divide by 7: {0} ÷ 7 = {1} weeks.": "Hatiin sa 7: {0} ÷ 7 = {1} linggo.",
  "Full weeks and leftover days: {0} × 7 + {1} = {2}, so {0} full weeks and {1} days.": "Buong linggo at natirang araw: {0} × 7 + {1} = {2}, kaya {0} buong linggo at {1} araw.",
  "The later of the two dates is {0}.": "Ang mas huli sa dalawang petsa ay {0}.",
  "Convert the start time to minutes after midnight: {0}:{1} is {2} minutes.": "I-convert ang panimulang oras sa minuto pagkatapos ng hatinggabi: ang {0}:{1} ay {2} minuto.",
  "Convert the addition to minutes: {0} × 60 + {1} = {2} minutes.": "I-convert ang dagdag sa minuto: {0} × 60 + {1} = {2} minuto.",
  "Add them: {0} + {1} = {2} minutes.": "Pagsamahin: {0} + {1} = {2} minuto.",
  "{0} minutes is {1}, still the same day.": "Ang {0} minuto ay {1}, parehong araw pa rin.",
  "The sum is outside one day (0 to 1,439), so it wraps by {0} day(s) to {1} minutes after midnight, which reads {2}.": "Lampas sa isang araw (0 hanggang 1,439) ang kabuuan, kaya nababalot ito ng {0} araw hanggang {1} minuto pagkatapos ng hatinggabi, na nababasa bilang {2}.",
  "Count back 266 days from the due date {0} to estimate conception: {1}.": "Bilangin paurong ang 266 araw mula sa inaasahang petsa ng panganganak na {0} para tantiyahin ang paglilihi: {1}.",
  "Count back 280 days from the due date to estimate the last menstrual period: {0}.": "Bilangin paurong ang 280 araw mula sa inaasahang petsa ng panganganak para tantiyahin ang huling regla: {0}.",
  "From {0} to the reference date {1} is {2} days, which is {3} weeks and {4} days.": "Mula {0} hanggang sa petsa ng sanggunian {1} ay {2} araw, na {3} linggo at {4} araw.",
  "From the reference date to the due date is {0} days.": "Mula sa petsa ng sanggunian hanggang sa inaasahang petsa ng panganganak ay {0} araw.",
  "Today is {0} on this device and the target date is {1}.": "Ngayon ay {0} sa device na ito at ang petsang target ay {1}.",
  "Counting whole calendar days from today to the target date gives {0} days.": "Sa pagbilang ng buong araw sa kalendaryo mula ngayon hanggang sa petsang target, may {0} araw.",
  "The target is in the future, so the count goes down by one each day until then.": "Nasa hinaharap ang target, kaya bumababa ng isa ang bilang bawat araw hanggang noon.",
  "The target date has already passed, so the count shows the days since then.": "Lumipas na ang petsang target, kaya ipinapakita ng bilang ang mga araw mula noon.",
  "The target is today, so the count is 0.": "Ngayon ang target, kaya 0 ang bilang.",
  "Dividing {0} days by 7 gives {1} weeks (rounded to one decimal).": "Ang paghahati ng {0} araw sa 7 ay {1} linggo (naka-round sa isang decimal).",
  "Span: {0} − {1} = {2} minutes.": "Pagitan: {0} − {1} = {2} minuto.",
  "Take the first day of the last period: {0}.": "Kunin ang unang araw ng huling regla: {0}.",
  "Add 280 days (40 weeks) to get the estimated due date: {0}.": "Idagdag ang 280 araw (40 linggo) para makuha ang tinatayang petsa ng panganganak: {0}.",
  "Add 14 days to estimate conception: {0}.": "Idagdag ang 14 araw para tantiyahin ang paglilihi: {0}.",
  "The weeks line shows the 40-week pregnancy length that the model assumes.": "Ipinapakita ng linya ng linggo ang 40-linggong haba ng pagbubuntis na ipinapalagay ng modelo.",
  "Add the cycle length to the first day of the last period: {0} + {1} days = {2}. That is the estimated next period.": "Idagdag ang haba ng siklo sa unang araw ng huling regla: {0} + {1} araw = {2}. Iyon ang tinatayang susunod na regla.",
  "Count back 14 days from the next period: the estimated ovulation date is {0}.": "Bilangin paurong ang 14 araw mula sa susunod na regla: ang tinatayang petsa ng obulasyon ay {0}.",
  "The fertile window runs from 5 days before to 1 day after that date: {0} to {1}.": "Ang fertile window ay mula 5 araw bago hanggang 1 araw pagkatapos ng petsang iyon: {0} hanggang {1}."
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

  var ERRD = {"es": {"Select a valid target date": "Selecciona una fecha objetivo válida", "Enter valid start and end times": "Introduce horas de inicio y fin válidas", "Enter a valid first day of the last period.": "Introduce un primer día válido de la última menstruación.", "Enter a valid period date and a whole cycle length from 15 to 60 days": "Introduce una fecha de menstruación válida y una duración de ciclo entera de 15 a 60 días", "Invalid input": "Entrada no válida", "Enter valid dates": "Introduce fechas válidas", "Enter a valid date and whole business-day count": "Introduce una fecha válida y un número entero de días hábiles", "Result date must be between years 0100 and 9999": "La fecha resultante debe estar entre los años 0100 y 9999", "Enter a valid calendar date": "Introduce una fecha de calendario válida", "Result is outside the supported numeric range": "El resultado queda fuera del rango numérico admitido", "Enter a valid reference date and whole-day offset": "Introduce una fecha de referencia válida y un desplazamiento entero en días", "Enter valid values": "Introduce valores válidos", "Enter two valid dates": "Introduce dos fechas válidas", "Use a valid 24-hour starting time": "Usa una hora inicial válida en formato de 24 horas"}, "zh-CN": {"Select a valid target date": "请选择有效的目标日期", "Enter valid start and end times": "请输入有效的开始和结束时间", "Enter a valid first day of the last period.": "请输入有效的末次月经第一天。", "Enter a valid period date and a whole cycle length from 15 to 60 days": "请输入有效的月经日期，以及 15 到 60 天之间的整数周期长度", "Invalid input": "输入无效", "Enter valid dates": "请输入有效的日期", "Enter a valid date and whole business-day count": "请输入有效的日期和整数工作日数", "Result date must be between years 0100 and 9999": "结果日期必须在 0100 年到 9999 年之间", "Enter a valid calendar date": "请输入有效的日历日期", "Result is outside the supported numeric range": "结果超出了支持的数值范围", "Enter a valid reference date and whole-day offset": "请输入有效的参考日期和整数天数偏移", "Enter valid values": "请输入有效的数值", "Enter two valid dates": "请输入两个有效的日期", "Use a valid 24-hour starting time": "请使用有效的 24 小时制起始时间"}, "fil": {"Select a valid target date": "Pumili ng wastong petsang target", "Enter valid start and end times": "Maglagay ng wastong oras ng simula at pagtatapos", "Enter a valid first day of the last period.": "Maglagay ng wastong unang araw ng huling regla.", "Enter a valid period date and a whole cycle length from 15 to 60 days": "Maglagay ng wastong petsa ng regla at buong haba ng siklo mula 15 hanggang 60 araw", "Invalid input": "Di-wastong input", "Enter valid dates": "Maglagay ng wastong mga petsa", "Enter a valid date and whole business-day count": "Maglagay ng wastong petsa at buong bilang ng araw ng negosyo", "Result date must be between years 0100 and 9999": "Dapat nasa pagitan ng taong 0100 at 9999 ang resultang petsa", "Enter a valid calendar date": "Maglagay ng wastong petsa sa kalendaryo", "Result is outside the supported numeric range": "Lampas sa sinusuportahang saklaw ng numero ang resulta", "Enter a valid reference date and whole-day offset": "Maglagay ng wastong petsa ng sanggunian at buong offset sa araw", "Enter valid values": "Maglagay ng wastong mga halaga", "Enter two valid dates": "Maglagay ng dalawang wastong petsa", "Use a valid 24-hour starting time": "Gumamit ng wastong panimulang oras sa 24-oras na format"}};
  var errObs = null;
  function trErr() {
    var d = ERRD[curLang()]; if (!d) return;
    var x = mr.textContent.trim();
    if (d[x] !== undefined && mr.textContent !== d[x]) { errObs.disconnect(); mr.textContent = d[x]; errObs.observe(mr, {childList: true, characterData: true, subtree: true}); }
  }
  if (window.MutationObserver) { errObs = new MutationObserver(trErr); errObs.observe(mr, {childList: true, characterData: true, subtree: true}); trErr(); }

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

  function gcd2(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var r = a % b; a = b; b = r; } return a; }
  P['decimal-to-fraction-calculator'] = function () {
    var raw = document.getElementById('decimalValue').value.trim(), mx = num('maxDenominator');
    must(/^-?\d*\.?\d+$/.test(raw));
    var neg = raw.charAt(0) === '-', body = neg ? raw.slice(1) : raw, parts = body.split('.'), dec = parts[1] || '';
    must(dec.length <= 9);
    var den = Math.pow(10, dec.length), n = parseInt((parts[0] || '0') + dec, 10), g = gcd2(n, den);
    var rn = n / g, rd = den / g; must(rd <= mx && g >= 1);
    var res = (neg ? '-' : '') + rn + '/' + rd;
    must(plain('mainResult').replace(/\s/g, '') === res || (rd === 1 && plain('mainResult').replace(/\s/g, '') === (neg ? '-' : '') + rn));
    return [
      t('Count the digits after the decimal point: there are {0}, so write the number over 10^{0} = {1}: {2}/{1}.', fmt(dec.length), fmt(den), fmt(n)),
      t('Find the greatest common factor of {0} and {1}: it is {2}.', fmt(n), fmt(den), fmt(g)),
      t('Divide the top and the bottom by {0}: {1} ÷ {0} = {2} and {3} ÷ {0} = {4}.', fmt(g), fmt(n), fmt(rn), fmt(den), fmt(rd)),
      t('The fraction in lowest terms is {0}.', plain('mainResult'))
    ];
  };
  P['mixed-number-calculator'] = function () {
    var w = num('wholeNumber'), n = num('numerator'), d = num('denominator');
    must(d > 0 && w >= 0 && n >= 0 && w === Math.floor(w) && n === Math.floor(n) && d === Math.floor(d));
    var top = w * d + n, g = gcd2(top, d), rt = top / g, rd = d / g;
    var m = plain('mainResult').replace(/\s/g, '');
    must(m === top + '/' + d || m === rt + '/' + rd || (rd === 1 && m === String(rt)));
    must(close(top / d, pn(plain('decimalOut'))));
    return [
      t('Multiply the whole number by the denominator: {0} × {1} = {2}.', fmt(w), fmt(d), fmt(w * d)),
      t('Add the numerator: {0} + {1} = {2}, so the improper fraction is {2}/{3}.', fmt(w * d), fmt(n), fmt(top), fmt(d)),
      t('The page shows it as {0}. Divide the top by the bottom to check: {1} ÷ {2} = {3}.', plain('mainResult'), fmt(top), fmt(d), fmt(top / d))
    ];
  };
  P['improper-fraction-to-mixed-number-calculator'] = function () {
    var n = num('numerator'), d = num('denominator'); must(d > 0 && n >= 0 && n === Math.floor(n) && d === Math.floor(d));
    var q = Math.floor(n / d), r = n % d;
    var rg = r ? gcd2(r, d) : 1; must(q === pn(plain('quotientOut'))); must(r === pn(plain('remainderOut')) || r / rg === pn(plain('remainderOut')));
    return [
      t('Divide the top by the bottom: {0} ÷ {1} = {2} with a remainder.', fmt(n), fmt(d), fmt(q)),
      t('The whole part is {0}. The remainder is what is left over: {1} − {2} × {0} = {3}.', fmt(q), fmt(n), fmt(d), fmt(r)),
      t('Put the remainder over the original denominator: {0}/{1}. The mixed number is {2}.', fmt(r), fmt(d), plain('mainResult'))
    ];
  };
  P['prime-factorization-calculator'] = function () {
    var n = num('numberValue'); must(n >= 2 && n === Math.floor(n) && n <= 1e9);
    var x = n, f = [], p, e, lines = [];
    for (p = 2; p * p <= x; p += (p === 2 ? 1 : 2)) { e = 0; while (x % p === 0) { x /= p; e++; lines.push(fmt(x * p) + ' ÷ ' + p + ' = ' + fmt(x)); } if (e) f.push([p, e]); }
    if (x > 1) f.push([x, 1]);
    must(f.length > 1 || f[0][1] > 1);
    var s = f.map(function (a) { return a[1] > 1 ? a[0] + '^' + a[1] : String(a[0]); }).join(' × ');
    must(plain('mainResult').replace(/\s/g, '') === s.replace(/\s/g, ''));
    var dc = 1; f.forEach(function (a) { dc *= a[1] + 1; }); must(dc === pn(plain('divisorCountOut')));
    if (lines.length > 8) lines = lines.slice(0, 6).concat(['…']);
    return [
      t('Divide by the smallest prime that fits, again and again, until nothing is left: {0}.', lines.join('; ')),
      t('Collect the primes that were used: {0}.', plain('mainResult')),
      t('Check: multiplying these primes gives back {0}.', fmt(n)),
      t('The number of divisors is the product of (exponent + 1) for each prime: {0}.', fmt(dc))
    ];
  };
  P['scientific-notation-calculator'] = function () {
    var x = num('numberValue'), s = num('sigFigs'); must(x !== 0 && s >= 1 && s === Math.floor(s) && s <= 15);
    var ex = x.toExponential(s - 1).split('e'), co = parseFloat(ex[0]), m = parseInt(ex[1], 10);
    must(m === pn(plain('exponentOut'))); must(close(co, parseFloat(plain('coefficientOut')), 1e-9));
    return [
      t('Move the decimal point until one non-zero digit is left in front of it. The power of 10 is {0}.', fmt(m)),
      t('Keep {0} significant figures for the front number: {1}.', fmt(s), plain('coefficientOut')),
      t('Write it as the front number times 10 to that power: {0}.', plain('mainResult')),
      t('In E notation this is {0}.', plain('eNotationOut'))
    ];
  };

  /* ---- Batch 18: date and time pages ---- */
  function fe(x) { return Number(x).toLocaleString(locale(), {maximumFractionDigits: 8}); }
  function ints(s) { var sp = seps(), x = String(s).replace(/[\u2212]/g, '-'); x = x.replace(new RegExp('(\\d)' + (sp.g === '.' ? '\\.' : sp.g.replace(/[\s\u00a0\u202f]/g, '[\\s\\u00a0\\u202f]')) + '(?=\\d{3})', 'g'), '$1'); return (x.match(/-?\d+/g) || []).map(Number); }
  function pe(s) { return pn(s); }
  function mk(y, m, d) {
    must(y === Math.floor(y) && m === Math.floor(m) && d === Math.floor(d) && y >= 1 && y <= 9999 && m >= 1 && m <= 12 && d >= 1 && d <= 31);
    var dt = new Date(Date.UTC(2000, 0, 1)); dt.setUTCFullYear(y, m - 1, d);
    must(dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d);
    return dt;
  }
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function iso(dt) { var y = dt.getUTCFullYear(); return (y < 1000 ? ('000' + y).slice(-4) : String(y)) + '-' + p2(dt.getUTCMonth() + 1) + '-' + p2(dt.getUTCDate()); }
  function dd(a, b) { return Math.round((b.getTime() - a.getTime()) / 86400000); }
  function addd(dt, n) { return new Date(dt.getTime() + n * 86400000); }
  function dim(y, m) { var x = new Date(Date.UTC(2000, 0, 1)); x.setUTCFullYear(y, m, 0); return x.getUTCDate(); }
  function addm(dt, k) {
    var t0 = dt.getUTCFullYear() * 12 + dt.getUTCMonth() + k, y = Math.floor(t0 / 12), m = t0 % 12;
    var d = Math.min(dt.getUTCDate(), dim(y, m + 1)); var x = new Date(Date.UTC(2000, 0, 1)); x.setUTCFullYear(y, m, d); return x;
  }
  function isoDate(s) { var m = String(s).trim().match(/^(\d{4})-(\d{2})-(\d{2})$/); must(m); return mk(+m[1], +m[2], +m[3]); }
  function vi(id) { return num(id); }
  P['age-specific-date-calculator'] = function () {
    var b = mk(vi('birthYear'), vi('birthMonth'), vi('birthDay')), r = mk(vi('refYear'), vi('refMonth'), vi('refDay'));
    must(r >= b);
    var k = (r.getUTCFullYear() - b.getUTCFullYear()) * 12 + r.getUTCMonth() - b.getUTCMonth();
    while (k > 0 && addm(b, k) > r) k--;
    while (addm(b, k + 1) <= r) k++;
    var d = dd(addm(b, k), r), y = Math.floor(k / 12), m = k % 12;
    var mr1 = ints(plain('mainResult')); must(mr1.length === 3 && mr1[0] === y && mr1[1] === m && mr1[2] === d);
    var days = dd(b, r); must(days === pe(plain('daysOut')));
    var wk = days / 7; must(Math.abs(wk - pe(plain('weeksOut'))) < 0.006);
    var nb = addm(b, 12 * (r.getUTCFullYear() - b.getUTCFullYear())); if (nb < r) nb = addm(b, 12 * (r.getUTCFullYear() - b.getUTCFullYear() + 1));
    must(iso(nb) === plain('nextOut'));
    return [
      t('Subtract the birth date {0} from the reference date {1}, counting whole years first, then months, then days: {2} years, {3} months, {4} days.', iso(b), iso(r), fe(y), fe(m), fe(d)),
      t('Counting every calendar day from {0} to {1} gives {2} days.', iso(b), iso(r), fe(days)),
      t('Dividing {0} days by 7 gives {1} weeks (rounded to two decimals).', fe(days), (Math.round(wk * 100) / 100).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})),
      t('The next birthday after the reference date is {0}.', iso(nb))
    ];
  };
  P['business-days-calculator'] = function () {
    var s = mk(vi('year'), vi('month'), vi('day')), n = vi('businessDays'); must(n === Math.floor(n) && Math.abs(n) <= 100000);
    var cur = s, left = Math.abs(n), st = n < 0 ? -1 : 1;
    while (left > 0) { cur = addd(cur, st); var w = cur.getUTCDay(); if (w !== 0 && w !== 6) left--; }
    var cal = Math.abs(dd(s, cur)); must(iso(cur) === plain('mainResult')); must(cal === pe(plain('calendarOut')));
    var we = cal - Math.abs(n); must(we === pe(plain('weekendOut')));
    return [
      t('Start on {0} and count {1} business days, skipping Saturdays and Sundays.', iso(s), fe(n)),
      t('The count ends on {0}, which is {1} calendar days away.', iso(cur), fe(cal)),
      t('{0} calendar days minus {1} business days leaves {2} weekend days that were skipped.', fe(cal), fe(Math.abs(n)), fe(we)),
      t('The end date falls on {0}.', plain('weekdayOut'))
    ];
  };
  P['date-calculator'] = function () {
    var s = mk(vi('year'), vi('month'), vi('day')), n = vi('offset'); must(n === Math.floor(n) && Math.abs(n) <= 3000000);
    var e = addd(s, n); must(iso(e) === plain('mainResult') && iso(s) === plain('startOut'));
    var oi = ints(plain('offsetOut')); must(oi.length === 1 && oi[0] === n);
    return [
      t('Start from the date {0}.', iso(s)),
      t('Move it by {0} calendar days (a negative number moves backward): {1}.', fe(n), iso(e)),
      t('Check: {0} plus {1} days is {2}.', iso(s), fe(n), iso(e)),
      t('That date falls on {0}.', plain('weekdayOut'))
    ];
  };
  P['day-of-week-calculator'] = function () {
    var y = vi('year'), m = vi('month'), d = vi('day'), dt = mk(y, m, d);
    var jan1 = mk(y, 1, 1), doy = dd(jan1, dt) + 1, len = dd(jan1, mk(y + 1 > 9999 ? y : y + 1, 1, 1)); if (y + 1 > 9999) len = 365;
    var rem = len - doy; must(doy === pe(plain('dayYearOut')) && rem === pe(plain('remainingOut')));
    var wd = (dt.getUTCDay() + 6) % 7, th = addd(dt, 3 - wd), wk = Math.floor((dd(mk(th.getUTCFullYear(), 1, 1), th)) / 7) + 1;
    must(wk === pe(plain('weekOut')));
    var before = doy - d;
    return [
      t('Add the lengths of the months before month {0}: {1} days. Then add the day {2}: day {3} of the year.', fe(m), fe(before), fe(d), fe(doy)),
      t('The year {0} has {1} days, so {2} days remain after this date: {1} − {3} = {2}.', String(y), fe(len), fe(rem), fe(doy)),
      t('The date {0} falls on {1}.', iso(dt), plain('mainResult')),
      t('Its ISO week number is {0}.', fe(wk))
    ];
  };
  P['days-from-today-calculator'] = function () {
    var s = mk(vi('year'), vi('month'), vi('day')), n = vi('daysToAdd'); must(n === Math.floor(n) && Math.abs(n) <= 3000000);
    var e = addd(s, n); must(iso(e) === plain('mainResult'));
    var a = Math.abs(n), w = Math.floor(a / 7), r = a % 7;
    must(pe(plain('differenceOut')) === a); var wi = ints(plain('weeksOut')); must(wi.length === 2 && wi[0] === w && wi[1] === r);
    return [
      t('Start from the reference date {0} and shift it by {1} calendar days (a negative number moves backward): {2}.', iso(s), fe(n), iso(e)),
      t('The resulting date falls on {0}.', plain('weekdayOut')),
      t('The size of the shift is {0} days.', fe(a)),
      t('Splitting {0} days into sevens gives {1} weeks and {2} days.', fe(a), fe(w), fe(r))
    ];
  };
  P['hours-calculator'] = function () {
    var sh = vi('startHour'), sm = vi('startMinute'), eh = vi('endHour'), em = vi('endMinute'), br = vi('breakMinutes');
    must(sh >= 0 && sh <= 23 && eh >= 0 && eh <= 23 && sm >= 0 && sm <= 59 && em >= 0 && em <= 59 && br >= 0);
    var s = sh * 60 + sm, e = eh * 60 + em, over = e < s; if (over) e += 1440;
    var g = e - s, net = g - br; must(net >= 0);
    var mr1 = ints(plain('mainResult')); must(mr1.length === 2 && mr1[0] * 60 + mr1[1] === net);
    must(Math.abs(g / 60 - pe(plain('grossOut'))) < 0.006 && net === pe(plain('minutesOut')) && Math.abs(net / 60 - pe(plain('decimalOut'))) < 0.006);
    var out = [
      t('Convert both times to minutes after midnight: {0}:{1} is {2} and {3}:{4} is {5}.', p2(sh), p2(sm), fe(s), p2(eh), p2(em), fe(over ? e - 1440 : e))
    ];
    out.push(over ? t('The end is earlier than the start, so it is read as the next day: add 1,440 minutes, giving {0}.', fe(e)) : t('The end is not earlier than the start, so both times are on the same day.'));
    out.push(t('Gross span: {0} − {1} = {2} minutes, which is {3} hours.', fe(e), fe(s), fe(g), fe(g / 60)));
    out.push(t('Subtract the {0}-minute unpaid break: {1} − {0} = {2} minutes.', fe(br), fe(g), fe(net)));
    out.push(t('{0} minutes is {1} hr {2} min, or {3} in decimal hours.', fe(net), fe(Math.floor(net / 60)), fe(net % 60), fe(net / 60)));
    return out;
  };
  P['months-between-dates-calculator'] = function () {
    var a = mk(vi('y1'), vi('m1'), vi('d1')), b = mk(vi('y2'), vi('m2'), vi('d2'));
    if (a > b) { var tmp = a; a = b; b = tmp; }
    var k = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + b.getUTCMonth() - a.getUTCMonth();
    while (k > 0 && addm(a, k) > b) k--;
    while (addm(a, k + 1) <= b) k++;
    var an = addm(a, k), r = dd(an, b), days = dd(a, b);
    must(ints(plain('mainResult'))[0] === k && pe(plain('remainingOut')) === r && pe(plain('daysOut')) === days);
    var dec = days / 30.436875; must(Math.abs(dec - pe(plain('decimalOut'))) < 1e-6);
    return [
      t('Count whole calendar months from the earlier date {0}: {1} months later is {2}.', iso(a), fe(k), iso(an)),
      t('From {0} to {1} there are {2} days left over.', iso(an), iso(b), fe(r)),
      t('Counting every calendar day from {0} to {1} gives {2} days in total.', iso(a), iso(b), fe(days)),
      t('The decimal view divides the days by a fixed average month of 30.436875 days: {0} ÷ 30.436875 = {1}.', fe(days), plain('decimalOut'))
    ];
  };
  P['weeks-between-dates-calculator'] = function () {
    var a = mk(vi('y1'), vi('m1'), vi('d1')), b = mk(vi('y2'), vi('m2'), vi('d2'));
    var days = Math.abs(dd(a, b)), raw = days / 7, w = Math.floor(days / 7), r = days % 7;
    must(Math.abs(raw - pe(plain('mainResult'))) < 1e-6 && pe(plain('daysOut')) === days && pe(plain('fullWeeksOut')) === w && pe(plain('remainingOut')) === r);
    var out = [
      t('Count the calendar days between {0} and {1}: {2} days.', iso(a), iso(b), fe(days)),
      t('Divide by 7: {0} ÷ 7 = {1} weeks.', fe(days), plain('mainResult')),
      t('Full weeks and leftover days: {0} × 7 + {1} = {2}, so {0} full weeks and {1} days.', fe(w), fe(r), fe(days))
    ];
    if (days > 0) out.push(t('The later of the two dates is {0}.', iso(a > b ? a : b)));
    return out;
  };
  P['time-calculator'] = function () {
    var sh = vi('startHour'), sm = vi('startMinute'), ah = vi('addHours'), am = vi('addMinutes');
    must(sh >= 0 && sh <= 23 && sm >= 0 && sm <= 59 && ah === Math.floor(ah) && am === Math.floor(am));
    var s = sh * 60 + sm, tot = ah * 60 + am, sum = s + tot, shift = Math.floor(sum / 1440), res = ((sum % 1440) + 1440) % 1440;
    var hm = plain('mainResult').match(/(\d{1,2}):(\d{2})/); must(hm && (+hm[1]) * 60 + (+hm[2]) === res);
    must(pe(plain('totalOut')) === tot && pe(plain('minuteOut')) === res);
    var out = [
      t('Convert the start time to minutes after midnight: {0}:{1} is {2} minutes.', p2(sh), p2(sm), fe(s)),
      t('Convert the addition to minutes: {0} × 60 + {1} = {2} minutes.', fe(ah), fe(am), fe(tot)),
      t('Add them: {0} + {1} = {2} minutes.', fe(s), fe(tot), fe(sum))
    ];
    out.push(shift === 0 ? t('{0} minutes is {1}, still the same day.', fe(sum), p2(Math.floor(res / 60)) + ':' + p2(res % 60)) : t('The sum is outside one day (0 to 1,439), so it wraps by {0} day(s) to {1} minutes after midnight, which reads {2}.', fe(shift), fe(res), p2(Math.floor(res / 60)) + ':' + p2(res % 60)));
    return out;
  };
  P['pregnancy-conception-calculator'] = function () {
    var due = mk(vi('dueYear'), vi('dueMonth'), vi('dueDay')), ref = mk(vi('refYear'), vi('refMonth'), vi('refDay'));
    var con = addd(due, -266), lmp = addd(due, -280), rem = dd(ref, due), g = dd(lmp, ref); must(g >= 0);
    must(iso(con) === plain('mainResult') && iso(lmp) === plain('lmpOut') && rem === pe(plain('remainingOut')));
    var gi = ints(plain('gestationOut')); must(gi.length === 2 && gi[0] === Math.floor(g / 7) && gi[1] === g % 7);
    return [
      t('Count back 266 days from the due date {0} to estimate conception: {1}.', iso(due), iso(con)),
      t('Count back 280 days from the due date to estimate the last menstrual period: {0}.', iso(lmp)),
      t('From {0} to the reference date {1} is {2} days, which is {3} weeks and {4} days.', iso(lmp), iso(ref), fe(g), fe(Math.floor(g / 7)), fe(g % 7)),
      t('From the reference date to the due date is {0} days.', fe(rem))
    ];
  };

  /* ---- Batch 19: date picker pages ---- */
  function enp(s) { var m = String(s).replace(/[\u2212]/g, '-').replace(/,(?=\d{3})/g, '').match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : NaN; }
  function eqn(id, target, tol) { var s = plain(id), c = [enp(s), pn(s), parseFloat(String(s).replace(',', '.'))]; return c.some(function (v) { return isFinite(v) && Math.abs(v - target) <= (tol || 1e-9); }); }
  function hasDate(id, dt) { var a = ints(plain(id)); return a.indexOf(dt.getUTCDate()) >= 0 && a.indexOf(dt.getUTCFullYear()) >= 0; }
  function dval(id) { var v = (document.getElementById(id).value || '').trim(); return isoDate(v); }
  P['days-until'] = function () {
    var tg = dval('target'), now = new Date(), td = mk(now.getFullYear(), now.getMonth() + 1, now.getDate());
    var n = dd(td, tg), a = Math.abs(n);
    var mi = ints(plain('mainResult')); must(mi.length >= 1 && Math.abs(mi[0]) === a);
    must(eqn('weeks', Math.round(a / 7 * 10) / 10, 0.051));
    return [
      t('Today is {0} on this device and the target date is {1}.', iso(td), iso(tg)),
      t('Counting whole calendar days from today to the target date gives {0} days.', fe(a)),
      n > 0 ? t('The target is in the future, so the count goes down by one each day until then.') : n < 0 ? t('The target date has already passed, so the count shows the days since then.') : t('The target is today, so the count is 0.'),
      t('Dividing {0} days by 7 gives {1} weeks (rounded to one decimal).', fe(a), (Math.round(a / 7 * 10) / 10).toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1}))
    ];
  };
  P['time-duration'] = function () {
    var sv = document.getElementById('start').value, ev = document.getElementById('end').value;
    var sm = sv.match(/^(\d{1,2}):(\d{2})$/), em = ev.match(/^(\d{1,2}):(\d{2})$/); must(sm && em);
    var s = (+sm[1]) * 60 + (+sm[2]), e = (+em[1]) * 60 + (+em[2]); must(s < 1440 && e < 1440 && +sm[2] < 60 && +em[2] < 60);
    var over = e < s; if (over) e += 1440; var g = e - s;
    var mi = ints(plain('mainResult')); must(mi.length === 2 && mi[0] * 60 + mi[1] === g);
    must(pe(plain('minutes')) === g && Math.abs(g / 60 - enp(plain('decimal'))) < 0.006);
    var out = [t('Convert both times to minutes after midnight: {0}:{1} is {2} and {3}:{4} is {5}.', p2(+sm[1]), sm[2], fe(s), p2(+em[1]), em[2], fe(over ? e - 1440 : e))];
    out.push(over ? t('The end is earlier than the start, so it is read as the next day: add 1,440 minutes, giving {0}.', fe(e)) : t('The end is not earlier than the start, so both times are on the same day.'));
    out.push(t('Span: {0} − {1} = {2} minutes.', fe(e), fe(s), fe(g)));
    out.push(t('{0} minutes is {1} hr {2} min, or {3} in decimal hours.', fe(g), fe(Math.floor(g / 60)), fe(g % 60), (Math.round(g / 60 * 100) / 100).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})));
    return out;
  };
  P['pregnancy-due-date'] = function () {
    var l = dval('lmp'), due = addd(l, 280), con = addd(l, 14);
    must(hasDate('mainResult', due) && hasDate('conception', con) && ints(plain('weeks'))[0] === 40);
    return [
      t('Take the first day of the last period: {0}.', iso(l)),
      t('Add 280 days (40 weeks) to get the estimated due date: {0}.', iso(due)),
      t('Add 14 days to estimate conception: {0}.', iso(con)),
      t('The weeks line shows the 40-week pregnancy length that the model assumes.')
    ];
  };
  P['ovulation'] = function () {
    var p = dval('period'), c = vi('cycle'); must(c === Math.floor(c) && c >= 15 && c <= 60);
    var nx = addd(p, c), ov = addd(nx, -14), f1 = addd(ov, -5), f2 = addd(ov, 1);
    var fa = ints(plain('fertile'));
    must(hasDate('mainResult', ov) && hasDate('nextPeriod', nx) && fa.indexOf(f1.getUTCDate()) >= 0 && fa.indexOf(f2.getUTCDate()) >= 0 && fa.indexOf(f1.getUTCFullYear()) >= 0);
    return [
      t('Add the cycle length to the first day of the last period: {0} + {1} days = {2}. That is the estimated next period.', iso(p), fe(c), iso(nx)),
      t('Count back 14 days from the next period: the estimated ovulation date is {0}.', iso(ov)),
      t('The fertile window runs from 5 days before to 1 day after that date: {0} to {1}.', iso(f1), iso(f2))
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
