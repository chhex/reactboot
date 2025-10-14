// frontend/vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load .env files (only VITE_* keys are exposed)
  const env = loadEnv(mode, process.cwd(), '');

  // Env knobs
  const useProxy = env.VITE_USE_PROXY === 'true';

  // Backend URL parts (used for proxy target if needed)
  const protocol = env.VITE_BACKEND_PROTOCOL || 'http';
  const host     = env.VITE_BACKEND_HOST || 'localhost';
  const port     = env.VITE_BACKEND_PORT || '8080';
  const backend  = env.VITE_BACKEND_URL || `${protocol}://${host}:${port}`;

  // Optional explicit API base ("/" or full URL)
  const baseEnv  = env.VITE_API_BASE;

  const ensureSlash = (s) => (s?.endsWith('/') ? s : s ? s + '/' : '/');

  // This is what your app will use (import.meta.env.VITE_API_BASE_RESOLVED)
  const API_BASE_RESOLVED = baseEnv
    ? ensureSlash(baseEnv)   // explicit wins
    : useProxy
      ? '/'                  // proxy → use same-origin paths
      : ensureSlash(backend);// no proxy → call backend directly

  // Base config
  const cfg = {
    plugins: [react()],
    server: { port: 5173 },
    build: { outDir: 'dist', emptyOutDir: true },

    // expose the resolved base to your app code
    define: {
      'import.meta.env.VITE_API_BASE_RESOLVED': JSON.stringify(API_BASE_RESOLVED),
    },
  };

  // Add proxy only when requested
  if (useProxy) {
    cfg.server.proxy = {
      // forward /clients → backend (adjust/add more paths as needed)
      '/clients': { target: backend, changeOrigin: true },
    };
  }

  return cfg;
});