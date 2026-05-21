import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '../Button';
import { Card } from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => ({
    components: { Card },
    template: `
      <Card title="카드 제목" description="부가 설명 텍스트입니다." style="max-width:360px">
        <p style="margin:0;color:var(--color-neutral-600)">카드 본문 영역입니다.</p>
      </Card>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <Card variant="flat" title="Flat" style="width:200px">내용</Card>
        <Card variant="raised" title="Raised" style="width:200px">내용</Card>
        <Card variant="sunken" title="Sunken" style="width:200px">내용</Card>
      </div>
    `,
  }),
};

export const WithFooter: Story = {
  render: () => ({
    components: { Card, Button },
    template: `
      <Card title="알림 설정" style="max-width:360px">
        <p style="margin:0 0 16px">푸시 알림을 받을지 선택하세요.</p>
        <template #footer>
          <div style="display:flex;gap:8px;justify-content:flex-end">
            <Button variant="ghost">취소</Button>
            <Button variant="primary">저장</Button>
          </div>
        </template>
      </Card>
    `,
  }),
};
