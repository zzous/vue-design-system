import type { InjectionKey, Ref } from 'vue';
import type { RadioSize } from './Radio.vue';

export interface RadioGroupContext {
  name: Ref<string>;
  value: Ref<string | undefined>;
  size: Ref<RadioSize>;
  disabled: Ref<boolean>;
  onChange: (value: string) => void;
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('radioGroup');
