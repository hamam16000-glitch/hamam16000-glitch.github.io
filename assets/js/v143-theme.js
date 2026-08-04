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
    var n=Number(normalizeDigits(value).trim());
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
