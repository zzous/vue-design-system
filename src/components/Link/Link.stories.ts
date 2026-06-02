import type { Meta, StoryObj } from '@storybook/vue3';
import { SLink } from './index';

const meta: Meta<typeof SLink> = {
  title: 'Components/Link',
  component: SLink,
  tags: ['autodocs'],
  argTypes: {
    href:        { control: 'text' },
    external:    { control: 'boolean' },
    target:      { control: 'select', options: ['_self', '_blank', '_parent', '_top'] },
    rightIcon:   { control: 'boolean' },
    variant:     { control: 'select', options: ['primary', 'muted', 'inherit'] },
    size:        { control: 'select', options: ['small', 'medium', 'large'] },
    underline:   { control: 'boolean' },
    disabled:    { control: 'boolean' },
  },
  args: {
    href: '#',
    external: false,
    rightIcon: undefined,
    variant: 'primary',
    size: 'medium',
    underline: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SLink>;

export const Default: Story = {
  render: (args) => ({
    components: { SLink },
    setup() { return { args }; },
    template: '<SLink v-bind="args">자세히 보기</SLink>',
  }),
};

export const External: Story = {
  render: () => ({
    components: { SLink },
    template: `
      <SLink href="https://example.com" external>
        외부 문서 열기
      </SLink>
    `,
  }),
};

export const TargetBlank: Story = {
  render: () => ({
    components: { SLink },
    template: `
      <SLink href="https://example.com" target="_blank">
        target="_blank" (아이콘·rel 자동)
      </SLink>
    `,
  }),
};

export const WithRightIcon: Story = {
  render: () => ({
    components: { SLink },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <SLink href="/dashboard" :right-icon="true">내부 이동</SLink>
        <SLink href="https://github.com" external>외부 링크</SLink>
        <SLink href="/settings" right-icon="arrowRight">커스텀 아이콘</SLink>
        <SLink href="/help" :right-icon="false">아이콘 없음</SLink>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { SLink },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <SLink href="#" variant="primary">Primary</SLink>
        <SLink href="#" variant="muted">Muted</SLink>
        <p style="margin:0;color:var(--ds-text-2)">
          Inherit:
          <SLink href="#" variant="inherit" style="margin-left:4px">링크</SLink>
        </p>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { SLink },
    template: '<SLink href="#" disabled external>비활성 링크</SLink>',
  }),
};
