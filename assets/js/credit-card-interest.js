const $=id=>document.getElementById(id);const n=id=>Number($(id).value)||0;const usd=v=>new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(v);const pct=v=>`${v.toFixed(2)}%`;function calc(){
 let b=n('balance'),r=n('apr')/1200,p=n('payment'),months=0,total=0,first=b*r;
 if(b<0||r<0||p<0){$('mainResult').textContent='Enter nonnegative balance, APR and payment';return;}
 if(b>0&&(p<=0||p<=first)){$('mainResult').textContent='Payment too low';return;}
 while(b>0.005&&months<1200){const i=b*r,actual=Math.min(p,b+i);total+=i;b=b+i-actual;months++;}
 if(b>0.005){$('mainResult').textContent='Payoff exceeds 100 years';return;}
 $('mainResult').textContent=months+' months';$('firstInterest').textContent=usd(first);$('totalInterest').textContent=usd(total);
}calc=window.DCHCalculator.wrap(calc,{"fields":[{"id":"balance","min":0},{"id":"apr","min":0},{"id":"payment","min":0}],"outputs":["mainResult","firstInterest","totalInterest"],"primary":"mainResult"});$('calculateButton').onclick=calc;calc();