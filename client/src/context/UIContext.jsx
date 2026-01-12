// // src/context/UIContext.jsx
// import React, { createContext, useContext, useEffect, useState } from 'react';

// const UIContext = createContext();

// export function UIProvider({ children }) {
//   const [theme, setTheme] = useState(() => {
//     try {
//       return localStorage.getItem('theme') || 'light';
//     } catch {
//       return 'light';
//     }
//   });

//   const [compact, setCompact] = useState(() => {
//     try {
//       return localStorage.getItem('compact') === 'true';
//     } catch {
//       return false;
//     }
//   });

//   useEffect(() => {
//     // toggle tailwind dark class on html or body
//     const root = document.documentElement; // or document.body
//     if (theme === 'dark') root.classList.add('dark');
//     else root.classList.remove('dark');

//     try { localStorage.setItem('theme', theme); } catch {}
//   }, [theme]);

//   useEffect(() => {
//     const root = document.documentElement;
//     if (compact) root.classList.add('compact');
//     else root.classList.remove('compact');

//     try { localStorage.setItem('compact', compact ? 'true' : 'false'); } catch {}
//   }, [compact]);

//   return (
//     <UIContext.Provider value={{ theme, setTheme, compact, setCompact }}>
//       {children}
//     </UIContext.Provider>
//   );
// }

// export const useUI = () => useContext(UIContext);
