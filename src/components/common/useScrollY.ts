import { useEffect, useState } from "react";

type Viewport = { scrollY: number; vw: number; vh: number };

const read = (): Viewport => ({
  scrollY: window.scrollY,
  vw: window.innerWidth,
  vh: window.innerHeight,
});

/*
 * 스크롤 위치와 뷰포트 크기.
 *
 * - 스크롤 이벤트마다 setState 하지 않고 프레임당 한 번으로 묶는다.
 * - resize 도 같이 받아서, 창 크기를 바꿨을 때 위치 계산이 어긋나지 않는다.
 */
export function useScrollY(): Viewport {
  const [state, setState] = useState<Viewport>(read);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setState(read());
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}
