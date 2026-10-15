
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(x)}
function num(x,d){return x.toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){
var invested=n('initial')+n('costs'),ending=n('final')+n('income'),years=n('years');if(invested<=0||years<=0){set('mainResult','Enter a positive invested amount and holding period');return;}
var profit=ending-invested,roi=profit/invested*100;set('mainResult',num(roi,2)+'%');set('profit',money(profit));set('annualized',ending<0?'Not defined for negative ending value':num((Math.pow(ending/invested,1/years)-1)*100,2)+'%');set('ending',money(ending));
}
calc=window.DCHCalculator.wrap(calc,{"fields":[{"id":"initial","min":0.0},{"id":"final"},{"id":"income"},{"id":"costs","min":0.0},{"id":"years","min":0.01}],"outputs":["mainResult","profit","annualized","ending"],"primary":"mainResult"});document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());