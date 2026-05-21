import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Select } from './index';

const options = [
  { value: 'admin', label: '관리자' },
  { value: 'user', label: '일반 사용자' },
  { value: 'guest', label: '게스트', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('');
      return { value, options };
    },
    template: `
      <Select
        label="역할"
        placeholder="선택하세요"
        :options="options"
        v-model="value"
        style="max-width:320px"
      />
    `,
  }),
};

export const Error: Story = {
  render: () => ({
    components: { Select },
    setup() {
      return { options };
    },
    template: `
      <Select
        label="역할"
        :options="options"
        error
        error-text="필수 항목입니다"
        style="max-width:320px"
      />
    `,
  }),
};
