/* ============================================================
   test-calculator.js — unit tests for calculator.js
   Run with:  node test-calculator.js
   ============================================================ */
'use strict';
const Calc = require('./calculator.js');

let passed = 0, failed = 0;

function approx(a, b, tol) { return Math.abs(a - b) <= tol; }
function eq(a, b) { return a === b; }

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ✓ ' + name);
  } catch (e) {
    failed++;
    console.error('  ✗ ' + name + '\n      ' + e.message);
  }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || 'assertion failed'); }

console.log('Risk Calculator — unit tests\n');

console.log('Required case:');

test('capital 10000, risk 1%, stop 6, pipValue 10 → risk $100, pip 16.67, lot 1.67', () => {
  const r = Calc.calculate({ capital: 10000, riskPercent: 1, stopPips: 6, lotPipValue: 10 });
  assert(eq(r.riskUsd, 100), 'riskUsd=' + r.riskUsd);
  assert(approx(r.pipValue, 16.67, 0.01), 'pipValue=' + r.pipValue);
  assert(approx(r.lotSize, 1.67, 0.01), 'lotSize=' + r.lotSize);
});

console.log('\nEdge cases:');

test('empty input → null', () => {
  assert(eq(Calc.calculate({ capital: '', riskPercent: 1, stopPips: 6, lotPipValue: 10 }), null));
});

test('zero capital → null', () => {
  assert(eq(Calc.calculate({ capital: 0, riskPercent: 1, stopPips: 6, lotPipValue: 10 }), null));
});

test('zero risk → null', () => {
  assert(eq(Calc.calculate({ capital: 10000, riskPercent: 0, stopPips: 6, lotPipValue: 10 }), null));
});

test('zero stop → null', () => {
  assert(eq(Calc.calculate({ capital: 10000, riskPercent: 1, stopPips: 0, lotPipValue: 10 }), null));
});

test('zero lotPipValue → null', () => {
  assert(eq(Calc.calculate({ capital: 10000, riskPercent: 1, stopPips: 6, lotPipValue: 0 }), null));
});

test('invalid string → null', () => {
  assert(eq(Calc.calculate({ capital: 'abc', riskPercent: 1, stopPips: 6, lotPipValue: 10 }), null));
});

test('negative values → null', () => {
  assert(eq(Calc.calculate({ capital: -1000, riskPercent: 1, stopPips: 6, lotPipValue: 10 }), null));
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
