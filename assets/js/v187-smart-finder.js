(function(){
'use strict';
var FAV_KEY='dch-favorites-v1',RECENT_KEY='dch-recents-v1';
function byId(id){return document.getElementById(id)}
function trim(s){return String(s||'').replace(/^\s+|\s+$/g,'')}
function lower(s){return trim(s).toLowerCase().replace(/[’']/g,'').replace(/&/g,' and ').replace(/[^a-z0-9%°$]+/g,' ').replace(/\s+/g,' ')}
function read(key){try{var raw=localStorage.getItem(key);var x=raw?JSON.parse(raw):[];return Object.prototype.toString.call(x)==='[object Array]'?x:[]}catch(e){return[]}}
function write(key,val){try{localStorage.setItem(key,JSON.stringify(val))}catch(e){}}
function esc(s){return String(s||'').replace(/[&<>\"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]})}
function hasClass(el,n){return el&&(' '+el.className+' ').indexOf(' '+n+' ')>-1}
function addClass(el,n){if(el&&!hasClass(el,n))el.className=trim(el.className+' '+n)}
function removeClass(el,n){if(el)el.className=trim((' '+el.className+' ').replace(' '+n+' ',' '))}
function closestAttr(el,attr){while(el&&el!==document){if(el.getAttribute&&el.getAttribute(attr)!==null)return el;el=el.parentNode}return null}
function fileName(){var p=String(location.pathname||'').split('/').pop();try{p=decodeURIComponent(p)}catch(e){}return p||'index.html'}
function parseQuery(name){var q=String(location.search||'').replace(/^\?/,'').split('&');for(var i=0;i<q.length;i++){var a=q[i].split('=');if(decodeURIComponent(a[0]||'')===name)return decodeURIComponent((a.slice(1).join('=')||'').replace(/\+/g,' '))}return''}

var items=[],byHref={};
function collectItems(){
 var cards=document.querySelectorAll?document.querySelectorAll('[data-card]'):[];
 for(var i=0;i<cards.length;i++){
  var a=cards[i],href=a.getAttribute('href')||'',h=a.getElementsByTagName('h3')[0],p=a.getElementsByTagName('p')[0],icon=null;
  var spans=a.getElementsByTagName('div'); if(spans.length)icon=spans[0];
  var item={href:href,title:h?h.textContent||h.innerText:'Calculator',description:p?p.textContent||p.innerText:'',category:a.getAttribute('data-category')||'',icon:icon?(icon.textContent||icon.innerText):'🧮',search:a.getAttribute('data-search')||''};
  if(href){items.push(item);byHref[href]=item}
 }
}
function currentItem(){
 var href=fileName(),h=document.getElementsByTagName('h1')[0],ey=document.querySelector?document.querySelector('.eyebrow,.category-label,.calc-category'):null;
 return {href:href,title:h?trim(h.textContent||h.innerText):trim(document.title.replace(/\s*[|—-].*$/,'')),description:'',category:ey?trim(ey.textContent||ey.innerText):'calculator',icon:'🧮'};
}
function saveState(href){var a=read(FAV_KEY);for(var i=0;i<a.length;i++)if(a[i]&&a[i].href===href)return true;return false}
function toggleSave(item){var a=read(FAV_KEY),next=[],found=false;for(var i=0;i<a.length;i++){if(a[i]&&a[i].href===item.href)found=true;else next.push(a[i])}if(!found)next.unshift({href:item.href,title:item.title||''});write(FAV_KEY,next.slice(0,30));return !found}
function addRecent(item){var a=read(RECENT_KEY),next=[{href:item.href,title:item.title||''}];for(var i=0;i<a.length;i++)if(a[i]&&a[i].href!==item.href)next.push(a[i]);write(RECENT_KEY,next.slice(0,8))}
function syncButton(btn,item){var yes=saveState(item.href);btn.innerHTML='<span class="dch-star" aria-hidden="true">'+(yes?'★':'☆')+'</span><span>'+(yes?'Saved ✓':'Save calculator')+'</span>';btn.setAttribute('aria-pressed',yes?'true':'false');btn.setAttribute('aria-label',yes?'Remove this calculator from favorites':'Save this calculator to favorites');if(yes)addClass(btn,'is-saved');else removeClass(btn,'is-saved')}
function calculatorSetup(){
 if(fileName()==='index.html'||byId('all-calculators'))return;
 var wrap=document.querySelector?document.querySelector('.calc-wrap'):null;if(!wrap)return;
 var item=currentItem();addRecent(item);
 var btn=wrap.querySelector?wrap.querySelector('.dch-favorite-btn'):null;
 if(!btn){btn=document.createElement('button');btn.type='button';btn.className='dch-favorite-btn';var anchor=wrap.querySelector('.last-updated')||wrap.querySelector('.article-meta')||wrap.getElementsByTagName('h1')[0];if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(btn,anchor.nextSibling);else wrap.insertBefore(btn,wrap.firstChild)}
 syncButton(btn,item);
 btn.onclick=function(){toggleSave(item);syncButton(btn,item)};
}
function itemForSaved(x){return x&&x.href?(byHref[x.href]||{href:x.href,title:x.title||x.href,description:'',category:'calculator',icon:'🧮'}):null}
function personalCard(item){return '<a class="dch-personal-card" href="'+esc(item.href)+'"><span class="dch-personal-card-icon" aria-hidden="true">'+esc(item.icon||'🧮')+'</span><span><strong>'+esc(item.title)+'</strong><small>'+esc(item.category||'calculator')+'</small></span></a>'}
function homePersonal(){
 var sec=byId('dchPersonalTools'),fg=byId('dchFavoritesGrid'),rg=byId('dchRecentsGrid');if(!sec||!fg||!rg)return;
 var favRaw=read(FAV_KEY),recRaw=read(RECENT_KEY),fav=[],rec=[],i,it;
 for(i=0;i<favRaw.length&&fav.length<4;i++){it=itemForSaved(favRaw[i]);if(it)fav.push(it)}
 for(i=0;i<recRaw.length&&rec.length<4;i++){it=itemForSaved(recRaw[i]);if(it)rec.push(it)}
 if(!fav.length&&!rec.length){sec.hidden=true;return}sec.hidden=false;
 fg.innerHTML=fav.length?mapCards(fav):'<p class="dch-smart-empty">Save any calculator with the ☆ button.</p>';
 rg.innerHTML=rec.length?mapCards(rec):'<p class="dch-smart-empty">Your recently opened calculators appear here.</p>';
 var clear=byId('dchClearRecent');if(clear)clear.onclick=function(){write(RECENT_KEY,[]);homePersonal()};
}
function mapCards(a){var s='';for(var i=0;i<a.length;i++)s+=personalCard(a[i]);return s}
function tokens(q){var a=lower(q).split(' '),o=[];for(var i=0;i<a.length;i++)if(a[i]&&a[i].length>1)o.push(a[i]);return o}
var direct=[
 [/mortgage|house payment|home loan/i,'mortgage.html'],[/auto loan|car payment|vehicle loan/i,'auto-loan.html'],[/income tax|federal tax/i,'income-tax.html'],[/\bbmi\b|body mass/i,'bmi.html'],[/\btip\b|gratuity/i,'tip.html'],[/compound interest|investment growth/i,'compound-interest.html'],[/1099.*w.?2|w.?2.*1099/i,'1099-vs-w2.html'],[/kg.*(lb|pound)|kilogram.*pound/i,'kilograms-to-pounds-calculator.html'],[/fahrenheit.*celsius|f.*to.*c/i,'fahrenheit-to-celsius-calculator.html'],[/celsius.*fahrenheit|c.*to.*f/i,'celsius-to-fahrenheit-calculator.html']
];
function scores(q){var nq=lower(q),ts=tokens(q),out=[],forced='';for(var d=0;d<direct.length;d++)if(direct[d][0].test(q)){forced=direct[d][1];break}
 for(var i=0;i<items.length;i++){var it=items[i],title=lower(it.title),hay=lower(it.search+' '+it.title+' '+it.description+' '+it.category),s=0;if(forced===it.href)s+=500;if(title===nq)s+=200;if(nq&&title.indexOf(nq)>-1)s+=100;if(nq&&hay.indexOf(nq)>-1)s+=50;for(var t=0;t<ts.length;t++){if(title.indexOf(ts[t])>-1)s+=20;else if(hay.indexOf(ts[t])>-1)s+=7}if(s>0)out.push({item:it,score:s})}
 out.sort(function(a,b){return b.score-a.score});return out.slice(0,8)
}
function finderSetup(){
 var form=byId('calculatorSearchForm'),input=byId('searchInput'),panel=byId('dchSmartResults'),status=byId('dchSmartStatus');if(!form||!input||!panel)return;
 var current=[];
 function hide(){panel.hidden=true}
 function render(){var q=trim(input.value);if(!q){hide();if(status)status.innerHTML='Describe a calculation in plain English or search by name.';return}current=scores(q);if(status)status.innerHTML='Best matches from all 1000 calculators';if(!current.length){panel.innerHTML='<div class="dch-smart-empty">No close match yet. Try a shorter calculator name.</div>';panel.hidden=false;return}var html='';for(var i=0;i<current.length&&i<6;i++){var it=current[i].item;html+='<a class="dch-smart-result'+(i===0?' is-active':'')+'" data-smart-index="'+i+'" href="'+esc(it.href)+'"><span class="dch-smart-result-icon" aria-hidden="true">'+esc(it.icon||'🧮')+'</span><span class="dch-smart-result-copy"><strong>'+esc(it.title)+'</strong><small>'+esc(it.description)+'</small></span>'+(i===0?'<span class="dch-smart-result-badge">Best match</span>':'<span class="dch-smart-result-arrow" aria-hidden="true">→</span>')+'</a>'}panel.innerHTML=html;panel.hidden=false}
 function go(){var r=scores(input.value);if(r.length){addRecent(r[0].item);location.href=r[0].item.href}else{var lib=byId('all-calculators');if(lib&&lib.scrollIntoView)lib.scrollIntoView()}}
 input.oninput=render;input.onfocus=function(){if(trim(input.value))render()};form.onsubmit=function(e){if(e&&e.preventDefault)e.preventDefault();go();return false};
 panel.onclick=function(e){e=e||window.event;var a=closestAttr(e.target||e.srcElement,'data-smart-index');if(a){var n=parseInt(a.getAttribute('data-smart-index'),10);if(current[n])addRecent(current[n].item)}};
 var chips=document.querySelectorAll?document.querySelectorAll('[data-smart-query]'):[];for(var i=0;i<chips.length;i++)chips[i].onclick=function(){input.value=this.getAttribute('data-smart-query')||'';input.focus();render()};
 var q=parseQuery('q');if(q){input.value=q;render()}
}
function restore(){if(document.documentElement)document.documentElement.style.visibility='visible';if(document.body){document.body.style.visibility='visible';document.body.style.opacity='1'}}
function init(){restore();collectItems();calculatorSetup();homePersonal();finderSetup()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,false);else init();
if(window.addEventListener){window.addEventListener('pageshow',function(){restore();homePersonal()},false)}
})();
