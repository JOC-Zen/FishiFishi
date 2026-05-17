/** @type {import('next').NextConfig} */
const nextConfigZoho = {
  /**
   * Enable Static Export for Zoho CRM Widgets.
   * This generates a standalone folder with HTML/CSS/JS.
   */
  output: 'export',

  /**
   * Disable standard image optimization.
   * Zoho widgets run in a static environment where the Next.js
   * optimization server is not available.
   */
  images: {
    unoptimized: true,
  },

  /**
   * Dist folder name.
   * Changed to 'out-zoho' to distinguish from standard builds.
   */
  distDir: 'out-zoho',

  /**
   * Strict mode for better stability.
   */
  reactStrictMode: true,

  /**
   * Optional: If the widget is hosted in a subdirectory within Zoho.
   * assetPrefix: './',
   */
};

export default nextConfigZoho;
