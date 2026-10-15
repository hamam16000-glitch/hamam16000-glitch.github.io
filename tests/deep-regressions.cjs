const assert=require('assert/strict'),fs=require('fs');
const {root,page,load}=require('./site-engine-harness.cjs');
let assertions=0,edgeCases=0,referenceCases=0;
function eq(a,b,message){assertions++;assert.equal(a,b,message)}
function ok(a,message){assertions++;assert.ok(a,message)}
function check(name,values,expected){const p=load(name,values);p.click();for(const [id,v] of Object.entries(expected))eq(p.out(id),v,name+' '+id);referenceCases++;return p;}
// Reference results calculated independently of the production engines.
check('self-employment-tax.html',{profit:0,wages:300000,medicareWages:300000,status:'single'},{seTax:'$0.00',addMedTax:'$0.00'});
check('self-employment-tax.html',{profit:10000,wages:184500,medicareWages:300000,status:'single'},{ssTax:'$0.00',medTax:'$267.82',addMedTax:'$83.12',seTax:'$350.93',halfDeduction:'$133.91'});
check('self-employment-tax.html',{profit:400,wages:0,medicareWages:0,status:'single'},{seTax:'$0.00'});
check('self-employment-tax.html',{profit:80000,wages:0,medicareWages:0,status:'single'},{seTax:'$11,303.64',ssTax:'$9,161.12',halfDeduction:'$5,651.82'});
check('income-tax.html',{status:'single',income:85000,deductionType:'standard',customDeduction:''},{taxResult:'$9,870.00',taxableIncome:'$68,900.00'});
check('income-tax.html',{status:'hoh',income:41850,deductionType:'standard'},{taxResult:'$1,770.00'});
check('income-tax.html',{status:'single',income:12400,deductionType:'custom',customDeduction:0},{taxResult:'$1,240.00'});
check('income-tax.html',{status:'single',income:12400,deductionType:'custom',customDeduction:''},{taxResult:'Invalid input',afterTax:'—'});
check('capital-gains-tax.html',{status:'single',ordinary:48000,gain:2000,basisAdjust:0},{zeroGain:'$1,450.00',fifteenGain:'$550.00',cgTax:'$82.50'});
check('apr.html',{amount:1000,payment:100,months:10,fees:0},{aprResult:'0.00%',totalCost:'$0.00'});
check('apr.html',{amount:1000,payment:1100,months:1,fees:0},{aprResult:'120.00%'});
check('apr.html',{amount:1000,payment:990,months:1,fees:100},{aprResult:'120.00%'});
check('apr.html',{amount:10000,payment:100,months:12,fees:0},{aprResult:'Enter a valid loan with nonnegative APR',totalPayments:'—'});
check('apy.html',{rate:12,frequency:12,deposit:1000},{apyResult:'12.683%',interestEarned:'$126.83'});
check('roi.html',{initial:100,costs:0,final:121,income:0,years:2},{mainResult:'21%',annualized:'10%',profit:'$21.00'});
check('roi.html',{initial:0,costs:0,final:100,income:0,years:1},{mainResult:'Enter a positive invested amount and holding period',profit:'—'});
check('commercial-mortgage.html',{amount:12000,rate:0,amortYears:2,termYears:1},{mainResult:'$500.00',balloon:'$6,000.00',paid:'$6,000.00'});
check('commercial-mortgage.html',{amount:12000,rate:0,amortYears:2,termYears:3},{mainResult:'Enter valid terms; balloon term cannot exceed amortization',paid:'—'});
check('auto-loan-payoff.html',{balance:1000,annualRate:0,monthlyPayment:100,extraPayment:0},{mainResult:'10 months',interestOut:'$0.00'});
check('auto-loan-payoff.html',{balance:50000,annualRate:0,monthlyPayment:10,extraPayment:0},{mainResult:'Not repaid within 100 years at this payment',interestOut:'—'});
check('auto-loan-payoff.html',{balance:1000,annualRate:12,monthlyPayment:5,extraPayment:100},{mainResult:'11 months',baseInterestOut:'Not repaid within 100 years',savedOut:'Not available'});
check('rmd.html',{balance:0,factor:26.5},{mainResult:'$0.00',monthly:'$0.00',percent:'3.77%'});
check('compound-interest.html',{initial:1000,monthly:100,rate:0,years:1},{main:'$2,200.00',interest:'$0.00'});
check('ira.html',{current:1000,annual:100,rate:10,years:2},{mainResult:'$1,420.00',contrib:'$1,200.00',growth:'$220.00'});
check('roth-ira.html',{current:1000,annual:100,rate:0,years:2},{mainResult:'$1,200.00',withdrawal:'$4.00'});
check('high-yield-savings-interest.html',{start:0,deposit:0,apy:0,months:12,fee:100},{mainResult:'$0.00',o2:'$0.00',o3:'$0.00'});
check('high-yield-savings-interest.html',{start:100,deposit:0,apy:0,months:12,fee:30},{mainResult:'$0.00',o2:'$0.00',o3:'$100.00'});
check('standard-deviation.html',{values:'2,4,4,4,5,5,7,9'},{mainResult:'2',sample:'2.14',meanOut:'5'});
check('standard-deviation.html',{values:'5'},{mainResult:'0',sample:'Need at least 2 values'});
check('standard-deviation.html',{values:'1,2,abc'},{mainResult:'Enter a valid list of numbers',sample:'—'});
check('mean-median-mode.html',{values:'1,2,2,3'},{mainResult:'2',median:'2',mode:'2',range:'2'});
check('mean-median-mode.html',{values:''},{mainResult:'Enter a valid list of numbers',median:'—'});
check('variance-calculator.html',{values:'2,4,4,4,5,5,7,9'},{mainResult:'4',sampleOut:'4.571428571429'});
check('gpa.html',{grades:'4,3',credits:'3,3'},{mainResult:'3.500',creditsTotal:'6.0',qualityPoints:'21.00'});
check('gpa.html',{grades:'4,3',credits:'3'},{mainResult:'Enter matching grade and positive-credit lists',creditsTotal:'—'});
check('grade.html',{current:80,completed:50,target:90},{mainResult:'100.00%',possible:'Potentially achievable'});
check('grade.html',{current:70,completed:100,target:90},{mainResult:'Course already complete',possible:'Target not reached; no remaining grade weight'});
check('decimal-to-fraction-calculator.html',{decimalValue:-0.625,maxDenominator:10000},{mainResult:'-5/8',mixedOut:'-5/8'});
check('scientific-notation-calculator.html',{numberValue:9.999,sigFigs:3},{mainResult:'1.00 × 10^1',exponentOut:'1'});
check('significant-figures-calculator.html',{numberValue:1e-100,sigFigs:3},{mainResult:'1.00e-100',scientificOut:'1.00 × 10^-100'});
check('system-of-equations-calculator.html',{a1:0,b1:0,c1:1,a2:0,b2:0,c2:2},{mainResult:'No unique solution',classOut:'Inconsistent equations'});
check('system-of-equations-calculator.html',{a1:1e-8,b1:0,c1:1e-8,a2:0,b2:1e-8,c2:1e-8},{mainResult:'x = 1, y = 1',classOut:'One unique solution'});
check('system-of-equations-calculator.html',{a1:1,b1:2,c1:3,a2:2,b2:4,c2:6},{mainResult:'Infinitely many solutions'});
check('quadratic-formula-calculator.html',{coefA:1,coefB:1e8,coefC:1},{mainResult:'x₁ = -0.00000001, x₂ = -100,000,000'});
check('probability-calculator.html',{successOutcomes:1,totalOutcomes:2,trials:3},{mainResult:'50%',atLeastOut:'87.5%',expectedOut:'1.5'});
check('probability-calculator.html',{successOutcomes:1,totalOutcomes:2,trials:1.5},{mainResult:'Enter valid values',atLeastOut:'—'});
check('time-duration.html',{start:'23:30',end:'01:15'},{mainResult:'1 hr 45 min',minutes:'105 minutes',decimal:'1.75 hours'});
check('time-duration.html',{start:'',end:'17:30'},{mainResult:'Enter valid start and end times',minutes:'—'});
check('calorie.html',{sex:'male',age:30,weight:70,height:175,activity:1.55},{main:'2556 kcal/day'});
check('calorie.html',{sex:'male',age:30,weight:0,height:175,activity:1.55},{main:'Enter positive measurements and an adult age of at least 18'});
check('bmr.html',{sex:'male',age:35,weight:180,height:70},{mainResult:'1758 kcal/day'});
check('tdee.html',{sex:'male',age:35,weight:180,height:70,activity:1.2},{mainResult:'2109 kcal/day'});
check('ovulation.html',{period:'2026-01-01',cycle:28},{mainResult:'Jan 15, 2026',nextPeriod:'Jan 29, 2026'});
check('age-specific-date-calculator.html',{birthYear:2026,birthMonth:1,birthDay:31,refYear:2026,refMonth:3,refDay:1},{mainResult:'0 years, 1 months, 1 days'});
check('age-specific-date-calculator.html',{birthYear:2024,birthMonth:2,birthDay:29,refYear:2025,refMonth:2,refDay:28},{mainResult:'1 years, 0 months, 0 days',nextOut:'2025-02-28'});
check('months-between-dates-calculator.html',{y1:2026,m1:1,d1:31,y2:2026,m2:2,d2:28},{mainResult:'1 months',remainingOut:'0 days'});
check('length-converter.html',{meters:0.3048},{mainResult:'1 ft'});
for(const name of JSON.parse(fs.readFileSync(__dirname+'/range-calculators.json','utf8'))){
 check(name,{qty:10,low:2,typical:3,high:4,fixed:5,contingency:20},{mainResult:'$42.00',o1:'$30.00',o2:'$54.00'});
 check(name,{qty:10,low:4,typical:3,high:2,fixed:5,contingency:20},{mainResult:'Enter ordered low, typical and high unit costs',o1:'—',o2:'—'});
}
for(const entry of JSON.parse(fs.readFileSync(__dirname+'/zero-cost-roi-cases.json','utf8'))){
 if('costMetric' in entry.values)entry.values.costMetric=8;
 const p=load(entry.path,entry.values);p.click();ok(Object.values(p.outputs()).some(v=>v.includes('Undefined (zero cost)')),entry.path+' must not report 0% ROI for zero cost');referenceCases++;
}
// Exhaustively compare the optimized weekday calculation against a day-by-day reference.
const business=load('business-days-calculator.html');
for(let day=12;day<=18;day++)for(let offset=-100;offset<=100;offset++){
 const start=new Date(Date.UTC(2026,9,day));let expected=new Date(start),remaining=Math.abs(offset),direction=offset<0?-1:1;
 while(remaining){expected.setUTCDate(expected.getUTCDate()+direction);if(![0,6].includes(expected.getUTCDay()))remaining--;}
 business.set('year',2026);business.set('month',10);business.set('day',day);business.set('businessDays',offset);business.click();eq(business.out('mainResult'),expected.toISOString().slice(0,10));referenceCases++;
}
const filenames=fs.readdirSync(root).filter(n=>n.endsWith('.html')&&fs.readFileSync(root+'/'+n,'utf8').includes('calculator-guard.js'));
eq(filenames.length,500);
for(const name of filenames){
 const p=load(name);p.click();ok(!Object.values(p.outputs()).some(v=>/NaN|Infinity|∞/.test(v)),name+' default output');
 const original=Object.fromEntries(Object.values(p.elements).map(e=>[e.id,e.value]));
 for(const input of p.info.elements.filter(e=>e.numeric))for(const value of ['',0,-1,'12abc','1e309',1e12]){
  for(const [id,v] of Object.entries(original))p.set(id,v);p.set(input.id,value);p.click();edgeCases++;
  ok(!Object.values(p.outputs()).some(v=>/NaN|Infinity|∞/.test(v)),name+' '+input.id+'='+value);
 }
 // Required field errors must clear every dependent result, after a successful run.
 for(const rule of p.info.config.fields){
  if(rule.when&&original[rule.when[0]]!==rule.when[1])continue;
  for(const [id,v] of Object.entries(original))p.set(id,v);p.click();p.set(rule.id,'');p.click();eq(p.out(p.info.config.primary),'Invalid input',name+' empty '+rule.id);
  for(const id of p.info.config.outputs.filter(id=>id!==p.info.config.primary))eq(p.out(id),'—',name+' stale '+id);
 }
}
console.log(JSON.stringify({status:'passed',pages:filenames.length,edgeCases,referenceCases,assertions}));
