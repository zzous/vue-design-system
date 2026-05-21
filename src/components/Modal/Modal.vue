<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { Teleport } from 'vue';
import styles from './Modal.module.css';

export type ModalSize = 'small' | 'medium' | 'large' | 'xl' | 'full';
export type ModalFooterAlign = 'left' | 'center' | 'right' | 'spaceBetween';

export interface ModalProps {
  open: boolean;
  title?: string;
  description?: string;
  footerAlign?: ModalFooterAlign;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  hideCloseButton?: boolean;
}

const props = withDefaults(defineProps<ModalProps>(), {
  footerAlign: 'right',
  size: 'medium',
  closeOnBackdrop: true,
  closeOnEsc: true,
  hideCloseButton: false,
});

const emit = defineEmits<{
  close: [];
}>();

const panelRef = ref<HTMLDivElement | null>(null);
let previousActive: HTMLElement | null = null;

const footerAlignClass: Record<ModalFooterAlign, string> = {
  left: styles.footerLeft,
  center: styles.footerCenter,
  right: '',
  spaceBetween: styles.footerSpaceBetween,
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEsc) emit('close');
  if (e.key === 'Tab') {
    const focusable = panelRef.value?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
};

watch(
  () => props.open,
  (open) => {
    if (open) {
      previousActive = document.activeElement as HTMLElement | null;
      panelRef.value?.focus();
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previousActive?.focus();
    }
  },
  { flush: 'post' },
);

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown);
  document.body.style.overflow = '';
});

const onBackdropClick = (e: MouseEvent) => {
  if (props.closeOnBackdrop && e.target === e.currentTarget) emit('close');
};

const panelClass = () => [styles.panel, styles[props.size]].join(' ');
const footerClass = () =>
  [styles.footer, footerAlignClass[props.footerAlign]].filter(Boolean).join(' ');
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      :class="styles.backdrop"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="title ? 'modal-title' : undefined"
      @click="onBackdropClick"
    >
      <div ref="panelRef" :class="panelClass()" tabindex="-1">
        <div v-if="title || !hideCloseButton" :class="styles.header">
          <div :class="styles.headerText">
            <h2 v-if="title" id="modal-title" :class="styles.title">{{ title }}</h2>
            <p v-if="description" :class="styles.description">{{ description }}</p>
          </div>
          <button
            v-if="!hideCloseButton"
            :class="styles.closeBtn"
            aria-label="모달 닫기"
            @click="emit('close')"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div :class="styles.body">
          <slot />
        </div>
        <div v-if="$slots.footer" :class="footerClass()">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
