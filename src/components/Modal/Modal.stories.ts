import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Button } from '../Button';
import { Modal } from './index';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div>
        <Button @click="open = true">모달 열기</Button>
        <Modal :open="open" title="확인" description="이 작업을 진행하시겠습니까?" @close="open = false">
          <p style="margin:0">모달 본문 내용입니다.</p>
          <template #footer>
            <div style="display:flex;gap:8px;justify-content:flex-end">
              <Button variant="ghost" @click="open = false">취소</Button>
              <Button variant="primary" @click="open = false">확인</Button>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false);
      const size = ref<'small' | 'medium' | 'large'>('medium');
      const openWith = (s: 'small' | 'medium' | 'large') => {
        size.value = s;
        open.value = true;
      };
      return { open, size, openWith };
    },
    template: `
      <div style="display:flex;gap:8px">
        <Button variant="outline" @click="openWith('small')">Small</Button>
        <Button variant="outline" @click="openWith('medium')">Medium</Button>
        <Button variant="outline" @click="openWith('large')">Large</Button>
        <Modal :open="open" :size="size" title="크기 미리보기" @close="open = false">
          <p style="margin:0">size: {{ size }}</p>
        </Modal>
      </div>
    `,
  }),
};
