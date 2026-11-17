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

const handleSecretClick = (e: React.MouseEvent | React.TouchEvent) => {

  if ("touches" in e) {
    tapRef.current += 1;
  } else {
    if (!e.shiftKey) return;
    tapRef.current += 1;
  }

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
        <aside>
          <SideNav />
        </aside>

        <main className="flex-1 min-w-0">

          {/*
            넓은 화면에서는 가운데 정렬(50% - 450px)과 같고,
            창이 좁아지면 왼쪽 고정 내비(244px)와 오른쪽 고정 버튼(168px)을 피해 본문이 줄어든다.
          */}
          <div
            className="
              max-w-[900px] px-4 py-6
              ml-[max(260px,calc(50%-450px))]
              mr-[max(184px,calc(50%-450px))]
            "
          >
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
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {toast}
        </div>
      )}

    </div>
  );
}
