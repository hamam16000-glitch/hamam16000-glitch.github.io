/* "Where the typical estimate goes" + "What moves this estimate most": a cost breakdown and a
   10% sensitivity check for sum-style cost estimators. The calculation is a copy of the page's
   formula (window.DCH_COST.calc), so every figure matches what the page itself would show for the
   same entries. These are comparisons, not quotes or forecasts. */
(function () {
  'use strict';

  var box = document.getElementById('costBox'), S = window.DCH_COST;

  if (!box || !S || !window.DCHCalculator) return;

  var D = {
    es: {
      'Where the typical estimate goes': 'Adónde va la estimación típica',
      'Typical total as entered: {0}.': 'Total típico tal como se introdujo: {0}.',
      'Part': 'Parte', 'Amount': 'Importe', 'Share of typical': 'Parte del típico',
      'Split of the typical total into parts': 'División del total típico en partes',
      'The typical total is split into the units at your typical rate, your fixed costs, and the contingency percentage applied to both.': 'El total típico se divide en las unidades a tu tarifa típica, tus costos fijos y el porcentaje de contingencia aplicado a ambos.',
      'What moves this estimate most': 'Qué mueve más esta estimación',
      'Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.': 'Cada fila cambia una entrada en un 10% de su propio valor y vuelve a ejecutar la aritmética de la calculadora. Las demás entradas quedan como las escribiste. Son comparaciones, no cotizaciones ni pronósticos.',
      'Effect of a 10% change in each entry, largest first': 'Efecto de un cambio del 10% en cada entrada, de mayor a menor',
      'Entry': 'Entrada', '10% lower': '10% menos', '10% higher': '10% más', 'Swing': 'Variación',
      'n/a': 'n/d',
      'The entry with the largest swing is "{0}": a 10% change moves the typical total between {1} and {2}.': 'La entrada con mayor variación es "{0}": un cambio del 10% mueve el total típico entre {1} y {2}.',
      'Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.': 'Las filas marcadas n/d quedan fuera del rango que acepta la calculadora. Las entradas de números enteros solo se prueban con números enteros, así que una fila puede mostrar n/d cuando el 10% de la entrada no es un número entero.'
    },
    'zh-CN': {
      'Where the typical estimate goes': '典型估算的构成',
      'Typical total as entered: {0}.': '按当前输入的典型总额：{0}。',
      'Part': '部分', 'Amount': '金额', 'Share of typical': '占典型总额比例',
      'Split of the typical total into parts': '典型总额的构成拆分',
      'The typical total is split into the units at your typical rate, your fixed costs, and the contingency percentage applied to both.': '典型总额由三部分构成：按典型单价计算的数量费用、固定费用，以及应用于这两者的应急费百分比。',
      'What moves this estimate most': '哪些输入对估算影响最大',
      'Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.': '每一行只把一个输入改动其自身数值的 10%，并重新运行计算器自身的算术，其余输入保持您填写的值。这些只是对比，不是报价或预测。',
      'Effect of a 10% change in each entry, largest first': '每个输入变动 10% 的影响，按影响从大到小排列',
      'Entry': '输入项', '10% lower': '降低 10%', '10% higher': '提高 10%', 'Swing': '变动幅度',
      'n/a': '不适用',
      'The entry with the largest swing is "{0}": a 10% change moves the typical total between {1} and {2}.': '变动幅度最大的输入项是“{0}”：变动 10% 会使典型总额在 {1} 与 {2} 之间变化。',
      'Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.': '标记为“不适用”的行超出了计算器可接受的范围。整数类输入只按整数测试，因此当输入的 10% 不是整数时，该行可能显示“不适用”。'
    },
    fil: {
      'Where the typical estimate goes': 'Saan napupunta ang tipikal na tantiya',
      'Typical total as entered: {0}.': 'Tipikal na kabuuan ayon sa inilagay: {0}.',
      'Part': 'Bahagi', 'Amount': 'Halaga', 'Share of typical': 'Bahagi ng tipikal',
      'Split of the typical total into parts': 'Paghahati ng tipikal na kabuuan sa mga bahagi',
      'The typical total is split into the units at your typical rate, your fixed costs, and the contingency percentage applied to both.': 'Hinahati ang tipikal na kabuuan sa mga unit sa tipikal mong rate, ang mga fixed cost mo, at sa porsyento ng contingency na nakapatong sa dalawa.',
      'What moves this estimate most': 'Ano ang pinakamalaking nagpapagalaw sa tantiyang ito',
      'Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.': 'Binabago ng bawat hilera ang isang input nang 10% ng sarili nitong halaga at inuulit ang sariling aritmetika ng calculator. Nananatili ang ibang input ayon sa inilagay mo. Mga paghahambing ito, hindi quote o forecast.',
      'Effect of a 10% change in each entry, largest first': 'Epekto ng 10% na pagbabago sa bawat input, pinakamalaki muna',
      'Entry': 'Input', '10% lower': '10% mas mababa', '10% higher': '10% mas mataas', 'Swing': 'Galaw',
      'n/a': 'wala',
      'The entry with the largest swing is "{0}": a 10% change moves the typical total between {1} and {2}.': 'Ang input na may pinakamalaking galaw ay "{0}": ang 10% na pagbabago ay naglilipat sa tipikal na kabuuan sa pagitan ng {1} at {2}.',
      'Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.': 'Ang mga hilerang may markang "wala" ay lampas sa saklaw na tinatanggap ng calculator. Ang mga input na buong numero ay sinusubok lamang sa buong numero, kaya maaaring "wala" ang isang hilera kapag hindi buong numero ang 10% ng input.'
    }
  };

  var LAB = {"es":{"Affected square feet":"Pies cuadrados afectados:","Cleaning and setup cost ($)":"Costo de limpieza y puesta en marcha ($):","Contingency (%)":"Contingencia (%):","Countertop square feet":"Pies cuadrados de encimera:","Covered patio square feet":"Pies cuadrados de patio cubierto:","Design and permit costs ($)":"Costos de diseño y permisos ($):","Design and utility connection costs ($)":"Costos de diseño y conexión de servicios ($):","Design, footings and permits ($)":"Diseño, zapatas y permisos ($):","Drainage and electrical upgrades ($)":"Mejoras de drenaje y electricidad ($):","Driveway square feet":"Pies cuadrados de entrada:","Electrical and ventilation work ($)":"Trabajos eléctricos y de ventilación ($):","Electrical, permits and line work ($)":"Electricidad, permisos y tendido de línea ($):","Electrical, plumbing and permits ($)":"Electricidad, plomería y permisos ($):","Electrical, waterproofing and permits ($)":"Electricidad, impermeabilización y permisos ($):","Emergency stabilization and testing ($)":"Estabilización de emergencia y pruebas ($):","Excavation and drainage ($)":"Excavación y drenaje ($):","Excavation, drainage and base prep ($)":"Excavación, drenaje y preparación de la base ($):","Foundation and permit costs ($)":"Costos de cimentación y permisos ($):","Gazebo floor area (sq ft)":"Superficie del gazebo (pies²):","Generator capacity (kW)":"Capacidad del generador (kW):","High cost per bathroom ($)":"Costo alto por baño ($):","High cost per conversion ($)":"Costo alto por conversión ($):","High cost per kW installed ($)":"Costo alto por kW instalado ($):","High cost per linear foot ($)":"Costo alto por pie lineal ($):","High cost per shower ($)":"Costo alto por ducha ($):","High cost per sq ft ($)":"Costo alto por pie cuadrado ($):","High cost per square foot ($)":"Costo alto por pie cuadrado ($):","High cost per system ($)":"Costo alto por sistema ($):","High cost per zone ($)":"Costo alto por zona ($):","High equipment and install cost ($)":"Costo alto de equipo e instalación ($):","High installed cost ($)":"Costo instalado alto ($):","High installed cost per linear foot ($)":"Costo instalado alto por pie lineal ($):","High installed cost per skylight ($)":"Costo instalado alto por tragaluz ($):","High installed cost per sq ft ($)":"Costo instalado alto por pie cuadrado ($):","High-end fireplace and install cost ($)":"Costo de chimenea de gama alta e instalación ($):","High-end installed cost ($)":"Costo instalado de gama alta ($):","High-end remodel cost per sq ft ($)":"Costo de remodelación de gama alta por pie cuadrado ($):","Home square feet being remodeled":"Pies cuadrados de la vivienda a remodelar:","Island linear feet":"Pies lineales de la isla:","Kitchen linear feet":"Pies lineales de cocina:","Light remodel cost per sq ft ($)":"Costo de remodelación ligera por pie cuadrado ($):","Linear feet of gutter":"Pies lineales de canalón:","Low cost per bathroom ($)":"Costo bajo por baño ($):","Low cost per conversion ($)":"Costo bajo por conversión ($):","Low cost per kW installed ($)":"Costo bajo por kW instalado ($):","Low cost per linear foot ($)":"Costo bajo por pie lineal ($):","Low cost per shower ($)":"Costo bajo por ducha ($):","Low cost per sq ft ($)":"Costo bajo por pie cuadrado ($):","Low cost per square foot ($)":"Costo bajo por pie cuadrado ($):","Low cost per system ($)":"Costo bajo por sistema ($):","Low cost per zone ($)":"Costo bajo por zona ($):","Low equipment and install cost ($)":"Costo bajo de equipo e instalación ($):","Low fireplace and install cost ($)":"Costo bajo de chimenea e instalación ($):","Low installed cost ($)":"Costo instalado bajo ($):","Low installed cost per linear foot ($)":"Costo instalado bajo por pie lineal ($):","Low installed cost per skylight ($)":"Costo instalado bajo por tragaluz ($):","Low installed cost per sq ft ($)":"Costo instalado bajo por pie cuadrado ($):","Low restoration cost per sq ft ($)":"Costo de restauración bajo por pie cuadrado ($):","Number of bathrooms added":"Número de baños añadidos:","Number of conversions":"Número de conversiones:","Number of filtration systems":"Número de sistemas de filtración:","Number of fireplaces":"Número de chimeneas:","Number of hot tubs":"Número de jacuzzis:","Number of indoor zones":"Número de zonas interiores:","Number of pump systems":"Número de sistemas de bombeo:","Number of saunas":"Número de saunas:","Number of showers":"Número de duchas:","Number of skylights":"Número de tragaluces:","Number of steam showers":"Número de duchas de vapor:","Number of systems":"Número de sistemas:","Pad, electrical and delivery ($)":"Losa, electricidad y entrega ($):","Patio square feet":"Pies cuadrados de patio:","Planned finished square feet":"Pies cuadrados terminados previstos:","Plumbing and repair costs ($)":"Costos de plomería y reparación ($):","Plumbing modifications and testing ($)":"Modificaciones de plomería y pruebas ($):","Plumbing, waterproofing and permits ($)":"Plomería, impermeabilización y permisos ($):","Removal, sink cutouts and plumbing ($)":"Remoción, recortes de fregadero y plomería ($):","Roof repair and interior finishing ($)":"Reparación del techo y acabado interior ($):","Severe restoration cost per sq ft ($)":"Costo de restauración severa por pie cuadrado ($):","Site work, design and permits ($)":"Trabajo de sitio, diseño y permisos ($):","Testing and plumbing modifications ($)":"Pruebas y modificaciones de plomería ($):","Transfer switch, gas and permits ($)":"Interruptor de transferencia, gas y permisos ($):","Typical cost per bathroom ($)":"Costo típico por baño ($):","Typical cost per conversion ($)":"Costo típico por conversión ($):","Typical cost per kW installed ($)":"Costo típico por kW instalado ($):","Typical cost per linear foot ($)":"Costo típico por pie lineal ($):","Typical cost per shower ($)":"Costo típico por ducha ($):","Typical cost per sq ft ($)":"Costo típico por pie cuadrado ($):","Typical cost per square foot ($)":"Costo típico por pie cuadrado ($):","Typical cost per system ($)":"Costo típico por sistema ($):","Typical cost per zone ($)":"Costo típico por zona ($):","Typical equipment and install cost ($)":"Costo típico de equipo e instalación ($):","Typical fireplace and install cost ($)":"Costo típico de chimenea e instalación ($):","Typical installed cost ($)":"Costo instalado típico ($):","Typical installed cost per linear foot ($)":"Costo instalado típico por pie lineal ($):","Typical installed cost per skylight ($)":"Costo instalado típico por tragaluz ($):","Typical installed cost per sq ft ($)":"Costo instalado típico por pie cuadrado ($):","Typical remodel cost per sq ft ($)":"Costo de remodelación típico por pie cuadrado ($):","Typical restoration cost per sq ft ($)":"Costo de restauración típico por pie cuadrado ($):","Utility runs and permits ($)":"Tendidos de servicios y permisos ($):","Venting, gas, electrical and permits ($)":"Ventilación, gas, electricidad y permisos ($):","Bathrooms at the typical rate":"Baños a la tarifa típica","Patio area at the typical rate":"Área del patio a la tarifa típica","Driveway area at the typical rate":"Área de la entrada a la tarifa típica","Restored area at the typical rate":"Área restaurada a la tarifa típica","Fireplaces at the typical rate":"Chimeneas a la tarifa típica","Gazebo floor area at the typical rate":"Superficie del gazebo a la tarifa típica","Generator capacity at the typical rate":"Capacidad del generador a la tarifa típica","Countertop area at the typical rate":"Área de la encimera a la tarifa típica","Gutters at the typical rate":"Canalones a la tarifa típica","Hot tubs at the typical rate":"Jacuzzis a la tarifa típica","Island at the typical rate":"Isla a la tarifa típica","Zones at the typical rate":"Zonas a la tarifa típica","Finished area at the typical rate":"Área terminada a la tarifa típica","Kitchen at the typical rate":"Cocina a la tarifa típica","Saunas at the typical rate":"Saunas a la tarifa típica","Skylights at the typical rate":"Tragaluces a la tarifa típica","Steam showers at the typical rate":"Duchas de vapor a la tarifa típica","Pump systems at the typical rate":"Sistemas de bombeo a la tarifa típica","Conversions at the typical rate":"Conversiones a la tarifa típica","Showers at the typical rate":"Duchas a la tarifa típica","Systems at the typical rate":"Sistemas a la tarifa típica","Remodeled area at the typical rate":"Área remodelada a la tarifa típica","Filtration systems at the typical rate":"Sistemas de filtración a la tarifa típica","Fixed costs":"Costos fijos","Contingency":"Contingencia"},"zh-CN":{"Affected square feet":"受灾面积（平方英尺）：","Cleaning and setup cost ($)":"清洁和调试费用（美元）：","Contingency (%)":"应急费（%）：","Countertop square feet":"台面面积（平方英尺）：","Covered patio square feet":"有顶露台面积（平方英尺）：","Design and permit costs ($)":"设计和许可费用（美元）：","Design and utility connection costs ($)":"设计和管线接入费用（美元）：","Design, footings and permits ($)":"设计、地基和许可费用（美元）：","Drainage and electrical upgrades ($)":"排水和电气升级（美元）：","Driveway square feet":"车道面积（平方英尺）：","Electrical and ventilation work ($)":"电气和通风工程（美元）：","Electrical, permits and line work ($)":"电气、许可和线路工程（美元）：","Electrical, plumbing and permits ($)":"电气、管道和许可（美元）：","Electrical, waterproofing and permits ($)":"电气、防水和许可（美元）：","Emergency stabilization and testing ($)":"紧急加固和检测（美元）：","Excavation and drainage ($)":"开挖和排水（美元）：","Excavation, drainage and base prep ($)":"开挖、排水和基层准备（美元）：","Foundation and permit costs ($)":"地基和许可费用（美元）：","Gazebo floor area (sq ft)":"凉亭地面面积（平方英尺）：","Generator capacity (kW)":"发电机容量（千瓦）：","High cost per bathroom ($)":"每间浴室的高费用（美元）：","High cost per conversion ($)":"每次改造的高费用（美元）：","High cost per kW installed ($)":"每千瓦装机的高费用（美元）：","High cost per linear foot ($)":"每线性英尺的高费用（美元）：","High cost per shower ($)":"每间淋浴的高费用（美元）：","High cost per sq ft ($)":"每平方英尺的高费用（美元）：","High cost per square foot ($)":"每平方英尺的高费用（美元）：","High cost per system ($)":"每套系统的高费用（美元）：","High cost per zone ($)":"每个区域的高费用（美元）：","High equipment and install cost ($)":"设备和安装的高费用（美元）：","High installed cost ($)":"含安装的高费用（美元）：","High installed cost per linear foot ($)":"每线性英尺含安装的高费用（美元）：","High installed cost per skylight ($)":"每樘天窗含安装的高费用（美元）：","High installed cost per sq ft ($)":"每平方英尺含安装的高费用（美元）：","High-end fireplace and install cost ($)":"高端壁炉和安装费用（美元）：","High-end installed cost ($)":"高端含安装费用（美元）：","High-end remodel cost per sq ft ($)":"每平方英尺的高端翻新费用（美元）：","Home square feet being remodeled":"房屋翻新面积（平方英尺）：","Island linear feet":"中岛线性英尺数：","Kitchen linear feet":"厨房线性英尺数：","Light remodel cost per sq ft ($)":"每平方英尺的轻度翻新费用（美元）：","Linear feet of gutter":"排水沟线性英尺数：","Low cost per bathroom ($)":"每间浴室的低费用（美元）：","Low cost per conversion ($)":"每次改造的低费用（美元）：","Low cost per kW installed ($)":"每千瓦装机的低费用（美元）：","Low cost per linear foot ($)":"每线性英尺的低费用（美元）：","Low cost per shower ($)":"每间淋浴的低费用（美元）：","Low cost per sq ft ($)":"每平方英尺的低费用（美元）：","Low cost per square foot ($)":"每平方英尺的低费用（美元）：","Low cost per system ($)":"每套系统的低费用（美元）：","Low cost per zone ($)":"每个区域的低费用（美元）：","Low equipment and install cost ($)":"设备和安装的低费用（美元）：","Low fireplace and install cost ($)":"壁炉和安装的低费用（美元）：","Low installed cost ($)":"含安装的低费用（美元）：","Low installed cost per linear foot ($)":"每线性英尺含安装的低费用（美元）：","Low installed cost per skylight ($)":"每樘天窗含安装的低费用（美元）：","Low installed cost per sq ft ($)":"每平方英尺含安装的低费用（美元）：","Low restoration cost per sq ft ($)":"每平方英尺的低修复费用（美元）：","Number of bathrooms added":"新增浴室数量：","Number of conversions":"改造次数：","Number of filtration systems":"过滤系统数量：","Number of fireplaces":"壁炉数量：","Number of hot tubs":"热水浴缸数量：","Number of indoor zones":"室内区域数量：","Number of pump systems":"水泵系统数量：","Number of saunas":"桑拿房数量：","Number of showers":"淋浴间数量：","Number of skylights":"天窗数量：","Number of steam showers":"蒸汽淋浴间数量：","Number of systems":"系统数量：","Pad, electrical and delivery ($)":"底座、电气和运输（美元）：","Patio square feet":"露台面积（平方英尺）：","Planned finished square feet":"计划竣工面积（平方英尺）：","Plumbing and repair costs ($)":"管道和维修费用（美元）：","Plumbing modifications and testing ($)":"管道改造和测试（美元）：","Plumbing, waterproofing and permits ($)":"管道、防水和许可（美元）：","Removal, sink cutouts and plumbing ($)":"拆除、水槽开孔和管道（美元）：","Roof repair and interior finishing ($)":"屋顶维修和室内装饰（美元）：","Severe restoration cost per sq ft ($)":"每平方英尺的重度修复费用（美元）：","Site work, design and permits ($)":"场地工程、设计和许可（美元）：","Testing and plumbing modifications ($)":"测试和管道改造（美元）：","Transfer switch, gas and permits ($)":"转换开关、燃气和许可（美元）：","Typical cost per bathroom ($)":"每间浴室的典型费用（美元）：","Typical cost per conversion ($)":"每次改造的典型费用（美元）：","Typical cost per kW installed ($)":"每千瓦装机的典型费用（美元）：","Typical cost per linear foot ($)":"每线性英尺的典型费用（美元）：","Typical cost per shower ($)":"每间淋浴的典型费用（美元）：","Typical cost per sq ft ($)":"每平方英尺的典型费用（美元）：","Typical cost per square foot ($)":"每平方英尺的典型费用（美元）：","Typical cost per system ($)":"每套系统的典型费用（美元）：","Typical cost per zone ($)":"每个区域的典型费用（美元）：","Typical equipment and install cost ($)":"设备和安装的典型费用（美元）：","Typical fireplace and install cost ($)":"壁炉和安装的典型费用（美元）：","Typical installed cost ($)":"含安装的典型费用（美元）：","Typical installed cost per linear foot ($)":"每线性英尺含安装的典型费用（美元）：","Typical installed cost per skylight ($)":"每樘天窗含安装的典型费用（美元）：","Typical installed cost per sq ft ($)":"每平方英尺含安装的典型费用（美元）：","Typical remodel cost per sq ft ($)":"每平方英尺的典型翻新费用（美元）：","Typical restoration cost per sq ft ($)":"每平方英尺的典型修复费用（美元）：","Utility runs and permits ($)":"管线敷设和许可（美元）：","Venting, gas, electrical and permits ($)":"排烟、燃气、电气和许可（美元）：","Bathrooms at the typical rate":"按典型费率计算的浴室","Patio area at the typical rate":"按典型费率计算的露台面积","Driveway area at the typical rate":"按典型费率计算的车道面积","Restored area at the typical rate":"按典型费率计算的修复面积","Fireplaces at the typical rate":"按典型费率计算的壁炉","Gazebo floor area at the typical rate":"按典型费率计算的凉亭地面面积","Generator capacity at the typical rate":"按典型费率计算的发电机容量","Countertop area at the typical rate":"按典型费率计算的台面面积","Gutters at the typical rate":"按典型费率计算的排水沟","Hot tubs at the typical rate":"按典型费率计算的热水浴缸","Island at the typical rate":"按典型费率计算的中岛","Zones at the typical rate":"按典型费率计算的区域","Finished area at the typical rate":"按典型费率计算的竣工面积","Kitchen at the typical rate":"按典型费率计算的厨房","Saunas at the typical rate":"按典型费率计算的桑拿房","Skylights at the typical rate":"按典型费率计算的天窗","Steam showers at the typical rate":"按典型费率计算的蒸汽淋浴间","Pump systems at the typical rate":"按典型费率计算的水泵系统","Conversions at the typical rate":"按典型费率计算的改造","Showers at the typical rate":"按典型费率计算的淋浴间","Systems at the typical rate":"按典型费率计算的系统","Remodeled area at the typical rate":"按典型费率计算的翻新面积","Filtration systems at the typical rate":"按典型费率计算的过滤系统","Fixed costs":"固定费用","Contingency":"应急费"},"fil":{"Affected square feet":"Apektadong square feet:","Cleaning and setup cost ($)":"Gastos sa paglilinis at setup ($):","Contingency (%)":"Contingency (%):","Countertop square feet":"Square feet ng countertop:","Covered patio square feet":"Square feet ng covered patio:","Design and permit costs ($)":"Gastos sa disenyo at mga permit ($):","Design and utility connection costs ($)":"Gastos sa disenyo at pagkonekta ng mga utility ($):","Design, footings and permits ($)":"Disenyo, mga footing at permit ($):","Drainage and electrical upgrades ($)":"Mga upgrade sa drainage at electrical ($):","Driveway square feet":"Square feet ng driveway:","Electrical and ventilation work ($)":"Electrical at ventilation work ($):","Electrical, permits and line work ($)":"Electrical, mga permit at line work ($):","Electrical, plumbing and permits ($)":"Electrical, plumbing at mga permit ($):","Electrical, waterproofing and permits ($)":"Electrical, waterproofing at mga permit ($):","Emergency stabilization and testing ($)":"Emergency stabilization at testing ($):","Excavation and drainage ($)":"Excavation at drainage ($):","Excavation, drainage and base prep ($)":"Excavation, drainage at paghahanda ng base ($):","Foundation and permit costs ($)":"Gastos sa pundasyon at mga permit ($):","Gazebo floor area (sq ft)":"Floor area ng gazebo (sq ft):","Generator capacity (kW)":"Kapasidad ng generator (kW):","High cost per bathroom ($)":"Mataas na gastos bawat banyo ($):","High cost per conversion ($)":"Mataas na gastos bawat conversion ($):","High cost per kW installed ($)":"Mataas na gastos bawat kW na naka-install ($):","High cost per linear foot ($)":"Mataas na gastos bawat linear foot ($):","High cost per shower ($)":"Mataas na gastos bawat shower ($):","High cost per sq ft ($)":"Mataas na gastos bawat sq ft ($):","High cost per square foot ($)":"Mataas na gastos bawat square foot ($):","High cost per system ($)":"Mataas na gastos bawat system ($):","High cost per zone ($)":"Mataas na gastos bawat zone ($):","High equipment and install cost ($)":"Mataas na gastos sa kagamitan at installation ($):","High installed cost ($)":"Mataas na installed na gastos ($):","High installed cost per linear foot ($)":"Mataas na installed na gastos bawat linear foot ($):","High installed cost per skylight ($)":"Mataas na installed na gastos bawat skylight ($):","High installed cost per sq ft ($)":"Mataas na installed na gastos bawat sq ft ($):","High-end fireplace and install cost ($)":"High-end na fireplace at gastos sa installation ($):","High-end installed cost ($)":"High-end na installed na gastos ($):","High-end remodel cost per sq ft ($)":"High-end na gastos sa remodel bawat sq ft ($):","Home square feet being remodeled":"Square feet ng bahay na rerepasuhin:","Island linear feet":"Linear feet ng island:","Kitchen linear feet":"Linear feet ng kusina:","Light remodel cost per sq ft ($)":"Magagaan na gastos sa remodel bawat sq ft ($):","Linear feet of gutter":"Linear feet ng gutter:","Low cost per bathroom ($)":"Mababang gastos bawat banyo ($):","Low cost per conversion ($)":"Mababang gastos bawat conversion ($):","Low cost per kW installed ($)":"Mababang gastos bawat kW na naka-install ($):","Low cost per linear foot ($)":"Mababang gastos bawat linear foot ($):","Low cost per shower ($)":"Mababang gastos bawat shower ($):","Low cost per sq ft ($)":"Mababang gastos bawat sq ft ($):","Low cost per square foot ($)":"Mababang gastos bawat square foot ($):","Low cost per system ($)":"Mababang gastos bawat system ($):","Low cost per zone ($)":"Mababang gastos bawat zone ($):","Low equipment and install cost ($)":"Mababang gastos sa kagamitan at installation ($):","Low fireplace and install cost ($)":"Mababang gastos sa fireplace at installation ($):","Low installed cost ($)":"Mababang installed na gastos ($):","Low installed cost per linear foot ($)":"Mababang installed na gastos bawat linear foot ($):","Low installed cost per skylight ($)":"Mababang installed na gastos bawat skylight ($):","Low installed cost per sq ft ($)":"Mababang installed na gastos bawat sq ft ($):","Low restoration cost per sq ft ($)":"Mababang gastos sa restoration bawat sq ft ($):","Number of bathrooms added":"Bilang ng idinagdag na banyo:","Number of conversions":"Bilang ng conversion:","Number of filtration systems":"Bilang ng filtration system:","Number of fireplaces":"Bilang ng fireplace:","Number of hot tubs":"Bilang ng hot tub:","Number of indoor zones":"Bilang ng indoor zone:","Number of pump systems":"Bilang ng pump system:","Number of saunas":"Bilang ng sauna:","Number of showers":"Bilang ng shower:","Number of skylights":"Bilang ng skylight:","Number of steam showers":"Bilang ng steam shower:","Number of systems":"Bilang ng system:","Pad, electrical and delivery ($)":"Pad, electrical at delivery ($):","Patio square feet":"Square feet ng patio:","Planned finished square feet":"Planadong tapos na square feet:","Plumbing and repair costs ($)":"Gastos sa plumbing at pagkukumpuni ($):","Plumbing modifications and testing ($)":"Mga pagbabago sa plumbing at testing ($):","Plumbing, waterproofing and permits ($)":"Plumbing, waterproofing at mga permit ($):","Removal, sink cutouts and plumbing ($)":"Pagtanggal, mga cutout ng lababo at plumbing ($):","Roof repair and interior finishing ($)":"Pagkukumpuni ng bubong at interior finishing ($):","Severe restoration cost per sq ft ($)":"Malubhang gastos sa restoration bawat sq ft ($):","Site work, design and permits ($)":"Site work, disenyo at mga permit ($):","Testing and plumbing modifications ($)":"Testing at mga pagbabago sa plumbing ($):","Transfer switch, gas and permits ($)":"Transfer switch, gas at mga permit ($):","Typical cost per bathroom ($)":"Tipikal na gastos bawat banyo ($):","Typical cost per conversion ($)":"Tipikal na gastos bawat conversion ($):","Typical cost per kW installed ($)":"Tipikal na gastos bawat kW na naka-install ($):","Typical cost per linear foot ($)":"Tipikal na gastos bawat linear foot ($):","Typical cost per shower ($)":"Tipikal na gastos bawat shower ($):","Typical cost per sq ft ($)":"Tipikal na gastos bawat sq ft ($):","Typical cost per square foot ($)":"Tipikal na gastos bawat square foot ($):","Typical cost per system ($)":"Tipikal na gastos bawat system ($):","Typical cost per zone ($)":"Tipikal na gastos bawat zone ($):","Typical equipment and install cost ($)":"Tipikal na gastos sa kagamitan at installation ($):","Typical fireplace and install cost ($)":"Tipikal na gastos sa fireplace at installation ($):","Typical installed cost ($)":"Tipikal na installed na gastos ($):","Typical installed cost per linear foot ($)":"Tipikal na installed na gastos bawat linear foot ($):","Typical installed cost per skylight ($)":"Tipikal na installed na gastos bawat skylight ($):","Typical installed cost per sq ft ($)":"Tipikal na installed na gastos bawat sq ft ($):","Typical remodel cost per sq ft ($)":"Tipikal na gastos sa remodel bawat sq ft ($):","Typical restoration cost per sq ft ($)":"Tipikal na gastos sa restoration bawat sq ft ($):","Utility runs and permits ($)":"Mga utility run at permit ($):","Venting, gas, electrical and permits ($)":"Venting, gas, electrical at mga permit ($):","Bathrooms at the typical rate":"Mga banyo sa tipikal na rate","Patio area at the typical rate":"Patio area sa tipikal na rate","Driveway area at the typical rate":"Driveway area sa tipikal na rate","Restored area at the typical rate":"Restored area sa tipikal na rate","Fireplaces at the typical rate":"Mga fireplace sa tipikal na rate","Gazebo floor area at the typical rate":"Floor area ng gazebo sa tipikal na rate","Generator capacity at the typical rate":"Kapasidad ng generator sa tipikal na rate","Countertop area at the typical rate":"Countertop area sa tipikal na rate","Gutters at the typical rate":"Mga gutter sa tipikal na rate","Hot tubs at the typical rate":"Mga hot tub sa tipikal na rate","Island at the typical rate":"Island sa tipikal na rate","Zones at the typical rate":"Mga zone sa tipikal na rate","Finished area at the typical rate":"Tapos na area sa tipikal na rate","Kitchen at the typical rate":"Kusina sa tipikal na rate","Saunas at the typical rate":"Mga sauna sa tipikal na rate","Skylights at the typical rate":"Mga skylight sa tipikal na rate","Steam showers at the typical rate":"Mga steam shower sa tipikal na rate","Pump systems at the typical rate":"Mga pump system sa tipikal na rate","Conversions at the typical rate":"Mga conversion sa tipikal na rate","Showers at the typical rate":"Mga shower sa tipikal na rate","Systems at the typical rate":"Mga system sa tipikal na rate","Remodeled area at the typical rate":"Remodel na area sa tipikal na rate","Filtration systems at the typical rate":"Mga filtration system sa tipikal na rate","Fixed costs":"Mga fixed na gastos","Contingency":"Contingency"}};

  function curLang() { return (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || document.documentElement.lang || 'en'; }
  function t(tpl) {
    var a = Array.prototype.slice.call(arguments, 1), d = D[curLang()];
    return ((d && d[tpl]) || tpl).replace(/\{(\d+)\}/g, function (m, i) { return a[+i]; });
  }
  function locale() { return window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US'; }
  function money(x) { return new Intl.NumberFormat(locale(), {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', useGrouping: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(x); }
  function share(x, total) { if (!(total > 0)) return t('n/a'); return new Intl.NumberFormat(locale(), {style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1}).format(x / total); }
  function el(tag, text, cls) { var e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }

  var st = document.createElement('style');
  st.setAttribute('data-dch-costbd-style', '1');
  st.textContent = '.dch-costbd-table table{table-layout:fixed;width:100%}.dch-costbd-table thead th:first-child{width:38%}.dch-costbd-table th,.dch-costbd-table td{overflow-wrap:break-word!important;word-break:normal!important;hyphens:none!important;padding:8px 3px!important;font-size:.76rem!important}@media (max-width:480px){.dch-costbd{font-size:.7rem}.dch-costbd th,.dch-costbd td{padding:6px 2px}}.dch-costbd-sens thead th:first-child{width:30%}.dch-costbd-sens th,.dch-costbd-sens td{font-size:.72rem!important;padding:6px 2px!important}';
  document.head.appendChild(st);

  var minOf = {}, intOf = {};
  S.fields.forEach(function (f) { minOf[f.id] = f.min; intOf[f.id] = !!f.integer; });

  function run(vals) {
    var out = {};
    var n = function (id) { return vals[id]; };
    var set = function (id, v) { out[id] = v; };
    var idf = function (x) { return x; };
    var bad = function () { throw new Error('invalid'); };
    try { S.calc(n, set, idf, idf, function (x) { return x; }, window.DCHCalculator.loanPayment, bad); } catch (e) { return null; }
    var r = out.mainResult;
    return (typeof r === 'number' && isFinite(r)) ? out : null;
  }

  var labOf = {};
  S.fields.forEach(function (f) { labOf[f.id] = f.label; });
  (S.parts || []).forEach(function (p) { labOf[p.id] = p.label; });

  function labelOf(id) {
    var en = labOf[id], d = LAB[curLang()];
    if (en) return (d && d[en] || en).replace(/\s*\(\$\)\s*$/, ' ($)');
    var l = document.querySelector('label[for="' + id + '"]');
    return (l ? l.textContent.replace(/\s+/g, ' ').trim() : id).replace(/[:\uff1a]\s*$/, '');
  }

  function render() {
    box.textContent = '';
    var ctrl = window.DCHCalculator.getController && window.DCHCalculator.getController();
    if (!ctrl || !ctrl.ok) { box.hidden = true; return; }
    try {
      var vals = {};
      for (var i = 0; i < S.fields.length; i++) {
        var f = S.fields[i], e = document.getElementById(f.id);
        if (!e) { box.hidden = true; return; }
        vals[f.id] = window.DCHCalculator.numeric(e.value);
      }
      var baseOut = run(vals);
      if (baseOut === null) { box.hidden = true; return; }
      var base = baseOut.mainResult;

      box.hidden = false;
      box.className = 'dch-detail dch-costbd';

      /* Section 1: breakdown of the typical total */
      box.appendChild(el('h3', t('Where the typical estimate goes')));
      box.appendChild(el('p', t('Typical total as entered: {0}.', money(base)), 'dch-note'));
      var tw = el('div', undefined, 'dch-scenario-table dch-costbd-table');
      var tb = el('table'); tb.appendChild(el('caption', t('Split of the typical total into parts')));
      var hr = el('tr');
      ['Part', 'Amount', 'Share of typical'].forEach(function (h) { var c = el('th', t(h)); c.setAttribute('scope', 'col'); hr.appendChild(c); });
      var thead = el('thead'); thead.appendChild(hr); tb.appendChild(thead);
      var body = el('tbody');
      (S.parts || []).forEach(function (p) {
        var amt = baseOut[p.id];
        if (typeof amt !== 'number' || !isFinite(amt)) return;
        var tr = el('tr');
        var th = el('th', labelOf(p.id)); th.setAttribute('scope', 'row'); tr.appendChild(th);
        tr.appendChild(el('td', money(amt)));
        tr.appendChild(el('td', share(amt, base)));
        body.appendChild(tr);
      });
      tb.appendChild(body); tw.appendChild(tb); box.appendChild(tw);
      box.appendChild(el('p', t('The typical total is split into the units at your typical rate, your fixed costs, and the contingency percentage applied to both.'), 'dch-note'));

      /* Section 2: 10% sensitivity, re-running the page's own calculation */
      var rows = S.fields.map(function (f) {
        var lo = {}, hi = {}, k;
        for (k in vals) { lo[k] = vals[k]; hi[k] = vals[k]; }
        lo[f.id] = vals[f.id] * 0.9;
        hi[f.id] = vals[f.id] * 1.1;
        var ok = function (v) {
          if (minOf[f.id] !== undefined && minOf[f.id] !== null && v < minOf[f.id]) return false;
          if (intOf[f.id] && Math.abs(v - Math.round(v)) > 1e-9) return false;
          return true;
        };
        var ao = ok(lo[f.id]) ? run(lo) : null, bo = ok(hi[f.id]) ? run(hi) : null;
        var a = ao ? ao.mainResult : null, b = bo ? bo.mainResult : null;
        var swing = (a === null || b === null) ? -1 : Math.abs(b - a);
        return {id: f.id, a: a, b: b, swing: swing};
      });
      rows.sort(function (x, y) { return y.swing - x.swing; });

      box.appendChild(el('h3', t('What moves this estimate most')));
      var tw2 = el('div', undefined, 'dch-scenario-table dch-costbd-table dch-costbd-sens');
      var tb2 = el('table'); tb2.appendChild(el('caption', t('Effect of a 10% change in each entry, largest first')));
      var hr2 = el('tr');
      ['Entry', '10% lower', '10% higher', 'Swing'].forEach(function (h) { var c = el('th', t(h)); c.setAttribute('scope', 'col'); hr2.appendChild(c); });
      var thead2 = el('thead'); thead2.appendChild(hr2); tb2.appendChild(thead2);
      var body2 = el('tbody');
      rows.forEach(function (r) {
        var tr = el('tr');
        var th = el('th', labelOf(r.id)); th.setAttribute('scope', 'row'); tr.appendChild(th);
        tr.appendChild(el('td', r.a === null ? t('n/a') : money(r.a)));
        tr.appendChild(el('td', r.b === null ? t('n/a') : money(r.b)));
        tr.appendChild(el('td', r.swing < 0 ? t('n/a') : money(r.swing)));
        body2.appendChild(tr);
      });
      tb2.appendChild(body2); tw2.appendChild(tb2); box.appendChild(tw2);
      var top = rows[0];
      if (top && top.swing > 0) {
        box.appendChild(el('p', t('The entry with the largest swing is "{0}": a 10% change moves the typical total between {1} and {2}.', labelOf(top.id), money(top.a), money(top.b)), 'dch-note'));
      }
      box.appendChild(el('p', t('Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.'), 'dch-note'));
      box.appendChild(el('p', t('Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.'), 'dch-note'));
    } catch (e) {
      box.hidden = true;
    }
  }

  var queued = false;
  function schedule() { if (queued) return; queued = true; setTimeout(function () { queued = false; render(); }, 0); }
  document.querySelectorAll('.form-control').forEach(function (f) { f.addEventListener('input', schedule); });
  window.addEventListener('load', function () { setTimeout(render, 700); });
  setTimeout(render, 900);
})();
