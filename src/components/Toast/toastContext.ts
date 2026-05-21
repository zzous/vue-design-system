import type { InjectionKey } from 'vue';
import type { ToastContextValue } from './types';

export const toastKey: InjectionKey<ToastContextValue> = Symbol('toast');
