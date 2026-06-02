<script setup lang="ts">
defineOptions({ name: 'SCard' });
import { computed, useAttrs } from 'vue';
import styles from './Card.module.css';

export type CardVariant = 'flat' | 'raised' | 'sunken';
export type CardSize = 'small' | 'medium' | 'large';

export interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'raised',
  size: 'medium',
});

const attrs = useAttrs();

const classes = computed(() =>
  [styles.card, styles[props.variant ?? 'raised'], styles[props.size ?? 'medium'], attrs.class as string]
    .filter(Boolean)
    .join(' '),
);

const slots = defineSlots<{
  default?: () => unknown;
  headerAction?: () => unknown;
  footer?: () => unknown;
}>();

const hasHeader = computed(
  () => !!props.title || !!props.description || !!slots.headerAction,
);
</script>

<template>
  <div :class="classes" v-bind="attrs">
    <div v-if="hasHeader" :class="styles.header">
      <div>
        <h3 v-if="title" :class="styles.title">{{ title }}</h3>
        <p v-if="description" :class="styles.description">{{ description }}</p>
      </div>
      <div v-if="$slots.headerAction">
        <slot name="headerAction" />
      </div>
    </div>
    <slot />
    <div v-if="$slots.footer" :class="styles.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
