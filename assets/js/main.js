/**
 * main.js — Punto de entrada de la aplicación
 * Orquesta la carga de datos y el renderizado de todos los componentes.
 */

import API from './api.js';
import {
  initNavbar,
  renderHero,
  renderMenu,
  renderGaleria,
  renderMapa,
  renderFooter,
} from './components.js';

/* ─── Loader ──────────────────────────────────────────────────── */
function hideLoader() {
  const loader = document.getElementById('app-loading');
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  }
}

/* ─── Scroll reveal ────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe all .reveal elements (including those added dynamically)
  function observeAll() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }

  // Observe initial elements
  observeAll();

  // Re-observe after dynamic content is rendered
  return observeAll;
}

/* ─── Smooth scroll for anchor buttons ─────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ─── Bootstrap ────────────────────────────────────────────────── */
async function boot() {
  try {
    // Load data
    await API.init();

    // Render all sections
    initNavbar();
    renderHero();
    renderMenu();
    renderGaleria();
    renderMapa();
    renderFooter();

    // Init interactions
    const observeAll = initScrollReveal();
    initSmoothScroll();

    // Re-observe after dynamic renders
    setTimeout(observeAll, 100);

    // Hide loader
    hideLoader();

  } catch (err) {
    console.error('[Kjaras] Error al inicializar:', err);
    hideLoader();

    // Graceful degradation: show static content
    document.body.classList.add('loaded');
  }
}

// Start
document.addEventListener('DOMContentLoaded', boot);
