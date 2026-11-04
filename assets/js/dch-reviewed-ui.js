/* UI for documented calculators: no numeric rewriting or hidden calculation handlers. */
(function(){
  'use strict';
  function byId(id){return document.getElementById(id);}
  function read(key){try{var x=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(x)?x:[];}catch(e){return[];}}
  function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){}}
  function start(){
    var theme=byId('themeToggleV167'),saved='light';
    try{saved=localStorage.getItem('dch-theme-v143')||localStorage.getItem('dch-theme')||'light';}catch(e){}
    function applyTheme(value){
      var dark=value==='dark';document.body.classList.toggle('dch-dark',dark);document.documentElement.style.colorScheme=dark?'dark':'light';
      if(theme){theme.textContent='';theme.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');}
    }
    applyTheme(saved);
    if(theme)theme.addEventListener('click',function(){var value=document.body.classList.contains('dch-dark')?'light':'dark';applyTheme(value);try{localStorage.setItem('dch-theme-v143',value);localStorage.setItem('dch-theme',value);}catch(e){}});
    var drawer=byId('v167SiteDrawer'),menu=byId('menuToggleV167'),close=byId('v167DrawerClose'),backdrop=byId('v167DrawerBackdrop'),previous=null;
    function setDrawer(open){
      if(!drawer)return;
      if(open)previous=document.activeElement;
      drawer.classList.toggle('open',open);drawer.setAttribute('aria-hidden',String(!open));drawer.inert=!open;
      if(menu)menu.setAttribute('aria-expanded',String(open));if(backdrop)backdrop.hidden=!open;document.body.style.overflow=open?'hidden':'';
      if(open){var first=drawer.querySelector('button,input,a');if(first)first.focus();}else if(previous&&previous.focus)previous.focus();
    }
    setDrawer(false);
    if(menu)menu.addEventListener('click',function(){setDrawer(true);});
    if(close)close.addEventListener('click',function(){setDrawer(false);});
    if(backdrop)backdrop.addEventListener('click',function(){setDrawer(false);});
    document.addEventListener('keydown',function(event){
      if(!drawer||!drawer.classList.contains('open'))return;
      if(event.key==='Escape'){setDrawer(false);return;}
      if(event.key==='Tab'){
        var fields=Array.from(drawer.querySelectorAll('a[href],input,button')).filter(function(node){return !node.disabled;});
        if(event.shiftKey&&document.activeElement===fields[0]){event.preventDefault();fields.at(-1).focus();}
        else if(!event.shiftKey&&document.activeElement===fields.at(-1)){event.preventDefault();fields[0].focus();}
      }
    });
    function search(value){var q=String(value||'').trim();if(q)location.href='index.html?q='+encodeURIComponent(q)+'#all-calculators';}
    var drawerSearch=byId('v167DrawerSearchForm'),drawerInput=byId('v167DrawerSearchInput');
    if(drawerSearch)drawerSearch.addEventListener('submit',function(event){event.preventDefault();if(!drawerInput.value.trim()){drawerInput.focus();return;}search(drawerInput.value);});
    var compact=byId('compactCalculatorSearch'),input=byId('pageCalculatorSearch'),searchButton=byId('pageCalculatorSearchButton');
    if(compact&&menu){
      var toggle=document.createElement('button');toggle.type='button';toggle.className='reviewed-search-toggle';toggle.textContent='⌕';toggle.setAttribute('aria-label','Search calculators');toggle.setAttribute('aria-expanded','false');
      menu.parentElement.insertBefore(toggle,theme||menu);
      toggle.addEventListener('click',function(){var open=compact.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));if(open)input.focus();});
    }
    if(searchButton)searchButton.addEventListener('click',function(){search(input.value);});
    if(input)input.addEventListener('keydown',function(event){if(event.key==='Enter'){event.preventDefault();search(input.value);}});
    // Store only calculator names/URLs; entered amounts and dates are never included.
    var form=byId('calculator-form'),heading=document.querySelector('h1');
    if(form&&heading){
      var href=location.pathname.split('/').pop(),title=heading.textContent,item={href:href,title:title};
      write('dch-recents-v1',[item].concat(read('dch-recents-v1').filter(function(x){return x.href!==href;})).slice(0,12));
      var favorite=document.createElement('button');favorite.type='button';favorite.className='result-action reviewed-favorite';
      function syncFavorite(){var active=read('dch-favorites-v1').some(function(x){return x.href===href;});favorite.textContent=active?'★ Saved calculator':'☆ Save calculator';favorite.setAttribute('aria-pressed',String(active));favorite.setAttribute('aria-label',active?'Remove this calculator from favorites':'Save this calculator to favorites');}
      favorite.addEventListener('click',function(){var items=read('dch-favorites-v1'),active=items.some(function(x){return x.href===href;});write('dch-favorites-v1',active?items.filter(function(x){return x.href!==href;}):[item].concat(items).slice(0,100));syncFavorite();});
      heading.insertAdjacentElement('afterend',favorite);syncFavorite();
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
