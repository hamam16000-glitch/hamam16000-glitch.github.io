/* Release checks for real navigation targets and the review build's network policy. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');let assertions=0;
const sandbox={};sandbox.window=sandbox;vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root,'assets/js/v19010-calculators-data.js'),'utf8'),sandbox);
vm.runInContext(fs.readFileSync(path.join(root,'assets/js/dch-page-search-data.js'),'utf8'),sandbox);
assert.equal(sandbox.DCH_CALCULATORS.length,500);assertions++;
assert.equal(sandbox.DCH_PAGE_SEARCH_DATA.length,500);assertions++;
assert.equal(new Set(sandbox.DCH_PAGE_SEARCH_DATA.map(x=>x.href)).size,500);assertions++;
for(const item of sandbox.DCH_PAGE_SEARCH_DATA){assert.ok(fs.existsSync(path.join(root,item.href)),item.href);assertions++;}
let pages=0;
function visit(dir){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    if(entry.name.startsWith('.'))continue;
    const p=path.join(dir,entry.name);
    if(entry.isDirectory()){if(entry.name!=='tests')visit(p);continue;}
    if(!p.endsWith('.html')||/^google[0-9a-f]+\.html$/.test(entry.name))continue;
    const text=fs.readFileSync(p,'utf8');pages++;
    const sources=[...text.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(x=>x[1]);
    assert.ok(!sources.some(s=>/googlesyndication\.com|quge5\.com/.test(s)),p+' advertising loader');assertions++;
    assert.match(text,/<meta\b(?=[^>]*name="google-adsense-account")(?=[^>]*content="ca-pub-4791337719438849")[^>]*>/);assertions++;
    assert.equal([...text.matchAll(/<link\b[^>]*rel="canonical"/g)].length,1,p+' canonical');assertions++;
    for(const source of [...sources,...[...text.matchAll(/<link\b[^>]*href="([^"]+)"[^>]*rel="stylesheet"/g)].map(x=>x[1])]){
      if(/^(https?:|\/\/)/.test(source))continue;
      assert.ok(fs.existsSync(path.resolve(path.dirname(p),source.split('?')[0])),p+' '+source);assertions++;
    }
  }
}
visit(root);
console.log(JSON.stringify({status:'passed',pages,searchTargets:500,assertions}));
