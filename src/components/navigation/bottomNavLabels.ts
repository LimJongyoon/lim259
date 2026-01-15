import type { MobileTab } from "../../types/MobileTab";

export const bottomNavLabels: Record<
  "kr" | "en" | "jp",
  Record<MobileTab, string>
> = {
  kr: {
    home: "소개",
    publications: "논문",
    projects: "프로젝트",
    cv: "이력",
    contact: "연락",
  },
  en: {
    home: "About",
    publications: "Publications",
    projects: "Projects",
    cv: "CV",
    contact: "Contact",
  },
  jp: {
    home: "ホーム",
    publications: "論文",
    projects: "プロジェクト",
    cv: "履歴",
    contact: "連絡",
  },
};