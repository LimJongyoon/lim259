import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (token !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "unauthorized" });
  }

  const { data, error } = await supabase
    .from("visits")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.error(error);
    return res.status(500).json(error);
  }

  return res.status(200).json(data);
}
