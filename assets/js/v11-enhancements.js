(function(){
  function resultText(){
    var title=(document.querySelector('h1')||{}).textContent||'Calculator result';
    var result=document.querySelector('.result');
    if(!result) return title;
    return title+'\n'+result.innerText.replace(/\n{3,}/g,'\n\n').trim()+'\n'+location.href;
  }
  function status(message){var el=document.querySelector('.result-action-status');if(el){el.textContent=message;setTimeout(function(){if(el.textContent===message)el.textContent='';},2400)}}
  document.addEventListener('click',async function(e){
    var copy=e.target.closest('.copy-result');
    if(copy){try{await navigator.clipboard.writeText(resultText());status('Result copied.')}catch(_){var t=document.createElement('textarea');t.value=resultText();document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();status('Result copied.')}return;}
    var share=e.target.closest('.share-result');
    if(share){
      var data={title:document.title,text:resultText(),url:location.href};
      async function fallbackShare(){
        try{
          if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(resultText())}
          else{var t=document.createElement('textarea');t.value=resultText();t.setAttribute('readonly','');t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
          status(location.protocol==='file:'?'Result copied — native sharing works after HTTPS upload.':'Sharing is unavailable, so the result was copied.');
        }catch(_){status('Sharing is unavailable in this browser.');}
      }
      var nativeShare=typeof navigator.share==='function'&&window.isSecureContext&&location.protocol!=='file:';
      if(nativeShare){try{await navigator.share(data)}catch(err){if(!err||err.name!=='AbortError')await fallbackShare();}}
      else{await fallbackShare();}
      return;
    }
    if(e.target.closest('.print-result')){window.print();}
  });
})();