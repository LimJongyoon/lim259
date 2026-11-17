/*
 * 사이트 공용 버튼 모양. 새 버튼을 만들 때 여기 것을 쓴다.
 * 알약 모양(rounded-full)·색 채움·확대 효과는 쓰지 않는다.
 */

/* 흰 배경 사각 버튼. 우측 하단 고정 버튼(전체 펼치기·CV PDF)과 같은 계열 */
export const outlineButton =
  "rounded-md border border-neutral-300 bg-white text-neutral-700 " +
  "hover:bg-neutral-100 transition-colors";

/* 여러 개 중 하나를 고르는 버튼. CV 의 EN/KR/JP View 와 같은 색 규칙 */
export const choiceButton = (selected: boolean) =>
  "rounded-md border transition-colors " +
  (selected
    ? "border-neutral-900 bg-neutral-900 text-white"
    : "border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-100");
