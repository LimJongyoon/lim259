import { useEffect, useState, type RefObject } from "react";

/*
 * 요소가 화면 세로 가운데 줄에 걸쳐 있는지 여부.
 *
 * 우측 하단 고정 버튼(전체 펼치기)을 "지금 보고 있는 섹션"에서만 보이게 할 때 쓴다.
 * - 가운데 줄 기준이라 섹션 경계에서도 버튼이 하나만 뜬다(겹치지 않음).
 * - threshold 비율 대신 rootMargin 을 써서, 화면보다 몇 배 긴 섹션에서도 동작한다.
 * - 한 번 들어온 뒤 계속 남지 않도록 들어오고 나갈 때 모두 갱신한다.
 */
export function useInViewCenter(ref: RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-50% 0px -50% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
