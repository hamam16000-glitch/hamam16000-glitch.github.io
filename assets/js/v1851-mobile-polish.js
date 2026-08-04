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
