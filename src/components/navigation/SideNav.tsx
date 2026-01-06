import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { NAV_ITEMS } from "./navItems";
import { navLabels } from "./navLabels";
import { scrollToSection } from "./scrollToSection";
import { publications } from "../../content/publications";
import { projects } from "../../content/projects";

function groupByYear<T extends { year: number }>(items: T[]) {
  return items.reduce<Record<number, T[]>>((acc, item) => {
    acc[item.year] = acc[item.year] || [];
    acc[item.year].push(item);
    return acc;
  }, {});
}

export default function SideNav() {
  const { lang } = useLanguage();
  const labels = navLabels[lang];

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const pubByYear = groupByYear(publications);
  const projByYear = groupByYear(projects);

  const toggle = (key: string) => {
    setOpenCategory(prev => (prev === key ? null : key));
  };

  const shorten = (t: string) =>
    t.length > 15 ? `${t.slice(0, 15)}…` : t;

  return (
    <nav className="fixed top-12 left-6 z-40 text-sm space-y-4 text-gray-700">

      {NAV_ITEMS.map(({ id }) => {
        const isExpandable = id === "publications" || id === "projects";

        return (
          <div key={id}>
            {/* ===== Top-level ===== */}
            <button
              onClick={() => {
                if (id === "home") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setOpenCategory(null);
                  return;
                }

                scrollToSection(id);
                if (isExpandable) toggle(id);
                else setOpenCategory(null);
              }}
              className="block hover:text-black transition"
            >
              {labels[id]}
            </button>

            {/* ===== Publications ===== */}
            {id === "publications" && openCategory === "publications" && (
              <div className="mt-2 ml-3 space-y-2 text-xs text-gray-500">
                {Object.keys(pubByYear)
                  .sort((a, b) => Number(b) - Number(a))
                  .map(year => (
                    <div key={year}>
                      <div className="font-medium text-gray-400">{year}</div>
                      <div className="ml-2 space-y-1">
                        {pubByYear[Number(year)].map(p => (
                          <button
                            key={p.id}
                            onClick={() => {
                              document
                                .getElementById(`publication-${p.id}`)
                                ?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                            }}
                            className="block w-full text-left truncate hover:text-black transition"
                          >
                            {shorten(p.title[lang] ?? p.title.en ?? "")}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* ===== Projects ===== */}
            {id === "projects" && openCategory === "projects" && (
              <div className="mt-2 ml-3 space-y-2 text-xs text-gray-500">
                {Object.keys(projByYear)
                  .sort((a, b) => Number(b) - Number(a))
                  .map(year => (
                    <div key={year}>
                      <div className="font-medium text-gray-400">{year}</div>
                      <div className="ml-2 space-y-1">
                        {projByYear[Number(year)].map(p => (
                          <button
                            key={p.id}
                            onClick={() => {
                              document
                                .getElementById(`project-${p.id}`)
                                ?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                            }}
                            className="block w-full text-left truncate hover:text-black transition"
                          >
                            {shorten(p.title[lang] ?? p.title.en ?? "")}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}