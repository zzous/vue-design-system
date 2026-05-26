import type { Meta, StoryObj } from '@storybook/vue3';
import { SBadge } from './index';

const meta: Meta<typeof SBadge> = {
  title: 'Components/Badge',
  component: SBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] },
    size:    { control: 'select', options: ['small', 'medium', 'large'] },
    dot:     { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    dot: false,
  },
};

export default meta;
type Story = StoryObj<typeof SBadge>;

export const Default: Story = {
  render: (args) => ({
    components: { SBadge },
    setup() { return { args }; },
    template: '<SBadge v-bind="args">기본</SBadge>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { SBadge },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <SBadge variant="primary">Primary</SBadge>
        <SBadge variant="secondary">Secondary</SBadge>
        <SBadge variant="success">Success</SBadge>
        <SBadge variant="warning">Warning</SBadge>
        <SBadge variant="error">Error</SBadge>
        <SBadge variant="info">Info</SBadge>
        <SBadge variant="neutral">Neutral</SBadge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { SBadge },
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <SBadge size="small">Small</SBadge>
        <SBadge size="medium">Medium</SBadge>
        <SBadge size="large">Large</SBadge>
      </div>
    `,
  }),
};

export const WithDot: Story = {
  render: () => ({
    components: { SBadge },
    template: '<SBadge variant="success" dot>운영중</SBadge>',
  }),
};