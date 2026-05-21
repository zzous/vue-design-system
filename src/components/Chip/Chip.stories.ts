import type { Meta, StoryObj } from '@storybook/vue3';
import { Chip } from './index';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: () => ({
    components: { Chip },
    template: '<Chip>태그</Chip>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <Chip variant="primary">Primary</Chip>
        <Chip variant="secondary">Secondary</Chip>
        <Chip variant="success">Success</Chip>
        <Chip variant="warning">Warning</Chip>
        <Chip variant="error">Error</Chip>
        <Chip variant="info">Info</Chip>
        <Chip variant="neutral">Neutral</Chip>
      </div>
    `,
  }),
};

export const Closable: Story = {
  render: () => ({
    components: { Chip },
    setup() {
      const onClose = () => alert('닫기');
      return { onClose };
    },
    template: '<Chip :on-close="onClose">삭제 가능</Chip>',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Chip },
    template: '<Chip disabled>비활성</Chip>',
  }),
};
