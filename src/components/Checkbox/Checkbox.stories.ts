import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { SCheckbox } from './index';

const meta: Meta<typeof SCheckbox> = {
  title: 'Components/Checkbox',
  component: SCheckbox,
  tags: ['autodocs'],
  argTypes: {
    label:         { control: 'text' },
    size:          { control: 'select', options: ['small', 'medium', 'large'] },
    disabled:      { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    modelValue:    { control: 'boolean' },
  },
  args: {
    label: '항목 선택',
    size: 'medium',
    disabled: false,
    indeterminate: false,
    modelValue: false,
  },
};

export default meta;
type Story = StoryObj<typeof SCheckbox>;

export const Default: Story = {
  render: (args) => ({
    components: { SCheckbox },
    setup() {
      const checked = ref(args.modelValue ?? false);
      return { args, checked };
    },
    template: '<SCheckbox v-bind="args" v-model="checked" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { SCheckbox },
    setup() {
      const a = ref(true);
      const b = ref(true);
      const c = ref(true);
      return { a, b, c };
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <SCheckbox size="small"  label="Small"  v-model="a" />
        <SCheckbox size="medium" label="Medium" v-model="b" />
        <SCheckbox size="large"  label="Large"  v-model="c" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { SCheckbox },
    setup() {
      const checked = ref(true);
      const unchecked = ref(false);
      const disabledOff = ref(false);
      const disabledOn = ref(true);
      const indet = ref(false);
      return { checked, unchecked, disabledOff, disabledOn, indet };
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <SCheckbox label="체크됨" v-model="checked" />
        <SCheckbox label="미체크" v-model="unchecked" />
        <SCheckbox label="비활성 (미체크)" disabled v-model="disabledOff" />
        <SCheckbox label="비활성 (체크됨)" disabled v-model="disabledOn" />
        <SCheckbox label="Indeterminate" :indeterminate="true" v-model="indet" />
      </div>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    components: { SCheckbox },
    setup() {
      const email = ref(true);
      const sms = ref(false);
      const push = ref(false);
      return { email, sms, push };
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <SCheckbox label="이메일 수신" v-model="email" />
        <SCheckbox label="SMS 수신" v-model="sms" />
        <SCheckbox label="푸시 알림" v-model="push" />
      </div>
    `,
  }),
};