
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(x)}
function num(x,d){return x.toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var gross=n('salary')*n('years')*n('multiplier')/100,red=gross*n('reduction')/100,annual=Math.max(0,gross-red),replace=n('salary')>0?annual/n('salary')*100:0;set('mainResult',money(annual));set('monthly',money(annual/12));set('replace',num(replace,1)+'%');set('reductionOut',money(red));}
calc=window.DCHCalculator.wrap(calc,{"fields":[{"id":"salary","min":0.0},{"id":"years","min":0.0},{"id":"multiplier","min":0.0},{"id":"reduction","min":0.0,"max":100.0}],"outputs":["mainResult","monthly","replace","reductionOut"],"primary":"mainResult"});document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());