import fm from "front-matter";
import type { News } from "../../types/News";

const modules = import.meta.glob("./*.md", {
  as: "raw",
  eager: true,
});

const parsedNews: News[] = [];

/*
 * YAML은 따옴표 없는 2025-10-08 을 Date 객체로 파싱한다.
 * 프론트매터에서 date 를 따옴표로 감싸는 것이 원칙이지만,
 * 빠뜨렸을 때 정렬이 조용히 깨지지 않도록 여기서 문자열로 정규화한다.
 */
function toDateString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return "";
}

for (const raw of Object.values(modules)) {
  try {
    const parsed = fm<News>(raw as string);

    parsedNews.push({
      ...parsed.attributes,
      date: toDateString(parsed.attributes.date),
    });
  } catch (e) {
    console.error("Failed to parse news:", e);
  }
}

/* "YYYY-MM-DD" 문자열은 사전순 = 시간순이므로 localeCompare 로 최신순 정렬 */
export const news = parsedNews.sort((a, b) => b.date.localeCompare(a.date));

export const getYear = (n: News) => Number(n.date.slice(0, 4));
