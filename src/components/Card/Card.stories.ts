import type { Meta, StoryObj } from '@storybook/vue3';
import { SButton } from '../Button';
import { SCard } from './index';

const meta: Meta<typeof SCard> = {
  title: 'Components/Card',
  component: SCard,
  tags: ['autodocs'],
  argTypes: {
    variant:     { control: 'select', options: ['flat', 'raised', 'sunken'] },
    size:        { control: 'select', options: ['small', 'medium', 'large'] },
    title:       { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    variant: 'raised',
    size: 'medium',
    title: '카드 제목',
    description: '부가 설명 텍스트입니다.',
  },
};

export default meta;
type Story = StoryObj<typeof SCard>;

export const Default: Story = {
  render: (args) => ({
    components: { SCard },
    setup() { return { args }; },
    template: `
      <SCard v-bind="args" style="max-width:360px">
        <p style="margin:0;color:var(--color-neutral-600)">카드 본문 영역입니다.</p>
      </SCard>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { SCard },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <SCard variant="flat" title="Flat" style="width:200px">내용</SCard>
        <SCard variant="raised" title="Raised" style="width:200px">내용</SCard>
        <SCard variant="sunken" title="Sunken" style="width:200px">내용</SCard>
      </div>
    `,
  }),
};

export const WithFooter: Story = {
  render: () => ({
    components: { SCard, SButton },
    template: `
      <SCard title="알림 설정" style="max-width:360px">
        <p style="margin:0 0 16px">푸시 알림을 받을지 선택하세요.</p>
        <template #footer>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <SButton variant="ghost">취소</SButton>
            <SButton variant="primary">저장</SButton>
          </div>
        </template>
      </SCard>
    `,
  }),
};