import type { Meta, StoryObj } from '@storybook/vue3';
import { DatePicker } from './index';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => ({
    components: { DatePicker },
    template: '<DatePicker label="날짜" style="max-width:280px" />',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { DatePicker },
    template: '<DatePicker label="날짜" disabled style="max-width:280px" />',
  }),
};
