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

      <section id="cv" className="py-32">
        <CVContent lang={lang} onChangeLang={setLang} />
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
