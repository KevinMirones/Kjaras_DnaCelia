/**
 * components.js — Renderizado de secciones dinámicas
 */

import API from './api.js';

/* ─── Navbar ──────────────────────────────────────────────────── */
export function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.querySelector('.nav-drawer');
  const overlay   = document.querySelector('.nav-drawer-overlay');
  const links     = document.querySelectorAll('.nav-links a[data-section], .nav-drawer a[data-section]');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    overlay.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  overlay?.addEventListener('click', closeDrawer);

  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    hamburger?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Active link on scroll
  const sections = ['hero', 'menu', 'galeria', 'sobre-nosotros', 'ubicacion'];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => {
          a.classList.toggle('active', a.dataset.section === e.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[data-section]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(a.dataset.section);
      if (target) {
        closeDrawer();
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    });
  });
}


/* ─── Hero ────────────────────────────────────────────────────── */
export function renderHero() {
  const cfg = API.getConfig();

  // WhatsApp buttons
  const waLink = API.getWhatsAppLink();
  document.querySelectorAll('[data-wa-link]').forEach(el => {
    el.href = waLink;
  });

  // Animate embers
  const container = document.querySelector('.hero-embers');
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const e = document.createElement('div');
    e.className = 'ember';
    e.style.left  = `${Math.random() * 100}%`;
    e.style.setProperty('--dur',   `${4 + Math.random() * 7}s`);
    e.style.setProperty('--delay', `${Math.random() * 8}s`);
    e.style.width = e.style.height = `${2 + Math.random() * 3}px`;
    const hue = Math.random() > 0.5 ? '#D4A853' : '#E8591A';
    e.style.background = hue;
    container.appendChild(e);
  }
}


/* ─── Menú ────────────────────────────────────────────────────── */
export function renderMenu() {
  const tabsContainer = document.getElementById('menu-tabs');
  const gridContainer = document.getElementById('menu-grid');
  if (!tabsContainer || !gridContainer) return;

  const categorias = API.getCategorias();
  const productos  = API.getProductos();

  // Render tabs
  const allTab = createTab({ id: 'all', nombre: 'Todos', icono: '🍽️' }, true);
  tabsContainer.appendChild(allTab);

  categorias.forEach(cat => {
    tabsContainer.appendChild(createTab(cat, false));
  });

  // Render cards
  productos.forEach(p => {
    gridContainer.appendChild(createCard(p));
  });

  // Tab filter logic
  tabsContainer.addEventListener('click', e => {
    const tab = e.target.closest('.menu-tab');
    if (!tab) return;

    tabsContainer.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const catId = tab.dataset.cat;
    const cards = gridContainer.querySelectorAll('.menu-card');

    cards.forEach(card => {
      const show = catId === 'all' || card.dataset.cat === catId;
      card.classList.toggle('hidden', !show);

      // Stagger reveal
      if (show) {
        card.style.animationDelay = '0s';
        card.classList.remove('visible');
        requestAnimationFrame(() => card.classList.add('visible'));
      }
    });
  });
}

function createTab(cat, active) {
  const btn = document.createElement('button');
  btn.className = `menu-tab${active ? ' active' : ''}`;
  btn.dataset.cat = cat.id;
  btn.innerHTML = `<span class="menu-tab-icon">${cat.icono}</span>${cat.nombre}`;
  return btn;
}

function createCard(producto) {
  const link = API.getOrderLink(producto);
  const card = document.createElement('div');
  card.className = 'menu-card reveal';
  card.dataset.cat = producto.categoria;

  card.innerHTML = `
    <div class="card-top-bar"></div>
    <div class="card-image">
      <div class="card-image-placeholder">${getCatEmoji(producto.categoria)}</div>
      <span class="card-badge">${producto.badge}</span>
    </div>
    <div class="card-body">
      <div class="card-name">${producto.nombre}</div>
      <div class="card-desc">${producto.descripcion}</div>
      <div class="card-footer">
        <div class="card-price"><sup>Bs.</sup>${producto.precio}</div>
        <a href="${link}" target="_blank" rel="noopener">
          <button class="btn-order">Pedir →</button>
        </a>
      </div>
    </div>`;

  // Lazy-load image if provided
  if (producto.imagen) {
    const img = new Image();
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.onload = () => {
      const placeholder = card.querySelector('.card-image-placeholder');
      if (placeholder) placeholder.replaceWith(img);
    };
  }

  return card;
}

function getCatEmoji(catId) {
  const map = { kjaras: '🥩', costillas: '🍖', combos: '🍽️', bebidas: '🥤' };
  return map[catId] ?? '🍴';
}


/* ─── Galería ─────────────────────────────────────────────────── */
export function renderGaleria() {
  const grid = document.getElementById('galeria-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!grid) return;

  const items = API.getGaleria();

  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'gallery-item reveal';

    el.innerHTML = `
      <div class="gallery-item-placeholder">
        🍖<span>Foto ${i + 1}</span>
      </div>
      <div class="gallery-overlay">
        <div class="gallery-caption">${item.titulo}</div>
      </div>`;

    // Lazy-load
    if (item.imagen) {
      const img = new Image();
      img.src = item.imagen;
      img.alt = item.alt;
      img.onload = () => {
        const placeholder = el.querySelector('.gallery-item-placeholder');
        if (placeholder) placeholder.replaceWith(img);
      };
    }

    // Lightbox open
    el.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = item.imagen || '';
        lightboxImg.alt = item.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    grid.appendChild(el);
  });

  // Lightbox close
  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }
}


/* ─── Mapa ────────────────────────────────────────────────────── */
export function renderMapa() {
  const cfg = API.getConfig();

  // Inject map iframe
  const mapFrame = document.getElementById('map-iframe');
  if (mapFrame) {
    mapFrame.src = `https://maps.google.com/maps?q=${cfg.maps_embed_coords}&z=16&output=embed`;
  }

  // Maps button
  const mapsBtn = document.getElementById('btn-maps');
  if (mapsBtn) mapsBtn.href = cfg.maps_link;

  // Contact info
  const elPhone = document.getElementById('info-phone');
  if (elPhone) elPhone.textContent = cfg.telefono;

  const elAddr = document.getElementById('info-address');
  if (elAddr) elAddr.textContent = cfg.direccion;

  const elHorario = document.getElementById('info-horario');
  if (elHorario && cfg.horario) {
    elHorario.innerHTML = `${cfg.horario.dias}<br>${cfg.horario.apertura} – ${cfg.horario.cierre}`;
  }
}


/* ─── Footer ──────────────────────────────────────────────────── */
export function renderFooter() {
  const cfg    = API.getConfig();
  const waLink = API.getWhatsAppLink();

  document.querySelectorAll('[data-wa-link]').forEach(el => {
    el.href = waLink;
  });

  const year = document.getElementById('footer-year');
  if (year) year.textContent = new Date().getFullYear();
}
