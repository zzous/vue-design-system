import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';

/** GitHub Pages 프로젝트 사이트: https://zzous.github.io/vue-design-system/ */
const GITHUB_PAGES_BASE = '/vue-design-system/';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    const base =
      process.env.STORYBOOK_BASE_PATH ??
      (process.env.GITHUB_ACTIONS ? GITHUB_PAGES_BASE : '/');
    return mergeConfig(config, { base });
  },
};

export default config;
