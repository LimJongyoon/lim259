import { projects } from "../../content/projects";
import { useLanguage } from "../../context/LanguageContext";
import { skills } from "../../content/common/skills";
import type { Project } from "../../types/Project";
import { useExpandController } from "../common/ExpandController";
import MediaBlock, { type Media } from "../common/MediaBlock";
import { navLabels } from "../navigation/navLabels";
import { outlineButton } from "../common/buttonStyles";
import type { SkillKey } from "../../content/common/skills";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function hasMedia(media?: Media) {
  return Boolean(
    media &&
      (media.video ||
        media.image ||
        media.videos?.length ||
        media.images?.length ||
        media.screens?.length)
  );
}

function tagStyle(color: string) {
  const light = isLightColor(color);
  return {
    backgroundColor: light
      ? `color-mix(in srgb, ${color} 30%, black 0%)`
      : color + "20",
    color: light ? `color-mix(in srgb, ${color} 100%, black 30%)` : color,
  };
}

export default function ProjectsContent() {
  const { lang } = useLanguage();
  const contentLang: "en" | "kr" | "jp" =
    lang === "en" || lang === "kr" || lang === "jp" ? lang : "en";

  const sectionTitle = navLabels[lang].projects;

  /* 스킬 태그 필터. 태그를 누르면 그 기술을 쓴 프로젝트만 남긴다. */
  const [activeTag, setActiveTag] = useState<SkillKey | null>(null);
  const visible = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  const {
    openIds,
    toggleOne,
    openAll,
    closeAll,
    sectionRef,
    inView,
  } = useExpandController(projects.map((p) => p.id));

  const isAllOpen = visible.every((p) => openIds.has(p.id));

  const selectTag = (tag: SkillKey) => {
    setActiveTag((prev) => (prev === tag ? null : tag));

    /* 목록이 짧아지면 보던 위치가 다른 섹션으로 밀리므로 섹션 맨 위로 되돌린다 */
    requestAnimationFrame(() => {
      const el = sectionRef.current;
      if (el && el.getBoundingClientRect().top < 0) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const label = {
    open: lang === "kr" ? "전체 펼치기" : lang === "jp" ? "すべて開く" : "Expand all",
    close: lang === "kr" ? "전체 접기" : lang === "jp" ? "すべて閉じる" : "Collapse all",
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-4 pt-8 pb-24 mx-auto scroll-mt-12"
    >
      {/* 모바일은 전체 펼치기를 제목 줄에 둔다(본문 위에 떠 있지 않게) */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">{sectionTitle}</h2>

        <button
          onClick={isAllOpen ? closeAll : openAll}
          className={`md:hidden px-3 py-1 text-xs ${outlineButton}`}
        >
          {isAllOpen ? label.close : label.open}
        </button>
      </div>

      {/* 선택된 태그 */}
      {activeTag && (
        <div className="mb-4 flex items-center gap-2 text-xs text-neutral-500">
          <span>
            {lang === "kr" ? "필터" : lang === "jp" ? "フィルター" : "Filter"}
          </span>
          <button
            onClick={() => setActiveTag(null)}
            style={tagStyle(skills[activeTag].color)}
            className="px-2 py-0.5 rounded text-[11px] font-medium"
          >
            {activeTag} ✕
          </button>
          <span className="text-neutral-400">
            {visible.length} / {projects.length}
          </span>
        </div>
      )}

      {/* PC toggle */}
      {inView && (
        <div className="hidden md:block fixed bottom-32 right-6 z-30 w-36">
          <div className="mb-1 text-[11px] text-neutral-500">
            {sectionTitle}
          </div>
          <button
            onClick={isAllOpen ? closeAll : openAll}
            className="w-full px-4 py-2 rounded-md bg-white/80 border text-sm shadow-md"
          >
            {isAllOpen ? label.close : label.open}
          </button>
        </div>
      )}

      <div className="space-y-4">
        {visible.map((p: Project, index) => {
          const isOpen = openIds.has(p.id);
          const prevYear = visible[index - 1]?.year;
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
                  {/* ===== LEFT + MIDDLE ===== */}
                  <div
                    className="
                      relative
                      col-span-2
                      grid grid-cols-[100px_1fr]
                      md:grid-cols-[180px_1fr]
                      gap-4
                      text-left
                      rounded-md
                      overflow-hidden
                    "
                  >
                    {/*
                      카드 전체를 덮는 투명 버튼이 펼침을 담당한다(hover 색도 여기서).
                      태그는 그 위(z-20)에 올려서 따로 누를 수 있게 한다.
                    */}
                    <button
                      onClick={() => toggleOne(p.id)}
                      aria-expanded={isOpen}
                      aria-label={title}
                      className="
                        absolute inset-0 z-10
                        rounded-md
                        transition-colors
                        hover:bg-green-300/15
                      "
                    />

                    {/* Thumbnail */}
                    <div className="relative z-0 aspect-[4/3] bg-neutral-100 rounded-md overflow-hidden">
                      {p.thumbnail && (
                        <img
                          src={p.thumbnail}
                          alt={title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Middle */}
                    <div className="min-w-0 space-y-0.5 pr-6">
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

                      <div className="relative z-20 w-fit pt-1 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => {
                          const skill = skills[tag];
                          if (!skill) return null;

                          const selected = activeTag === tag;

                          return (
                            <button
                              key={tag}
                              onClick={() => selectTag(tag)}
                              aria-pressed={selected}
                              style={tagStyle(skill.color)}
                              className={`
                                px-1.5 py-0.5 rounded text-[10px]
                                hover:underline underline-offset-2
                                ${selected ? "ring-1 ring-current font-semibold" : ""}
                              `}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 펼침 표시 */}
                    <ChevronDownIcon
                      className={`
                        pointer-events-none
                        absolute top-1 right-0.5
                        w-4 h-4 text-neutral-400
                        transition-transform duration-200
                        ${isOpen ? "rotate-180" : ""}
                      `}
                    />
                  </div>

                  {/* ===== RIGHT ===== */}
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

                {/* ===== EXPANDED ===== */}
                {isOpen && p.body && (
                  <div className="mt-3 space-y-4 text-sm text-neutral-700 animate-expand-in motion-reduce:animate-none">
                    {hasMedia(p.media) && p.media && (
                      <div className="relative rounded-md overflow-hidden bg-neutral-100 space-y-2">
                        <MediaBlock media={p.media} title={title} />

                        {p.links?.website && (
                          <a
                            href={p.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-2 right-2 px-2 py-1 text-[10px] bg-black/70 text-white rounded hover:bg-black"
                          >
                            {lang === "kr"
                              ? "웹사이트 방문"
                              : lang === "jp"
                              ? "ウェブサイトを見る"
                              : "Visit Website"}
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

                    <button
                      onClick={() => toggleOne(p.id)}
                      className="mt-6 w-full flex flex-col items-center text-xs text-neutral-400 hover:text-neutral-700 transition"
                    >
                      <span className="text-base leading-none">↑</span>
                      <span className="mt-1">
                        {lang === "kr" ? "접기" : lang === "jp" ? "閉じる" : "Collapse"}
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
