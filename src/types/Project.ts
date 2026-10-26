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
  videos?: string[];
  image?: string;
  images?: string[];
  /* 세로로 긴 앱 화면 캡처. 자르지 않고 한 줄에 나란히 보여준다. */
  screens?: string[];
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