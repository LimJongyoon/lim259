type Props = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export function ContactAction({ label, href, icon }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex flex-col items-center gap-2
        text-xs text-neutral-600
        transition-transform
        hover:scale-110 hover:text-black
      "
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-full border bg-white">
        {icon}
      </div>
      <span>{label}</span>
    </a>
  );
}