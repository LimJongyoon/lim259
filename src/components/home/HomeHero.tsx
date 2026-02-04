import { useMemo, useEffect, useState } from "react";
import HomeContent from "./HomeContent";
import profileImg from "../../assets/profile.png";
import { useLanguage } from "../../context/LanguageContext";

type LangKey = "en" | "kr" | "jp";

type BubbleMessage = Record<LangKey, string>;

type BubbleMap = {
  publications: BubbleMessage;
  projects: BubbleMessage;
  cv: BubbleMessage;
  contact: BubbleMessage;
};

type HSL = { h: number; s: number; l: number };

const COLOR_POOL: HSL[] = [
  { h: 160, s: 45, l: 72 },
  { h: 200, s: 50, l: 70 },
  { h: 230, s: 45, l: 72 },
  { h: 280, s: 40, l: 74 },
  { h: 330, s: 45, l: 75 },
  { h: 35, s: 55, l: 72 },
  { h: 55, s: 60, l: 70 },
  { h: 0, s: 0, l: 150 },
];

function hsl(c: HSL) {
  return `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
}

function pickContrastingPair(): [HSL, HSL] {
  const first = COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)];
  let second = first;

  while (Math.abs(second.h - first.h) < 60) {
    second = COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)];
  }

  return [first, second];
}

function generateGradient() {
  const [a, b] = pickContrastingPair();
  return `linear-gradient(135deg, ${hsl(a)}, ${hsl(b)})`;
}

const BUBBLE_TEXT: BubbleMap = {
  publications: {
    en: "You can click papers to view detailed information.",
    kr: "논문을 클릭하면 상세 내용을 확인할 수 있습니다.",
    jp: "論文やプロジェクトをクリックすると詳細を見ることができます。",
  },
  projects: {
    en: "You can click projects to view detailed information.",
    kr: "프로젝트를 클릭하면 상세 내용을 확인할 수 있습니다.",
    jp: "論文やプロジェクトをクリックすると詳細を見ることができます。",
  },
  cv: {
    en: "You can select your preferred language and download the CV.",
    kr: "원하는 언어로 설정한 뒤 CV를 다운로드할 수 있습니다.",
    jp: "言語を選択してCVをダウンロードできます。",
  },
  contact: {
    en: "Send me a message via the contact section. I will get back to you.",
    kr: "컨택트 섹션에서 메시지를 남겨주시면 답변드리겠습니다.",
    jp: "お問い合わせフォームからメッセージを送信してください。返信いたします。",
  },
};

export default function HomeHero() {

  const { lang } = useLanguage();
  const safeLang = lang as LangKey;

  const background = useMemo(() => generateGradient(), []);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<keyof BubbleMap | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight * 0.7;
      const value = Math.min(window.scrollY / max, 1);
      setProgress(value);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {

      const targets: (keyof BubbleMap)[] = [
        "contact",
        "cv",
        "projects",
        "publications",
      ];

      for (let id of targets) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.5) {
          setActiveSection(id);
          return;
        }
      }

      setActiveSection(null);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroOpacity = Math.max(1 - progress * 1.2, 0);
  const contentOpacity = Math.max(1 - progress * 1.4, 0);
  const contentTranslate = progress * -40;

  const imageScale = 1 - progress * 0.45;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const startX = -vw * 0.12;
  const startY = 0;

  const targetX = -vw * 0.45;
  const targetY = vh * 0.36;

  const imageX = startX + (targetX - startX) * progress;
  const imageY = startY + (targetY - startY) * progress;

  const showBubble = progress > 0.85 && activeSection !== null;

  return (
    <>
      {/* ===== PROFILE IMAGE + SPEECH BUBBLE ===== */}
      <div
        className="fixed z-50 pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          transform: `
            translate(-50%, -50%)
            translate(${imageX}px, ${imageY}px)
            scale(${imageScale})
          `,
        }}
      >

        <img
          src={profileImg}
          alt="Lim Jongyoon"
          className="h-[300px] object-contain drop-shadow-2xl"
        />

        {showBubble && activeSection && (
          <div
            className="
              absolute left-[115%] bottom-[24%]
              bg-white/95 backdrop-blur
              border border-gray-400
              shadow-xl
              rounded-2xl
              px-4 py-4
              text-xl
              leading-relaxed
              text-gray-800
              min-w-[200px]
              animate-fadeIn
            "
          >
            {BUBBLE_TEXT[activeSection][safeLang]}

            <div
              className="
                absolute left-[-8px] bottom-6
                w-4 h-4
                bg-white
                border-l border-b border-gray-200
                rotate-45
              "
            />
          </div>
        )}

      </div>

      {/* ===== HERO STAGE ===== */}
      <section
        className="fixed top-0 left-0 w-full flex items-center justify-center text-gray-800 z-20"
        style={{
          height: "100svh",
          background,
          opacity: heroOpacity,
          pointerEvents: progress > 0.95 ? "none" : "auto",
        }}
      >
        <div className="relative z-10 mx-auto max-w-5xl px-10 grid grid-cols-2 items-center gap-2">

          <div />

          <div
            style={{
              opacity: contentOpacity,
              transform: `translateY(${contentTranslate}px)`,
            }}
          >
            <HomeContent align="left" />
          </div>

        </div>

        {/* ===== Scroll Indicator ===== */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: 1 - progress * 2,
            pointerEvents: "none",
          }}
        >
          <span className="text-[11px] tracking-widest opacity-70">
            SCROLL DOWN
          </span>

          <div className="w-10 h-16 rounded-full border-2 border-gray-800/60 flex justify-center">
            <span className="w-1.5 h-3 bg-gray-800 rounded-full mt-3 animate-scroll-strong" />
          </div>
        </div>

      </section>

      <div style={{ height: "100svh" }} />
    </>
  );
}
