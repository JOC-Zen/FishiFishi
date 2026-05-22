# La Cañada Seafood – Landing Page Layout Documentation

## 📄 Purpose
This document describes **step by step** the layout that must be implemented for the corporate landing page of **La Cañada Seafood**. It includes:
- Section structure
- Colors, typography, and font sizes
- Spacing and alignments
- Responsive behavior
- Subtle animations with Framer Motion
- Visual reference (mock-up) for pixel-perfect verification.

---

## 🖼️ Visual Reference
> **Note:** The image below is the approved mock-up for the project. Use this design as the **sole** reference; **do not** reinterpret it.

![Landing page mockup](file:///C:/Users/urrac/.gemini/antigravity/brain/8c8c3ed4-684d-4db3-a7d7-d7ce15df7853/landing_page_full_1778961916248.png)

---

## 🎨 Color Palette
| Variable | Hex | Usage |
|---|---|---|
| `primary` | `#0B2C66` | Corporate blue (header, primary buttons, icons) |
| `secondary` | `#1E4D9B` | Secondary blue (hover, accent) |
| `bgGray` | `#F5F7FA` | Neutral section backgrounds |
| `textPrimary` | `#0F172A` | Primary text |
| `textSecondary` | `#475569` | Secondary text |
| `white` | `#FFFFFF` | General background |

---

## ✍️ Typography
- **Primary font:** `Inter` (loaded via Google Fonts). fallback: `Helvetica Neue`, `sans-serif`.
- **Serif font for the hero title:** `Playfair Display` (italic, weight 800).

| Element | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero title | `72px` | `800` | `0.95` | `-2%` |
| Section titles | `48px` | `700` | `1.1` | `normal` |
| Body text | `18px` | `400` | `1.7` | `normal` |
| Small labels | `12px` | `600` | `1` | `0.25em` (uppercase) |

---

## 📐 Layout Structure (Desktop ≥ 1024 px)

### 1️⃣ Header (Sticky)
- **Height:** `90px`.
- **Background:** translucent white (97% opacity) → solid on scroll, with a light shadow.
- **Layout (flex):**
  - **Left:** Logo (40 × 40 px box, `primary` border, *LC* initials). Logo text in `Montserrat`.
  - **Center:** Horizontal navigation with links:
    `HOME | ABOUT US | PRODUCTS | CERTIFICATIONS | ECOMMERCE`.
  - **Right:** CTA button `CONTACT SALES` (bg `primary`, hover → `secondary`). Language selector `EN`.
- **Interaction:** Smooth hover (0.25s). On scroll > 10 px, add `shadow-sm`.

### 2️⃣ Hero Section
- **Layout:** 2 columns (`flex`):
  - **Left column:** 40% – textual content.
  - **Right column:** 60% – full-height image.
- **Textual content:**
  - **Label** (p. small, `primary`). Text: *"PREMIUM MEXICAN SEAFOOD EXPORTERS"*.
  - **Title** (h1, `Playfair Display`, italic, 72 px) with exact line breaks:
    ```
    Worldwide
    Seafood
    Trading
    ```
  - **Subtext** (p, `body`). *"Supplying the finest quality seafood from Mexico to the world."*
  - **Buttons:**
    - Primary: `EXPLORE PRODUCTS →` (bg `primary`).
    - Secondary: `CONTACT SALES` (outline `primary`).
- **Image:** `hero-seafood.jpg` – premium shrimp on ice, occupies full height of the right column.
- **Animation:** Fade-up of the text block (`x: -30 → 0`, `opacity: 0 → 1`).

### 3️⃣ About Section
- **Layout:** 2-col grid (`grid-cols-2`).
- **Left:**
  - Label: *"ABOUT LA CAÑADA SEAFOOD"* (line + text).
  - Heading: *"Experience. Quality.\nGlobal Reach."* (48 px, bold).
  - Body copy (≈ 3-4 lines, `body`).
  - CTA link: `LEARN MORE ABOUT US →` (inline-flex, arrow).   
- **Right:** Image `about-vessel.jpg` with subtle overlay of map lines and points (logistics).
- **Animation:** Fade-up with `y:24 → 0`.

### 4️⃣ Products Section
- **Background:** white.
- **Centered header:** label *"OUR PRODUCTS"* + heading *"Premium Seafood, Responsibly Sourced"*.
- **Grid:** 6 cards in a row (`grid-cols-6`). Responsive: 3-col tablet, 2-col mobile.
- **Card:**
  - Image on top (3/4 aspect ratio, subtle gray border). Hover → zoom 1.06.
  - Title in uppercase.
  - Short description.
  - Circular button with arrow (hover → bg `primary`).
- **Bottom CTA:** centered, `ECOMMERCE →` button (bg `primary`).
- **Animation:** Each card with `stagger` (0.08s delay).

### 5️⃣ Export Solutions Section
- **Background:** `bgGray`.
- **Header:** label *"EXPORT SOLUTIONS"*, heading *"From Mexico to the World"*.
- **Icons:** 5 items in a row (`grid-cols-5`). Each icon is a linear SVG `stroke-primary`.
  - Global Shipping
  - Frozen Quality
  - Quality Control
  - Secure Packaging
  - Export Experts
- **Text:** uppercase title, short description.
- **Animation:** Fade-up with `stagger`.

### 6️⃣ Global Markets + Certifications (Duo Section)
- **Layout:** 2 columns.
- **Left (Markets):**
  - Label *"GLOBAL MARKETS"*.
  - Heading *"Our Products, Around the World"*.
  - CTA `EXPLORE OUR MARKETS →`.
  - Minimalist map (`world-map.svg`) with 0.45 opacity.
- **Right (Certifications):**
  - Label *"QUALITY & CERTIFICATIONS"*.
  - Heading *"Committed to Excellence"*.
  - Badges: HACCP, FDA, SENASICA (SVG logo inside a gray box). Spacing `gap-4`.
  - CTA `VIEW ALL CERTIFICATIONS →`.
- **Animation:** Fade-up of each block.

### 7️⃣ Final CTA Banner
- **Background:** blue `primary` with darkened marine photo (overlay `bg-blend-multiply`).
- **Text (left):**
  - Heading `30px` (white) – *"Looking for a reliable seafood supplier?"*.
  - Subtext `13px` – *"Let’s build a successful partnership."*.
- **Button (right):** `CONTACT OUR SALES TEAM` (bg white, text `primary`).
- **Padding:** `py-24`.

### 8️⃣ Footer
- **Background:** white, light gray top border.
- **Columns:** 6 (logo + 5 lists):
  - Company
  - Products
  - Certifications
  - Ecommerce
  - Contact
- **Typography:** `text-xs` gray `#9CA3AF`.
- **Bottom bar:** top line, copyright + socials (LinkedIn, Instagram) in SVG.
- **Ample spacing:** `gap-8`, `py-12`.

---

## 📱 Responsiveness
| Breakpoint | Main changes |
|------------|--------------------|
| **≥ 1024 px** (desktop) | Layout described above. |
| **640 – 1023 px** (tablet) | Header → hamburger (hides nav). Hero stacks (text top, image bottom). Products grid → 3 columns. Solutions/Duo grid → 3 columns. |
| **< 640 px** (mobile) | All sections stack vertically. Products → 2 columns (moves to 1 column on < 380 px). Text size reduces (hero ≈ 48 px, titles ≈ 32 px). |

---

## 🎞️ Animations (Framer Motion)
- **Hero text:** `initial:{opacity:0,x:-30}` → `animate:{opacity:1,x:0}` (0.7s).
- **Section fades:** `initial:{opacity:0,y:24}` → `whileInView:{opacity:1,y:0}` (0.55s) with `staggerChildren:0.1`.
- **Product cards hover:** `whileHover:{scale:1.02,y:-4}` + Tailwind `hover:shadow-subtle`.
- **Header scroll shadow:** `useEffect` that adds `shadow-sm` after passing 10 px.

---

## 📂 Assets (place in `public/images/`)
| Asset | Description |
|------|--------------|
| `hero-seafood.jpg` | Premium shrimp on ice (editorial). |
| `about-vessel.jpg` | Fishing vessel with subtle map. |
| `product-shrimp.jpg` ... `product-other-seafood.jpg` | Images of each category, neutral background. |
| `world-map.svg` | Minimalist map, connection lines. |
| `cta-bg.jpg` | Darkened marine photo (for the final banner). |

---

## ✅ Implementation Checklist
- [ ] **Tailwind config** with described colors, typography, and extensions.
- [ ] **Components** (`Header`, `Hero`, `About`, `Products`, `Solutions`, `Duo`, `CTA`, `Footer`) following exact classes.
- [ ] **Framer Motion** applied to indicated blocks.
- [ ] **Responsive**: Tailwind media queries (`md:`, `lg:`) and hamburger menu.
- [ ] **Accessibility:** `aria-label` in nav, visible focus, contrast ≥ 4.5.
- [ ] **SEO meta tags** (title, description, OG). 
- [ ] **Lighthouse** > 90 on all metrics.

---

**End of Document**. Use this file as the sole guide to build the La Cañada Seafood landing page.
