export type Lang = "kr" | "en" | "jp";

export type NewsCategory =
  | "publication"
  | "exhibition"
  | "award"
  | "grant"
  | "teaching"
  | "project"
  | "career";

export type News = {
  id: string;
  date: string;
  text: Partial<Record<Lang, string>>;
  category?: NewsCategory;
  /* 월이 불확실해 추정한 항목. 현재 렌더링에는 쓰지 않고 원본 데이터만 보존한다. */
  estimated?: boolean;
  link?: string;
  /*
   * 사이트 내부 섹션 앵커. 현재는 렌더링하지 않는다(항목에서 섹션으로 점프하는
   * 동작을 제거함). 마크다운에 남아 있는 값은 나중에 되살릴 수 있도록 보존한다.
   */
  anchor?: string;
};
