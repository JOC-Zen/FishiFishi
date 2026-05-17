# La Cañada Seafood – Landing Page Layout Documentation

## 📄 Propósito
Este documento describe **paso a paso** el layout que debe implementarse para la página de inicio corporativa de **La Cañada Seafood**.  Incluye:
- Estructura de secciones
- Colores, tipografía y tamaños de fuente
- Espaciados y alineaciones
- Comportamiento responsive
- Animaciones sutiles con Framer Motion
- Referencia visual (mock‑up) para verificación pixel‑perfecta.

---

## 🖼️ Referencia visual
> **Nota:** la imagen a continuación es el mock‑up aprobado para el proyecto.  Use este diseño como **única** referencia; **no** realice reinterpretaciones.

![Landing page mockup](file:///C:/Users/urrac/.gemini/antigravity/brain/8c8c3ed4-684d-4db3-a7d7-d7ce15df7853/landing_page_full_1778961916248.png)

---

## 🎨 Paleta de colores
| Variable | Hex | Uso |
|---|---|---|
| `primary` | `#0B2C66` | Azul corporativo (header, botones primary, íconos) |
| `secondary` | `#1E4D9B` | Azul secundario (hover, accent) |
| `bgGray` | `#F5F7FA` | Fondos de secciones neutras |
| `textPrimary` | `#0F172A` | Texto principal |
| `textSecondary` | `#475569` | Texto secundario |
| `white` | `#FFFFFF` | Fondo general |

---

## ✍️ Tipografía
- **Fuente principal:** `Inter` (cargada vía Google Fonts).  fallback: `Helvetica Neue`, `sans‑serif`.
- **Fuente serif para el título hero:** `Playfair Display` (italic, weight 800).

| Elemento | Tamaño | Peso | Line‑height | Letter‑spacing |
|---|---|---|---|---|
| Hero title | `72px` | `800` | `0.95` | `-2%` |
| Section titles | `48px` | `700` | `1.1` | `normal` |
| Body text | `18px` | `400` | `1.7` | `normal` |
| Small labels | `12px` | `600` | `1` | `0.25em` (uppercase) |

---

## 📐 Estructura del layout (desktop ≥ 1024 px)

### 1️⃣ Header (Sticky)
- **Altura:** `90px`.
- **Fondo:** blanco translúcido (opacidad 97 %) → sólido al hacer scroll, con sombra ligera.
- **Distribución (flex):**
  - **Izquierda:** Logo (caja 40 × 40 px, borde `primary`, iniciales *LC*).  Texto logo en `Montserrat`.
  - **Centro:** Navegación horizontal con enlaces:
    `HOME | ABOUT US | PRODUCTS | CERTIFICATIONS | ECOMMERCE`.
  - **Derecha:** Botón CTA `CONTACT SALES` (bg `primary`, hover → `secondary`).  Selector de idioma `EN`.
- **Interacción:** Hover suave (0.25 s).  En scroll > 10 px se agrega `shadow-sm`.

### 2️⃣ Hero Section
- **Layout:** 2 columnas (`flex`):
  - **Columna izq.** 40 % – contenido textual.
  - **Columna der.** 60 % – imagen full‑height.
- **Contenido textual:**
  - **Label** (p. small, `primary`).  Texto: *"PREMIUM MEXICAN SEAFOOD EXPORTERS"*.
  - **Título** (h1, `Playfair Display`, italic, 72 px) con saltos de línea exactos:
    ```
    Worldwide
    Seafood
    Trading
    ```
  - **Subtexto** (p, `body`).  *"Supplying the finest quality seafood from Mexico to the world."*
  - **Botones:**
    - Primary: `EXPLORE PRODUCTS →` (bg `primary`).
    - Secondary: `CONTACT SALES` (outline `primary`).
- **Imagen:** `hero‑seafood.jpg` – camarones sobre hielo, ocupa toda la altura de la columna derecha.
- **Animación:** Fade‑up del bloque de texto (`x: -30 → 0`, `opacity: 0 → 1`).

### 3️⃣ About Section
- **Layout:** Grid 2‑col (`grid-cols-2`).
- **Izquierda:**
  - Label: *"ABOUT LA CAÑADA SEAFOOD"* (line + text).
  - Heading: *"Experience. Quality.\nGlobal Reach."* (48 px, bold).
  - Body copy (≈ 3‑4 líneas, `body`).
  - CTA link: `LEARN MORE ABOUT US →` (inline‑flex, arrow).   
- **Derecha:** Imagen `about‑vessel.jpg` con superposición sutil de líneas de mapa y puntos (logística).
- **Animación:** Fade‑up con `y:24 → 0`.

### 4️⃣ Products Section
- **Fondo:** blanco.
- **Encabezado central:** label *"OUR PRODUCTS"* + heading *"Premium Seafood, Responsibly Sourced"*.
- **Grid:** 6 tarjetas en fila (`grid-cols-6`).  Responsive: 3‑col tablet, 2‑col mobile.
- **Tarjeta:**
  - Imagen arriba (aspect 3/4, borde gris tenue).  Hover → zoom 1.06.
  - Título en mayúsculas.
  - Descripción corta.
  - Botón circular con flecha (hover → bg `primary`).
- **CTA inferior:** centrado, botón `ECOMMERCE →` (bg `primary`).
- **Animación:** Cada tarjeta con `stagger` (delay 0.08 s).

### 5️⃣ Export Solutions Section
- **Fondo:** `bgGray`.
- **Header:** label *"EXPORT SOLUTIONS"*, heading *"From Mexico to the World"*.
- **Íconos:** 5 items en fila (`grid-cols-5`). Cada ícono es SVG lineal `stroke-primary`.
  - Global Shipping
  - Frozen Quality
  - Quality Control
  - Secure Packaging
  - Export Experts
- **Texto:** título uppercase, descripción corta.
- **Animación:** Fade‑up con `stagger`.

### 6️⃣ Global Markets + Certifications (Duo Section)
- **Layout:** 2 columnas.
- **Left (Markets):**
  - Label *"GLOBAL MARKETS"*.
  - Heading *"Our Products, Around the World"*.
  - CTA `EXPLORE OUR MARKETS →`.
  - Mapa minimalista (`world‑map.svg`) con opacidad 0.45.
- **Right (Certifications):**
  - Label *"QUALITY & CERTIFICATIONS"*.
  - Heading *"Committed to Excellence"*.
  - Badges: HACCP, FDA, SENASICA (SVG logo dentro de caja gris).  Espaciado `gap‑4`.
  - CTA `VIEW ALL CERTIFICATIONS →`.
- **Animación:** Fade‑up de cada bloque.

### 7️⃣ Final CTA Banner
- **Fondo:** azul `primary` con foto marina oscurecida (overlay `bg‑blend‑multiply`).
- **Texto (izquierda):**
  - Heading `30px` (white) – *"Looking for a reliable seafood supplier?"*.
  - Subtexto `13px` – *"Let’s build a successful partnership."*.
- **Botón (derecha):** `CONTACT OUR SALES TEAM` (bg white, text `primary`).
- **Padding:** `py-24`.

### 8️⃣ Footer
- **Fondo:** blanco, borde superior gris claro.
- **Columnas:** 6 (logo + 5 listas):
  - Company
  - Products
  - Certifications
  - Ecommerce
  - Contact
- **Tipografía:** `text-xs` gris `#9CA3AF`.
- **Bottom bar:** línea superior, copyright + redes (LinkedIn, Instagram) en SVG.
- **Espaciado amplio:** `gap‑8`, `py‑12`.

---

## 📱 Responsividad
| Breakpoint | Cambios principales |
|------------|--------------------|
| **≥ 1024 px** (desktop) | Layout descrito arriba. |
| **640 – 1023 px** (tablet) | Header → hamburger (oculta nav).  Hero se apila (texto arriba, imagen abajo).  Products grid → 3 columnas.  Solutions/Duo grid → 3 columnas. |
| **< 640 px** (mobile) | Todas las secciones se apilan verticalmente.  Products → 2 columnas (ult. pasa a 1 columna en < 380 px).  Texto reduce tamaño (hero ≈ 48 px, titles ≈ 32 px). |

---

## 🎞️ Animaciones (Framer Motion)
- **Hero text:** `initial:{opacity:0,x:-30}` → `animate:{opacity:1,x:0}` (0.7 s).
- **Section fades:** `initial:{opacity:0,y:24}` → `whileInView:{opacity:1,y:0}` (0.55 s) con `staggerChildren:0.1`.
- **Product cards hover:** `whileHover:{scale:1.02,y:-4}` + Tailwind `hover:shadow-subtle`.
- **Header scroll shadow:** `useEffect` que añade `shadow-sm` al pasar 10 px.

---

## 📂 Assets (colocar en `public/images/`)
| Asset | Descripción |
|------|--------------|
| `hero‑seafood.jpg` | Camarones premium sobre hielo (editorial). |
| `about‑vessel.jpg` | Barco pesquero con mapa tenue. |
| `product‑shrimp.jpg` … `product‑other‑seafood.jpg` | Imágenes de cada categoría, fondo neutro. |
| `world‑map.svg` | Mapa minimalista, líneas de conexión. |
| `cta‑bg.jpg` | Foto marina oscurecida (para el banner final). |

---

## ✅ Checklist de implementación
- [ ] **Tailwind config** con colores, tipografías y extensiones descritas.
- [ ] **Componentes** (`Header`, `Hero`, `About`, `Products`, `Solutions`, `Duo`, `CTA`, `Footer`) siguiendo las clases exactas.
- [ ] **Framer Motion** aplicado a los bloques indicados.
- [ ] **Responsive**: media queries de Tailwind (`md:`, `lg:`) y menú hamburguesa.
- [ ] **Accesibilidad:** `aria-label` en nav, foco visible, contraste ≥ 4.5.
- [ ] **SEO meta tags** (title, description, OG). 
- [ ] **Lighthouse** > 90 en todas las métricas.

---

**Fin del documento**.  Utilice este archivo como guía única para construir la landing page de La Cañada Seafood.
