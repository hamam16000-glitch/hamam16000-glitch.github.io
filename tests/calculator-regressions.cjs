const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
let assertions = 0;
function load(name, values, locale = 'en-US') {
  const elements = {};
  function element(id) {
    return elements[id] ||= {value:String(values[id] ?? ''), textContent:'', onclick:null, addEventListener(type, fn){if(type === 'click') this.onclick = fn;}};
  }
  const document = {getElementById:element};
  const window = {DCHI18N:{getLocale:()=>locale}};
  const context=vm.createContext({document, window, Intl, Date, Number, Math, String});
  vm.runInContext(fs.readFileSync(path.join(root,'assets/js/calculator-guard.js'),'utf8'),context,{timeout:1000});
  if(name==='debt-snowball'||name==='debt-avalanche')vm.runInContext(fs.readFileSync(path.join(root,'assets/js/debt-strategy.js'),'utf8'),context,{timeout:1000});
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js', name+'.js'),'utf8'),context,{timeout:1000});
  return {elements, set(id,value){element(id).value=String(value);}, click(){element('calculateButton').onclick();}, out(id){return element(id).textContent;}};
}
function eq(actual, expected) { assertions++; assert.equal(actual, expected); }
function ok(value) { assertions++; assert.ok(value); }
for (const [start,end,expected] of [
  ['2026-01-31','2026-03-01','0 years, 1 months, 1 days'],
  ['2024-02-29','2025-02-28','1 years, 0 months, 0 days'],
  ['2025-12-31','2026-02-28','0 years, 2 months, 0 days'],
  ['2026-02-28','2026-03-31','0 years, 1 months, 3 days'],
  ['2000-01-01','2026-01-01','26 years, 0 months, 0 days'],
  ['2026-03-01','2026-03-01','0 years, 0 months, 0 days'],
  ['2026-03-02','2026-03-01','Invalid dates'],
  ['2026-02-30','2026-03-01','Invalid dates'],
]) {
  const page=load('age',{birth:start,today:end});page.set('today',end);page.click();eq(page.out('main'),expected);
}
const age=load('age',{birth:'2026-01-31'});
for(let year=2023;year<=2026;year++)for(let month=1;month<=12;month++)for(const day of [1,15,28,31]){
  const end=new Date(Date.UTC(year,month-1,day));
  const start=new Date(end.getTime()-400*86400000);
  age.set('birth',start.toISOString().slice(0,10));age.set('today',end.toISOString().slice(0,10));age.click();
  const fields=age.out('main').match(/^(\d+) years, (\d+) months, (\d+) days$/);
  ok(fields && Number(fields[2])<=11 && Number(fields[3])<=31);
}
for(const locale of ['en-US','es-ES']){
  const page=load('body-fat',{height:70,neck:15,waist:36,hip:40,weightHidden:180,sex:'male'},locale);
  eq(page.out('mainResult'),locale==='en-US'?'21.25%':'21,25%');
  eq(page.out('fatMass'),locale==='en-US'?'38.3 lb':'38,3 lb');
  page.set('neck',40);page.set('waist',30);page.click();
  ok(!page.out('mainResult').includes('NaN'));eq(page.out('fatMass'),'—');eq(page.out('category'),'—');
  page.set('height','');page.click();ok(page.out('mainResult').includes('positive'));
}
const mortgage=load('mortgage',{amount:100000,rate:0,years:10});
eq(mortgage.out('main'),'$833.33');eq(mortgage.out('interest'),'$0.00');
mortgage.set('amount',300000);mortgage.set('rate',6.5);mortgage.set('years',30);mortgage.click();eq(mortgage.out('main'),'$1,896.20');
for(const [id,value] of [['rate',-1],['rate',''],['amount','Infinity']]){
  mortgage.set(id,value);mortgage.click();eq(mortgage.out('main'),'Invalid input');eq(mortgage.out('total'),'—');eq(mortgage.out('interest'),'—');
}
const bmi=load('bmi',{weight:70,height:175});eq(bmi.out('main'),'22.9');eq(bmi.out('category'),'Healthy range');
bmi.set('height',0);bmi.click();eq(bmi.out('main'),'Invalid input');eq(bmi.out('category'),'—');
bmi.set('height',175);bmi.set('weight',-1);bmi.click();eq(bmi.out('main'),'Invalid input');
const currency=load('currency-converter',{amount:200,rate:1.25});eq(currency.out('main'),'250.00');
currency.set('amount',0);currency.click();eq(currency.out('main'),'0.00');
currency.set('rate',0);currency.click();ok(currency.out('main').includes('positive'));
const amort=load('amortization',{principal:12000,rate:0,years:2,elapsed:1});eq(amort.out('mainResult'),'$500.00');eq(amort.out('remaining'),'$6,000.00');eq(amort.out('totalInterest'),'$0.00');
amort.set('elapsed',3);amort.click();eq(amort.out('remaining'),'$0.00');amort.set('years',0);amort.click();eq(amort.out('remaining'),'—');
const car=load('car-insurance',{base:150,vehicles:1,drivers:1,coverage:1,discount:10});eq(car.out('mainResult'),'$135.00');eq(car.out('annual'),'$1,620.00');car.set('discount',110);car.click();eq(car.out('annual'),'—');
const home=load('home-insurance',{dwelling:400000,rate:0.55,extras:250,discount:10});eq(home.out('mainResult'),'$2,205.00');eq(home.out('monthly'),'$183.75');home.set('discount',-1);home.click();eq(home.out('monthly'),'—');
const lease=load('lease',{price:40000,down:3000,residual:24000,moneyFactor:0.002,term:36,fees:1000,tax:7});eq(lease.out('mainResult'),'$548.79');lease.set('term',0);lease.click();eq(lease.out('finance'),'—');
const withdrawal=load('retirement-withdrawal',{portfolio:1000000,rate:4,tax:15});eq(withdrawal.out('mainResult'),'$40,000.00');eq(withdrawal.out('afterTax'),'$34,000.00');withdrawal.set('tax',110);withdrawal.click();eq(withdrawal.out('afterTax'),'—');
const pregnancy=load('pregnancy-due-date',{lmp:'2026-01-01'});eq(pregnancy.out('mainResult'),'October 8, 2026');eq(pregnancy.out('conception'),'January 15, 2026');pregnancy.set('lmp','');pregnancy.click();eq(pregnancy.out('conception'),'—');
for(const method of ['snowball','avalanche']){
  const values={b1:1000,r1:0,min1:50,b2:0,r2:0,min2:0,b3:0,r3:0,min3:0,extra:50};
  const debt=load('debt-'+method,values);eq(debt.out('mainResult'),'10 months');eq(debt.out('interest'),'$0.00');eq(debt.out('paid'),'$1,000.00');
  debt.set('min1',0);debt.set('extra',0);debt.click();ok(debt.out('mainResult').includes('positive'));eq(debt.out('paid'),'—');
  const protectedMinimums=load('debt-'+method,{b1:1000,r1:0,min1:100,b2:1000,r2:120,min2:100,b3:0,r3:0,min3:0,extra:0});eq(protectedMinimums.out('mainResult'),'18 months');
  const incomplete=load('debt-'+method,{b1:1000,r1:12,min1:1,b2:0,r2:0,min2:0,b3:0,r3:0,min3:0,extra:0});eq(incomplete.out('mainResult'),'Not repaid within 100 years');eq(incomplete.out('paid'),'$1,200.00');
}
for(const [method,target] of [['snowball','$500.00 at 0.00% APR'],['avalanche','$1,000.00 at 12.00% APR']]){
  const debt=load('debt-'+method,{b1:500,r1:0,min1:50,b2:1000,r2:12,min2:50,b3:0,r3:0,min3:0,extra:100});eq(debt.out('first'),target);
}
console.log(JSON.stringify({status:'passed',assertions}));
