import fm from "front-matter";
import type { Publication } from "../../types/Publication";

const modules = import.meta.glob("./*.md", {
  as: "raw",
  eager: true,
});

const typePriority: Record<Publication["type"], number> = {
  paper: 0,
  demo: 1,
  poster: 2,
};

const parsedPublications: Publication[] = [];

for (const raw of Object.values(modules)) {
  try {
    const parsed = fm<Publication>(raw as string);

    parsedPublications.push({
      ...parsed.attributes,
      body: parsed.body,
    });
  } catch (e) {
  }
}

export const publications = parsedPublications.sort((a, b) => {
  if (a.year !== b.year) {
    return b.year - a.year;
  }

  const orderA = a.order ?? 999;
  const orderB = b.order ?? 999;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return typePriority[a.type] - typePriority[b.type];
});