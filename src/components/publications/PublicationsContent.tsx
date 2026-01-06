import { publications } from "../../content/publications";
import { useLanguage } from "../../context/LanguageContext";
import type { Publication } from "../../types/Publication";
import { useExpandController } from "../common/ExpandController";

export default function PublicationsContent() {
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
  const label = {
    open: lang === "kr" ? "전체 펼치기" : "Expand all",
    close: lang === "kr" ? "전체 접기" : "Collapse all",
  };
  const {
    openIds,
    toggleOne,
    openAll,
    closeAll,
    sectionRef,
    hasEntered,
  } = useExpandController(publications.map(p => p.id));

  const isAllOpen = openIds.size === publications.length;

  return (
    <section
      ref={sectionRef}
      className="relative px-4 pt-8 pb-24 max-w-[800px] mx-auto"
    >
      <h2 className="text-lg font-semibold mb-6">Publications</h2>

      {/* ===================== MOBILE TOGGLE ===================== */}
      <div className="md:hidden fixed bottom-[72px] left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={isAllOpen ? closeAll : openAll}
          className="
            px-5 py-2 rounded-full
            bg-white/80 backdrop-blur
            border border-neutral-300
            text-sm text-neutral-800
            shadow-lg
            hover:bg-white
            transition-colors
          "
        >
          {isAllOpen ? label.close : label.open}
        </button>
      </div>

      {/* ===================== PC TOGGLE ===================== */}
      {hasEntered && (
        <div className="hidden md:block fixed bottom-32 right-6 z-30">
          <div className="mb-1 text-[11px] text-neutral-500">
            {sectionLabel.publications[lang] ?? sectionLabel.publications.en}
          </div>
          <button
            onClick={isAllOpen ? closeAll : openAll}
            className="
              px-4 py-2 rounded-md
              bg-white/80 backdrop-blur
              border border-neutral-300
              text-sm text-neutral-700
              shadow-md
              hover:bg-white
              transition-colors
            "
          >
            {isAllOpen ? label.close : label.open}
          </button>
        </div>
      )}

      {/* ===================== LIST ===================== */}
      <div className="space-y-4">
        {publications.map((p: Publication, index) => {
          const isOpen = openIds.has(p.id);

          const prevYear = publications[index - 1]?.year;
          const showYearDivider = index === 0 || p.year !== prevYear;
          const isFirstOfYear = showYearDivider;

          const title =
            p.title[lang] ?? p.title.en ?? p.title.kr ?? "";

          const venue =
            p.venue[lang] ?? p.venue.en ?? p.venue.kr ?? "";

          return (
            <div key={p.id}>
              {showYearDivider && (
                <div className="flex items-center gap-3 my-2 md:my-4">
                  <span className="text-sm font-medium text-neutral-600">
                    {p.year}
                  </span>
                  <div className="flex-1 h-px bg-neutral-200" />
                </div>
              )}

              {/* ================= Card ================= */}
              <article
                id={`publication-${p.id}`}
                className={`
    pb-3
    ${isFirstOfYear ? "" : "border-b border-neutral-200"}
  `}
              >
                <div
                  className="
                    grid items-start gap-3
                    grid-cols-[100px_1fr_42px]
                    md:grid-cols-[180px_1fr_72px]
                  "
                >
                  {/* Thumbnail */}
                  <div className="aspect-[4/3] bg-neutral-100 rounded-md overflow-hidden">
                    {p.thumbnail && (
                      <img
                        src={p.thumbnail}
                        alt={title}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  {/* Middle */}
                  <button
                    onClick={() => toggleOne(p.id)}
                    className="
                      text-left min-w-0 space-y-0.5
                      rounded-md
                      transition-colors
                      hover:bg-neutral-50
                    "
                  >
                    <h3
                      className={`
                        text-sm font-semibold leading-snug break-words
                        ${isOpen ? "line-clamp-none" : "line-clamp-3"}
                      `}
                    >
                      {title}
                    </h3>

                    <div className="text-xs text-neutral-500 line-clamp-1">
                      {p.authors.map((a, i) => (
                        <span
                          key={a.name}
                          className={a.role === "first" ? "font-semibold text-blue-800" : ""}
                        >
                          {a.name}
                          {i < p.authors.length - 1 && ", "}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-neutral-400 italic line-clamp-1">
                      {venue}
                    </div>
                  </button>

                  {/* Right */}
                  <div className="flex flex-col items-center justify-center gap-1 text-[9px] text-neutral-400">

                    <span className="uppercase text-center">{p.type}</span>
                    <span className="text-center">{p.scope}</span>

                    {p.links?.pdf && (
                      <a
                        href={p.links.pdf}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src="/icons/pdf.png"
                          alt="PDF"
                          className="
                            w-10 h-10 md:w-12 md:h-12
                            opacity-80 hover:opacity-100
                            transition-opacity
                          "
                        />
                      </a>
                    )}
                  </div>
                </div>

                {/* Expanded */}
                {isOpen && (
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

                    {p.body && (
                      <div className="whitespace-pre-line leading-relaxed">
                        {p.body[contentLang] ?? p.body.en}
                      </div>
                    )}
                    {p.tags && p.tags.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="
                              text-[10px]
                              px-2 py-0.5
                              rounded-full
                              bg-neutral-100
                              text-neutral-500
                              leading-tight
                            "
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* ===== Collapse button ===== */}
                    <button
                      onClick={() => toggleOne(p.id)}
                      className="
                                  mt-6 w-full
                                  flex flex-col items-center
                                  text-xs text-neutral-400
                                  hover:text-neutral-700
                                  transition
                                "
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