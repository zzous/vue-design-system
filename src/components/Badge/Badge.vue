<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';
export type BadgeSize = 'small' | 'medium' | 'large';
export type BadgeType = 'a' | 'b' | 'c';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  contorl?: BadgeType;
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  size: 'medium',
  dot: false,
  contorl: 'b',
});

const attrs = useAttrs();

const classes = computed(() =>
  [styles.badge, styles[props.variant], styles[props.size], attrs.class as string]
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <span :class="classes" :data-type="contorl" v-bind="attrs">
    <span v-if="dot" :class="styles.dot" aria-hidden="true" />
    <slot />
  </span>
</template>
