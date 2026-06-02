<script setup lang="ts">
defineOptions({ name: 'SPagination' });
import { computed } from 'vue';
import { SButton as Button } from '../Button';
import { SIcon as Icon } from '../Icon';
import styles from './Pagination.module.css';

export type PaginationSize = 'small' | 'medium';

export interface PaginationProps {
  itemCount?: number;
  cntPerPage?: number;
  currentPage?: number;
  size?: PaginationSize;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  itemCount: 0,
  cntPerPage: 10,
  currentPage: 1,
  size: 'medium',
});

const emit = defineEmits<{
  changedPage: [pageNo: number, eventFlag: boolean];
}>();

const pageCount = computed(
  () => Math.ceil(props.itemCount / props.cntPerPage) || 1,
);

const pageNumbers = computed((): number[] => {
  const currentPage = props.currentPage;
  const pc = pageCount.value;
  const viewCounter: number[] = [];

  if (pc < 11) {
    for (let i = 1; i <= pc; i++) viewCounter.push(i);
  } else {
    const gap =
      currentPage < 5
        ? 5 - currentPage
        : currentPage + 5 > pc
          ? currentPage + 5 - pc
          : 0;
    const first = currentPage < 5 ? 1 : currentPage - 4 - gap;
    const last = currentPage + 5 > pc ? pc : currentPage + 5 + gap;
    for (let i = first; i <= last; i++) viewCounter.push(i);
  }

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
      <Button variant="ghost" :size="size" aria-label="맨처음" @click="handleChangedPage(1)">
        <template #default>
          <Icon name="chevronLeftDouble" :size="size" />
        </template>
      </Button>
    </li>
    <li :class="styles.pageItem">
      <Button variant="ghost" :size="size" aria-label="이전" @click="handleChangedPage(currentPage - 1)">
        <Icon name="chevronLeft" :size="size" />
      </Button>
    </li>
    <li v-for="pageNum in pageNumbers" :key="pageNum" :class="styles.pageItem">
      <Button
        :variant="pageNum === currentPage ? 'primary' : 'outline'"
        :size="size"
        @click="handleChangedPage(pageNum)"
      >
        {{ pageNum }}
      </Button>
    </li>
    <li :class="styles.pageItem">
      <Button variant="ghost" :size="size" aria-label="다음" @click="handleChangedPage(currentPage + 1)">
        <Icon name="chevronRight" :size="size" />
      </Button>
    </li>
    <li :class="styles.pageItem">
      <Button variant="ghost" :size="size" aria-label="맨끝" @click="handleChangedPage(pageCount)">
        <Icon name="chevronRightDouble" :size="size" />
      </Button>
    </li>
  </ul>
</template>
