// export default {
//   darkMode: "class",
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Smooth radio-theme dark colors
//         darkBg: "#0d0b1f",
//         darkCard: "#1a1630",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // map semantic tokens to CSS variables so we can animate theme changes easily
      colors: {
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
        surface: "var(--color-surface)",
        card: "var(--color-card)",
        text: "var(--color-text)",
        subtle: "var(--color-subtle)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",
      },
      // optional: smooth default transition durations
      transitionDuration: {
        250: "250ms",
        350: "350ms",
      },
    },
  },
  plugins: [],
};
