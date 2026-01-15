import { publications } from "../../content/publications";
import { projects } from "../../content/projects";
import { cvHeader } from "../../content/cv/cvHeader";
import { cvContent } from "../../content/cv/";
import CVPrintButton from "./CVPrintButton";
import type { Lang } from "../../content/cv/";
import CVPdfButton from "./CVPdfButton";


{/*
const cvNotice = {
  en: "This CV is available in multiple languages. You can download language-specific versions.",
  kr: "이 CV는 여러 언어로 제공됩니다. 언어별 버전을 다운로드할 수 있습니다.",
  jp: "このCVは複数の言語で提供されています。言語別のバージョンをダウンロードできます。",
};
*/}

export default function CVContent({
  lang,
  onChangeLang,
}: {
  lang: Lang;
  onChangeLang: (l: Lang) => void;
}) {
  return (
    <>
      <CVPrintButton lang={lang} />

      <div className="space-y-6">
        <section className="px-4 pt-8 mx-auto print:hidden">
          <h2 className="text-lg font-semibold mb-2">Curriculum Vitae</h2>

          <div className="flex items-center gap-4 pt-2 mb-1">
            {/* ===== View selector ===== */}
            <div className="flex rounded-md border border-neutral-300 overflow-hidden text-xs">
              {(["en", "kr", "jp"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onChangeLang(l)}
                  className={`
              px-1.5 py-1.5
              transition
              ${l === lang
                      ? "bg-neutral-900 text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-100"}
            `}
                >
                  {l.toUpperCase()} View
                </button>
              ))}
            </div>

            {/* ===== PDF download ===== */}
            <CVPdfButton lang={lang} />
          </div>
        </section>


        <div className="flex justify-center">
          <div
            className="
                      cv-paper
                      w-full
                      px-4 py-6
                      text-xs leading-relaxed
                      bg-white border border-neutral-200 rounded-lg
                      md:max-w-[900px]
                      md:text-sm
                      md:rounded-none
                      md:shadow-xl md:border-neutral-200
                      md:px-16 md:py-24
                      "
          >
            {/* HEADER */}
            <section className="mb-12">
              <h1 className="text-2xl font-semibold">{cvHeader.name[lang]}</h1>

              <p className="text-sm text-neutral-600 mt-2">
                {cvHeader.contact.phone} · {cvHeader.contact.email}
              </p>

              <p className="text-sm text-neutral-600">
                {cvHeader.contact.website} · {cvHeader.location[lang]}
              </p>
            </section>

            {/* EDUCATION */}
            <Section id="cv-education" title={t(lang, "Education")}>
              {cvContent.education.map((e) => (
                <Entry
                  key={`${e.title.en}-${e.year}`}
                  title={
                    <>
                      {e.title[lang]}
                      <span className="text-neutral-600 font-normal italic text-[14px]">
                        , {e.city[lang]}
                      </span>
                    </>
                  }
                  right={e.year}
                >
                  <span className="text-neutral-600 text-[14px]">
                    {e.degree[lang]}, GPA: {e.gpa}
                  </span>
                </Entry>

              ))}
            </Section>

            {/* PROFESSIONAL */}
            <Section id="cv-professional" title={t(lang, "Professional Experience")}>
              {cvContent.professional.map((p, i) => (
                <Entry
                  key={i}
                  title={<>{p.role[lang]}</>}
                  right={p.year}
                >
                  <span className="text-neutral-600 text-[14px]">
                    {p.org[lang]}
                  </span>
                  {", "}
                  <span className="text-neutral-600 text-[13px] italic">
                    {p.city[lang].join("/")}
                  </span>

                  {/* details (optional) */}
                  {p.details?.[lang] && (
                    <ul className="mt-1 ml-4 list-disc text-[12px] text-neutral-600 leading-relaxed">
                      {p.details[lang].map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  )}
                </Entry>
              ))}
            </Section>

            {/* PUBLICATIONS */}
            <Section id="cv-publications" title={t(lang, "Publications")}>
              {publications.map((p) => (
                <Entry
                  key={p.id}
                  title={p.title[lang] ?? p.title.en}
                  right={String(p.year)}
                >
                  <p className="mt- 0.5text-neutral-600 text-[14px]">{p.authors?.map((a) => a.name).join(", ")}</p>
                  <p className="mt-0.5 italic text-neutral-600 text-[14px]">{p.venue[lang] ?? p.venue.en}</p>
                </Entry>
              ))}
            </Section>

            {/* PROJECTS */}
            <Section id="cv-projects" title={t(lang, "Projects")}>
              {projects.map((p) => (
                <Entry
                  key={p.id}
                  title={
                    <span>
                      <strong>{p.title[lang] ?? p.title.en}</strong>
                      <span className="text-neutral-600 text-[14px] font-normal italic">
                        , {p.type?.[lang] ?? ""}
                      </span>
                    </span>
                  }
                  right={String(p.year)}
                >
                  {p.affiliation?.map((a, i) => (
                    <p key={i} className="mt-0.5 text-neutral-600 text-[13px] pl-2">
                      {" "} •  {a[lang] ?? a.en}
                    </p>
                  ))}

                </Entry>
              ))}
            </Section>

            {/* ACTIVITIES */}
            <Section id="cv-activities" title={t(lang, "Additional Experience & Activities")}>
              {cvContent.activities.map((a, i) => (
                <Entry
                  key={i}
                  title={
                    <>
                      {a.title[lang]}
                      {", "}
                      <span className="text-neutral-600 text-[14px] font-normal italic">
                        {a.place[lang]}
                      </span>
                    </>
                  }
                  right={a.year}
                />
              ))}
            </Section>


            {/* AWARDS */}
            <Section id="cv-awards" title={t(lang, "Awards")}>
              {cvContent.awards.map((a, i) => (
                <Entry key={i} title={
                  <>
                    {a.title[lang]}
                    {", "}
                    <span className="text-neutral-600 text-[14px] font-normal italic">
                      {a.project[lang]}
                    </span>
                  </>
                }
                  right={a.year}>
                  <span className="text-neutral-600 text-[14px] font-normal">
                    {a.explain[lang]}
                  </span>
                </Entry>
              ))}
            </Section>

            {/* SKILLS */}
            <Section id="cv-skills" title={t(lang, "Skills")}>
              {cvContent.skills.map((s, i) => (
                <SkillGrid key={i} title={s.title[lang]} items={s.items} />
              ))}
            </Section>

            {/* LANGUAGES */}
            <Section id="cv-languages" title={t(lang, "Language Skills")}>
              <ul className="list-disc pl-5">
                {cvContent.languages.map((l, i) => (
                  <li key={i}>{l[lang]}</li>
                ))}
              </ul>
            </Section>
          </div>
        </div>
      </div>
    </>
  );

  /* ---------- helpers ---------- */

  function Section({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <section id={id} className="mb-10 scroll-mt-20">
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-2">
          {title}
        </h2>
        <div className="h-px bg-neutral-300 mb-4" />
        <div className="space-y-4">{children}</div>
      </section>
    );
  }


  function Entry({
    title,
    right,
    children,
  }: {
    title: React.ReactNode;
    right?: string;
    children?: React.ReactNode;
  }) {
    return (
      <div className="flex justify-between gap-6">
        <div>
          <div className="font-semibold">
            {title}
          </div>
          {children && (
            <div className="text-neutral-600 text-sm leading-snug">
              {children}
            </div>
          )}        </div>
        {right && <div className="text-neutral-500 whitespace-nowrap">{right}</div>}
      </div>
    );
  }

  function SkillGrid({ title, items }: { title: string; items: string[] }) {
    return (
      <div>
        <strong>{title}</strong>
        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1">
          {items.map((i) => (
            <span key={i}>• {i}</span>
          ))}
        </div>
      </div>
    );
  }

  function t(lang: Lang, key: string) {
    const map: Record<string, Record<Lang, string>> = {
      Education: { en: "Education", kr: "학력", jp: "学歴" },
      "Professional Experience": { en: "Professional Experience", kr: "경력", jp: "職務経歴" },
      Publications: { en: "Publications", kr: "논문", jp: "論文" },
      Projects: { en: "Projects", kr: "프로젝트", jp: "プロジェクト" },
      "Additional Experience & Activities": {
        en: "Additional Experience & Activities",
        kr: "기타 경험 및 활동",
        jp: "その他の活動",
      },
      Awards: { en: "Awards & Honors", kr: "수상 및 선정", jp: "受賞・表彰" },
      Skills: { en: "Skills", kr: "기술", jp: "スキル" },
      "Language Skills": { en: "Language Skills", kr: "언어 능력", jp: "語学力" },
    };
    return map[key]?.[lang] ?? key;
  }
}
