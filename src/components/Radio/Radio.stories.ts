import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { RadioGroup } from './index';

const options = [
  { value: 'a', label: '옵션 A' },
  { value: 'b', label: '옵션 B' },
  { value: 'c', label: '옵션 C (비활성)', disabled: true },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref('a');
      return { value, options };
    },
    template: '<RadioGroup name="demo" v-model="value" :options="options" />',
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref('a');
      return { value, options };
    },
    template: '<RadioGroup name="vertical" v-model="value" :options="options" direction="vertical" />',
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref('a');
      return { value, options };
    },
    template: '<RadioGroup name="disabled" v-model="value" :options="options" disabled />',
  }),
};
