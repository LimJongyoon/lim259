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

    if (range === "today") return t > now - 86400000;
    if (range === "7d") return t > now - 604800000;
    return t > now - 2592000000;
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

    if (!confirm("Delete selected logs?")) return;

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

  const filterBtn = (v: Range, label: string) => (
    <button
      onClick={() => setRange(v)}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition
      ${range === v
          ? "bg-black text-white border-black"
          : "bg-white hover:bg-gray-100 border-gray-300"}`}
    >
      {label}
    </button>
  );

  const sortBtn = (key: keyof Log, label: string) => (
    <button
      onClick={() => setSortKey(key)}
      className={`text-sm px-2 py-1 rounded transition
      ${sortKey === key
          ? "bg-black text-white"
          : "hover:bg-gray-100"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Visitor Logs</h1>

        <button
          onClick={deleteSelected}
          disabled={!selected.length}
          className={`px-4 py-2 rounded text-sm font-semibold transition
          ${selected.length
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          Delete Selected
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {filterBtn("today", "Today")}
        {filterBtn("7d", "7 Days")}
        {filterBtn("30d", "30 Days")}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">

        {countrySorted.map(([c, n]) => (
          <div
            key={c}
            className="bg-white border rounded p-3 shadow-sm"
          >
            <div className="text-xs text-gray-500">{c}</div>
            <div className="text-xl font-bold">{n}</div>
          </div>
        ))}

      </div>

      {!isMobile && (

        <div className="bg-white border rounded overflow-hidden">

          <div className="bg-gray-200 flex gap-3 p-3 border-b bg-gray-50">
            {sortBtn("created_at", "Time")}
            {sortBtn("country", "Country")}
            {sortBtn("city", "City")}
            {sortBtn("device", "Device")}
          </div>

          <table className="w-full text-sm">

            <thead className="bg-gray-400 sticky top-0">
              <tr>
                <th className="p-2"></th>
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-left">Device</th>
                <th className="p-2 text-left">Country</th>
                <th className="p-2 text-left">City</th>
                <th className="p-2 text-left">Path</th>
              </tr>
            </thead>

            <tbody>

              {sorted.map((l, i) => (

                <tr
                  key={l.id}
                  className={`${i % 2 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >

                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(l.id)}
                      onChange={() => toggle(l.id)}
                    />
                  </td>

                  <td className="p-2">
                    {new Date(l.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
                  </td>

                  <td className="p-2">{l.device}</td>
                  <td className="p-2">{l.country}</td>
                  <td className="p-2">{l.city}</td>
                  <td className="p-2 truncate max-w-[220px]">{l.path}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

      {isMobile && (

        <div className="space-y-3">

          {sorted.map(l => (

            <div
              key={l.id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >

              <div className="flex justify-between items-center mb-2">

                <div className="font-semibold">
                  {l.country} · {l.city}
                </div>

                <input
                  type="checkbox"
                  checked={selected.includes(l.id)}
                  onChange={() => toggle(l.id)}
                />

              </div>

              <div className="text-xs text-gray-500 mb-1">
                {new Date(l.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
              </div>

              <div className="text-sm">
                {l.device} · {l.path}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
