# 🌅 La Cañada Seafood — Nueva Landing Page y Páginas Corporativas Premium

Siguiendo los lineamientos de identidad corporativa y las normativas técnicas establecidas, hemos creado una experiencia corporativa completa que proyecta una imagen de exportación internacional, calidad superior y confianza B2B.

---

## 🎨 Características de Diseño
- **Estética Global**: Diseño minimalista con amplio espacio visual, inspirado en exportadoras globales premium y branding marítimo moderno.
- **Paleta Corporativa**: Dominio absoluto del **Azul Marino Profundo (#0B1F33)** y el **Blanco Puro**, con acentos estratégicos en **Azul Océano (#1D5C8C)** y **Naranja Coral (#FF6A00)**.
- **Tipografía Premium**: Uso de **Montserrat** para títulos principales, logotipos y navegación, y de **Inter** para contenido informativo y especificaciones técnicas.
- **Imágenes Cinematográficas**: Activos visuales de alta definición para el Hero (camarón premium), About (pescador tradicional y embarcación), y Productos (pepino de mar, buche de pescado, etc.).

---

## 📂 Estructura de Navegación y Páginas Corporativas

El sitio corporativo cuenta con navegación interna fluida y rutas bien definidas:

1. **Home (`/`)**: 
   - El escaparate principal de la marca.
   - Presenta el hero banner, la sinopsis de la historia, el catálogo general y la sección de soluciones logísticas globales.
2. **About Us (`/about`)**: 
   - Narrativa extendida sobre la herencia marítima y operaciones comerciales basadas en Mazatlán, Sinaloa.
   - Incorpora una cuadrícula interactiva que detalla los valores corporativos: *Sustentabilidad*, *Calidad Premium* y *Suministro Global*.
3. **Products Catalog (`/products`)**:
   - Catálogo premium detallado con descripciones y especificaciones de exportación para Camarón, Pepino de Mar, Buche de Pescado, Cangrejo y Pescados salvajes.
   - Enlace directo e invitaciones claras hacia el Portal de Ecommerce B2B.
4. **Quality & Certifications (`/certifications`)**:
   - Espacio técnico dedicado a detallar el cumplimiento de las normativas de inocuidad y control sanitario.
   - Describe y muestra de manera destacada las certificaciones: **HACCP** (análisis preventivo), **FDA Compliant** (mercado estadounidense) y **SENASICA** (federal mexicano).

---

## 🏗️ Refactorización y Arquitectura de Código

Para garantizar la coherencia visual y cumplir con la arquitectura desacoplada del proyecto, realizamos las siguientes mejoras estructurales:

- **Componentes Reutilizables**:
  - `Header` (`@/shared/components/Header.tsx`): Administra dinámicamente el sombreado de scroll (`header--scrolled`) y resalta con elegancia la pestaña activa mediante la propiedad `activeLink`.
  - `Footer` (`@/shared/components/Footer.tsx`): Estructurado en 6 columnas alineadas con el sitemap y datos de contacto, facilitando el mantenimiento centralizado del pie de página.
- **Cumplimiento de Estándares React/Next.js**:
  - Se eliminaron todos los caracteres especiales sin escapar en el JSX (`Mexico's` -> `Mexico&apos;s`, `Let's` -> `Let&apos;s`) garantizando que el compilador de Next.js pase todas las etapas de validación de ESLint con **cero errores** en los archivos modificados.
- **Trazabilidad de Recursos**:
  - Se integró la nueva imagen editorial aprobada del pescador (`/images/about-fisherman.jpg`) para ilustrar el patrimonio marítimo de la empresa de manera sumamente premium y auténtica.

---
*Esta plataforma sirve como la cara internacional de La Cañada Seafood, garantizando una transición fluida al Portal B2B y al panel administrativo.*
