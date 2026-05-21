import type { Meta, StoryObj } from '@storybook/vue3';
import { Icon } from './index';
import type { IconName } from './types';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

const commonIcons: IconName[] = [
  'search', 'plus', 'close', 'check', 'edit', 'trash',
  'user', 'settings', 'home', 'bell', 'calendar', 'download',
];

export const Default: Story = {
  render: () => ({
    components: { Icon },
    template: '<Icon name="search" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Icon },
    template: `
      <div style="display:flex;gap:16px;align-items:center;color:var(--color-neutral-700)">
        <Icon name="settings" size="xs" />
        <Icon name="settings" size="small" />
        <Icon name="settings" size="medium" />
        <Icon name="settings" size="large" />
        <Icon name="settings" size="xl" />
      </div>
    `,
  }),
};

export const Gallery: Story = {
  render: () => ({
    components: { Icon },
    setup() {
      return { commonIcons };
    },
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;color:var(--color-neutral-700)">
        <div v-for="name in commonIcons" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:56px">
          <Icon :name="name" size="large" />
          <span style="font-size:10px;color:var(--color-neutral-500)">{{ name }}</span>
        </div>
      </div>
    `,
  }),
};
