import { useLanguage } from "../../context/LanguageContext";

export default function CVPrintButton() {
  const { lang } = useLanguage();

  const label =
    lang === "kr"
      ? "PDF로 저장"
      : lang === "jp"
      ? "PDF出力"
      : "Download PDF";

  const handlePrint = () => {
    document.title = `CV_LimJongyoon_${lang.toUpperCase()}`;
    window.print();
  };

  return (
    <>
      {/* ===== Mobile ===== */}
      <div className="md:hidden fixed bottom-[72px] left-1/2 -translate-x-1/2 z-30 print:hidden">
        <button
          onClick={handlePrint}
          className="px-5 py-2 rounded-full bg-white/80 border text-sm shadow-lg"
        >
          {label}
        </button>
      </div>

      {/* ===== Desktop ===== */}
      <div className="hidden md:block fixed bottom-14 right-6 z-30 print:hidden">
        <div className="mb-1 text-[11px] text-neutral-500">
          CV
        </div>
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-md bg-white/80 border text-sm shadow-md"
        >
          {label}
        </button>
      </div>
    </>
  );
}
