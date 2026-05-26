import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { SPagination } from './index';

const meta: Meta<typeof SPagination> = {
  title: 'Components/Pagination',
  component: SPagination,
  tags: ['autodocs'],
  argTypes: {
    itemCount:       { control: 'number' },
    cntPerPage:      { control: 'number' },
    currentPage:     { control: 'number' },
    size:            { control: 'inline-radio', options: ['small', 'medium'] },
  },
  args: {
    itemCount: 100,
    cntPerPage: 10,
    currentPage: 1,
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof SPagination>;

export const Default: Story = {
  render: (args) => ({
    components: { SPagination },
    setup() {
      const page = ref(args.currentPage ?? 1);
      const perPage = ref(args.cntPerPage ?? 10);
      const onPage = (p: number) => { page.value = p; };
      const onPageSize = (s: number) => { perPage.value = s; page.value = 1; };
      return { args, page, perPage, onPage, onPageSize };
    },
    template: `
      <SPagination
        :item-count="args.itemCount"
        :cnt-per-page="perPage"
        :current-page="page"
        :size="args.size"
        @changed-page="onPage"
        @changed-page-size="onPageSize"
      />
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { SPagination },
    setup() {
      const page = ref(3);
      const onPage = (p: number) => { page.value = p; };
      return { page, onPage };
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <SPagination :item-count="100" :cnt-per-page="10" :current-page="page" size="small"  @changed-page="onPage" />
        <SPagination :item-count="100" :cnt-per-page="10" :current-page="page" size="medium" @changed-page="onPage" />
      </div>
    `,
  }),
};

export const ManyPages: Story = {
  render: () => ({
    components: { SPagination },
    setup() {
      const page = ref(5);
      const onPage = (p: number) => { page.value = p; };
      return { page, onPage };
    },
    template: `
      <SPagination
        :item-count="500"
        :cnt-per-page="10"
        :current-page="page"
        @changed-page="onPage"
      />
    `,
  }),
};