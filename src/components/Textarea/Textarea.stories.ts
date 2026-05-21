import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Textarea } from './index';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { value };
    },
    template: '<Textarea label="메모" placeholder="내용을 입력하세요" v-model="value" />',
  }),
};

export const WithCount: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const value = ref('StarBanking');
      return { value };
    },
    template: `
      <Textarea
        label="설명"
        show-count
        :max-length="100"
        v-model="value"
        style="max-width:400px"
      />
    `,
  }),
};

export const Error: Story = {
  render: () => ({
    components: { Textarea },
    template: '<Textarea label="사유" error error-text="필수 입력입니다" />',
  }),
};
