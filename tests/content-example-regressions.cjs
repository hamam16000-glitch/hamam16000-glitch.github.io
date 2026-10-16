/* Check that published example tables still describe the actual calculator.
   Formula accuracy is covered separately by the mathematical regression suites. */
const fs = require('fs');
const assert = require('assert/strict');
const {load, root} = require('./site-engine-harness.cjs');
const fixtures = JSON.parse(fs.readFileSync(__dirname + '/content-example-fixtures.json', 'utf8'));
let checkedResults = 0;
for (const fixture of fixtures) {
  const page = load(fixture.path, fixture.inputs);
  // Some engines initialize a date on load; the example uses the listed date.
  for (const [id, value] of Object.entries(fixture.inputs)) page.set(id, value);
  page.click();
  for (const [id, expected] of Object.entries(fixture.outputs)) {
    assert.equal(page.out(id), expected, fixture.path + ' example output ' + id);
    checkedResults++;
  }
  const html = fs.readFileSync(root + '/' + fixture.path, 'utf8');
  assert.ok(html.includes('Example inputs') && html.includes('Example results'), fixture.path + ' missing tables');
}
console.log(JSON.stringify({status:'passed', examplePages:fixtures.length, checkedResults}));
