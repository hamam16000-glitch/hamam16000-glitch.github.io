/* Daily Calculator Hub v18.6 — Arabic/Persian digit input normalization */
(function(){
  'use strict';
  var arabic='٠١٢٣٤٥٦٧٨٩',persian='۰۱۲۳۴۵۶۷۸۹';
  function mapDigits(value){
    return String(value==null?'':value)
      .replace(/[٠-٩]/g,function(d){return String(arabic.indexOf(d));})
      .replace(/[۰-۹]/g,function(d){return String(persian.indexOf(d));})
      .replace(/٫/g,'.').replace(/[٬،]/g,',');
  }
  function sanitizeNumeric(raw){
    raw=mapDigits(raw).replace(/[$%\s,]/g,'');
    var out='',dot=false,exp=false;
    for(var i=0;i<raw.length;i++){
      var c=raw[i];
      if(c>='0'&&c<='9'){out+=c;continue;}
      if(c==='.'&&!dot&&!exp){dot=true;out+=c;continue;}
      if((c==='e'||c==='E')&&!exp&&/[0-9]$/.test(out)){exp=true;out+='e';continue;}
      if((c==='+'||c==='-')&&(out===''||/e$/.test(out))){out+=c;}
    }
    return out;
  }
  function normalizeElement(el){
    if(!el||el.tagName!=='INPUT')return;
    var numeric=el.dataset.dchNumericInput==='true';
    var before=el.value,after=numeric?sanitizeNumeric(before):mapDigits(before);
    if(before===after)return;
    var start=typeof el.selectionStart==='number'?el.selectionStart:after.length;
    var prefix=numeric?sanitizeNumeric(before.slice(0,start)):mapDigits(before.slice(0,start));
    el.value=after;
    try{el.setSelectionRange(prefix.length,prefix.length);}catch(_){}
  }
  function start(){
    document.querySelectorAll('input[type="number"]').forEach(function(el){
      el.dataset.dchNumericInput='true';
      el.type='text';
      el.inputMode=(el.step==='1'?'numeric':'decimal');
      el.autocomplete='off';
      normalizeElement(el);
    });
    document.addEventListener('input',function(e){if(e.target&&e.target.tagName==='INPUT')normalizeElement(e.target);},true);
    document.addEventListener('paste',function(e){
      var el=e.target;if(!el||el.tagName!=='INPUT')return;
      var text=e.clipboardData&&e.clipboardData.getData('text');
      if(!text||!/[٠-٩۰-۹٫٬،]/.test(text))return;
      e.preventDefault();
      var mapped=el.dataset.dchNumericInput==='true'?sanitizeNumeric(text):mapDigits(text);
      var start=typeof el.selectionStart==='number'?el.selectionStart:0,end=typeof el.selectionEnd==='number'?el.selectionEnd:el.value.length;
      el.value=el.value.slice(0,start)+mapped+el.value.slice(end);
      try{el.setSelectionRange(start+mapped.length,start+mapped.length);}catch(_){}
      el.dispatchEvent(new Event('input',{bubbles:true}));
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
