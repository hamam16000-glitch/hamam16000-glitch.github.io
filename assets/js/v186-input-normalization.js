/* Daily Calculator Hub v18.6 — Arabic/Persian digit input normalization */
(function(){
  'use strict';
  var arabic='٠١٢٣٤٥٦٧٨٩',persian='۰۱۲۳۴۵۶۷۸۹';
  function mapDigits(value){
    return String(value==null?'':value)
      .replace(/[٠-٩]/g,function(d){return String(arabic.indexOf(d));})
      .replace(/[۰-۹]/g,function(d){return String(persian.indexOf(d));})
      .replace(/٫/g,'.').replace(/٬/g,'').replace(/،/g,',').replace(/−/g,'-');
  }
  function sanitizeNumeric(raw){
    var original=mapDigits(raw),s=original.trim().replace(/^\$\s*/,'').replace(/\s*%$/,'');
    // Accept properly grouped spaces, but do not silently turn "1 2" into 12.
    if(/^[-+]?\d{1,3}(?:[ \u00a0\u202f]\d{3})+(?:[.,]\d+)?$/.test(s))s=s.replace(/[ \u00a0\u202f]/g,'');
    var comma=s.lastIndexOf(','),dot=s.lastIndexOf('.');
    if(comma>=0&&dot>=0){
      var decimal=Math.max(comma,dot),group=s[decimal]===','?'.':',';
      var integer=s.slice(0,decimal),fraction=s.slice(decimal+1);
      var grouping=group===','?/^[-+]?\d{1,3}(?:,\d{3})+$/:/^[-+]?\d{1,3}(?:\.\d{3})+$/;
      if(!grouping.test(integer)||!/^\d*$/.test(fraction))return original;
      s=integer.split(group).join('')+'.'+fraction;
    }else if(comma>=0){
      var locale=window.DCHI18N&&window.DCHI18N.getLocale?window.DCHI18N.getLocale():'en-US';
      var parts=new Intl.NumberFormat(locale).formatToParts(1.1),decimalPart=parts.find(function(p){return p.type==='decimal';});
      if(decimalPart&&decimalPart.value!==','&&/^[-+]?\d{1,3}(?:,\d{3})+$/.test(s))s=s.replace(/,/g,'');
      else if((s.match(/,/g)||[]).length===1)s=s.replace(',','.');
      else return original;
    }
    // Retain malformed text so calculator validation can reject it.
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?$/.test(s)?s:original;
  }
  window.dchNormalizeNumericInput=sanitizeNumeric;
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
