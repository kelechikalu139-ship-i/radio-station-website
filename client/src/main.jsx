import React from 'react';
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { AudioProvider } from "./context/AudioContext";
import App from './App.jsx'
import './index.css'

const STREAM_URL = import.meta.env.VITE_STREAM_URL || "/stream-placeholder";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AudioProvider streamUrl={STREAM_URL}>
         <App />
     </AudioProvider>
    </BrowserRouter>
  </React.StrictMode>
);
