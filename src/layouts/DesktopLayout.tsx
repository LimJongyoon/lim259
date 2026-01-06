import Header from "../components/header/Header";
import SideNav from "../components/navigation/SideNav";
import HomeHero from "../components/home/HomeHero";

type Props = {
  children: React.ReactNode;
};

export default function DesktopLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HomeHero />

      <div className="flex">
        <aside className="w-15 border-r ">
          <SideNav />
        </aside>

        <main className="flex-1">
          <div className="mx-auto max-w-[900px] px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}