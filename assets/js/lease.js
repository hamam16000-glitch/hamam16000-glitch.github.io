
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var cap=Math.max(0,n('price')-n('down')+n('fees')),term=Math.max(1,n('term')),dep=(cap-n('residual'))/term,finance=(cap+n('residual'))*n('moneyFactor'),base=dep+finance,total=base*(1+n('tax')/100);set('mainResult',money(total));set('basePay',money(base));set('depreciation',money(dep));set('finance',money(finance));}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());