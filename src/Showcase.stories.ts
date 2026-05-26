import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { SButton } from './components/Button';
import { SBadge } from './components/Badge';
import { SChip } from './components/Chip';
import { SRadioGroup } from './components/Radio';
import { SCheckboxGroup } from './components/Checkbox';
import { SInput } from './components/Input';
import { SSelect } from './components/Select';
import { SFileInput } from './components/FileInput';
import { SModal } from './components/Modal';
import { SToastProvider, useToast } from './components/Toast';
import { SCard } from './components/Card';
import { SPagination } from './components/Pagination';
import { STypography } from './components/Typography';

const meta: Meta = {
  title: 'Showcase/All',
  decorators: [
    () => ({
      components: { SToastProvider },
      template: '<SToastProvider position="topRight"><story/></SToastProvider>',
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Buttons: Story = {
  render: () => ({
    components: { SButton },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <SButton variant="primary">저장</SButton>
        <SButton variant="secondary">취소</SButton>
        <SButton variant="outline">더보기</SButton>
        <SButton loading>처리 중</SButton>
      </div>
    `,
  }),
};

export const InteractiveDemo: Story = {
  render: () => ({
    components: {
      SButton, SBadge, SChip, SRadioGroup, SCheckboxGroup, SInput, SSelect,
      SFileInput, SModal, SCard, SPagination, STypography,
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
        <STypography variant="h4">Vue Design System Showcase</STypography>
        <div style="display:flex;gap:8px"><SBadge variant="success">운영중</SBadge><SChip>태그</SChip></div>
        <SRadioGroup name="demo" v-model="radio" :options="[{value:'a',label:'A'},{value:'b',label:'B'}]" />
        <SCheckboxGroup v-model="checks" :options="[{value:'x',label:'X'},{value:'y',label:'Y'}]" />
        <SInput label="이름" placeholder="입력" />
        <SSelect label="역할" placeholder="선택" :options="[{value:'admin',label:'관리자'}]" />
        <SFileInput label="첨부" variant="inline" />
        <SButton @click="modalOpen = true">모달 열기</SButton>
        <SButton @click="toast.success('완료', { message: '처리되었습니다.' })">토스트</SButton>
        <SPagination :item-count="100" :cnt-per-page="10" :current-page="page" @changed-page="(p) => page = p" />
        <SModal :open="modalOpen" title="확인" @close="modalOpen = false">
          <p>Vue로 변환된 디자인 시스템입니다.</p>
        </SModal>
      </div>
    `,
  }),
};
