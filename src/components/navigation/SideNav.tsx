import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { NAV_ITEMS } from "./navItems";
import { navLabels, cvSectionLabels } from "./navLabels";
import { scrollToSection } from "./scrollToSection";
import { publications } from "../../content/publications";
import { projects } from "../../content/projects";

/* ---------- helpers ---------- */

function groupByYear<T extends { year: number }>(items: T[]) {
  return items.reduce<Record<number, T[]>>((acc, item) => {
    acc[item.year] = acc[item.year] || [];
    acc[item.year].push(item);
    return acc;
  }, {});
}

const shorten = (t: string) =>
  t.length > 10 ? `${t.slice(0, 18)}…` : t;

/* ---------- component ---------- */

export default function SideNav() {
  const { lang } = useLanguage();
  const labels = navLabels[lang];

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const pubByYear = groupByYear(publications);
  const projByYear = groupByYear(projects);

  const toggle = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  return (
    <nav className="fixed top-12 left-6 z-40 text-sm space-y-4 text-gray-700">
      {NAV_ITEMS.map((item) => {
        const isPublications = item.id === "publications";
        const isProjects = item.id === "projects";
        const isCV = item.id === "cv";

        return (
          <div key={item.id}>
            {/* ===== Top-level ===== */}
            <button
              onClick={() => {
                scrollToSection(item.id);
                if (isPublications || isProjects || isCV) {
                  toggle(item.id);
                } else {
                  setOpenCategory(null);
                }
              }}
              className="block hover:text-black transition"
            >
              {labels[item.id]}
            </button>

            {/* ===== Publications (by year) ===== */}
            {isPublications && openCategory === "publications" && (
              <div className="mt-2 ml-3 space-y-2 text-xs text-gray-500">
                {Object.keys(pubByYear)
                  .sort((a, b) => Number(b) - Number(a))
                  .map((year) => (
                    <div key={year}>
                      <div className="font-medium text-gray-400">{year}</div>
                      <div className="ml-2 space-y-1">
                        {pubByYear[Number(year)].map((p) => (
                          <button
                            key={p.id}
                            onClick={() =>
                              document
                                .getElementById(`publication-${p.id}`)
                                ?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                })
                            }
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

            {/* ===== Projects (by year) ===== */}
            {isProjects && openCategory === "projects" && (
              <div className="mt-2 ml-3 space-y-2 text-xs text-gray-500">
                {Object.keys(projByYear)
                  .sort((a, b) => Number(b) - Number(a))
                  .map((year) => (
                    <div key={year}>
                      <div className="font-medium text-gray-400">{year}</div>
                      <div className="ml-2 space-y-1">
                        {projByYear[Number(year)].map((p) => (
                          <button
                            key={p.id}
                            onClick={() =>
                              document
                                .getElementById(`project-${p.id}`)
                                ?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                })
                            }
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

            {/* ===== CV sub sections ===== */}
            {isCV && openCategory === "cv" && (
              <div className="mt-2 ml-3 space-y-1 text-xs text-gray-500">
                {item.subItems.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => scrollToSection(sub.id)}
                    className="block w-full text-left hover:text-black transition"
                  >
                    {shorten(cvSectionLabels[lang][sub.id])}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
