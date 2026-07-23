# PROJECT_MAP.md

프로젝트 전체 폴더/파일 구조와 각 파일의 역할을 정리한 문서입니다.

---

## 루트

| 파일 | 역할 |
| --- | --- |
| `src/` | React 앱 소스 전체 |
| `api/` | Vercel 서버리스 함수 (백엔드 API) |
| `public/` | 정적 에셋 (이미지, 폰트, PDF 등) |
| `vite.config.ts` | Vite 빌드 설정 (React 플러그인) |
| `tailwind.config.ts` | Tailwind 커스텀 애니메이션(`bubbleEnterShake`) 정의 |
| `tsconfig.app.json` | 앱용 TypeScript 컴파일 옵션 (strict 모드) |

---

## `api/` — Vercel 서버리스 함수

| 파일 | 역할 |
| --- | --- |
| `track.ts` | POST — 방문자 기록. `visitorId`(UUID), `device`(mobile/desktop), IP 해시, 국가/도시(Vercel 헤더)를 Supabase `visits` 테이블에 저장. Vercel 봇과 IP 없는 요청은 무시 |
| `log.ts` | GET — Supabase에서 전체 방문 로그 조회. `x-admin-key` 헤더로 인증 |
| `delete.ts` | POST — 선택한 로그 ID 배열을 받아 Supabase에서 삭제. `x-admin-key` 헤더로 인증 |
| `contact.ts` | POST — 문의 폼(이름, 이메일, 메시지)을 Discord 웹훅으로 전달 |

---

## `src/` — 앱 소스

### `src/App.tsx`
앱 진입점 컴포넌트. 두 가지 핵심 역할을 함.
- 화면 너비 기준으로 `<MobileLayout>`(모바일) / `<DesktopLayout>`(데스크탑) 분기 렌더링
- 최초 마운트 시 `localStorage`에 UUID를 생성·저장하고 `/api/track`에 POST (프로덕션 환경에서만)

### `src/main.tsx`
React DOM 렌더링 진입점. `LanguageProvider`와 `BrowserRouter`를 최상위에 감싸고 `App`을 마운트.

### `src/index.css`
전역 스타일. Tailwind base/components/utilities 임포트, 커스텀 폰트 선언(NotoSansKR/JP), 사이드바 스크롤바 스타일, 프린트 CSS(CV 출력 시 불필요한 요소 숨김).

---

### `src/context/`

| 파일 | 역할 |
| --- | --- |
| `LanguageContext.tsx` | 전역 언어 상태 관리. `Lang` 타입(`"en" \| "kr" \| "jp"`)과 `setLang` 제공. `useLanguage()` 훅으로 어느 컴포넌트에서나 현재 언어와 언어 변경 함수를 사용 가능 |

---

### `src/types/`

| 파일 | 역할 |
| --- | --- |
| `Project.ts` | `Project` 타입 정의. `id`, `year`, `order`, `type`, `scope`, `title`, `thumbnail`, `media`(video/image), `tags`(SkillKey[]), `links`, `body`(언어별 마크다운) 필드를 포함. 다국어 필드는 `Partial<Record<Lang, string>>` 형태 |
| `Publication.ts` | `Publication` 타입 정의. `type`("paper"/"demo"/"poster"), `scope`("full"/"extended"), `authors`(Author[]), `venue`, `links`(pdf/doi/video) 등 논문 특화 필드 포함 |
| `MobileTab.ts` | 모바일 하단 탭 타입. `"home" \| "publications" \| "projects" \| "cv" \| "contact"` |

---

### `src/layouts/`

| 파일 | 역할 |
| --- | --- |
| `DesktopLayout.tsx` | 데스크탑 레이아웃. 상단 `<Header>` + 전체 화면 `<HomeHero>` + 왼쪽 `<SideNav>` + 오른쪽 메인 콘텐츠 구조. 푸터에 비밀 관리자 페이지 진입 로직 포함 (Shift+클릭 5회 → `/log` 이동, 모바일은 터치 5회) |
| `MobileLayout.tsx` | 모바일 레이아웃. 상단 `<Header>` + 탭별 페이지 렌더링 + 하단 `<BottomNav>`. `MobileTab` 상태로 현재 탭 관리 |

---

### `src/components/`

#### `src/components/header/`

| 파일 | 역할 |
| --- | --- |
| `Header.tsx` | 상단 고정 헤더. 우측에 언어 선택 드롭다운(🇰🇷 한국어 / 🇺🇸 English / 🇯🇵 日本語🚧). `useLanguage()`로 전역 언어 변경 |

#### `src/components/navigation/`

| 파일 | 역할 |
| --- | --- |
| `SideNav.tsx` | 데스크탑 고정 사이드 내비게이션. 스크롤 스파이로 현재 섹션 하이라이트. Publications/Projects 클릭 시 연도별 세부 목록 펼침. CV 클릭 시 하위 섹션(학력/경력/논문 등) 목록 펼침 |
| `BottomNav.tsx` | 모바일 하단 고정 탭바. Heroicons 아이콘 + 언어별 라벨 표시. `activeTab` props로 현재 탭 표시 |
| `navItems.ts` | 내비게이션 항목 정의. `NAV_ITEMS` 배열. CV는 하위 섹션 배열(`cv-education`, `cv-professional` 등)을 포함 |
| `navLabels.ts` | 탭 라벨의 3개국어 번역 맵(`navLabels`). CV 하위 섹션 라벨도 포함(`cvSectionLabels`) |
| `bottomNavLabels.ts` | 모바일 하단 탭 라벨의 3개국어 번역 맵 |
| `scrollToSection.ts` | ID로 해당 섹션으로 부드럽게 스크롤하는 유틸 함수. `"home"` → `"home-hero"` ID로 변환 처리 |

#### `src/components/home/`

| 파일 | 역할 |
| --- | --- |
| `HomeHero.tsx` | 전체화면 히어로 섹션. 스크롤에 따라 배경 점진적 사라짐, 프로필 이미지가 좌하단으로 이동·축소되며 사이드바 옆에 고정됨. 현재 스크롤 섹션에 따라 말풍선 힌트 텍스트 표시. 랜덤 그라디언트 배경 생성 |
| `HomeContent.tsx` | 소개 텍스트 렌더링. `home.en.md` / `home.kr.md` 파일을 `ReactMarkdown`으로 렌더링. `align` props로 중앙/좌측 정렬 조절 |

#### `src/components/publications/`

| 파일 | 역할 |
| --- | --- |
| `PublicationsContent.tsx` | 논문 목록 렌더링. `useExpandController`로 각 항목 열기/닫기 관리. 전체 펼치기/접기 버튼 제공 (모바일은 하단 플로팅, PC는 인라인) |

#### `src/components/projects/`

| 파일 | 역할 |
| --- | --- |
| `ProjectsContent.tsx` | 프로젝트 목록 렌더링. `useExpandController`로 각 항목 열기/닫기 관리. 태그 칩(스킬 색상 코드) 표시. 전체 펼치기/접기 버튼 제공 |

#### `src/components/cv/`

| 파일 | 역할 |
| --- | --- |
| `CVContent.tsx` | CV 전체 렌더링. 언어 선택 버튼(EN/KR/JP View)과 PDF 다운로드 버튼 포함. 학력·논문·연구경력·경력·프로젝트·수상·지원사업·강의·활동·기술·언어 섹션 순서로 렌더링 (섹션 순서는 이 컴포넌트 JSX에 하드코딩) |
| `CVPdf.tsx` | `@react-pdf/renderer`로 PDF 문서 생성. NotoSansKR/JP 폰트 등록 후 CV 데이터를 PDF 레이아웃으로 렌더링 |
| `CVPdfButton.tsx` | PDF 다운로드 버튼. 클릭 시 `CVPdf` 컴포넌트로 PDF를 생성하여 다운로드 트리거 |
| `CVPdfLink.tsx` | PDF 링크 컴포넌트 |
| `CVPdfStyles.ts` | `@react-pdf/renderer` 전용 스타일시트 정의 |
| `CVPrintButton.tsx` | 브라우저 인쇄 기능 트리거 버튼. `window.print()` 호출 (index.css의 프린트 스타일 활용) |

#### `src/components/contact/`

| 파일 | 역할 |
| --- | --- |
| `ContactContent.tsx` | 문의 폼 렌더링. 이름/이메일/메시지 입력 후 `/api/contact`로 POST. 전송 성공/실패 상태 관리. 좋아하는 책 목록 이미지도 함께 표시 |
| `ContactAction.tsx` | SNS/연락처 링크 아이콘 버튼 (Gmail, Discord, Instagram 등) |

#### `src/components/common/`

| 파일 | 역할 |
| --- | --- |
| `ExpandController.tsx` | `useExpandController` 훅 제공. `openIds` Set으로 열린 항목 관리, IntersectionObserver로 섹션 진입 감지(`hasEntered`), 전체 열기/닫기 기능 |

---

### `src/pages/`

| 파일 | 역할 |
| --- | --- |
| `Log.tsx` | 비밀 관리자 대시보드 (`/log` 라우트). Supabase 방문 로그를 날짜 범위(오늘/7일/30일/90일/전체)로 필터링하여 테이블로 표시. 국가별 방문 통계 카드, 로그 선택 삭제 기능 포함. `VITE_ADMIN_KEY` 환경변수를 헤더로 전송 |

#### `src/pages/mobile/`
모바일 레이아웃에서 각 탭에 대응하는 페이지 컴포넌트들. 데스크탑과 동일한 Content 컴포넌트를 재사용하거나 모바일에 최적화된 레이아웃으로 감싸는 역할.

| 파일 | 역할 |
| --- | --- |
| `Home.tsx` | 모바일 홈 탭. `HomeContent`를 렌더링 |
| `Publications.tsx` | 모바일 논문 탭. `PublicationsContent` 렌더링 |
| `Projects.tsx` | 모바일 프로젝트 탭. `ProjectsContent` 렌더링 |
| `CV.tsx` | 모바일 CV 탭. `CVContent` 렌더링 |
| `Contact.tsx` | 모바일 연락처 탭. `ContactContent` + `ContactAction` 렌더링 |

---

### `src/content/`

#### `src/content/home/`

| 파일 | 역할 |
| --- | --- |
| `home.en.md` | 영문 소개 마크다운 (히어로 섹션 및 홈 탭에서 사용) |
| `home.kr.md` | 한국어 소개 마크다운 |

#### `src/content/projects/`

| 파일 | 역할 |
| --- | --- |
| `index.ts` | `import.meta.glob`으로 모든 `.md` 파일을 로드 → `front-matter`로 파싱 → `year` 내림차순 + `order` 오름차순으로 정렬된 `projects` 배열 내보내기 |
| `*.md` (각 프로젝트 파일) | YAML 프론트매터로 메타데이터(`id`, `year`, `order`, `title`, `thumbnail`, `media`, `tags`, `links` 등) 정의. 파일명 목록: `bearhands`, `ble-interior-positioning`, `erp-system`, `everpen-1`, `everpen-2`, `Freelances`, `hotel-meta`, `idealavor`, `kiosk`, `mmca-storage-chat`, `panicFree`, `smart-cradle`, `starbound-odyssey`, `stern`, `table-it`, `trashapps`, `vr-films` |

#### `src/content/publications/`

| 파일 | 역할 |
| --- | --- |
| `index.ts` | `import.meta.glob`으로 모든 `.md` 파일을 로드 → 파싱 → `year` 내림차순, `type`(paper→demo→poster) 우선순위로 정렬된 `publications` 배열 내보내기 |
| `*.md` (각 논문 파일) | 논문 메타데이터(`id`, `year`, `type`, `scope`, `title`, `venue`, `authors`, `thumbnail`, `media`, `links`, `tags`) 정의. 파일: `2022-birdvr`, `2022-haptug`, `2024-guide-dog-ar`, `2025-AIglasses` |

#### `src/content/cv/`

| 파일 | 역할 |
| --- | --- |
| `index.ts` (= `cv.ts`) | `cvContent` 객체 — 학력(`education`), 연구경력(`research`), 경력(`professional`), 강의(`teaching`), 활동(`activities`), 수상(`awards`), 지원사업(`grants`), 기술(`skills`), 언어(`languages`) 섹션 전체를 3개국어로 하드코딩. 각 섹션 내부 항목은 배열 순서대로 렌더링(정렬 로직 없음). `Lang` 타입도 여기서 export |
| `cvHeader.ts` | CV 헤더 정보 — 이름(3개국어), 연락처(전화/이메일/웹사이트), 위치(3개국어) |

#### `src/content/common/`

| 파일 | 역할 |
| --- | --- |
| `skills.ts` | `skills` 상수 객체 — 프로젝트와 논문에 태그로 사용되는 모든 스킬 키와 해당 색상 코드(`color`)·카테고리(`category`) 정의. `SkillKey`(모든 스킬 키의 유니온 타입)와 `SkillCategory` 타입 export. 카테고리: `language`, `framework`, `xr`, `hci`, `ai`, `hardware`, `tracking`, `tool`, `research`, `language-skill` |

---

### `src/assets/`

| 경로 | 역할 |
| --- | --- |
| `profile.png` | 히어로 섹션에 표시되는 프로필 이미지 (스크롤 시 좌하단으로 이동) |
| `others/` | 서핑, 피트니스, 독서 등 개인 취미 사진들 (Contact 또는 Home 섹션에서 사용) |

---

## `public/` — 정적 에셋

| 경로 | 역할 |
| --- | --- |
| `projects/` | 각 프로젝트 썸네일 및 미디어 이미지 (`.png`, `.jpg`) |
| `publications/` | 논문 썸네일 이미지 |
| `contact/` | Contact 섹션에 표시되는 책 표지 이미지 7종 |
| `fonts/` | NotoSansKR / NotoSansJP 폰트 파일 (PDF 생성 및 CSS 폰트 선언에 사용) |
| `icons/` | SNS 아이콘 (Discord, Gmail, Instagram, PDF) |
| `cv/` | 실제 CV PDF 파일 (학위증명서, 성적증명서 등) |
| `images/` | 기타 이미지 |
| `favicon.ico`, `favicon-16.png`, `favicon-32.png` | 파비콘 |
| `icon-192.png`, `icon-512.png` | PWA 아이콘 |
| `apple-touch-icon.png` | iOS 홈화면 아이콘 |
| `404.html` | 404 fallback 페이지 |
