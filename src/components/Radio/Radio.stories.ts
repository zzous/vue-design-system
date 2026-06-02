import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { SRadioGroup } from './index';

const options = [
  { value: 'a', label: '옵션 A' },
  { value: 'b', label: '옵션 B' },
  { value: 'c', label: '옵션 C (비활성)', disabled: true },
];

const meta: Meta<typeof SRadioGroup> = {
  title: 'Components/Radio',
  component: SRadioGroup,
  tags: ['autodocs'],
  argTypes: {
    size:      { control: 'select', options: ['small', 'medium', 'large'] },
    direction: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    disabled:  { control: 'boolean' },
  },
  args: {
    size: 'medium',
    direction: 'horizontal',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SRadioGroup>;

export const Default: Story = {
  render: (args) => ({
    components: { SRadioGroup },
    setup() {
      const value = ref('a');
      return { args, value, options };
    },
    template: '<SRadioGroup name="demo" v-bind="args" v-model="value" :options="options" />',
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { SRadioGroup },
    setup() {
      const value = ref('a');
      return { value, options };
    },
    template: '<SRadioGroup name="vertical" v-model="value" :options="options" direction="vertical" />',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { SRadioGroup },
    setup() {
      const value = ref('a');
      return { value, options };
    },
    template: '<SRadioGroup name="disabled" v-model="value" :options="options" disabled />',
  }),
};