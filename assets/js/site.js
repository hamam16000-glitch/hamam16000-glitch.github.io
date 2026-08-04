
(function(){
  var body=document.body;
  var themeBtn=document.getElementById('themeToggle');
  var saved=null;try{saved=localStorage.getItem('dch-theme')}catch(_){}
  if(saved==='dark'){body.classList.remove('light')}else{body.classList.add('light')}
  function themeLabel(){
    if(themeBtn){themeBtn.textContent=body.classList.contains('light')?'Dark':'Light'}
  }
  themeLabel();
  if(themeBtn){
    themeBtn.addEventListener('click',function(){
      body.classList.toggle('light');
      try{localStorage.setItem('dch-theme',body.classList.contains('light')?'light':'dark')}catch(_){}
      themeLabel();
    });
  }

  /* The hero Smart Finder and the complete-library filter are intentionally
     separate. Earlier builds reused #searchInput for both features. A natural
     language query such as "convert 72 Fahrenheit to Celsius" then hid every
     library card because it was not an exact substring of a card's search text.
     Use a dedicated library input only if one is added in the future; otherwise
     the complete library is filtered solely by category. */
  var input=document.getElementById('librarySearchInput');
  var searchForm=document.getElementById('librarySearchForm');
  var cards=document.querySelectorAll('[data-card]');
  var count=document.getElementById('countText');
  var empty=document.getElementById('emptyState');
  var buttons=document.querySelectorAll('[data-filter]');
  var active='all';

  function refresh(){
    if(!cards.length){return}
    var q=input ? input.value.toLowerCase().replace(/^\s+|\s+$/g,'') : '';
    var visible=0;
    for(var i=0;i<cards.length;i++){
      var card=cards[i];
      var words=(card.getAttribute('data-search')||'').toLowerCase();
      var cat=card.getAttribute('data-category')||'';
      var categories=cat.toLowerCase().split(/\s+/);
      var show=(active==='all'||categories.indexOf(active)!==-1)&&(q===''||words.indexOf(q)!==-1);
      card.classList.toggle('is-hidden',!show);
      if(show){visible++}
    }
    if(count){count.textContent=visible+' calculator'+(visible===1?'':'s')+' shown'}
    if(empty){empty.className=visible===0?'empty show':'empty'}
  }
  if(input){input.addEventListener('input',refresh)}
  if(searchForm){
    searchForm.addEventListener('submit',function(event){
      event.preventDefault();
      refresh();
      var firstMatch=null;
      for(var m=0;m<cards.length;m++){
        if(!cards[m].classList.contains('is-hidden')){firstMatch=cards[m];break}
      }
      if(firstMatch){
        window.location.href=firstMatch.getAttribute('href');
      }else if(empty){
        empty.className='empty show';
        empty.setAttribute('tabindex','-1');
        empty.focus();
      }
    });
  }
  for(var j=0;j<buttons.length;j++){
    buttons[j].addEventListener('click',function(){
      active=this.getAttribute('data-filter');
      for(var k=0;k<buttons.length;k++){buttons[k].classList.remove('active');buttons[k].setAttribute('aria-pressed','false')}
      this.classList.add('active');this.setAttribute('aria-pressed','true');
      refresh();
    });
  }
  var initialCategory='';
  try{initialCategory=(new URLSearchParams(window.location.search).get('category')||'').toLowerCase()}catch(_){}
  if(initialCategory){
    for(var n=0;n<buttons.length;n++){
      if(buttons[n].getAttribute('data-filter')===initialCategory){
        buttons[n].click();
        break;
      }
    }
  }else{
    refresh();
  }
  window.addEventListener('pageshow',function(){refresh()});
}());


/* Production v13.0 discovery interactions */
(function(){
 var drawer=document.getElementById('siteDrawer'),toggle=document.getElementById('menuToggle'),close=document.getElementById('drawerClose'),backdrop=document.getElementById('drawerBackdrop');
 function setDrawer(open){if(!drawer)return;drawer.classList.toggle('open',open);drawer.setAttribute('aria-hidden',open?'false':'true');if(toggle)toggle.setAttribute('aria-expanded',open?'true':'false');if(backdrop)backdrop.hidden=!open;document.body.style.overflow=open?'hidden':''}
 if(toggle)toggle.addEventListener('click',function(){setDrawer(true)});if(close)close.addEventListener('click',function(){setDrawer(false)});if(backdrop)backdrop.addEventListener('click',function(){setDrawer(false)});document.addEventListener('keydown',function(e){if(e.key==='Escape')setDrawer(false)});
 function activateFilter(value){var btn=document.querySelector('[data-filter="'+value+'"]');if(btn){btn.click();document.getElementById('all-calculators').scrollIntoView({behavior:'smooth'})}}
 document.querySelectorAll('[data-home-filter]').forEach(function(el){el.addEventListener('click',function(){activateFilter(this.getAttribute('data-home-filter'))})});
 document.querySelectorAll('[data-drawer-filter]').forEach(function(el){el.addEventListener('click',function(e){e.preventDefault();setDrawer(false);activateFilter(this.getAttribute('data-drawer-filter'))})});
 var input=document.getElementById('searchInput'),clear=document.getElementById('searchClear');
 function clearState(){if(!clear||!input)return;clear.hidden=!input.value}
 if(input){input.addEventListener('input',clearState);clearState()}
 if(clear){clear.addEventListener('click',function(){input.value='';input.dispatchEvent(new Event('input'));input.focus();clearState()})}
}());
