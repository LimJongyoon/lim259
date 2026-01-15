import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const books = [
  { title: "Sapiens", img: "/contact/sapiens.jpg" },
  { title: "Becoming Supernatural", img: "/contact/supernatural.jpg" },
  { title: "Cosmos", img: "/contact/cosmos.jpg" },
  { title: "No Longer Human", img: "/contact/nolongerhuman.jpg" },
  { title: "Limitless", img: "/contact/limitless.jpg" },
  { title: "In-yeon", img: "/contact/inyeon.jpg" },
  { title: "Liberty", img: "/contact/liberty.jpg" },
];

export default function ContactContent() {
  const { lang } = useLanguage();
  const [sending, setSending] = useState(false);

  const t = {
    subtitle: {
      en: "Feel free to reach out.",
      kr: "편한 방법으로 연락 주세요.",
      jp: "お気軽にご連絡ください。",
    },
    discord: {
      en: "Send a message via Discord",
      kr: "디스코드로 바로 메시지 보내기",
      jp: "Discordでメッセージを送る",
    },
    name: {
      en: "Name (optional)",
      kr: "이름 (선택)",
      jp: "お名前（任意）",
    },
    message: {
      en: "Message",
      kr: "메시지",
      jp: "メッセージ",
    },
    send: {
      en: "Send",
      kr: "보내기",
      jp: "送信",
    },
    books: {
      en: "Recommended Books",
      kr: "추천 도서",
      jp: "おすすめの本",
    },
  };

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function send() {
    if (!message.trim() || sending) return;

    setSending(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      setName("");
      setMessage("");
    } catch (e) {
      alert("Failed to send");
    } finally {
      setSending(false);
    }
  }
  return (
    <section className="px-4 py-6">
      <div className="mx-auto w-full max-w-none md:max-w-3xl">

        {/* ===== Header ===== */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold">Contact</h2>
          <p className="text-xs text-neutral-500">
            {t.subtitle[lang]}
          </p>
        </section>

        {/* ===== Small links ===== */}
        <section className="mb-8">
          <div className="flex gap-4 text-sm text-neutral-600">
            <a
              href="mailto:limjy.kor@gmail.com"
              className="flex items-center gap-1 hover:text-black"
            >
              <img src="/icons/gmail.png" className="w-3.5 h-3.5" />
              <span className="text-[#1DA1F2] hover:underline">
                limjy.kor@gmail.com
              </span>
            </a>

            <a
              href="https://instagram.com/limjongyoon3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-black"
            >
              <img src="/icons/Instagram.jpg" className="w-3.5 h-3.5" />
              <span className="text-[#1DA1F2] hover:underline">
                @limjongyoon3
              </span>
            </a>
          </div>
        </section>

        {/* ===== Discord + Message ===== */}
        <section className="mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
              <img src="/icons/discord.png" className="w-4 h-4" />
              <span>{t.discord[lang]}</span>
            </div>

            <div className="rounded-xl border bg-white p-3 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.name[lang]}
                className="w-full text-sm px-3 py-2 border rounded-md"
              />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.message[lang]}
                className="
    w-full text-sm px-3 py-2 border rounded-md resize-none
    h-[120px] md:h-[200px]
  "
              />

              <button
                onClick={send}
                disabled={!message.trim() || sending}
                className="w-full py-2 rounded-md text-sm font-medium
             bg-neutral-900 text-white
             disabled:bg-neutral-300"
              >
                {sending ? "Sending..." : t.send[lang]}
              </button>
            </div>
          </div>
        </section>

        {/* ===== Recommended Books ===== */}
        <section>
          <div className="mb-2 text-xs font-medium text-neutral-700">
            {t.books[lang]}
          </div>

          {/* BOX */}
          <div className="rounded-xl border bg-white p-3">
            <div
              className="
        flex gap-3 overflow-x-auto
        pb-1
        [-webkit-overflow-scrolling:touch]
      "
            >
              {books.map((b) => (
                <div
                  key={b.title}
                  className="flex-shrink-0 w-[84px] md:w-[110px]"
                >
                  <div className="aspect-[3/4] rounded bg-neutral-100 overflow-hidden">
                    <img
                      src={b.img}
                      alt={b.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-1 text-[12px] text-neutral-600 truncate">
                    {b.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );

}