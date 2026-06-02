<script setup lang="ts">
defineOptions({ name: 'SSelect' });
import { computed, useAttrs } from 'vue';
import styles from './Select.module.css';

export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  size?: SelectSize;
  error?: boolean;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder?: string;
  id?: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
  size: 'medium',
  error: false,
});

defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs();

const selectId = computed(
  () => props.id ?? props.label?.toLowerCase().replace(/\s+/g, '-'),
);

const wrapperClasses = computed(() =>
  [
    styles.selectWrapper,
    styles[props.size ?? 'medium'],
    props.error ? styles.error : '',
    attrs.class as string,
  ]
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <div :class="styles.wrapper">
    <label v-if="label" :for="selectId" :class="styles.label">
      {{ label }}
      <span v-if="required" :class="styles.required">*</span>
    </label>
    <div :class="wrapperClasses">
      <select
        :id="selectId"
        :class="styles.select"
        :required="required"
        :value="modelValue"
        v-bind="attrs"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </option>
      </select>
      <span :class="styles.chevron" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
    <p v-if="error && errorText" :class="styles.errorText">{{ errorText }}</p>
    <p v-else-if="helperText" :class="styles.helperText">{{ helperText }}</p>
  </div>
</template>
