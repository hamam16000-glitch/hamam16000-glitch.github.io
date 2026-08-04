
(function(){
function n(id){return Number(document.getElementById(id).value)||0}
function money(x){return new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(isFinite(x)?x:0)}
function num(x,d){return (isFinite(x)?x:0).toLocaleString((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{maximumFractionDigits:d===undefined?2:d})}
function set(id,v){document.getElementById(id).textContent=v}
function calc(){var debts=[{b:n('b1'),r:n('r1')},{b:n('b2'),r:n('r2')},{b:n('b3'),r:n('r3')}].filter(function(d){return d.b>0}),payment=n('minimum')+n('extra'),months=0,interest=0,initial=debts.reduce(function(s,d){return s+d.b},0);var first='None';if(debts.length){var tmp=debts.slice().sort(function(a,b){return b.r-a.r});first=money(tmp[0].b)+' at '+num(tmp[0].r,2)+'% APR'}while(debts.length&&months<1200){months++;debts.forEach(function(d){var x=d.b*d.r/1200;d.b+=x;interest+=x});debts.sort(function(a,b){return b.r-a.r});var left=payment;for(var i=0;i<debts.length&&left>0;i++){var pay=Math.min(debts[i].b,left);debts[i].b-=pay;left-=pay}debts=debts.filter(function(d){return d.b>0.005});if(payment<=0)break}set('mainResult',months>=1200?'Over 100 years':months+' months');set('interest',money(interest));set('paid',money(initial+interest));set('first',first);}
document.getElementById('calculateButton').addEventListener('click',calc);calc();
}());