import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

import registerModule from './register-form.js';

export function setupProdMockServer() {
  createProdMockServer([...registerModule]);
}
