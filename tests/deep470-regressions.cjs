const assert=require('assert/strict'),fs=require('fs');const {load}=require('./site-engine-harness.cjs');let cases=0,assertions=0;
function check(file,inputs,expected){const p=load(file+'.html',inputs);p.click();for(const[k,v]of Object.entries(expected)){assert.equal(p.out(k),v,file+' '+k);assertions++;}cases++;return p;}
for(const name of ['accounting-software-roi','payroll-software-roi','time-tracking-roi']){
 check(name,{hours:10,rate:30,avoided:0,monthly:100,setup:600},{mainResult:'100%',o4:'3 months'});
 check(name,{hours:10,rate:30,avoided:0,monthly:300,setup:600},{o4:'No positive net monthly benefit'});
 check(name,{hours:10,rate:30,avoided:0,monthly:400,setup:600},{o4:'No positive net monthly benefit'});
 check(name,{hours:10,rate:30,avoided:0,monthly:100,setup:0},{o4:'0 months'});
}
check('equipment-financing',{equipmentPrice:12000,downPayment:0,annualRate:0,termYears:2,residualValue:2400},{mainResult:'$400.00',totalOut:'$12,000.00',interestOut:'$0.00'});
check('equipment-financing',{equipmentPrice:12000,downPayment:0,annualRate:'1e-20',termYears:2,residualValue:2400},{mainResult:'$400.00',totalOut:'$12,000.00'});
check('equipment-financing',{equipmentPrice:12000,downPayment:0,annualRate:12,termYears:2,residualValue:12000},{mainResult:'$120.00',interestOut:'$2,880.00',totalOut:'$14,880.00'});
check('equipment-financing',{equipmentPrice:12000,downPayment:0,annualRate:0,termYears:2,residualValue:24000},{mainResult:'Enter a residual that permits a nonnegative payment',totalOut:'—'});
for(const growthRate of [0,'1e-20'])check('whole-life-insurance-cost',{coverage:100000,ratePerThousand:10,annualFee:0,years:10,cashShare:100,growthRate},{cashOut:'$10,000.00',totalOut:'$10,000.00'});
check('whole-life-insurance-cost',{years:1.5},{mainResult:'Invalid input',cashOut:'—'});
check('whole-life-insurance-cost',{coverage:100000,ratePerThousand:10,annualFee:0,years:2,cashShare:100,growthRate:10},{cashOut:'$2,100.00'});
check('churn-rate',{startingCustomers:100,lostCustomers:19,periodMonths:2},{mainResult:'10.00%',retentionOut:'81.00%',lifetimeOut:'10.0 months'});
const tiny=check('churn-rate',{startingCustomers:100,lostCustomers:'1e-20',periodMonths:12},{});assert.ok(tiny.out('mainResult').includes('E-'));assertions++;
check('net-revenue-retention',{startingRevenue:10000,expansionRevenue:2000,contractionRevenue:500,churnedRevenue:1000,newRevenue:3000},{mainResult:'105%',cohortOut:'$10,500.00',endingOut:'$13,500.00'});
check('net-revenue-retention',{startingRevenue:10000,expansionRevenue:0,contractionRevenue:7000,churnedRevenue:8000,newRevenue:3000},{mainResult:'Enter losses no greater than the existing cohort plus expansion',endingOut:'—'});
check('saas-mrr',{customers:1,arpu:100,newMrr:50,expansionMrr:0,churnedMrr:120},{mainResult:'$30.00',netNewOut:'-$70.00'});
check('saas-mrr',{customers:1,arpu:100,newMrr:0,expansionMrr:0,churnedMrr:120},{mainResult:'Enter churn no greater than the recurring revenue available',netNewOut:'—'});
for(const file of ['facebook-ads-roi','tiktok-ads-roi'])check(file,{ctrRate:101},{mainResult:'Invalid input',clicksOut:'—'});
for(const file of ['google-ads-roi','facebook-ads-roi','tiktok-ads-roi'])check(file,{conversionRate:101},{mainResult:'Invalid input',conversionsOut:'—'});
check('stripe-fee',{transactionAmount:100,transactions:10,rate:0,fixedFee:0,refundedTransactions:2,refundFee:1,disputes:0,disputeFee:0},{mainResult:'$2.00',netOut:'$998.00'});
check('confidence-interval-calculator',{sampleMean:50,sampleSd:10,sampleSize:100,criticalValue:1.96},{mainResult:'1.96',lowerOut:'48.04',upperOut:'51.96'});
// Blog examples reference the actual current engines and stated timing.
const math=require('../assets/js/dch-reviewed-calculators.js');
const base={principal:'1000',contribution:'100',rate:'6',years:'1',months:'0',currency:'USD'};
for(const [timing,want]of [['end',2295.227425916],[ 'beginning',2301.395207102]]){
 const actual=math['compound-interest']({...base,timing}).balance;assert.ok(Math.abs(actual-want)<0.01,timing+' '+actual);assertions++;cases++;
}
const mortgage=math.mortgage({principal:'320000',rate:'6.5',years:'30',currency:'USD'});
assert.equal(mortgage.payment.toFixed(2),'2022.62');assert.equal(Math.round(mortgage.total),728142);assert.equal(Math.round(mortgage.interest),408142);assertions+=3;cases++;
const compound=math['compound-interest']({principal:'10000',contribution:'300',rate:'6',years:'10',months:'0',timing:'end',currency:'USD'});
assert.equal(Math.round(compound.balance),67358);assert.equal(Math.round(compound.growth),21358);assertions+=2;cases++;
check('401k',{currentBalance:25000,salary:80000,employeeRate:8,matchRate:50,matchLimit:6,years:25,returnRate:7},{futureBalance:'$737,188.03',totalContributions:'$245,000.00'});
// Reconcile payback against a separate month-by-month cash-flow sequence.
let seed=7331;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
for(let i=0;i<120;i++){
 const monthly=1+Math.floor(random()*200),net=10+Math.floor(random()*300),setup=net*(1+Math.floor(random()*24)),benefit=monthly+net;
 let cash=-setup,month=0;while(cash<0){cash+=net;month++;}
 const p=load('accounting-software-roi.html',{hours:benefit,rate:1,avoided:0,monthly,setup});p.click();
 assert.equal(p.out('o4'),month+' month'+(month===1?'':'s'));assertions++;cases++;
}
const report={status:'passed',referenceCases:cases,assertions};fs.writeFileSync(__dirname+'/deep470-validation.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
