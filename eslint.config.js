import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default [
  // ============================================
  // IGNORE PATTERNS
  // ============================================
  { ignores: ['dist'] },

  // ============================================
  // JAVASCRIPT FILES (.js, .jsx)
  // Configuration for existing JavaScript files during migration
  // ============================================
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // ============================================
  // TYPESCRIPT FILES (.ts, .tsx)
  // Configuration for TypeScript files (new and migrated)
  // ============================================
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.config.ts'], // ← Exclude config files (handled separately)
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Base JavaScript rules
      ...js.configs.recommended.rules,

      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // ============================================
      // CUSTOM TYPESCRIPT RULES
      // Lenient during migration, will tighten later
      // ============================================

      // Allow 'any' type during migration (will disable later)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Allow unused variables that start with underscore
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // Disable base rule in favor of TypeScript version
      'no-unused-vars': 'off',

      // Warn on @ts-ignore comments (should use @ts-expect-error instead)
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-ignore': 'allow-with-description',
          'ts-expect-error': 'allow-with-description',
        },
      ],
    },
  },

  // ============================================
  // CONFIG FILES (vite.config.ts, tailwind.config.ts, etc.)
  // Separate configuration for build tool config files
  // ============================================
  {
    files: ['**/*.config.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // ← Node.js environment (not browser)
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.node.json', // ← Use Node config!
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
