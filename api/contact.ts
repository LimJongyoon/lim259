import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ ok: false });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return res.status(500).json({ ok: false });
    }

    const payload = {
      content:
        `📩 **New Contact Message**\n` +
        `**Name:** ${name || "Anonymous"}\n` +
        `**Message:**\n` +
        "```" +
        `\n${message}\n` +
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