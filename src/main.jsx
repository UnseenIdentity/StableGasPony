// Node.js polyfills for Circle SDK - MUST be loaded first
import { Buffer } from 'buffer';
import util from 'util';
import process from 'process';

// Set global polyfills before any other modules load
window.Buffer = Buffer;
window.util = util;
window.process = process;

// Ensure process is available globally
if (typeof global === 'undefined') {
  window.global = window;
}

// Import React and other dependencies after polyfills
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);