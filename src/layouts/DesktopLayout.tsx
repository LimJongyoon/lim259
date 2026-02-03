import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/header/Header";
import SideNav from "../components/navigation/SideNav";
import HomeHero from "../components/home/HomeHero";

type Props = {
  children: React.ReactNode;
};

export default function DesktopLayout({ children }: Props) {

  const navigate = useNavigate();

  const tapRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const [toast, setToast] = useState("");

  const resetTimer = () => {

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      tapRef.current = 0;
      setToast("");
    }, 3000);
  };

  const handleSecretClick = () => {

    tapRef.current += 1;

    resetTimer();

    if (tapRef.current >= 5) {

      setToast("Admin unlocked");

      setTimeout(() => {
        navigate("/log");
      }, 600);

      tapRef.current = 0;
      return;
    }

    setToast(`Admin mode ${tapRef.current} / 5`);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">

      <Header />
      <HomeHero />

      <div className="flex">
        <aside className="w-15 border-r">
          <SideNav />
        </aside>

        <main className="flex-1">

          <div className="mx-auto max-w-[900px] px-4 py-6">
            {children}
          </div>

          <div
            onClick={handleSecretClick}
            onTouchStart={handleSecretClick}
            className="hidden md:block py-6 text-center text-xs text-neutral-400 cursor-pointer select-none"
          >
            © {new Date().getFullYear()} Lim Jongyoon. All rights reserved.
          </div>

        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-black/90 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {toast}
        </div>
      )}

    </div>
  );
}
