import { useState } from "react";
import type { Lang } from "../../content/cv";

/*
 * CV PDF 다운로드.
 *
 * 예전에는 PDFDownloadLink 가 마운트되자마자 PDF 를 만들어서,
 * 버튼을 누르지 않는 방문자도 react-pdf(약 1.5MB)와 폰트를 전부 받았다.
 * 지금은 클릭했을 때만 라이브러리를 불러와 PDF 를 만들고 내려받는다.
 */
export default function CVPdfLink({
  lang,
  children,
}: {
  lang: Lang;
  children: (args: { loading: boolean }) => React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const [{ pdf }, { CVPdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./CVPdf"),
      ]);

      const blob = await pdf(<CVPdf lang={lang} />).toBlob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `CV_LimJongyoon_${lang.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      /* 다운로드가 시작될 시간을 준 뒤 해제한다 */
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (e) {
      console.error("Failed to generate CV PDF:", e);
    } finally {
      setLoading(false);
    }
  };

  /* 안쪽 버튼의 클릭이 여기로 올라온다 */
  return (
    <span className="contents" onClick={download}>
      {children({ loading })}
    </span>
  );
}
