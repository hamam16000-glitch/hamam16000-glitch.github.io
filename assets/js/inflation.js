
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var factor=Math.pow(1+n('rate')/100,n('years')),future=n('amount')*factor,power=factor!==0?n('amount')/factor:0;set('mainResult',money(future));set('power',money(power));set('increase',num((factor-1)*100,1)+'%');set('lost',money(n('amount')-power));}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());