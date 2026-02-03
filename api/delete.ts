import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const adminKey = req.headers["x-admin-key"];

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "invalid ids" });
  }

  const { error } = await supabase
    .from("visits")
    .delete()
    .in("id", ids);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "delete failed" });
  }

  res.status(200).json({ ok: true });
}
