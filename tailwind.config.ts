import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  mode: "jit",
  content: ["./src/**/*.{html,tsx,js,ts,jsx}"],
  //colors: https://realtimecolors.com/?colors=e0f6fb-092126-ab1792-2c2c5C-b5d31e
  theme: {
    fontFamily: {
      sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
      serif: ["Arvo", ...defaultTheme.fontFamily.serif],
      mono: ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        text: "rgb(224, 246, 251)",
        background: "rgb(9, 33, 38)",
        primary: "rgb(171, 23, 146)",
        secondary: "rgb(44, 44, 92)",
        accent: "rgb(181, 211, 30)",
        textOnAccent: "rgb(9,33,38)",
        //--------- HOVER ---------------
        primaryHover: "rgb(185, 30, 155)",
        secondaryHover: "rgb(60, 60, 110)",
        accentHover: "rgb(165, 185, 15)",
      },
    },
  },
  plugins: [],
} satisfies Config;
