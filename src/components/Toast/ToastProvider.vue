<script setup lang="ts">
defineOptions({ name: 'SToastProvider' });
import { provide, ref } from 'vue';
import { Teleport } from 'vue';
import ToastCard from './ToastCard.vue';
import { toastKey } from './toastContext';
import styles from './Toast.module.css';
import type { ToastContextValue, ToastItem, ToastOptions, ToastPosition } from './types';

export interface ToastProviderProps {
  position?: ToastPosition;
  defaultDuration?: number;
}

const props = withDefaults(defineProps<ToastProviderProps>(), {
  position: 'topRight',
  defaultDuration: 4000,
});

const toasts = ref<ToastItem[]>([]);

const dismiss = (id: string) => {
  toasts.value = toasts.value.map((t) =>
    t.id === id ? { ...t, exiting: true } : t,
  );
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, 300);
};

const add = (title: string, options: ToastOptions = {}) => {
  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const duration = options.duration ?? props.defaultDuration;
  toasts.value = [...toasts.value, { id, title, ...options, duration }];
  if (duration > 0) setTimeout(() => dismiss(id), duration);
};

const ctx: ToastContextValue = {
  toast: add,
  success: (t, o) => add(t, { ...o, variant: 'success' }),
  error: (t, o) => add(t, { ...o, variant: 'error' }),
  warning: (t, o) => add(t, { ...o, variant: 'warning' }),
  info: (t, o) => add(t, { ...o, variant: 'info' }),
};

provide(toastKey, ctx);

const containerClass = [styles.container, styles[props.position]].join(' ');
</script>

<template>
  <slot />
  <Teleport to="body">
    <div
      :class="containerClass"
      role="region"
      aria-live="polite"
      aria-label="알림"
    >
      <ToastCard
        v-for="t in toasts"
        :key="t.id"
        :item="t"
        @dismiss="dismiss"
      />
    </div>
  </Teleport>
</template>
