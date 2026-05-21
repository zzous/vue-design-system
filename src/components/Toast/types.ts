export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';
export type ToastPosition =
  | 'topRight' | 'topLeft' | 'topCenter'
  | 'bottomRight' | 'bottomLeft' | 'bottomCenter';

export interface ToastItem {
  id: string;
  variant?: ToastVariant;
  title: string;
  message?: string;
  duration?: number;
  exiting?: boolean;
}

export interface ToastOptions {
  variant?: ToastVariant;
  message?: string;
  duration?: number;
}

export interface ToastContextValue {
  toast: (title: string, options?: ToastOptions) => void;
  success: (title: string, options?: Omit<ToastOptions, 'variant'>) => void;
  error: (title: string, options?: Omit<ToastOptions, 'variant'>) => void;
  warning: (title: string, options?: Omit<ToastOptions, 'variant'>) => void;
  info: (title: string, options?: Omit<ToastOptions, 'variant'>) => void;
}

export interface ToastProviderProps {
  position?: ToastPosition;
  defaultDuration?: number;
}
