<script setup lang="ts">
defineOptions({ name: 'STextarea' });
import { computed, ref, useAttrs, watch } from 'vue';
import styles from './Textarea.module.css';

export type TextareaSize = 'small' | 'medium' | 'large';
export type TextareaResize = 'none' | 'vertical' | 'both';

export interface TextareaProps {
  label?: string;
  size?: TextareaSize;
  error?: boolean;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  resize?: TextareaResize;
  showCount?: boolean;
  rows?: number;
  maxLength?: number;
  id?: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  size: 'medium',
  error: false,
  resize: 'vertical',
  showCount: false,
  rows: 3,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs();

const inputId = computed(
  () => props.id ?? props.label?.toLowerCase().replace(/\s+/g, '-'),
);

const length = ref(props.modelValue?.length ?? 0);

watch(
  () => props.modelValue,
  (v) => {
    length.value = v?.length ?? 0;
  },
);

const wrapperClasses = computed(() =>
  [
    styles.textareaWrapper,
    styles[props.size ?? 'medium'],
    props.error ? styles.error : '',
    attrs.class as string,
  ]
    .filter(Boolean)
    .join(' '),
);

const handleChange = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  length.value = value.length;
  emit('update:modelValue', value);
};
</script>

<template>
  <div :class="styles.wrapper">
    <label v-if="label" :for="inputId" :class="styles.label">
      {{ label }}
      <span v-if="required" :class="styles.required">*</span>
    </label>
    <div :class="wrapperClasses">
      <textarea
        :id="inputId"
        :class="styles.textarea"
        :required="required"
        :rows="rows"
        :maxlength="maxLength"
        :value="modelValue"
        :style="{ resize }"
        v-bind="attrs"
        @input="handleChange"
      />
    </div>
    <div :class="styles.footer">
      <div>
        <p v-if="error && errorText" :class="styles.errorText">{{ errorText }}</p>
        <p v-else-if="helperText" :class="styles.helperText">{{ helperText }}</p>
      </div>
      <span v-if="showCount" :class="styles.count">
        {{ length }}{{ maxLength != null ? `/${maxLength}` : '' }}
      </span>
    </div>
  </div>
</template>
