/**
 * API Configuration — Single source of truth for the backend URL.
 *
 * In development:   window.__API_BASE_URL__ defaults to "/api"
 *                   (Vite's dev server proxies /api → http://127.0.0.1:8000)
 *
 * In production:    Set window.__API_BASE_URL__ before loading this script,
 *                   or the script reads from <meta name="api-base-url"> in HTML.
 *                   Example: <meta name="api-base-url" content="https://api.yourdomain.com/api">
 */
(function () {
  // Priority: 1) already set globally, 2) <meta> tag, 3) relative /api
  if (!window.__API_BASE_URL__) {
    var meta = document.querySelector('meta[name="api-base-url"]');
    window.__API_BASE_URL__ = meta ? meta.getAttribute('content') : '/api';
  }
})();
