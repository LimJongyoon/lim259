import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import MobileLayout from "./layouts/MobileLayout";
import DesktopLayout from "./layouts/DesktopLayout";

import NewsContent from "./components/news/NewsContent";
import PublicationsContent from "./components/publications/PublicationsContent";
import ProjectsContent from "./components/projects/ProjectsContent";
import CVContent from "./components/cv/CVContent";
import ContactContent from "./components/contact/ContactContent";

import type { Lang } from "./content/cv";

function App() {
  /* CV 언어는 사이트 언어와 별개로 둔다(의도된 동작). 항상 영어로 시작한다. */
  const [lang, setLang] = useState<Lang>("en");

  /* md(768px) 이상이 데스크탑. 두 레이아웃을 동시에 마운트하지 않는다. */
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (import.meta.env.DEV) return;

    let visitorId = localStorage.getItem("visitor_id");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitor_id", visitorId);
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId,
        device: window.innerWidth < 768 ? "mobile" : "desktop"
      })
    });
  }, []);

  if (!isDesktop) return <MobileLayout />;

  const desktopContent = (
    <section id="main-content" className="space-y-8">
      <section id="news">
        <NewsContent />
      </section>

      <section id="publications">
        <PublicationsContent />
      </section>

      <section id="projects">
        <ProjectsContent />
      </section>

      <section id="cv" className="py-32">
        <CVContent lang={lang} onChangeLang={setLang} />
      </section>

      <section id="contact">
        <ContactContent />
      </section>
    </section>
  );

  return (
    <DesktopLayout>{desktopContent}</DesktopLayout>
  );
}

export default App;
