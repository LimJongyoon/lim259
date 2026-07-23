# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

임종윤(HCI 연구자 / XR 개발자)의 개인 포트폴리오 웹사이트. React 19 + TypeScript + Vite로 구축되었으며, Vercel에 배포되고 방문자 분석을 위해 Supabase를 사용합니다.

## 명령어

```bash
npm run dev       # Vite 개발 서버 실행 (핫 리로드)
npm run build     # tsc -b && vite build (TypeScript 검사 선행)
npm run preview   # 프로덕션 빌드 로컬 미리보기
npm run lint      # ESLint 검사
```

## 아키텍처

### 반응형 이중 레이아웃 시스템

앱은 화면 너비에 따라(`react-responsive` 사용) 완전히 다른 두 레이아웃 중 하나를 렌더링합니다.

- **데스크탑** (`DesktopLayout.tsx`): 고정 사이드바 내비게이션 + 스크롤 가능한 메인 콘텐츠, 모든 섹션이 한 페이지에 표시
- **모바일** (`MobileLayout.tsx`): 하단 탭 내비게이션 기반, 탭 전환으로 페이지 전환

필요한 경우 `src/components/` 내 컴포넌트들은 데스크탑/모바일 전용으로 분리됩니다.

### 마크다운 기반 콘텐츠 파이프라인

콘텐츠는 YAML 프론트매터가 포함된 `.md` 파일로 `src/content/`에 위치합니다. 처리 흐름:

1. Vite의 `import.meta.glob()`으로 모든 `.md` 파일을 문자열로 즉시 로드
2. `front-matter` / `gray-matter`로 YAML 메타데이터와 본문 파싱
3. 정렬/필터링 후 타입이 지정된 배열로 내보내기
4. 컴포넌트에서 배열을 소비하여 `react-markdown`으로 렌더링

새 프로젝트 추가 시: `src/content/projects/프로젝트명.md` 파일을 `src/types/Project.ts`의 `Project` 타입에 맞는 프론트매터로 생성합니다. 퍼블리케이션도 동일한 방식입니다.

### 다국어 지원 (EN / KR / JP)

`src/context/LanguageContext.tsx`의 전역 `LanguageContext`에서 선택된 언어를 관리합니다. 콘텐츠 필드는 `Partial<Record<Lang, string>>` 형태를 사용하며, 렌더링 시 현재 언어에 해당하는 값만 표시됩니다.

### Vercel API 라우트

`/api/*.ts` 파일들은 Vercel 서버리스 함수(Node 런타임)입니다.

| 라우트 | 용도 |
| --- | --- |
| `api/track.ts` | POST — 방문자 기록 (UUID, 기기 유형, Vercel 헤더로 위치 파악) |
| `api/log.ts` | GET — 방문자 분석 데이터 조회 (관리자 전용) |
| `api/contact.ts` | POST — 문의 폼을 Discord 웹훅으로 전달 |
| `api/delete.ts` | POST — 방문자 로그 삭제 (관리자 전용) |

### 비밀 관리자 페이지

푸터를 Shift 키를 누른 채 5번 클릭하면 `/log`로 이동하며, `api/log.ts`를 통해 Supabase에서 방문자 분석 대시보드를 불러옵니다.

### TypeScript 설정

strict 모드가 활성화되어 있습니다(`strict: true`, `noUnusedLocals`, `noUnusedParameters`). 빌드 시 Vite 이전에 `tsc -b`를 실행하므로 타입 오류가 있으면 빌드가 차단됩니다.

### 스타일링

Tailwind CSS 유틸리티 우선 방식. 커스텀 애니메이션 `bubbleEnterShake`는 `tailwind.config.ts`에 정의되어 있습니다. CV/PDF 내보내기를 위한 프린트 스타일이 `index.css`에 포함되어 있습니다. 반응형 브레이크포인트: `md:`가 데스크탑 기준입니다.
