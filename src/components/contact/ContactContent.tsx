import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const MAX_MESSAGE_LEN = 1500;
const DISPLAY_MESSAGE_LEN = 1501;

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

  const [name, setName] = useState("");
  const [reply, setReply] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [replyError, setReplyError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  
  const canTrySend =
    name.trim().length > 0 ||
    reply.trim().length > 0 ||
    message.trim().length > 0;
  const t = {
    subtitle: {
      en: "Feel free to reach out.",
      kr: "편한 방법으로 연락 주세요.",
      jp: "お気軽にご連絡ください。",
    },
    discord: {
      en: "Send a message without login",
      kr: "로그인 없이 메시지 보내기",
      jp: "ログイン不要でメッセージを送信",
    },
    name: {
      en: "Name",
      kr: "이름",
      jp: "お名前",
    },
    replyPlaceholder: {
      en: "Contact details (email, phone, etc.)",
      kr: "연락처 (이메일, 전화번호 등)",
      jp: "ご連絡先（メール、電話番号など）",
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
    sentTitle: {
      en: "Message Sent",
      kr: "메시지가 전송되었습니다",
      jp: "メッセージが送信されました",
    },
    sentDesc: {
      en: "Thank you for reaching out.",
      kr: "연락 주셔서 감사합니다.",
      jp: "ご連絡ありがとうございます。",
    },
    confirm: {
      en: "OK",
      kr: "확인",
      jp: "確認",
    },
    books: {
      en: "Recommended Books",
      kr: "추천 도서",
      jp: "おすすめの本",
    },
  };

async function send() {
  const hasName = name.trim().length > 0;
  const hasReply = reply.trim().length > 0;
  const hasMessage = message.trim().length > 0;

  setNameError(!hasName);
  setReplyError(!hasReply);
  setMessageError(!hasMessage);

  if (!hasName || !hasReply || !hasMessage || sending) {
    return;
  }

  setSending(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, reply, message }),
    });

    if (!res.ok) {
      if (res.status === 413) throw new Error("Message is too long.");
  throw new Error(`Send failed (${res.status})`);
    }

    setName("");
    setReply("");
    setMessage("");
    setSent(true);
  } catch {
    alert("Failed to send");
  } finally {
    setSending(false);
  }
}


  return (
    <>
      <section className="px-4 py-6">
        <div className="mx-auto w-full max-w-none md:max-w-3xl">

          {/* Header */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold">Contact</h2>
            <p className="text-xs text-neutral-500">{t.subtitle[lang]}</p>
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

          {/* Message box */}
          <section className="mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <img src="/icons/discord.png" className="w-4 h-4" />
                <span>{t.discord[lang]}</span>
              </div>

              <div className="rounded-xl border bg-white p-3 space-y-3">
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                  }}
                  placeholder={t.name[lang]}
                  className={`
                      w-full text-sm px-3 py-2 border rounded-md
                      placeholder:text-neutral-400
                      ${nameError
                      ? "border-red-500 placeholder:text-red-400"
                      : ""
                    }
                  `}
                />

                <input
                  value={reply}
                  onChange={(e) => {
                    setReply(e.target.value);
                    setReplyError(false);
                  }}
                  placeholder={t.replyPlaceholder[lang]}
                  className={`
                      w-full text-sm px-3 py-2 border rounded-md
                      placeholder:text-neutral-400
                      ${replyError
                      ? "border-red-500 placeholder:text-red-400"
                      : ""
                    }
                  `}
                />
<textarea
  value={message}
  maxLength={MAX_MESSAGE_LEN}
  onChange={(e) => {
    setMessage(e.target.value);
    setMessageError(false);
  }}
  placeholder={t.message[lang]}
  className={`
    w-full text-sm px-3 py-2 border rounded-md resize-none
    h-[120px] md:h-[200px]
    placeholder:text-neutral-400
    ${messageError ? "border-red-500 placeholder:text-red-400" : ""}
  `}
/>
<div
  className={`text-xs text-right ${
    message.length >= DISPLAY_MESSAGE_LEN
      ? "text-red-500"
      : "text-neutral-400"
  }`}
>
  {message.length} / {MAX_MESSAGE_LEN}
</div>


                <button
                  onClick={send}
                  disabled={!canTrySend || sending}
                  className={`
                      w-full py-2 rounded-md text-sm font-medium transition
                      ${canTrySend && !sending
                      ? "bg-emerald-800 text-white hover:bg-emerald-600"
                      : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                    }
                  `}
                >
                  {sending ? "Sending..." : t.send[lang]}
                </button>
              </div>
            </div>
          </section>

          {/* Recommended Books */}
          <section>
            <div className="mb-2 text-xs font-medium text-neutral-700">
              {t.books[lang]}
            </div>

            <div className="rounded-xl border bg-white p-3">
              <div className="flex gap-3 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
                {books.map((b) => (
                  <div key={b.title} className="flex-shrink-0 w-[84px] md:w-[110px]">
                    <div className="aspect-[3/4] rounded bg-neutral-100 overflow-hidden">
                      <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
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

      {/* Sent popup */}
      {sent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[280px] rounded-xl bg-white p-5 text-center space-y-3">
            <div className="text-sm font-semibold">{t.sentTitle[lang]}</div>
            <div className="text-xs text-neutral-500">{t.sentDesc[lang]}</div>
            <button
              onClick={() => setSent(false)}
              className="mt-2 w-full py-2 rounded-md text-sm font-medium
                         bg-emerald-800 text-white hover:bg-emerald-600"
            >
              {t.confirm[lang]}
            </button>
          </div>
        </div>
      )}
    </>
  );
}