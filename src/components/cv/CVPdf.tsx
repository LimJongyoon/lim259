import {
  Document,
  Page,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";

import { styles } from "./CVPdfStyles";

import { publications } from "../../content/publications";
import { projects } from "../../content/projects";
import { cvHeader } from "../../content/cv/cvHeader";
import { cvContent } from "../../content/cv";
import type { Lang } from "../../content/cv";

/* ---------- font register ---------- */

Font.register({
  family: "NotoSansKR",
  fonts: [
    { src: "/fonts/NotoSansKR-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/NotoSansKR-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/NotoSansKR-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/NotoSansKR-Bold.ttf", fontWeight: 700 },
  ],
});

Font.register({
  family: "NotoSansJP",
  fonts: [
    { src: "/fonts/NotoSansJP-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/NotoSansJP-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/NotoSansJP-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/NotoSansJP-Bold.ttf", fontWeight: 700 },
  ],
});

/* ---------- helpers ---------- */

const fontFamily = (lang: Lang) =>
  lang === "jp" ? "NotoSansJP" : lang === "kr" ? "NotoSansKR" : "Helvetica";

const withFont = (style: any, lang: Lang) => [
  style,
  { fontFamily: fontFamily(lang) },
];

/* ---------- document ---------- */

export function CVPdf({ lang }: { lang: Lang }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <Text style={[
            ...withFont(styles.name, lang),
            { marginBottom: 15 }
            ]}
            >
            {cvHeader.name[lang]}
          </Text>

          <Text style={withFont(styles.meta, lang)}>
            {cvHeader.contact.phone} · {cvHeader.contact.email}
          </Text>
          <Text style={withFont(styles.meta, lang)}>
            {cvHeader.contact.website} · {cvHeader.location[lang]}
          </Text>
        </View>

        {/* ===== EDUCATION ===== */}
        <Section title={t(lang, "Education")} lang={lang}>
          {cvContent.education.map((e) => (
            <Entry
              key={e.year}
              title={
                <>
                  <Text style={withFont(styles.entryTitle, lang)}>
                    {e.title[lang]}
                  </Text>
                  <Text style={withFont(styles.italic, lang)}>
                    , {e.city[lang]}
                  </Text>
                </>
              }
              right={e.year}
              lang={lang}
            >
              <Text style={withFont(styles.entryBody, lang)}>
                {e.degree[lang]}, GPA: {e.gpa}
              </Text>
            </Entry>
          ))}
        </Section>

        {/* ===== PROFESSIONAL ===== */}
        <Section title={t(lang, "Professional Experience")} lang={lang}>
          {cvContent.professional.map((p, i) => (
            <Entry
              key={i}
              title={
                <Text style={withFont(styles.entryTitle, lang)}>
                  {p.role[lang]}
                </Text>
              }
              right={p.year}
              lang={lang}
            >
              <Text style={withFont(styles.entryBody, lang)}>
                {p.org[lang]},{" "}
                <Text style={withFont(styles.italic, lang)}>
                  {p.city[lang].join("/")}
                </Text>
              </Text>

              {p.details?.[lang] && (
                <BulletList items={p.details[lang]} lang={lang} />
              )}
            </Entry>
          ))}
        </Section>

        {/* ===== PUBLICATIONS ===== */}
        <Section title={t(lang, "Publications")} lang={lang}>
          {publications.map((p) => (
            <Entry
              key={p.id}
              title={
                <Text style={withFont(styles.entryTitle, lang)}>
                  {p.title[lang] ?? p.title.en}
                </Text>
              }
              right={String(p.year)}
              lang={lang}
            >
              <Text style={withFont(styles.entryBody, lang)}>
                {p.authors?.map((a) => a.name).join(", ")}
              </Text>
              <Text style={withFont(styles.italic, lang)}>
                {p.venue[lang] ?? p.venue.en}
              </Text>
            </Entry>
          ))}
        </Section>

        {/* ===== PROJECTS ===== */}
        <Section title={t(lang, "Projects")} lang={lang}>
          {projects.map((p) => (
            <Entry
              key={p.id}
              title={
                <>
                  <Text style={withFont(styles.bold, lang)}>
                    {p.title[lang] ?? p.title.en}
                  </Text>
                  {p.type?.[lang] && (
                    <Text style={withFont(styles.italic, lang)}>
                      , {p.type[lang]}
                    </Text>
                  )}
                </>
              }
              right={String(p.year)}
              lang={lang}
            >
              {p.affiliation?.map((a, i) => (
                <Text key={i} style={withFont(styles.bullet, lang)}>
                  • {a[lang] ?? a.en}
                </Text>
              ))}
            </Entry>
          ))}
        </Section>

        {/* ===== ACTIVITIES ===== */}
        <Section title={t(lang, "Additional Experience & Activities")} lang={lang}>
          {cvContent.activities.map((a, i) => (
            <Entry
              key={i}
              title={
                <>
                  <Text style={withFont(styles.entryTitle, lang)}>
                    {a.title[lang]}
                  </Text>
                  <Text style={withFont(styles.italic, lang)}>
                    , {a.place[lang]}
                  </Text>
                </>
              }
              right={a.year}
              lang={lang}
            />
          ))}
        </Section>

        {/* ===== AWARDS ===== */}
        <Section title={t(lang, "Awards")} lang={lang}>
          {cvContent.awards.map((a, i) => (
            <Entry
              key={i}
              title={
                <>
                  <Text style={withFont(styles.entryTitle, lang)}>
                    {a.title[lang]}
                  </Text>
                  <Text style={withFont(styles.italic, lang)}>
                    , {a.project[lang]}
                  </Text>
                </>
              }
              right={a.year}
              lang={lang}
            >
              <Text style={withFont(styles.entryBody, lang)}>
                {a.explain[lang]}
              </Text>
            </Entry>
          ))}
        </Section>

        {/* ===== SKILLS ===== */}
        <Section title={t(lang, "Skills")} lang={lang}>
          {cvContent.skills.map((s, i) => (
            <SkillGrid
              key={i}
              title={s.title[lang]}
              items={s.items}
              lang={lang}
            />
          ))}
        </Section>

        {/* ===== LANGUAGES ===== */}
        <Section title={t(lang, "Language Skills")} lang={lang}>
          <BulletList
            items={cvContent.languages.map((l) => l[lang])}
            lang={lang}
          />
        </Section>
      </Page>
    </Document>
  );
}

/* ---------- components ---------- */

function Section({
  title,
  children,
  lang,
}: {
  title: string;
  children: React.ReactNode;
  lang: Lang;
}) {
  return (
    <View style={styles.section}>
      <Text style={withFont(styles.sectionTitle, lang)}>{title}</Text>
      <View style={styles.divider} />
      {children}
    </View>
  );
}

function Entry({
  title,
  right,
  children,
  lang,
}: {
  title: React.ReactNode;
  right?: string;
  children?: React.ReactNode;
  lang: Lang;
}) {
  return (
    <View style={styles.entry}>
      <View style={styles.entryLeft}>
        <Text>{title}</Text>
        {children}
      </View>
      {right && (
        <Text style={withFont(styles.entryRight, lang)}>{right}</Text>
      )}
    </View>
  );
}

function BulletList({
  items,
  lang,
}: {
  items: string[];
  lang: Lang;
}) {
  return (
    <View style={{ marginTop: 4 }}>
      {items.map((item, i) => (
        <Text key={i} style={withFont(styles.bullet, lang)}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

function SkillGrid({
  title,
  items,
  lang,
}: {
  title: string;
  items: string[];
  lang: Lang;
}) {
  return (
    <View style={{ marginBottom: 6 }}>
      <Text style={withFont(styles.entryTitle, lang)}>{title}</Text>
      <View style={styles.skillGrid}>
        {items.map((i) => (
          <Text key={i} style={withFont(styles.skillItem, lang)}>
            • {i}
          </Text>
        ))}
      </View>
    </View>
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
    Awards: { en: "Awards & Honors", kr: "수상", jp: "受賞" },
    Skills: { en: "Skills", kr: "기술", jp: "スキル" },
    "Language Skills": { en: "Language Skills", kr: "언어 능력", jp: "語学力" },
  };
  return map[key]?.[lang] ?? key;
}
