<script setup lang="ts">
defineOptions({ name: 'SCheckbox' });
import { computed, ref, watch } from 'vue';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps {
  modelValue?: boolean;
  label?: string;
  size?: CheckboxSize;
  disabled?: boolean;
  indeterminate?: boolean;
  id?: string;
  name?: string;
  value?: string;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: 'medium',
  disabled: false,
  indeterminate: false,
});

const emit = defineEmits<{
  'update:modelValue': [checked: boolean];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.indeterminate,
  (v) => {
    if (inputRef.value) inputRef.value.indeterminate = v;
  },
  { immediate: true },
);

const classes = computed(() =>
  [
    styles.checkbox,
    styles[props.size],
    props.modelValue || props.indeterminate
      ? props.indeterminate
        ? styles.indeterminate
        : styles.checked
      : '',
    props.disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' '),
);

const onChange = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).checked);
};
</script>

<template>
  <label :class="classes">
    <input
      ref="inputRef"
      type="checkbox"
      :class="styles.input"
      :id="id"
      :name="name"
      :value="value"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />
    <span :class="styles.box" />
    <span v-if="label || $slots.default" :class="styles.label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
