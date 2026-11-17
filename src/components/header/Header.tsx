import { useState, useRef, useEffect } from "react";
import { useLanguage, type Lang } from "../../context/LanguageContext";

const LANG_NAME: Record<Lang, string> = {
  kr: "한국어",
  en: "English",
  jp: "日本語",
};

export default function Header() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  const item = (
    code: Lang,
    flag: string,
    disabled = false
  ) => (
    <button
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          setLang(code);
          setOpen(false);
        }
      }}
      className={`
        w-full flex items-center gap-2 px-3 py-2 text-sm
        rounded-md
        ${disabled
          ? "opacity-40 cursor-not-allowed"
          : lang === code
            ? "bg-gray-100 font-medium"
            : "hover:bg-gray-50"}
      `}
    >
      <span>{flag}</span>
      <span>{LANG_NAME[code]}</span>
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="h-11 px-6 flex items-center justify-between text-sm pointer-events-auto">
        {/* Left */}
        <div className="font-medium tracking-tight text-gray-900">
        </div>

        {/* Right */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={open}
            className="
              text-gray-700 hover:text-black
              px-2 py-1
              text-sm
            "
          >
            {LANG_NAME[lang]} ▾
          </button>

          {open && (
            <div
              className="
                absolute right-0 mt-2 w-36
                bg-white rounded-lg shadow-lg
                border border-gray-200
                p-1
              "
            >
              {item("kr", "🇰🇷")}
              {item("en", "🇺🇸")}
              {item("jp", "🇯🇵")}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}