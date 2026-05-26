import type { Meta, StoryObj } from '@storybook/vue3';
import { STypography } from './index';

const meta: Meta<typeof STypography> = {
  title: 'Components/Typography',
  component: STypography,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2', 'caption', 'overline', 'label'] },
    color:   { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'muted'] },
  },
  args: {
    variant: 'body1',
    color: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof STypography>;

export const Default: Story = {
  render: (args) => ({
    components: { STypography },
    setup() { return { args }; },
    template: '<STypography v-bind="args">StarBanking 디자인 시스템</STypography>',
  }),
};

export const Headings: Story = {
  render: () => ({
    components: { STypography },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <STypography variant="h1">Heading 1</STypography>
        <STypography variant="h2">Heading 2</STypography>
        <STypography variant="h3">Heading 3</STypography>
        <STypography variant="h4">Heading 4</STypography>
        <STypography variant="h5">Heading 5</STypography>
        <STypography variant="h6">Heading 6</STypography>
      </div>
    `,
  }),
};

export const Body: Story = {
  render: () => ({
    components: { STypography },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
        <STypography variant="body1">본문 1 — StarBanking 디자인 시스템</STypography>
        <STypography variant="body2">본문 2 — 보조 설명 텍스트입니다.</STypography>
        <STypography variant="caption" color="muted">캡션 / 보조 정보</STypography>
        <STypography variant="overline" color="primary">OVERLINE</STypography>
        <STypography variant="label">라벨 텍스트</STypography>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    components: { STypography },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <STypography color="default">Default</STypography>
        <STypography color="primary">Primary</STypography>
        <STypography color="secondary">Secondary</STypography>
        <STypography color="success">Success</STypography>
        <STypography color="warning">Warning</STypography>
        <STypography color="error">Error</STypography>
        <STypography color="muted">Muted</STypography>
      </div>
    `,
  }),
};