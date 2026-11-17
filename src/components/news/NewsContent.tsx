import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { getYear } from "../../content/news";
import { useNews } from "../../content/news/useNews";
import { useLanguage } from "../../context/LanguageContext";
import type { News, NewsCategory } from "../../types/News";
import { navLabels } from "../navigation/navLabels";
import { outlineButton, choiceButton } from "../common/buttonStyles";

/* 필터 칩에 나오는 순서 */
const CATEGORY_ORDER: NewsCategory[] = [
  "publication",
  "award",
  "grant",
  "exhibition",
  "project",
  "career",
  "teaching",
];

const CATEGORY_LABEL: Record<
  NewsCategory | "all",
  Record<"en" | "kr" | "jp", string>
> = {
  all: { en: "All", kr: "전체", jp: "すべて" },
  publication: { en: "Publications", kr: "논문", jp: "論文" },
  award: { en: "Awards", kr: "수상", jp: "受賞" },
  grant: { en: "Grants", kr: "지원사업", jp: "助成" },
  exhibition: { en: "Exhibitions", kr: "전시", jp: "展示" },
  project: { en: "Projects", kr: "프로젝트", jp: "プロジェクト" },
  career: { en: "Career", kr: "경력", jp: "経歴" },
  teaching: { en: "Teaching", kr: "교육", jp: "教育" },
};

type Props = {
  /*
   * 접힌 상태에서 보여줄 개수. 나머지는 "전체 보기"로 펼친다.
   * 0 이면 접었을 때 목록 없이 제목과 버튼만 남는다(모바일에서 사용).
   */
  limit?: number;
  /* 섹션 바깥 여백 교체용. 모바일은 레이아웃이 이미 px-4 를 주므로 덜어낸다. */
  className?: string;
};

/*
 * 한 줄짜리 텍스트이므로 마크다운을 인라인으로 렌더링한다.
 * - p : 블록 마진 제거
 * - a : 항목 링크는 프론트매터의 link 필드로 걸므로 본문 링크는 강조 텍스트로만 표시
 */
const inlineMarkdown = {
  p: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-medium text-emerald-800">{children}</strong>
  ),
  a: ({ children }: { children?: React.ReactNode }) => (
    <span className="text-emerald-800">{children}</span>
  ),
};

function formatDate(date: string) {
  return `${date.slice(0, 4)}.${date.slice(5, 7)}`;
}

export default function NewsContent({
  limit = 15,
  className = "px-4 pt-4 pb-12 md:pb-24",
}: Props) {
  const { lang } = useLanguage();
  const allNews = useNews();
  const [showAll, setShowAll] = useState(false);
  const [category, setCategory] = useState<NewsCategory | null>(null);

  /* 실제로 항목이 있는 카테고리만 칩으로 보여준다 */
  const categories = CATEGORY_ORDER.filter((c) =>
    allNews.some((n) => n.category === c)
  );

  const news = category
    ? allNews.filter((n) => n.category === category)
    : allNews;
  const sectionRef = useRef<HTMLElement>(null);

  const toggle = () => {
    /*
     * 펼친 목록을 접으면 문서가 짧아지면서 스크롤 위치가 아래 섹션에 남는다.
     * 목록이 줄어든 뒤(다음 프레임) News 섹션 맨 위로 되돌린다.
     */
    if (showAll) {
      requestAnimationFrame(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    setShowAll((prev) => !prev);
  };

  /*
   * limit 0(모바일)은 접었을 때 목록이 아예 없으므로
   * "전체 보기"가 아니라 News 로 들어가는 진입 버튼이 된다.
   */
  const openLabel =
    limit === 0
      ? { kr: "뉴스 보기", jp: "ニュースを見る", en: "View news" }
      : {
          kr: `전체 보기 (${news.length})`,
          jp: `すべて表示 (${news.length})`,
          en: `Show all (${news.length})`,
        };

  const label = {
    open: openLabel[lang] ?? openLabel.en,
    close: lang === "kr" ? "접기" : lang === "jp" ? "閉じる" : "Show less",
  };

  const hasMore = news.length > limit;
  const visible = showAll ? news : news.slice(0, limit);

  return (
    <section
      ref={sectionRef}
      /* scroll-mt : 고정 헤더(h-11) 아래로 제목이 가리지 않도록 여유를 둔다 */
      className={`relative mx-auto scroll-mt-16 ${className}`}
    >
      {/* 접힌 채로 목록이 없으면(limit 0) 제목 없이 버튼 하나만 남긴다 */}
      {(showAll || limit > 0) && (
        <>
          <h2 className="text-lg font-semibold mb-3">
            {navLabels[lang].news}
          </h2>

          {categories.length > 1 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {([null, ...categories] as (NewsCategory | null)[]).map((c) => {
                const selected = category === c;

                return (
                  <button
                    key={c ?? "all"}
                    onClick={() => setCategory(c)}
                    aria-pressed={selected}
                    className={`px-2 py-1 text-xs ${choiceButton(selected)}`}
                  >
                    {CATEGORY_LABEL[c ?? "all"][lang]}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      <div>
        {visible.map((n: News, index) => {
          const year = getYear(n);
          const prevYear = index === 0 ? null : getYear(visible[index - 1]);
          const showYearDivider = index === 0 || year !== prevYear;

          const text = n.text[lang] ?? n.text.en ?? n.text.kr ?? "";

          const row = (
            <div
              className="
                grid items-baseline gap-2
                grid-cols-[50px_1fr]
                md:grid-cols-[56px_1fr]
                text-left
              "
            >
              <span className="text-xs text-neutral-400 tabular-nums">
                {formatDate(n.date)}
              </span>

              <span
                className="
                  text-sm leading-snug text-neutral-700 break-words
                  underline-offset-2 decoration-neutral-300
                  group-hover:underline
                "
              >
                <ReactMarkdown components={inlineMarkdown}>{text}</ReactMarkdown>
                {/* 바깥 링크가 걸린 항목 */}
                {n.link && (
                  <span aria-hidden className="ml-1 text-[11px] text-neutral-400">
                    ↗
                  </span>
                )}
              </span>
            </div>
          );

          return (
            <div key={n.id}>
              {showYearDivider && (
                <div
                  className={`flex items-center gap-3 mb-1 ${
                    index === 0 ? "mt-0" : "mt-3"
                  }`}
                >
                  <span className="text-sm font-medium text-neutral-600">
                    {year}
                  </span>
                  <div className="flex-1 h-px bg-neutral-200" />
                </div>
              )}

              {n.link ? (
                <a
                  href={n.link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    block rounded-md px-1 py-0.5 -mx-1 group
                    transition-colors hover:bg-green-300/15
                  "
                >
                  {row}
                </a>
              ) : (
                <div className="px-1 py-0.5 -mx-1">{row}</div>
              )}
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div
          className={`flex justify-center ${visible.length ? "mt-5" : "mt-1"}`}
        >
          <button
            onClick={toggle}
            className={`px-4 py-1.5 text-xs ${outlineButton}`}
          >
            {showAll ? label.close : label.open}
          </button>
        </div>
      )}
    </section>
  );
}
