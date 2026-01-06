import { publications } from "../../content/publications";
import { projects } from "../../content/projects";
import { cvHeader } from "../../content/cv/cvHeader";
import type { Lang } from "../../content/cv";

export default function CVContent({ lang }: { lang: Lang }) {
  return (
    <div className="flex justify-center">
      <div
        className="
          cv-paper
          w-full
          px-6 py-12
          text-sm leading-relaxed
          md:max-w-[794px]
          md:bg-white md:text-black
          md:shadow-xl md:border md:border-neutral-200
          md:px-16 md:py-24
        "
      >
        <section className="mb-12">
          <h1 className="text-2xl font-semibold leading-tight">
            {cvHeader.name[lang]}
          </h1>

          <p className="text-sm text-neutral-600 mt-2">
            {cvHeader.contact.phone} · {cvHeader.contact.email}
          </p>

          <p className="text-sm text-neutral-600">
            {cvHeader.contact.website} · {cvHeader.location[lang]}
          </p>

          <div className="h-px bg-neutral-300 mt-4" />
        </section>

        {/* EDUCATION */}
        <Section title={t(lang, "Education")}>
          <Entry title="Sogang University, Seoul" right="2019–2021">
            <p>M.S., Art & Technology, GPA: 3.89 / 4.30</p>
            <p className="italic">
              Relevant coursework: Human-Computer Interaction, Artificial
              Intelligence, Haptics, AR/VR
            </p>
          </Entry>

          <Entry title="Soongsil University, Seoul" right="2014–2018">
            <p>B.S., Electronic Engineering (ABEEK), GPA: 4.12 / 4.50</p>
            <p className="italic">
              Relevant coursework: Circuit Design, Embedded Systems, Control
              Engineering, Machine Learning
            </p>
          </Entry>
        </Section>

        {/* PROFESSIONAL EXPERIENCE */}
        <Section title={t(lang, "Professional Experience")}>
          <Entry title="Semiconductor Optical Engineer" right="2017–2019">
            Canon, Suwon / Utsunomiya / Munich
          </Entry>
        </Section>

        {/* PUBLICATIONS */}
        <Section title={t(lang, "Publications")}>
          {publications
            .sort(
              (a, b) =>
                a.year !== b.year
                  ? b.year - a.year
                  : (a.order ?? 99) - (b.order ?? 99)
            )
            .map((p) => (
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
          {projects
            .sort(
              (a, b) =>
                a.year !== b.year
                  ? b.year - a.year
                  : (a.order ?? 99) - (b.order ?? 99)
            )
            .map((p) => (
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

        {/* ADDITIONAL EXPERIENCE */}
        <Section title={t(lang, "Additional Experience & Activities")}>
          <Entry title="Participated in the CES 2024 exhibition booth" right="2024">
            Las Vegas, USA
          </Entry>
        </Section>

        {/* AWARDS */}
        <Section title={t(lang, "Awards")}>
          <Entry
            title="Selected for the New Content Support Program by KOCCA"
            right="2024"
          >
            BareHand
          </Entry>
        </Section>

        {/* SKILLS */}
        <Section title={t(lang, "Skills")}>
          <SkillGrid
            title="Programming Languages"
            items={[
              "Python (AI, image recognition)",
              "C/C++ (Embedded systems)",
              "C# (Game, VR/AR)",
              "Swift (iOS)",
              "JavaScript (Web)",
            ]}
          />
          <SkillGrid
            title="Hardware Engineering"
            items={[
              "Circuit design & analysis",
              "Embedded systems",
              "Soldering & repair",
              "3D printing & laser cutting",
              "Mechanical design",
            ]}
          />
          <SkillGrid
            title="Software & Tools"
            items={[
              "Unity, Blender",
              "Final Cut, DaVinci Resolve",
              "Figma",
              "MATLAB, SPSS",
              "OrCAD PSpice",
              "Microsoft Office",
            ]}
          />
        </Section>

        {/* LANGUAGE */}
        <Section title={t(lang, "Language Skills")}>
          <ul className="list-disc pl-5">
            <li>Fluent Korean (native)</li>
            <li>Proficient English (OPIc IH)</li>
            <li>Basic Japanese (speaking & listening)</li>
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
    <div className="mb-4">
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
