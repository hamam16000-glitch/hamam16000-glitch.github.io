
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var gross=n('gross'),tax=gross*(n('federal')+n('state')+n('fica'))/100,net=Math.max(0,gross-tax-n('deductions')),rate=gross>0?(gross-net)/gross*100:0;set('mainResult',money(net));set('taxes',money(tax));set('annual',money(net*n('periods')));set('rateOut',num(rate,1)+'%');}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());