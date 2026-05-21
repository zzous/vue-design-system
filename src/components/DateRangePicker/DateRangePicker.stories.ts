import type { Meta, StoryObj } from '@storybook/vue3';
import { DateRangePicker } from './index';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  render: () => ({
    components: { DateRangePicker },
    template: '<DateRangePicker />',
  }),
};

export const CustomLabel: Story = {
  render: () => ({
    components: { DateRangePicker },
    template: '<DateRangePicker label="조회 기간" />',
  }),
};
