// // src/context/ThemeContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(() => {
//     try {
//       return localStorage.getItem("theme") || "light";
//     } catch {
//       return "light";
//     }
//   });

//   // overlay state for fade animation
//   const [animating, setAnimating] = useState(false);

//   useEffect(() => {
//     // apply initial theme immediately (no animation)
//     const root = document.documentElement;
//     if (theme === "dark") root.classList.add("dark");
//     else root.classList.remove("dark");
//   }, []); // run once on mount

//   const setThemeWithTransition = (next) => {
//     const root = document.documentElement;
//     // start brief overlay
//     setAnimating(true);
//     // add helper class so CSS uses transitions on children
//     root.classList.add("theme-transition");
//     // small timeout so overlay shows (next tick)
//     setTimeout(() => {
//       if (next === "dark") root.classList.add("dark");
//       else root.classList.remove("dark");

//       try {
//         localStorage.setItem("theme", next);
//       } catch {}

//       setTheme(next);

//       // after a short delay, remove overlay and transition class
//       setTimeout(() => {
//         setAnimating(false);
//         root.classList.remove("theme-transition");
//       }, 300);
//     }, 30);
//   };

//   const toggleTheme = () => setThemeWithTransition(theme === "dark" ? "light" : "dark");

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeWithTransition }}>
//       {children}
//       {/* overlay node (portal-like) */}
//       <div className={`theme-fade-overlay ${animating ? "show" : ""}`} aria-hidden="true" />
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   return useContext(ThemeContext);
// }
