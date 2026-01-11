import type { MobileTab } from "../../types/MobileTab";

export type NavItem =
  | { id: Exclude<MobileTab, "cv"> }
  | {
      id: "cv";
      subItems: { id: string }[];
    };

export const NAV_ITEMS: NavItem[] = [
  { id: "home" },
  { id: "publications" },
  { id: "projects" },
  {
    id: "cv",
    subItems: [
      { id: "cv-education" },
      { id: "cv-professional" },
      { id: "cv-publications" },
      { id: "cv-projects" },
      { id: "cv-activities" },
      { id: "cv-awards" },
      { id: "cv-skills" },
      { id: "cv-languages" },
    ],
  },
  { id: "others" },
];
