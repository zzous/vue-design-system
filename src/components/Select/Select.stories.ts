import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { SSelect } from './index';

const options = [
  { value: 'admin', label: '관리자' },
  { value: 'user', label: '일반 사용자' },
  { value: 'guest', label: '게스트', disabled: true },
];

const meta: Meta<typeof SSelect> = {
  title: 'Components/Select',
  component: SSelect,
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    size:        { control: 'select', options: ['small', 'medium', 'large'] },
    error:       { control: 'boolean' },
    helperText:  { control: 'text' },
    errorText:   { control: 'text' },
    placeholder: { control: 'text' },
    required:    { control: 'boolean' },
  },
  args: {
    label: '역할',
    size: 'medium',
    error: false,
    helperText: '',
    errorText: '',
    placeholder: '선택하세요',
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof SSelect>;

export const Default: Story = {
  render: (args) => ({
    components: { SSelect },
    setup() {
      const value = ref('');
      return { args, value, options };
    },
    template: `
      <SSelect
        v-bind="args"
        :options="options"
        v-model="value"
        style="max-width:320px"
      />
    `,
  }),
};

export const Error: Story = {
  render: () => ({
    components: { SSelect },
    setup() {
      return { options };
    },
    template: `
      <SSelect
        label="역할"
        :options="options"
        error
        error-text="필수 항목입니다"
        style="max-width:320px"
      />
    `,
  }),
};