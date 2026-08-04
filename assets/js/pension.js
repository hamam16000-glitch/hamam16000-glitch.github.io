
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var gross=n('salary')*n('years')*n('multiplier')/100,red=gross*n('reduction')/100,annual=Math.max(0,gross-red),replace=n('salary')>0?annual/n('salary')*100:0;set('mainResult',money(annual));set('monthly',money(annual/12));set('replace',num(replace,1)+'%');set('reductionOut',money(red));}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());