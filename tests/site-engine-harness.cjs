/* Small DOM adapter for testing calculation engines directly.
   This is deliberately not a browser, layout or third-party-library test. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
function attrs(text){const out={};for(const m of text.matchAll(/([\w-]+)\s*=\s*(["'])(.*?)\2/g))out[m[1]]=m[3];return out;}
function page(name){
 const html=fs.readFileSync(path.join(root,name),'utf8'),elements=[];
 for(const m of html.matchAll(/<([a-zA-Z][\w-]*)\b([^>]*\bid\s*=\s*["'][^"']+["'][^>]*)>/g)){
  const a=attrs(m[2]);if(!a.id)continue;let value=a.value||'';
  if(m[1].toLowerCase()==='select'){
   const end=html.indexOf('</select>',m.index),inside=html.slice(m.index+m[0].length,end),opts=[...inside.matchAll(/<option\b([^>]*)>([\s\S]*?)<\/option>/g)];
   const option=opts.find(o=>/\bselected\b/.test(o[1]))||opts[0];if(option)value=attrs(option[1]).value??option[2];
  }
  elements.push({id:a.id,value,tagName:m[1].toUpperCase(),numeric:a.type==='number',output:/\bdata-output\b/.test(m[2])});
 }
 const scripts=[];
 for(const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
  const a=attrs(m[1]);if(a.src){const filename=a.src.split('?')[0];if(filename.startsWith('assets/js/')&&!filename.includes('bundle')&&fs.existsSync(path.join(root,filename))){const code=fs.readFileSync(path.join(root,filename),'utf8');if(code.includes('window.DCHCalculator.wrap(')||filename==='assets/js/debt-strategy.js')scripts.push(code);}}
  else if(m[2].includes('window.DCHCalculator.wrap('))scripts.push(m[2]);
 }
 if(name==='vat.html')scripts.push(fs.readFileSync(path.join(root,'assets/js/vat.js'),'utf8'));
 if(!scripts.length)throw new Error('No calculator engine: '+name);
 const match=scripts.join('\n').match(/window\.DCHCalculator\.wrap\((?:calc|calculate|c),(\{"fields":[\s\S]*?"primary":"[^"]+"\})\)/);
 if(!match)throw new Error('No field configuration: '+name);
 return {name,elements,scripts,config:JSON.parse(match[1])};
}
function load(name,overrides={},locale='en-US'){
 const info=page(name),elements={};
 for(const id of Object.keys(overrides))if(!info.elements.some(e=>e.id===id))throw new Error(name+': unknown input '+id);
 for(const e of info.elements)elements[e.id]={...e,value:String(overrides[e.id]??e.value),textContent:'',handlers:{},dataset:{},style:{},addEventListener(t,fn){(this.handlers[t]??=[]).push(fn)},classList:{add(){},remove(){},toggle(){}},setAttribute(){},getAttribute(){return null}};
 const document={getElementById:id=>elements[id]||null,querySelector:s=>s.startsWith('#')?elements[s.slice(1)]:null,querySelectorAll:s=>s==='[data-output]'?Object.values(elements).filter(e=>e.output):s.includes('form-control')||s.includes('input')?Object.values(elements).filter(e=>['INPUT','SELECT'].includes(e.tagName)):[],addEventListener(t,fn){if(t==='DOMContentLoaded')fn()}};
 const sandbox={document,Intl,Date,Number,Math,String,URLSearchParams,console,...elements,DCHI18N:{getLocale:()=>locale}};sandbox.window=sandbox;
 sandbox.__click=()=>{const b=elements.calculateButton;if(b.onclick)b.onclick();for(const fn of b.handlers.click||[])fn();};
 const context=vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(root,'assets/js/calculator-guard.js'),'utf8'),context,{timeout:1000});
 for(const script of info.scripts)vm.runInContext(script,context,{timeout:1000});
 return {info,elements,set(id,value){if(!elements[id])throw new Error(id+' missing');elements[id].value=String(value)},click(){vm.runInContext('__click()',context,{timeout:1000})},out(id){return elements[id]?.textContent},outputs(){return Object.fromEntries(info.config.outputs.map(id=>[id,elements[id]?.textContent]))}};
}
module.exports={root,page,load};
