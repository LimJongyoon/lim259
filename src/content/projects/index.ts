import fm from "front-matter";
import type { Project } from "../../types/Project";

const modules = import.meta.glob("./*.md", {
  as: "raw",
  eager: true,
});

const parsedProjects: Project[] = [];

for (const raw of Object.values(modules)) {
  try {
    const parsed = fm<Omit<Project, "body"> & {
      body?: {
        en?: string;
        kr?: string;
        jp?: string;
      };
    }>(raw as string);

    parsedProjects.push({
      ...parsed.attributes,
      body: parsed.attributes.body,
    });
  } catch (e) {
    console.error("Failed to parse project:", e);
  }
}

export const projects = parsedProjects.sort((a, b) => {
  if (a.year !== b.year) {
    return b.year - a.year;
  }

  const orderA = a.order ?? 999;
  const orderB = b.order ?? 999;

  if (orderA !== orderB) {
    return orderA - orderB;
  }
    return 0;
});
