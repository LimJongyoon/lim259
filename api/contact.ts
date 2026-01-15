import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAX_MESSAGE_LEN = 1600;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, reply, message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ ok: false, error: "Invalid message" });
    }

    if (message.length > MAX_MESSAGE_LEN) {
      return res.status(413).json({
        ok: false,
        error: `Message too long (max ${MAX_MESSAGE_LEN} characters)`,
      });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return res.status(500).json({ ok: false });
    }

    const payload = {
      content:
        `이름: ${name || "익명"}\n` +
        `연락처: ${reply || "없음"}\n` +
        "```" +
        message +
        "```",
    };

    const r = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      return res.status(500).json({ ok: false });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false });
  }
}
