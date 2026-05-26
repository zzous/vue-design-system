import type { Meta, StoryObj } from '@storybook/vue3';
import { SIcon } from './index';
import type { IconName } from './types';

const ALL_ICON_NAMES: IconName[] = [
  'arrowUp', 'arrowDown', 'arrowLeft', 'arrowRight',
  'chevronUp', 'chevronDown', 'chevronLeft', 'chevronRight', 'chevronLeftDouble', 'chevronRightDouble',
  'search', 'send', 'plus', 'minus', 'close', 'check', 'edit', 'trash', 'copy', 'download', 'upload', 'refresh',
  'moreHorizontal', 'moreVertical', 'grid', 'list', 'zoomIn', 'zoomOut', 'maximize', 'minimize', 'gripVertical',
  'filter', 'sort', 'menu',
  'user', 'users', 'settings', 'home', 'lock', 'unlock', 'eye', 'eyeOff', 'logout',
  'star', 'starFilled', 'heart', 'heartFilled', 'bookmark', 'bookmarkFilled', 'thumbsUp', 'thumbsDown', 'share',
  'bell', 'mail', 'phone', 'message', 'at', 'hash',
  'info', 'warning', 'error', 'success', 'help', 'flag',
  'play', 'pause', 'volumeUp', 'volumeMute', 'mic', 'micOff', 'camera', 'video', 'image',
  'fileText', 'filePlus', 'folder', 'folderOpen', 'attach',
  'calendar', 'clock', 'tag',
  'mapPin', 'globe',
  'barChart', 'lineChart', 'pieChart', 'activity',
  'creditCard', 'transfer', 'wallet',
  'sun', 'moon',
  'externalLink', 'link',
  'monitor', 'laptop', 'server', 'database', 'cpu', 'cloud', 'cloudUpload', 'cloudDownload', 'wifi',
  'terminal', 'code', 'gitBranch', 'layers', 'package', 'bug', 'shield', 'shieldCheck', 'rocket',
];

const meta: Meta<typeof SIcon> = {
  title: 'Components/Icon',
  component: SIcon,
  tags: ['autodocs'],
  argTypes: {
    name:  { control: 'select', options: ALL_ICON_NAMES },
    size:  { control: 'select', options: ['xsmall', 'small', 'medium', 'large', 'xlarge'] },
    color: { control: 'color' },
  },
  args: {
    name: 'search',
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof SIcon>;

export const Default: Story = {
  render: (args) => ({
    components: { SIcon },
    setup() { return { args }; },
    template: '<SIcon v-bind="args" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { SIcon },
    template: `
      <div style="display:flex;gap:16px;align-items:center;color:var(--color-neutral-700)">
        <SIcon name="settings" size="xsmall" />
        <SIcon name="settings" size="small" />
        <SIcon name="settings" size="medium" />
        <SIcon name="settings" size="large" />
        <SIcon name="settings" size="xlarge" />
      </div>
    `,
  }),
};

const iconGroups: { label: string; icons: IconName[] }[] = [
  { label: 'Navigation', icons: ['arrowUp', 'arrowDown', 'arrowLeft', 'arrowRight', 'chevronUp', 'chevronDown', 'chevronLeft', 'chevronRight', 'chevronLeftDouble', 'chevronRightDouble'] },
  { label: 'Actions', icons: ['search', 'send', 'plus', 'minus', 'close', 'check', 'edit', 'trash', 'copy', 'download', 'upload', 'refresh'] },
  { label: 'UI Controls', icons: ['moreHorizontal', 'moreVertical', 'grid', 'list', 'zoomIn', 'zoomOut', 'maximize', 'minimize', 'gripVertical', 'filter', 'sort', 'menu'] },
  { label: 'User & Account', icons: ['user', 'users', 'settings', 'home', 'lock', 'unlock', 'eye', 'eyeOff', 'logout'] },
  { label: 'Favorites & Social', icons: ['star', 'starFilled', 'heart', 'heartFilled', 'bookmark', 'bookmarkFilled', 'thumbsUp', 'thumbsDown', 'share'] },
  { label: 'Communication', icons: ['bell', 'mail', 'phone', 'message', 'at', 'hash'] },
  { label: 'Status', icons: ['info', 'warning', 'error', 'success', 'help', 'flag'] },
  { label: 'Media', icons: ['play', 'pause', 'volumeUp', 'volumeMute', 'mic', 'micOff', 'camera', 'video', 'image'] },
  { label: 'Files & Folders', icons: ['fileText', 'filePlus', 'folder', 'folderOpen', 'attach'] },
  { label: 'Time & Organization', icons: ['calendar', 'clock', 'tag'] },
  { label: 'Location', icons: ['mapPin', 'globe'] },
  { label: 'Analytics', icons: ['barChart', 'lineChart', 'pieChart', 'activity'] },
  { label: 'Finance', icons: ['creditCard', 'transfer', 'wallet'] },
  { label: 'Theme', icons: ['sun', 'moon'] },
  { label: 'Links & External', icons: ['externalLink', 'link'] },
  { label: 'Technology', icons: ['monitor', 'laptop', 'server', 'database', 'cpu', 'cloud', 'cloudUpload', 'cloudDownload', 'wifi'] },
  { label: 'Development', icons: ['terminal', 'code', 'gitBranch', 'layers', 'package', 'bug', 'shield', 'shieldCheck', 'rocket'] },
];

export const Gallery: Story = {
  render: () => ({
    components: { SIcon },
    setup() { return { iconGroups }; },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;color:var(--color-neutral-700)">
        <div v-for="group in iconGroups" :key="group.label">
          <p style="font-size:11px;font-weight:600;color:var(--color-neutral-500);text-transform:uppercase;letter-spacing:.05em;margin:0 0 12px">{{ group.label }}</p>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div v-for="name in group.icons" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:60px">
              <SIcon :name="name" size="large" />
              <span style="font-size:10px;color:var(--color-neutral-400);text-align:center">{{ name }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};