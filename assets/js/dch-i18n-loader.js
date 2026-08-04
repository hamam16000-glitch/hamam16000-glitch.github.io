/* Daily Calculator Hub v19.5.9 — language-aware i18n loader.
   Loads only the dictionary for the selected language. */
(function(){
'use strict';
var KEY='dch-language-v2';
function normalize(x){x=String(x||'en').toLowerCase();return x==='es'?'es':(x==='zh-cn'||x==='zh'?'zh-CN':(x==='fil'||x==='tl'?'fil':'en'));}
function saved(){try{return normalize(localStorage.getItem(KEY)||'en');}catch(_){return 'en';}}
function fileName(){var p=String(location.pathname||'').split('/');return (p[p.length-1]||'').toLowerCase();}
function isHome(){var f=fileName();return !f||f==='index.html';}
function load(src){return new Promise(function(resolve){var s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=resolve;document.head.appendChild(s);});}
var lang=saved(),base='assets/js/',queue=[];
if(lang==='es')queue.push(base+'dch-es-global.js?v=19.5.9');
if(isHome()&&lang==='zh-CN')queue.push(base+'dch-zh-home.js?v=19.5.9');
if(isHome()&&lang==='fil')queue.push(base+'dch-fil-home.js?v=19.5.9');
queue.push(base+'dch-i18n-core.js?v=19.5.9');
var ready=Promise.resolve();queue.forEach(function(src){ready=ready.then(function(){return load(src);});});
window.DCHI18NLoader={ready:ready,changeLanguage:function(next){next=normalize(next);try{localStorage.setItem(KEY,next);}catch(_){}location.reload();}};
}());
