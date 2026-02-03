import { useState, useEffect } from "react";

import MobileLayout from "./layouts/MobileLayout";
import DesktopLayout from "./layouts/DesktopLayout";

import PublicationsContent from "./components/publications/PublicationsContent";
import ProjectsContent from "./components/projects/ProjectsContent";
import CVContent from "./components/cv/CVContent";
import ContactContent from "./components/contact/ContactContent";

import type { Lang } from "./content/cv";

function App() {
  const [lang, setLang] = useState<Lang>("en");

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

      <section id="contact">
        <ContactContent />
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
