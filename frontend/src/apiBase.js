// src/apiBase.js
// Always ends with a trailing slash. Set by vite.config.js → define:{ VITE_API_BASE_RESOLVED: ... }
const raw = import.meta.env.VITE_API_BASE_RESOLVED;
// Fallback (defensive) if someone runs without the define:
const ensured = raw && raw.endsWith('/') ? raw : (raw ? raw + '/' : '/');

export const API_BASE = ensured;

// Optional: small join helper to avoid `//`
export const apiUrl = (path = '') =>
  API_BASE + String(path).replace(/^\/+/, '');