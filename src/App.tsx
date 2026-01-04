import MobileLayout from "./layouts/MobileLayout";
import DesktopLayout from "./layouts/DesktopLayout";

function App() {
  const desktopContent = (
    <section id="main-content" className="space-y-24">
      <section id="publications" className="h-[70vh]">Publications</section>
      <section id="projects" className="h-[70vh]">Projects</section>
      <section id="cv" className="h-[70vh]">CV</section>
      <section id="others" className="h-[70vh]">Others</section>
    </section>
  );

  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden">
        <MobileLayout />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopLayout>
          {desktopContent}
        </DesktopLayout>
      </div>
    </>
  );
}

export default App;