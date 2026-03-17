# 🍖 Kjaras Doña Celia — Landing Page

Landing page profesional para negocio de comida boliviana.  
**Stack:** HTML5 · CSS3 · JavaScript (ES Modules) · JSON estático  
**Hosting:** GitHub Pages (gratis, permanente, sin servidor)

---

## 📁 Estructura del proyecto

```
kjaras-dona-celia/
│
├── index.html                  ← Página principal (HTML semántico)
│
├── data/                       ← "Backend" estático (JSON)
│   ├── menu.json               ← Productos, precios y categorías
│   └── config.json             ← Configuración del negocio y galería
│
└── assets/
    ├── css/
    │   ├── variables.css       ← Design tokens (colores, tipografía, espaciado)
    │   ├── base.css            ← Reset, tipografía y utilidades globales
    │   ├── sections.css        ← Navbar + Hero
    │   └── components.css      ← Menú, Galería, Mapa, Footer
    │
    ├── js/
    │   ├── api.js              ← Data layer (carga los JSON)
    │   ├── components.js       ← Renderizado dinámico de secciones
    │   └── main.js             ← Punto de entrada (orquestador)
    │
    └── images/                 ← Imágenes del negocio (agregar aquí)
        ├── kjaras-clasicas.jpg
        ├── costillas-brasa.jpg
        ├── combo-especial.jpg
        ├── galeria-1.jpg
        ├── galeria-2.jpg
        └── ...
```

---

## 🚀 Publicar en GitHub Pages

### Paso 1 — Crear repositorio
1. Ve a [github.com](https://github.com) → **New repository**
2. Nombre: `kjaras-dona-celia`
3. Visibilidad: **Public**
4. Haz clic en **Create repository**

### Paso 2 — Subir los archivos
**Opción A — Sin Git (más fácil):**
1. En el repo → **"Add file" → "Upload files"**
2. Arrastra TODA la carpeta del proyecto
3. Mensaje de commit: `"Landing page inicial"` → **Commit changes**

**Opción B — Con Git:**
```bash
cd kjaras-dona-celia
git init
git add .
git commit -m "Landing page inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/kjaras-dona-celia.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages
1. En el repo → **Settings ⚙️**
2. Panel izquierdo → **Pages**
3. Source → **"Deploy from a branch"**
4. Branch → **main** / **(root)**
5. → **Save**

### Paso 4 — ¡Listo! 🎉
Tu página estará en:
```
https://TU_USUARIO.github.io/kjaras-dona-celia/
```
*(Tarda 1–3 minutos la primera vez)*

---

## ✏️ Cómo personalizar

### Cambiar productos o precios
Edita `data/menu.json`:
```json
{
  "nombre": "Kjaras Clásicas",
  "precio": 35,
  "descripcion": "Tu descripción aquí...",
  "badge": "⭐ Estrella"
}
```

### Cambiar datos del negocio (teléfono, horario, etc.)
Edita `data/config.json`:
```json
{
  "negocio": {
    "whatsapp": "59160041870",
    "horario": { "dias": "Lunes – Sábado", "apertura": "7:00 AM", "cierre": "6:00 PM" }
  }
}
```

### Agregar imágenes reales
1. Pon tus fotos en `assets/images/`
2. En `data/menu.json`, actualiza el campo `"imagen"`:
   ```json
   "imagen": "assets/images/kjaras-clasicas.jpg"
   ```
3. En `data/config.json`, actualiza la galería:
   ```json
   "imagen": "assets/images/galeria-1.jpg"
   ```

### Actualizar la ubicación en el mapa
1. Ve a [Google Maps](https://maps.google.com) → busca tu local
2. Clic derecho en el punto → **"¿Qué hay aquí?"** → copia las coordenadas
3. En `data/config.json`:
   ```json
   "maps_embed_coords": "-16.4923,-68.1341",
   "maps_link": "https://maps.app.goo.gl/TU_LINK"
   ```

---

## 🧪 Probar localmente

> ⚠️ Por usar ES Modules (`import/export`), necesitas un servidor HTTP local. No funciona abriendo `index.html` directamente.

**Con Python (recomendado):**
```bash
cd kjaras-dona-celia
python -m http.server 8000
# Abre: http://localhost:8000
```

**Con Node.js:**
```bash
npx serve .
```

**Con VS Code:**
Instala la extensión **"Live Server"** → clic derecho en `index.html` → "Open with Live Server"

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 semántico | Estructura accesible |
| CSS3 + Custom Properties | Estilos con design tokens |
| JavaScript ES Modules | Lógica modular sin bundler |
| JSON estático | Datos del negocio (menú, config) |
| Google Fonts | Tipografía (Cormorant + DM Sans) |
| Intersection Observer API | Animaciones al hacer scroll |
| GitHub Pages | Hosting gratuito y permanente |
