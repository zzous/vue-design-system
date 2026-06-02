<script setup lang="ts">
defineOptions({ name: 'SRadio' });
import { computed, inject } from 'vue';
import { radioGroupKey } from './radioContext';
import styles from './Radio.module.css';

export type RadioSize = 'small' | 'medium' | 'large';

export interface RadioProps {
  value: string;
  label?: string;
  size?: RadioSize;
  disabled?: boolean;
}

const props = defineProps<RadioProps>();
const ctx = inject(radioGroupKey, null);

const name = computed(() => ctx?.name.value ?? '');
const checked = computed(() => ctx?.value.value === props.value);
const disabled = computed(() => props.disabled ?? ctx?.disabled.value ?? false);
const size = computed(() => props.size ?? ctx?.size.value ?? 'medium');

const classes = computed(() =>
  [
    styles.radio,
    styles[size.value],
    checked.value ? styles.checked : '',
    disabled.value ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' '),
);

const handleChange = () => {
  if (!disabled.value) ctx?.onChange?.(props.value);
};
</script>

<template>
  <label :class="classes">
    <input
      type="radio"
      :class="styles.input"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="handleChange"
    />
    <span :class="styles.circle" />
    <span v-if="label || $slots.default" :class="styles.label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
