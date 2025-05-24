import { fontFamily } from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        background: "#1F0A0A", // rojo vino oscuro
        card: "#2E1515", // rojo quemado
        primary: "#EF4444", // rojo vivo
        accent: "#F97316", // naranja cálido
        muted: "#78716C", // gris cálido
        text: "#FAFAFA", // blanco tenue
      },
    },
  },
  plugins: [animatePlugin],
};
