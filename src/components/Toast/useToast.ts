import { inject } from 'vue';
import { toastKey } from './toastContext';
import type { ToastContextValue } from './types';

export function useToast(): ToastContextValue {
  const ctx = inject(toastKey);
  if (!ctx) throw new Error('useToast must be used within <SToastProvider>');
  return ctx;
}
