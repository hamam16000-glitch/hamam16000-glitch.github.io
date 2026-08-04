/* Daily Calculator Hub v19.0.10 — deterministic local back navigation */
(function(){
  'use strict';
  function init(){
    var button=document.getElementById('dchBackButton');
    if(!button)return;
    button.addEventListener('click',function(event){
      event.preventDefault();
      window.location.href='index.html';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
