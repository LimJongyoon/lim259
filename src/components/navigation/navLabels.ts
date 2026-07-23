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
    home: "概要",
    publications: "論文",
    projects: "プロジェクト",
    cv: "履歴",
    contact: "連絡",
  },
};

/* ===== CV subsection labels ===== */
export const cvSectionLabels: Record<
  "kr" | "en" | "jp",
  Record<string, string>
> = {
  kr: {
    "cv-education": "학력",
    "cv-publications": "논문",
    "cv-research": "연구 경력",
    "cv-professional": "경력",
    "cv-projects": "프로젝트",
    "cv-awards": "수상 및 선정",
    "cv-grants": "지원사업 및 펀딩",
    "cv-teaching": "강의 및 교육",
    "cv-activities": "기타 경험 및 활동",
    "cv-skills": "기술",
    "cv-languages": "언어 능력",
  },
  en: {
    "cv-education": "Education",
    "cv-publications": "Publications",
    "cv-research": "Research Experience",
    "cv-professional": "Professional Experience",
    "cv-projects": "Projects",
    "cv-awards": "Awards & Honors",
    "cv-grants": "Grants & Funding",
    "cv-teaching": "Teaching Experience",
    "cv-activities": "Additional Experience & Activities",
    "cv-skills": "Skills",
    "cv-languages": "Language Skills",
  },
  jp: {
    "cv-education": "学歴",
    "cv-publications": "論文",
    "cv-research": "研究経歴",
    "cv-professional": "職務経歴",
    "cv-projects": "プロジェクト",
    "cv-awards": "受賞・表彰",
    "cv-grants": "助成・支援事業",
    "cv-teaching": "教育経歴",
    "cv-activities": "その他の活動",
    "cv-skills": "スキル",
    "cv-languages": "語学力",
  },
};
