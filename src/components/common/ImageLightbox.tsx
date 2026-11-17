import { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

/* 이미지를 화면 가득 크게 본다. 바깥 클릭·Esc 로 닫는다. */
export default function ImageLightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    /* 뒤 페이지가 같이 스크롤되지 않게 잠근다 */
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="
        fixed inset-0 z-[70]
        flex items-center justify-center
        bg-black/85 p-4
        cursor-zoom-out
        animate-fade-in motion-reduce:animate-none
      "
    >
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
      />

      <button
        onClick={onClose}
        aria-label="Close"
        className="
          absolute top-3 right-4
          p-2 text-white/70 text-xl leading-none
          hover:text-white transition-colors
        "
      >
        ✕
      </button>
    </div>,
    document.body
  );
}
