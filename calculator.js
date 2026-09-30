/* ============================================================
   calculator.js — pure calculation logic (no DOM)
   ============================================================ */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Calc = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function calculate(input) {
    const capital = num(input.capital);
    const riskPercent = num(input.riskPercent);
    const stopPips = num(input.stopPips);
    const lotPipValue = num(input.lotPipValue);

    if (!capital || !riskPercent || !stopPips || !lotPipValue) return null;
    if (capital <= 0 || riskPercent <= 0 || stopPips <= 0 || lotPipValue <= 0) return null;

    const riskUsd = capital * riskPercent / 100;
    const pipValue = riskUsd / stopPips;
    const lotSize = pipValue / lotPipValue;

    return { riskUsd, pipValue, lotSize };
  }

  function num(v) {
    if (v == null) return NaN;
    const n = typeof v === 'number' ? v : parseFloat(String(v).replace(/[,\s]/g, ''));
    return isFinite(n) ? n : NaN;
  }

  return { calculate, num };
});
