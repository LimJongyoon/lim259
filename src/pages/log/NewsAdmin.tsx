import { useEffect, useState } from "react";

import { news as fileNews } from "../../content/news";
import type { News, NewsCategory } from "../../types/News";

const CATEGORIES: NewsCategory[] = [
  "publication",
  "exhibition",
  "award",
  "grant",
  "teaching",
  "project",
  "career",
];

const EMPTY = {
  id: "",
  month: "",
  category: "" as NewsCategory | "",
  kr: "",
  en: "",
  jp: "",
  link: "",
};

type Form = typeof EMPTY;

const adminHeaders = {
  "Content-Type": "application/json",
  "x-admin-key": import.meta.env.VITE_ADMIN_KEY,
};

function formatMonth(date: string) {
  return `${date.slice(0, 4)}.${date.slice(5, 7)}`;
}

/*
 * 목록이 비는 원인이 세 가지라 구분해서 알려준다.
 * - noApi : /api/news 자체에 못 닿음 (로컬 vite dev 서버에는 서버리스 함수가 없다)
 * - dbErr : 함수는 떴는데 Supabase 조회 실패 (테이블 미생성 등)
 * - empty : 정상 응답인데 테이블이 비어 있음
 */
type Status =
  | { kind: "ok" }
  | { kind: "loading" }
  | { kind: "noApi" }
  | { kind: "dbErr"; detail: string }
  | { kind: "empty" };

export default function NewsAdmin() {
  const [items, setItems] = useState<News[]>([]);
  const [form, setForm] = useState<Form>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "loading" });

  const load = () => {
    fetch("/api/news")
      .then(async (res): Promise<Status | { kind: "data"; data: News[] }> => {
        /* 라우트가 없으면 404, vite dev 의 SPA 폴백이면 HTML 이라 파싱이 깨진다 */
        if (res.status === 404) return { kind: "noApi" };

        if (!res.ok) {
          const body: { error?: string } = await res
            .json()
            .catch(() => ({}));

          return {
            kind: "dbErr",
            detail: body.error ?? `HTTP ${res.status}`,
          };
        }

        const data = await res.json();

        if (!Array.isArray(data)) return { kind: "noApi" };

        return { kind: "data", data: data as News[] };
      })
      .then((result) => {
        if (result.kind === "data") {
          setItems(result.data);
          setStatus({ kind: result.data.length ? "ok" : "empty" });
          return;
        }

        setItems([]);
        setStatus(result);
      })
      .catch(() => {
        setItems([]);
        setStatus({ kind: "noApi" });
      });
  };

  useEffect(load, []);

  const set = (key: keyof Form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    if (!form.month) {
      setMessage("날짜를 선택하세요.");
      return;
    }

    if (!form.kr.trim() && !form.en.trim()) {
      setMessage("한국어 또는 영어 문구 중 하나는 필요합니다.");
      return;
    }

    setSaving(true);
    setMessage("");

    const res = await fetch("/api/news", {
      method: "POST",
      headers: adminHeaders,
      body: JSON.stringify({
        /* 표시는 YYYY.MM 이므로 일자는 항상 1일로 고정한다 */
        id: form.id || undefined,
        date: `${form.month}-01`,
        category: form.category || undefined,
        text: { kr: form.kr, en: form.en, jp: form.jp },
        link: form.link,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setMessage(`저장 실패: ${body.error ?? res.status}`);
      return;
    }

    setForm(EMPTY);
    setMessage("저장했습니다.");
    load();
  };

  const edit = (n: News) => {
    setForm({
      id: n.id,
      month: n.date.slice(0, 7),
      category: n.category ?? "",
      kr: n.text.kr ?? "",
      en: n.text.en ?? "",
      jp: n.text.jp ?? "",
      link: n.link ?? "",
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (n: News) => {
    if (!confirm(`삭제할까요?\n\n${n.text.kr ?? n.text.en}`)) return;

    const res = await fetch(`/api/news?id=${encodeURIComponent(n.id)}`, {
      method: "DELETE",
      headers: adminHeaders,
    });

    if (!res.ok) {
      setMessage("삭제 실패");
      return;
    }

    if (form.id === n.id) setForm(EMPTY);
    load();
  };

  const field = (
    label: string,
    key: keyof Form,
    placeholder = "",
    multiline = false
  ) => (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </span>

      {multiline ? (
        <textarea
          value={form[key]}
          onChange={(e) => set(key)(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full border rounded px-2 py-1.5 text-sm"
        />
      ) : (
        <input
          value={form[key]}
          onChange={(e) => set(key)(e.target.value)}
          placeholder={placeholder}
          className="w-full border rounded px-2 py-1.5 text-sm"
        />
      )}
    </label>
  );

  return (
    <div className="space-y-6">

      {/* ===== 등록 / 수정 폼 ===== */}
      <div className="bg-white border rounded p-4 space-y-3">

        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            {form.id ? "소식 수정" : "새 소식 등록"}
          </h2>

          {form.id && (
            <button
              onClick={() => setForm(EMPTY)}
              className="text-xs text-gray-500 hover:text-black"
            >
              새로 작성
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs font-medium text-gray-600 mb-1">
              날짜
            </span>
            <input
              type="month"
              value={form.month}
              onChange={(e) => set("month")(e.target.value)}
              className="w-full border rounded px-2 py-1.5 text-sm"
            />
          </label>

          <label className="block">
            <span className="block text-xs font-medium text-gray-600 mb-1">
              카테고리
            </span>
            <select
              value={form.category}
              onChange={(e) => set("category")(e.target.value)}
              className="w-full border rounded px-2 py-1.5 text-sm"
            >
              <option value="">(없음)</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        {field("한국어", "kr", "**굵게** 표시할 부분은 별표 두 개로 감쌉니다", true)}
        {field("English", "en", "", true)}
        {field("日本語 (선택)", "jp", "", true)}
        {field("링크 (선택)", "link", "https://")}

        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 rounded text-sm font-semibold bg-black text-white
                       disabled:bg-gray-300 hover:bg-gray-800 transition"
          >
            {saving ? "저장 중…" : form.id ? "수정 저장" : "등록"}
          </button>

          {message && (
            <span className="text-sm text-gray-600">{message}</span>
          )}
        </div>
      </div>

      {/* ===== 전체 목록 (모두 수정/삭제 가능) ===== */}
      <div>
        <h2 className="font-semibold mb-2">
          소식 목록 <span className="text-gray-400">({items.length})</span>
        </h2>

        {status.kind === "noApi" && (
          <div className="border border-amber-300 bg-amber-50 rounded p-3 text-sm space-y-1">
            <div className="font-semibold">/api/news 에 연결하지 못했습니다.</div>
            <p className="text-gray-700">
              <code>npm run dev</code>(Vite)로 띄운 로컬 서버에는 Vercel
              서버리스 함수가 없습니다. 배포된 주소에서 확인하거나, 로컬에서
              쓰려면 <code>vercel dev</code> 로 실행하세요.
            </p>
          </div>
        )}

        {status.kind === "dbErr" && (
          <div className="border border-red-300 bg-red-50 rounded p-3 text-sm space-y-1">
            <div className="font-semibold">DB 조회 실패: {status.detail}</div>
            <p className="text-gray-700">
              <code>supabase/news.sql</code> 을 아직 실행하지 않았을 가능성이
              큽니다. Supabase 대시보드 &gt; SQL Editor 에서 실행하세요.
            </p>
          </div>
        )}

        {status.kind === "empty" && (
          <div className="border border-amber-300 bg-amber-50 rounded p-3 text-sm space-y-1">
            <div className="font-semibold">테이블이 비어 있습니다.</div>
            <p className="text-gray-700">
              <code>supabase/news.sql</code> 의 INSERT 부분을 실행하면 기존{" "}
              {fileNews.length}건이 들어옵니다. 그 전까지 사이트에는 코드에
              포함된 예비 사본이 보입니다.
            </p>
          </div>
        )}

        <div className="space-y-2">
          {items.map((n) => (
            <div
              key={n.id}
              className="bg-white border rounded p-3 flex gap-3 items-start"
            >
              <span className="text-xs text-gray-400 tabular-nums pt-0.5 shrink-0">
                {formatMonth(n.date)}
              </span>

              <div className="flex-1 min-w-0">
                <div className="text-sm break-words">
                  {n.text.kr ?? n.text.en}
                </div>
                {n.category && (
                  <div className="text-xs text-gray-400 mt-0.5">
                    {n.category}
                  </div>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => edit(n)}
                  className="text-xs px-2 py-1 rounded border hover:bg-gray-100"
                >
                  수정
                </button>
                <button
                  onClick={() => remove(n)}
                  className="text-xs px-2 py-1 rounded border border-red-300
                             text-red-600 hover:bg-red-50"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400">
        여기서 수정한 내용이 사이트의 정본입니다. src/content/news/*.md 는
        DB 조회가 실패했을 때만 쓰이는 예비 사본({fileNews.length}건)이라
        평소에는 화면에 나오지 않습니다.
      </p>

    </div>
  );
}
