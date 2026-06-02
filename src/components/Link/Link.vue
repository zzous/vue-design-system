<script setup lang="ts">
defineOptions({ name: 'SLink' });
import { computed, useAttrs, useSlots } from 'vue';
import { SIcon } from '../Icon';
import type { IconName } from '../Icon/types';
import styles from './Link.module.css';

export type LinkVariant = 'primary' | 'muted' | 'inherit';
export type LinkSize = 'small' | 'medium' | 'large';
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export interface LinkProps {
  href: string;
  /** `target="_blank"` 및 `rel="noopener noreferrer"` 적용 */
  external?: boolean;
  target?: LinkTarget;
  /** 오른쪽 아이콘. `true`면 external 시 externalLink, 그 외 chevronRight */
  rightIcon?: boolean | IconName;
  variant?: LinkVariant;
  size?: LinkSize;
  underline?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<LinkProps>(), {
  external: false,
  variant: 'primary',
  size: 'medium',
  underline: false,
  disabled: false,
});

const slots = useSlots();
const attrs = useAttrs();

const resolvedTarget = computed((): LinkTarget | undefined => {
  if (props.external) return '_blank';
  return props.target;
});

const isBlank = computed(() => resolvedTarget.value === '_blank');

const rel = computed(() => (isBlank.value ? 'noopener noreferrer' : undefined));

const showRightIcon = computed(() => {
  if (props.rightIcon === false) return false;
  if (props.rightIcon === true || typeof props.rightIcon === 'string') return true;
  if (slots.rightIcon) return true;
  return isBlank.value;
});

const rightIconName = computed((): IconName => {
  if (typeof props.rightIcon === 'string') return props.rightIcon;
  return isBlank.value ? 'externalLink' : 'chevronRight';
});

const iconSize = computed(() => {
  const map: Record<LinkSize, 'small' | 'medium' | 'large'> = {
    small: 'small',
    medium: 'small',
    large: 'medium',
  };
  return map[props.size];
});

const classes = computed(() =>
  [
    styles.link,
    styles[props.variant],
    styles[props.size],
    props.underline ? styles.underline : '',
    props.disabled ? styles.disabled : '',
    attrs.class as string,
  ]
    .filter(Boolean)
    .join(' '),
);
</script>

<template>
  <a
    v-if="!disabled"
    :class="classes"
    :href="href"
    :target="resolvedTarget"
    :rel="rel"
    v-bind="attrs"
  >
    <span :class="styles.label">
      <slot />
    </span>
    <span v-if="showRightIcon" :class="styles.icon" aria-hidden="true">
      <slot name="rightIcon">
        <SIcon :name="rightIconName" :size="iconSize" />
      </slot>
    </span>
  </a>
  <span
    v-else
    :class="classes"
    role="link"
    aria-disabled="true"
  >
    <span :class="styles.label">
      <slot />
    </span>
    <span v-if="showRightIcon" :class="styles.icon" aria-hidden="true">
      <slot name="rightIcon">
        <SIcon :name="rightIconName" :size="iconSize" />
      </slot>
    </span>
  </span>
</template>
