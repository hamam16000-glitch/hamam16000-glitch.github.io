
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var monthly=n('housing')+n('food')+n('transport')+n('other'),target=monthly*n('months'),gap=Math.max(0,target-n('current')),progress=target>0?Math.min(100,n('current')/target*100):100;set('mainResult',money(target));set('monthly',money(monthly));set('gap',money(gap));set('progress',num(progress,1)+'%');}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());