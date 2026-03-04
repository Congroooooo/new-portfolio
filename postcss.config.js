// PostCSS Configuration
// This tells Vite how to process CSS files

export default {
  plugins: {
    // 1️⃣ Tailwind CSS - Processes @tailwind directives
    // Converts utility classes to actual CSS
    '@tailwindcss/postcss': {},

    // 2️⃣ Autoprefixer - Adds vendor prefixes for browser compatibility
    // Example: display: flex → display: -webkit-box; display: flex;
    autoprefixer: {},
  },
};
