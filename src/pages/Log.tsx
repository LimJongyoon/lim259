import { useEffect, useState } from "react";

type Log = {
  id: string;
  device: string;
  country: string;
  city: string;
  path: string;
  created_at: string;
};

type Range = "today" | "7d" | "30d";

export default function LogPage() {

  const [logs, setLogs] = useState<Log[]>([]);
  const [sortKey, setSortKey] = useState<keyof Log>("created_at");
  const [selected, setSelected] = useState<string[]>([]);
  const [range, setRange] = useState<Range>("7d");

  const isMobile = window.innerWidth < 768;

  const load = () => {
    fetch("/api/log", {
      headers: {
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY
      }
    })
      .then(r => r.json())
      .then(setLogs);
  };

  useEffect(load, []);

  const now = Date.now();

  const filtered = logs.filter(l => {

    const t = new Date(l.created_at).getTime();

    if (range === "today") {
      return t > now - 1000 * 60 * 60 * 24;
    }

    if (range === "7d") {
      return t > now - 1000 * 60 * 60 * 24 * 7;
    }

    return t > now - 1000 * 60 * 60 * 24 * 30;
  });

  const sorted = [...filtered].sort((a, b) => {

    if (sortKey === "created_at") {
      return new Date(b.created_at).getTime()
           - new Date(a.created_at).getTime();
    }

    return String(a[sortKey]).localeCompare(String(b[sortKey]));
  });

  const countryStats = filtered.reduce<Record<string, number>>((acc, cur) => {

    acc[cur.country] = (acc[cur.country] || 0) + 1;
    return acc;

  }, {});

  const countrySorted = Object.entries(countryStats) as [string, number][];

  const toggle = (id: string) => {

    setSelected(s =>
      s.includes(id)
        ? s.filter(x => x !== id)
        : [...s, id]
    );
  };

  const deleteSelected = async () => {

    if (!confirm("선택 로그를 삭제하시겠습니까?")) return;

    await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": import.meta.env.VITE_ADMIN_KEY
      },
      body: JSON.stringify({ ids: selected })
    });

    setSelected([]);
    load();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">

      <h1 className="text-xl font-bold mb-3">
        Visitor Logs
      </h1>

      <div className="flex gap-2 mb-3">

        <button onClick={() => setRange("today")}>오늘</button>
        <button onClick={() => setRange("7d")}>7일</button>
        <button onClick={() => setRange("30d")}>30일</button>

        <button
          onClick={deleteSelected}
          disabled={!selected.length}
          className="ml-auto text-red-600 font-semibold"
        >
          선택 삭제
        </button>

      </div>

      <div className="bg-gray-50 p-3 rounded mb-4 text-sm">

        <div className="font-semibold mb-1">
          Country Summary
        </div>

        <div className="flex flex-wrap gap-3">

          {countrySorted.map(([c, n]) => (
            <div key={c}>
              {c}: <b>{n}</b>
            </div>
          ))}

        </div>

      </div>

      {!isMobile && (

        <>
          <div className="flex gap-2 mb-2">

            <button onClick={() => setSortKey("created_at")}>시간</button>
            <button onClick={() => setSortKey("country")}>국가</button>
            <button onClick={() => setSortKey("city")}>도시</button>
            <button onClick={() => setSortKey("device")}>디바이스</button>

          </div>

          <table className="border w-full text-sm">

            <thead>
              <tr className="bg-gray-100">
                <th></th>
                <th>Time</th>
                <th>Device</th>
                <th>Country</th>
                <th>City</th>
                <th>Path</th>
              </tr>
            </thead>

            <tbody>

              {sorted.map(l => (

                <tr key={l.id} className="hover:bg-gray-50">

                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(l.id)}
                      onChange={() => toggle(l.id)}
                    />
                  </td>

                  <td>{new Date(l.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}</td>
                  <td>{l.device}</td>
                  <td>{l.country}</td>
                  <td>{l.city}</td>
                  <td>{l.path}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </>
      )}

      {isMobile && (

        <div className="space-y-3">

          {sorted.map(l => (

            <div
              key={l.id}
              className="border rounded p-3 shadow-sm bg-white"
            >

              <div className="flex justify-between mb-1">

                <div className="font-semibold">
                  {l.country} · {l.city}
                </div>

                <input
                  type="checkbox"
                  checked={selected.includes(l.id)}
                  onChange={() => toggle(l.id)}
                />

              </div>

              <div className="text-xs text-gray-500">
                {new Date(l.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
              </div>

              <div className="mt-1 text-sm">
                {l.device} | {l.path}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
