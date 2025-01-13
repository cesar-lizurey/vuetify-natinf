import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'VuetifyNATINF',
      fileName: (format) => `vuetify-natinf.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'vuetify'],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify'
        }
      },
      exports: 'named'
    }
  },
  plugins: [vue()]
});