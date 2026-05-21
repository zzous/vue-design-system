import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { CheckboxGroup } from './index';

const options = [
  { value: 'email', label: '이메일' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: '푸시 (비활성)', disabled: true },
];

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Checkbox',
  component: CheckboxGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const value = ref<string[]>(['email']);
      return { value, options };
    },
    template: '<CheckboxGroup v-model="value" :options="options" />',
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { CheckboxGroup },
    setup() {
      const value = ref<string[]>([]);
      return { value, options };
    },
    template: '<CheckboxGroup v-model="value" :options="options" direction="vertical" />',
  }),
};
