
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(x)}
function num(x,d){return x.toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var current=n('current'),r=n('rate')/100,years=n('years'),annual=n('annual');if(current<0||annual<0||r<=-1||years<0||!Number.isSafeInteger(years)){set('mainResult','Enter valid amounts and whole nonnegative years');return;}var growth=Math.pow(1+r,years),bal=r===0?current+annual*years:current*growth+annual*Math.expm1(years*Math.log1p(r))/r,contrib=current+annual*years;set('mainResult',money(bal));set('contrib',money(contrib));set('growth',money(bal-contrib));set('withdrawal',money(bal*0.04/12));}
calc=window.DCHCalculator.wrap(calc,{"fields":[{"id":"current","min":0.0},{"id":"annual","min":0.0},{"id":"rate"},{"id":"years","min":0.0}],"outputs":["mainResult","contrib","growth","withdrawal"],"primary":"mainResult"});document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());