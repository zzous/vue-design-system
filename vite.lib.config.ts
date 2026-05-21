import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src', 'env.d.ts'],
      exclude: ['src/**/*.stories.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', '@vuepic/vue-datepicker'],
      output: {
        assetFileNames: 'index.[ext]',
      },
    },
    cssMinify: true,
    sourcemap: true,
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:5]',
    },
  },
});
