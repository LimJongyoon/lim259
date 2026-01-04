import { useEffect, useRef, useState } from "react";

export function useExpandController(ids: string[]) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleOne = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openAll = () => setOpenIds(new Set(ids));

  const closeAll = () => {
    setOpenIds(new Set());
    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return {
    openIds,
    toggleOne,
    openAll,
    closeAll,
    sectionRef,
    inView,
  };
}