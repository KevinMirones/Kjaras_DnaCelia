/**
 * api.js — Data layer
 * Carga los JSON locales y expone métodos para consumirlos.
 * En el futuro se puede reemplazar por fetch() a un backend real.
 */

const API = (() => {
  let _menu   = null;
  let _config = null;

  /** Carga ambos JSON en paralelo */
  async function init() {
    const [menuRes, configRes] = await Promise.all([
      fetch('data/menu.json'),
      fetch('data/config.json'),
    ]);

    if (!menuRes.ok || !configRes.ok) {
      throw new Error('No se pudieron cargar los datos del negocio.');
    }

    _menu   = await menuRes.json();
    _config = await configRes.json();
  }

  /** Retorna la configuración del negocio */
  function getConfig() {
    return _config?.negocio ?? {};
  }

  /** Retorna todas las categorías */
  function getCategorias() {
    return _menu?.categorias ?? [];
  }

  /** Retorna todos los productos (o filtrados por categoría) */
  function getProductos(categoriaId = null) {
    const todos = _menu?.productos ?? [];
    if (!categoriaId) return todos;
    return todos.filter(p => p.categoria === categoriaId);
  }

  /** Retorna los productos destacados */
  function getDestacados() {
    return (_menu?.productos ?? []).filter(p => p.destacado);
  }

  /** Retorna los items de galería */
  function getGaleria() {
    return _config?.galeria ?? [];
  }

  /** Construye un link de WhatsApp con mensaje personalizado */
  function getWhatsAppLink(mensaje = null) {
    const cfg = getConfig();
    const msg = encodeURIComponent(mensaje ?? cfg.whatsapp_mensaje ?? 'Hola, quiero hacer un pedido');
    return `https://wa.me/${cfg.whatsapp}?text=${msg}`;
  }

  /** Construye un link de pedido para un producto específico */
  function getOrderLink(producto) {
    return getWhatsAppLink(
      `Hola Doña Celia, quiero pedir: *${producto.nombre}* (${formatPrice(producto.precio)}) 🍖`
    );
  }

  /** Formatea precio en bolivianos */
  function formatPrice(precio) {
    return `Bs. ${precio}`;
  }

  return { init, getConfig, getCategorias, getProductos, getDestacados, getGaleria, getWhatsAppLink, getOrderLink, formatPrice };
})();

export default API;
