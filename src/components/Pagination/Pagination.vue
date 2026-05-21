<script setup lang="ts">
import { computed } from 'vue';
import { Button } from '../Button';
import { Icon } from '../Icon';
import styles from './Pagination.module.css';

export interface PaginationProps {
  itemCount?: number;
  cntPerPage?: number;
  currentPage?: number;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  itemCount: 0,
  cntPerPage: 0,
  currentPage: 0,
});

const emit = defineEmits<{
  changedPage: [pageNo: number, eventFlag: boolean];
}>();

const pageCount = computed(
  () => parseInt('' + (props.itemCount - 1) / props.cntPerPage) + 1,
);

const pageNumbers = computed((): number[] => {
  const currentPage = props.currentPage;
  const pc = pageCount.value;
  let first = 1;
  let last = currentPage;
  let gap = 0;
  const viewCounter: number[] = [];

  if (pc < 11) {
    first = 1;
    last = pc;
  } else {
    gap =
      currentPage < 5
        ? 5 - currentPage
        : currentPage + 5 > pc
          ? currentPage + 5 - pc
          : 0;
    first = currentPage < 5 ? 1 : currentPage - 4 - gap;
    last = currentPage + 5 > pc ? pc : currentPage + 5 + gap;
  }

  for (let i = first; i <= last; i++) viewCounter.push(i);
  return viewCounter;
});

const handleChangedPage = (pageNo: number) => {
  if (pageNo <= 0 || pageNo > pageCount.value) return;
  emit('changedPage', pageNo, true);
};
</script>

<template>
  <ul :class="styles.pagination">
    <li :class="styles.pageItem">
      <Button variant="ghost" size="small" aria-label="맨처음" @click="handleChangedPage(1)">
        <template #default>
          <Icon name="chevronLeftDouble" size="small" />
        </template>
      </Button>
    </li>
    <li :class="styles.pageItem">
      <Button
        variant="ghost"
        size="small"
        aria-label="이전"
        @click="handleChangedPage(currentPage - 1)"
      >
        <Icon name="chevronLeft" size="small" />
      </Button>
    </li>
    <li v-for="pageNum in pageNumbers" :key="pageNum" :class="styles.pageItem">
      <Button
        :variant="pageNum === currentPage ? 'primary' : 'outline'"
        size="small"
        @click="handleChangedPage(pageNum)"
      >
        {{ pageNum }}
      </Button>
    </li>
    <li :class="styles.pageItem">
      <Button
        variant="ghost"
        size="small"
        aria-label="다음"
        @click="handleChangedPage(currentPage + 1)"
      >
        <Icon name="chevronRight" size="small" />
      </Button>
    </li>
    <li :class="styles.pageItem">
      <Button
        variant="ghost"
        size="small"
        aria-label="맨끝"
        @click="handleChangedPage(pageCount)"
      >
        <Icon name="chevronRightDouble" size="small" />
      </Button>
    </li>
  </ul>
</template>
