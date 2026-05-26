import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { SInput } from './index';

const meta: Meta<typeof SInput> = {
  title: 'Components/Input',
  component: SInput,
  tags: ['autodocs'],
  argTypes: {
    label:      { control: 'text' },
    size:       { control: 'select', options: ['small', 'medium', 'large'] },
    error:      { control: 'boolean' },
    helperText: { control: 'text' },
    errorText:  { control: 'text' },
    required:   { control: 'boolean' },
  },
  args: {
    label: '이름',
    size: 'medium',
    error: false,
    helperText: '',
    errorText: '',
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof SInput>;

export const Default: Story = {
  render: (args) => ({
    components: { SInput },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: '<SInput v-bind="args" placeholder="입력하세요" v-model="value" />',
  }),
};

export const WithHelper: Story = {
  render: () => ({
    components: { SInput },
    template: '<SInput label="이메일" helper-text="업무용 이메일을 입력하세요" placeholder="name@company.com" />',
  }),
};

export const Error: Story = {
  render: () => ({
    components: { SInput },
    template: '<SInput label="비밀번호" error error-text="8자 이상 입력해 주세요" model-value="" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { SInput },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:320px">
        <SInput size="small" label="Small" placeholder="small" />
        <SInput size="medium" label="Medium" placeholder="medium" />
        <SInput size="large" label="Large" placeholder="large" />
      </div>
    `,
  }),
};