/* Daily Calculator Hub v19.5.3 — homepage drawer behavior */
(function(){
  'use strict';
  function ready(fn){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn,{once:true});
    else fn();
  }
  ready(function(){
    var body=document.body;
    var drawer=document.getElementById('v167SiteDrawer');
    var menu=document.getElementById('menuToggleV167');
    var close=document.getElementById('v167DrawerClose');
    var backdrop=document.getElementById('v167DrawerBackdrop');
    var form=document.getElementById('v167DrawerSearchForm');
    var drawerInput=document.getElementById('v167DrawerSearchInput');
    var previous=null;
    if(!drawer||!menu) return;

    function setDrawer(open){
      drawer.classList.toggle('open',open);
      drawer.setAttribute('aria-hidden',open?'false':'true');
      menu.setAttribute('aria-expanded',open?'true':'false');
      if(backdrop) backdrop.hidden=!open;
      body.style.overflow=open?'hidden':'';
      if(open){
        previous=document.activeElement;
        window.setTimeout(function(){
          var first=drawer.querySelector('input,button,a');
          if(first) first.focus();
        },30);
      }else if(previous&&previous.focus){
        previous.focus();
        previous=null;
      }
    }

    menu.addEventListener('click',function(){setDrawer(true);});
    if(close) close.addEventListener('click',function(){setDrawer(false);});
    if(backdrop) backdrop.addEventListener('click',function(){setDrawer(false);});
    document.addEventListener('keydown',function(event){
      if(event.key==='Escape'&&drawer.classList.contains('open')) setDrawer(false);
    });
    drawer.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click',function(){setDrawer(false);});
    });

    if(form) form.addEventListener('submit',function(event){
      event.preventDefault();
      var query=(drawerInput&&drawerInput.value||'').trim();
      if(!query){if(drawerInput)drawerInput.focus();return;}
      setDrawer(false);
      var homeInput=document.getElementById('searchInput');
      if(homeInput){
        homeInput.value=query;
        homeInput.dispatchEvent(new Event('input',{bubbles:true}));
      }else{
        window.location.href='index.html?q='+encodeURIComponent(query)+'#all-calculators';
      }
    });
  });
})();
