import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {},
  render: () => ({
    components: { Button },
    template: '<Button variant="primary">Primary</Button>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <Button loading>처리 중</Button>
        <Button disabled>비활성</Button>
        <Button full-width style="max-width:240px">Full Width</Button>
      </div>
    `,
  }),
};
