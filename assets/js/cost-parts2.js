/* Cost pages built from amounts, credits and a contingency: where the total goes, and a 10% sensitivity check. The arithmetic is a copy of each page's own formula, so every figure matches the page for the same entries. These are comparisons, not quotes. */
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
  "Trim, disposal and permits": "Acabado, eliminación y permisos",
  "Equipment": "Equipo",
  "Ductwork": "Conductos",
  "Electrical work": "Trabajo eléctrico",
  "Permits and removal": "Permisos y retiro",
  "Rebates": "Reembolsos",
  "Venting": "Ventilación",
  "Utility upgrade": "Mejora de servicios",
  "Abatement": "Abatimiento",
  "Testing": "Pruebas",
  "Containment": "Contención",
  "Disposal": "Eliminación",
  "Clearance testing": "Pruebas de liberación",
  "Base transport": "Transporte base",
  "Urgency and fuel surcharges": "Recargos por urgencia y combustible",
  "Enclosed transport and coverage": "Transporte cerrado y cobertura",
  "Compute (12 months)": "Cómputo (12 meses)",
  "Storage and data transfer (12 months)": "Almacenamiento y transferencia de datos (12 meses)",
  "Managed services (12 months)": "Servicios gestionados (12 meses)",
  "Support (12 months)": "Soporte (12 meses)",
  "Development": "Desarrollo",
  "Project management": "Gestión de proyecto",
  "Quality assurance": "Control de calidad",
  "Infrastructure": "Infraestructura",
  "Licenses": "Licencias",
  "User services": "Servicios por usuario",
  "Endpoint services": "Servicios por dispositivo",
  "Monitoring": "Monitoreo",
  "Assessment": "Evaluación",
  "Incident retainer": "Anticipo para incidentes",
  "Additional training": "Capacitación adicional",
  "Battery and parts": "Batería y piezas",
  "Labor and diagnostics": "Mano de obra y diagnóstico",
  "Sales tax on battery and parts": "Impuesto sobre batería y piezas",
  "Core credit and warranty": "Crédito por devolución y garantía",
  "Charger": "Cargador",
  "Base labor": "Mano de obra base",
  "Wiring": "Cableado",
  "Panel upgrade": "Mejora del panel",
  "Other costs": "Otros costos",
  "Openers": "Abridores",
  "Trim repairs": "Reparación de molduras",
  "Incentives": "Incentivos",
  "Base fee": "Tarifa base",
  "Size surcharge": "Recargo por tamaño",
  "Complexity and specialty fees": "Cargos por complejidad y especialidad",
  "Rush and travel fees": "Cargos por urgencia y viaje",
  "Equipment and added floors": "Equipo y pisos adicionales",
  "Construction and electrical work": "Construcción y trabajo eléctrico",
  "Design, permits and finishes": "Diseño, permisos y acabados",
  "Size and age surcharges": "Recargos por tamaño y antigüedad",
  "Radon, sewer and mold tests": "Pruebas de radón, alcantarillado y moho",
  "Specialty inspection": "Inspección de especialidad",
  "Insulation": "Aislamiento",
  "Air sealing": "Sellado de aire",
  "Old insulation removal": "Retiro del aislamiento viejo",
  "Access work": "Trabajo de acceso",
  "Equipment and sensors": "Equipo y sensores",
  "Installation and activation": "Instalación y activación",
  "User support (12 months)": "Soporte a usuarios (12 meses)",
  "Devices and security (12 months)": "Dispositivos y seguridad (12 meses)",
  "Projects (12 months)": "Proyectos (12 meses)",
  "One-time onboarding": "Incorporación única",
  "Zones": "Zonas",
  "Removal": "Retiro",
  "Platform setup": "Configuración de plataformas",
  "Design and development labor": "Mano de obra de diseño y desarrollo",
  "Backend and QA": "Backend y QA",
  "Initial and recurring service": "Servicio inicial y recurrente",
  "Specialty and exclusion work": "Trabajo especializado y de exclusión",
  "Annual-plan discount": "Descuento por plan anual",
  "Base system and added zones": "Sistema base y zonas adicionales",
  "Crawl-space work": "Trabajo en espacio de arrastre",
  "Electrical, testing and permits": "Electricidad, pruebas y permisos",
  "Installation and removal labor": "Mano de obra de instalación y retiro",
  "Batteries": "Baterías",
  "Installation, upgrades and permits": "Instalación, mejoras y permisos",
  "Controller and backflow": "Controlador y antirretorno",
  "Trenching and permits": "Zanjas y permisos",
  "Generator": "Generador",
  "Transfer switch": "Interruptor de transferencia",
  "Fuel connection": "Conexión de combustible",
  "Site and permits": "Sitio y permisos",
  "First-year maintenance": "Mantenimiento del primer año",
  "Formation and legal": "Constitución y legal",
  "Equipment and technology": "Equipo y tecnología",
  "Buildout": "Adecuación",
  "Starting inventory": "Inventario inicial",
  "Launch marketing": "Marketing de lanzamiento",
  "Deposits and prepayments": "Depósitos y pagos anticipados",
  "Working-capital reserve": "Reserva de capital de trabajo",
  "Parts and fluids": "Piezas y fluidos",
  "Diagnostics and towing": "Diagnóstico y remolque",
  "Sales tax on parts and fluids": "Impuesto sobre piezas y fluidos",
  "Tree removal": "Retiro de árboles",
  "Stump grinding": "Trituración de tocones",
  "Debris hauling": "Retiro de escombros",
  "Extraction, drying and demolition": "Extracción, secado y demolición",
  "Reconstruction and mold treatment": "Reconstrucción y tratamiento de moho",
  "Estimated insurance payment": "Pago estimado del seguro",
  "Unit": "Unidad",
  "Upgrades": "Mejoras",
  "Page content": "Contenido de páginas",
  "Features, SEO and hosting setup": "Funciones, SEO y alojamiento",
  "Adjustment (the total cannot go below zero)": "Ajuste (el total no puede ser menor que cero)",
  "Parts are the figures from your entries; credits, rebates and discounts are shown as negative amounts. Contingency is your percentage applied to the subtotal of the parts before it.": "Las partes son las cifras de tus datos; los créditos, reembolsos y descuentos aparecen como importes negativos. La contingencia es tu porcentaje aplicado al subtotal de las partes anteriores."
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
  "Trim, disposal and permits": "收边、处置和许可",
  "Equipment": "设备",
  "Ductwork": "风管",
  "Electrical work": "电气工程",
  "Permits and removal": "许可和拆除",
  "Rebates": "补贴",
  "Venting": "排风",
  "Utility upgrade": "公用设施升级",
  "Abatement": "清除作业",
  "Testing": "检测",
  "Containment": "隔离封闭",
  "Disposal": "处置",
  "Clearance testing": "清除后检测",
  "Base transport": "基础运输费",
  "Urgency and fuel surcharges": "加急和燃油附加费",
  "Enclosed transport and coverage": "封闭运输和保障",
  "Compute (12 months)": "计算资源（12 个月）",
  "Storage and data transfer (12 months)": "存储和数据传输（12 个月）",
  "Managed services (12 months)": "托管服务（12 个月）",
  "Support (12 months)": "支持（12 个月）",
  "Development": "开发",
  "Project management": "项目管理",
  "Quality assurance": "质量保证",
  "Infrastructure": "基础设施",
  "Licenses": "许可证",
  "User services": "按用户的服务",
  "Endpoint services": "按终端的服务",
  "Monitoring": "监控",
  "Assessment": "评估",
  "Incident retainer": "事件响应预付费",
  "Additional training": "额外培训",
  "Battery and parts": "电池和配件",
  "Labor and diagnostics": "人工和诊断",
  "Sales tax on battery and parts": "电池和配件的销售税",
  "Core credit and warranty": "旧电池抵扣和质保",
  "Charger": "充电桩",
  "Base labor": "基础人工",
  "Wiring": "布线",
  "Panel upgrade": "配电箱升级",
  "Other costs": "其他费用",
  "Openers": "开门器",
  "Trim repairs": "门框修补",
  "Incentives": "奖励",
  "Base fee": "基本费用",
  "Size surcharge": "面积附加费",
  "Complexity and specialty fees": "复杂度和特殊费用",
  "Rush and travel fees": "加急和差旅费用",
  "Equipment and added floors": "设备和增加的楼层",
  "Construction and electrical work": "施工和电气工程",
  "Design, permits and finishes": "设计、许可和装修",
  "Size and age surcharges": "面积和房龄附加费",
  "Radon, sewer and mold tests": "氡、下水道和霉菌检测",
  "Specialty inspection": "专项检查",
  "Insulation": "保温层",
  "Air sealing": "密封漏风",
  "Old insulation removal": "旧保温层拆除",
  "Access work": "出入通道施工",
  "Equipment and sensors": "设备和传感器",
  "Installation and activation": "安装和开通",
  "User support (12 months)": "用户支持（12 个月）",
  "Devices and security (12 months)": "设备和安全（12 个月）",
  "Projects (12 months)": "项目（12 个月）",
  "One-time onboarding": "一次性接入费",
  "Zones": "区域",
  "Removal": "拆除",
  "Platform setup": "平台搭建",
  "Design and development labor": "设计和开发人工",
  "Backend and QA": "后端和测试",
  "Initial and recurring service": "首次及定期服务",
  "Specialty and exclusion work": "专项和防入侵工程",
  "Annual-plan discount": "年度套餐折扣",
  "Base system and added zones": "基础系统和额外区域",
  "Crawl-space work": "地下空间工程",
  "Electrical, testing and permits": "电气、检测和许可",
  "Installation and removal labor": "安装和拆除人工",
  "Batteries": "电池",
  "Installation, upgrades and permits": "安装、升级和许可",
  "Controller and backflow": "控制器和防回流",
  "Trenching and permits": "开沟和许可",
  "Generator": "发电机",
  "Transfer switch": "转换开关",
  "Fuel connection": "燃料接入",
  "Site and permits": "现场和许可",
  "First-year maintenance": "第一年维护",
  "Formation and legal": "注册和法律",
  "Equipment and technology": "设备和技术",
  "Buildout": "场地装修",
  "Starting inventory": "开业库存",
  "Launch marketing": "开业营销",
  "Deposits and prepayments": "押金和预付款",
  "Working-capital reserve": "营运资金储备",
  "Parts and fluids": "配件和油液",
  "Diagnostics and towing": "诊断和拖车",
  "Sales tax on parts and fluids": "配件和油液的销售税",
  "Tree removal": "树木移除",
  "Stump grinding": "磨除树桩",
  "Debris hauling": "残枝清运",
  "Extraction, drying and demolition": "抽水、干燥和拆除",
  "Reconstruction and mold treatment": "重建和霉菌处理",
  "Estimated insurance payment": "预估保险赔付",
  "Unit": "设备本体",
  "Upgrades": "升级",
  "Page content": "页面内容",
  "Features, SEO and hosting setup": "功能、SEO 和托管搭建",
  "Adjustment (the total cannot go below zero)": "调整（总额不能低于零）",
  "Parts are the figures from your entries; credits, rebates and discounts are shown as negative amounts. Contingency is your percentage applied to the subtotal of the parts before it.": "各部分来自您的输入；抵扣、补贴和折扣以负数显示。应急费用是您的百分比乘以其之前各部分的小计。"
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
  "Permits": "Mga permit",
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
  "Trim, disposal and permits": "Trim, pagtatapon at permit",
  "Equipment": "Kagamitan",
  "Ductwork": "Ductwork",
  "Electrical work": "Gawaing elektrikal",
  "Permits and removal": "Permit at pagtanggal",
  "Rebates": "Mga rebate",
  "Venting": "Bentilasyon",
  "Utility upgrade": "Upgrade ng utility",
  "Abatement": "Abatement",
  "Testing": "Pagsusuri",
  "Containment": "Containment",
  "Disposal": "Pagtatapon",
  "Clearance testing": "Clearance testing",
  "Base transport": "Batayang transportasyon",
  "Urgency and fuel surcharges": "Surcharge sa rush at gasolina",
  "Enclosed transport and coverage": "Saradong transportasyon at coverage",
  "Compute (12 months)": "Compute (12 buwan)",
  "Storage and data transfer (12 months)": "Storage at data transfer (12 buwan)",
  "Managed services (12 months)": "Managed services (12 buwan)",
  "Support (12 months)": "Suporta (12 buwan)",
  "Development": "Development",
  "Project management": "Pamamahala ng proyekto",
  "Quality assurance": "Quality assurance",
  "Infrastructure": "Imprastraktura",
  "Licenses": "Mga lisensya",
  "User services": "Serbisyo kada user",
  "Endpoint services": "Serbisyo kada endpoint",
  "Monitoring": "Monitoring",
  "Assessment": "Pagtatasa",
  "Incident retainer": "Retainer para sa insidente",
  "Additional training": "Karagdagang pagsasanay",
  "Battery and parts": "Baterya at mga piyesa",
  "Labor and diagnostics": "Labor at diagnostics",
  "Sales tax on battery and parts": "Buwis sa baterya at piyesa",
  "Core credit and warranty": "Core credit at warranty",
  "Charger": "Charger",
  "Base labor": "Batayang labor",
  "Wiring": "Wiring",
  "Panel upgrade": "Upgrade ng panel",
  "Other costs": "Iba pang gastos",
  "Openers": "Mga opener",
  "Trim repairs": "Pag-aayos ng trim",
  "Incentives": "Mga insentibo",
  "Base fee": "Batayang bayad",
  "Size surcharge": "Surcharge sa laki",
  "Complexity and specialty fees": "Singil sa pagiging komplikado at espesyalidad",
  "Rush and travel fees": "Singil sa rush at biyahe",
  "Equipment and added floors": "Kagamitan at karagdagang palapag",
  "Construction and electrical work": "Konstruksiyon at elektrikal na trabaho",
  "Design, permits and finishes": "Disenyo, permit at finish",
  "Size and age surcharges": "Surcharge sa laki at edad",
  "Radon, sewer and mold tests": "Pagsusuri sa radon, sewer at amag",
  "Specialty inspection": "Espesyal na inspeksyon",
  "Insulation": "Insulation",
  "Air sealing": "Air sealing",
  "Old insulation removal": "Pagtanggal ng lumang insulation",
  "Access work": "Trabaho sa access",
  "Equipment and sensors": "Kagamitan at sensor",
  "Installation and activation": "Pag-install at activation",
  "User support (12 months)": "Suporta sa user (12 buwan)",
  "Devices and security (12 months)": "Mga device at seguridad (12 buwan)",
  "Projects (12 months)": "Mga proyekto (12 buwan)",
  "One-time onboarding": "Minsanang onboarding",
  "Zones": "Mga zone",
  "Removal": "Pagtanggal",
  "Platform setup": "Setup ng platform",
  "Design and development labor": "Labor sa disenyo at development",
  "Backend and QA": "Backend at QA",
  "Initial and recurring service": "Inisyal at umuulit na serbisyo",
  "Specialty and exclusion work": "Espesyal at exclusion na trabaho",
  "Annual-plan discount": "Diskwento sa taunang plano",
  "Base system and added zones": "Batayang sistema at karagdagang zone",
  "Crawl-space work": "Trabaho sa crawl space",
  "Electrical, testing and permits": "Elektrikal, testing at permit",
  "Installation and removal labor": "Labor sa pag-install at pagtanggal",
  "Batteries": "Mga baterya",
  "Installation, upgrades and permits": "Pag-install, mga upgrade at permit",
  "Controller and backflow": "Controller at backflow",
  "Trenching and permits": "Trenching at mga permit",
  "Generator": "Generator",
  "Transfer switch": "Transfer switch",
  "Fuel connection": "Koneksyon ng gasolina",
  "Site and permits": "Site at mga permit",
  "First-year maintenance": "Maintenance sa unang taon",
  "Formation and legal": "Pagtatatag at legal",
  "Equipment and technology": "Kagamitan at teknolohiya",
  "Buildout": "Buildout",
  "Starting inventory": "Panimulang imbentaryo",
  "Launch marketing": "Marketing sa paglulunsad",
  "Deposits and prepayments": "Mga deposito at paunang bayad",
  "Working-capital reserve": "Reserba ng working capital",
  "Parts and fluids": "Mga piyesa at fluid",
  "Diagnostics and towing": "Diagnostics at towing",
  "Sales tax on parts and fluids": "Buwis sa piyesa at fluid",
  "Tree removal": "Pagtanggal ng puno",
  "Stump grinding": "Paggiling ng tuod",
  "Debris hauling": "Paghakot ng kalat",
  "Extraction, drying and demolition": "Extraction, drying at demolition",
  "Reconstruction and mold treatment": "Reconstruction at paggamot sa amag",
  "Estimated insurance payment": "Tinatayang bayad ng insurance",
  "Unit": "Unit",
  "Upgrades": "Mga upgrade",
  "Page content": "Nilalaman ng pahina",
  "Features, SEO and hosting setup": "Mga feature, SEO at setup ng hosting",
  "Adjustment (the total cannot go below zero)": "Adjustment (hindi maaaring bumaba sa zero ang kabuuan)",
  "Parts are the figures from your entries; credits, rebates and discounts are shown as negative amounts. Contingency is your percentage applied to the subtotal of the parts before it.": "Ang mga bahagi ay mga numero mula sa iyong mga input; ipinapakita bilang negatibong halaga ang mga credit, rebate at diskwento. Ang contingency ay ang porsyento mo na inilapat sa subtotal ng mga naunang bahagi."
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
  S['ac-replacement-cost'] = {ids: ["equipmentCost", "laborCost", "ductCost", "electricalCost", "permitRemoval", "rebates", "contingencyRate"], ints: [], pos: [], chk: function (v) { return true; }, max0: true, parts: [
      ['Equipment', function (v, s) { return v.equipmentCost; }],
      ['Labor', function (v, s) { return v.laborCost; }],
      ['Ductwork', function (v, s) { return v.ductCost; }],
      ['Electrical work', function (v, s) { return v.electricalCost; }],
      ['Permits and removal', function (v, s) { return v.permitRemoval; }],
      ['Contingency', function (v, s) { return s*v.contingencyRate/100; }],
      ['Rebates', function (v, s) { return -v.rebates; }]]};
  S['furnace-replacement-cost'] = {ids: ["equipmentCost", "laborCost", "ventingCost", "utilityUpgrade", "permitRemoval", "rebates", "contingencyRate"], ints: [], pos: [], chk: function (v) { return true; }, max0: true, parts: [
      ['Equipment', function (v, s) { return v.equipmentCost; }],
      ['Labor', function (v, s) { return v.laborCost; }],
      ['Venting', function (v, s) { return v.ventingCost; }],
      ['Utility upgrade', function (v, s) { return v.utilityUpgrade; }],
      ['Permits and removal', function (v, s) { return v.permitRemoval; }],
      ['Contingency', function (v, s) { return s*v.contingencyRate/100; }],
      ['Rebates', function (v, s) { return -v.rebates; }]]};
  S['asbestos-removal-cost'] = {ids: ["area", "abatementRate", "testing", "containment", "disposal", "clearance", "contingency"], ints: [], pos: [], chk: function (v) { return true; }, max0: false, parts: [
      ['Abatement', function (v, s) { return v.area*v.abatementRate; }],
      ['Testing', function (v, s) { return v.testing; }],
      ['Containment', function (v, s) { return v.containment; }],
      ['Disposal', function (v, s) { return v.disposal; }],
      ['Clearance testing', function (v, s) { return v.clearance; }],
      ['Contingency', function (v, s) { return s*v.contingency/100; }]]};
  S['car-shipping-cost'] = {ids: ["distance", "ratePerMile", "vehicleFactor", "enclosedSurcharge", "urgencyPercent", "fuelPercent", "coverage"], ints: [], pos: ["distance", "vehicleFactor"], chk: function (v) { return true; }, max0: false, parts: [
      ['Base transport', function (v, s) { return v.distance*v.ratePerMile*v.vehicleFactor; }],
      ['Urgency and fuel surcharges', function (v, s) { return s*(v.urgencyPercent+v.fuelPercent)/100; }],
      ['Enclosed transport and coverage', function (v, s) { return v.enclosedSurcharge+v.coverage; }]]};
  S['cloud-cost'] = {ids: ["instances", "computeMonthly", "storageTb", "storageMonthly", "transferTb", "transferRate", "managedMonthly", "supportPercent"], ints: ["instances"], pos: [], chk: function (v) { return true; }, max0: false, parts: [
      ['Compute (12 months)', function (v, s) { return v.instances*v.computeMonthly*12; }],
      ['Storage and data transfer (12 months)', function (v, s) { return (v.storageTb*v.storageMonthly+v.transferTb*v.transferRate)*12; }],
      ['Managed services (12 months)', function (v, s) { return v.managedMonthly*12; }],
      ['Support (12 months)', function (v, s) { return s*v.supportPercent/100; }]]};
  S['custom-software-development-cost'] = {ids: ["devHours", "devRate", "pmPercent", "qaPercent", "infrastructure", "licenses", "contingency"], ints: [], pos: [], chk: function (v) { return true; }, max0: false, parts: [
      ['Development', function (v, s) { return v.devHours*v.devRate; }],
      ['Project management', function (v, s) { return v.devHours*v.devRate*v.pmPercent/100; }],
      ['Quality assurance', function (v, s) { return v.devHours*v.devRate*v.qaPercent/100; }],
      ['Infrastructure', function (v, s) { return v.infrastructure; }],
      ['Licenses', function (v, s) { return v.licenses; }],
      ['Contingency', function (v, s) { return s*v.contingency/100; }]]};
  S['cybersecurity-services-cost'] = {ids: ["employees", "userAnnual", "endpoints", "endpointAnnual", "monitoring", "assessment", "incidentRetainer", "additionalTraining"], ints: ["employees", "endpoints"], pos: ["employees"], chk: function (v) { return true; }, max0: false, parts: [
      ['User services', function (v, s) { return v.employees*v.userAnnual; }],
      ['Endpoint services', function (v, s) { return v.endpoints*v.endpointAnnual; }],
      ['Monitoring', function (v, s) { return v.monitoring; }],
      ['Assessment', function (v, s) { return v.assessment; }],
      ['Incident retainer', function (v, s) { return v.incidentRetainer; }],
      ['Additional training', function (v, s) { return v.additionalTraining; }]]};
  S['ev-battery-replacement-cost'] = {ids: ["capacity", "costPerKwh", "laborHours", "laborRate", "supportParts", "diagnostics", "coreCredit", "warrantyContribution", "taxRate"], ints: [], pos: ["capacity"], chk: function (v) { return true; }, max0: true, parts: [
      ['Battery and parts', function (v, s) { return v.capacity*v.costPerKwh+v.supportParts; }],
      ['Labor and diagnostics', function (v, s) { return v.laborHours*v.laborRate+v.diagnostics; }],
      ['Sales tax on battery and parts', function (v, s) { return (v.capacity*v.costPerKwh+v.supportParts)*v.taxRate/100; }],
      ['Core credit and warranty', function (v, s) { return -(v.coreCredit+v.warrantyContribution); }]]};
  S['ev-charger-installation-cost'] = {ids: ["chargerCost", "baseLabor", "wireDistance", "wireRate", "panelUpgrade", "permitCost", "otherCost", "rebates"], ints: [], pos: [], chk: function (v) { return true; }, max0: true, parts: [
      ['Charger', function (v, s) { return v.chargerCost; }],
      ['Base labor', function (v, s) { return v.baseLabor; }],
      ['Wiring', function (v, s) { return v.wireDistance*v.wireRate; }],
      ['Panel upgrade', function (v, s) { return v.panelUpgrade; }],
      ['Permits', function (v, s) { return v.permitCost; }],
      ['Other costs', function (v, s) { return v.otherCost; }],
      ['Rebates', function (v, s) { return -v.rebates; }]]};
  S['garage-door-replacement-cost'] = {ids: ["doors", "doorCost", "installCost", "openerCost", "disposalCost", "trimRepairs", "permitCost", "rebates"], ints: ["doors"], pos: ["doors"], chk: function (v) { return true; }, max0: true, parts: [
      ['Doors', function (v, s) { return v.doors*v.doorCost; }],
      ['Installation', function (v, s) { return v.doors*v.installCost; }],
      ['Openers', function (v, s) { return v.doors*v.openerCost; }],
      ['Disposal', function (v, s) { return v.disposalCost; }],
      ['Trim repairs', function (v, s) { return v.trimRepairs; }],
      ['Permits', function (v, s) { return v.permitCost; }],
      ['Rebates', function (v, s) { return -v.rebates; }]]};
  S['heat-pump-cost'] = {ids: ["equipmentCost", "laborCost", "electricalCost", "otherCost", "incentives", "oldAnnualCost", "newAnnualCost"], ints: [], pos: [], chk: function (v) { return true; }, max0: true, parts: [
      ['Equipment', function (v, s) { return v.equipmentCost; }],
      ['Labor', function (v, s) { return v.laborCost; }],
      ['Electrical work', function (v, s) { return v.electricalCost; }],
      ['Other costs', function (v, s) { return v.otherCost; }],
      ['Incentives', function (v, s) { return -v.incentives; }]]};
  S['home-appraisal-cost'] = {ids: ["baseFee", "squareFeet", "includedSqFt", "extraPerSqFt", "complexityFee", "rushFee", "travelFee", "specialtyFee"], ints: [], pos: [], chk: function (v) { return true; }, max0: false, parts: [
      ['Base fee', function (v, s) { return v.baseFee; }],
      ['Size surcharge', function (v, s) { return Math.max(0,v.squareFeet-v.includedSqFt)*v.extraPerSqFt; }],
      ['Complexity and specialty fees', function (v, s) { return v.complexityFee+v.specialtyFee; }],
      ['Rush and travel fees', function (v, s) { return v.rushFee+v.travelFee; }]]};
  S['home-elevator-cost'] = {ids: ["equipment", "floors", "additionalFloor", "construction", "electrical", "designPermits", "finishes", "contingency"], ints: ["floors"], pos: [], chk: function (v) { return v.floors>=2; }, max0: false, parts: [
      ['Equipment and added floors', function (v, s) { return v.equipment+Math.max(0,v.floors-2)*v.additionalFloor; }],
      ['Construction and electrical work', function (v, s) { return v.construction+v.electrical; }],
      ['Design, permits and finishes', function (v, s) { return v.designPermits+v.finishes; }],
      ['Contingency', function (v, s) { return s*v.contingency/100; }]]};
  S['home-inspection-cost'] = {ids: ["baseFee", "squareFeet", "includedSqFt", "extraPerSqFt", "ageSurcharge", "radonTest", "sewerScope", "moldTest", "poolInspection"], ints: [], pos: [], chk: function (v) { return true; }, max0: false, parts: [
      ['Base fee', function (v, s) { return v.baseFee; }],
      ['Size and age surcharges', function (v, s) { return Math.max(0,v.squareFeet-v.includedSqFt)*v.extraPerSqFt+v.ageSurcharge; }],
      ['Radon, sewer and mold tests', function (v, s) { return v.radonTest+v.sewerScope+v.moldTest; }],
      ['Specialty inspection', function (v, s) { return v.poolInspection; }]]};
  S['home-insulation-cost'] = {ids: ["area", "installRate", "airSealing", "removalCost", "accessCost", "rebates", "annualSavings"], ints: [], pos: [], chk: function (v) { return true; }, max0: true, parts: [
      ['Insulation', function (v, s) { return v.area*v.installRate; }],
      ['Air sealing', function (v, s) { return v.airSealing; }],
      ['Old insulation removal', function (v, s) { return v.removalCost; }],
      ['Access work', function (v, s) { return v.accessCost; }],
      ['Rebates', function (v, s) { return -v.rebates; }]]};
  S['home-security-system-cost'] = {ids: ["baseEquipment", "sensors", "costPerSensor", "installation", "monthlyMonitoring", "months", "activation"], ints: ["sensors"], pos: [], chk: function (v) { return true; }, max0: false, parts: [
      ['Equipment and sensors', function (v, s) { return v.baseEquipment+v.sensors*v.costPerSensor; }],
      ['Installation and activation', function (v, s) { return v.installation+v.activation; }],
      ['Monitoring', function (v, s) { return v.monthlyMonitoring*v.months; }]]};
  S['managed-it-services-cost'] = {ids: ["users", "userMonthly", "devices", "deviceMonthly", "projectsMonthly", "securityMonthly", "onboarding"], ints: ["users", "devices"], pos: ["users"], chk: function (v) { return true; }, max0: false, parts: [
      ['User support (12 months)', function (v, s) { return v.users*v.userMonthly*12; }],
      ['Devices and security (12 months)', function (v, s) { return (v.devices*v.deviceMonthly+v.securityMonthly)*12; }],
      ['Projects (12 months)', function (v, s) { return v.projectsMonthly*12; }],
      ['One-time onboarding', function (v, s) { return v.onboarding; }]]};
  S['mini-split-cost'] = {ids: ["zones", "equipmentPerZone", "laborPerZone", "electricalCost", "permitCost", "removalCost", "rebates", "annualSavings"], ints: ["zones"], pos: ["zones"], chk: function (v) { return true; }, max0: true, parts: [
      ['Zones', function (v, s) { return v.zones*(v.equipmentPerZone+v.laborPerZone); }],
      ['Electrical work', function (v, s) { return v.electricalCost; }],
      ['Permits', function (v, s) { return v.permitCost; }],
      ['Removal', function (v, s) { return v.removalCost; }],
      ['Rebates', function (v, s) { return -v.rebates; }]]};
  S['mobile-app-development-cost'] = {ids: ["platforms", "platformSetup", "designHours", "designRate", "devHours", "devRate", "backend", "qaLaunch", "contingency"], ints: ["platforms"], pos: ["platforms"], chk: function (v) { return true; }, max0: false, parts: [
      ['Platform setup', function (v, s) { return v.platforms*v.platformSetup; }],
      ['Design and development labor', function (v, s) { return v.designHours*v.designRate+v.devHours*v.devRate; }],
      ['Backend and QA', function (v, s) { return v.backend+v.qaLaunch; }],
      ['Contingency', function (v, s) { return s*v.contingency/100; }]]};
  S['pest-control-cost'] = {ids: ["initialTreatment", "visits", "visitCost", "specialtyTreatment", "exclusionWork", "discountRate"], ints: ["visits"], pos: [], chk: function (v) { return v.discountRate<=100; }, max0: false, parts: [
      ['Initial and recurring service', function (v, s) { return v.initialTreatment+v.visits*v.visitCost; }],
      ['Specialty and exclusion work', function (v, s) { return v.specialtyTreatment+v.exclusionWork; }],
      ['Annual-plan discount', function (v, s) { return -s*v.discountRate/100; }]]};
  S['radon-mitigation-cost'] = {ids: ["baseSystem", "zones", "additionalZone", "crawlSpace", "electrical", "testing", "permits"], ints: ["zones"], pos: [], chk: function (v) { return v.zones>=1; }, max0: false, parts: [
      ['Base system and added zones', function (v, s) { return v.baseSystem+Math.max(0,v.zones-1)*v.additionalZone; }],
      ['Crawl-space work', function (v, s) { return v.crawlSpace; }],
      ['Electrical, testing and permits', function (v, s) { return v.electrical+v.testing+v.permits; }]]};
  S['siding-cost'] = {ids: ["wallArea", "wasteRate", "materialRate", "laborRate", "removalRate", "permits"], ints: [], pos: ["wallArea"], chk: function (v) { return true; }, max0: false, parts: [
      ['Materials', function (v, s) { return v.wallArea*(1+v.wasteRate/100)*v.materialRate; }],
      ['Installation and removal labor', function (v, s) { return v.wallArea*(1+v.wasteRate/100)*(v.laborRate+v.removalRate); }],
      ['Permits', function (v, s) { return v.permits; }]]};
  S['solar-battery-cost'] = {ids: ["batteries", "equipmentPerBattery", "installation", "electricalUpgrade", "permits", "incentives"], ints: ["batteries"], pos: ["batteries"], chk: function (v) { return true; }, max0: true, parts: [
      ['Batteries', function (v, s) { return v.batteries*v.equipmentPerBattery; }],
      ['Installation, upgrades and permits', function (v, s) { return v.installation+v.electricalUpgrade+v.permits; }],
      ['Incentives', function (v, s) { return -v.incentives; }]]};
  S['sprinkler-system-cost'] = {ids: ["zones", "costPerZone", "controller", "backflow", "trenching", "permits"], ints: ["zones"], pos: ["zones"], chk: function (v) { return true; }, max0: false, parts: [
      ['Zones', function (v, s) { return v.zones*v.costPerZone; }],
      ['Controller and backflow', function (v, s) { return v.controller+v.backflow; }],
      ['Trenching and permits', function (v, s) { return v.trenching+v.permits; }]]};
  S['standby-generator-cost'] = {ids: ["generatorCost", "laborCost", "transferSwitch", "fuelConnection", "sitePermit", "firstYearMaintenance", "rebates", "contingencyRate"], ints: [], pos: [], chk: function (v) { return true; }, max0: true, parts: [
      ['Generator', function (v, s) { return v.generatorCost; }],
      ['Installation labor', function (v, s) { return v.laborCost; }],
      ['Transfer switch', function (v, s) { return v.transferSwitch; }],
      ['Fuel connection', function (v, s) { return v.fuelConnection; }],
      ['Site and permits', function (v, s) { return v.sitePermit; }],
      ['First-year maintenance', function (v, s) { return v.firstYearMaintenance; }],
      ['Contingency', function (v, s) { return s*v.contingencyRate/100; }],
      ['Rebates', function (v, s) { return -v.rebates; }]]};
  S['startup-cost'] = {ids: ["formation", "equipment", "buildout", "inventory", "marketing", "deposits", "monthlyOverhead", "runwayMonths", "contingencyRate"], ints: [], pos: [], chk: function (v) { return true; }, max0: false, parts: [
      ['Formation and legal', function (v, s) { return v.formation; }],
      ['Equipment and technology', function (v, s) { return v.equipment; }],
      ['Buildout', function (v, s) { return v.buildout; }],
      ['Starting inventory', function (v, s) { return v.inventory; }],
      ['Launch marketing', function (v, s) { return v.marketing; }],
      ['Deposits and prepayments', function (v, s) { return v.deposits; }],
      ['Contingency', function (v, s) { return s*v.contingencyRate/100; }],
      ['Working-capital reserve', function (v, s) { return v.monthlyOverhead*v.runwayMonths; }]]};
  S['transmission-replacement-cost'] = {ids: ["parts", "laborHours", "laborRate", "fluids", "diagnostics", "towing", "taxRate"], ints: [], pos: [], chk: function (v) { return true; }, max0: false, parts: [
      ['Parts and fluids', function (v, s) { return v.parts+v.fluids; }],
      ['Labor', function (v, s) { return v.laborHours*v.laborRate; }],
      ['Diagnostics and towing', function (v, s) { return v.diagnostics+v.towing; }],
      ['Sales tax on parts and fluids', function (v, s) { return (v.parts+v.fluids)*v.taxRate/100; }]]};
  S['tree-removal-cost'] = {ids: ["treeCount", "averageHeight", "baseCost", "hazardFactor", "stumpCost", "debrisCost", "permitCost"], ints: ["treeCount"], pos: ["treeCount", "averageHeight", "hazardFactor"], chk: function (v) { return true; }, max0: false, parts: [
      ['Tree removal', function (v, s) { return v.treeCount*v.baseCost*(v.averageHeight/50)*v.hazardFactor; }],
      ['Stump grinding', function (v, s) { return v.stumpCost; }],
      ['Debris hauling', function (v, s) { return v.debrisCost; }],
      ['Permits', function (v, s) { return v.permitCost; }]]};
  S['water-damage-restoration-cost'] = {ids: ["affectedArea", "extractionRate", "dryingDays", "dryingPerDay", "demoRate", "moldTreatment", "reconstruction", "coveredRate", "deductible"], ints: [], pos: [], chk: function (v) { return v.coveredRate<=100; }, max0: true, parts: [
      ['Extraction, drying and demolition', function (v, s) { return v.affectedArea*(v.extractionRate+v.demoRate)+v.dryingDays*v.dryingPerDay; }],
      ['Reconstruction and mold treatment', function (v, s) { return v.moldTreatment+v.reconstruction; }],
      ['Estimated insurance payment', function (v, s) { return -Math.max(0,s*v.coveredRate/100-v.deductible); }]]};
  S['water-heater-replacement-cost'] = {ids: ["unitCost", "laborCost", "permitCost", "upgradeCost", "removalCost", "rebates", "oldAnnualCost", "newAnnualCost"], ints: [], pos: [], chk: function (v) { return true; }, max0: true, parts: [
      ['Unit', function (v, s) { return v.unitCost; }],
      ['Labor', function (v, s) { return v.laborCost; }],
      ['Permits', function (v, s) { return v.permitCost; }],
      ['Upgrades', function (v, s) { return v.upgradeCost; }],
      ['Removal', function (v, s) { return v.removalCost; }],
      ['Rebates', function (v, s) { return -v.rebates; }]]};
  S['website-development-cost'] = {ids: ["pages", "pageContentCost", "designHours", "designRate", "devHours", "devRate", "ecommerce", "seo", "hostingSetup", "contingency"], ints: ["pages"], pos: ["pages"], chk: function (v) { return true; }, max0: false, parts: [
      ['Page content', function (v, s) { return v.pages*v.pageContentCost; }],
      ['Design and development labor', function (v, s) { return v.designHours*v.designRate+v.devHours*v.devRate; }],
      ['Features, SEO and hosting setup', function (v, s) { return v.ecommerce+v.seo+v.hostingSetup; }],
      ['Contingency', function (v, s) { return s*v.contingency/100; }]]};
  var slug = (location.pathname.split('/').pop() || '').replace(/\.html$/, '');
  var spec = S[slug];
  if (!spec) return;

  /* Copy of the page's own formula: parts in order (s is the running subtotal), credits negative, total floored at zero where the page does so. */
  function run(v) {
    var i, k;
    for (i = 0; i < spec.ids.length; i++) { k = v[spec.ids[i]]; if (typeof k !== 'number' || !isFinite(k) || k < 0) return null; }
    for (i = 0; i < spec.pos.length; i++) { if (!(v[spec.pos[i]] > 0)) return null; }
    if (!spec.chk(v)) return null;
    var out = [], s = 0, a;
    for (i = 0; i < spec.parts.length; i++) { a = spec.parts[i][1](v, s); out.push([spec.parts[i][0], a]); s += a; }
    var total = spec.max0 ? Math.max(0, s) : s;
    return {parts: out, sum: s, total: total};
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
      if (Math.abs(b.total - b.sum) >= 0.005) {
        var adj = b.total - b.sum;
        rows.push({label: t('Adjustment (the total cannot go below zero)'), cells: [cell(money(adj), adj), cell(share(adj, b.total), b.total > 0 ? adj / b.total : '')]});
      }
      rows.push({label: t('Total'), cls: 'dch-total', cells: [cell(money(b.total), b.total), cell(share(b.total, b.total), b.total > 0 ? 1 : '')]});
      box.appendChild(table(t('Split of the total into parts'), [t('Part'), t('Amount'), t('Share of total')], rows));
      box.appendChild(el('p', t('Parts are the figures from your entries; credits, rebates and discounts are shown as negative amounts. Contingency is your percentage applied to the subtotal of the parts before it.'), 'dch-note'));

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
