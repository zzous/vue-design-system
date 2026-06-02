<script setup lang="ts">
defineOptions({ name: 'SButton' });
import { computed, useAttrs } from 'vue';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  loading: false,
  fullWidth: false,
  iconOnly: false,
  type: 'button',
});

const attrs = useAttrs();

const classes = computed(() =>
  [
    styles.btn,
    styles[props.variant ?? 'primary'],
    styles[props.size ?? 'medium'],
    props.fullWidth ? styles.fullWidth : '',
    props.iconOnly ? styles.iconOnly : '',
    attrs.class as string,
  ]
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <button
    :class="classes"
    :type="type"
    :disabled="disabled || loading"
    v-bind="attrs"
  >
    <span v-if="loading" :class="styles.spinner" aria-hidden="true" />
    <template v-if="!loading">
      <slot name="leftIcon" />
      <slot />
      <slot name="rightIcon" />
    </template>
  </button>
</template>
