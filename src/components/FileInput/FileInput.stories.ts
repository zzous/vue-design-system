import type { Meta, StoryObj } from '@storybook/vue3';
import { FileInput } from './index';

const meta: Meta<typeof FileInput> = {
  title: 'Components/FileInput',
  component: FileInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Dropzone: Story = {
  render: () => ({
    components: { FileInput },
    template: '<FileInput label="첨부 파일" helper-text="PDF, PNG (최대 10MB)" style="max-width:400px" />',
  }),
};

export const Inline: Story = {
  render: () => ({
    components: { FileInput },
    template: '<FileInput label="첨부" variant="inline" accept="image/*" style="max-width:400px" />',
  }),
};

export const Error: Story = {
  render: () => ({
    components: { FileInput },
    template: '<FileInput label="첨부" error error-text="파일을 선택해 주세요" style="max-width:400px" />',
  }),
};
