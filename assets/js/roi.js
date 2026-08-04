
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var invested=n('initial')+n('costs'),ending=n('final')+n('income'),profit=ending-invested,roi=invested>0?profit/invested*100:0,years=Math.max(0.01,n('years')),annual=invested>0&&ending>=0?(Math.pow(ending/invested,1/years)-1)*100:0;set('mainResult',num(roi,2)+'%');set('profit',money(profit));set('annualized',num(annual,2)+'%');set('ending',money(ending));}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());