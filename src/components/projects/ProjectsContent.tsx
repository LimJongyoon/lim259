import { projects } from "../../content/projects";
import { useLanguage } from "../../context/LanguageContext";
import { skills } from "../../content/common/skills";
import type { Project } from "../../types/Project";
import { useExpandController } from "../common/ExpandController";

export default function ProjectsContent() {
  const { lang } = useLanguage();
  const contentLang: "en" | "kr" | "jp" =
    lang === "en" || lang === "kr" || lang === "jp" ? lang : "en";

  const sectionLabel = {
    projects: {
      en: "Projects",
      kr: "프로젝트",
      jp: "プロジェクト",
    },
    publications: {
      en: "Publications",
      kr: "논문",
      jp: "論文",
    },
  };
  const {
    openIds,
    toggleOne,
    openAll,
    closeAll,
    sectionRef,
    hasEntered,
  } = useExpandController(projects.map(p => p.id));

  const isAllOpen = openIds.size === projects.length;

  const label = {
    open: lang === "kr" ? "전체 펼치기" : "Expand all",
    close: lang === "kr" ? "전체 접기" : "Collapse all",
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-4 pt-8 pb-24 mx-auto"
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
      {hasEntered && (
        <div className="hidden md:block fixed bottom-32 right-6 z-30">
          <div className="mb-1 text-[11px] text-neutral-500">
            {sectionLabel.projects[lang] ?? sectionLabel.projects.en}
          </div>
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
          const title = p.title[lang] ?? p.title.en ?? "";

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

              <article id={`project-${p.id}`} className="pb-4">
                <div className="grid items-start gap-4 grid-cols-[100px_1fr] md:grid-cols-[180px_1fr_80px]">
                  <div className="aspect-[4/3] bg-neutral-100 rounded-md overflow-hidden">
                    {p.thumbnail && (
                      <img
                        src={p.thumbnail}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <button
                    onClick={() => toggleOne(p.id)}
                    className="text-left space-y-0.5 rounded-md hover:bg-neutral-50"
                  >
                    <h3 className="text-sm md:text-base font-semibold leading-snug">
                      {title}
                    </h3>

                    {p.affiliation && (
                      <div className="text-xs text-neutral-600 space-y-0.5">
                        {p.affiliation.map((a, i) => (
                          <div key={i}>{a[lang] ?? a.en}</div>
                        ))}
                      </div>
                    )}

                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => {
                        const skill = skills[tag];
                        if (!skill) return null;

                        const light = isLightColor(skill.color);

                        return (
                          <span
                            key={tag}
                            style={{
                              backgroundColor: light
                                ? `color-mix(in srgb, ${skill.color} 30%, black 0%)`
                                : skill.color + "20",
                              color: light
                                ? `color-mix(in srgb, ${skill.color} 100%, black 30%)`
                                : skill.color,
                            }}
                            className="px-2 py-0.5 rounded-full text-[10px]"
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </button>

                  <div className="hidden md:flex flex-col items-center gap-1 pt-1 text-[11px] text-neutral-500">
                    <span className="uppercase font-medium">
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
                  <div className="mt-3 space-y-4 text-sm text-neutral-700">

                    {(p.media?.video || p.media?.image) && (
                      <div className="relative rounded-md overflow-hidden bg-neutral-100 space-y-2">

                        {/* ===== Video ===== */}
                        {p.media?.video && (
                          p.media.video.endsWith(".mp4") ? (
                            <video
                              src={p.media.video}
                              controls
                              playsInline
                              className="w-full rounded-md"
                            />
                          ) : (
                            <div className="aspect-video">
                              <iframe
                                src={p.media.video}
                                className="w-full h-full rounded-md"
                                allowFullScreen
                              />
                            </div>
                          )
                        )}

                        {/* ===== Image ===== */}
                        {p.media?.image && (
                          <img
                            src={p.media.image}
                            alt={title}
                            className="w-full h-auto object-cover rounded-md"
                          />
                        )}

                        {/* ===== Website Button ===== */}
                        {p.links?.website && (
                          <a
                            href={p.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
          absolute top-2 right-2
          px-2 py-1
          text-[10px]
          bg-black/70 text-white
          rounded
          hover:bg-black
        "
                          >
                            {lang === "kr" ? "웹사이트 방문" : "Visit Website"}
                          </a>
                        )}
                      </div>
                    )}

                    {(p.links?.github || p.links?.demo) && (
                      <div className="flex gap-4 text-xs text-neutral-500">
                        {p.links.github && (
                          <a href={p.links.github} target="_blank">
                            GitHub →
                          </a>
                        )}
                        {p.links.demo && (
                          <a href={p.links.demo} target="_blank">
                            Demo →
                          </a>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-line leading-relaxed">
                      {p.body[contentLang] ?? p.body.en}
                    </div>

                    {/* Collapse button */}
                    <button
                      onClick={() => toggleOne(p.id)}
                      className="mt-6 w-full flex flex-col items-center text-xs text-neutral-400 hover:text-neutral-700 transition"
                    >
                      <span className="text-base leading-none">↑</span>
                      <span className="mt-1">
                        {lang === "kr" ? "접기" : "Collapse"}
                      </span>
                      <div className="mt-4 w-full h-px bg-neutral-200" />
                    </button>

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

function isLightColor(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 180;
}