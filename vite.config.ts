/// <reference types="vitest" />
/// <reference types="Vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/graphiql-app',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './src/tests/coverage',
      all: true,
      include: ['**/*.tsx'],
      exclude: ['src/main.tsx'],
    },
  },
});
