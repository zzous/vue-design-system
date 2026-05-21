import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/** Storybook 및 로컬 Vite 미리보기용 (라이브러리 빌드는 vite.lib.config.ts) */
export default defineConfig({
  plugins: [vue()],
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:5]',
    },
  },
});
