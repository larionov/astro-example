import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

import Inspect from 'vite-plugin-inspect';

import { viteMockServe } from 'vite-plugin-mock';

// https://astro.build/config
export default defineConfig({
  // Enable Vue to support Vue components.
  integrations: [vue()],

  vite: {
    plugins: [
      Inspect(),

      viteMockServe({
        mockPath: 'mock',
        localEnabled: true,
        prodEnabled: true,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer.js';
          setupProdMockServer();
        `,
      }),
    ],
  },
});
