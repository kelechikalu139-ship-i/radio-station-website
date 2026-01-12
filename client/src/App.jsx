import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Player from './pages/Player'
import About from './pages/About'
import Contact from './pages/Contact'
import OAPs from './pages/OAPs'
import HostProfile from './pages/HostProfile'
import FullHostPage from './pages/FullHostPage'



const App = () => {
  return (
   <div className="bg-purple-900 min-h-screen">
     <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path='/programs' element={<Programs/>}/>
        <Route path='/player' element={<Player/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/oaps' element={<OAPs/>}/>
        <Route path='oaps/:id' element={<HostProfile/>}/>
        <Route path='oaps/:id/full' element={<FullHostPage/>}/>
      </Route>
    </Routes>
   </div>
  )
}

export default App



// src/App.jsx
// import React from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';
// import { UIProvider } from './context/UIContext';

// import MainLayout from './layouts/MainLayout';
// import Home from './pages/Home';
// import Programs from './pages/Programs';
// import Player from './pages/Player';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import OAPs from './pages/OAPs';
// import HostProfile from './pages/HostProfile';
// import FullHostPage from './pages/FullHostPage';

// function AnimatedRoutes() {
//   const location = useLocation();

//   // page animation variants
//   const pageVariants = {
//     initial: { opacity: 0, y: 12 },
//     in: { opacity: 1, y: 0 },
//     out: { opacity: 0, y: -8 },
//   };

//   const pageTransition = { duration: 0.36, ease: 'easeOut' };

//   return (
//     <AnimatePresence exitBeforeEnter initial={false}>
//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={<MainLayout />}>
//           <Route
//             index
//             element={
//               <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
//                 <Home />
//               </motion.div>
//             }
//           />
//           <Route
//             path="programs"
//             element={
//               <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
//                 <Programs />
//               </motion.div>
//             }
//           />
//           <Route
//             path="player"
//             element={
//               <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
//                 <Player />
//               </motion.div>
//             }
//           />
//           <Route
//             path="about"
//             element={
//               <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
//                 <About />
//               </motion.div>
//             }
//           />
//           <Route
//             path="contact"
//             element={
//               <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
//                 <Contact />
//               </motion.div>
//             }
//           />
//           <Route
//             path="oaps"
//             element={
//               <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
//                 <OAPs />
//               </motion.div>
//             }
//           />
//           <Route path="oaps/:id" element={<HostProfile />} />
//           <Route path="oaps/:id/full" element={<FullHostPage />} />
//         </Route>
//       </Routes>
//     </AnimatePresence>
//   );
// }

// export default function App() {
//   return (
//     <UIProvider>
//       <AnimatedRoutes />
//     </UIProvider>
//   );
// }
