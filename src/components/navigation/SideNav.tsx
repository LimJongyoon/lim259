import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { NAV_ITEMS } from "./navItems";
import { navLabels, cvSectionLabels } from "./navLabels";
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

/* ---------- scroll helper ---------- */

export function scrollToSection(id: string) {
  const targetId = id === "home" ? "home-hero" : id;
  const el = document.getElementById(targetId);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* ---------- component ---------- */

export default function SideNav() {

  const { lang } = useLanguage();
  const labels = navLabels[lang];

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>("home");

  const pubByYear = groupByYear(publications);
  const projByYear = groupByYear(projects);

  const baseItem =
    "block w-full text-left px-2 py-1 rounded transition " +
    "hover:text-emerald-800 hover:font-semibold hover:scale-[1.04]";

  /* ===== Scroll Spy ===== */

  useEffect(() => {
    const onScroll = () => {

      if (window.scrollY < 80) {
        setActiveId("home");
        return;
      }

      const ids = NAV_ITEMS.map(i => i.id);

      for (let id of [...ids].reverse()) {

        const targetId = id === "home" ? "home-hero" : id;
        const el = document.getElementById(targetId);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.4) {
          setActiveId(id);
          return;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggle = (id: string) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  return (
    <nav
      className="
        fixed top-12 left-6 z-40
        text-sm text-gray-700

        h-[calc(100vh-296px)]
        w-[220px]

        overflow-hidden
      "
    >

      {/* ===== INTERNAL SCROLL AREA ===== */}
        <div
          className="
            sidebar-scroll
            h-full
            overflow-y-auto
            pr-2
            space-y-4
        "
      >

        {NAV_ITEMS.map((item) => {

          const isPublications = item.id === "publications";
          const isProjects = item.id === "projects";
          const isCV = item.id === "cv";
          const isHome = item.id === "home";

          const isActive = activeId === item.id;

          return (
            <div key={item.id}>

              {/* ===== Top-level ===== */}
              <button
                onClick={() => {
                  if (isHome) {
                    goTop();
                    setOpenCategory(null);
                  } else {
                    scrollToSection(item.id);

                    if (isPublications || isProjects || isCV) {
                      toggle(item.id);
                    } else {
                      setOpenCategory(null);
                    }
                  }
                }}
                className={`${baseItem} ${
                  isActive
                    ? "font-bold text-emerald-700 scale-[1.06]"
                    : ""
                }`}
              >
                {labels[item.id]}
              </button>

              {/* ===== Publications ===== */}
              {isPublications && openCategory === "publications" && (
                <div className="mt-2 ml-3 space-y-2 text-xs text-gray-500">

                  {Object.keys(pubByYear)
                    .sort((a, b) => Number(b) - Number(a))
                    .map((year) => (
                      <div key={year}>

                        <div className="px-2 text-gray-400 font-medium">
                          {year}
                        </div>

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
                              className={baseItem}
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
              {isProjects && openCategory === "projects" && (
                <div className="mt-2 ml-3 space-y-2 text-xs text-gray-500">

                  {Object.keys(projByYear)
                    .sort((a, b) => Number(b) - Number(a))
                    .map((year) => (
                      <div key={year}>

                        <div className="px-2 text-gray-400 font-medium">
                          {year}
                        </div>

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
                              className={baseItem}
                            >
                              {shorten(p.title[lang] ?? p.title.en ?? "")}
                            </button>
                          ))}
                        </div>

                      </div>
                    ))}
                </div>
              )}

              {/* ===== CV ===== */}
              {isCV && openCategory === "cv" && (
                <div className="mt-2 ml-3 space-y-1 text-xs text-gray-500">
                  {item.subItems.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => scrollToSection(sub.id)}
                      className={baseItem}
                    >
                      {shorten(cvSectionLabels[lang][sub.id])}
                    </button>
                  ))}
                </div>
              )}

            </div>
          );
        })}

      </div>
    </nav>
  );
}
