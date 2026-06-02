import type { Meta, StoryObj } from '@storybook/vue3';
import { SDatePicker } from './index';

const meta: Meta<typeof SDatePicker> = {
  title: 'Components/DatePicker',
  component: SDatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    disabled:    { control: 'boolean' },
    dark:        { control: 'boolean' },
    size:        { control: 'select', options: ['small', 'medium', 'large'] },
  },
  args: {
    label: '날짜',
    placeholder: '날짜 선택',
    disabled: false,
    dark: false,
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof SDatePicker>;

export const Default: Story = {
  render: (args) => ({
    components: { SDatePicker },
    setup() { return { args }; },
    template: '<SDatePicker v-bind="args" style="max-width:280px" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { SDatePicker },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:280px">
        <SDatePicker label="Small"  size="small"  />
        <SDatePicker label="Medium" size="medium" />
        <SDatePicker label="Large"  size="large"  />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { SDatePicker },
    template: '<SDatePicker label="날짜" disabled style="max-width:280px" />',
  }),
};