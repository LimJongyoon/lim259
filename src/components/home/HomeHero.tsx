import { useMemo } from "react";
import HomeContent from "./HomeContent";
import profileImg from "../../assets/profile.png";

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

export default function HomeHero() {
  const background = useMemo(() => generateGradient(), []);

  return (
    <section
      className="relative flex items-center justify-center text-gray-800"
      style={{
        height: "100svh",
        background,
      }}
    >
      {/* 중앙 정렬 컨테이너 */}
      <div className="relative z-10 mx-auto max-w-5xl px-10 grid grid-cols-2 items-center gap-2">

        <div className="flex justify-center">
          <img
            src={profileImg}
            alt="Lim Jongyoon"
            className="
              h-[300px]
              object-contain
              drop-shadow-2xl
              select-none
              pointer-events-none
            "
          />
        </div>
        <HomeContent align="left" />
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        {/* Text */}
        <span className="text-[11px] tracking-widest opacity-70">
          SCROLL DOWN
        </span>

        {/* Capsule */}
        <div className="w-10 h-16 rounded-full border-2 border-gray-800/60 flex justify-center">
          <span className="w-1.5 h-3 bg-gray-800 rounded-full mt-3 animate-scroll-strong" />
        </div>
      </div>
    </section>
  );
}