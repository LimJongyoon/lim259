import { publications } from "../../content/publications";
import { projects } from "../../content/projects";
import { cvHeader } from "../../content/cv/cvHeader";
import { cvContent } from "../../content/cv/";
import type { Lang } from "../../content/cv/";

export default function CVContent({ lang }: { lang: Lang }) {
  return (
    <div className="flex justify-center">
      <div
        className="
    cv-paper
    w-full
    px-4 py-8
    text-sm leading-relaxed
    bg-white border border-neutral-200 rounded-lg
    md:max-w-[794px]
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
        <Section title={t(lang, "Education")}>
          {cvContent.education.map((e, i) => (
            <Entry key={i} title={e.title[lang]} right={e.year}>
              <p>
                {e.degree[lang]}, GPA: {e.gpa}
              </p>
              <p className="italic">{e.coursework[lang]}</p>
            </Entry>
          ))}
        </Section>

        {/* PROFESSIONAL */}
        <Section title={t(lang, "Professional Experience")}>
          {cvContent.professional.map((p, i) => (
            <Entry key={i} title={p.role[lang]} right={p.year}>
              {p.org[lang]}
            </Entry>
          ))}
        </Section>

        {/* PUBLICATIONS */}
        <Section title={t(lang, "Publications")}>
          {publications.map((p) => (
            <Entry
              key={p.id}
              title={p.title[lang] ?? p.title.en}
              right={String(p.year)}
            >
              <p>{p.authors?.map((a) => a.name).join(", ")}</p>
              <p className="italic">{p.venue[lang] ?? p.venue.en}</p>
            </Entry>
          ))}
        </Section>

        {/* PROJECTS */}
        <Section title={t(lang, "Projects")}>
          {projects.map((p) => (
            <Entry
              key={p.id}
              title={
                <span>
                  <strong>{p.title[lang] ?? p.title.en}</strong>{" "}
                  <span className="font-normal">
                    ({p.type?.[lang] ?? ""})
                  </span>
                </span>
              }
              right={String(p.year)}
            >
              {p.affiliation?.map((a, i) => (
                <p key={i}>{a[lang] ?? a.en}</p>
              ))}
            </Entry>
          ))}
        </Section>

        {/* ACTIVITIES */}
        <Section title={t(lang, "Additional Experience & Activities")}>
          {cvContent.activities.map((a, i) => (
            <Entry key={i} title={a.title[lang]} right={a.year}>
              {a.place[lang]}
            </Entry>
          ))}
        </Section>

        {/* AWARDS */}
        <Section title={t(lang, "Awards")}>
          {cvContent.awards.map((a, i) => (
            <Entry key={i} title={a.title[lang]} right={a.year}>
              {a.project}
            </Entry>
          ))}
        </Section>

        {/* SKILLS */}
        <Section title={t(lang, "Skills")}>
          {cvContent.skills.map((s, i) => (
            <SkillGrid key={i} title={s.title[lang]} items={s.items} />
          ))}
        </Section>

        {/* LANGUAGES */}
        <Section title={t(lang, "Language Skills")}>
          <ul className="list-disc pl-5">
            {cvContent.languages.map((l, i) => (
              <li key={i}>{l[lang]}</li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
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
        <div className="font-medium">{title}</div>
        {children && <div className="text-neutral-700">{children}</div>}
      </div>
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
    Awards: { en: "Awards", kr: "수상", jp: "受賞" },
    Skills: { en: "Skills", kr: "기술", jp: "スキル" },
    "Language Skills": { en: "Language Skills", kr: "언어 능력", jp: "語学力" },
  };
  return map[key]?.[lang] ?? key;
}
