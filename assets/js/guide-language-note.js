/* Identify English reference sections while preserving the calculator language. */
(function () {
  'use strict';
  var messages = {
    en: 'Updated reference sections in this guide are in English.',
    es: 'Las secciones de referencia actualizadas de esta guía están en inglés.',
    'zh-CN': '本指南中更新的参考部分目前为英语。',
    fil: 'Nasa Ingles ang mga na-update na seksiyon ng sanggunian sa gabay na ito.'
  };
  function render(event) {
    var language = event && event.detail && event.detail.language;
    if (!language) language = document.documentElement.lang || 'en';
    document.querySelectorAll('.dch-guide-language-note').forEach(function (note) {
      note.lang = language;
      note.textContent = messages[language] || messages.en;
      note.hidden = language === 'en';
    });
  }
  document.addEventListener('dch:languagechange', render);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { render(); }, {once:true});
  else render();
  if (window.DCHI18NLoader && window.DCHI18NLoader.ready) window.DCHI18NLoader.ready.then(function () { render(); });
}());
