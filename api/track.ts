import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { device, path } = req.body;

  const country = req.headers["x-vercel-ip-country"] || null;
  const city = req.headers["x-vercel-ip-city"] || null;

  const { error } = await supabase.from("visits").insert([
    { device, country, city, path }
  ]);

  if (error) {
    console.error(error);
    return res.status(500).json({ ok: false });
  }

  res.status(200).json({ ok: true });
}
