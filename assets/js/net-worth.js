
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var assets=n('cash')+n('investments')+n('property')+n('otherAssets'),liab=n('mortgage')+n('loans'),nw=assets-liab;set('mainResult',money(nw));set('assets',money(assets));set('liabilities',money(liab));set('ratio',liab>0?num(assets/liab,2)+'×':'No debt');}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());