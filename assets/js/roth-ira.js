
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var bal=n('current'),r=n('rate')/100,years=Math.max(0,Math.floor(n('years'))),annual=n('annual');for(var i=0;i<years;i++){bal=bal*(1+r)+annual}var contrib=n('current')+annual*years;set('mainResult',money(bal));set('contrib',money(contrib));set('growth',money(bal-contrib));set('withdrawal',money(bal*0.04/12));}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());