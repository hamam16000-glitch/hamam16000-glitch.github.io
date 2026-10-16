const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const context={Intl,Date,console,document:{readyState:'loading',addEventListener(){}}};
context.window=context;vm.createContext(context);
vm.runInContext(fs.readFileSync(__dirname+'/../assets/js/dch-i18n-core.js','utf8'),context);
const translate=context.DCHI18N.translateFor;
assert.equal(translate('0 years, 1 months, 1 days','en'),'0 years, 1 month, 1 day');
assert.equal(translate('1 years, 0 months, 2 days','en'),'1 year, 0 months, 2 days');
assert.equal(translate('0 years, 1 months, 1 days','es'),'0 años, 1 mes y 1 día');
assert.equal(translate('Date of birth','zh-CN'),'出生日期');
assert.equal(translate('0 years, 1 months, 1 days','fil'),'0 taon, 1 buwan, 1 araw');
for(const locale of ['es','zh-CN','fil']){
 assert.ok(!translate('Last updated: October 15, 2026',locale).includes('Last updated'));
 assert.ok(!translate('Updated October 15, 2026',locale).startsWith('Updated'));
 assert.notEqual(translate('Back to home',locale),'Back to home');
 assert.notEqual(translate('All Calculators',locale),'All Calculators');
 assert.notEqual(translate('Language',locale),'Language');
}
assert.equal(translate(' 0 years, 1 months, 1 days ','en'),' 0 years, 1 month, 1 day ');
console.log(JSON.stringify({status:'passed',assertions:21}));
