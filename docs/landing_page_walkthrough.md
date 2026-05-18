# 🌅 La Cañada Seafood — New Premium Landing Page & Corporate Pages

Following the corporate identity guidelines and established technical standards, we have created a complete corporate experience projecting an international export image, superior quality, and B2B trust.

---

## 🎨 Design Features
- **Global Aesthetic**: Minimalist design with ample visual space, inspired by premium global exporters and modern maritime branding.
- **Corporate Palette**: Absolute dominance of **Deep Navy Blue (#0B1F33)** and **Pure White**, with strategic accents of **Ocean Blue (#1D5C8C)** and **Coral Orange (#FF6A00)**.
- **Premium Typography**: Use of **Montserrat** for main headings, logos, and navigation, and **Inter** for informative content and technical specifications.
- **Cinematographic Images**: High-definition visual assets for the Hero (premium shrimp), About (traditional fisherman and vessel), and Products (sea cucumber, fish maw, etc.).

---

## 📂 Navigation Structure and Corporate Pages

The corporate site features fluid internal navigation and well-defined routes:

1. **Home (`/`)**: 
   - The brand's main showcase.
   - Presents the hero banner, history synopsis, general catalog, and global logistics solutions section.
2. **About Us (`/about`)**: 
   - Extended narrative on maritime heritage and commercial operations based in Mazatlán, Sinaloa.
   - Incorporates an interactive grid detailing corporate values: *Sustainability*, *Premium Quality*, and *Global Supply*.
3. **Products Catalog (`/products`)**:
   - Detailed premium catalog with descriptions and export specifications for Shrimp, Sea Cucumber, Fish Maw, Crab, and Wild Fish.
   - Direct links and clear invitations to the B2B Ecommerce Portal.
4. **Quality & Certifications (`/certifications`)**:
   - Technical space dedicated to detailing compliance with safety and sanitary control standards.
   - Highlights and describes safety certifications: **HACCP** (preventive analysis), **FDA Compliant** (US market), and **SENASICA** (Mexican federal standard).

---

## 🏗️ Refactoring and Code Architecture

To ensure visual consistency and comply with the project's decoupled architecture, we implemented the following structural improvements:

- **Reusable Components**:
  - `Header` (`@/shared/components/Header.tsx`): Dynamically manages scroll shadowing (`header--scrolled`) and elegantly highlights the active tab via the `activeLink` property.
  - `Footer` (`@/shared/components/Footer.tsx`): Structured in 6 columns aligned with the sitemap and contact details, facilitating centralized footer maintenance.
- **React/Next.js Standards Compliance**:
  - Removed all unescaped special characters in JSX (`Mexico's` -> `Mexico&apos;s`, `Let's` -> `Let&apos;s`) to ensure the Next.js compiler passes ESLint validation stages with **zero errors** across all modified files.
- **Asset Traceability**:
  - Integrated the new approved editorial image of the fisherman (`/images/about-fisherman.jpg`) to illustrate the company's maritime heritage in an extremely premium and authentic manner.

---
*This platform serves as the international face of La Cañada Seafood, ensuring a seamless transition to the B2B Portal and administrative dashboard.*
