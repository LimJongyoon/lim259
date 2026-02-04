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
      },
      keyframes: {
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