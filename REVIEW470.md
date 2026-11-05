# مراجعة الحاسبات المتبقية — 5 نوفمبر 2026

هذه الحزمة تكمل مراجعة موقع الحاسبات بعد الدفعة الأولى المنشورة في commit `5ca639c54b5501c82db906a3eca60f39a89d1f28`.
نطاقها هو الحاسبات الـ470 المتبقية. الحاسبات الثلاثون السابقة محفوظة كما هي، وإجمالي صفحات الحاسبات ما زال 500. مشروع الأدوات خارج هذه الدفعة.

## ما تغير داخل الحزمة

- تحسين شرح 137 صفحة ذات محتوى مختصر أو متكرر، بإضافة طريقة الحساب، أمثلة تفسيرية وافتراضات تخص مدخلات الصفحة.
- إزالة 61 قسمًا مكررًا عن الموردين والمقاولين والخامات كانت مضافة حتى إلى صفحات العلاج والمحاماة. البدائل داخل شرح الحاسبة نفسها.
- إصلاح التحقق المشترك من الأرقام: رفض القيم غير العشرية والنصوص التالفة والقيم غير الصفرية التي تتحول إلى صفر بسبب تجاوز الدقة، مثل `1e-999`.
- استكمال قواعد الحقول في الحاسبات القديمة ذات القوائم الفارغة، مع إبقاء حقل محيط الورك مطلوبًا للمعادلة الأنثوية فقط.
- تطبيق قواعد الأعداد الصحيحة على أعداد الخدمات والأجهزة والأقساط التي تمثل وحدات كاملة. الكسور تظل مقبولة في المقادير المستمرة مثل المساحة ومعدلات الفائدة.
- تثبيت حساب أقساط القروض والأرصدة المتبقية والتراكم عند الفوائد الصغيرة والمدد الطويلة، وحماية ضرب الأعداد الصحيحة في حاسبة المضاعف المشترك.
- إصلاح التقريب العشري، وتصنيف المثلثات الصغيرة، وحل المعادلات ذات المعاملات الصغيرة، وعرض النتائج العلمية غير الصفرية.
- إصلاح عرض الخسارة في بيع المنزل، وإزالة سقف السعر الثابت في حاسبة القدرة على شراء منزل، وتصحيح التعادل في مقارنة القروض وحد السداد عند 1200 شهر.
- تصحيح عرض مساهمة المريض الإضافية في سبع حاسبات تكلفة علاج حتى لا تزيد عن حصة المريض الفعلية داخل النموذج المحدود بالفاتورة.
- حذف حقل CTR غير المستخدم من نموذج إعلانات Google الذي يعتمد على CPC، وتوضيح اختلافه عن نموذج CPM في الصفحتين الأخريين.
- استخدام علاقات تحويل الوحدات الدقيقة وتحديث الأمثلة المكتوبة المتأثرة، وحماية عرض النتائج الطويلة من الخروج خارج شاشة الهاتف.

تعديل ملفات HTML للـ470 يشمل أيضًا مفاتيح التخزين المؤقت لربطها بالنسخة الجديدة من التحقق والتنسيق. هذا لا يعني إعادة كتابة الشرح في كل الصفحات؛ الإضافات التحريرية الجوهرية تخص 137 صفحة محددة في السجل.

## أخطاء أمكن إعادة إنتاجها قبل التصحيح وبعده

| الصفحة | النتيجة السابقة في الحالة المختبرة | النتيجة داخل الحزمة |
|---|---|---|
| `rounding-calculator.html` | 10.07 | 10.08 |
| `home-sale-capital-gains.html` | $0.00 | -$60,000.00 |
| `home-affordability.html` | $3,000,000.00 | $12,960,000.00 |
| `loan-comparison.html` | Loan B has lower payment | Payments are equal to the nearest cent |
| `mortgage-payoff.html` | Payoff exceeds 100 years | 100 yrs 0 mo |
| `triangle-calculator.html` | Equilateral | Scalene |
| `system-of-equations-calculator.html` | Infinitely many solutions | x = 1, y = 1 |
| `binary-calculator.html` | 1100 | Enter a whole decimal number |
| `loan.html` | Result is outside the supported numeric range | $500.00 |
| `investment.html` | $1,000.00 | $2,200.00 |
| `vasectomy-cost.html` | $500.00 | $60.00 |
| `square-root-calculator.html` | 0 | 1E-50 |
| `appendectomy-cost.html` | $3,400.00 | Invalid input |

المدخلات الكاملة لهذه المقارنات محفوظة في `tests/review470-counterexamples.json`.

## التحقق الذي اكتمل

| الفحص | النتيجة |
|---|---|
| نطاق الحاسبات وتوفر ملفاتها | 470 متبقية + 30 سابقة = 500 |
| حالات الإدخال في الاختبارات الجديدة | 14,766 ناجحة |
| الأمثلة المسجلة في الشرح | 319 صفحة، 1,481 نتيجة متطابقة |
| وجود النتائج نفسها في جداول الشرح الفعلية | 1,481 مطابقة |
| المراجع الجديدة | 190 حالة، منها 120 مرجعًا محسوبًا باستخدام Python Decimal بدقة 70 رقمًا |
| الاختبارات المرجعية والتجميعية السابقة المناسبة لهذه الصفحات | 1,516 حالة مرجعية، و14,784 حالة طرفية نجحت في deep-regressions؛ و60 حالة في final-regressions |
| تشغيل Chrome على الهاتف والكمبيوتر | 1,034 حالة ناجحة: 1,000 تشغيل افتراضي و34 تفاعلًا إضافيًا |
| التحقق من الأرقام العربية والفارسية والفواصل | اختبارات المتصفح واختبارات التطبيع نجحت |
| ملفات الحاسبات الثلاثين السابقة | لم تُعدّل |

تشغيل المتصفح يشمل الحاسبات الـ500 على مقاسي 390×844 و1280×900، مع فتح الشرح في الصفحات الـ470. فحصت أيضًا النتائج الطويلة، والقيم العلمية، وحالات الإدخال الخاطئ، وأمثلة العلاج والقروض والتقريب.

الاختبارات لا تثبت صحة كل افتراض مالي أو تأميني أو طبي ممكن. الحالات ذات المرجع المستقل مسجلة بصورة منفصلة عن فحص تحميل الصفحة ومطابقة أمثلتها. الأمثلة الافتراضية وأسعار المدخلات ليست قاعدة بيانات لأسعار السوق. قبول AdSense قرار مراجعة مستقل ولا يضمنه اجتياز اختبارات الحاسبات.

## الحفظ والتشغيل في Termux

ملف `dch-review470.py` يحتوي التغييرات كاملة. يحتاج Python وGit فقط، دون nano أو pip أو npm.

1. التشغيل الافتراضي أو `--prepare-repo` ينشئ نسخة مستقلة في `~/dch-review470/repo` وينشئ أرشيفًا احتياطيًا للمصدر المنشور.
2. تُحفظ نسخة من ملف التشغيل نفسه في `~/dch-review470/dch-review470.py`، فلا تعتمد بعد ذلك على بقاء ملف Downloads.
3. `--preview` يفتح معاينة محلية على `http://127.0.0.1:8085`. الإيقاف: Ctrl+C.
4. `--publish` ينشئ فرعًا احتياطيًا على GitHub ثم ينشر تحديث main دون force push. يتوقف إذا تغير main عن الأساس المفحوص.
5. `--status` و`--diff` يعرضان الحالة والفروق. لا يستبدل السكربت أي شغل محلي إضافي داخل نسخة التجهيز.

أوامر الاختبارات القابلة لإعادة التشغيل من جذر المستودع لمن لديه Node:

```sh
node tests/review470-regressions.cjs
node tests/content-example-regressions.cjs
node tests/deep-regressions.cjs
node tests/final-regressions.cjs
node tests/numeric-input-regressions.cjs
```

## المراجع المرتبطة بالشرح

- [مصطلحات التغطية في HealthCare.gov](https://www.healthcare.gov/SBC-GLOSSARY/): تمييز المبلغ المسموح والخصم ونسبة مشاركة المريض. ترتيب الإضافة في الحاسبة افتراض معلن؛ ليس قاعدة مشتركة بين جميع الوثائق.
- [IRS Publication 523](https://www.irs.gov/publications/p523): حساب ربح أو خسارة بيع المنزل والقيود المرتبطة بالإعفاء.
- [CFPB: مقارنة عروض قروض السيارات](https://www.consumerfinance.gov/ask-cfpb/how-do-i-compare-auto-loan-offers-what-should-i-look-at-besides-the-monthly-payment-en-753/): فصل القسط عن إجمالي تكلفة التمويل.
- [NIST: معاملات تحويل الوحدات](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9).
- [ECMAScript: وظائف Math](https://tc39.es/ecma262/multipage/numbers-and-dates.html): العمليات العددية المستخدمة في التنفيذ.

## الصفحات التي حصلت على إضافات تحريرية

| الصفحة | موضوع الإضافة |
|---|---|
| `accounting-software-roi.html` | First-year cost and realizable benefit |
| `addiction-treatment-cost.html` | Avoid overlapping program charges |
| `adoption-cost.html` | Cash needed and later reimbursements |
| `allergy-shot-cost.html` | Which charges belong in this scenario?؛ Coverage terminology |
| `appendectomy-cost.html` | Which charges belong in this scenario?؛ Coverage terminology |
| `assisted-living-cost.html` | Separate room charges from care charges |
| `average-calculator.html` | Every entered value has equal weight |
| `bankruptcy-attorney-cost.html` | How a flat or minimum fee is handled |
| `basic-calculator.html` | Order matters for subtraction and division |
| `bathroom-addition-cost.html` | Match the quantity to the quoted scope |
| `binary-calculator.html` | Sign and representation |
| `boat-loan.html` | Read the financed amount before comparing payments |
| `bookkeeping-cost.html` | Choose the correct monthly workload |
| `bootcamp-roi.html` | Annual inputs, program cost and earnings assumptions |
| `buy-now-pay-later.html` | Payment count is after the down payment |
| `car-repair-vs-replace.html` | Compare the same ownership window |
| `car-total-cost-of-ownership.html` | Keep financing and depreciation separate |
| `closet-remodel-cost.html` | Interpreting the low/high midpoint |
| `cobra-vs-marketplace-cost.html` | Compare net premiums and expected care |
| `college-tuition-roi.html` | Annual inputs, program cost and earnings assumptions |
| `commute-cost.html` | Count journeys rather than calendar days |
| `covered-patio-cost.html` | Match the quantity to the quoted scope |
| `cpap-cost.html` | Device purchase versus recurring supplies |
| `cube-root-calculator.html` | A real root for negative numbers |
| `cups-to-grams-calculator.html` | Mass conversion needs an ingredient assumption |
| `cyber-breach-cost.html` | A scenario budget, not a breach forecast |
| `day-of-week-calculator.html` | Calendar labels are independent of local clock time |
| `days-from-today-calculator.html` | The reference date controls the result |
| `decimal-to-fraction-calculator.html` | A bounded approximation, not an exact decimal expansion |
| `decimal-to-percent-calculator.html` | Multiplying a decimal by 100 |
| `delivery-driver-earnings.html` | Revenue and vehicle cost use the same shift |
| `dermatologist-visit-cost.html` | Which charges belong in this scenario?؛ Coverage terminology |
| `divorce-lawyer-cost.html` | How a flat or minimum fee is handled |
| `driveway-paving-cost.html` | Match the quantity to the quoted scope |
| `drywall-repair-cost.html` | Interpreting the low/high midpoint |
| `dui-lawyer-cost.html` | How a flat or minimum fee is handled |
| `ebitda.html` | Read every add-back on the same basis |
| `egg-freezing-cost.html` | Account for cycles and storage separately |
| `estate-planning-cost.html` | How a flat or minimum fee is handled |
| `exponent-calculator.html` | Powers, reciprocals and real-domain limits |
| `facebook-ads-roi.html` | From impressions to profit |
| `factorial-calculator.html` | Zero factorial and trailing zeros |
| `finance-calculator.html` | End-of-month deposits and nominal return |
| `fire-damage-restoration-cost.html` | Match the quantity to the quoted scope |
| `fireplace-installation-cost.html` | Match the quantity to the quoted scope |
| `fraction-to-percent-calculator.html` | A fraction can exceed one whole |
| `garage-conversion-cost.html` | Interpreting the low/high midpoint |
| `gas-vs-electric-car-cost.html` | Use comparable driving and energy assumptions |
| `gazebo-cost.html` | Match the quantity to the quoted scope |
| `generator-installation-cost.html` | Match the quantity to the quoted scope |
| `google-ads-roi.html` | Clicks from a CPC assumption |
| `graduate-school-roi.html` | Annual inputs, program cost and earnings assumptions |
| `granite-countertop-cost.html` | Match the quantity to the quoted scope |
| `gum-disease-treatment-cost.html` | Distinguish visits, areas and a full treatment plan |
| `gutter-guard-cost.html` | Match the quantity to the quoted scope |
| `hair-transplant-cost.html` | Grafts and package quotations |
| `hard-money-loan.html` | Loan-to-cost is the model used here |
| `hipaa-compliance-cost.html` | Budget the defined implementation scope |
| `home-affordability.html` | Budget rule and uncapped price calculation |
| `home-office-remodel-cost.html` | Interpreting the low/high midpoint |
| `home-sale-capital-gains.html` | A loss is not a zero realized gain |
| `hot-tub-installation-cost.html` | Match the quantity to the quoted scope |
| `immigration-lawyer-cost.html` | How a flat or minimum fee is handled |
| `improper-fraction-to-mixed-number-calculator.html` | Remainder and sign convention |
| `interest-rate-calculator.html` | Simple rate is different from compound yield |
| `iui-cost.html` | Which charges belong in this scenario?؛ Coverage terminology |
| `kitchen-island-cost.html` | Match the quantity to the quoted scope |
| `land-loan.html` | Read the financed amount before comparing payments |
| `lcm-gcf-calculator.html` | Exact products and common factors |
| `lease-buyout.html` | Read the financed amount before comparing payments |
| `length-converter.html` | Use the international foot and mile |
| `linear-equation-calculator.html` | What happens when the coefficient is zero? |
| `loan-comparison.html` | Equal payments and different total costs |
| `logarithm-calculator.html` | A logarithm asks for an exponent |
| `managed-it-cost.html` | Match users, devices and support scope |
| `marketplace-profit.html` | Fees and margin are not interchangeable |
| `memory-care-cost.html` | Use the quoted care level |
| `mini-split-installation-cost.html` | Match the quantity to the quoted scope |
| `mixed-number-calculator.html` | The sign applies to the whole mixed value |
| `mobile-home-loan.html` | Read the financed amount before comparing payments |
| `mortgage-buydown.html` | The two-year subsidy window |
| `mortgage-payoff.html` | The final month and supported horizon |
| `motorcycle-loan.html` | Read the financed amount before comparing payments |
| `new-home-construction-cost.html` | Match the quantity to the quoted scope |
| `nursing-home-cost.html` | Daily quotes need a monthly basis |
| `online-degree-cost.html` | Credits, fees and living costs |
| `orthodontic-monthly-payment.html` | Insurance reductions and borrowing charges |
| `outdoor-kitchen-cost.html` | Match the quantity to the quoted scope |
| `paver-patio-cost.html` | Match the quantity to the quoted scope |
| `payment-calculator.html` | Principal, interest and the first payment |
| `payroll-software-roi.html` | First-year cost and realizable benefit |
| `pci-compliance-cost.html` | Assessment fees and remediation are different |
| `percent-error-calculator.html` | The reference value defines the denominator |
| `percent-to-decimal-calculator.html` | Percent, decimal and per thousand |
| `percentage-increase-calculator.html` | Keep the starting value as the base |
| `permutation-combination-calculator.html` | Whether order matters changes the count |
| `polynomial-calculator.html` | Value, slope and curvature are different outputs |
| `prime-factorization-calculator.html` | Exponents count repeated prime factors |
| `psychiatrist-visit-cost.html` | Which charges belong in this scenario?؛ Coverage terminology |
| `pythagorean-theorem-calculator.html` | The right-angle assumption is essential |
| `quartz-countertop-cost.html` | Match the quantity to the quoted scope |
| `ransomware-downtime-cost.html` | Avoid counting the same lost activity twice |
| `ratio-calculator.html` | Part-to-part is different from part-to-whole |
| `rental-property-depreciation.html` | A full-year straight-line planning amount |
| `rounding-calculator.html` | Decimal places and halfway values |
| `rv-loan.html` | Read the financed amount before comparing payments |
| `sauna-installation-cost.html` | Match the quantity to the quoted scope |
| `scientific-calculator.html` | Absolute-value helpers and angle units |
| `security-deposit.html` | Interest is not a legal entitlement calculation |
| `shopify-fee.html` | The entered rates determine the fee scenario |
| `skylight-installation-cost.html` | Match the quantity to the quoted scope |
| `soc-2-compliance-cost.html` | Readiness, audit and renewal budgets |
| `solar-panel-cleaning-cost.html` | Interpreting the low/high midpoint |
| `speed-converter.html` | Speed and pace are reciprocals |
| `square-root-calculator.html` | Principal roots and signs |
| `steam-shower-cost.html` | Match the quantity to the quoted scope |
| `stock-average-price.html` | Average price is weighted by shares |
| `stock-option-exercise-cost.html` | Cash exercise and paper spread |
| `sump-pump-installation-cost.html` | Match the quantity to the quoted scope |
| `surrogacy-total-cost.html` | Define the contingency base |
| `temperature-converter.html` | Offsets make temperature ratios misleading |
| `tiktok-ads-roi.html` | From impressions to profit |
| `time-tracking-roi.html` | First-year cost and realizable benefit |
| `triangle-calculator.html` | Sides determine one triangle up to reflection |
| `tub-to-shower-conversion-cost.html` | Match the quantity to the quoted scope |
| `tubal-ligation-cost.html` | Which charges belong in this scenario?؛ Coverage terminology |
| `urgent-care-vs-er-cost.html` | This comparison cannot choose a care setting |
| `vacation-rental-roi.html` | Cash-on-cash return uses cash invested |
| `vasectomy-cost.html` | Which charges belong in this scenario?؛ Coverage terminology |
| `volume-calculator.html` | Each shape uses different dimensions |
| `walk-in-shower-cost.html` | Match the quantity to the quoted scope |
| `water-softener-installation-cost.html` | Match the quantity to the quoted scope |
| `weeks-between-dates-calculator.html` | Elapsed weeks exclude the starting instant |
| `weight-converter.html` | Mass units and the metric tonne |
| `whole-house-remodel-cost.html` | Match the quantity to the quoted scope |
| `whole-house-water-filter-cost.html` | Match the quantity to the quoted scope |
| `z-score-calculator.html` | The sign identifies which side of the mean |

السجل الكامل لكل واحدة من الحاسبات الـ470 محفوظ في `tests/review470-ledger.json` و`tests/review470-ledger.csv`.
