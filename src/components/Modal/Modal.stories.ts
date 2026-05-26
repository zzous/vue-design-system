import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { SButton } from '../Button';
import { SModal } from './index';

const meta: Meta<typeof SModal> = {
  title: 'Components/Modal',
  component: SModal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    title:           { control: 'text' },
    description:     { control: 'text' },
    size:            { control: 'select', options: ['small', 'medium', 'large', 'full'] },
    footerAlign:     { control: 'select', options: ['left', 'center', 'right', 'spaceBetween'] },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEsc:      { control: 'boolean' },
    hideCloseButton: { control: 'boolean' },
  },
  args: {
    title: '확인',
    description: '이 작업을 진행하시겠습니까?',
    size: 'medium',
    footerAlign: 'right',
    closeOnBackdrop: true,
    closeOnEsc: true,
    hideCloseButton: false,
  },
};

export default meta;
type Story = StoryObj<typeof SModal>;

export const Default: Story = {
  render: (args) => ({
    components: { SModal, SButton },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <SButton @click="open = true">모달 열기</SButton>
        <SModal v-bind="args" :open="open" @close="open = false">
          <p style="margin:0">모달 본문 내용입니다.</p>
          <template #footer>
            <div style="display:flex;gap:8px;justify-content:flex-end">
              <SButton variant="ghost" @click="open = false">취소</SButton>
              <SButton variant="primary" @click="open = false">확인</SButton>
            </div>
          </template>
        </SModal>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { SModal, SButton },
    setup() {
      const open = ref(false);
      const size = ref<'small' | 'medium' | 'large' | 'full'>('medium');
      const openWith = (s: 'small' | 'medium' | 'large' | 'full') => {
        size.value = s;
        open.value = true;
      };
      return { open, size, openWith };
    },
    template: `
      <div style="display:flex;gap:8px">
        <SButton variant="outline" @click="openWith('small')">Small</SButton>
        <SButton variant="outline" @click="openWith('medium')">Medium</SButton>
        <SButton variant="outline" @click="openWith('large')">Large</SButton>
        <SButton variant="outline" @click="openWith('full')">Full</SButton>
        <SModal :open="open" :size="size" title="크기 미리보기" @close="open = false">
          <p style="margin:0">size: {{ size }}</p>
        </SModal>
      </div>
    `,
  }),
};