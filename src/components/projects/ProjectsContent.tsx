import { useEffect, useRef, useState } from "react";
import { projects } from "../../content/projects";
import { useLanguage } from "../../context/LanguageContext";
import { skills } from "../../content/common/skills";
import type { Project } from "../../types/Project";

export default function ProjectsContent() {
  const { lang } = useLanguage();
  const contentLang: "en" | "kr" | "jp" =
    lang === "en" || lang === "kr" || lang === "jp" ? lang : "en";

  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const isAllOpen = openIds.size === projects.length;

  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleOne = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openAll = () =>
    setOpenIds(new Set(projects.map((p) => p.id)));

  const closeAll = () => {
    setOpenIds(new Set());
    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const label = {
    open: lang === "kr" ? "전체 펼치기" : "Expand all",
    close: lang === "kr" ? "전체 접기" : "Collapse all",
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-4 pt-8 pb-24 max-w-[900px] mx-auto"
    >
      <h2 className="text-lg font-semibold mb-6">Projects</h2>

      {/* Mobile toggle */}
      <div className="md:hidden fixed bottom-[72px] left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={isAllOpen ? closeAll : openAll}
          className="px-5 py-2 rounded-full bg-white/80 border text-sm shadow-lg"
        >
          {isAllOpen ? label.close : label.open}
        </button>
      </div>

      {/* PC toggle */}
      {inView && (
        <div className="hidden md:block fixed bottom-6 right-6 z-30">
          <button
            onClick={isAllOpen ? closeAll : openAll}
            className="px-4 py-2 rounded-md bg-white/80 border text-sm shadow-md"
          >
            {isAllOpen ? label.close : label.open}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {projects.map((p: Project, index) => {
          const isOpen = openIds.has(p.id);

          const prevYear = projects[index - 1]?.year;
          const showYearDivider = index === 0 || p.year !== prevYear;
          //const isFirstOfYear = showYearDivider;

          const title =
            p.title[lang] ?? p.title.en ?? p.title.kr ?? "";

          return (
            <div key={p.id}>
              {showYearDivider && (
                <div className="flex items-center gap-3 my-4">
                  <span className="text-sm font-medium text-neutral-600">
                    {p.year}
                  </span>
                  <div className="flex-1 h-px bg-neutral-200" />
                </div>
              )}
              <article className="pb-4">
                <div
                  className="
                    grid items-start gap-4
                    grid-cols-[120px_1fr]
                    md:grid-cols-[180px_1fr_80px]
                  "
                >
                  {/* Thumbnail */}
                  <div className="aspect-[4/3] bg-neutral-100 rounded-md overflow-hidden">
                    {p.thumbnail && (
                      <img
                        src={p.thumbnail}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Middle */}
                  <button
                    onClick={() => toggleOne(p.id)}
                    className="text-left space-y-0.5 rounded-md hover:bg-neutral-50"
                  >
                    <h3 className="text-sm md:text-base font-semibold leading-snug">
                      {title}
                    </h3>

                    {p.affiliation && p.affiliation.length > 0 && (
                      <div className="text-xs text-neutral-600 leading-relaxed space-y-0.5">
                        {p.affiliation.map((a, i) => (
                          <div key={i}>
                            {a[lang] ?? a.en}
                          </div>
                        ))}
                      </div>
                    )}

                    {p.tags && p.tags.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => {
                          const skill = skills[tag];
                          if (!skill) return null;
                          return (
                            <span
                              key={tag}
                              title={tag}
                              style={{
                                backgroundColor: skill.color + "20",
                                color: skill.color,
                              }}
                              className="px-2 py-0.5 rounded-full text-[10px]"
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </button>

                  {/* Right (PC only) */}
                  <div className="hidden md:flex flex-col items-center gap-1 pt-1 text-[11.5px] text-neutral-500">
                    <span className="uppercase font-medium text-neutral-600">
                      {p.type?.[lang] ?? p.type?.en}
                    </span>

                    {p.scope && (
                      <span className="text-neutral-400">
                        {p.scope?.[lang] ?? p.scope?.en}
                      </span>
                    )}
                  </div>
                </div>

                {isOpen && p.body && (
                  <div className="mt-3 space-y-3 text-sm text-neutral-700">
                    {p.media?.video && (
                      <div className="aspect-video">
                        <iframe
                          src={p.media.video}
                          className="w-full h-full rounded-md"
                          allowFullScreen
                        />
                      </div>
                    )}
                    <div className="whitespace-pre-line leading-relaxed">
                      {p.body[contentLang] ?? p.body.en}
                    </div>
                  </div>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}