import type { SkillKey } from "../content/common/skills";

export type Lang = "kr" | "en" | "jp";

export type ProjectType =
  | "Startup Attempt"
  | "Self-initiated Project"
  | "Industry Collaboration"
  | "Research Prototype";

export type ProjectScope =
  | "Personal"
  | "Team"
  | "Company"
  | "Lab";

export type Project = {
  id: string;
  year: number;
  order?: number;

  type: Partial<Record<Lang, string>>;
  scope?: Partial<Record<Lang, string>>;

  title: Partial<Record<Lang, string>>;

  affiliation?: Partial<Record<Lang, string>>[];

  thumbnail?: string;

  media?: {
    video?: string;
    image?: string;
  };

  tags: SkillKey[];

  links?: {
    website?: string;
    github?: string;
    demo?: string;
  };

  body?: {
    en?: string;
    kr?: string;
    jp?: string;
  };
};