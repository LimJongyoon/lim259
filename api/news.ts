import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const CATEGORIES = [
  "publication",
  "exhibition",
  "award",
  "grant",
  "teaching",
  "project",
  "career",
];

type Row = {
  id: string;
  date: string;
  category: string | null;
  text_kr: string | null;
  text_en: string | null;
  text_jp: string | null;
  link: string | null;
};

/* DB 행을 프론트의 News 타입(src/types/News.ts) 모양으로 변환한다. */
function toNews(row: Row) {
  const text: Record<string, string> = {};

  if (row.text_kr) text.kr = row.text_kr;
  if (row.text_en) text.en = row.text_en;
  if (row.text_jp) text.jp = row.text_jp;

  return {
    id: row.id,
    date: row.date,
    category: row.category ?? undefined,
    text,
    link: row.link || undefined,
  };
}

function isAdmin(req: any) {
  return req.headers["x-admin-key"] === process.env.ADMIN_KEY;
}

export default async function handler(req: any, res: any) {

  /* ===== 조회: 공개 (사이트 News 섹션이 사용) ===== */
  if (req.method === "GET") {

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "fetch failed" });
    }

    return res.status(200).json((data as Row[]).map(toNews));
  }

  /* ===== 등록 / 수정: 관리자 전용 ===== */
  if (req.method === "POST") {

    if (!isAdmin(req)) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const { id, date, category, text, link } = req.body ?? {};

    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "date must be YYYY-MM-DD" });
    }

    if (category && !CATEGORIES.includes(category)) {
      return res.status(400).json({ error: "invalid category" });
    }

    const kr = text?.kr?.trim() || null;
    const en = text?.en?.trim() || null;
    const jp = text?.jp?.trim() || null;

    if (!kr && !en) {
      return res.status(400).json({ error: "kr or en text required" });
    }

    const row = {
      date,
      category: category || null,
      text_kr: kr,
      text_en: en,
      text_jp: jp,
      link: link?.trim() || null,
      /* id 가 오면 수정, 없으면 DB 기본값(gen_random_uuid)으로 신규 생성 */
      ...(id ? { id } : {}),
    };

    const { data, error } = await supabase
      .from("news")
      .upsert(row)
      .select()
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "save failed" });
    }

    return res.status(200).json(toNews(data as Row));
  }

  /* ===== 삭제: 관리자 전용 ===== */
  if (req.method === "DELETE") {

    if (!isAdmin(req)) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const id = req.query?.id;

    if (typeof id !== "string" || !id) {
      return res.status(400).json({ error: "invalid id" });
    }

    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "delete failed" });
    }

    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
