import type { Meta, StoryObj } from '@storybook/vue3';
import { SFileInput } from './index';

const meta: Meta<typeof SFileInput> = {
  title: 'Components/FileInput',
  component: SFileInput,
  tags: ['autodocs'],
  argTypes: {
    label:       { control: 'text' },
    variant:     { control: 'inline-radio', options: ['dropzone', 'inline'] },
    size:        { control: 'select', options: ['small', 'medium', 'large'] },
    helperText:  { control: 'text' },
    errorText:   { control: 'text' },
    error:       { control: 'boolean' },
    multiple:    { control: 'boolean' },
    disabled:    { control: 'boolean' },
    required:    { control: 'boolean' },
    accept:      { control: 'text' },
  },
  args: {
    label: '첨부 파일',
    variant: 'dropzone',
    size: 'medium',
    helperText: '',
    errorText: '',
    error: false,
    multiple: false,
    disabled: false,
    required: false,
    accept: '',
  },
};

export default meta;
type Story = StoryObj<typeof SFileInput>;

export const Default: Story = {
  render: (args) => ({
    components: { SFileInput },
    setup() { return { args }; },
    template: '<SFileInput v-bind="args" style="max-width:400px" />',
  }),
};

export const Dropzone: Story = {
  render: () => ({
    components: { SFileInput },
    template: '<SFileInput label="첨부 파일" helper-text="PDF, PNG (최대 10MB)" style="max-width:400px" />',
  }),
};

export const Inline: Story = {
  render: () => ({
    components: { SFileInput },
    template: '<SFileInput label="첨부" variant="inline" accept="image/*" style="max-width:400px" />',
  }),
};

export const Error: Story = {
  render: () => ({
    components: { SFileInput },
    template: '<SFileInput label="첨부" error error-text="파일을 선택해 주세요" style="max-width:400px" />',
  }),
};