(function(){var D=document.getElementById('distance'),M=document.getElementById('minutes'),S=document.getElementById('seconds'),B=document.getElementById('calculateButton'),O=document.getElementById('main'),V=document.getElementById('speed');function c(){
 const d=Number(D.value),minutes=Number(M.value),seconds=Number(S.value),t=minutes*60+seconds;
 if(d<=0||minutes<0||seconds<0||seconds>=60||t<=0){O.textContent='Invalid input';return;}
 const rounded=Math.round(t/d),mi=Math.floor(rounded/60),se=rounded%60;
 O.textContent=mi+':'+String(se).padStart(2,'0')+' /km';V.textContent=(d/(t/3600)).toFixed(2)+' km/h';
}c=window.DCHCalculator.wrap(c,{"fields":[{"id":"distance"},{"id":"minutes"},{"id":"seconds"}],"outputs":["main","speed"],"primary":"main"});B.onclick=c;c()}());