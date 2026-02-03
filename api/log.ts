import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const adminKey = req.headers["x-admin-key"];

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const { data, error } = await supabase
    .from("visits")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    return res.status(500).json(error);
  }

  res.status(200).json(data);
}
