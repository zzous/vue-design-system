<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import styles from './DateRangePicker.module.css';

export interface DateRangePickerProps {
  label?: string;
}

const props = withDefaults(defineProps<DateRangePickerProps>(), {
  label: '기간검색',
});

const emit = defineEmits<{
  dateChange: [startDate: Date | null, endDate: Date | null];
}>();

const dateLists = [
  { label: '당일', value: '0' },
  { label: '1개월', value: '30' },
  { label: '3개월', value: '90' },
  { label: '6개월', value: '180' },
  { label: '1년', value: '365' },
];

const startDate = ref<Date | null>(new Date());
const endDate = ref<Date | null>(new Date());

const handleChangeStart = (date: Date | null) => {
  startDate.value = date;
  emit('dateChange', date, endDate.value);
};

const handleChangeEnd = (date: Date | null) => {
  endDate.value = date;
  emit('dateChange', startDate.value, date);
};

const handleChangePreset = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value;
  const newEndDate = new Date();
  newEndDate.setDate(newEndDate.getDate() - parseInt(value, 10));
  endDate.value = newEndDate;
  emit('dateChange', startDate.value, newEndDate);
};
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.item">
      <label :class="styles.label">{{ label }}</label>
      <div :class="styles.input">
        <select :class="styles.select" @change="handleChangePreset">
          <option v-for="(item, index) in dateLists" :key="index" :value="item.value">
            {{ item.label }}
          </option>
        </select>
        <VueDatePicker
          v-model="endDate"
          :enable-time-picker="false"
          @update:model-value="handleChangeEnd"
        />
        <VueDatePicker
          v-model="startDate"
          :enable-time-picker="false"
          @update:model-value="handleChangeStart"
        />
      </div>
    </div>
  </div>
</template>
