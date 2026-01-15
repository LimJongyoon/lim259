import ReactMarkdown from "react-markdown";
import { useLanguage } from "../../context/LanguageContext";

import homeKr from "../../content/home/home.kr.md?raw";
import homeEn from "../../content/home/home.en.md?raw";

type Props = {
  align?: "center" | "left";
};

export default function HomeContent({ align = "center" }: Props) {
  const { lang } = useLanguage();
  const content = lang === "kr" ? homeKr : homeEn;

  const alignClass =
    align === "center" ? "text-center" : "text-left";


/*
 * Typography Scale (Tailwind 기준)

  text-xs   → 12px  : 캡션, 메타 정보, 보조 설명
  text-sm   → 14px  : 본문 (모바일 기본)
  text-base → 16px  : 본문 (PC 기본)
  text-lg   → 18px  : 강조 텍스트, 리드 문장
  text-xl   → 20px  : 소제목
  text-2xl  → 24px  : 섹션 타이틀
  text-3xl  → 30px  : Hero 제목
  text-4xl  → 36px  : 큰 Hero
  text-5xl  → 48px  : 메인 랜딩 타이틀
  text-6xl  → 60px  : 과한 수준 (거의 사용 안 함)

  leading-none
  leading-tight
  leading-snug
  leading-normal
  leading-relaxed
  leading-loose

  tracking-tighter
  tracking-tight
  tracking-normal
  tracking-wide
  tracking-wider
  tracking-widest

  font-thin
  font-extralight
  font-light
  font-normal
  font-medium
  font-semibold
  font-bold
  font-extrabold
  font-black

*/

  return (
    <article
      className={`
    max-w-xl
    px-2
    text-gray-800
    ${alignClass}

    prose prose-neutral

    prose-h1:text-2xl
    md:prose-h1:text-4xl
    prose-h1:font-medium
    prose-h1:tracking-normal
    prose-h1:mb-2
    prose-h1:text-gray-700

    prose-h2:text-base
    prose-h2:font-semibold
    prose-h2:tracking-tight
    prose-h2:mt-5
    prose-h2:mb-4
    prose-h2:text-emerald-900
    

    prose-p:text-sm
    prose-p:leading-normal
    prose-p:text-gray-700

    prose-p:my-2
    prose-strong:font-normal
    prose-strong:text-emerald-800

    prose-h6:text-xs
    prose-h6:text-gray-700

    prose-h5:text-xs
    prose-h5:text-gray-600
    prose-h5:mt-4

    prose-ul:mt-2
    prose-li:my-0
  `}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}