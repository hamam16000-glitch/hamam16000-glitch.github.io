/* Compare two recalculated scenarios without sending or storing form values. */
(function () {
  'use strict';
  var script = document.currentScript;
  function init() {
    var api = window.DCHCalculator, controller = api && api.getController && api.getController();
    var button = document.getElementById('calculateButton');
    if (!controller || !button || document.getElementById('dch-scenarios')) return;
    var card = button.closest('.calc-card') || button.parentElement;
    var ids = script && script.getAttribute('data-inputs');
    var candidates = ids ? ids.split(',').map(function (id) { return document.getElementById(id); }).filter(Boolean) : Array.from(card.querySelectorAll('input[id],select[id],textarea[id]'));
    var fields = candidates.filter(function (el) {
      return !/search/i.test(el.id) && el.type !== 'hidden' && el.type !== 'button' && el.type !== 'submit';
    });
    var starting = fields.map(function (el) { return [el.id, el.value]; });
    var saved = null;
    var section = document.createElement('section');
    section.id = 'dch-scenarios'; section.className = 'dch-scenarios';
    section.lang = 'en'; section.setAttribute('data-dch-no-i18n', 'true');
    section.setAttribute('aria-labelledby', 'dch-scenarios-title');
    section.innerHTML = '<h2 id="dch-scenarios-title">Compare two scenarios</h2>' +
      '<p>Save a calculated baseline, change the inputs, then compare both sets of results. Each column uses its own displayed inputs.</p>' +
      '<div class="dch-scenario-actions"><button type="button" data-scenario="example">Load starting example</button>' +
      '<button type="button" data-scenario="save">Save baseline</button>' +
      '<button type="button" data-scenario="compare" disabled>Compare current</button>' +
      '<button type="button" data-scenario="copy" disabled>Copy comparison</button>' +
      '<button type="button" data-scenario="clear" disabled>Clear saved</button></div>' +
      '<p class="dch-scenario-status" role="status" aria-live="polite"></p>' +
      '<div class="dch-scenario-table" hidden></div>' +
      '<p class="dch-scenario-privacy">The saved comparison stays in this page’s memory. Reloading clears it. Example figures illustrate the model; they are not current quotes or forecasts.</p>';
    card.appendChild(section);
    var status = section.querySelector('[role="status"]'), output = section.querySelector('.dch-scenario-table');
    var control = function (name) { return section.querySelector('[data-scenario="' + name + '"]'); };
    function label(el) {
      var lab = document.querySelector('label[for="' + el.id + '"]');
      return lab ? lab.textContent.trim() : el.id;
    }
    function outputLabel(id) {
      var el = document.getElementById(id);
      if (id === controller.config.primary) {
        var heading = el && el.parentElement.querySelector('h2,h3');
        return heading ? heading.textContent.trim() : 'Main result';
      }
      var li = el && el.closest('li');
      if (li) { var clone = li.cloneNode(true); clone.querySelectorAll('strong,[data-output]').forEach(function (x) { x.remove(); }); return clone.textContent.replace(/[:：]\s*$/, '').trim(); }
      var result = el && el.parentElement;
      var name = result && result.querySelector('.label,.result-label,dt');
      if (name) return name.textContent.trim();
      if (el && el.previousElementSibling && el.previousElementSibling.textContent.trim()) return el.previousElementSibling.textContent.trim();
      if (result) { var copy = result.cloneNode(true); var value = copy.querySelector('[id="' + id + '"]'); if (value) value.remove(); var caption = copy.textContent.replace(/[:：]\s*$/, '').trim(); if (caption && caption.length < 180) return caption; }
      return id;
    }
    function capture() {
      controller.run();
      if (!controller.ok) { status.textContent = 'Enter a valid scenario before saving or comparing.'; return null; }
      return {
        inputs: fields.filter(function (el) {
          var rule = controller.config.fields.find(function (x) { return x.id === el.id; });
          return !el.disabled && (!rule || !rule.when || document.getElementById(rule.when[0]).value === rule.when[1]);
        }).map(function (el) { return [el.id, label(el), el.tagName === 'SELECT' ? el.options[el.selectedIndex].textContent : el.value]; }),
        results: controller.config.outputs.map(function (id) { var el = document.getElementById(id); return [id, outputLabel(id), el ? el.textContent : '—']; })
      };
    }
    var lastCurrent = null;
    fields.forEach(function (el) { ['input', 'change'].forEach(function (event) {
      el.addEventListener(event, function () {
        if (!saved || !lastCurrent) return;
        control('copy').disabled = true;
        var caption = output.querySelector('caption');
        if (caption) caption.textContent = 'Previous comparison — inputs have changed';
        status.textContent = 'Inputs changed. Select Compare current to refresh the comparison.';
      });
    }); });
    function render(current) {
      output.replaceChildren();
      var table = document.createElement('table'), caption = document.createElement('caption');
      caption.textContent = current ? 'Baseline and current scenario' : 'Saved baseline'; table.appendChild(caption);
      var head = document.createElement('thead'), row = document.createElement('tr');
      ['Input or result', 'Saved baseline', 'Current calculation'].forEach(function (s) { var cell = document.createElement('th'); cell.scope = 'col'; cell.textContent = s; row.appendChild(cell); });
      head.appendChild(row); table.appendChild(head);
      var body = document.createElement('tbody');
      [['Inputs', saved.inputs, current && current.inputs], ['Results', saved.results, current && current.results]].forEach(function (group) {
        var title = document.createElement('tr'), cell = document.createElement('th'); cell.colSpan = 3; cell.textContent = group[0]; title.appendChild(cell); body.appendChild(title);
        var a = new Map(group[1].map(function (x) { return [x[0], x]; })), b = new Map((group[2] || []).map(function (x) { return [x[0], x]; }));
        var ids = Array.from(new Set(Array.from(a.keys()).concat(Array.from(b.keys()))));
        ids.forEach(function (id) {
          var left = a.get(id), right = b.get(id), tr = document.createElement('tr');
          var heading = document.createElement('th'); heading.scope = 'row'; heading.textContent = (left || right)[1]; tr.appendChild(heading);
          [left ? left[2] : 'Not used', right ? right[2] : (current ? 'Not used' : 'Not compared yet')].forEach(function (value) { var td = document.createElement('td'); td.textContent = value; tr.appendChild(td); });
          body.appendChild(tr);
        });
      });
      table.appendChild(body); output.appendChild(table); output.hidden = false;
    }
    control('save').addEventListener('click', function () {
      var value = capture(); if (!value) return; saved = value; lastCurrent = null; render(null);
      control('compare').disabled = false; control('clear').disabled = false; control('copy').disabled = true;
      status.textContent = 'Baseline saved. Change an input, then select Compare current.';
    });
    control('compare').addEventListener('click', function () {
      if (!saved) return; var value = capture(); if (!value) return;
      lastCurrent = value; render(value); control('copy').disabled = false;
      status.textContent = 'Comparison updated from the inputs shown in each column.';
    });
    control('clear').addEventListener('click', function () {
      saved = null; lastCurrent = null; output.replaceChildren(); output.hidden = true;
      ['compare', 'copy', 'clear'].forEach(function (id) { control(id).disabled = true; });
      status.textContent = 'Saved comparison cleared.';
    });
    control('copy').addEventListener('click', async function () {
      if (!saved || !lastCurrent) return;
      var text = document.title + '\n' + output.innerText;
      try { if (!navigator.clipboard) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(text); status.textContent = 'Comparison copied.'; }
      catch (_) { status.textContent = 'Copy is unavailable here. You can select and copy the comparison table.'; }
    });
    control('example').addEventListener('click', async function () {
      var values = Object.fromEntries(starting), fromTable = false;
      var file = location.pathname.split('/').pop();
      try {
        var response = await fetch('assets/data/calculator-examples.json?v=deep470-20261105');
        if (!response.ok) throw new Error('Example unavailable');
        var examples = await response.json();
        if (examples[file]) { values = examples[file]; fromTable = true; }
      } catch (_) { /* The captured starting values remain available offline. */ }
      fields.forEach(function (el) { if (Object.prototype.hasOwnProperty.call(values, el.id)) { el.value = values[el.id]; el.dispatchEvent(new Event('input', {bubbles: true})); el.dispatchEvent(new Event('change', {bubbles: true})); } });
      controller.run(); status.textContent = fromTable ? 'The worked example inputs are loaded.' : 'The page’s starting values are restored.';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
