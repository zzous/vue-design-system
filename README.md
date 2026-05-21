# @zzou/vue-design-system

React 기반 `@zzou/design-system`을 Vue 3로 포팅한 컴포넌트 라이브러리입니다.

## 설치

```bash
pnpm add @zzou/vue-design-system vue
```

## 사용

```ts
import { SButton, SInput, SToastProvider, useToast } from '@zzou/vue-design-system';
import '@zzou/vue-design-system/dist/index.css';
import '@zzou/vue-design-system/styles';
```

```vue
<script setup lang="ts">
import { SButton, SToastProvider, useToast } from '@zzou/vue-design-system';
</script>

<template>
  <SToastProvider>
    <SButton variant="primary">저장</SButton>
  </SToastProvider>
</template>
```

## 개발

```bash
pnpm install
pnpm storybook   # http://localhost:6006
pnpm build
pnpm typecheck
```

## 컴포넌트

Badge, BaseButton, Button, Card, Checkbox, Chip, DatePicker, DateRangePicker, FileInput, Icon, Input, Modal, Pagination, Radio, Select, Textarea, Toast, Typography

React 버전과 동일한 `S` 접두사 export API를 유지합니다.
