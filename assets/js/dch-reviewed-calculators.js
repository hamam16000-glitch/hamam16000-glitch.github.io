(function (root) {
  'use strict';
  function fail(message) { throw new Error(message); }
  function number(value, label, min, max, integer) {
    var raw = String(value == null ? '' : value).trim()
      .replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); })
      .replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); }).replace(/٫/g, '.');
    if (!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?$/i.test(raw)) fail(label + ': enter a number using a dot for decimals and no grouping commas.');
    var n = Number(raw);
    if (n === 0 && /[1-9]/.test(raw.split(/e/i)[0])) fail(label + ': this nonzero input is too small for supported numerical precision.');
    if (!Number.isFinite(n) || (min !== undefined && n < min) || (max !== undefined && n > max) || (integer && !Number.isSafeInteger(n))) fail(label + ': enter a valid ' + (integer ? 'whole ' : '') + 'number' + (min !== undefined ? ' from ' + min : '') + (max !== undefined ? ' to ' + max : '') + '.');
    return n;
  }
  function positive(n, label) { if (n <= 0) fail(label + ' must be greater than zero.'); return n; }
  function finite(n) { if (!Number.isFinite(n) || Math.abs(n) > 1e18) fail('Result exceeds the supported range. Try smaller amounts, rates or periods.'); return n; }
  function currency(code) { if (!['USD','EGP','EUR','GBP','SAR','AED'].includes(code)) fail('Choose a supported display currency.'); return code; }
  function date(raw) {
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(raw));
    if (!match) fail('Choose a valid calendar date.');
    var y = +match[1], m = +match[2], d = +match[3], result = new Date(0);
    result.setUTCHours(0,0,0,0); result.setUTCFullYear(y,m-1,d);
    if (y < 1 || y > 9999 || result.getUTCFullYear() !== y || result.getUTCMonth() !== m-1 || result.getUTCDate() !== d) fail('Choose a valid Gregorian date from year 0001 to 9999.');
    return result;
  }
  function days(a,b) { return Math.round((b-a)/86400000); }
  function addMonths(original, count) {
    var result = new Date(original.getTime()), day = original.getUTCDate();
    result.setUTCDate(1); result.setUTCMonth(result.getUTCMonth()+count);
    var next = new Date(result.getTime()); next.setUTCMonth(next.getUTCMonth()+1); next.setUTCDate(0);
    result.setUTCDate(Math.min(day,next.getUTCDate())); return result;
  }
  var units = {
    length: {m:['Meters',1],cm:['Centimeters',0.01],mm:['Millimeters',0.001],km:['Kilometers',1000],in:['Inches',0.0254],ft:['Feet',0.3048],yd:['Yards',0.9144],mi:['Miles',1609.344]},
    mass: {kg:['Kilograms',1],g:['Grams',0.001],mg:['Milligrams',0.000001],lb:['Pounds (avoirdupois)',0.45359237],oz:['Ounces (avoirdupois)',0.028349523125]},
    volume: {L:['Liters',1],mL:['Milliliters',0.001],m3:['Cubic meters',1000],usgal:['US liquid gallons',3.785411784],ukgal:['Imperial gallons',4.54609]},
    temperature: {C:['Celsius (°C)',1],F:['Fahrenheit (°F)',1],K:['Kelvin (K)',1]}
  };
  var api = {
    units: units,
    percentage: function (v) {
      var x=number(v.x,'First value',-1e12,1e12), y=number(v.y,'Second value',-1e12,1e12), result, explanation, suffix='';
      if(v.mode==='of'){result=x*y/100; explanation=x+' ÷ 100 × '+y;}
      else if(v.mode==='share'){positive(y,'The reference value'); result=x/y*100;suffix='%';explanation=x+' ÷ '+y+' × 100';}
      else if(v.mode==='change'){positive(x,'The original value');result=(y-x)/x*100;suffix='%';explanation='('+y+' − '+x+') ÷ '+x+' × 100';}
      else if(v.mode==='reverse'){if(x<=-100||y<0)fail('Use a change greater than −100% and a nonnegative new value.');result=y/(1+x/100);explanation=y+' ÷ (1 + '+x+' ÷ 100)';}
      else fail('Choose a percentage calculation.');
      return {value:finite(result),suffix:suffix,explanation:explanation};
    },
    discount: function(v){
      var p=number(v.price,'Original unit price',0,1e12),a=number(v.first,'First discount',0,100),b=number(v.second,'Second discount',0,100),t=number(v.tax,'Tax rate',0,1000),q=number(v.quantity,'Quantity',1,10000,true);
      var unit=p*(1-a/100)*(1-b/100),subtotal=unit*q, tax=subtotal*t/100;
      return {unit:unit,subtotal:subtotal,tax:tax,total:finite(subtotal+tax),saving:(p-unit)*q,effective:(1-(1-a/100)*(1-b/100))*100,currency:currency(v.currency)};
    },
    'unit-converter': function(v){
      var family=units[v.family];if(!family||!family[v.from]||!family[v.to])fail('Choose two units from the same measurement family.');
      var x=number(v.value,'Value',v.family==='temperature'?-1e12:0,1e12),out,base;
      if(v.family==='temperature'){
        base=v.from==='K'?x:v.from==='C'?x+273.15:(x-32)*5/9+273.15;
        if(base < -1e-10)fail('A temperature cannot be below absolute zero.');base=Math.max(0,base);
        out=v.to==='K'?base:v.to==='C'?base-273.15:(base-273.15)*9/5+32;
      }else{base=x*family[v.from][1];out=base/family[v.to][1];}
      if(Object.is(out,-0))out=0;
      return {value:finite(out),unit:family[v.to][0],input:x,from:family[v.from][0],factor:v.family==='temperature'?null:family[v.from][1]/family[v.to][1]};
    },
    'date-difference': function(v){var start=date(v.start),end=date(v.end);if(end<start)fail('End date must be on or after start date. Use Swap dates to reverse them.');var n=days(start,end)+(v.inclusive==='yes'?1:0);return{days:n,weeks:Math.floor(n/7),remainder:n%7,inclusive:v.inclusive==='yes'};},
    age: function(v){
      var birth=date(v.birth),asof=date(v.asof);if(asof<birth)fail('The comparison date must be on or after the birth date.');
      var months=(asof.getUTCFullYear()-birth.getUTCFullYear())*12+asof.getUTCMonth()-birth.getUTCMonth();
      if(addMonths(birth,months)>asof)months--;
      return {years:Math.floor(months/12),months:months%12,days:days(addMonths(birth,months),asof),totalDays:days(birth,asof),totalMonths:months};
    },
    mortgage: function(v){
      var p=positive(number(v.principal,'Loan amount',0,1e12),'Loan amount'), rate=number(v.rate,'Annual interest rate',0,100), years=number(v.years,'Term in years',1,100,true),n=years*12,r=rate/1200;
      var logRate=Math.log1p(r),payment=r===0?p/n:p*r/(-Math.expm1(-n*logRate)),schedule=[];
      // Value the remaining scheduled payments directly. Repeated subtraction can
      // lose tiny early principal payments at a high rate over a long term.
      for(var m=12;m<=n;m+=12){var left=n-m,balance=r===0?p*left/n:payment*(-Math.expm1(-left*logRate))/r;schedule.push({year:m/12,balance:Math.max(0,balance)});}
      var total=r===0?p:payment*n;
      return {payment:finite(payment),total:finite(total),interest:r===0?0:Math.max(0,total-p),months:n,firstInterest:p*r,firstPrincipal:payment-p*r,schedule:schedule,currency:currency(v.currency)};
    },
    'compound-interest': function(v){
      var p=number(v.principal,'Starting amount',0,1e12),c=number(v.contribution,'Monthly addition',0,1e9),rate=number(v.rate,'Nominal annual rate',-100,1000),y=number(v.years,'Years',0,100,true),extra=number(v.months,'Extra months',0,11,true),n=y*12+extra,r=rate/1200,balance=p,schedule=[];
      if(rate<=-100)fail('Use a nominal annual rate greater than −100%.');
      if(!['end','beginning'].includes(v.timing))fail('Choose the contribution timing.');
      for(var m=1;m<=n;m++){if(v.timing==='beginning')balance+=c;balance=finite(balance*(1+r));if(v.timing==='end')balance=finite(balance+c);if(m%12===0||m===n){var deposited=p+c*m;schedule.push({month:m,balance:balance,deposited:deposited,growth:balance-deposited});}}
      return{balance:balance,deposited:p+c*n,growth:balance-p-c*n,effectiveAnnual:Math.expm1(12*Math.log1p(r))*100,months:n,schedule:schedule,currency:currency(v.currency)};
    },
    'simple-interest':function(v){
      var p=number(v.principal,'Principal',0,1e12),r=number(v.rate,'Annual rate',0,1000)/100,t=number(v.time,'Time',0,365000),basis=number(v.basis,'Days per year',360,365,true),years;
      if(![360,365].includes(basis))fail('Choose a 360-day or 365-day convention.');
      if(v.period==='years')years=t;else if(v.period==='months')years=t/12;else if(v.period==='days')years=t/basis;else fail('Choose a time unit.');
      if(years>1000)fail('Use a period no longer than 1,000 years.');var interest=finite(p*r*years);
      return{interest:interest,total:finite(p+interest),years:years,principal:p,currency:currency(v.currency)};
    },
    'fuel-cost':function(v){
      var d=number(v.distance,'One-way distance',0,1e9),economy=positive(number(v.economy,'Fuel consumption or economy',0,1e9),'Fuel consumption or economy'),price=number(v.price,'Fuel price',0,1e6),extras=number(v.extras,'Tolls and parking',0,1e9),people=number(v.people,'Travelers',1,1000,true),multiplier=v.trip==='return'?2:v.trip==='single'?1:fail('Choose one-way or return travel.'),distance=d*multiplier,fuel;
      if(v.system==='metric')fuel=distance*economy/100;else if(v.system==='us')fuel=distance/economy;else fail('Choose metric or US units.');var fuelCost=finite(fuel*price);
      return{fuel:fuel,fuelCost:fuelCost,total:finite(fuelCost+extras),perPerson:(fuelCost+extras)/people,distance:distance,unit:v.system==='metric'?'liters':'US gallons',distanceUnit:v.system==='metric'?'km':'miles',currency:currency(v.currency)};
    },
    tip:function(v){
      var bill=number(v.bill,'Bill before tax',0,1e9),tax=number(v.tax,'Tax amount',0,1e9),service=number(v.service,'Service charge',0,1e9),pct=number(v.tip,'Tip rate',0,1000),people=number(v.people,'People',1,1000,true),tip=bill*pct/100;
      [bill,tax,service].forEach(function(n){if(Math.abs(n*100-Math.round(n*100))>1e-5)fail('Enter bill, tax and service amounts with no more than two decimal places.');});
      var billCents=Math.round(bill*100),tipCents=roundedTipCents(billCents,v.tip),cents=billCents+Math.round(tax*100)+Math.round(service*100)+tipCents,base=Math.floor(cents/people),extra=cents%people;tip=tipCents/100;
      return{tip:tip,total:cents/100,base:base/100,extra:(base+1)/100,extraCount:extra,baseCount:people-extra,people:people,currency:currency(v.currency)};
    }
  };
  function numberList(raw,label,limit){
    var text=String(raw==null?'':raw).trim();
    if(!text)fail(label+': enter at least one number.');
    var segments=text.split(/[,;،]/);
    if(segments.some(function(x){return !x.trim();}))fail(label+': remove empty entries between separators.');
    var tokens=[];segments.forEach(function(x){tokens=tokens.concat(x.trim().split(/\s+/));});
    if(tokens.length>(limit||1000))fail(label+': too many entries; the limit is '+(limit||1000)+'.');
    return tokens.map(function(x){return number(x,label,-1e12,1e12);});
  }
  function stableSum(values){var sum=0,correction=0;values.forEach(function(x){var adjusted=x-correction,next=sum+adjusted;correction=(next-sum)-adjusted;sum=next;});return sum;}
  Object.assign(api,{
    vat:function(v){
      var amount=number(v.amount,'Amount',0,1e12),rate=number(v.rate,'VAT rate',0,1000),net,gross;
      if(v.mode==='add'){net=amount;gross=amount*(1+rate/100);}
      else if(v.mode==='remove'){gross=amount;net=amount/(1+rate/100);}
      else fail('Choose whether to add or remove VAT.');
      return{net:net,gross:finite(gross),tax:gross-net,rate:rate,currency:currency(v.currency)};
    },
    'salary-hourly':function(v){
      var amount=number(v.amount,'Pay amount',0,1e9),hours=positive(number(v.hours,'Hours per paid week',0,168),'Hours per paid week'),weeks=positive(number(v.weeks,'Paid weeks per year',0,53),'Paid weeks per year'),days=number(v.days,'Workdays per paid week',1,7,true),annual,hourly;
      if(v.mode==='annual'){annual=amount;hourly=amount/(hours*weeks);}
      else if(v.mode==='hourly'){hourly=amount;annual=finite(amount*hours*weeks);}
      else fail('Choose annual salary or hourly pay.');
      return{annual:annual,hourly:finite(hourly),monthly:annual/12,weekly:annual/weeks,twoWeeks:2*annual/weeks,daily:annual/(weeks*days),annualHours:hours*weeks,currency:currency(v.currency)};
    },
    apy:function(v){
      var rate=number(v.rate,'Annual rate',-36500,1e12),periods=number(v.periods,'Compounding periods per year',1,365,true),principal=number(v.principal,'Starting amount',0,1e12),effective,nominal;
      if(![1,2,4,12,52,365].includes(periods))fail('Choose a supported compounding frequency.');
      if(v.mode==='nominal'){if(rate<=-100*periods||rate>1000)fail('Use a nominal rate above −100% per period and no greater than 1,000% per year.');nominal=rate;effective=Math.expm1(periods*Math.log1p(rate/100/periods))*100;}
      else if(v.mode==='effective'){if(rate<=-100)fail('Effective annual yield must be greater than −100%.');effective=rate;nominal=periods*Math.expm1(Math.log1p(rate/100)/periods)*100;}
      else fail('Choose which annual rate you are entering.');
      if(effective<=-100||!Number.isFinite(effective))fail('This rate and frequency exceed the supported numerical precision.');
      var balance=finite(principal*(1+effective/100));
      return{nominal:finite(nominal),effective:finite(effective),periodic:nominal/periods,balance:balance,interest:balance-principal,periods:periods,currency:currency(v.currency)};
    },
    'net-worth':function(v){
      var assetNames=['cash','investments','property','vehicles','otherAssets'],debtNames=['mortgage','loans','cards','otherDebts'];
      var labels={cash:'Cash and bank balances',investments:'Investment value',property:'Property value',vehicles:'Vehicle value',otherAssets:'Other asset value',mortgage:'Mortgage debt',loans:'Other loans',cards:'Credit card balances',otherDebts:'Other liabilities'};
      var assets=stableSum(assetNames.map(function(k){return number(v[k],labels[k],0,1e12);})),debts=stableSum(debtNames.map(function(k){return number(v[k],labels[k],0,1e12);}));
      return{assets:assets,debts:debts,net:finite(assets-debts),debtRatio:assets===0?null:debts/assets*100,currency:currency(v.currency)};
    },
    budget:function(v){
      var periods={monthly:12,weekly:52,biweekly:26,semimonthly:24,annual:1};
      if(!Object.prototype.hasOwnProperty.call(periods,v.frequency))fail('Choose a pay frequency.');
      var pay=number(v.pay,'Take-home pay',0,1e12),otherIncome=number(v.otherIncome,'Other monthly income',0,1e12),income=pay*periods[v.frequency]/12+otherIncome;
      var labels={housing:'Housing costs',utilities:'Utilities',food:'Food costs',transport:'Transport costs',debt:'Debt payments',otherExpenses:'Other expenses'};
      var expenses=stableSum(['housing','utilities','food','transport','debt','otherExpenses'].map(function(k){return number(v[k],labels[k],0,1e12);})),saving=number(v.saving,'Planned monthly savings',0,1e12);
      return{income:income,expenses:expenses,saving:saving,beforeSaving:income-expenses,remaining:finite(income-expenses-saving),expenseRatio:income===0?null:expenses/income*100,currency:currency(v.currency)};
    },
    'emergency-fund':function(v){
      var expenses=positive(number(v.expenses,'Essential monthly expenses',0,1e12),'Essential monthly expenses'),months=number(v.months,'Target months of expenses',0,120),current=number(v.current,'Current emergency savings',0,1e12),addition=number(v.addition,'Monthly addition',0,1e12),target=finite(expenses*months),gap=Math.max(0,target-current),needed=null;
      if(gap===0)needed=0;
      else if(addition>0){var raw=gap/addition,near=Math.round(raw);if(near>0&&Math.abs(raw-near)<=Number.EPSILON*Math.max(1,raw)*8)raw=near;needed=Math.ceil(raw);if(!Number.isSafeInteger(needed))fail('The contribution is too small for a supported whole-month estimate.');}
      return{target:target,gap:gap,coverage:current/expenses,needed:needed,excess:Math.max(0,current-target),currency:currency(v.currency)};
    },
    roi:function(v){
      var initial=number(v.initial,'Initial cost',0,1e12),costs=number(v.costs,'Additional costs',0,1e12),received=number(v.received,'Total received or ending value',0,1e12),years=v.annualize==='yes'?number(v.years,'Elapsed years',0,1000):0,totalCost=initial+costs,gain=received-totalCost,roi=totalCost===0?null:finite(gain/totalCost*100),annual=null,annualUnavailable=false;
      if(!['yes','no'].includes(v.annualize))fail('Choose whether to annualize the return.');
      if(v.annualize==='yes'){
        positive(years,'Elapsed years');
        if(totalCost>0){annual=received===0?-100:Math.expm1(Math.log(received/totalCost)/years)*100;if(!Number.isFinite(annual)||Math.abs(annual)>1e18){annual=null;annualUnavailable=true;}}
      }
      return{cost:totalCost,gain:gain,roi:roi,annual:annual,annualUnavailable:annualUnavailable,received:received,currency:currency(v.currency)};
    },
    'break-even':function(v){
      var fixed=number(v.fixed,'Fixed costs',0,1e12),price=number(v.price,'Selling price per unit',0,1e9),variable=number(v.variable,'Variable cost per unit',0,1e9),fees=number(v.fees,'Sales fee',0,100),units=number(v.units,'Planned units sold',0,1e9,true),margin=price*(1-fees/100)-variable,exact=null,whole=null;
      // Algebraically equal decimal values may leave a tiny binary residue.
      if(Math.abs(margin)<=Number.EPSILON*Math.max(Number.MIN_VALUE,price,variable)*4)margin=0;
      if(fixed===0){exact=0;whole=0;}
      else if(margin>0){exact=fixed/margin;var near=Math.round(exact);if(near>0&&Math.abs(exact-near)<=Number.EPSILON*Math.max(1,exact)*8)exact=near;whole=Math.ceil(exact);if(!Number.isSafeInteger(whole))fail('Break-even units exceed the supported integer range.');}
      return{margin:margin,exact:exact,whole:whole,breakEvenRevenue:whole===null?null:finite(whole*price),revenue:finite(units*price),cost:finite(fixed+units*variable+units*price*fees/100),profit:finite(units*margin-fixed),marginRate:price===0?null:margin/price*100,currency:currency(v.currency)};
    },
    'mean-median-mode':function(v){
      var values=numberList(v.values,'Values',1000),sorted=values.slice().sort(function(a,b){return a-b;}),count=values.length,sum=stableSum(values),middle=Math.floor(count/2),median=count%2?sorted[middle]:(sorted[middle-1]+sorted[middle])/2,map=new Map();
      values.forEach(function(x){map.set(x,(map.get(x)||0)+1);});
      var frequencies=Array.from(map.entries()).sort(function(a,b){return a[0]-b[0];}),maxFrequency=Math.max.apply(null,frequencies.map(function(x){return x[1];})),modes=maxFrequency>1?frequencies.filter(function(x){return x[1]===maxFrequency;}).map(function(x){return x[0];}):[];
      return{mean:sum/count,median:median,modes:modes,count:count,sum:sum,min:sorted[0],max:sorted[count-1],range:sorted[count-1]-sorted[0],modeCount:maxFrequency,frequencies:frequencies};
    },
    gpa:function(v){
      var grades=numberList(v.grades,'Grade points',100),credits=numberList(v.credits,'Credits',100),scale=positive(number(v.scale,'Maximum grade points',0,100),'Maximum grade points');
      if(grades.length!==credits.length)fail('Enter one credit weight for each grade-point entry, in the same order.');
      grades.forEach(function(x){if(x<0||x>scale)fail('Each grade-point entry must be between 0 and the selected maximum.');});
      credits.forEach(function(x){if(x<=0||x>1000)fail('Each course needs a positive credit weight no greater than 1,000.');});
      var quality=grades.map(function(x,i){return x*credits[i];}),totalCredits=stableSum(credits),totalPoints=stableSum(quality);
      return{gpa:totalPoints/totalCredits,credits:totalCredits,quality:totalPoints,courses:grades.length,scale:scale,rows:grades.map(function(x,i){return{grade:x,credits:credits[i],quality:quality[i]};})};
    }
  });

  function integerText(raw,label){
    var s=String(raw==null?'':raw).trim().replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d);}).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d);});
    if(!/^[+-]?\d{1,18}$/.test(s))fail(label+': enter a signed whole number with at most 18 digits.');
    return BigInt(s);
  }
  function absBig(n){return n<0n?-n:n;}
  function gcdBig(a,b){a=absBig(a);b=absBig(b);while(b){var t=a%b;a=b;b=t;}return a;}
  function fraction(n,d){if(d===0n)fail('A fraction denominator cannot be zero.');if(d<0n){n=-n;d=-d;}var g=gcdBig(n,d);return{n:n/g,d:d/g};}
  function factorialBig(n){var r=1n;for(var i=2;i<=n;i++)r*=BigInt(i);return r;}
  function point(v){return{x1:number(v.x1,'First x coordinate',-1e12,1e12),y1:number(v.y1,'First y coordinate',-1e12,1e12),x2:number(v.x2,'Second x coordinate',-1e12,1e12),y2:number(v.y2,'Second y coordinate',-1e12,1e12)};}
  function isoDay(d){return String(d.getUTCFullYear()).padStart(4,'0')+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0');}
  function wallTime(raw){var m=/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(raw));if(!m)fail('Enter a complete date and clock time.');var d=date(m[1]),h=+m[2],min=+m[3],s=+(m[4]||0);if(h>23||min>59||s>59)fail('Use hours 00–23 and minutes/seconds 00–59.');d.setUTCHours(h,min,s,0);return d;}
  Object.assign(api,{
    'standard-deviation':function(v){
      var xs=numberList(v.values,'Observations',1000),n=xs.length,mean=stableSum(xs)/n;
      if(!['sample','population'].includes(v.mode))fail('Choose sample or population.');
      if(v.mode==='sample'&&n<2)fail('A sample standard deviation needs at least two observations.');
      var ss=stableSum(xs.map(function(x){return(x-mean)*(x-mean);})),denom=v.mode==='sample'?n-1:n,variance=ss/denom;
      return{count:n,mean:mean,ss:ss,divisor:denom,variance:variance,sd:Math.sqrt(variance),mode:v.mode};
    },
    'fraction-calculator':function(v){
      var a=fraction(integerText(v.a,'First numerator'),integerText(v.b,'First denominator')),b=fraction(integerText(v.c,'Second numerator'),integerText(v.d,'Second denominator')),r;
      if(v.operation==='add')r=fraction(a.n*b.d+b.n*a.d,a.d*b.d);
      else if(v.operation==='subtract')r=fraction(a.n*b.d-b.n*a.d,a.d*b.d);
      else if(v.operation==='multiply')r=fraction(a.n*b.n,a.d*b.d);
      else if(v.operation==='divide'){if(b.n===0n)fail('Cannot divide by a zero fraction.');r=fraction(a.n*b.d,a.d*b.n);}
      else fail('Choose a fraction operation.');
      return{numerator:r.n,denominator:r.d,whole:r.n/r.d,remainder:absBig(r.n%r.d),decimal:Number(r.n)/Number(r.d)};
    },
    'proportion-calculator':function(v){
      var a=number(v.a,'First numerator',-1e12,1e12),b=positive(number(v.b,'First denominator',0,1e12),'First denominator'),c=positive(number(v.c,'Second denominator',0,1e12),'Second denominator');
      return{value:finite(a/b*c),ratio:a/b,a:a,b:b,c:c};
    },
    'slope-calculator':function(v){var p=point(v),dx=p.x2-p.x1,dy=p.y2-p.y1;if(dx===0&&dy===0)fail('Two identical points do not determine a unique line.');var slope=dx===0?null:finite(dy/dx);return{slope:slope,dx:dx,dy:dy,intercept:slope===null?null:finite(p.y1-slope*p.x1),x:p.x1};},
    'quadratic-formula-calculator':function(v){
      var a=number(v.a,'Coefficient a',-1e12,1e12),b=number(v.b,'Coefficient b',-1e12,1e12),c=number(v.c,'Coefficient c',-1e12,1e12);
      if(a===0)return b===0?{kind:c===0?'all':'none'}:{kind:'linear',roots:[finite(-c/b)]};
      var scale=Math.max(Math.abs(a),Math.abs(b),Math.abs(c)),aa=a/scale,bb=b/scale,cc=c/scale,d=bb*bb-4*aa*cc;
      if(d<0)return{kind:'complex',real:finite(-bb/(2*aa)),imag:finite(Math.sqrt(-d)/(2*Math.abs(aa))),discriminant: b*b-4*a*c};
      if(d===0)return{kind:'double',roots:[finite(-bb/(2*aa))],discriminant:b*b-4*a*c};
      var q=-0.5*(bb+(bb>=0?1:-1)*Math.sqrt(d)),roots=[finite(q/aa),finite(cc/q)].sort(function(x,y){return x-y;});
      return{kind:'real',roots:roots,discriminant:b*b-4*a*c};
    },
    'probability-calculator':function(v){var a=number(v.a,'Probability of A (%)',0,100)/100,b=number(v.b,'Probability of B (%)',0,100)/100;return{both:a*b,either:a+b-a*b,neither:(1-a)*(1-b),one:a*(1-b)+b*(1-a),notA:1-a,notB:1-b};},
    'distance-calculator':function(v){var p=point(v);return{distance:Math.hypot(p.x2-p.x1,p.y2-p.y1),dx:p.x2-p.x1,dy:p.y2-p.y1};},
    'midpoint-calculator':function(v){var p=point(v);return{x:(p.x1+p.x2)/2,y:(p.y1+p.y2)/2,distance:Math.hypot(p.x2-p.x1,p.y2-p.y1)};},
    'circumference-calculator':function(v){var x=number(v.size,'Circle measurement',0,1e9),r;if(v.mode==='radius')r=x;else if(v.mode==='diameter')r=x/2;else fail('Choose radius or diameter.');return{radius:r,diameter:2*r,circumference:2*Math.PI*r,area:Math.PI*r*r};},
    'area-calculator':function(v){
      var a=number(v.a,'First dimension',0,1e9),b=v.shape==='circle'?0:number(v.b,'Second dimension',0,1e9),area;
      if(v.shape==='rectangle')area=a*b;else if(v.shape==='triangle')area=a*b/2;else if(v.shape==='circle')area=Math.PI*a*a;else if(v.shape==='trapezoid'){var h=number(v.h,'Perpendicular height',0,1e9);area=(a+b)*h/2;}else fail('Choose a supported shape.');
      return{area:area,shape:v.shape};
    },

  });


  // Decimal percentage arithmetic avoids 10.075 -> 10.07 binary rounding errors.
  function roundedTipCents(billCents,raw) {
    var normalized=String(raw).trim().replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d);}).replace(/[۰-۹]/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d);}).replace(/٫/g,'.');
    if(Number(normalized)===0)return 0;
    var parts=normalized.toLowerCase().split('e'),mantissa=parts[0].replace(/^\+/,''),decimal=(mantissa.split('.')[1]||'').length,scale=decimal-Number(parts[1]||0),digits=mantissa.replace('.','');
    if(digits.length>1000||Math.abs(scale)>1000)fail('Tip rate is outside supported decimal precision.');
    var numerator=BigInt(billCents)*BigInt(digits),denominator=100n;
    if(scale>=0)denominator*=10n**BigInt(scale);else numerator*=10n**BigInt(-scale);
    return Number((2n*numerator+denominator)/(2n*denominator));
  }
  function validateNumbers(value){
    if(typeof value==='number'&&!Number.isFinite(value))fail('These inputs exceed supported numerical precision. Try a less extreme ratio.');
    if(value&&typeof value==='object')Object.keys(value).forEach(function(key){validateNumbers(value[key]);});
    return value;
  }
  Object.keys(api).forEach(function(key){if(typeof api[key]==='function'){var calculate=api[key];api[key]=function(v){return validateNumbers(calculate(v));};}});

  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.DCHMath=api;
  if(typeof document==='undefined')return;
  var dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var form=document.getElementById('calculator-form');
  function format(n,places){if(n===0)n=0;if(n!==0&&Math.abs(n)<1e-7)return n.toExponential(8);return new Intl.NumberFormat('en-US',{maximumFractionDigits:places===undefined?8:places}).format(n);}
  function money(n,code){return new Intl.NumberFormat('en-US',{style:'currency',currency:code,maximumFractionDigits:2}).format(n);}
  var error=document.getElementById('calc-error'),output=document.getElementById('result-value'),notes=document.getElementById('result-notes'),list=document.getElementById('result-breakdown'),status=document.getElementById('result-status'),schedule=document.getElementById('schedule');
  function clear(){if(!form)return;output.textContent='—';notes.textContent='Inputs changed. Select Calculate for a current result.';list.replaceChildren();if(schedule)schedule.replaceChildren();status.textContent='Waiting for calculation';form.dataset.validResult='false';}
  function item(label,value){var li=document.createElement('li'),labelNode=document.createElement('span'),strong=document.createElement('strong');labelNode.textContent=label;strong.textContent=value;li.append(labelNode,strong);list.append(li);}
  function table(headers,rows){if(!schedule||!rows.length)return;var details=document.createElement('details'),summary=document.createElement('summary'),wrap=document.createElement('div'),t=document.createElement('table'),head=document.createElement('thead'),tr=document.createElement('tr'),body=document.createElement('tbody');summary.textContent='See calculation details';headers.forEach(function(h){var th=document.createElement('th');th.scope='col';th.textContent=h;tr.append(th);});head.append(tr);rows.forEach(function(row){var tr=document.createElement('tr');row.forEach(function(c){var td=document.createElement('td');td.textContent=c;tr.append(td);});body.append(tr);});t.append(head,body);wrap.className='stage1-table-scroll';wrap.append(t);details.className='guide-v12';details.append(summary,wrap);schedule.append(details);}
  if(form){
    var tool=form.dataset.tool;
    var today=new Date(),localToday=String(today.getFullYear()).padStart(4,'0')+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0');
    form.querySelectorAll('[data-today]').forEach(function(el){el.value=localToday;});
    function updateLabels(){
      if(tool==='vat'){document.querySelector('[for="amount"]').textContent=form.elements.mode.value==='add'?'Amount excluding VAT':'Amount including VAT';}
      if(tool==='salary-hourly'){document.querySelector('[for="amount"]').textContent=form.elements.mode.value==='annual'?'Annual gross salary':'Hourly gross pay';}
      if(tool==='apy'){document.querySelector('[for="rate"]').textContent=form.elements.mode.value==='nominal'?'Nominal annual rate (%)':'Effective annual yield (%)';}
      if(tool==='roi'){form.elements.years.disabled=form.elements.annualize.value!=='yes';}
      if(tool==='area-calculator'){
        var shape=form.elements.shape.value;
        [['a',shape==='circle'?'Radius':shape==='rectangle'?'Length':shape==='trapezoid'?'First parallel side':'Base'],['b',shape==='rectangle'?'Width':shape==='trapezoid'?'Second parallel side':'Perpendicular height']].forEach(function(x){document.querySelector('[for="'+x[0]+'"]').textContent=x[1];});
        ['b','h'].forEach(function(name){var show=name==='b'?shape!=='circle':shape==='trapezoid';form.elements[name].disabled=!show;form.elements[name].closest('.form-group').hidden=!show;});
      }
      if(tool==='circumference-calculator')document.querySelector('[for="size"]').textContent=form.elements.mode.value==='radius'?'Radius':'Diameter';
      if(tool==='pythagorean-theorem-calculator')document.querySelector('[for="b"]').textContent=form.elements.mode.value==='hypotenuse'?'Second leg b':'Hypotenuse c';

      if(tool==='percentage'){
        var mode=form.elements.mode.value,labels={of:['Percentage (%)','Number'],share:['Part','Reference total'],change:['Original value','New value'],reverse:['Change (%), negative for a decrease','New value after the change']};
        document.querySelector('[for="x"]').textContent=labels[mode][0];document.querySelector('[for="y"]').textContent=labels[mode][1];
      }
      if(tool==='unit-converter'){
        var family=form.elements.family.value,keys=Object.keys(units[family]);['from','to'].forEach(function(name,i){var el=form.elements[name],previous=el.value;el.replaceChildren();keys.forEach(function(key){var opt=document.createElement('option');opt.value=key;opt.textContent=units[family][key][0];el.append(opt);});el.value=keys.includes(previous)?previous:(family==='length'?(i?'ft':'m'):family==='temperature'?(i?'F':'C'):keys[i]);});
      }
      if(tool==='fuel-cost'){
        var metric=form.elements.system.value==='metric';[['distance',metric?'One-way distance (km)':'One-way distance (miles)'],['economy',metric?'Fuel consumption (L / 100 km)':'Fuel economy (miles / US gallon)'],['price',metric?'Price per liter':'Price per US gallon']].forEach(function(a){document.querySelector('[for="'+a[0]+'"]').textContent=a[1];});
      }
    }
    updateLabels();
    form.addEventListener('input',function(){error.hidden=true;clear();});
    form.addEventListener('change',function(e){if(['mode','family','system','annualize','shape'].includes(e.target.name))updateLabels();clear();});
    var swap=document.getElementById('swap-dates');if(swap)swap.addEventListener('click',function(){var start=form.elements.start,end=form.elements.end,value=start.value;start.value=end.value;end.value=value;clear();});
    form.addEventListener('submit',function(e){
      e.preventDefault();clear();error.hidden=true;
      try{
        var v=Object.fromEntries(new FormData(form).entries()),r=api[tool](v);notes.textContent='';status.textContent='Calculated from your inputs';
        if(tool==='percentage'){output.textContent=format(r.value)+r.suffix;notes.textContent=r.explanation;}
        if(tool==='discount'){output.textContent=money(r.total,r.currency);item('Discounted price per unit',money(r.unit,r.currency));item('Subtotal before tax',money(r.subtotal,r.currency));item('Tax',money(r.tax,r.currency));item('Savings before tax',money(r.saving,r.currency));item('Combined discount',format(r.effective,4)+'%');notes.textContent='Discounts are applied in sequence. Tax is applied to the discounted subtotal.';}
        if(tool==='unit-converter'){output.textContent=format(r.value,12);notes.textContent=r.unit;item('Starting value',format(r.input)+' '+r.from);if(r.factor!==null)item('Conversion factor',format(r.factor,12));}
        if(tool==='date-difference'){output.textContent=format(r.days)+' days';item('Whole weeks',format(r.weeks));item('Remaining days',String(r.remainder));notes.textContent=r.inclusive?'Both the start and end dates are included.':'Elapsed calendar days; the start date is excluded.';}
        if(tool==='age'){output.textContent=r.years+' years';item('Additional completed months',String(r.months));item('Remaining days',String(r.days));item('Total calendar days',format(r.totalDays));notes.textContent='Calendar anniversaries use the last day of a shorter month when necessary.';}
        if(tool==='mortgage'){output.textContent=money(r.payment,r.currency)+' / month';item('Total principal and interest',money(r.total,r.currency));item('Total interest',money(r.interest,r.currency));item('Number of payments',format(r.months));item('First payment: interest',money(r.firstInterest,r.currency));item('First payment: principal',money(r.firstPrincipal,r.currency));notes.textContent='Principal and interest only. Add taxes, insurance, fees and other ownership costs separately.';table(['End of year','Remaining principal'],r.schedule.map(function(x){return[String(x.year),money(x.balance,r.currency)];}));}
        if(tool==='compound-interest'){output.textContent=money(r.balance,r.currency);item('Starting amount + additions',money(r.deposited,r.currency));item('Modeled growth',money(r.growth,r.currency));item('Number of months',String(r.months));item('Effective annual rate in this model',format(r.effectiveAnnual,4)+'%');notes.textContent='Monthly compounding; additions at the '+(v.timing==='end'?'end':'beginning')+' of each month. This is an assumed-rate scenario.';table(['Month','Paid in','Balance','Growth'],r.schedule.map(function(x){return[String(x.month),money(x.deposited,r.currency),money(x.balance,r.currency),money(x.growth,r.currency)];}));}
        if(tool==='simple-interest'){output.textContent=money(r.total,r.currency);item('Principal',money(r.principal,r.currency));item('Simple interest',money(r.interest,r.currency));item('Time in years',format(r.years,10));notes.textContent='Interest is calculated on the original principal only.';}
        if(tool==='fuel-cost'){output.textContent=money(r.total,r.currency);item('Total distance',format(r.distance)+' '+r.distanceUnit);item('Fuel needed',format(r.fuel,4)+' '+r.unit);item('Fuel cost',money(r.fuelCost,r.currency));item('Estimated cost per traveler',money(r.perPerson,r.currency));notes.textContent='Includes the entered tolls and parking once for the whole trip. Fuel prices and consumption are your assumptions.';}
        if(tool==='tip'){output.textContent=money(r.total,r.currency);item('Tip on the pre-tax bill',money(r.tip,r.currency));if(r.extraCount){item(r.extraCount+' '+(r.extraCount===1?'person pays':'people pay'),money(r.extra,r.currency));item(r.baseCount+' '+(r.baseCount===1?'person pays':'people pay'),money(r.base,r.currency));}else item('Each person pays',money(r.base,r.currency));notes.textContent='The tip is rounded to cents first (an exact half cent rounds upward). Shares add up to the displayed total.';}
        if(tool==='vat'){output.textContent=money(v.mode==='add'?r.gross:r.net,r.currency);item('Net amount without VAT',money(r.net,r.currency));item('VAT amount',money(r.tax,r.currency));item('Gross amount with VAT',money(r.gross,r.currency));notes.textContent=v.mode==='add'?'Main result includes VAT at the rate you entered.':'Main result excludes VAT recovered from the inclusive amount.';}
        if(tool==='salary-hourly'){output.textContent=v.mode==='annual'?money(r.hourly,r.currency)+' / hour':money(r.annual,r.currency)+' / year';item('Annual gross pay',money(r.annual,r.currency));item('Hourly gross pay',money(r.hourly,r.currency));item('Average per calendar month',money(r.monthly,r.currency));item('Per scheduled paid week',money(r.weekly,r.currency));item('Per two scheduled paid weeks',money(r.twoWeeks,r.currency));item('Per scheduled workday',money(r.daily,r.currency));item('Scheduled paid hours per year',format(r.annualHours));notes.textContent='Averages use your paid weeks and hours. Taxes, benefits and overtime premiums are not modeled.';}
        if(tool==='apy'){output.textContent=format(v.mode==='nominal'?r.effective:r.nominal,6)+'%';item('Nominal annual rate',format(r.nominal,6)+'%');item('Effective annual yield in this model',format(r.effective,6)+'%');item('Rate per compounding period',format(r.periodic,6)+'%');item('One-year ending balance',money(r.balance,r.currency));item('One-year growth',money(r.interest,r.currency));notes.textContent=v.mode==='nominal'?'Main result is the effective annual yield. No additions, withdrawals or fees are modeled.':'Main result is the nominal annual rate that reproduces the entered effective yield under the selected frequency.';}
        if(tool==='net-worth'){output.textContent=money(r.net,r.currency);item('Total entered assets',money(r.assets,r.currency));item('Total entered liabilities',money(r.debts,r.currency));item('Liabilities as a share of assets',r.debtRatio===null?'Undefined when assets are zero':format(r.debtRatio,4)+'%');notes.textContent='A balance-sheet snapshot from your values, not a forecast or a valuation service.';}
        if(tool==='budget'){output.textContent=money(r.remaining,r.currency);item('Modeled average monthly income',money(r.income,r.currency));item('Monthly expenses',money(r.expenses,r.currency));item('Remaining before planned savings',money(r.beforeSaving,r.currency));item('Planned monthly savings',money(r.saving,r.currency));item('Expenses as a share of income',r.expenseRatio===null?'Undefined when income is zero':format(r.expenseRatio,4)+'%');notes.textContent='Main result is the amount left after expenses and planned savings. Pay-frequency conversions are calendar-month averages.';}
        if(tool==='emergency-fund'){output.textContent=money(r.gap,r.currency);item('Selected reserve target',money(r.target,r.currency));item('Current expense coverage',format(r.coverage,4)+' months');item('Whole months of additions to reach target',r.needed===null?'Not reached with zero monthly additions':format(r.needed));item('Amount above the selected target',money(r.excess,r.currency));notes.textContent='Main result is the remaining savings gap. Monthly additions occur at month end; no interest, withdrawals or inflation are included.';}
        if(tool==='roi'){output.textContent=r.roi===null?'Undefined at zero cost':format(r.roi,6)+'%';item('Total modeled cost',money(r.cost,r.currency));item('Received amount or ending value',money(r.received,r.currency));item('Net gain or loss',money(r.gain,r.currency));if(v.annualize==='yes')item('Annualized equivalent',r.annual===null?(r.annualUnavailable?'Outside the supported range':'Undefined at zero cost'):format(r.annual,6)+'%');notes.textContent='Annualization treats all costs as paid initially and all receipts as received at the end. It does not model intermediate cash-flow dates.';}
        if(tool==='break-even'){output.textContent=r.whole===null?'No positive-sales break-even':format(r.whole)+' units';item('Contribution per unit after entered sales fee',money(r.margin,r.currency));item('Theoretical fractional units',r.exact===null?'Not defined with nonpositive contribution':format(r.exact,8));item('Revenue at the whole-unit threshold',r.breakEvenRevenue===null?'Not available':money(r.breakEvenRevenue,r.currency));item('Planned-sales revenue',money(r.revenue,r.currency));item('Planned-sales total modeled costs',money(r.cost,r.currency));item('Planned-sales profit or loss',money(r.profit,r.currency));notes.textContent=r.margin<=0?'The entered unit contribution is not positive. When fixed costs are zero, zero sales is the cost-covering point; positive volume does not create a positive contribution.':'Whole units are rounded up to cover modeled costs. Use one consistent period for fixed costs and planned sales.';}
        if(tool==='mean-median-mode'){output.textContent=format(r.mean,10);item('Median',format(r.median,10));item('Repeated-value modes',r.modes.length?r.modes.map(function(x){return format(x,10);}).join(', '):'No repeated value');item('Number of values',String(r.count));item('Sum',format(r.sum,10));item('Minimum',format(r.min,10));item('Maximum',format(r.max,10));item('Range',format(r.range,10));notes.textContent='Main result is the arithmetic mean. Exact numeric repetitions determine the listed modes.';table(['Value','Frequency'],r.frequencies.slice(0,50).map(function(x){return[format(x[0],10),String(x[1])];}));if(r.frequencies.length>50)notes.textContent+=' The frequency table shows the first 50 distinct values.';}
        if(tool==='gpa'){output.textContent=r.gpa.toFixed(2);item('Total entered credits',format(r.credits,6));item('Total quality points',format(r.quality,6));item('Included courses',String(r.courses));item('Selected maximum grade points',format(r.scale));notes.textContent='A credit-weighted result for the courses entered. Your institution determines grade mappings, inclusion and transcript rounding.';table(['Course','Grade points','Credits','Quality points'],r.rows.map(function(x,i){return[String(i+1),format(x.grade,6),format(x.credits,6),format(x.quality,6)];}));}

        if(tool==='standard-deviation'){output.textContent=format(r.sd,10);item('Variance',format(r.variance,10));item('Arithmetic mean',format(r.mean,10));item('Observations',String(r.count));item('Divisor used',String(r.divisor));item('Sum of squared deviations',format(r.ss,10));notes.textContent=(r.mode==='sample'?'Sample: divides by n − 1.':'Population: divides by n.')+' Standard deviation uses the original measurement unit; variance uses its square.';}
        if(tool==='fraction-calculator'){output.textContent=r.numerator.toString()+(r.denominator===1n?'':' / '+r.denominator.toString());item('Approximate decimal',format(r.decimal,12));var mixed=r.whole.toString();if(r.remainder!==0n)mixed=(r.numerator<0n&&r.whole===0n?'-':'')+(r.whole===0n?'':mixed+' ')+r.remainder.toString()+'/'+r.denominator.toString();item('Mixed-number form',mixed);notes.textContent='The fraction is exact and reduced; the decimal is a floating-point approximation. A leading minus applies to the entire mixed number.';}
        if(tool==='proportion-calculator'){output.textContent=format(r.value,12);item('Known ratio a / b',format(r.ratio,12));item('Equation',r.a+' / '+r.b+' = x / '+r.c);notes.textContent='The result is x, the second numerator. Both denominators must be positive.';}
        if(tool==='slope-calculator'){output.textContent=r.slope===null?'Vertical line':format(r.slope,12);item('Change in x',format(r.dx));item('Change in y',format(r.dy));item('Line equation',r.slope===null?'x = '+format(r.x):'y = '+format(r.slope,12)+'x '+(r.intercept<0?'− ':'+ ')+format(Math.abs(r.intercept),12));notes.textContent=r.slope===null?'Slope and y-intercept are undefined for this vertical line.':'Slope is the change in y divided by the change in x.';}
        if(tool==='quadratic-formula-calculator'){if(r.kind==='all')output.textContent='Every real number';else if(r.kind==='none')output.textContent='No solution';else if(r.kind==='complex')output.textContent=format(r.real,12)+' ± '+format(r.imag,12)+'i';else output.textContent=r.roots.map(function(x){return format(x,12);}).join(' and ');item('Equation type',({all:'Identity',none:'Inconsistent constant equation',linear:'Linear',complex:'Two complex conjugate roots',double:'One repeated real root',real:'Two real roots'})[r.kind]);if(r.discriminant!==undefined)item('Discriminant b² − 4ac',format(r.discriminant,12));notes.textContent='Solves ax² + bx + c = 0. If a is zero, the remaining linear or constant equation is classified separately.';}
        if(tool==='probability-calculator'){output.textContent=format(r.both*100,10)+'%';item('At least one: A or B',format(r.either*100,10)+'%');item('Exactly one',format(r.one*100,10)+'%');item('Neither event',format(r.neither*100,10)+'%');item('Not A',format(r.notA*100,10)+'%');item('Not B',format(r.notB*100,10)+'%');notes.textContent='Main result is both A and B. All combined-event values assume independence; the tool does not test that assumption.';}
        if(tool==='distance-calculator'){output.textContent=format(r.distance,12);item('Horizontal change',format(r.dx));item('Vertical change',format(r.dy));notes.textContent='Straight-line distance in a flat two-dimensional coordinate system, using the coordinate unit.';}
        if(tool==='midpoint-calculator'){output.textContent='('+format(r.x,12)+', '+format(r.y,12)+')';item('Distance between endpoints',format(r.distance,12));notes.textContent='The coordinate-wise average lies halfway along the straight segment joining the endpoints.';}
        if(tool==='circumference-calculator'){output.textContent=format(r.circumference,12);item('Radius',format(r.radius,12));item('Diameter',format(r.diameter,12));item('Area in squared units',format(r.area,12));notes.textContent='Main result is circumference in the entered length unit. Area uses the square of that unit.';}
        if(tool==='area-calculator'){output.textContent=format(r.area,12)+' square units';notes.textContent='Use one length unit for every dimension. Height means perpendicular height; the result uses squared units.';}
        if(tool==='pythagorean-theorem-calculator'){output.textContent=format(r.value,12);item('Calculated side',r.mode==='hypotenuse'?'Hypotenuse c':'Missing leg b');notes.textContent='This relation applies only to a right triangle. All lengths use one consistent unit.';}
        if(tool==='exponent-calculator'){output.textContent=format(r.value,12);item('Base',format(r.base,12));item('Exponent',format(r.power,12));notes.textContent='Real-number result. Negative bases require integer exponents; unsupported overflow or underflow produces an input error.';}
        if(tool==='logarithm-calculator'){output.textContent=format(r.value,12);item('Natural logarithm ln(x)',format(r.natural,12));item('Common logarithm log10(x)',format(r.common,12));notes.textContent='Main result is the logarithm in your entered base. Argument and base must be positive; the base cannot be one.';}
        if(tool==='factorial-calculator'){output.textContent=r.value.toString();item('Decimal digits in the exact result',String(r.digits));notes.textContent=r.n+'! is evaluated using exact integer arithmetic. The empty product gives 0! = 1.';}
        if(tool==='permutation-combination-calculator'){output.textContent=r.combinations.toString();item('Ordered arrangements nPr',r.permutations.toString());item('Unordered selections nCr',r.combinations.toString());notes.textContent='Main result counts combinations. Items are distinct; selections are without replacement. Exact integer results are shown.';}
        if(tool==='lcm-gcf-calculator'){output.textContent=r.gcf.toString();item('Least common multiple',r.lcm.toString());notes.textContent='Main result is the greatest common factor of the absolute input values. If one input is zero, the LCM convention used here is zero.';}
        if(tool==='prime-factorization-calculator'){output.textContent=r.factors.length?r.factors.map(function(x){return x[0]+(x[1]>1?'^'+x[1]:'');}).join(' × '):'1 has no prime factors';item('Prime factors counted with repetition',String(r.count));notes.textContent='A caret denotes an exponent. Trial division factors the entered positive integer; one is neither prime nor composite.';if(r.factors.length)table(['Prime factor','Exponent'],r.factors.map(function(x){return x.map(String);}));}
        if(tool==='percent-error-calculator'){output.textContent=format(r.error,10)+'%';item('Absolute difference',format(r.absolute,12));item('Signed measured − reference difference',format(r.signed,12));item('Signed difference relative to |reference|',format(r.signedPercent,10)+'%');notes.textContent='Main result is nonnegative absolute percent error. It uses the magnitude of the nonzero reference as its denominator.';}
        if(tool==='weighted-average-calculator'){output.textContent=format(r.value,12);item('Total weight',format(r.totalWeight,12));item('Sum of value × weight',format(r.weightedSum,12));item('Paired entries',String(r.count));notes.textContent='Weights are normalized by their sum; they do not have to add to 100. The table shows up to 50 pairs.';table(['Value','Weight','Value × weight'],r.rows.slice(0,50).map(function(row){return row.map(function(x){return format(x,12);});}));}
        if(tool==='z-score-calculator'){output.textContent=format(r.z,12);item('Observation minus mean',format(r.difference,12));notes.textContent='The result measures signed distance from the mean in standard-deviation units. It is not a percentile or a probability.';}
        if(tool==='date-calculator'){output.textContent=r.date;item('Weekday',dayNames[r.weekday]);item('Signed calendar-day change',String(r.days));notes.textContent='Months and years are shifted once from the original date, clamping to the last valid day of a shorter target month.';}
        if(tool==='time-duration'){output.textContent=r.days+'d '+String(r.hourPart).padStart(2,'0')+':'+String(r.minutes).padStart(2,'0')+':'+String(r.secondPart).padStart(2,'0');item('Total hours',format(r.hours,10));item('Total seconds',String(r.seconds));notes.textContent='Wall-clock arithmetic without time zones or daylight-saving adjustments. A modeled day is exactly 24 hours.';}
        if(tool==='business-days-calculator'){output.textContent=r.days+' working days';item('Calendar dates included by endpoint setting',String(r.calendar));item('Excluded weekend dates',String(r.weekend));item('Additional excluded working-day holidays',String(r.holidays));item('Unique holiday dates entered',String(r.uniqueHolidays));notes.textContent='Only your weekend pattern and entered holiday dates are excluded. No country holiday calendar is fetched.';}
        if(tool==='day-of-week-calculator'){output.textContent=dayNames[r.weekday];item('ISO weekday number (Monday = 1)',String(r.isoWeekday));item('Day of the year',String(r.ordinal));item('Leap year',r.leap?'Yes, 366 days':'No, 365 days');notes.textContent='Uses the proleptic Gregorian calendar for years 0001–9999, without historical local calendar-change rules.';}
        if(tool==='profit-margin'){output.textContent=r.margin===null?'Undefined at zero revenue':format(r.margin,10)+'%';item('Gross profit or loss',money(r.profit,r.currency));item('Markup on cost',r.markup===null?'Undefined at zero cost':format(r.markup,10)+'%');notes.textContent='Main result is gross margin as a share of revenue. Operating expenses, interest and taxes are excluded.';}
        if(tool==='markup'){output.textContent=money(r.price,r.currency);item('Added profit or price reduction',money(r.profit,r.currency));item('Implied margin on selling price',r.margin===null?'Undefined at zero price':format(r.margin,10)+'%');notes.textContent='Main result is unit selling price using a percentage of entered cost. Fees and taxes are not added.';}
        if(tool==='contribution-margin'){output.textContent=money(r.unit,r.currency)+' / unit';item('Contribution margin ratio',r.ratio===null?'Undefined at zero selling price':format(r.ratio,10)+'%');item('Total contribution',money(r.total,r.currency));item('Sales revenue',money(r.revenue,r.currency));item('Operating result after entered fixed costs',money(r.profit,r.currency));notes.textContent='Contribution covers the fixed costs you entered; the remaining modeled amount is operating profit or loss before tax and financing.';}
        if(tool==='inventory-turnover'){output.textContent=r.turnover===null?'Undefined at zero average inventory':format(r.turnover,10)+' turns';item('Two-point average inventory at cost',money(r.average,r.currency));item('Inventory days for the entered period',r.days===null?'Undefined without positive turnover':format(r.days,10));item('Period length',r.period+' days');notes.textContent='Uses cost of goods sold and inventory at cost for the same period. The result is not automatically annualized.';}
        if(tool==='working-capital'){output.textContent=money(r.working,r.currency);item('Current ratio',r.current===null?'Undefined at zero current liabilities':format(r.current,10));item('Quick ratio under the stated exclusions',r.quick===null?'Undefined at zero current liabilities':format(r.quick,10));notes.textContent='Quick assets here are current assets less entered inventory and prepayments. Ratios are snapshots and do not establish when cash is available.';}
        if(tool==='cpm'){output.textContent=money(r.cpm,r.currency)+' / 1,000 impressions';item('Cost per impression',format(r.perImpression,12)+' '+r.currency);item('Campaign spend',money(r.spend,r.currency));item('Delivered impressions',format(r.impressions));notes.textContent='Impressions count deliveries, including repeat views. CPM does not measure unique reach, clicks, conversions or profit.';}

        form.dataset.validResult='true';
      }catch(ex){output.textContent='—';status.textContent='Check your inputs';notes.textContent='';error.textContent=ex.message;error.hidden=false;form.dataset.validResult='false';}
    });
    document.querySelectorAll('[data-result-action]').forEach(function(b){b.addEventListener('click',async function(){if(form.dataset.validResult!=='true'){error.textContent='Select Calculate before copying or printing a result.';error.hidden=false;return;}if(b.dataset.resultAction==='print'){window.print();return;}var inputLines=Array.from(form.querySelectorAll('input[name],select[name],textarea[name]')).filter(function(field){return !field.disabled;}).map(function(field){var label=form.querySelector('label[for=\"'+field.id+'\"]');var value=field.tagName==='SELECT'?field.options[field.selectedIndex].text:field.value;return(label?label.textContent:field.name)+': '+value;});var text=document.title+'\n'+location.href.split('?')[0]+'\n'+inputLines.join('\n')+'\nResult: '+output.textContent+'\n'+list.innerText+'\n'+notes.textContent;if(b.dataset.resultAction==='share'){var shareStatus=document.getElementById('share-status');try{if(navigator.share&&window.isSecureContext){await navigator.share({title:document.title,text:text});}else{await navigator.clipboard.writeText(text);if(shareStatus)shareStatus.textContent='Result copied for sharing.';}}catch(ex){if(ex.name!=='AbortError'&&shareStatus)shareStatus.textContent='Sharing is unavailable. Use Copy result.';}return;}try{await navigator.clipboard.writeText(text);b.textContent='Copied';setTimeout(function(){b.textContent='Copy result';},1800);}catch(ex){b.textContent='Select and copy the result';}});});
  }

  document.querySelectorAll('[data-dch-example]').forEach(function(button){button.addEventListener('click',function(){
    if(!form)return;
    var entries=JSON.parse(button.getAttribute('data-dch-example'));
    Object.keys(entries).forEach(function(key){var field=form.elements.namedItem(key);if(field){field.value=entries[key];field.dispatchEvent(new Event('change',{bubbles:true}));}});
    form.requestSubmit();
    form.scrollIntoView({block:'start'});
  });});
  var search=document.getElementById('tool-search');
  if(search){search.addEventListener('input',function(){var term=search.value.toLowerCase().trim(),shown=0;document.querySelectorAll('[data-tool-card]').forEach(function(card){var match=card.textContent.toLowerCase().includes(term);card.hidden=!match;if(match)shown++;});document.getElementById('search-status').textContent=shown+' calculators shown';document.getElementById('no-results').hidden=shown!==0;});}
  document.querySelectorAll('.toc-v12 a').forEach(function(a){a.addEventListener('click',function(){var g=document.querySelector('.guide-v12');if(g)g.open=true;});});
  var topButton=document.getElementById('backToTop');if(topButton){function syncTop(){topButton.classList.toggle('show',window.scrollY>500);}window.addEventListener('scroll',syncTop,{passive:true});topButton.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});syncTop();}
})(typeof globalThis!=='undefined'?globalThis:this);
