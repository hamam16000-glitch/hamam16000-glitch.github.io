
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var before=n('property')*n('rate')/100+n('liability'),disc=before*n('discount')/100,annual=Math.max(0,before-disc);set('mainResult',money(annual));set('monthly',money(annual/12));set('before',money(before));set('discountOut',money(disc));}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());