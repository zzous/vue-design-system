<script setup lang="ts">
defineOptions({ name: 'STypography' });
import { computed, useAttrs } from 'vue';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2'
  | 'caption' | 'overline' | 'label';

export type TypographyColor =
  | 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted';

export interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: keyof HTMLElementTagNameMap;
}

const props = withDefaults(defineProps<TypographyProps>(), {
  variant: 'body1',
  color: 'default',
});

const attrs = useAttrs();

const variantTagMap: Record<TypographyVariant, keyof HTMLElementTagNameMap> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  body1: 'p', body2: 'p',
  caption: 'span', overline: 'span', label: 'span',
};

const colorClassMap: Record<TypographyColor, string> = {
  default: styles.colorDefault,
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  success: styles.colorSuccess,
  warning: styles.colorWarning,
  error: styles.colorError,
  muted: styles.colorMuted,
};

const tag = computed(() => props.as ?? variantTagMap[props.variant ?? 'body1']);

const classes = computed(() =>
  [styles.base, styles[props.variant ?? 'body1'], colorClassMap[props.color ?? 'default'], attrs.class as string]
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <component :is="tag" :class="classes" v-bind="attrs">
    <slot />
  </component>
</template>
