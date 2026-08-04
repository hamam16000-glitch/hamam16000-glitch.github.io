
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var expenses=n('housing')+n('transport')+n('food')+n('debt')+n('other'),flow=n('income')-expenses,rate=n('income')>0?flow/n('income')*100:0;set('mainResult',money(flow));set('expenses',money(expenses));set('savingsRate',num(rate,1)+'%');set('annual',money(flow*12));}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());