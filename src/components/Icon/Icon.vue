<script setup lang="ts">
import { computed } from 'vue';
import { ICON_PATHS } from './iconPaths';
import type { IconProps, IconSize } from './types';

const props = withDefaults(defineProps<IconProps>(), {
  size: 'medium',
  ariaHidden: true,
});

const SIZE_MAP: Record<IconSize, number> = {
  xsmall: 12,
  small: 14,
  medium: 16,
  large: 20,
  xlarge: 24,
};

const px = computed(() =>
  typeof props.size === 'number' ? props.size : SIZE_MAP[props.size],
);

const svgStyle = computed(() => ({
  color: props.color,
  display: 'inline-block',
  flexShrink: 0,
  verticalAlign: 'middle',
}));
</script>

<template>
  <svg
    :width="px"
    :height="px"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :aria-label="ariaLabel"
    :aria-hidden="ariaHidden"
    :style="svgStyle"
    v-html="ICON_PATHS[name]"
  ></svg>
</template>
