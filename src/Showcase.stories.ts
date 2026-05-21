import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Button } from './components/Button';
import { Badge } from './components/Badge';
import { Chip } from './components/Chip';
import { RadioGroup } from './components/Radio';
import { CheckboxGroup } from './components/Checkbox';
import { Input } from './components/Input';
import { Select } from './components/Select';
import { FileInput } from './components/FileInput';
import { Modal } from './components/Modal';
import { ToastProvider, useToast } from './components/Toast';
import { Card } from './components/Card';
import { Pagination } from './components/Pagination';
import { Typography } from './components/Typography';

const meta: Meta = {
  title: 'Showcase/All',
  decorators: [
    () => ({
      components: { ToastProvider },
      template: '<ToastProvider position="topRight"><story/></ToastProvider>',
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Buttons: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <Button variant="primary">저장</Button>
        <Button variant="secondary">취소</Button>
        <Button variant="outline">더보기</Button>
        <Button loading>처리 중</Button>
      </div>
    `,
  }),
};

export const InteractiveDemo: Story = {
  render: () => ({
    components: {
      Button, Badge, Chip, RadioGroup, CheckboxGroup, Input, Select,
      FileInput, Modal, Card, Pagination, Typography,
    },
    setup() {
      const modalOpen = ref(false);
      const radio = ref('a');
      const checks = ref<string[]>(['x']);
      const page = ref(1);
      const toast = useToast();
      return { modalOpen, radio, checks, page, toast };
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:640px">
        <Typography variant="h4">Vue Design System Showcase</Typography>
        <div style="display:flex;gap:8px"><Badge variant="success">운영중</Badge><Chip>태그</Chip></div>
        <RadioGroup name="demo" v-model="radio" :options="[{value:'a',label:'A'},{value:'b',label:'B'}]" />
        <CheckboxGroup v-model="checks" :options="[{value:'x',label:'X'},{value:'y',label:'Y'}]" />
        <Input label="이름" placeholder="입력" />
        <Select label="역할" placeholder="선택" :options="[{value:'admin',label:'관리자'}]" />
        <FileInput label="첨부" variant="inline" />
        <Button @click="modalOpen = true">모달 열기</Button>
        <Button @click="toast.success('완료', { message: '처리되었습니다.' })">토스트</Button>
        <Pagination :item-count="100" :cnt-per-page="10" :current-page="page" @changed-page="(p) => page = p" />
        <Modal :open="modalOpen" title="확인" @close="modalOpen = false">
          <p>Vue로 변환된 디자인 시스템입니다.</p>
        </Modal>
      </div>
    `,
  }),
};
