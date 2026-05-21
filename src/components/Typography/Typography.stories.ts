import type { Meta, StoryObj } from '@storybook/vue3';
import { Typography } from './index';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Headings: Story = {
  render: () => ({
    components: { Typography },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="h6">Heading 6</Typography>
      </div>
    `,
  }),
};

export const Body: Story = {
  render: () => ({
    components: { Typography },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
        <Typography variant="body1">본문 1 — StarBanking 디자인 시스템</Typography>
        <Typography variant="body2">본문 2 — 보조 설명 텍스트입니다.</Typography>
        <Typography variant="caption" color="muted">캡션 / 보조 정보</Typography>
        <Typography variant="overline" color="primary">OVERLINE</Typography>
        <Typography variant="label">라벨 텍스트</Typography>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { Typography },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <Typography color="default">Default</Typography>
        <Typography color="primary">Primary</Typography>
        <Typography color="secondary">Secondary</Typography>
        <Typography color="success">Success</Typography>
        <Typography color="warning">Warning</Typography>
        <Typography color="error">Error</Typography>
        <Typography color="muted">Muted</Typography>
      </div>
    `,
  }),
};
