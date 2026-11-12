import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { installImageFallback } from './utils/optimizeImage';
import { parseLocation } from './routing';
import { initAnalytics } from './analytics';

installImageFallback();
initAnalytics();

const container = document.getElementById('root')!;
const initialRoute = parseLocation(window.location.pathname, window.location.search);
const app = (
  <StrictMode>
    <App initialRoute={initialRoute} />
  </StrictMode>
);

// Pages are pre-rendered to HTML at build time: hydrate when markup is present.
// A legacy ?category= link arrives on the pre-rendered home page but resolves to a
// different route, so render fresh instead of hydrating mismatched markup.
const prerenderedPath = container.getAttribute('data-path');
if (container.hasChildNodes() && prerenderedPath === window.location.pathname && !window.location.search) {
  hydrateRoot(container, app);
} else {
  container.innerHTML = '';
  createRoot(container).render(app);
}
