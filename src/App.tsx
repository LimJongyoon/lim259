import { useState } from "react";

import MobileLayout from "./layouts/MobileLayout";
import DesktopLayout from "./layouts/DesktopLayout";

import PublicationsContent from "./components/publications/PublicationsContent";
import ProjectsContent from "./components/projects/ProjectsContent";
import CVContent from "./components/cv/CVContent";

import type { Lang } from "./content/cv";

function App() {
  const [lang, setLang] = useState<Lang>("en");

  const desktopContent = (
    <section id="main-content" className="space-y-8">
      <section id="publications">
        <PublicationsContent />
      </section>

      <section id="projects">
        <ProjectsContent />
      </section>

      {/* CV */}
      <section id="cv" className="py-32">
        {/* CV Header (A4 밖) */}
        <div className="relative px-4 pt-8 pb-12 mx-auto">
          <h2 className="text-lg font-semibold mb-2">Curriculum Vitae</h2>

          <div className="flex gap-4 text-sm text-neutral-500 mb-1">
            <button onClick={() => setLang("en")}>EN</button>
            <button onClick={() => setLang("kr")}>KR</button>
            <button onClick={() => setLang("jp")}>JP</button>

            <button
              className="underline"
              onClick={() => {
                document.title = `CV_LimJongyoon_${lang.toUpperCase()}`;
                window.print();
              }}
            >
              PDF
            </button>
          </div>

          <p className="text-xs text-neutral-500">
            This CV is available in multiple languages. You can download language-specific versions.
          </p>
        </div>

        {/* CV A4 */}
        <CVContent lang={lang} />
      </section>

      <section id="others" className="h-[60vh] flex items-center justify-center">
        <span className="text-sm text-neutral-400">Others (coming soon)</span>
      </section>
    </section>
  );

  return (
    <>
      <div className="block md:hidden">
        <MobileLayout />
      </div>

      <div className="hidden md:block">
        <DesktopLayout>{desktopContent}</DesktopLayout>
      </div>
    </>
  );
}

export default App;
