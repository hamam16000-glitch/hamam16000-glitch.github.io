/* The remaining 470 only. Mathematical references, invalid-input contracts,
   printed examples and browser coverage are reported separately. */
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const {load,root}=require('./site-engine-harness.cjs');
const scope=JSON.parse(fs.readFileSync(__dirname+'/review470-scope.json'));
let cases=0,assertions=0;const pageReferenceCases={};
function eq(a,b,m){assertions++;assert.equal(a,b,m)}
function ok(v,m){assertions++;assert.ok(v,m)}
function near(a,b,m){ok(Number.isFinite(a)&&Math.abs(a-b)<=Math.max(1e-10,Math.abs(b)*1e-11),m+': '+a+' vs '+b)}
function check(file,inputs,expected){const p=load(file+'.html',inputs);p.click();for(const [id,value] of Object.entries(expected))eq(p.out(id),value,file+' '+id);cases++;pageReferenceCases[file+'.html']=(pageReferenceCases[file+'.html']||0)+1;return p;}
check('rounding-calculator',{numberValue:'10.075',decimalPlaces:2},{mainResult:'10.08',floorOut:'10.07',ceilOut:'10.08',truncateOut:'10.07'});
check('rounding-calculator',{numberValue:'-10.075',decimalPlaces:2},{mainResult:'-10.07',floorOut:'-10.08',ceilOut:'-10.07',truncateOut:'-10.07'});
check('rounding-calculator',{numberValue:'0e-999999999',decimalPlaces:12},{mainResult:'0'});
check('home-sale-capital-gains',{sale:200000,selling:10000,purchase:250000,improvements:0,exclusion:250000},{mainResult:'$0.00',o1:'-$60,000.00',o2:'$190,000.00',o3:'$250,000.00'});
check('home-affordability',{income:1200000,debts:0,down:0,rate:0,years:30,tax:0,insurance:0},{mainResult:'$12,960,000.00',loanAmount:'$12,960,000.00'});
check('home-affordability',{income:12000,debts:0,down:100000,rate:0,years:30,tax:12,insurance:0},{mainResult:'$36,000.00',loanAmount:'$0.00'});
check('home-affordability',{income:12000,debts:0,down:0,rate:0,years:30,tax:0,insurance:5000},{mainResult:'Insurance exceeds the housing budget',loanAmount:'$0.00'});
check('loan-comparison',{amount:12000,rate1:0,rate2:0,term1:2,term2:2},{mainResult:'Payments are equal to the nearest cent'});
check('mortgage-payoff',{balance:12000,interestRate:0,monthlyPayment:10,extraPayment:0},{mainResult:'100 yrs 0 mo',monthsOut:'1,200',totalOut:'$12,000.00'});
check('mortgage-payoff',{balance:12001,interestRate:0,monthlyPayment:10,extraPayment:0},{mainResult:'Payoff exceeds 100 years',monthsOut:'—'});
check('triangle-calculator',{sideA:'3e-100',sideB:'4e-100',sideC:'5e-100'},{typeOut:'Scalene',angleOut:'90°'});
check('triangle-calculator',{sideA:3,sideB:4,sideC:5},{mainResult:'6 square units',typeOut:'Scalene',angleOut:'90°'});
check('system-of-equations-calculator',{a1:'1e-200',b1:0,c1:'1e-200',a2:0,b2:'1e-200',c2:'1e-200'},{mainResult:'x = 1, y = 1',detOut:'Outside representable range',classOut:'One unique solution'});
check('binary-calculator',{decimalInteger:'9007199254740993'},{mainResult:'100000000000000000000000000000000000000000000000000001',hexOut:'20000000000001'});
check('binary-calculator',{decimalInteger:'12abc'},{mainResult:'Enter a whole decimal number',hexOut:'—'});
check('binary-calculator',{decimalInteger:'1 2'},{mainResult:'Enter a whole decimal number',hexOut:'—'});
check('lcm-gcf-calculator',{aValue:9007199254740991,bValue:9007199254740990},{mainResult:'1',lcmOut:'81,129,638,414,606,654,674,191,240,921,090',productOut:'81,129,638,414,606,654,674,191,240,921,090'});
check('fraction-to-percent-calculator',{numerator:'9007199254740993',denominator:2},{mainResult:'Invalid input',decimalOut:'—'});
check('decimal-to-fraction-calculator',{decimalValue:.333333,maxDenominator:100},{mainResult:'1/3'});
check('length-converter',{meters:0.3048},{mainResult:'1 ft',inchesOut:'12 in'});
check('weight-converter',{kilograms:.45359237},{mainResult:'1 lb',ouncesOut:'16 oz'});
check('speed-converter',{kph:1.609344},{mainResult:'1 mph'});
check('speed-converter',{kph:10.9728},{fpsOut:'10 ft/s'});
check('google-ads-roi',{adSpend:1000,costMetric:1,conversionRate:2,averageOrder:100,grossMargin:50,otherCosts:0},{mainResult:'0%',clicksOut:'1,000',conversionsOut:'20',profitOut:'$0.00'});
for(const name of ['facebook-ads-roi','tiktok-ads-roi'])check(name,{adSpend:1000,costMetric:10,ctrRate:1,conversionRate:2,averageOrder:100,grossMargin:50,otherCosts:0},{mainResult:'0%',clicksOut:'1,000',conversionsOut:'20',profitOut:'$0.00'});
for(const name of ['allergy-shot-cost','appendectomy-cost','dermatologist-visit-cost','iui-cost','psychiatrist-visit-cost','tubal-ligation-cost','vasectomy-cost']){
 check(name,{count:1,unit:1000,other:0,deductible:200,coins:20,copay:50},{mainResult:'$410.00',o2:'$200.00',o3:'$590.00',o4:'$50.00'});
 check(name,{count:1,unit:100,other:0,deductible:20,coins:25,copay:500},{mainResult:'$100.00',o3:'$0.00',o4:'$60.00'});
 check(name,{count:1.5},{mainResult:'Invalid input',o4:'—'});
}
for(const name of ['bankruptcy-attorney-cost','divorce-lawyer-cost','dui-lawyer-cost','estate-planning-cost','immigration-lawyer-cost']){
 check(name,{attorneyHours:10,hourlyRate:200,flatFee:1500,courtFees:300,specialistFees:0,otherCosts:0},{mainResult:'$2,300.00',legalOut:'$2,000.00'});
 check(name,{attorneyHours:10,hourlyRate:200,flatFee:2500,courtFees:300,specialistFees:0,otherCosts:0},{mainResult:'$2,800.00',legalOut:'$2,500.00'});
}
for(const name of ['accounting-software-roi','payroll-software-roi','time-tracking-roi'])check(name,{hours:10,rate:30,avoided:0,monthly:100,setup:600},{mainResult:'100%',o1:'$3,600.00',o2:'$1,800.00',o3:'$1,800.00'});
for(const name of ['bootcamp-roi','college-tuition-roi','graduate-school-roi'])check(name,{tuition:16000,years:.5,aid:1000,current:45000,after:75000,workyears:5},{mainResult:'400%',o1:'$30,000.00',o2:'$150,000.00',o3:'$120,000.00'});
for(const name of ['auto-loan','loan'])check(name,{amount:12000,rate:'1e-20',months:24},{main:'$500.00',interest:'$0.00'});
check('payment-calculator',{principal:12000,annualRate:'1e-20',termMonths:24},{mainResult:'$500.00',interestOut:'$0.00'});
check('amortization',{principal:12000,rate:'1e-20',years:2,elapsed:1},{mainResult:'$500.00',remaining:'$6,000.00'});
check('annuity-payout',{principal:12000,rate:'1e-20',years:2},{mainResult:'$500.00'});
check('investment',{initial:1000,monthly:100,rate:'1e-20',years:1},{futureValue:'$2,200.00',contributions:'$2,200.00',growth:'$0.00'});
check('finance-calculator',{startingBalance:1000,monthlyContribution:100,annualReturn:'1e-20',years:1},{mainResult:'$2,200.00',growthOut:'$0.00'});
// References generated with Python Decimal at 70 digits, independently of
// the JS log1p/expm1 implementation and the page engines.
const sandbox={Intl,document:{getElementById(){return null}}};sandbox.window=sandbox;vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(root+'/assets/js/calculator-guard.js','utf8'),sandbox);
for(const ref of JSON.parse(fs.readFileSync(__dirname+'/review470-decimal-references.json'))){
 const api=sandbox.DCHCalculator;
 near(api.loanPayment(ref.principal,ref.annualRate,ref.months),Number(ref.payment),'payment '+ref.id);
 near(api.loanBalance(ref.principal,ref.annualRate,ref.paid,ref.months),Number(ref.balance),'balance '+ref.id);
 near(api.futureValue(ref.principal,ref.deposit,ref.annualRate/1200,ref.months),Number(ref.future),'future '+ref.id);
 cases++;
}
let inputCases=0,examplePages=0,exampleResults=0;
const fixtures=new Map(JSON.parse(fs.readFileSync(__dirname+'/content-example-fixtures.json')).map(x=>[x.path,x]));
for(const file of scope){
 const fixture=fixtures.get(file),p=load(file,fixture?.inputs||{});
 if(fixture){for(const [k,v]of Object.entries(fixture.inputs))p.set(k,v);p.click();for(const [id,v]of Object.entries(fixture.outputs)){eq(p.out(id),v,file+' example '+id);exampleResults++;}examplePages++;}
 const original=Object.fromEntries(Object.values(p.elements).map(e=>[e.id,e.value]));
 for(const rule of p.info.config.fields){
  if(rule.when&&original[rule.when[0]]!==rule.when[1])continue;
  for(const value of ['', '12abc','1 2','0x10','1e309','1e-999']){
   for(const[k,v]of Object.entries(original))p.set(k,v);p.click();p.set(rule.id,value);p.click();
   eq(p.out(p.info.config.primary),'Invalid input',file+' '+rule.id+'='+value);
   for(const id of p.info.config.outputs.filter(id=>id!==p.info.config.primary))eq(p.out(id),'—',file+' stale '+id);
   inputCases++;
  }
 }
}
const report={status:'passed',pages:scope.length,referenceCases:cases,inputCases,examplePages,exampleResults,assertions,pageReferenceCases};
fs.writeFileSync(__dirname+'/review470-validation.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
