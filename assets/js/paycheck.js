
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(x)}
function num(x,d){return x.toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var gross=n('gross'),tax=gross*(n('federal')+n('state')+n('fica'))/100,net=Math.max(0,gross-tax-n('deductions')),rate=gross>0?(gross-net)/gross*100:0;set('mainResult',money(net));set('taxes',money(tax));set('annual',money(net*n('periods')));set('rateOut',num(rate,1)+'%');}
calc=window.DCHCalculator.wrap(calc,{"fields":[{"id":"gross","min":0.0},{"id":"federal","min":0.0,"max":100.0},{"id":"state","min":0.0,"max":100.0},{"id":"fica","min":0.0,"max":100.0},{"id":"deductions","min":0.0},{"id":"periods","min":1.0}],"outputs":["mainResult","taxes","annual","rateOut"],"primary":"mainResult"});document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());