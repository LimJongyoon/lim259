import { useState } from "react";
import CVContent from "../../components/cv/CVContent";
import type { Lang } from "../../content/cv";

export default function CV() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <CVContent
      lang={lang}
      onChangeLang={setLang}
    />
  );}
