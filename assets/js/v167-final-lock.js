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
