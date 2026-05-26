import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { STextarea } from './index';

const meta: Meta<typeof STextarea> = {
  title: 'Components/Textarea',
  component: STextarea,
  tags: ['autodocs'],
  argTypes: {
    label:      { control: 'text' },
    size:       { control: 'select', options: ['small', 'medium', 'large'] },
    error:      { control: 'boolean' },
    helperText: { control: 'text' },
    errorText:  { control: 'text' },
    required:   { control: 'boolean' },
    resize:     { control: 'select', options: ['none', 'vertical', 'both'] },
    showCount:  { control: 'boolean' },
    rows:       { control: 'number' },
    maxLength:  { control: 'number' },
  },
  args: {
    label: '메모',
    size: 'medium',
    error: false,
    helperText: '',
    errorText: '',
    required: false,
    resize: 'vertical',
    showCount: false,
    rows: 3,
  },
};

export default meta;
type Story = StoryObj<typeof STextarea>;

export const Default: Story = {
  render: (args) => ({
    components: { STextarea },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: '<STextarea v-bind="args" placeholder="내용을 입력하세요" v-model="value" />',
  }),
};

export const WithCount: Story = {
  render: () => ({
    components: { STextarea },
    setup() {
      const value = ref('StarBanking');
      return { value };
    },
    template: `
      <STextarea
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
    components: { STextarea },
    template: '<STextarea label="사유" error error-text="필수 입력입니다" />',
  }),
};