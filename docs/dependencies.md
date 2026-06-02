# Dependency overview

이 문서는 `package.json`에 직접 선언된 의존성의 버전 정보와 프로젝트 안에서의 역할을 정리한다.

## Version source

- 패키지 매니저: `pnpm@10.8.1`
- 선언 버전: `package.json`의 `dependencies`, `peerDependencies`, `devDependencies`
- 설치 확정 버전: `pnpm-lock.yaml`의 importer 기준 resolved version

> `^` 범위로 선언된 패키지는 새로 설치할 때 호환 가능한 최신 patch/minor 버전으로 해석될 수 있다. 재현 가능한 설치 기준은 `pnpm-lock.yaml`이다.

## Runtime dependencies

| Package | Declared | Locked | What it does | Used by |
| --- | --- | --- | --- | --- |
| `@vuepic/vue-datepicker` | `^11.0.2` | `11.0.3` | Vue용 날짜 선택 UI를 제공한다. 디자인 시스템의 `SDatePicker` 컴포넌트가 내부 구현으로 감싸서 사용한다. | `src/components/DatePicker/DatePicker.vue` |

## Peer dependencies

| Package | Declared | Locked in dev | What it does | Why peer |
| --- | --- | --- | --- | --- |
| `vue` | `^3.4.0` | `3.5.34` | 디자인 시스템 컴포넌트가 실행되는 Vue 런타임이다. `defineProps`, `computed`, `ref`, `provide/inject` 같은 Composition API를 사용한다. | 라이브러리 사용 앱의 Vue 인스턴스와 중복 번들링되지 않도록 peer로 둔다. |

## Development dependencies

| Package | Declared | Locked | What it does |
| --- | --- | --- | --- |
| `@storybook/addon-a11y` | `^8.6.17` | `8.6.18` | Storybook에서 접근성 검사를 제공한다. 컴포넌트 문서/프리뷰에서 a11y 이슈를 확인하는 용도다. |
| `@storybook/addon-essentials` | `^8.6.14` | `8.6.14` | Storybook의 기본 애드온 묶음이다. Controls, Docs, Actions 등 컴포넌트 문서화에 필요한 기본 기능을 제공한다. |
| `@storybook/addon-interactions` | `^8.6.14` | `8.6.14` | Storybook 상호작용 테스트와 play function 기반 검증을 위한 애드온이다. |
| `@storybook/blocks` | `^8.6.14` | `8.6.14` | Storybook Docs 페이지를 구성하는 문서 블록 컴포넌트를 제공한다. |
| `@storybook/vue3` | `^8.6.17` | `8.6.18` | Vue 3 컴포넌트를 Storybook story로 렌더링하기 위한 Vue 프레임워크 패키지다. |
| `@storybook/vue3-vite` | `^8.6.17` | `8.6.18` | Storybook을 Vue 3 + Vite 조합으로 실행한다. `.storybook/main.ts`의 `framework`로 설정되어 있다. |
| `@vitejs/plugin-vue` | `^5.2.4` | `5.2.4` | Vite가 `.vue` SFC를 컴파일하도록 연결하는 Vue 플러그인이다. `vite.config.ts`, `vite.lib.config.ts`에서 사용한다. |
| `storybook` | `^8.6.17` | `8.6.18` | 컴포넌트 개발 서버와 정적 문서 빌드를 제공한다. `pnpm dev`, `pnpm storybook`, `pnpm build-storybook` 스크립트에서 사용한다. |
| `typescript` | `^5.4.5` | `5.9.3` | 타입 시스템과 빌드/검사용 TypeScript 컴파일러다. Vue 타입체크와 declaration 생성의 기반이다. |
| `vite` | `^5.3.4` | `5.4.21` | 개발/빌드 도구다. Storybook 미리보기와 라이브러리 번들 빌드 설정의 기반이다. |
| `vite-plugin-dts` | `^4.5.4` | `4.5.4` | 라이브러리 빌드 시 `.d.ts` 타입 선언 파일을 생성한다. `vite.lib.config.ts`에서 `src`, `env.d.ts`를 포함하고 story 파일은 제외한다. |
| `vue` | `^3.5.13` | `3.5.34` | 로컬 개발, Storybook 렌더링, 타입체크에 사용하는 Vue 개발 의존성이다. 배포 패키지에서는 peer dependency로 소비자 앱의 Vue를 사용한다. |
| `vue-tsc` | `^2.2.8` | `2.2.12` | Vue SFC 타입체크 도구다. `pnpm typecheck`와 `prepublishOnly`에서 `vue-tsc --noEmit`으로 실행된다. |

## Scripts related to dependencies

| Script | Command | Dependency relationship |
| --- | --- | --- |
| `dev` / `storybook` | `storybook dev --port 6006` | `storybook`, `@storybook/vue3-vite`, Storybook addons, `vite`, `vue`를 사용해 컴포넌트 문서를 로컬 실행한다. |
| `typecheck` | `vue-tsc --noEmit` | `vue-tsc`, `typescript`, `vue` 타입 정의를 사용해 SFC 타입 오류를 검사한다. |
| `build` | `vite build --config vite.lib.config.ts` | `vite`, `@vitejs/plugin-vue`, `vite-plugin-dts`를 사용해 라이브러리 JS/CSS와 타입 선언을 생성한다. |
| `build-storybook` | `storybook build` | Storybook 정적 사이트를 생성한다. GitHub Pages 배포 설정은 `.storybook/main.ts`의 base 설정과 연결된다. |
| `prepublishOnly` | `pnpm run typecheck && pnpm run build` | 패키지 publish 전에 타입체크와 라이브러리 빌드를 강제한다. |

## Bundling notes

- `vite.lib.config.ts`에서 `vue`와 `@vuepic/vue-datepicker`는 `rollupOptions.external`로 지정되어 번들에 포함되지 않는다.
- 이 패키지를 사용하는 앱은 `vue`를 반드시 제공해야 한다.
- `@vuepic/vue-datepicker`는 `dependencies`에 있으므로 소비자 앱 설치 시 함께 설치되지만, 라이브러리 번들 안에는 직접 말려 들어가지 않는다.
- Storybook, Vite, TypeScript 관련 패키지는 개발/문서/빌드용이며 런타임 배포 의존성으로 보지 않는다.
