"""Check the visible result cells, separately from executing example formulas.

Run with Python's standard library: python tests/printed-example-contract.py
"""
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path


class ExampleCells(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.level = 0
        self.cell = None
        self.cells = []

    def handle_starttag(self, tag, attrs):
        if tag == 'section':
            if self.level:
                self.level += 1
            elif dict(attrs).get('id') == 'example':
                self.level = 1
        if self.level and tag == 'td':
            self.cell = []

    def handle_data(self, data):
        if self.cell is not None:
            self.cell.append(data)

    def handle_endtag(self, tag):
        if tag == 'td' and self.cell is not None:
            self.cells.append(' '.join(''.join(self.cell).split()))
            self.cell = None
        if tag == 'section' and self.level:
            self.level -= 1


root = Path(__file__).resolve().parent.parent
scope = set(json.loads((root/'tests/review470-scope.json').read_text()))
fixtures = [f for f in json.loads((root/'tests/content-example-fixtures.json').read_text())
            if f['path'] in scope]
checked = 0
for fixture in fixtures:
    parser = ExampleCells()
    parser.feed((root/fixture['path']).read_text())
    missing = Counter(fixture['outputs'].values()) - Counter(parser.cells)
    if missing:
        raise AssertionError(f"{fixture['path']}: missing printed values {dict(missing)}")
    checked += len(fixture['outputs'])
print(json.dumps({'status': 'passed', 'pages': len(fixtures), 'printedResults': checked}))
