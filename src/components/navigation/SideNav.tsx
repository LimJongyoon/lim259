import { NAV_ITEMS } from "./navItems";
import { scrollToSection } from "./scrollToSection";
import { useLanguage } from "../../context/LanguageContext";
import { navLabels } from "./navLabels";

export default function SideNav() {
  const { lang } = useLanguage();
  const labels = navLabels[lang];

  return (
    <nav className="p-6 space-y-4 text-sm">
      {NAV_ITEMS.map(({ id }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="block text-gray-700 hover:text-black transition"
        >
          {labels[id]}
        </button>
      ))}
    </nav>
  );
}