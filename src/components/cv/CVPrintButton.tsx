import CVPdfLink from "./CVPdfLink";
import type { Lang } from "../../content/cv";

/*
 * 데스크탑 우측 하단에 항상 떠 있는 CV PDF 버튼.
 * 모바일은 CV 상단의 CVPdfButton 하나만 쓴다(본문을 가리는 고정 버튼을 두지 않는다).
 */
export default function CVPrintButton({ lang }: { lang: Lang }) {
  const label =
    lang === "kr"
      ? "PDF로 저장"
      : lang === "jp"
      ? "PDF出力"
      : "Download PDF";

  const preparing =
    lang === "kr" ? "준비 중..." : lang === "jp" ? "準備中..." : "Preparing...";

  return (
    /* 섹션별 전체 펼치기 버튼은 이 위(bottom-32)에 뜬다 */
    <div className="hidden md:block fixed bottom-14 right-6 z-30 w-36 print:hidden">
      <div className="mb-1 text-[11px] text-neutral-500">CV</div>
      <CVPdfLink lang={lang}>
        {({ loading }) => (
          <button
            disabled={loading}
            className="w-full px-4 py-2 rounded-md bg-white/80 border text-sm shadow-md"
          >
            {loading ? preparing : label}
          </button>
        )}
      </CVPdfLink>
    </div>
  );
}
