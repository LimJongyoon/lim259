import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {

      animation: {
        bubble: "bubbleEnterShake 0.45s cubic-bezier(.22,1,.36,1) forwards",
        /* 카드 펼침: 살짝 내려오며 나타난다 */
        "expand-in": "expandIn 0.25s ease-out both",
        "fade-in": "fadeIn 0.15s ease-out both",
      },
      keyframes: {
          expandIn: {
            "0%": { opacity: "0", transform: "translateY(-6px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
          bubbleEnterShake: {
            "0%": {
              opacity: "0",
              transform: "translateY(18px) scale(0.78)",
            },
            "45%": {
              opacity: "1",
              transform: "translateY(-4px) scale(1.18)",
            },
            "60%": {
              transform: "translateX(-8px) rotate(-3deg)",
            },
            "75%": {
              transform: "translateX(7px) rotate(2deg)",
            },
            "90%": {
              transform: "translateX(-3px) rotate(-1deg)",
            },
            "100%": {
              transform: "translateX(0) scale(1) rotate(0deg)",
            },
        },
      },

    },
  },
  plugins: [typography],
};

export default config;