import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(req: any, res: any) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const ua = req.headers["user-agent"] || "";

  if (ua.includes("Vercel") || ua.includes("vercel")) {
    return res.status(200).json({ ignored: true });
  }

  const ipHeader = req.headers["x-forwarded-for"];

if (!ipHeader) {
  return res.status(200).json({ ignored: true });
}

  const { device, visitorId } = req.body;

  if (!visitorId) {
    return res.status(400).json({ ok: false, error: "Missing visitorId" });
  }

  const country = req.headers["x-vercel-ip-country"] || "Unknown";
  const city = req.headers["x-vercel-ip-city"] || "Unknown";

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "";

  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

  const { error } = await supabase.from("visits").insert([
    {
      visitor_id: visitorId,
      device,
      country,
      city,
      ip_hash: ipHash
    }
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ ok: false });
  }

  return res.status(200).json({ ok: true });
}
