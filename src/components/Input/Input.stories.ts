import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('');
      return { value };
    },
    template: '<Input label="이름" placeholder="입력하세요" v-model="value" />',
  }),
};

export const WithHelper: Story = {
  render: () => ({
    components: { Input },
    template: '<Input label="이메일" helper-text="업무용 이메일을 입력하세요" placeholder="name@company.com" />',
  }),
};

export const Error: Story = {
  render: () => ({
    components: { Input },
    template: '<Input label="비밀번호" error error-text="8자 이상 입력해 주세요" model-value="" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:320px">
        <Input size="small" label="Small" placeholder="small" />
        <Input size="medium" label="Medium" placeholder="medium" />
        <Input size="large" label="Large" placeholder="large" />
      </div>
    `,
  }),
};
