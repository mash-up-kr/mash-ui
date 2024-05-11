import { defineConfig } from 'vitest/config';

import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
  },
});
