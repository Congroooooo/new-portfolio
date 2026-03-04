import type { Config } from 'tailwindcss';

export default {
  // Content sources - Where Tailwind should look for class names
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  // Tailwind v4 Note: Most configuration is now done in CSS using @theme directive
  // See src/styles/globals.css for custom colors, fonts, animations, etc.
} satisfies Config;
