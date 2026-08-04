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
