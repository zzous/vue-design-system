<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import styles from './Input.module.css';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps {
  label?: string;
  size?: InputSize;
  error?: boolean;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  id?: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  size: 'medium',
  error: false,
});

defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs();

const inputId = computed(
  () => props.id ?? props.label?.toLowerCase().replace(/\s+/g, '-'),
);

const wrapperClasses = computed(() =>
  [
    styles.inputWrapper,
    styles[props.size],
    props.error ? styles.error : '',
    attrs.class as string,
  ]
    .filter(Boolean)
    .join(' '),
);

</script>

<template>
  <div :class="styles.wrapper">
    <label v-if="label" :for="inputId" :class="styles.label">
      {{ label }}
      <span v-if="required" :class="styles.required">*</span>
    </label>
    <div
      :class="[
        wrapperClasses,
        $slots.prefix ? styles.hasPrefix : '',
        $slots.suffix ? styles.hasSuffix : '',
      ]"
    >
      <span v-if="$slots.prefix" :class="styles.prefix">
        <slot name="prefix" />
      </span>
      <input
        :id="inputId"
        :class="styles.input"
        :required="required"
        :value="modelValue"
        v-bind="attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span v-if="$slots.suffix" :class="styles.suffix">
        <slot name="suffix" />
      </span>
    </div>
    <p v-if="error && errorText" :class="styles.errorText">{{ errorText }}</p>
    <p v-else-if="helperText" :class="styles.helperText">{{ helperText }}</p>
  </div>
</template>
