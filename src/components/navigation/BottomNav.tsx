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
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200">
      <ul className="h-full flex justify-around items-center text-[11px]">
        {items.map(({ id, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <li key={id}>
              <button
                onClick={() => onChange(id)}
                className={`flex flex-col items-center gap-0.5 ${
                  active ? "text-black" : "text-gray-400"
                }`}
              >
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