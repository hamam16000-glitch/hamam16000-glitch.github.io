/* Daily Calculator Hub v19.5.9 — lazy page search. */
(function(){
'use strict';
var loading=null;
function loadData(){if(window.DCH_PAGE_SEARCH_DATA)return Promise.resolve();if(loading)return loading;loading=new Promise(function(resolve){var s=document.createElement('script');s.src='assets/js/dch-page-search-data.js?v=19.5.9';s.onload=resolve;s.onerror=resolve;document.head.appendChild(s);});return loading;}
function norm(v){return String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
function go(q){var list=window.DCH_PAGE_SEARCH_DATA||[],n=norm(q),best=null;for(var i=0;i<list.length;i++){var x=list[i],hay=norm((x.title||'')+' '+(x.search||''));if(hay===n){best=x;break;}if(!best&&hay.indexOf(n)>=0)best=x;}location.href=best&&best.href?best.href:'index.html?q='+encodeURIComponent(q)+'#all-calculators';}
function init(){var form=document.getElementById('v167DrawerSearchForm'),input=document.getElementById('v167DrawerSearchInput'),menu=document.getElementById('menuToggleV167');if(menu)menu.addEventListener('click',loadData,{once:true});if(input)input.addEventListener('focus',loadData,{once:true});if(form)form.addEventListener('submit',function(e){var q=(input&&input.value||'').trim();if(!q)return;e.preventDefault();e.stopImmediatePropagation();loadData().then(function(){go(q);});},true);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
}());
