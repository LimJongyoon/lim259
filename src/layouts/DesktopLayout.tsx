import Header from "../components/header/Header";
import SideNav from "../components/navigation/SideNav";
import HomeHero from "../components/home/HomeHero";

type Props = {
  children: React.ReactNode;
};

export default function DesktopLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header: 전체 폭 */}
      <Header />

      {/* PC Home Hero */}
      <HomeHero />

      {/* Main layout */}
      <div className="flex">
        <aside className="w-56 border-r border-gray-200">
          <SideNav />
        </aside>

        <main className="flex-1">
          <div className="mx-auto max-w-mobile px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}