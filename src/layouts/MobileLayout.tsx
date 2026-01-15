import { useState } from "react";
import Header from "../components/header/Header";
import BottomNav from "../components/navigation/BottomNav";
import type { MobileTab } from "../types/MobileTab";

import Home from "../pages/mobile/Home";
import Publications from "../pages/mobile/Publications";
import Projects from "../pages/mobile/Projects";
import CV from "../pages/mobile/CV";
import Contact from "../pages/mobile/Contact";

export default function MobileLayout() {
  const [tab, setTab] = useState<MobileTab>("home");

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
      <main className="pt-3 pb-14 px-4">{renderPage()}</main>
      <BottomNav activeTab={tab} onChange={setTab} />
    </div>
  );
}