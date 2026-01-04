import { useEffect, useRef, useState } from "react";
import { publications } from "../../content/publications";
import { useLanguage } from "../../context/LanguageContext";
import type { Publication } from "../../types/Publication";

export default function PublicationsContent() {
  const { lang } = useLanguage();

  /* ---------------- open state ---------------- */
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const isAllOpen = openIds.size === publications.length;

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

  /* ---------------- handlers ---------------- */
  const toggleOne = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openAll = () => {
    setOpenIds(new Set(publications.map((p) => p.id)));
  };

  const closeAll = () => {
    setOpenIds(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const label = {
    open: lang === "kr" ? "전체 펼치기" : "Expand all",
    close: lang === "kr" ? "전체 접기" : "Collapse all",
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-4 pt-8 pb-24 max-w-[800px] mx-auto"
    >
      <h2 className="text-lg font-semibold mb-6">Publications</h2>

      {/* ===================== MOBILE FLOATING TOGGLE ===================== */}
      <div className="md:hidden fixed bottom-[72px] left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={isAllOpen ? closeAll : openAll}
          className="
            px-5 py-2
            rounded-full
            bg-neutral-900 text-white
            text-sm font-medium
            shadow-lg
            hover:bg-neutral-800
            transition-colors
          "
        >
          {isAllOpen ? label.close : label.open}
        </button>
      </div>

      {/* ===================== PC FLOATING TOGGLE ===================== */}
      {inView && (
        <div className="hidden md:block fixed bottom-6 right-6 z-30">
          <button
            onClick={isAllOpen ? closeAll : openAll}
            className="
              px-4 py-2
              rounded-md
              bg-white
              border border-neutral-300
              text-sm text-neutral-700
              shadow-md
              hover:bg-neutral-50
              transition-colors
            "
          >
            {isAllOpen ? label.close : label.open}
          </button>
        </div>
      )}

      {/* ===================== LIST ===================== */}
      <div className="space-y-6">
        {publications.map((p: Publication) => {
          const isOpen = openIds.has(p.id);

          const title =
            p.title[lang] ?? p.title.en ?? p.title.kr ?? "";

          const venue =
            p.venue[lang] ?? p.venue.en ?? p.venue.kr ?? "";

          return (
            <article key={p.id} className="border-b border-neutral-200 pb-5">
              <div
                className="
                  grid items-start gap-3
                  grid-cols-[96px_1fr_48px]
                  md:grid-cols-[140px_1fr_72px]
                "
              >
                {/* ================= Thumbnail + Year ================= */}
                <div className="relative">
                  <div className="relative aspect-[4/3] bg-neutral-100 rounded-md overflow-hidden">
                    {/* 
                      모바일 연도 배지
                      🔧 top-[55%] ~ top-[65%] 값 조절해서
                      이미지와 30~40% 정도만 겹치게 튜닝 가능
                    */}
                    <span
                      className="
                        md:hidden
                        absolute left-1
                        top-[0%]
                        text-[10px]
                        bg-black/60 text-white
                        px-1.5 py-0.5 rounded
                      "
                    >
                      {p.year}
                    </span>

                    {/* PC 연도 배지 */}
                    <span
                      className="
                        hidden md:block
                        absolute top-1 left-1
                        text-[10px]
                        bg-black/60 text-white
                        px-1.5 py-0.5 rounded
                      "
                    >
                      {p.year}
                    </span>

                    {p.thumbnail && (
                      <img
                        src={p.thumbnail}
                        alt={title}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* ================= Middle (hover + toggle) ================= */}
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
                    {p.authors.map((a) => a.name).join(", ")}
                  </div>

                  <div className="text-xs text-neutral-400 line-clamp-1">
                    {venue}
                  </div>
                </button>

                {/* ================= Right ================= */}
                <div className="flex flex-col items-end gap-1 text-[11px] text-neutral-400">
                  <span className="hidden md:block uppercase">{p.type}</span>
                  <span className="hidden md:block">{p.scope}</span>

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

              {/* ================= Expanded ================= */}
              {isOpen && (
                <div className="mt-4 space-y-3 text-sm text-neutral-700">
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
                      {p.body}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}