
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var commission=n('sales')*n('rate')/100,total=n('base')+commission+n('bonus'),variable=total>0?(commission+n('bonus'))/total*100:0;set('mainResult',money(total));set('commissionOut',money(commission));set('monthly',money(total/12));set('variableShare',num(variable,1)+'%');}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());