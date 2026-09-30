# Risk Calculator (PWA)

A clean, minimal **risk calculator** as an installable Progressive Web App.
Plain HTML / CSS / vanilla JavaScript — no framework, no backend, no build step.

## Features

- **Inputs**: Capital, Risk %, Stop Loss (pips), Pip Value per Lot
- **Live outputs**: Risk Amount, Pip Value, Lot Size — update as you type
- **Validation**: empty/zero/invalid inputs show "-", no errors or crashes
- **Persistence**: last values saved in localStorage
- **Dark / Light** theme following system preference
- **Fully offline** via Service Worker
- **Installable** on Android & iOS

## File Structure

```
├── index.html
├── styles.css
├── calculator.js
├── app.js
├── sw.js
├── manifest.json
├── icons/
│   ├── icon.svg
│   ├── icon-192.png
│   └── icon-512.png
├── test-calculator.js
└── README.md
```

## Run Locally

```bash
python -m http.server 8000
```

Open http://localhost:8000

## Tests

```bash
node test-calculator.js
```

| Capital | Risk | Stop | Pip Value | Risk $ | Pip | Lot |
|---|---|---|---|---|---|---|
| 10000 | 1% | 6 | 10 | $100 | 16.67 | **1.67** |

## Publish on GitHub Pages

1. Create a repo, upload all files
2. **Settings → Pages → Deploy from a branch → main → Save**
3. Live at `https://<username>.github.io/<repo>/`

## Install on Android

1. Open in Chrome → ⋮ menu → **Add to Home screen**

## Install on iOS

1. Open in Safari → Share → **Add to Home Screen**

## Formula

```
riskUsd  = capital × riskPercent / 100
pipValue = riskUsd / stopPips
lotSize  = pipValue / lotPipValue
```
