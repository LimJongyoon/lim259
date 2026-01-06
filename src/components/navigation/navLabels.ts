import type { MobileTab } from "../../types/MobileTab";

export const navLabels: Record<
  "kr" | "en" | "jp",
  Record<MobileTab, string>
> = {
  kr: {
    home: "소개",
    publications: "논문",
    projects: "프로젝트",
    cv: "이력",
    others: "기타",
  },
  en: {
    home: "About",
    publications: "Publications",
    projects: "Projects",
    cv: "CV",
    others: "Others",
  },
  jp: {
    home: "概要",
    publications: "論文",
    projects: "プロジェクト",
    cv: "履歴",
    others: "その他",
  },
};