<script setup lang="ts">
defineOptions({ name: 'SFileInput' });
import { computed, ref } from 'vue';
import styles from './FileInput.module.css';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export type FileInputSize = 'small' | 'medium' | 'large';

export interface FileInputProps {
  label?: string;
  placeholder?: string;
  variant?: 'dropzone' | 'inline';
  size?: FileInputSize;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorText?: string;
  helperText?: string;
}

const props = withDefaults(defineProps<FileInputProps>(), {
  placeholder: '파일을 선택하세요',
  variant: 'dropzone',
  size: 'medium',
  multiple: false,
  disabled: false,
  error: false,
});

const emit = defineEmits<{
  change: [files: File[]];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const files = ref<File[]>([]);
const dragging = ref(false);
const sizeError = ref('');

const addFiles = (incoming: FileList | null) => {
  if (!incoming) return;
  const arr = Array.from(incoming);

  if (props.maxSize) {
    const oversized = arr.filter((f) => f.size > props.maxSize!);
    if (oversized.length) {
      sizeError.value = `파일 크기는 ${formatBytes(props.maxSize)} 이하여야 합니다.`;
      return;
    }
  }
  sizeError.value = '';

  const next = props.multiple ? [...files.value, ...arr] : arr.slice(0, 1);
  files.value = next;
  emit('change', next);
};

const removeFile = (index: number) => {
  const next = files.value.filter((_, i) => i !== index);
  files.value = next;
  emit('change', next);
  if (inputRef.value) inputRef.value.value = '';
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
  if (!props.disabled) dragging.value = true;
};
const onDragLeave = () => { dragging.value = false; };
const onDrop = (e: DragEvent) => {
  e.preventDefault();
  dragging.value = false;
  if (!props.disabled) addFiles(e.dataTransfer?.files ?? null);
};

const displayError = computed(() => sizeError.value || (props.error ? props.errorText : ''));

const hasFile = computed(() => files.value.length > 0);
const displayName = computed(() => {
  if (!hasFile.value) return '';
  if (props.multiple && files.value.length > 1) {
    return `${files.value[0].name} 외 ${files.value.length - 1}개`;
  }
  return files.value[0].name;
});

const zoneClass = computed(() =>
  [
    styles.dropzone,
    styles[`dropzone_${props.size}`],
    dragging.value ? styles.dragging : '',
    displayError.value ? styles.error : '',
    props.disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' '),
);

const inlineFieldClass = computed(() =>
  [
    styles.inlineField,
    styles[`inlineField_${props.size}`],
    displayError.value ? styles.inlineError : '',
    props.disabled ? styles.inlineDisabled : '',
  ]
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <div :class="styles.wrapper">
    <span v-if="label" :class="styles.label">
      {{ label }}
      <span v-if="required" :class="styles.required">*</span>
    </span>

    <template v-if="variant === 'inline'">
      <div :class="styles.inlineRow">
        <div :class="inlineFieldClass">
          <input
            ref="inputRef"
            type="file"
            :class="styles.hiddenInput"
            :accept="accept"
            :multiple="multiple"
            :disabled="disabled"
            aria-hidden="true"
            tabindex="-1"
            @change="addFiles(($event.target as HTMLInputElement).files)"
          />
          <span :class="hasFile ? styles.inlineFilename : styles.inlinePlaceholder">
            {{ hasFile ? displayName : placeholder }}
          </span>
        </div>
        <button
          type="button"
          :class="[styles.browseBtn, styles[`browseBtn_${size}`]]"
          :disabled="disabled"
          @click="inputRef?.click()"
        >
          찾아보기
        </button>
      </div>
    </template>

    <template v-else>
      <div
        :class="zoneClass"
        role="button"
        :tabindex="disabled ? -1 : 0"
        aria-label="파일 업로드 영역"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
        @keydown="(e) => { if ((e.key === 'Enter' || e.key === ' ') && !disabled) inputRef?.click(); }"
      >
        <input
          ref="inputRef"
          type="file"
          :class="styles.hiddenInput"
          :accept="accept"
          :multiple="multiple"
          :disabled="disabled"
          aria-hidden="true"
          tabindex="-1"
          @change="addFiles(($event.target as HTMLInputElement).files)"
        />
        <div :class="styles.icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 13V7M7 10l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 14.5A3.5 3.5 0 0 0 6.5 18h7a3.5 3.5 0 0 0 0-7H13a5 5 0 1 0-9.9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <p :class="styles.primaryText">
          <span>클릭</span>하거나 파일을 여기에 드래그하세요
        </p>
        <p :class="styles.subText">
          {{ accept ? `허용 형식: ${accept}` : '모든 파일 허용' }}
          {{ maxSize ? ` · 최대 ${formatBytes(maxSize)}` : '' }}
          {{ multiple ? ' · 여러 파일 선택 가능' : '' }}
        </p>
      </div>
    </template>

    <ul v-if="files.length" :class="styles.fileList" role="list">
      <li v-for="(file, i) in files" :key="`${file.name}-${i}`" :class="styles.fileItem">
        <div :class="styles.fileIcon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            <path d="M9 2v4h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div :class="styles.fileInfo">
          <div :class="styles.fileName">{{ file.name }}</div>
          <div :class="styles.fileSize">{{ formatBytes(file.size) }}</div>
        </div>
        <button
          type="button"
          :class="styles.removeBtn"
          :aria-label="`${file.name} 삭제`"
          @click="removeFile(i)"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </li>
    </ul>

    <p v-if="displayError" :class="styles.errorText">{{ displayError }}</p>
    <p v-else-if="helperText" :class="styles.helperText">{{ helperText }}</p>
  </div>
</template>
