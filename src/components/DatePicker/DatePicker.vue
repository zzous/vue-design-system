<script setup lang="ts">
import { computed, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import styles from './DatePicker.module.css';

export type DatePickerSize = 'small' | 'medium' | 'large';

export interface DatePickerProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: DatePickerSize;
  minDate?: Date;
  maxDate?: Date;
  excludeDates?: Date[];
  filterDate?: (date: Date) => boolean;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  placeholder: '날짜 선택',
  disabled: false,
  size: 'medium',
});

const emit = defineEmits<{
  dateChange: [date: Date | null];
}>();

const selectedDate = ref<Date | null>(new Date());

const handleChange = (date: Date | null) => {
  selectedDate.value = date;
  emit('dateChange', date);
};

const disabledDates = computed(() => {
  if (props.filterDate) {
    return (date: Date) => !props.filterDate!(date);
  }
  return props.excludeDates;
});
</script>

<template>
  <div :class="[styles.datePicker, styles[size ?? 'medium']]">
    <label v-if="label" :class="styles.label">{{ label }}</label>
    <VueDatePicker
      v-model="selectedDate"
      :disabled="disabled"
      :min-date="minDate"
      :max-date="maxDate"
      :disabled-dates="disabledDates"
      format="yyyy.MM.dd"
      :enable-time-picker="false"
      :placeholder="placeholder"
      @update:model-value="handleChange"
    />
  </div>
</template>
