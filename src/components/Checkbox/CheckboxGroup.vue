<script setup lang="ts">
defineOptions({ name: 'SCheckboxGroup' });
import { computed } from 'vue';
import Checkbox from './Checkbox.vue';
import styles from './Checkbox.module.css';
import type { CheckboxSize } from './Checkbox.vue';

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  options: CheckboxOption[];
  modelValue?: string[];
  size?: CheckboxSize;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  size: 'medium',
  direction: 'horizontal',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string[]];
}>();

const groupClass = computed(() =>
  [styles.group, props.direction === 'horizontal' ? styles.horizontal : '']
    .filter(Boolean)
    .join(' '),
);

const toggle = (optValue: string, checked: boolean) => {
  const next = checked
    ? [...props.modelValue, optValue]
    : props.modelValue.filter((v) => v !== optValue);
  emit('update:modelValue', next);
};
</script>

<template>
  <div :class="groupClass" role="group">
    <Checkbox
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
      :label="opt.label"
      :size="size"
      :model-value="modelValue.includes(opt.value)"
      :disabled="disabled || opt.disabled"
      @update:model-value="(checked) => toggle(opt.value, checked)"
    />
  </div>
</template>
