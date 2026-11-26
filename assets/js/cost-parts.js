/* Cost pages built from fixed amounts plus a contingency: where the total goes, and a 10% sensitivity check. The arithmetic is a copy of each page's own formula, so every figure matches the page for the same entries. These are comparisons, not quotes. */
(function () {
  'use strict';
  var box = document.getElementById('detailBox');
  if (!box || !window.DCHCalculator) return;
  var D = {
 "es": {
  "Where the total goes": "Adónde va el total",
  "Total as entered: {0}.": "Total con tus datos: {0}.",
  "Split of the total into parts": "División del total en partes",
  "Part": "Parte",
  "Amount": "Importe",
  "Share of total": "Parte del total",
  "Contingency": "Contingencia",
  "Total": "Total",
  "Each part is worked out with the calculator’s own arithmetic from your entries. Contingency is your percentage applied to the subtotal of all the other parts.": "Cada parte se calcula con la aritmética de la propia calculadora a partir de tus datos. La contingencia es tu porcentaje aplicado al subtotal de todas las demás partes.",
  "What moves the total most": "Qué mueve más el total",
  "Effect of a 10% change in each entry, largest first": "Efecto de un cambio del 10% en cada entrada, de mayor a menor",
  "Entry": "Entrada",
  "10% lower": "10% menos",
  "10% higher": "10% más",
  "Swing": "Variación",
  "n/a": "n/d",
  "The entry with the largest swing is \"{0}\": a 10% change moves the total between {1} and {2}.": "La entrada con mayor variación es \"{0}\": un cambio del 10% mueve el total entre {1} y {2}.",
  "Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.": "Cada fila cambia una entrada en un 10% de su propio valor y vuelve a ejecutar la aritmética de la calculadora. Las demás entradas quedan como las escribiste. Son comparaciones, no cotizaciones ni pronósticos.",
  "Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.": "Las filas marcadas n/d quedan fuera del rango que acepta la calculadora. Las entradas de números enteros solo se prueban con números enteros, así que una fila puede mostrar n/d cuando el 10% de la entrada no es un número entero.",
  "Base construction": "Construcción base",
  "Stairs, HVAC and permits": "Escaleras, climatización y permisos",
  "Base finishing": "Acabado base",
  "Bathroom, egress and permits": "Baño, salida de emergencia y permisos",
  "Interior drainage and pumps": "Drenaje interior y bombas",
  "Wall sealing": "Sellado de muros",
  "Exterior work and permits": "Trabajos exteriores y permisos",
  "Materials": "Materiales",
  "Fixtures": "Accesorios",
  "Labor": "Mano de obra",
  "Permits and design": "Permisos y diseño",
  "Tile material": "Material de azulejo",
  "Installation labor": "Mano de obra de instalación",
  "Waterproofing, demolition and trim": "Impermeabilización, demolición y remates",
  "Masonry repair": "Reparación de mampostería",
  "Liner, cap and flashing": "Revestimiento, remate y tapajuntas",
  "Scaffolding and inspection": "Andamio e inspección",
  "Material": "Material",
  "Installation": "Instalación",
  "Cutouts and backsplash": "Cortes y salpicadero",
  "Removal and delivery": "Retiro y entrega",
  "Liner and labor": "Revestimiento y mano de obra",
  "Drainage, dehumidifier, mold treatment and permits": "Drenaje, deshumidificador, tratamiento de moho y permisos",
  "Railing": "Barandilla",
  "Permits": "Permisos",
  "Demolition": "Demolición",
  "Hazardous materials and disposal": "Materiales peligrosos y eliminación",
  "Utilities, permits and restoration": "Servicios, permisos y restauración",
  "New installation": "Instalación nueva",
  "Old surface removal": "Retiro de la superficie vieja",
  "Base prep, drainage and permits": "Preparación de base, drenaje y permisos",
  "Ductwork before access adjustment": "Ductos antes del ajuste de acceso",
  "Access adjustment": "Ajuste de acceso",
  "Removal, sealing, repairs and permits": "Retiro, sellado, reparaciones y permisos",
  "Materials and panel": "Materiales y panel",
  "Access and permits": "Acceso y permisos",
  "Gates": "Portones",
  "Removal and permits": "Retiro y permisos",
  "Crack repair": "Reparación de grietas",
  "Piers": "Pilotes",
  "Waterproofing, engineering and permits": "Impermeabilización, ingeniería y permisos",
  "Base structure": "Estructura base",
  "Doors": "Puertas",
  "Electrical, design and permits": "Trabajo eléctrico, diseño y permisos",
  "Gutters": "Canalones",
  "Downspouts": "Bajantes",
  "Removal and gutter guards": "Retiro y protectores de canalón",
  "Design, permits and utilities": "Diseño, permisos y servicios",
  "Cabinet material": "Material de gabinetes",
  "Removal, hardware, finishing and design": "Retiro, herrajes, acabado y diseño",
  "Cabinets": "Gabinetes",
  "Countertops": "Encimeras",
  "Appliances": "Electrodomésticos",
  "Flooring": "Pisos",
  "Lawn": "Césped",
  "Planting beds": "Jardineras",
  "Plants and irrigation": "Plantas y riego",
  "Hardscape": "Obras duras",
  "Design": "Diseño",
  "Fixtures and materials": "Accesorios y materiales",
  "Pool shell": "Vaso de la piscina",
  "Pool deck": "Terraza de la piscina",
  "Equipment and site work": "Equipos y obras del terreno",
  "Fence and permits": "Cerca y permisos",
  "Base wall": "Muro base",
  "Excavation, drainage and engineering": "Excavación, drenaje e ingeniería",
  "Tank": "Tanque",
  "Drain field": "Campo de drenaje",
  "Site work, design and restoration": "Obras del terreno, diseño y restauración",
  "Pipe replacement": "Reemplazo de tubería",
  "Excavation, restoration and permits": "Excavación, restauración y permisos",
  "Remediation": "Remediación",
  "Testing and containment": "Pruebas y contención",
  "Repairs and temporary lodging": "Reparaciones y alojamiento temporal",
  "Drilling and casing": "Perforación y revestimiento",
  "Pump system": "Sistema de bomba",
  "Testing, permits and access": "Pruebas, permisos y acceso",
  "Window units": "Unidades de ventana",
  "Trim, disposal and permits": "Acabado, eliminación y permisos"
 },
 "zh-CN": {
  "Where the total goes": "总额的构成",
  "Total as entered: {0}.": "按当前输入的总额：{0}。",
  "Split of the total into parts": "总额的构成拆分",
  "Part": "部分",
  "Amount": "金额",
  "Share of total": "占总额比例",
  "Contingency": "应急费用",
  "Total": "总额",
  "Each part is worked out with the calculator’s own arithmetic from your entries. Contingency is your percentage applied to the subtotal of all the other parts.": "每一部分都用计算器自身的算术，根据您的输入算出。应急费用是您输入的百分比乘以其他所有部分的小计。",
  "What moves the total most": "哪些输入对总额影响最大",
  "Effect of a 10% change in each entry, largest first": "每个输入变动 10% 的影响，按影响从大到小排列",
  "Entry": "输入项",
  "10% lower": "降低 10%",
  "10% higher": "提高 10%",
  "Swing": "变动幅度",
  "n/a": "不适用",
  "The entry with the largest swing is \"{0}\": a 10% change moves the total between {1} and {2}.": "变动幅度最大的输入项是“{0}”：变动 10% 会使总额在 {1} 与 {2} 之间变化。",
  "Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.": "每一行只把一个输入改动其自身数值的 10%，并重新运行计算器自身的算术，其余输入保持您填写的值。这些只是对比，不是报价或预测。",
  "Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.": "标为“不适用”的行超出了计算器接受的范围。整数输入只会用整数来测试，因此当输入的 10% 不是整数时，该行可能显示“不适用”。",
  "Base construction": "基础施工费",
  "Stairs, HVAC and permits": "楼梯、暖通和许可",
  "Base finishing": "基础装修费",
  "Bathroom, egress and permits": "卫生间、安全出口和许可",
  "Interior drainage and pumps": "室内排水和水泵",
  "Wall sealing": "墙面密封",
  "Exterior work and permits": "外部工程和许可",
  "Materials": "材料",
  "Fixtures": "洁具",
  "Labor": "人工",
  "Permits and design": "许可和设计",
  "Tile material": "瓷砖材料",
  "Installation labor": "安装人工",
  "Waterproofing, demolition and trim": "防水、拆除和收边",
  "Masonry repair": "砖石修补",
  "Liner, cap and flashing": "衬管、盖帽和泛水",
  "Scaffolding and inspection": "脚手架和检查",
  "Material": "材料",
  "Installation": "安装",
  "Cutouts and backsplash": "开孔和挡水板",
  "Removal and delivery": "拆除和运送",
  "Liner and labor": "衬膜和人工",
  "Drainage, dehumidifier, mold treatment and permits": "排水、除湿机、霉菌处理和许可",
  "Railing": "栏杆",
  "Permits": "许可",
  "Demolition": "拆除",
  "Hazardous materials and disposal": "危险材料和处置",
  "Utilities, permits and restoration": "公用设施、许可和修复",
  "New installation": "新铺装",
  "Old surface removal": "旧路面拆除",
  "Base prep, drainage and permits": "基层处理、排水和许可",
  "Ductwork before access adjustment": "调整出入系数前的风管费用",
  "Access adjustment": "出入系数调整",
  "Removal, sealing, repairs and permits": "拆除、密封、修复和许可",
  "Materials and panel": "材料和配电箱",
  "Access and permits": "出入和许可",
  "Gates": "大门",
  "Removal and permits": "拆除和许可",
  "Crack repair": "裂缝修补",
  "Piers": "桥墩",
  "Waterproofing, engineering and permits": "防水、工程设计和许可",
  "Base structure": "主体结构",
  "Doors": "车库门",
  "Electrical, design and permits": "电气、设计和许可",
  "Gutters": "排水槽",
  "Downspouts": "落水管",
  "Removal and gutter guards": "拆除和防堵网",
  "Design, permits and utilities": "设计、许可和公用设施",
  "Cabinet material": "橱柜材料",
  "Removal, hardware, finishing and design": "拆除、五金、饰面和设计",
  "Cabinets": "橱柜",
  "Countertops": "台面",
  "Appliances": "电器",
  "Flooring": "地板",
  "Lawn": "草坪",
  "Planting beds": "种植床",
  "Plants and irrigation": "植物和灌溉",
  "Hardscape": "硬景观",
  "Design": "设计",
  "Fixtures and materials": "洁具和材料",
  "Pool shell": "泳池池体",
  "Pool deck": "泳池池畔平台",
  "Equipment and site work": "设备和场地工程",
  "Fence and permits": "围栏和许可",
  "Base wall": "墙体基础费",
  "Excavation, drainage and engineering": "开挖、排水和工程设计",
  "Tank": "化粪池",
  "Drain field": "渗水场",
  "Site work, design and restoration": "场地工程、设计和修复",
  "Pipe replacement": "管道更换",
  "Excavation, restoration and permits": "开挖、修复和许可",
  "Remediation": "霉菌处理",
  "Testing and containment": "检测和隔离",
  "Repairs and temporary lodging": "修复和临时住宿",
  "Drilling and casing": "钻井和套管",
  "Pump system": "水泵系统",
  "Testing, permits and access": "检测、许可和出入条件",
  "Window units": "窗户设备",
  "Trim, disposal and permits": "收边、处置和许可"
 },
 "fil": {
  "Where the total goes": "Saan napupunta ang kabuuan",
  "Total as entered: {0}.": "Kabuuan ayon sa inilagay: {0}.",
  "Split of the total into parts": "Paghahati ng kabuuan sa mga bahagi",
  "Part": "Bahagi",
  "Amount": "Halaga",
  "Share of total": "Bahagi ng kabuuan",
  "Contingency": "Contingency",
  "Total": "Kabuuan",
  "Each part is worked out with the calculator’s own arithmetic from your entries. Contingency is your percentage applied to the subtotal of all the other parts.": "Kinakalkula ang bawat bahagi gamit ang sariling aritmetika ng calculator mula sa mga input mo. Ang contingency ay ang porsyentong inilagay mo na inilapat sa subtotal ng lahat ng ibang bahagi.",
  "What moves the total most": "Ano ang pinakagumagalaw sa kabuuan",
  "Effect of a 10% change in each entry, largest first": "Epekto ng 10% na pagbabago sa bawat input, pinakamalaki muna",
  "Entry": "Input",
  "10% lower": "10% mas mababa",
  "10% higher": "10% mas mataas",
  "Swing": "Pagbabago",
  "n/a": "n/a",
  "The entry with the largest swing is \"{0}\": a 10% change moves the total between {1} and {2}.": "Ang input na may pinakamalaking pagbabago ay \"{0}\": ang 10% na pagbabago ay gumagalaw sa kabuuan sa pagitan ng {1} at {2}.",
  "Each row changes one entry by 10% of its own value and re-runs the calculator’s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.": "Binabago ng bawat hilera ang isang input ng 10% ng sarili nitong halaga at muling pinapatakbo ang sariling aritmetika ng calculator. Nananatili ang ibang input ayon sa tinype mo. Mga paghahambing ito, hindi quotation o pagtataya.",
  "Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.": "Ang mga hilerang may markang n/a ay lampas sa saklaw na tinatanggap ng calculator. Whole number lang ang sinusubok sa mga input na whole number, kaya maaaring n/a ang hilera kapag hindi whole number ang 10% ng input.",
  "Base construction": "Batayang konstruksiyon",
  "Stairs, HVAC and permits": "Hagdan, HVAC at permit",
  "Base finishing": "Batayang finishing",
  "Bathroom, egress and permits": "Banyo, egress at permit",
  "Interior drainage and pumps": "Interior drainage at mga pump",
  "Wall sealing": "Wall sealing",
  "Exterior work and permits": "Panlabas na gawain at permit",
  "Materials": "Materyales",
  "Fixtures": "Fixtures",
  "Labor": "Paggawa",
  "Permits and design": "Permit at disenyo",
  "Tile material": "Materyales ng tile",
  "Installation labor": "Paggawa sa pag-install",
  "Waterproofing, demolition and trim": "Waterproofing, demolisyon at trim",
  "Masonry repair": "Pag-aayos ng masonry",
  "Liner, cap and flashing": "Liner, cap at flashing",
  "Scaffolding and inspection": "Scaffolding at inspeksiyon",
  "Material": "Materyal",
  "Installation": "Pag-install",
  "Cutouts and backsplash": "Cutout at backsplash",
  "Removal and delivery": "Pagtanggal at delivery",
  "Liner and labor": "Liner at paggawa",
  "Drainage, dehumidifier, mold treatment and permits": "Drainage, dehumidifier, paggamot sa amag at permit",
  "Railing": "Railing",
  "Permits": "Permit",
  "Demolition": "Demolisyon",
  "Hazardous materials and disposal": "Mapanganib na materyales at pagtatapon",
  "Utilities, permits and restoration": "Utility, permit at pagsasaayos",
  "New installation": "Bagong pag-install",
  "Old surface removal": "Pagtanggal ng lumang ibabaw",
  "Base prep, drainage and permits": "Paghahanda ng base, drainage at permit",
  "Ductwork before access adjustment": "Ductwork bago ang access adjustment",
  "Access adjustment": "Access adjustment",
  "Removal, sealing, repairs and permits": "Pagtanggal, sealing, pag-aayos at permit",
  "Materials and panel": "Materyales at panel",
  "Access and permits": "Access at permit",
  "Gates": "Mga gate",
  "Removal and permits": "Pagtanggal at permit",
  "Crack repair": "Pag-aayos ng bitak",
  "Piers": "Mga pier",
  "Waterproofing, engineering and permits": "Waterproofing, engineering at permit",
  "Base structure": "Batayang istruktura",
  "Doors": "Mga pinto",
  "Electrical, design and permits": "Elektrikal, disenyo at permit",
  "Gutters": "Mga alulod",
  "Downspouts": "Mga downspout",
  "Removal and gutter guards": "Pagtanggal at gutter guard",
  "Design, permits and utilities": "Disenyo, permit at utility",
  "Cabinet material": "Materyales ng kabinet",
  "Removal, hardware, finishing and design": "Pagtanggal, hardware, finishing at disenyo",
  "Cabinets": "Mga kabinet",
  "Countertops": "Mga countertop",
  "Appliances": "Appliances",
  "Flooring": "Sahig",
  "Lawn": "Damuhan",
  "Planting beds": "Mga taniman",
  "Plants and irrigation": "Mga halaman at irigasyon",
  "Hardscape": "Hardscape",
  "Design": "Disenyo",
  "Fixtures and materials": "Fixtures at materyales",
  "Pool shell": "Shell ng pool",
  "Pool deck": "Deck ng pool",
  "Equipment and site work": "Kagamitan at gawain sa lugar",
  "Fence and permits": "Bakod at permit",
  "Base wall": "Batayang dingding",
  "Excavation, drainage and engineering": "Paghuhukay, drainage at engineering",
  "Tank": "Tangke",
  "Drain field": "Drain field",
  "Site work, design and restoration": "Gawain sa lugar, disenyo at pagsasaayos",
  "Pipe replacement": "Pagpapalit ng tubo",
  "Excavation, restoration and permits": "Paghuhukay, pagsasaayos at permit",
  "Remediation": "Remediation",
  "Testing and containment": "Pagsusuri at containment",
  "Repairs and temporary lodging": "Pag-aayos at pansamantalang tuluyan",
  "Drilling and casing": "Pagbabarena at casing",
  "Pump system": "Sistema ng bomba",
  "Testing, permits and access": "Pagsusuri, permit at access",
  "Window units": "Mga yunit ng bintana",
  "Trim, disposal and permits": "Trim, pagtatapon at permit"
 }
};
  function curLang() { return (window.DCHI18N && window.DCHI18N.getLanguage && window.DCHI18N.getLanguage()) || document.documentElement.lang || 'en'; }
  function t(tpl) {
    var a = Array.prototype.slice.call(arguments, 1), d = D[curLang()];
    return ((d && d[tpl]) || tpl).replace(/\{(\d+)\}/g, function (m, i) { return a[+i]; });
  }
  function locale() { return window.DCHI18N && window.DCHI18N.getLocale ? window.DCHI18N.getLocale() : 'en-US'; }
  function money(x) { return new Intl.NumberFormat(locale(), {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', useGrouping: 'always', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(x); }
  function share(x, total) { if (!(total > 0)) return t('n/a'); return new Intl.NumberFormat(locale(), {style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1}).format(x / total); }
  function el(tag, text, cls) { var e = document.createElement(tag); if (text !== undefined) e.textContent = text; if (cls) e.className = cls; return e; }
  function cell(text, v) { var c = el('td', text); if (v !== undefined && v !== null) c.setAttribute('data-v', String(v)); return c; }
  function table(caption, heads, rows, cls) {
    var wrap = el('div', undefined, 'dch-scenario-table dch-costbd-table ' + (cls || '')), tb = el('table');
    tb.appendChild(el('caption', caption));
    var hr = el('tr'), thead = el('thead');
    heads.forEach(function (h) { var c = el('th', h); c.setAttribute('scope', 'col'); hr.appendChild(c); });
    thead.appendChild(hr); tb.appendChild(thead);
    var body = el('tbody');
    rows.forEach(function (r) {
      var tr = el('tr'); if (r.cls) tr.className = r.cls;
      var th = el('th', r.label); th.setAttribute('scope', 'row'); tr.appendChild(th);
      r.cells.forEach(function (c) { tr.appendChild(c); });
      body.appendChild(tr);
    });
    tb.appendChild(body); wrap.appendChild(tb);
    return wrap;
  }
  function plainLabel(id) {
    var l = document.querySelector('label[for="' + id + '"]');
    return (l ? l.textContent.replace(/\s+/g, ' ').trim() : id).replace(/\s*[\uff08(][^)\uff09]*[)\uff09]\s*$/, '').replace(/[:\uff1a]\s*$/, '');
  }
  var st = document.createElement('style');
  st.setAttribute('data-dch-costbd-style', '1');
  st.textContent = '.dch-costbd-table table{table-layout:fixed;width:100%}.dch-costbd-table thead th:first-child{width:38%}.dch-costbd-table th,.dch-costbd-table td{overflow-wrap:break-word!important;word-break:normal!important;hyphens:none!important;padding:8px 3px!important;font-size:.76rem!important}@media (max-width:480px){.dch-costbd{font-size:.7rem}.dch-costbd th,.dch-costbd td{padding:6px 2px}}.dch-costbd-sens thead th:first-child{width:30%}.dch-costbd-sens th,.dch-costbd-sens td{font-size:.72rem!important;padding:6px 2px!important}.dch-costbd-table tr.dch-total th,.dch-costbd-table tr.dch-total td{font-weight:700}';
  document.head.appendChild(st);

  var S = {};
  S['attic-conversion-cost'] = {ids: ["squareFeet", "costPerSqFt", "stairs", "hvac", "permits", "contingencyRate"], ints: [], pos: ["squareFeet"], cont: 'contingencyRate', parts: function (v) { return [
      ['Base construction', v.squareFeet*v.costPerSqFt],
      ['Stairs, HVAC and permits', v.stairs+v.hvac+v.permits]]; }};
  S['basement-remodel-cost'] = {ids: ["area", "costPerSqFt", "bathroomCost", "egressCost", "permitCost", "contingencyRate"], ints: [], pos: ["area"], cont: 'contingencyRate', parts: function (v) { return [
      ['Base finishing', v.area*v.costPerSqFt],
      ['Bathroom, egress and permits', v.bathroomCost+v.egressCost+v.permitCost]]; }};
  S['basement-waterproofing-cost'] = {ids: ["perimeter", "drainRate", "pumps", "pumpCost", "wallArea", "sealRate", "exteriorWork", "permits", "contingency"], ints: ["pumps"], pos: [], cont: 'contingency', parts: function (v) { return [
      ['Interior drainage and pumps', v.perimeter*v.drainRate+v.pumps*v.pumpCost],
      ['Wall sealing', v.wallArea*v.sealRate],
      ['Exterior work and permits', v.exteriorWork+v.permits]]; }};
  S['bathroom-remodel-cost'] = {ids: ["area", "materialRate", "laborRate", "fixtures", "permits", "contingency"], ints: [], pos: ["area"], cont: 'contingency', parts: function (v) { return [
      ['Materials', v.area*v.materialRate],
      ['Fixtures', v.fixtures],
      ['Labor', (v.area*v.materialRate+v.fixtures)*v.laborRate/100],
      ['Permits and design', v.permits]]; }};
  S['bathroom-tile-cost'] = {ids: ["floorArea", "wallArea", "tileRate", "floorInstallRate", "wallInstallRate", "waterproofing", "demoCost", "trimCost", "contingencyRate"], ints: [], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['Tile material', (v.floorArea+v.wallArea)*v.tileRate],
      ['Installation labor', v.floorArea*v.floorInstallRate+v.wallArea*v.wallInstallRate],
      ['Waterproofing, demolition and trim', v.waterproofing+v.demoCost+v.trimCost]]; }};
  S['chimney-repair-cost'] = {ids: ["masonryArea", "masonryRate", "liner", "capFlashing", "scaffolding", "inspection", "contingency"], ints: [], pos: [], cont: 'contingency', parts: function (v) { return [
      ['Masonry repair', v.masonryArea*v.masonryRate],
      ['Liner, cap and flashing', v.liner+v.capFlashing],
      ['Scaffolding and inspection', v.scaffolding+v.inspection]]; }};
  S['countertop-cost'] = {ids: ["countertopArea", "materialRate", "installRate", "demoCost", "cutouts", "cutoutCost", "backsplashArea", "backsplashRate", "deliveryCost", "contingencyRate"], ints: [], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['Material', v.countertopArea*v.materialRate],
      ['Installation', v.countertopArea*v.installRate],
      ['Cutouts and backsplash', v.cutouts*v.cutoutCost+v.backsplashArea*v.backsplashRate],
      ['Removal and delivery', v.demoCost+v.deliveryCost]]; }};
  S['crawl-space-encapsulation-cost'] = {ids: ["area", "linerRate", "laborRate", "drainage", "dehumidifier", "moldTreatment", "permits", "contingency"], ints: [], pos: [], cont: 'contingency', parts: function (v) { return [
      ['Liner and labor', v.area*(v.linerRate+v.laborRate)],
      ['Drainage, dehumidifier, mold treatment and permits', v.drainage+v.dehumidifier+v.moldTreatment+v.permits]]; }};
  S['deck-cost'] = {ids: ["deckArea", "materialRate", "laborRate", "railingLength", "railingRate", "permits", "contingency"], ints: [], pos: ["deckArea"], cont: 'contingency', parts: function (v) { return [
      ['Materials', v.deckArea*v.materialRate],
      ['Labor', v.deckArea*v.laborRate],
      ['Railing', v.railingLength*v.railingRate],
      ['Permits', v.permits]]; }};
  S['demolition-cost'] = {ids: ["area", "demoRate", "hazardous", "disposal", "utilities", "permits", "restoration", "contingency"], ints: [], pos: [], cont: 'contingency', parts: function (v) { return [
      ['Demolition', v.area*v.demoRate],
      ['Hazardous materials and disposal', v.hazardous+v.disposal],
      ['Utilities, permits and restoration', v.utilities+v.permits+v.restoration]]; }};
  S['driveway-cost'] = {ids: ["area", "installRate", "removalArea", "removalRate", "basePrep", "drainage", "permitCost", "contingencyRate"], ints: [], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['New installation', v.area*v.installRate],
      ['Old surface removal', v.removalArea*v.removalRate],
      ['Base prep, drainage and permits', v.basePrep+v.drainage+v.permitCost]]; }};
  S['ductwork-replacement-cost'] = {ids: ["area", "ratePerSqFt", "removalCost", "accessFactor", "sealingTesting", "finishRepairs", "permitCost", "contingencyRate"], ints: [], pos: ["accessFactor"], cont: 'contingencyRate', parts: function (v) { return [
      ['Ductwork before access adjustment', v.area*v.ratePerSqFt],
      ['Access adjustment', v.area*v.ratePerSqFt*v.accessFactor-v.area*v.ratePerSqFt],
      ['Removal, sealing, repairs and permits', v.removalCost+v.sealingTesting+v.finishRepairs+v.permitCost]]; }};
  S['electrical-project-cost'] = {ids: ["laborHours", "hourlyRate", "materialsCost", "panelCost", "accessCost", "permitCost", "contingencyRate"], ints: [], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['Labor', v.laborHours*v.hourlyRate],
      ['Materials and panel', v.materialsCost+v.panelCost],
      ['Access and permits', v.accessCost+v.permitCost]]; }};
  S['fence-cost'] = {ids: ["length", "materialPerFoot", "laborPerFoot", "gateCount", "gateCost", "removalCost", "permitCost", "contingencyRate"], ints: ["gateCount"], pos: ["length"], cont: 'contingencyRate', parts: function (v) { return [
      ['Materials', v.length*v.materialPerFoot],
      ['Labor', v.length*v.laborPerFoot],
      ['Gates', v.gateCount*v.gateCost],
      ['Removal and permits', v.removalCost+v.permitCost]]; }};
  S['foundation-repair-cost'] = {ids: ["crackLength", "crackRate", "pierCount", "pierCost", "waterproofingCost", "engineeringCost", "permitCost", "contingencyRate"], ints: ["pierCount"], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['Crack repair', v.crackLength*v.crackRate],
      ['Piers', v.pierCount*v.pierCost],
      ['Waterproofing, engineering and permits', v.waterproofingCost+v.engineeringCost+v.permitCost]]; }};
  S['garage-cost'] = {ids: ["area", "costPerSqFt", "doorCount", "doorCost", "electricalCost", "permitCost", "contingencyRate"], ints: ["doorCount"], pos: ["area"], cont: 'contingencyRate', parts: function (v) { return [
      ['Base structure', v.area*v.costPerSqFt],
      ['Doors', v.doorCount*v.doorCost],
      ['Electrical, design and permits', v.electricalCost+v.permitCost]]; }};
  S['gutter-installation-cost'] = {ids: ["linearFeet", "materialRate", "complexityFactor", "downspouts", "downspoutCost", "removalCost", "guardRate", "contingencyRate"], ints: ["downspouts"], pos: ["complexityFactor"], cont: 'contingencyRate', parts: function (v) { return [
      ['Gutters', v.linearFeet*v.materialRate*v.complexityFactor],
      ['Downspouts', v.downspouts*v.downspoutCost],
      ['Removal and gutter guards', v.removalCost+v.linearFeet*v.guardRate]]; }};
  S['home-addition-cost'] = {ids: ["squareFeet", "costPerSqFt", "designFees", "permits", "utilities", "contingencyRate"], ints: [], pos: ["squareFeet"], cont: 'contingencyRate', parts: function (v) { return [
      ['Base construction', v.squareFeet*v.costPerSqFt],
      ['Design, permits and utilities', v.designFees+v.permits+v.utilities]]; }};
  S['kitchen-cabinet-cost'] = {ids: ["linearFeet", "cabinetRate", "installRate", "removalCost", "hardwareCost", "finishCost", "designPermit", "contingencyRate"], ints: [], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['Cabinet material', v.linearFeet*v.cabinetRate],
      ['Installation labor', v.linearFeet*v.installRate],
      ['Removal, hardware, finishing and design', v.removalCost+v.hardwareCost+v.finishCost+v.designPermit]]; }};
  S['kitchen-remodel-cost'] = {ids: ["area", "cabinets", "countertops", "appliances", "floorRate", "laborRate", "permits", "contingency"], ints: [], pos: ["area"], cont: 'contingency', parts: function (v) { return [
      ['Cabinets', v.cabinets],
      ['Countertops', v.countertops],
      ['Appliances', v.appliances],
      ['Flooring', v.area*v.floorRate],
      ['Labor', (v.cabinets+v.countertops+v.appliances+v.area*v.floorRate)*v.laborRate/100],
      ['Permits and design', v.permits]]; }};
  S['landscaping-cost'] = {ids: ["lawnArea", "lawnRate", "bedArea", "bedRate", "plantsCost", "irrigationCost", "hardscapeCost", "designCost", "contingencyRate"], ints: [], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['Lawn', v.lawnArea*v.lawnRate],
      ['Planting beds', v.bedArea*v.bedRate],
      ['Plants and irrigation', v.plantsCost+v.irrigationCost],
      ['Hardscape', v.hardscapeCost],
      ['Design', v.designCost]]; }};
  S['plumbing-cost'] = {ids: ["laborHours", "hourlyRate", "fixturesCost", "materialsCost", "accessCost", "permitCost", "contingencyRate"], ints: [], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['Labor', v.laborHours*v.hourlyRate],
      ['Fixtures and materials', v.fixturesCost+v.materialsCost],
      ['Access and permits', v.accessCost+v.permitCost]]; }};
  S['pool-cost'] = {ids: ["poolArea", "shellRate", "deckArea", "deckRate", "equipmentCost", "siteCost", "fencePermitCost", "contingencyRate"], ints: [], pos: ["poolArea"], cont: 'contingencyRate', parts: function (v) { return [
      ['Pool shell', v.poolArea*v.shellRate],
      ['Pool deck', v.deckArea*v.deckRate],
      ['Equipment and site work', v.equipmentCost+v.siteCost],
      ['Fence and permits', v.fencePermitCost]]; }};
  S['retaining-wall-cost'] = {ids: ["wallArea", "costPerSqFt", "excavation", "drainage", "engineering", "contingencyRate"], ints: [], pos: ["wallArea"], cont: 'contingencyRate', parts: function (v) { return [
      ['Base wall', v.wallArea*v.costPerSqFt],
      ['Excavation, drainage and engineering', v.excavation+v.drainage+v.engineering]]; }};
  S['septic-system-cost'] = {ids: ["tankCost", "drainArea", "drainRate", "excavationCost", "designPermit", "restorationCost", "contingencyRate"], ints: [], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['Tank', v.tankCost],
      ['Drain field', v.drainArea*v.drainRate],
      ['Site work, design and restoration', v.excavationCost+v.designPermit+v.restorationCost]]; }};
  S['sewer-line-replacement-cost'] = {ids: ["length", "costPerFoot", "excavation", "restoration", "permits", "contingencyRate"], ints: [], pos: ["length"], cont: 'contingencyRate', parts: function (v) { return [
      ['Pipe replacement', v.length*v.costPerFoot],
      ['Excavation, restoration and permits', v.excavation+v.restoration+v.permits]]; }};
  S['mold-remediation-cost'] = {ids: ["affectedArea", "remediationRate", "testingCost", "containmentCost", "repairCost", "lodgingCost", "contingencyRate"], ints: [], pos: [], cont: 'contingencyRate', parts: function (v) { return [
      ['Remediation', v.affectedArea*v.remediationRate],
      ['Testing and containment', v.testingCost+v.containmentCost],
      ['Repairs and temporary lodging', v.repairCost+v.lodgingCost]]; }};
  S['well-drilling-cost'] = {ids: ["depth", "drillRate", "casingRate", "pump", "testing", "permits", "access", "contingency"], ints: [], pos: ["depth"], cont: 'contingency', parts: function (v) { return [
      ['Drilling and casing', v.depth*(v.drillRate+v.casingRate)],
      ['Pump system', v.pump],
      ['Testing, permits and access', v.testing+v.permits+v.access]]; }};
  S['window-replacement-cost'] = {ids: ["windowCount", "windowCost", "laborPerWindow", "trimFinish", "permits", "contingency"], ints: ["windowCount"], pos: ["windowCount"], cont: 'contingency', parts: function (v) { return [
      ['Window units', v.windowCount*v.windowCost],
      ['Installation labor', v.windowCount*v.laborPerWindow],
      ['Trim, disposal and permits', v.trimFinish+v.permits]]; }};
  var slug = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  var spec = S[slug];
  if (!spec) return;

  /* Copy of the page's own formula: subtotal = sum of the parts, total = subtotal + subtotal x contingency / 100. */
  function run(v) {
    var i, k;
    for (i = 0; i < spec.ids.length; i++) { k = v[spec.ids[i]]; if (typeof k !== 'number' || !isFinite(k) || k < 0) return null; }
    for (i = 0; i < spec.pos.length; i++) { if (!(v[spec.pos[i]] > 0)) return null; }
    var parts = spec.parts(v), sub = 0;
    for (i = 0; i < parts.length; i++) sub += parts[i][1];
    var cont = sub * v[spec.cont] / 100;
    return {parts: parts, sub: sub, cont: cont, total: sub + cont};
  }

  function render() {
    box.textContent = '';
    var ctrl = window.DCHCalculator.getController && window.DCHCalculator.getController();
    if (!ctrl || !ctrl.ok) { box.hidden = true; return; }
    try {
      var vals = {}, i;
      for (i = 0; i < spec.ids.length; i++) {
        var e = document.getElementById(spec.ids[i]);
        if (!e) { box.hidden = true; return; }
        vals[spec.ids[i]] = window.DCHCalculator.numeric(e.value);
      }
      var b = run(vals);
      if (b === null) { box.hidden = true; return; }
      box.hidden = false; box.className = 'dch-detail dch-costbd';

      box.appendChild(el('h3', t('Where the total goes')));
      box.appendChild(el('p', t('Total as entered: {0}.', money(b.total)), 'dch-note'));
      var rows = b.parts.map(function (p) {
        return {label: t(p[0]), cells: [cell(money(p[1]), p[1]), cell(share(p[1], b.total), b.total > 0 ? p[1] / b.total : '')]};
      });
      rows.push({label: t('Contingency'), cells: [cell(money(b.cont), b.cont), cell(share(b.cont, b.total), b.total > 0 ? b.cont / b.total : '')]});
      rows.push({label: t('Total'), cls: 'dch-total', cells: [cell(money(b.total), b.total), cell(share(b.total, b.total), b.total > 0 ? 1 : '')]});
      box.appendChild(table(t('Split of the total into parts'), [t('Part'), t('Amount'), t('Share of total')], rows));
      box.appendChild(el('p', t('Each part is worked out with the calculator\u2019s own arithmetic from your entries. Contingency is your percentage applied to the subtotal of all the other parts.'), 'dch-note'));

      var sens = spec.ids.map(function (id) {
        var lo = {}, hi = {}, k;
        for (k in vals) { lo[k] = vals[k]; hi[k] = vals[k]; }
        lo[id] = vals[id] * 0.9; hi[id] = vals[id] * 1.1;
        var whole = spec.ints.indexOf(id) >= 0;
        var ao = (whole && !Number.isInteger(lo[id])) ? null : run(lo);
        var bo = (whole && !Number.isInteger(hi[id])) ? null : run(hi);
        var a = ao ? ao.total : null, c = bo ? bo.total : null;
        return {id: id, a: a, b: c, swing: (a === null || c === null) ? -1 : Math.abs(c - a)};
      });
      sens.sort(function (x, y) { return y.swing - x.swing; });
      box.appendChild(el('h3', t('What moves the total most')));
      box.appendChild(table(t('Effect of a 10% change in each entry, largest first'), [t('Entry'), t('10% lower'), t('10% higher'), t('Swing')], sens.map(function (r) {
        return {label: plainLabel(r.id), cells: [
          cell(r.a === null ? t('n/a') : money(r.a), r.a === null ? '' : r.a),
          cell(r.b === null ? t('n/a') : money(r.b), r.b === null ? '' : r.b),
          cell(r.swing < 0 ? t('n/a') : money(r.swing), r.swing < 0 ? '' : r.swing)]};
      }), 'dch-costbd-sens'));
      var top = sens[0];
      if (top && top.swing > 0) box.appendChild(el('p', t('The entry with the largest swing is "{0}": a 10% change moves the total between {1} and {2}.', plainLabel(top.id), money(top.a), money(top.b)), 'dch-note'));
      box.appendChild(el('p', t('Each row changes one entry by 10% of its own value and re-runs the calculator\u2019s own arithmetic. The other entries stay as you typed them. These are comparisons, not quotes or forecasts.'), 'dch-note'));
      box.appendChild(el('p', t('Rows marked n/a fall outside the range the calculator accepts. Whole-number entries are only tested at whole numbers, so a row can read n/a when 10% of the entry is not a whole number.'), 'dch-note'));
    } catch (err) { box.hidden = true; }
  }

  var queued = false;
  function schedule() { if (queued) return; queued = true; setTimeout(function () { queued = false; render(); }, 0); }
  document.querySelectorAll('.form-control').forEach(function (f) { f.addEventListener('input', schedule); });
  var cb = document.getElementById('calculateButton'); if (cb) cb.addEventListener('click', schedule);
  window.addEventListener('load', function () { setTimeout(render, 700); });
  setTimeout(render, 900);
})();
