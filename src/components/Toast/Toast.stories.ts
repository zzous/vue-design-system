import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '../Button';
import { ToastProvider, useToast } from './index';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  decorators: [
    () => ({
      components: { ToastProvider },
      template: '<ToastProvider position="topRight"><story /></ToastProvider>',
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Variants: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const toast = useToast();
      return { toast };
    },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <Button @click="toast.success('완료', { message: '저장되었습니다.' })">Success</Button>
        <Button variant="secondary" @click="toast.info('안내', { message: '확인해 주세요.' })">Info</Button>
        <Button variant="outline" @click="toast.warning('주의', { message: '한도를 확인하세요.' })">Warning</Button>
        <Button variant="danger" @click="toast.error('오류', { message: '처리에 실패했습니다.' })">Error</Button>
      </div>
    `,
  }),
};
