#!/usr/bin/env node
/**
 * inline-react.js
 * Replaces CDN React script tags with locally-bundled versions.
 * Run this ONCE after `npm install` to produce a fully offline app.
 * Output → www/index.html (Capacitor reads from webDir: 'www')
 */

const fs   = require('fs');
const path = require('path');

const SRC  = path.join(__dirname, '..', 'index.html');
const DEST = path.join(__dirname, '..', 'www', 'index.html');

if (!fs.existsSync(SRC)) {
  console.error('❌  index.html not found. Put paralegal-exam-sim.html here as index.html first.');
  process.exit(1);
}

// Resolve React from node_modules (must run after `npm install`)
let reactPath, reactDomPath;
try {
  reactPath    = require.resolve('react/umd/react.production.min.js');
  reactDomPath = require.resolve('react-dom/umd/react-dom.production.min.js');
} catch (e) {
  console.error('❌  React not found. Run `npm install` first.');
  process.exit(1);
}

const reactJs    = fs.readFileSync(reactPath, 'utf8');
const reactDomJs = fs.readFileSync(reactDomPath, 'utf8');

let html = fs.readFileSync(SRC, 'utf8');

const CDN_REACT     = '<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js" crossorigin></script>';
const CDN_REACT_DOM = '<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>';

if (!html.includes(CDN_REACT)) {
  console.log('ℹ️  React already inlined or CDN tags not found — skipping inline step.');
} else {
  html = html.replace(CDN_REACT,     `<script>/* React 18 — inlined for offline-first native app */\n${reactJs}</script>`);
  html = html.replace(CDN_REACT_DOM, `<script>/* ReactDOM 18 — inlined */\n${reactDomJs}</script>`);
  console.log('✅  React inlined from node_modules.');
}

// Also update the boot message now that we're fully offline
html = html.replace(
  '<small>Loading your study session…</small>',
  '<small>Starting up…</small>'
);

// Ensure www/ exists
fs.mkdirSync(path.join(__dirname, '..', 'www'), { recursive: true });
fs.writeFileSync(DEST, html, 'utf8');

const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(0);
console.log(`✅  www/index.html ready — ${kb} KB — fully offline, no CDN needed.`);
console.log('👉  Run: npx cap sync ios && npx cap open ios');
