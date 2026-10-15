
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(x)}
function num(x,d){return x.toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var margin=n('price')-n('variable');if(margin<=0){set('mainResult','No break-even point');set('revenue','—');set('margin',money(margin));set('ratio','—');return}var units=Math.ceil(n('fixed')/margin),ratio=n('price')>0?margin/n('price')*100:0;set('mainResult',num(units,0)+' units');set('revenue',money(units*n('price')));set('margin',money(margin));set('ratio',num(ratio,1)+'%');}
calc=window.DCHCalculator.wrap(calc,{"fields":[{"id":"fixed","min":0.0},{"id":"price","min":0.0},{"id":"variable","min":0.0}],"outputs":["mainResult","revenue","margin","ratio"],"primary":"mainResult"});document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());