import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req:any,res:any){

  const { device, path } = req.body;

  const country = req.headers["x-vercel-ip-country"];
  const city = req.headers["x-vercel-ip-city"];

  await supabase.from("visits").insert([{
    device,
    path,
    country,
    city
  }]);

  res.json({ ok:true });
}
