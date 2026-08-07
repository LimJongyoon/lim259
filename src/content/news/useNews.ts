import { useEffect, useState } from "react";

import { news as fileNews } from ".";
import type { News } from "../../types/News";

/*
 * 소식의 정본은 DB(/api/news) 다. /log 관리자 페이지에서 등록·수정·삭제한다.
 *
 * src/content/news/*.md 는 같은 내용의 예비 사본으로,
 * DB 조회가 실패하거나(테이블 미생성·Supabase 장애) 테이블이 비었을 때만 쓰인다.
 * 덕분에 첫 페인트에서 빈 화면이 보이지 않고, DB 응답이 오면 그 결과로 교체된다.
 *
 * 두 소스를 id 로 합치지 않는 이유: 합치면 DB 에서 삭제한 항목이
 * 파일 사본을 통해 다시 살아난다.
 */
export function useNews(): News[] {
  const [remote, setRemote] = useState<News[] | null>(null);

  useEffect(() => {
    let alive = true;

    fetch("/api/news")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && Array.isArray(data)) setRemote(data);
      })
      .catch(() => {
        /* 파일 사본으로 계속 동작하므로 조용히 무시한다 */
      });

    return () => {
      alive = false;
    };
  }, []);

  return remote && remote.length > 0 ? remote : fileNews;
}
