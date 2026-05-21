# @zzou/vue-design-system

React 기반 `@zzou/design-system`을 Vue 3로 포팅한 컴포넌트 라이브러리입니다.

- **Storybook (GitHub Pages):** https://zzous.github.io/vue-design-system/
- **npm:** https://www.npmjs.com/package/@zzou/vue-design-system

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

---

## 배포

### GitHub Pages (Storybook)

`master` 또는 `main` 브랜치에 push하면 [.github/workflows/deploy-github-pages.yml](.github/workflows/deploy-github-pages.yml)이 Storybook을 빌드해 GitHub Pages에 배포합니다.

**최초 1회 설정 (저장소 Settings):**

1. **Settings → Pages**
2. **Build and deployment → Source**를 **GitHub Actions**로 선택
3. 워크플로 실행 후 https://zzous.github.io/vue-design-system/ 에서 확인

로컬에서 Pages와 동일한 base path로 미리보기:

```bash
STORYBOOK_BASE_PATH=/vue-design-system/ pnpm run build-storybook
pnpm dlx serve storybook-static -l 6006
```

### npm 패키지 배포

[.github/workflows/publish-npm.yml](.github/workflows/publish-npm.yml)은 **`v*` 태그 push** 또는 **수동 실행(workflow_dispatch)** 시 npm에 publish합니다.

**최초 1회 설정:**

1. [npmjs.com](https://www.npmjs.com/) 로그인 후 `@zzou` 조직(또는 본인 계정)에 패키지 publish 권한 확인
2. [Access Tokens](https://www.npmjs.com/settings/~your-account~/tokens) → **Generate New Token** → type **Automation** (CI용)
3. GitHub 저장소 **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `NPM_TOKEN` (이름 정확히 일치)
   - Value: 방금 만든 npm 토큰 전체 문자열

> `ENEEDAUTH` / `need auth` 오류는 거의 항상 **`NPM_TOKEN` Secret이 없거나 비어 있을 때** 발생합니다.

**`E403` + `Two-factor authentication ... bypass 2fa` 오류**

npm 계정에 **2FA(이중 인증)** 가 켜져 있으면, 일반 Publish 토큰으로는 CI에서 배포할 수 없습니다. 아래 중 하나로 **새 토큰**을 만든 뒤 `NPM_TOKEN` Secret을 **교체**하세요.

| 토큰 종류 | 설정 |
|-----------|------|
| **Classic → Automation** (권장) | [Access Tokens](https://www.npmjs.com/settings/~/tokens) → Generate New Token → **Automation** → `@zzou` 스코프 publish 권한 |
| **Granular Access Token** | Permissions: Read and write packages → **Bypass 2FA for publish** 체크 |

`Publish` 타입 Classic 토큰은 2FA가 켜진 계정에서 CI publish 시 위 `E403`이 납니다.

**배포 절차:**

```bash
# 1. package.json version 수정 (예: 1.0.1)
# 2. 커밋 후 태그 생성 및 push
git add package.json
git commit -m "chore: release v1.0.1"
git tag v1.0.1
git push origin master
git push origin v1.0.1
```

태그가 push되면 Actions에서 `typecheck` → `build` → `pnpm publish`가 실행됩니다.

로컬에서 직접 publish할 때:

```bash
npm login
pnpm publish --access public
```

`prepublishOnly` 스크립트가 publish 전에 자동으로 `typecheck`와 `build`를 실행합니다.
