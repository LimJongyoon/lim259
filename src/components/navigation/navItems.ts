import type { SectionId } from "../../types/SectionId";

export type NavItem =
  | { id: Exclude<SectionId, "cv"> }
  | {
      id: "cv";
      subItems: { id: string }[];
    };

export const NAV_ITEMS: NavItem[] = [
  { id: "home" },
  { id: "news" },
  { id: "publications" },
  { id: "projects" },
  {
    id: "cv",
    subItems: [
      { id: "cv-education" },
      { id: "cv-publications" },
      { id: "cv-research" },
      { id: "cv-professional" },
      { id: "cv-projects" },
      { id: "cv-awards" },
      { id: "cv-grants" },
      { id: "cv-teaching" },
      { id: "cv-activities" },
      { id: "cv-skills" },
      { id: "cv-languages" },
    ],
  },
  { id: "contact" },
];
