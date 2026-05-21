<script setup lang="ts">
import { onMounted, ref } from 'vue';
import styles from './Toast.module.css';
import type { ToastItem, ToastVariant } from './types';

const props = defineProps<{
  item: ToastItem;
}>();

const emit = defineEmits<{
  dismiss: [id: string];
}>();

const progressRef = ref<HTMLDivElement | null>(null);

const icons: Record<ToastVariant, string> = {
  success: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.3"/><path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  warning: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2L1.5 13.5h13L8 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M8 7v3M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  info: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.3"/><path d="M8 7v4M8 5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  neutral: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.3"/></svg>`,
};

onMounted(() => {
  if (progressRef.value && props.item.duration && props.item.duration > 0) {
    progressRef.value.style.animationDuration = `${props.item.duration}ms`;
  }
});

const variant = props.item.variant ?? 'neutral';
const cls = [
  styles.toast,
  styles[variant],
  props.item.exiting ? styles.exiting : '',
]
  .filter(Boolean)
  .join(' ');
</script>

<template>
  <div :class="cls" role="alert">
    <span :class="styles.icon" v-html="icons[variant]" />
    <div :class="styles.content">
      <div :class="styles.title">{{ item.title }}</div>
      <div v-if="item.message" :class="styles.message">{{ item.message }}</div>
    </div>
    <button
      :class="styles.closeBtn"
      aria-label="알림 닫기"
      @click="emit('dismiss', item.id)"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M2 2l8 8M10 2l-8 8"
          stroke="currentColor"
          stroke-width="1.4"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <div
      v-if="item.duration && item.duration > 0"
      ref="progressRef"
      :class="styles.progress"
    />
  </div>
</template>
