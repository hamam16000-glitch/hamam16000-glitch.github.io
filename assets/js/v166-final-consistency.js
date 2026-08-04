/* Daily Calculator Hub v16.6 — shared header, drawer, theme, and ad-safe back-to-top */
(function(){
  'use strict';
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn();}
  ready(function(){
    var body=document.body;
    var themeButton=document.getElementById('themeToggleV166');
    var THEME_KEY='dch-theme-v143';
    function storedTheme(){
      try{return localStorage.getItem(THEME_KEY)||localStorage.getItem('dch-theme')||'light';}catch(_){return 'light';}
    }
    function applyTheme(theme){
      var dark=theme==='dark';
      body.classList.toggle('dch-dark',dark);
      body.classList.toggle('light',!dark);
      document.documentElement.style.colorScheme=dark?'dark':'only light';
      if(themeButton){
        themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
        themeButton.title=themeButton.getAttribute('aria-label');
      }
      var meta=document.querySelector('meta[name="theme-color"]');
      if(meta)meta.content=dark?'#0e1916':'#f7f9f6';
    }
    applyTheme(storedTheme()==='dark'?'dark':'light');
    if(themeButton&&!themeButton.dataset.v166Bound){
      themeButton.dataset.v166Bound='1';
      themeButton.addEventListener('click',function(){
        var next=body.classList.contains('dch-dark')?'light':'dark';
        try{localStorage.setItem(THEME_KEY,next);localStorage.setItem('dch-theme',next);}catch(_){ }
        applyTheme(next);
      });
    }

    var drawer=document.getElementById('v166SiteDrawer');
    var menuButton=document.getElementById('menuToggleV166');
    var closeButton=document.getElementById('v166DrawerClose');
    var backdrop=document.getElementById('v166DrawerBackdrop');
    var previousFocus=null;
    function setDrawer(open){
      if(!drawer)return;
      drawer.classList.toggle('open',open);
      drawer.setAttribute('aria-hidden',open?'false':'true');
      if(menuButton)menuButton.setAttribute('aria-expanded',open?'true':'false');
      if(backdrop)backdrop.hidden=!open;
      body.style.overflow=open?'hidden':'';
      if(open){previousFocus=document.activeElement;setTimeout(function(){var first=drawer.querySelector('input,button,a');if(first)first.focus();},30);}
      else if(previousFocus&&previousFocus.focus){previousFocus.focus();previousFocus=null;}
    }
    if(menuButton)menuButton.addEventListener('click',function(){setDrawer(true);});
    if(closeButton)closeButton.addEventListener('click',function(){setDrawer(false);});
    if(backdrop)backdrop.addEventListener('click',function(){setDrawer(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&drawer&&drawer.classList.contains('open'))setDrawer(false);});
    if(drawer)drawer.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setDrawer(false);});});

    var drawerForm=document.getElementById('v166DrawerSearchForm');
    var drawerInput=document.getElementById('v166DrawerSearchInput');
    function applyHomeSearch(q){
      var input=document.getElementById('searchInput');
      if(!input)return false;
      input.value=q;
      input.dispatchEvent(new Event('input',{bubbles:true}));
      var all=document.getElementById('all-calculators');
      if(all)setTimeout(function(){all.scrollIntoView({behavior:'smooth',block:'start'});},30);
      return true;
    }
    if(drawerForm)drawerForm.addEventListener('submit',function(e){
      e.preventDefault();
      var q=(drawerInput&&drawerInput.value||'').trim();
      if(!q){if(drawerInput)drawerInput.focus();return;}
      setDrawer(false);
      if(!applyHomeSearch(q))location.href='index.html?q='+encodeURIComponent(q)+'#all-calculators';
    });

    var params;
    try{params=new URLSearchParams(location.search);}catch(_){params=null;}
    if(params){
      var q=params.get('q');
      if(q)applyHomeSearch(q);
      var category=params.get('category');
      if(category){
        var filter=document.querySelector('[data-filter="'+CSS.escape(category)+'"]');
        if(filter){setTimeout(function(){filter.click();var all=document.getElementById('all-calculators');if(all)all.scrollIntoView({behavior:'smooth',block:'start'});},60);}
      }
    }

    var topButton=document.getElementById('backToTop');
    if(topButton){
      var ticking=false;
      function placeTopButton(){
        ticking=false;
        var mobile=window.matchMedia('(max-width:600px)').matches;
        var base=mobile?82:24;
        var vh=window.innerHeight;
        var h=topButton.offsetHeight||44;
        var required=base;
        var shouldHide=false;
        var buttonTop=vh-base-h;
        document.querySelectorAll('.ad-slot-v12,.ad-slot,[data-ad-slot-position],footer').forEach(function(obstacle){
          var r=obstacle.getBoundingClientRect();
          if(r.bottom<=0||r.top>=vh)return;
          var overlaps=buttonTop<r.bottom&&buttonTop+h>r.top;
          if(!overlaps)return;
          var candidate=vh-r.top+12;
          if(candidate>vh*.52)shouldHide=true;
          else required=Math.max(required,candidate);
        });
        topButton.classList.toggle('v166-obstacle-hidden',shouldHide);
        topButton.style.setProperty('bottom',required+'px','important');
      }
      function requestPlace(){if(!ticking){ticking=true;requestAnimationFrame(placeTopButton);}}
      window.addEventListener('scroll',requestPlace,{passive:true});
      window.addEventListener('resize',requestPlace,{passive:true});
      requestPlace();
    }
  });
})();
