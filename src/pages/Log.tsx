import { useEffect, useState } from "react";

type Log = {
  id: string;
  device: string;
  country: string;
  city: string;
  path: string;
  created_at: string;
};

export default function LogPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/logs", {
      headers: {
        Authorization: import.meta.env.VITE_ADMIN_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setLogs)
      .catch(() => setError("권한 없음 또는 서버 오류"));
  }, []);

  return (
    <div className="p-6 text-sm">
      <h1 className="text-xl font-bold mb-4">Visitor Logs</h1>

      {error && <div className="text-red-500 mb-3">{error}</div>}

      <table className="border border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            <th className="border p-2">Device</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Path</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td className="border p-2">
                {new Date(l.created_at).toLocaleString()}
              </td>
              <td className="border p-2">{l.device}</td>
              <td className="border p-2">{l.country}</td>
              <td className="border p-2">{l.city}</td>
              <td className="border p-2">{l.path}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
