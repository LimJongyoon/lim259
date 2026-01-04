import MobileLayout from "./layouts/MobileLayout";
import DesktopLayout from "./layouts/DesktopLayout";

import PublicationsContent from "./components/publications/PublicationsContent";

function App() {
  /**
   * PC에서는:
   * - Hero는 DesktopLayout 안에서 렌더링됨
   * - 아래 섹션들이 하나의 스크롤 페이지로 이어짐
   */
  const desktopContent = (
    <section
      id="main-content"
      className="space-y-32"
    >
      {/* Publications: 실제 콘텐츠 */}
      <section id="publications">
        <PublicationsContent />
      </section>

      {/* Projects: placeholder */}
      <section id="projects" className="h-[60vh] flex items-center justify-center">
        <span className="text-sm text-neutral-400">
          Projects (coming soon)
        </span>
      </section>

      {/* CV: placeholder */}
      <section id="cv" className="h-[60vh] flex items-center justify-center">
        <span className="text-sm text-neutral-400">
          CV (coming soon)
        </span>
      </section>

      {/* Others: placeholder */}
      <section id="others" className="h-[60vh] flex items-center justify-center">
        <span className="text-sm text-neutral-400">
          Others (coming soon)
        </span>
      </section>
    </section>
  );

  return (
    <>
      {/* Mobile: page-based navigation */}
      <div className="block md:hidden">
        <MobileLayout />
      </div>

      {/* Desktop: long-scroll layout */}
      <div className="hidden md:block">
        <DesktopLayout>
          {desktopContent}
        </DesktopLayout>
      </div>
    </>
  );
}

export default App;