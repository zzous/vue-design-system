import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta = {
  title: 'Foundation/Design Tokens',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

export const Colors: Story = {
  name: '색상',
  render: () => ({
    setup() {
      const colorRows = [
        { label: 'Primary / KB Yellow', prefix: 'primary' },
        { label: 'Secondary / KB Gray', prefix: 'secondary' },
        { label: 'Neutral', prefix: 'neutral' },
      ];
      const brandSwatches = [
        { name: 'yellow-positive', cssVar: '--color-brand-yellow-positive' },
        { name: 'yellow-negative', cssVar: '--color-brand-yellow-negative' },
        { name: 'gray', cssVar: '--color-brand-gray' },
        { name: 'dark-gray', cssVar: '--color-brand-dark-gray' },
        { name: 'gold', cssVar: '--color-brand-gold' },
        { name: 'silver', cssVar: '--color-brand-silver' },
      ];
      const semanticSwatches = [
        { name: 'success', cssVar: '--color-success' },
        { name: 'success-light', cssVar: '--color-success-light' },
        { name: 'warning', cssVar: '--color-warning' },
        { name: 'warning-light', cssVar: '--color-warning-light' },
        { name: 'error', cssVar: '--color-error' },
        { name: 'error-light', cssVar: '--color-error-light' },
        { name: 'info', cssVar: '--color-info' },
        { name: 'info-light', cssVar: '--color-info-light' },
      ];
      return { colorRows, brandSwatches, semanticSwatches, shades };
    },
    template: `
      <div style="padding:32px;font-family:var(--font-family-base)">
        <div v-for="row in colorRows" :key="row.prefix" style="margin-bottom:32px">
          <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-500)">{{ row.label }}</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <div v-for="shade in shades" :key="shade" style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:64px">
              <div :style="{ width:'48px', height:'48px', borderRadius:'8px', backgroundColor:'var(--color-' + row.prefix + '-' + shade + ')', border:'1px solid rgba(0,0,0,0.08)', boxShadow:'0 1px 3px rgba(0,0,0,0.08)' }" />
              <span style="font-size:11px;color:var(--color-neutral-500)">{{ shade }}</span>
            </div>
          </div>
        </div>
        <div style="margin-bottom:32px">
          <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-500)">KB Brand</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <div v-for="s in brandSwatches" :key="s.name" style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:64px">
              <div :style="{ width:'48px', height:'48px', borderRadius:'8px', backgroundColor:'var(' + s.cssVar + ')', border:'1px solid rgba(0,0,0,0.08)' }" />
              <span style="font-size:11px;color:var(--color-neutral-500);text-align:center">{{ s.name }}</span>
            </div>
          </div>
        </div>
        <div>
          <p style="margin:0 0 12px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-500)">Semantic</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <div v-for="s in semanticSwatches" :key="s.name" style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:64px">
              <div :style="{ width:'48px', height:'48px', borderRadius:'8px', backgroundColor:'var(' + s.cssVar + ')', border:'1px solid rgba(0,0,0,0.08)' }" />
              <span style="font-size:11px;color:var(--color-neutral-500)">{{ s.name }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const TypographyTokens: Story = {
  name: '타이포그래피',
  render: () => ({
    setup() {
      const fontSizes = [
        ['xs', '12px'], ['sm', '14px'], ['md', '16px'], ['lg', '18px'],
        ['xl', '20px'], ['2xl', '24px'], ['3xl', '30px'], ['4xl', '36px'],
      ];
      const fontWeights = [
        ['Regular (400)', '400'], ['Medium (500)', '500'],
        ['Semibold (600)', '600'], ['Bold (700)', '700'],
      ];
      return { fontSizes, fontWeights };
    },
    template: `
      <div style="padding:32px;font-family:var(--font-family-base)">
        <p style="margin:0 0 24px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-500)">Font Size</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:40px">
          <div v-for="([key, px]) in fontSizes" :key="key" style="display:flex;align-items:baseline;gap:16px">
            <span :style="{ fontSize: 'var(--font-size-' + key + ')', color: 'var(--ds-text)', lineHeight: 1.3 }">StarBanking</span>
            <span style="font-size:11px;color:var(--ds-text-muted)">{{ key }} / {{ px }}</span>
          </div>
        </div>
        <p style="margin:0 0 16px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-500)">Font Weight</p>
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <div v-for="([label, weight]) in fontWeights" :key="weight" :style="{ fontWeight: weight, fontSize: '16px', color: 'var(--ds-text)' }">{{ label }}</div>
        </div>
      </div>
    `,
  }),
};

export const Spacing: Story = {
  name: '스페이싱',
  render: () => ({
    setup() {
      const tokens = [
        ['--space-1', '4px'], ['--space-2', '8px'], ['--space-3', '12px'],
        ['--space-4', '16px'], ['--space-5', '20px'], ['--space-6', '24px'],
        ['--space-8', '32px'], ['--space-10', '40px'], ['--space-12', '48px'],
        ['--space-16', '64px'],
      ];
      return { tokens };
    },
    template: `
      <div style="padding:32px;font-family:var(--font-family-base)">
        <p style="margin:0 0 24px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-neutral-500)">Spacing Scale</p>
        <div style="display:flex;flex-direction:column;gap:12px">
          <div v-for="([token, px]) in tokens" :key="token" style="display:flex;align-items:center;gap:16px">
            <div :style="{ width: 'var(' + token + ')', height: '20px', backgroundColor: 'var(--color-primary-400)', borderRadius: '3px', flexShrink: 0 }" />
            <span style="font-size:12px;color:var(--color-neutral-500);white-space:nowrap">{{ token }} · {{ px }}</span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Shadows: Story = {
  name: '그림자',
  render: () => ({
    setup() {
      return { levels: ['xs', 'sm', 'md', 'lg', 'xl'] };
    },
    template: `
      <div style="padding:32px;font-family:var(--font-family-base)">
        <div style="display:flex;gap:24px;flex-wrap:wrap">
          <div v-for="s in levels" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:12px">
            <div :style="{ width:'80px', height:'80px', borderRadius:'12px', backgroundColor:'#fff', boxShadow:'var(--shadow-' + s + ')', border:'1px solid var(--color-neutral-100)' }" />
            <span style="font-size:12px;color:var(--color-neutral-500)">shadow-{{ s }}</span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const BorderRadius: Story = {
  name: '테두리 반경',
  render: () => ({
    setup() {
      const radii = [
        ['sm', '4px'], ['md', '8px'], ['lg', '12px'], ['xl', '16px'], ['full', '9999px'],
      ];
      return { radii };
    },
    template: `
      <div style="padding:32px;font-family:var(--font-family-base)">
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-end">
          <div v-for="([key, px]) in radii" :key="key" style="display:flex;flex-direction:column;align-items:center;gap:12px">
            <div :style="{ width:'64px', height:'64px', backgroundColor:'var(--color-primary-100)', border:'2px solid var(--color-primary-400)', borderRadius:'var(--radius-' + key + ')' }" />
            <span style="font-size:12px;color:var(--color-neutral-500);text-align:center">radius-{{ key }}<br>{{ px }}</span>
          </div>
        </div>
      </div>
    `,
  }),
};
