
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(x)}
function num(x,d){return x.toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){if(n('rate')<=-100){set('mainResult','Enter an inflation rate above -100%');return;}var factor=Math.pow(1+n('rate')/100,n('years')),future=n('amount')*factor,power=factor!==0?n('amount')/factor:0;set('mainResult',money(future));set('power',money(power));set('increase',num((factor-1)*100,1)+'%');set('lost',money(n('amount')-power));}
calc=window.DCHCalculator.wrap(calc,{"fields":[{"id":"amount","min":0.0},{"id":"rate"},{"id":"years","min":0.0}],"outputs":["mainResult","power","increase","lost"],"primary":"mainResult"});document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());