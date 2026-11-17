import {
  HomeIcon,
  DocumentTextIcon,
  CubeIcon,
  IdentificationIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import type { MobileTab } from "../../types/MobileTab";
import { useLanguage } from "../../context/LanguageContext";
import { bottomNavLabels } from "./bottomNavLabels";

type Props = {
  activeTab: MobileTab;
  onChange: (tab: MobileTab) => void;
};

const items: {
  id: MobileTab;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { id: "home", icon: HomeIcon },
  { id: "publications", icon: DocumentTextIcon },
  { id: "projects", icon: CubeIcon },
  { id: "cv", icon: IdentificationIcon },
  { id: "contact", icon: EnvelopeIcon },
];

export default function BottomNav({ activeTab, onChange }: Props) {
  const { lang } = useLanguage();
  const labels = bottomNavLabels[lang];

  return (
    /* 탭 높이는 h-14 그대로 두고, 홈 인디케이터 영역만큼 아래로 흰 배경을 늘린다 */
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
      <ul className="h-14 flex justify-around items-stretch text-[11px]">
        {items.map(({ id, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <li key={id} className="flex-1">
              <button
                onClick={() => onChange(id)}
                aria-current={active ? "page" : undefined}
                className={`relative w-full h-full flex flex-col items-center justify-center gap-0.5 ${
                  active ? "text-emerald-700 font-medium" : "text-gray-400"
                }`}
              >
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-700" />
                )}
                <Icon className="h-5 w-5" />
                <span>{labels[id]}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}