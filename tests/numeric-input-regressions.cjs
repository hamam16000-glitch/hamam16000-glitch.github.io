const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(root+'/assets/js/v186-input-normalization.js','utf8').trim();
let assertions=0;
for(const locale of ['en-US','es-ES']){
 const document={readyState:'loading',addEventListener(){}};
 const context={document,Intl,DCHI18N:{getLocale:()=>locale}};context.window=context;
 vm.runInNewContext(source,context);const normalize=context.dchNormalizeNumericInput;
 const cases=[['6,5','6.5'],['12abc','12abc'],['1 2','1 2'],['1.2.3','1.2.3'],['1,23,4','1,23,4'],['1,234.56','1234.56'],['1.234,56','1234.56'],['١٢٣٫٤٥','123.45'],['۱۲۳٫۴۵','123.45'],['١٬٢٣٤٫٥','1234.5'],['−12.5','-12.5'],['1 234.5','1234.5'],['1e-5','1e-5'],['$12.50','12.50'],['12%','12']];
 for(const [value,expected] of cases){assert.equal(normalize(value),expected,locale+' '+value);assertions++;}
 assert.equal(normalize('1,234'),locale==='es-ES'?'1.234':'1234');assertions++;
}
// The actual bundles must contain the same input normalizer as the tested file.
for(const file of ['dch-bundle-2c78be74cf.js','dch-bundle-a4d560a449.js','dch-bundle-4c20f84277.js']){
 assert.ok(fs.readFileSync(root+'/assets/js/'+file,'utf8').includes(source),file);assertions++;
}
console.log(JSON.stringify({status:'passed',locales:2,assertions}));
