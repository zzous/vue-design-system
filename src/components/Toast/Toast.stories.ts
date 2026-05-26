import type { Meta, StoryObj } from '@storybook/vue3';
import { SButton } from '../Button';
import { SToastProvider, useToast } from './index';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight'],
    },
    duration: { control: 'number' },
  },
  args: {
    position: 'topRight',
    duration: 3000,
  },
  decorators: [
    (story, context) => ({
      components: { SToastProvider },
      setup() { return { position: context.args.position }; },
      template: '<SToastProvider :position="position"><story /></SToastProvider>',
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Variants: Story = {
  render: () => ({
    components: { SButton },
    setup() {
      const toast = useToast();
      return { toast };
    },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <SButton @click="toast.success('완료', { message: '저장되었습니다.' })">Success</SButton>
        <SButton variant="secondary" @click="toast.info('안내', { message: '확인해 주세요.' })">Info</SButton>
        <SButton variant="outline" @click="toast.warning('주의', { message: '한도를 확인하세요.' })">Warning</SButton>
        <SButton variant="danger" @click="toast.error('오류', { message: '처리에 실패했습니다.' })">Error</SButton>
      </div>
    `,
  }),
};