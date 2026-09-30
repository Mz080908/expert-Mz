/* ============================================================
   app.js — UI wiring: live calculation, localStorage, animations
   ============================================================ */
(function () {
  'use strict';

  const $ = id => document.getElementById(id);
  const inputs = {
    capital: $('capital'),
    riskPercent: $('riskPercent'),
    stopPips: $('stopPips'),
    lotPipValue: $('lotPipValue'),
  };
  const outputs = {
    riskUsd: $('outRisk'),
    pipValue: $('outPip'),
    lotSize: $('outLot'),
  };
  const STORAGE_KEY = 'risk-calc-v2';

  // Animate number changes
  function animateValue(el, newText) {
    if (el.textContent === newText) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(4px)';
    setTimeout(() => {
      el.textContent = newText;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 120);
  }

  function fmt(n) {
    return '$' + n.toFixed(2);
  }

  function render() {
    const result = Calc.calculate({
      capital: inputs.capital.value,
      riskPercent: inputs.riskPercent.value,
      stopPips: inputs.stopPips.value,
      lotPipValue: inputs.lotPipValue.value,
    });

    if (!result) {
      animateValue(outputs.riskUsd, '-');
      animateValue(outputs.pipValue, '-');
      animateValue(outputs.lotSize, '-');
      return;
    }

    animateValue(outputs.riskUsd, fmt(result.riskUsd));
    animateValue(outputs.pipValue, fmt(result.pipValue));
    animateValue(outputs.lotSize, result.lotSize.toFixed(2));
  }

  function save() {
    const data = {
      capital: inputs.capital.value,
      riskPercent: inputs.riskPercent.value,
      stopPips: inputs.stopPips.value,
      lotPipValue: inputs.lotPipValue.value,
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function load() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) {}
    if (!data) return;
    if (data.capital != null) inputs.capital.value = data.capital;
    if (data.riskPercent != null) inputs.riskPercent.value = data.riskPercent;
    if (data.stopPips != null) inputs.stopPips.value = data.stopPips;
    if (data.lotPipValue != null) inputs.lotPipValue.value = data.lotPipValue;
  }

  // Events
  Object.values(inputs).forEach(el => {
    el.addEventListener('input', () => { render(); save(); });
    el.addEventListener('focus', () => {
      el.parentElement.parentElement.classList.add('focused');
    });
    el.addEventListener('blur', () => {
      el.parentElement.parentElement.classList.remove('focused');
    });
  });

  // Service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  // Init
  load();
  render();
})();
