<script setup lang="ts">
defineOptions({ name: 'SChip' });
import { computed, useAttrs } from 'vue';
import styles from './Chip.module.css';

export type ChipVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps {
  variant?: ChipVariant;
  size?: ChipSize;
  disabled?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

const props = withDefaults(defineProps<ChipProps>(), {
  variant: 'neutral',
  size: 'medium',
  disabled: false,
});

const attrs = useAttrs();

const CLOSE_SIZES: Record<ChipSize, number> = {
  small: 10,
  medium: 12,
  large: 14,
};

const classes = computed(() =>
  [
    styles.chip,
    styles[props.variant ?? 'neutral'],
    styles[props.size ?? 'medium'],
    props.onClick ? styles.clickable : '',
    props.disabled ? styles.disabled : '',
    attrs.class as string,
  ]
    .filter(Boolean)
    .join(' '),
);

const svgSize = computed(() => CLOSE_SIZES[props.size]);

const handleClick = () => {
  if (!props.disabled) props.onClick?.();
};

const handleClose = (e: MouseEvent) => {
  e.stopPropagation();
  if (!props.disabled) props.onClose?.();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') handleClick();
};
</script>

<template>
  <span
    :class="classes"
    :style="attrs.style as string"
    :role="onClick ? 'button' : undefined"
    :tabindex="onClick && !disabled ? 0 : undefined"
    @click="onClick ? handleClick() : undefined"
    @keydown="onClick ? handleKeydown($event) : undefined"
  >
    <slot />
    <button
      v-if="onClose"
      type="button"
      :class="styles.closeBtn"
      :disabled="disabled"
      aria-label="삭제"
      :tabindex="disabled ? -1 : 0"
      @click="handleClose"
    >
      <svg :width="svgSize" :height="svgSize" viewBox="0 0 16 16" fill="none">
        <path
          d="M4 4l8 8M12 4l-8 8"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </span>
</template>
