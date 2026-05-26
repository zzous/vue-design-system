import type { Meta, StoryObj } from '@storybook/vue3';
import { SButton } from './index';

const meta: Meta<typeof SButton> = {
  title: 'Components/Button',
  component: SButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
    size:    { control: 'select', options: ['small', 'medium', 'large'] },
    loading:   { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled:  { control: 'boolean' },
    type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    loading: false,
    fullWidth: false,
    disabled: false,
    type: 'button',
  },
};

export default meta;
type Story = StoryObj<typeof SButton>;

export const Default: Story = {
  render: (args) => ({
    components: { SButton },
    setup() { return { args }; },
    template: '<SButton v-bind="args">버튼</SButton>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { SButton },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <SButton variant="primary">Primary</SButton>
        <SButton variant="secondary">Secondary</SButton>
        <SButton variant="outline">Outline</SButton>
        <SButton variant="ghost">Ghost</SButton>
        <SButton variant="danger">Danger</SButton>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { SButton },
    template: `
      <div style="display:flex;gap:8px;align-items:center">
        <SButton size="small">Small</SButton>
        <SButton size="medium">Medium</SButton>
        <SButton size="large">Large</SButton>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { SButton },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <SButton loading>처리 중</SButton>
        <SButton disabled>비활성</SButton>
        <SButton full-width style="max-width:240px">Full Width</SButton>
      </div>
    `,
  }),
};