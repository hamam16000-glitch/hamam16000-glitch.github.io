const $=id=>document.getElementById(id);const n=id=>Number($(id).value)||0;const usd=v=>new Intl.NumberFormat((window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US'),{style:'currency',currency:'USD',currencyDisplay:'narrowSymbol',useGrouping:true,maximumFractionDigits:2}).format(v);const pct=v=>`${v.toFixed(2)}%`;function calc(){
const inc=n('income')/12,deb=n('debts'),down=n('down'),r=n('rate')/1200,m=n('years')*12,tax=n('tax')/1200,ins=n('insurance')/12;
const target=Math.max(0,inc*.36-deb),available=target-ins,factor=1/window.DCHCalculator.annuityFactor(r,m);
const price=available<0?0:tax>0&&available<down*tax?available/tax:(available+down*factor)/(factor+tax);
$('mainResult').textContent=available<0?'Insurance exceeds the housing budget':usd(price);
$('monthlyHousing').textContent=usd(target);$('loanAmount').textContent=usd(Math.max(0,price-down));
}
calc=window.DCHCalculator.wrap(calc,{"fields":[{"id":"income"},{"id":"debts"},{"id":"down"},{"id":"rate"},{"id":"years"},{"id":"tax"},{"id":"insurance"}],"outputs":["mainResult","monthlyHousing","loanAmount"],"primary":"mainResult"});$('calculateButton').onclick=calc;calc();