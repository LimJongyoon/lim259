import CVPdfLink from "./CVPdfLink";
import type { Lang } from "../../content/cv";

export default function CVPdfButton({ lang }: { lang: Lang }) {
  const label =
    lang === "kr"
      ? "PDF로 저장"
      : lang === "jp"
      ? "PDF出力"
      : "Download PDF";

  return (
    <CVPdfLink lang={lang}>
      {({ loading }: { loading: boolean }) => (
        <button
          className="
            px-3 py-1.5
            text-xs
            rounded-md
            border border-blue-700
            text-blue-700
            hover:bg-blue-700 hover:text-white
            transition
          "
        >
          {loading ? "Preparing PDF..." : label}
        </button>
      )}
    </CVPdfLink>
  );
}
