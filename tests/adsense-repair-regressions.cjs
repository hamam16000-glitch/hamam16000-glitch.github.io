/* Reproductions of observed defects, with independently calculated expectations. */
const assert=require('assert/strict');
const {load}=require('./site-engine-harness.cjs');
let cases=0, assertions=0;
function check(name,inputs,expected){
  const p=load(name+'.html',inputs);p.click();
  for(const [key,value] of Object.entries(expected)){assert.equal(p.out(key),value,name+' '+key);assertions++;}
  cases++;return p;
}
check('paycheck',{gross:1000,federal:80,state:40,fica:0,deductions:0,periods:26},{mainResult:'Enter combined percentages of 100% or less',taxes:'—',annual:'—',rateOut:'—'});
check('paycheck',{gross:1000,federal:50,state:0,fica:0,deductions:600,periods:26},{mainResult:'Enter total deductions no greater than gross pay',taxes:'—',annual:'—'});
check('paycheck',{gross:3000,federal:12,state:5,fica:7.65,deductions:250,periods:26},{mainResult:'$2,010.50',taxes:'$739.50',annual:'$52,273.00'});
check('paycheck',{gross:1000,federal:50,state:0,fica:0,deductions:500,periods:24},{mainResult:'$0.00',annual:'$0.00',rateOut:'100%'});
check('paycheck',{periods:2.5},{mainResult:'Invalid input',annual:'—'});
check('debt-to-income',{income:5000,housing:-1000,otherDebt:0},{mainResult:'Invalid input',frontDti:'—',remainingIncome:'—'});
check('debt-to-income',{income:8000,housing:2200,otherDebt:700},{mainResult:'36.25%',frontDti:'27.50%',remainingIncome:'$5,100.00'});
check('debt-to-income',{income:5000,housing:1000,otherDebt:-1},{mainResult:'Invalid input',remainingIncome:'—'});
check('conversion-rate',{visitors:100,conversions:3,targetConversions:1},{targetVisitorsOut:'34'});
check('conversion-rate',{visitors:25000,conversions:750,targetConversions:1000},{targetVisitorsOut:'33,334'});
check('conversion-rate',{visitors:100,conversions:4,targetConversions:3},{targetVisitorsOut:'75'});
check('conversion-rate',{visitors:100,conversions:0,targetConversions:0},{targetVisitorsOut:'0'});
check('conversion-rate',{visitors:100,conversions:0,targetConversions:1},{targetVisitorsOut:'—'});
check('conversion-rate',{visitors:100.5,conversions:3,targetConversions:1},{mainResult:'Invalid input',targetVisitorsOut:'—'});
// Exact integer ratio: avoid rounding an exact threshold up due to binary division.
check('conversion-rate',{visitors:100,conversions:7,targetConversions:7},{targetVisitorsOut:'100'});
check('cpm',{adSpend:1,impressions:1000000},{mainResult:'$0.001',costPerImpressionOut:'$0.000001',costPerMillionOut:'$1.00'});
check('cpm',{adSpend:5000,impressions:750000},{mainResult:'$6.67',costPerImpressionOut:'$0.006667',costPerMillionOut:'$6,666.67'});
console.log(JSON.stringify({status:'passed',cases,assertions}));
