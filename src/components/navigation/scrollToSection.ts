export function scrollToSection(id: string) {
  const targetId = id === "home" ? "home-hero" : id;
  const el = document.getElementById(targetId);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}