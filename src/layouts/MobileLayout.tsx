import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import BottomNav from "../components/navigation/BottomNav";
import type { MobileTab } from "../types/MobileTab";

import Home from "../pages/mobile/Home";
import Publications from "../pages/mobile/Publications";
import Projects from "../pages/mobile/Projects";
import CV from "../pages/mobile/CV";
import Contact from "../pages/mobile/Contact";

const TABS: MobileTab[] = ["home", "publications", "projects", "cv", "contact"];

/* 주소의 #projects 같은 해시를 탭으로 읽는다. 없거나 모르는 값이면 home */
function tabFromHash(): MobileTab {
  const hash = window.location.hash.slice(1);
  return (TABS as string[]).includes(hash) ? (hash as MobileTab) : "home";
}

export default function MobileLayout() {
  const [tab, setTab] = useState<MobileTab>(tabFromHash);

  /* 뒤로가기·앞으로가기로 이전 탭을 복원한다 */
  useEffect(() => {
    const onPop = () => {
      setTab(tabFromHash());
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const changeTab = (next: MobileTab) => {
    /* 같은 탭을 다시 누르면 맨 위로만 올린다 */
    if (next !== tab) {
      const url =
        next === "home"
          ? window.location.pathname + window.location.search
          : `#${next}`;

      window.history.pushState(null, "", url);
      setTab(next);
    }

    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (tab) {
      case "home":
        return <Home />;
      case "publications":
        return <Publications />;
      case "projects":
        return <Projects />;
      case "cv":
        return <CV />;
      case "contact":
        return <Contact />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* 하단 탭바(h-14) + 아이폰 홈 인디케이터 여백만큼 비운다 */}
      <main className="pt-3 px-4 pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        {renderPage()}
      </main>
      <BottomNav activeTab={tab} onChange={changeTab} />
    </div>
  );
}
