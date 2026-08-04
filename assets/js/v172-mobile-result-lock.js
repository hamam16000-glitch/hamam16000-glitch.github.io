/* Daily Calculator Hub v17.2 — hide the floating top button only when it would cover a result or advertisement. */
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
    function overlaps(a,b){
      return a.left<b.right && a.right>b.left && a.top<b.bottom && a.bottom>b.top;
    }
    function sync(){
      pending=false;
      if(!button.classList.contains('show')){
        button.classList.remove('v172-content-clear');
        return;
      }
      var br=button.getBoundingClientRect();
      var blocked=false;
      document.querySelectorAll('.result-panel,.ad-slot-v12,.ad-slot,[data-ad-slot-position]').forEach(function(node){
        if(blocked) return;
        var style=getComputedStyle(node);
        if(style.display==='none'||style.visibility==='hidden') return;
        var r=node.getBoundingClientRect();
        if(r.bottom<=0||r.top>=innerHeight) return;
        if(overlaps(br,r)) blocked=true;
      });
      button.classList.toggle('v172-content-clear',blocked);
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
