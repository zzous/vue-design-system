import type { Meta, StoryObj } from '@storybook/vue3';
import { SChip } from './index';

const meta: Meta<typeof SChip> = {
  title: 'Components/Chip',
  component: SChip,
  tags: ['autodocs'],
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] },
    size:     { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'neutral',
    size: 'medium',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SChip>;

export const Default: Story = {
  render: (args) => ({
    components: { SChip },
    setup() { return { args }; },
    template: '<SChip v-bind="args">태그</SChip>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { SChip },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <SChip variant="primary">Primary</SChip>
        <SChip variant="secondary">Secondary</SChip>
        <SChip variant="success">Success</SChip>
        <SChip variant="warning">Warning</SChip>
        <SChip variant="error">Error</SChip>
        <SChip variant="info">Info</SChip>
        <SChip variant="neutral">Neutral</SChip>
      </div>
    `,
  }),
};

export const Closable: Story = {
  render: () => ({
    components: { SChip },
    setup() {
      const onClose = () => alert('닫기');
      return { onClose };
    },
    template: '<SChip :on-close="onClose">삭제 가능</SChip>',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { SChip },
    template: '<SChip disabled>비활성</SChip>',
  }),
};