import CVPdfLink from "./CVPdfLink";
import type { Lang } from "../../content/cv";

export default function CVPrintButton({ lang }: { lang: Lang }) {
  const label =
    lang === "kr"
      ? "PDF로 저장"
      : lang === "jp"
      ? "PDF出力"
      : "Download PDF";

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden fixed bottom-[72px] left-1/2 -translate-x-1/2 z-30 print:hidden">
        <CVPdfLink lang={lang}>
          {({ loading }: { loading: boolean }) => (
            <button className="px-5 py-2 rounded-full bg-white/80 border text-sm shadow-lg">
              {loading ? "Preparing..." : label}
            </button>
          )}
        </CVPdfLink>
      </div>

      {/* Desktop */}
      <div className="hidden md:block fixed bottom-14 right-6 z-30 print:hidden">
        <div className="mb-1 text-[11px] text-neutral-500">CV</div>
        <CVPdfLink lang={lang}>
          {({ loading }: { loading: boolean }) => (
            <button className="px-4 py-2 rounded-md bg-white/80 border text-sm shadow-md">
              {loading ? "Preparing..." : label}
            </button>
          )}
        </CVPdfLink>
      </div>
    </>
  );
}
