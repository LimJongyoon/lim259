import { PDFDownloadLink } from "@react-pdf/renderer";
import { CVPdf } from "./CVPdf";
import type { Lang } from "../../content/cv";

export default function CVPdfLink({
  lang,
  children,
}: {
  lang: Lang;
  children:
  | React.ReactNode
  | ((args: { loading: boolean }) => React.ReactNode);
}) {
  return (
    <PDFDownloadLink
    key={lang}
      document={<CVPdf lang={lang} />}
      fileName={`CV_LimJongyoon_${lang.toUpperCase()}.pdf`}
    >
      {({ loading }) =>
        typeof children === "function"
          ? (children as any)({ loading })
          : children
      }
    </PDFDownloadLink>
  );
}
