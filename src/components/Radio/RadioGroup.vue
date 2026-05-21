<script setup lang="ts">
import { computed, provide, toRef } from 'vue';
import Radio from './Radio.vue';
import { radioGroupKey } from './radioContext';
import styles from './Radio.module.css';
import type { RadioSize } from './Radio.vue';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  modelValue?: string;
  options: RadioOption[];
  size?: RadioSize;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  size: 'medium',
  direction: 'horizontal',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

provide(radioGroupKey, {
  name: toRef(props, 'name'),
  value: toRef(props, 'modelValue'),
  size: toRef(props, 'size'),
  disabled: toRef(props, 'disabled'),
  onChange: (value: string) => emit('update:modelValue', value),
});

const groupClass = computed(() =>
  [styles.group, props.direction === 'horizontal' ? styles.horizontal : '']
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <div :class="groupClass" role="radiogroup">
    <Radio
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
      :label="opt.label"
      :disabled="opt.disabled"
    />
  </div>
</template>
