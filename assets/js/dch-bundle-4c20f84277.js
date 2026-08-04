/* assets/js/v11-enhancements.js */
(function(){
  function resultText(){
    var title=(document.querySelector('h1')||{}).textContent||'Calculator result';
    var result=document.querySelector('.result');
    if(!result) return title;
    return title+'\n'+result.innerText.replace(/\n{3,}/g,'\n\n').trim()+'\n'+location.href;
  }
  function status(message){var el=document.querySelector('.result-action-status');if(el){el.textContent=message;setTimeout(function(){if(el.textContent===message)el.textContent='';},2400)}}
  document.addEventListener('click',async function(e){
    var copy=e.target.closest('.copy-result');
    if(copy){try{await navigator.clipboard.writeText(resultText());status('Result copied.')}catch(_){var t=document.createElement('textarea');t.value=resultText();document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();status('Result copied.')}return;}
    var share=e.target.closest('.share-result');
    if(share){
      var data={title:document.title,text:resultText(),url:location.href};
      async function fallbackShare(){
        try{
          if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(resultText())}
          else{var t=document.createElement('textarea');t.value=resultText();t.setAttribute('readonly','');t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
          status(location.protocol==='file:'?'Result copied — native sharing works after HTTPS upload.':'Sharing is unavailable, so the result was copied.');
        }catch(_){status('Sharing is unavailable in this browser.');}
      }
      var nativeShare=typeof navigator.share==='function'&&window.isSecureContext&&location.protocol!=='file:';
      if(nativeShare){try{await navigator.share(data)}catch(err){if(!err||err.name!=='AbortError')await fallbackShare();}}
      else{await fallbackShare();}
      return;
    }
    if(e.target.closest('.print-result')){window.print();}
  });
})();

/* assets/js/v143-theme.js */
(function(){
  'use strict';
  var KEY='dch-theme-v143';
  function apply(theme){
    var dark=theme==='dark';
    document.documentElement.style.colorScheme=dark?'dark':'only light';
    document.body.classList.toggle('dch-dark',dark);
    document.body.classList.toggle('light',!dark);
    var btn=document.getElementById('themeToggle');
    if(btn){
      btn.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
      btn.title=btn.getAttribute('aria-label');
    }
    var meta=document.querySelector('meta[name="theme-color"]');
    if(meta) meta.content=dark?'#101916':'#f6f8f7';
  }
  function init(){
    var saved='light';
    try{saved=localStorage.getItem(KEY)||'light'}catch(e){}
    apply(saved);
    var btn=document.getElementById('themeToggle');
    if(btn&&!btn.dataset.v143Bound){
      btn.dataset.v143Bound='1';
      btn.addEventListener('click',function(){
        var next=document.body.classList.contains('dch-dark')?'light':'dark';
        try{localStorage.setItem(KEY,next)}catch(e){}
        apply(next);
      });
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();


/* v16.2 locale-safe numeric entry and clean result controls */
(function(){
  'use strict';
  function normalizeDigits(value){
    return String(value == null ? '' : value)
      .replace(/[٠-٩]/g,function(ch){return String(ch.charCodeAt(0)-1632);})
      .replace(/[۰-۹]/g,function(ch){return String(ch.charCodeAt(0)-1776);})
      .replace(/[٫]/g,'.')
      .replace(/[٬،]/g,'')
      .replace(/−/g,'-');
  }
  window.dchNormalizeNumber=normalizeDigits;
  window.dchParseNumber=function(value){
    var raw=normalizeDigits(value).trim(),comma=raw.lastIndexOf(','),dot=raw.lastIndexOf('.');
    if(comma>=0&&dot>=0){var dec=Math.max(comma,dot);raw=raw.slice(0,dec).replace(/[.,]/g,'')+'.'+raw.slice(dec+1).replace(/[.,]/g,'');}
    else if(comma>=0){var a=raw.split(',');raw=a.length===2?a[0]+'.'+a[1]:a.slice(0,-1).join('')+'.'+a[a.length-1];}
    var n=Number(raw);
    return Number.isFinite(n)?n:NaN;
  };
  function isNumericField(el){return el && el.matches && el.matches('input[type="number"],input[inputmode="decimal"],input[inputmode="numeric"]');}
  function replaceSelection(el,text){
    var start=typeof el.selectionStart==='number'?el.selectionStart:el.value.length;
    var end=typeof el.selectionEnd==='number'?el.selectionEnd:start;
    if(typeof el.setRangeText==='function') el.setRangeText(text,start,end,'end');
    else el.value=el.value.slice(0,start)+text+el.value.slice(end);
    el.dispatchEvent(new Event('input',{bubbles:true}));
  }
  document.addEventListener('beforeinput',function(event){
    var el=event.target;
    if(!isNumericField(el) || typeof event.data!=='string' || !event.data) return;
    var normalized=normalizeDigits(event.data);
    if(normalized!==event.data){event.preventDefault();replaceSelection(el,normalized);}
  },true);
  document.addEventListener('paste',function(event){
    var el=event.target;
    if(!isNumericField(el) || !event.clipboardData) return;
    var raw=event.clipboardData.getData('text');
    var normalized=normalizeDigits(raw);
    if(normalized!==raw){event.preventDefault();replaceSelection(el,normalized);}
  },true);
  function normalizeField(el){
    if(!isNumericField(el)) return;
    var normalized=normalizeDigits(el.value);
    if(normalized!==el.value){
      try{el.value=normalized;}catch(_){ }
      el.dispatchEvent(new Event('input',{bubbles:true}));
    }
  }
  document.addEventListener('input',function(event){normalizeField(event.target);},true);
  document.addEventListener('blur',function(event){normalizeField(event.target);},true);
  document.addEventListener('click',function(event){
    var button=event.target.closest && event.target.closest('button,input[type="button"],input[type="submit"]');
    if(!button) return;
    document.querySelectorAll('input[type="number"],input[inputmode="decimal"],input[inputmode="numeric"]').forEach(normalizeField);
  },true);
  function cleanActionLabels(){
    var labels={copy:'Copy result',share:'Share',print:'Print / PDF'};
    document.querySelectorAll('[data-result-action]').forEach(function(button){
      var type=button.getAttribute('data-result-action');
      if(labels[type]) button.textContent=labels[type];
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',cleanActionLabels); else cleanActionLabels();
})();


/* assets/js/v167-final-lock.js */
/* Daily Calculator Hub v16.7 — final header/drawer controller */
(function(){
  'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn();}
  ready(function(){
    var body=document.body, key='dch-theme-v143';
    var themeButton=document.getElementById('themeToggleV167');
    function saved(){try{return localStorage.getItem(key)||localStorage.getItem('dch-theme')||'light';}catch(_){return 'light';}}
    function apply(theme){
      var dark=theme==='dark';
      body.classList.toggle('dch-dark',dark);body.classList.toggle('light',!dark);
      document.documentElement.style.colorScheme=dark?'dark':'only light';
      if(themeButton){themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');themeButton.title=themeButton.getAttribute('aria-label');}
      var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=dark?'#0e1916':'#f7f9f6';
    }
    apply(saved()==='dark'?'dark':'light');
    if(themeButton)themeButton.addEventListener('click',function(){var next=body.classList.contains('dch-dark')?'light':'dark';try{localStorage.setItem(key,next);localStorage.setItem('dch-theme',next);}catch(_){}apply(next);});

    var drawer=document.getElementById('v167SiteDrawer'), menu=document.getElementById('menuToggleV167'), close=document.getElementById('v167DrawerClose'), backdrop=document.getElementById('v167DrawerBackdrop'), previous=null;
    function setDrawer(open){if(!drawer)return;drawer.classList.toggle('open',open);drawer.setAttribute('aria-hidden',open?'false':'true');if(menu)menu.setAttribute('aria-expanded',open?'true':'false');if(backdrop)backdrop.hidden=!open;body.style.overflow=open?'hidden':'';if(open){previous=document.activeElement;setTimeout(function(){var first=drawer.querySelector('input,button,a');if(first)first.focus();},30);}else if(previous&&previous.focus){previous.focus();previous=null;}}
    if(menu)menu.addEventListener('click',function(){setDrawer(true);});if(close)close.addEventListener('click',function(){setDrawer(false);});if(backdrop)backdrop.addEventListener('click',function(){setDrawer(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&drawer&&drawer.classList.contains('open'))setDrawer(false);});if(drawer)drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setDrawer(false);});});

    function applyHomeSearch(q){var input=document.getElementById('searchInput');if(!input)return false;input.value=q;input.dispatchEvent(new Event('input',{bubbles:true}));var all=document.getElementById('all-calculators');if(all)setTimeout(function(){all.scrollIntoView({behavior:'smooth',block:'start'});},30);return true;}
    var form=document.getElementById('v167DrawerSearchForm'), input=document.getElementById('v167DrawerSearchInput');
    if(form)form.addEventListener('submit',function(e){e.preventDefault();var q=(input&&input.value||'').trim();if(!q){if(input)input.focus();return;}setDrawer(false);if(!applyHomeSearch(q))location.href='index.html?q='+encodeURIComponent(q)+'#all-calculators';});
    var params;try{params=new URLSearchParams(location.search);}catch(_){params=null;}if(params){var q=params.get('q');if(q)applyHomeSearch(q);var category=params.get('category');if(category){var selector='[data-filter="'+category.replace(/["\\]/g,'')+'"]';var filter=document.querySelector(selector);if(filter)setTimeout(function(){filter.click();var all=document.getElementById('all-calculators');if(all)all.scrollIntoView({behavior:'smooth',block:'start'});},60);}}

    var topButton=document.getElementById('backToTop');
    if(topButton){var ticking=false;function place(){ticking=false;var mobile=matchMedia('(max-width:600px)').matches,base=mobile?104:32,vh=innerHeight,h=topButton.offsetHeight||44,required=base,hide=false,buttonTop=vh-base-h;document.querySelectorAll('.ad-slot-v12,.ad-slot,[data-ad-slot-position],footer').forEach(function(o){var r=o.getBoundingClientRect();if(r.bottom<=0||r.top>=vh)return;if(buttonTop<r.bottom&&buttonTop+h>r.top){var c=vh-r.top+12;if(c>vh*.52)hide=true;else required=Math.max(required,c);}});topButton.classList.toggle('v166-obstacle-hidden',hide);topButton.style.setProperty('bottom',required+'px','important');}function request(){if(!ticking){ticking=true;requestAnimationFrame(place);}}addEventListener('scroll',request,{passive:true});addEventListener('resize',request,{passive:true});request();}
  });
})();


/* assets/js/v168-back-button.js */
/* Daily Calculator Hub v19.0.10 — deterministic local back navigation */
(function(){
  'use strict';
  function init(){
    var button=document.getElementById('dchBackButton');
    if(!button)return;
    button.addEventListener('click',function(event){
      event.preventDefault();
      window.location.href='index.html';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


/* assets/js/v173-final-mobile-touch.js */
/* Daily Calculator Hub v17.3 — keep the smaller top button clear of results, ads and summary text. */
(function(){
  'use strict';
  function ready(fn){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn,{once:true});
    else fn();
  }
  ready(function(){
    var button=document.getElementById('backToTop');
    if(!button) return;
    var pending=false;
    var blockedSelector='.result-panel,.calc-card .result,.ad-slot-v12,.ad-slot,[data-ad-slot-position],.seo-summary-v12';
    function overlaps(a,b){
      return a.left<b.right && a.right>b.left && a.top<b.bottom && a.bottom>b.top;
    }
    function sync(){
      pending=false;
      if(!button.classList.contains('show')){
        button.classList.remove('v173-content-clear');
        return;
      }
      var br=button.getBoundingClientRect();
      var blocked=false;
      document.querySelectorAll(blockedSelector).forEach(function(node){
        if(blocked) return;
        var style=getComputedStyle(node);
        if(style.display==='none'||style.visibility==='hidden') return;
        var r=node.getBoundingClientRect();
        if(r.bottom<=0||r.top>=innerHeight) return;
        if(overlaps(br,r)) blocked=true;
      });
      button.classList.toggle('v173-content-clear',blocked);
    }
    function request(){
      if(!pending){pending=true;requestAnimationFrame(sync);}
    }
    addEventListener('scroll',request,{passive:true});
    addEventListener('resize',request,{passive:true});
    new MutationObserver(request).observe(button,{attributes:true,attributeFilter:['class','style']});
    request();
  });
})();


/* assets/js/v174-comprehensive-audit.js */
/* Daily Calculator Hub v17.4 — smart floating-control collision guard. */
(function(){
  'use strict';
  function ready(fn){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn,{once:true});
    else fn();
  }
  ready(function(){
    var button=document.getElementById('backToTop');
    if(!button) return;
    var protectedSelector=[
      '.calc-card .result','.result-panel','.result-actions',
      '.ad-slot-v12','.ad-slot','[data-ad-slot-position]',
      '.toc-v12','.seo-summary-v12','.unified-related','.page-nav','.footer'
    ].join(',');
    var pending=false;
    function intersects(a,b,pad){
      return a.left < b.right+pad && a.right > b.left-pad && a.top < b.bottom+pad && a.bottom > b.top-pad;
    }
    function sync(){
      pending=false;
      if(!button.classList.contains('show')){
        button.classList.remove('v174-blocked');
        return;
      }
      var br=button.getBoundingClientRect();
      var blocked=false;
      var nodes=document.querySelectorAll(protectedSelector);
      for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        var style=getComputedStyle(node);
        if(style.display==='none'||style.visibility==='hidden') continue;
        var r=node.getBoundingClientRect();
        if(r.bottom<=0||r.top>=innerHeight) continue;
        if(intersects(br,r,10)){blocked=true;break;}
      }
      button.classList.toggle('v174-blocked',blocked);
    }
    function request(){if(!pending){pending=true;requestAnimationFrame(sync);}}
    addEventListener('scroll',request,{passive:true});
    addEventListener('resize',request,{passive:true});
    if(window.visualViewport) visualViewport.addEventListener('resize',request,{passive:true});
    new MutationObserver(request).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class','style','open']});
    request();
  });
})();


/* assets/js/v1851-mobile-polish.js */
/* Daily Calculator Hub v18.5.1 — adaptive numeric results and icon containment */
(function(){
  'use strict';
  var fitClasses=['dch-numeric-result','dch-fit-medium','dch-fit-tight','dch-fit-micro'];

  function compactLength(text){
    return text.replace(/\s+/g,'').length;
  }

  function fitNumeric(el){
    if(!el) return;
    fitClasses.forEach(function(c){el.classList.remove(c);});
    var text=(el.textContent||'').trim();
    if(!text || !/[0-9٠-٩۰-۹]/.test(text)) return;
    el.classList.add('dch-numeric-result');
    var classes=['dch-fit-medium','dch-fit-tight','dch-fit-micro'],i=0;
    while(el.scrollWidth>el.clientWidth+1&&i<classes.length){el.classList.add(classes[i++]);}
    if(el.scrollWidth>el.clientWidth+1) el.classList.add('dch-fit-wrap');
  }

  function markIcon(el){
    if(!el) return;
    var text=(el.textContent||'').trim();
    if(!text) return;
    /* Emoji tiles stay untouched; formulas, abbreviations and arrows use compact typography. */
    var textLike=/[A-Za-z0-9Ωρ°½²³÷×=→|]/.test(text) && !/[\u{1F300}-\u{1FAFF}]/u.test(text);
    if(!textLike) return;
    el.classList.add('dch-text-icon');
    var len=compactLength(text);
    if(len>=7) el.classList.add('dch-icon-xwide');
    else if(len>=5) el.classList.add('dch-icon-wide');
  }

  function scan(root){
    (root||document).querySelectorAll('.result-main,.result-list strong').forEach(fitNumeric);
    (root||document).querySelectorAll('.discovery-icon,.card-icon').forEach(markIcon);
  }

  function start(){
    scan(document);
    var observer=new MutationObserver(function(records){
      records.forEach(function(record){
        if(record.type==='characterData') fitNumeric(record.target.parentElement);
        if(record.type==='childList'){
          if(record.target && record.target.matches && record.target.matches('.result-main,.result-list strong')) fitNumeric(record.target);
          record.addedNodes.forEach(function(node){
            if(node.nodeType!==1) return;
            if(node.matches('.result-main,.result-list strong')) fitNumeric(node);
            scan(node);
          });
        }
      });
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();


/* assets/js/v186-input-normalization.js */
/* Daily Calculator Hub v18.6 — Arabic/Persian digit input normalization */
(function(){
  'use strict';
  var arabic='٠١٢٣٤٥٦٧٨٩',persian='۰۱۲۳۴۵۶۷۸۹';
  function mapDigits(value){
    return String(value==null?'':value)
      .replace(/[٠-٩]/g,function(d){return String(arabic.indexOf(d));})
      .replace(/[۰-۹]/g,function(d){return String(persian.indexOf(d));})
      .replace(/٫/g,'.').replace(/[٬،]/g,',');
  }
  function sanitizeNumeric(raw){
    raw=mapDigits(raw).replace(/[$%\s]/g,'');
    var comma=raw.lastIndexOf(','),dot=raw.lastIndexOf('.');
    if(comma>=0&&dot>=0){var dec=Math.max(comma,dot);raw=raw.slice(0,dec).replace(/[.,]/g,'')+'.'+raw.slice(dec+1).replace(/[.,]/g,'');}
    else if(comma>=0){var ca=raw.split(',');raw=ca.length===2?ca[0]+'.'+ca[1]:ca.slice(0,-1).join('')+'.'+ca[ca.length-1];}
    else if((raw.match(/\./g)||[]).length>1){var da=raw.split('.');raw=da.slice(0,-1).join('')+'.'+da[da.length-1];}
    var out='',dotSeen=false,exp=false;
    for(var i=0;i<raw.length;i++){
      var c=raw[i];
      if(c>='0'&&c<='9'){out+=c;continue;}
      if(c==='.'&&!dotSeen&&!exp){dotSeen=true;out+=c;continue;}
      if((c==='e'||c==='E')&&!exp&&/[0-9]$/.test(out)){exp=true;out+='e';continue;}
      if((c==='+'||c==='-')&&(out===''||/e$/.test(out))){out+=c;}
    }
    return out;
  }
  function normalizeElement(el){
    if(!el||el.tagName!=='INPUT')return;
    var numeric=el.dataset.dchNumericInput==='true';
    var before=el.value,after=numeric?sanitizeNumeric(before):mapDigits(before);
    if(before===after)return;
    var start=typeof el.selectionStart==='number'?el.selectionStart:after.length;
    var prefix=numeric?sanitizeNumeric(before.slice(0,start)):mapDigits(before.slice(0,start));
    el.value=after;
    try{el.setSelectionRange(prefix.length,prefix.length);}catch(_){}
  }
  function start(){
    document.querySelectorAll('input[type="number"]').forEach(function(el){
      el.dataset.dchNumericInput='true';
      el.type='text';
      el.inputMode=(el.step==='1'?'numeric':'decimal');
      el.autocomplete='off';
      normalizeElement(el);
    });
    document.addEventListener('input',function(e){if(e.target&&e.target.tagName==='INPUT')normalizeElement(e.target);},true);
    document.addEventListener('paste',function(e){
      var el=e.target;if(!el||el.tagName!=='INPUT')return;
      var text=e.clipboardData&&e.clipboardData.getData('text');
      if(!text||!/[٠-٩۰-۹٫٬،]/.test(text))return;
      e.preventDefault();
      var mapped=el.dataset.dchNumericInput==='true'?sanitizeNumeric(text):mapDigits(text);
      var start=typeof el.selectionStart==='number'?el.selectionStart:0,end=typeof el.selectionEnd==='number'?el.selectionEnd:el.value.length;
      el.value=el.value.slice(0,start)+mapped+el.value.slice(end);
      try{el.setSelectionRange(start+mapped.length,start+mapped.length);}catch(_){}
      el.dispatchEvent(new Event('input',{bubbles:true}));
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();


/* assets/js/v187-smart-finder.js */
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

