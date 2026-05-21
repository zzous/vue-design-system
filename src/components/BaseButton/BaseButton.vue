<script setup lang="ts">
import styles from './BaseButton.module.css';

export interface BaseButtonProps {
  label?: string;
  type?: string;
  iconClass?: string;
  btnsize?: 'small' | 'medium' | 'large';
  iconSize?: 'sg' | 'mg' | 'lg';
  offscreen?: boolean;
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  btnsize: 'small',
});

const emit = defineEmits<{
  changeValue: [value: string];
}>();

const btnSizeMap: Record<NonNullable<BaseButtonProps['btnsize']>, string> = {
  small: styles.btnSm,
  medium: styles.btnSlm,
  large: styles.btnSl,
};

const sizeClass = btnSizeMap[props.btnsize] ?? btnSizeMap.small;

const changeValueHandler = () => {
  emit('changeValue', props.label || '');
};
</script>

<template>
  <button
    type="button"
    :class="[styles.btn, sizeClass]"
    @click="changeValueHandler"
  >
    <span
      v-if="type === 'icon'"
      :class="[iconClass ?? '', iconSize ?? '']"
    />
    <span v-if="offscreen" :class="styles.offscreen">{{ label }}</span>
    <template v-else>{{ label }}</template>
  </button>
</template>
