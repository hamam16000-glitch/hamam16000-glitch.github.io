
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var regular=n('rate')*n('regular'),ot=n('rate')*n('overtime')*n('multiplier'),weekly=regular+ot;set('mainResult',money(weekly));set('regularPay',money(regular));set('overtimePay',money(ot));set('annual',money(weekly*n('weeks')));}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());