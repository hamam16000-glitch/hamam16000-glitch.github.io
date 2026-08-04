
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var replacement=n('income')*n('years'),gross=replacement+n('debts')+n('future')+n('final'),offsets=n('savings')+n('existing'),need=Math.max(0,gross-offsets);set('mainResult',money(need));set('gross',money(gross));set('offsets',money(offsets));set('replacement',money(replacement));}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());