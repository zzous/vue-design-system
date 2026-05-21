import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import { Pagination } from './index';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1);
      const onPage = (p: number) => { page.value = p; };
      return { page, onPage };
    },
    template: `
      <Pagination
        :item-count="100"
        :cnt-per-page="10"
        :current-page="page"
        @changed-page="onPage"
      />
    `,
  }),
};

export const ManyPages: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(5);
      const onPage = (p: number) => { page.value = p; };
      return { page, onPage };
    },
    template: `
      <Pagination
        :item-count="500"
        :cnt-per-page="10"
        :current-page="page"
        @changed-page="onPage"
      />
    `,
  }),
};
