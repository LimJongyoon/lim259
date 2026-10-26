import CVPdfLink from "./CVPdfLink";
import type { Lang } from "../../content/cv";

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
    <>
      {/* Mobile */}
      <div className="md:hidden fixed bottom-[72px] left-1/2 -translate-x-1/2 z-30 print:hidden">
        <CVPdfLink lang={lang}>
          {({ loading }: { loading: boolean }) => (
            <button className="px-5 py-2 rounded-full bg-white/80 border text-sm shadow-lg">
              {loading ? preparing : label}
            </button>
          )}
        </CVPdfLink>
      </div>

      {/* Desktop */}
      {/* 데스크탑: 항상 표시. 섹션별 전체 펼치기 버튼은 이 위(bottom-32)에 뜬다 */}
      <div className="hidden md:block fixed bottom-14 right-6 z-30 w-36 print:hidden">
        <div className="mb-1 text-[11px] text-neutral-500">CV</div>
        <CVPdfLink lang={lang}>
          {({ loading }: { loading: boolean }) => (
            <button className="w-full px-4 py-2 rounded-md bg-white/80 border text-sm shadow-md">
              {loading ? preparing : label}
            </button>
          )}
        </CVPdfLink>
      </div>
    </>
  );
}
