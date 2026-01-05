export type Lang = "kr" | "en" | "jp";

export type Author = {
  name: string;
  role?: "first";
};

export type Publication = {
  id: string;
  year: number;
  order?: number;
  type: "paper" | "demo" | "poster";
  scope: "full" | "extended";
  title: Partial<Record<Lang, string>>;
  venue: Partial<Record<Lang, string>>;
  authors: Author[];
  thumbnail?: string;
  media?: { video?: string };
  links?: { pdf?: string; doi?: string; video?: string };
  tags?: string[];
  body?: {
    en?: string;
    kr?: string;
    jp?: string;
  };
};