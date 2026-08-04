/* Daily Calculator Hub v17.4 — smart floating-control collision guard. */
(function(){
  'use strict';
  function ready(fn){
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn,{once:true});
    else fn();
  }
  ready(function(){
    var button=document.getElementById('backToTop');
    if(!button) return;
    var protectedSelector=[
      '.calc-card .result','.result-panel','.result-actions',
      '.ad-slot-v12','.ad-slot','[data-ad-slot-position]',
      '.toc-v12','.seo-summary-v12','.unified-related','.page-nav','.footer'
    ].join(',');
    var pending=false;
    function intersects(a,b,pad){
      return a.left < b.right+pad && a.right > b.left-pad && a.top < b.bottom+pad && a.bottom > b.top-pad;
    }
    function sync(){
      pending=false;
      if(!button.classList.contains('show')){
        button.classList.remove('v174-blocked');
        return;
      }
      var br=button.getBoundingClientRect();
      var blocked=false;
      var nodes=document.querySelectorAll(protectedSelector);
      for(var i=0;i<nodes.length;i++){
        var node=nodes[i];
        var style=getComputedStyle(node);
        if(style.display==='none'||style.visibility==='hidden') continue;
        var r=node.getBoundingClientRect();
        if(r.bottom<=0||r.top>=innerHeight) continue;
        if(intersects(br,r,10)){blocked=true;break;}
      }
      button.classList.toggle('v174-blocked',blocked);
    }
    function request(){if(!pending){pending=true;requestAnimationFrame(sync);}}
    addEventListener('scroll',request,{passive:true});
    addEventListener('resize',request,{passive:true});
    if(window.visualViewport) visualViewport.addEventListener('resize',request,{passive:true});
    new MutationObserver(request).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class','style','open']});
    request();
  });
})();
