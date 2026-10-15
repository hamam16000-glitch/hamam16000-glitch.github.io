
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(x)}
function num(x,d){return x.toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var before=n('property')*n('rate')/100+n('liability'),disc=before*n('discount')/100,annual=Math.max(0,before-disc);set('mainResult',money(annual));set('monthly',money(annual/12));set('before',money(before));set('discountOut',money(disc));}
calc=window.DCHCalculator.wrap(calc,{"fields":[{"id":"property","min":0.0},{"id":"rate","min":0.0},{"id":"liability","min":0.0},{"id":"discount","min":0.0,"max":100.0}],"outputs":["mainResult","monthly","before","discountOut"],"primary":"mainResult"});document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());