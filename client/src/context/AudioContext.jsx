// src/context/AudioContext.jsx
// import React, {
//   createContext,
//   useContext,
//   useRef,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// const AudioContext = createContext(null);

// export function AudioProvider({
//   children,
//   streamUrl = import.meta.env.VITE_STREAM_URL,
//   nowPlayingUrl = import.meta.env.VITE_NOWPLAYING_URL,
//   nowPlayingPollMs = 15000,
// }) {
//   const audioRef = useRef(null);
//   const reconnectTimer = useRef(null);

//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolumeState] = useState(0.8);
//   const [nowPlaying, setNowPlaying] = useState({
//     title: "Nexter FM Live",
//     artist: "On Air",
//     show: "24/7 Broadcast",
//     listeners: 0,
//   });

//   /* ---------------------------
//      AUDIO SOURCE ATTACHMENT
//   ---------------------------- */
//   const attachSource = useCallback(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.src = streamUrl;
//     audio.crossOrigin = "anonymous";
//     audio.preload = "none";
//     audio.volume = volume;
//     audio.load();
//   }, [streamUrl, volume]);

//   /* ---------------------------
//      PLAY / PAUSE CONTROLS
//   ---------------------------- */
//   const play = useCallback(async () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     try {
//       if (!audio.src) attachSource();
//       await audio.play();
//       setPlaying(true);
//     } catch (err) {
//       console.warn("Play failed:", err);
//     }
//   }, [attachSource]);

//   const pause = useCallback(() => {
//     audioRef.current?.pause();
//     setPlaying(false);
//   }, []);

//   const toggle = useCallback(() => {
//     playing ? pause() : play();
//   }, [playing, play, pause]);

//   /* ---------------------------
//      VOLUME CONTROL
//   ---------------------------- */
//   const setVolume = useCallback((v) => {
//     const value = Math.min(1, Math.max(0, Number(v)));
//     setVolumeState(value);
//     if (audioRef.current) audioRef.current.volume = value;
//   }, []);

//   /* ---------------------------
//      RECONNECT LOGIC
//   ---------------------------- */
//   const scheduleReconnect = useCallback(() => {
//     if (reconnectTimer.current) return;

//     reconnectTimer.current = setTimeout(() => {
//       reconnectTimer.current = null;
//       attachSource();
//       play();
//     }, 3000);
//   }, [attachSource, play]);

//   /* ---------------------------
//      AUDIO EVENTS
//   ---------------------------- */
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const onPlay = () => setPlaying(true);
//     const onPause = () => setPlaying(false);
//     const onError = () => {
//       console.warn("Audio error — reconnecting");
//       scheduleReconnect();
//     };

//     audio.addEventListener("play", onPlay);
//     audio.addEventListener("pause", onPause);
//     audio.addEventListener("error", onError);

//     return () => {
//       audio.removeEventListener("play", onPlay);
//       audio.removeEventListener("pause", onPause);
//       audio.removeEventListener("error", onError);
//     };
//   }, [scheduleReconnect]);

//   /* ---------------------------
//      NOW PLAYING (ICECAST)
//   ---------------------------- */
//   useEffect(() => {
//     if (!nowPlayingUrl) return;

//     const fetchNowPlaying = async () => {
//       try {
//         const res = await fetch(nowPlayingUrl, { cache: "no-store" });
//         if (!res.ok) return;
//         const json = await res.json();

//         const source = json?.icestats?.source;
//         if (!source) return;

//         setNowPlaying({
//           title: source.title || "Live Broadcast",
//           artist: source.artist || "Nexter FM",
//           show: source.server_name || "On Air",
//           listeners: source.listeners || 0,
//         });
//       } catch (err) {
//         // silent fail (Icecast may block CORS)
//       }
//     };

//     fetchNowPlaying();
//     const id = setInterval(fetchNowPlaying, nowPlayingPollMs);

//     return () => clearInterval(id);
//   }, [nowPlayingUrl, nowPlayingPollMs]);

//   /* ---------------------------
//      INITIAL SETUP
//   ---------------------------- */
//   useEffect(() => {
//     attachSource();
//   }, [attachSource]);

//   /* ---------------------------
//      PROVIDER
//   ---------------------------- */
//   return (
//     <AudioContext.Provider
//       value={{
//         audioRef,
//         playing,
//         play,
//         pause,
//         toggle,
//         volume,
//         setVolume,
//         nowPlaying,
//         streamUrl,
//       }}
//     >
//       {children}
//       <audio ref={audioRef} />
//     </AudioContext.Provider>
//   );
// }

// export function useAudio() {
//   const ctx = useContext(AudioContext);
//   if (!ctx) throw new Error("useAudio must be used within AudioProvider");
//   return ctx;
// }



// UPGRADE VERSION NOT USED YET 
// src/context/AudioContext.jsx
// import React, {
//   createContext,
//   useContext,
//   useRef,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// const AudioContext = createContext(null);

// export function AudioProvider({
//   children,
//   streamUrl = import.meta.env.VITE_STREAM_URL,
//   nowPlayingUrl = import.meta.env.VITE_NOWPLAYING_URL,
//   nowPlayingPollMs = 12000,          // Radio.co usually updates every 10–30 seconds
// }) {
//   const audioRef = useRef(null);
//   const reconnectTimer = useRef(null);

//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolumeState] = useState(0.8);
//   const [nowPlaying, setNowPlaying] = useState({
//     title: "Nexter FM Live",
//     artist: "On Air",
//     show: "24/7 Broadcast",
//     listeners: 0,
//   });

//   /* ---------------------------
//      AUDIO SOURCE ATTACHMENT
//   ---------------------------- */
//   const attachSource = useCallback(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.src = streamUrl;
//     audio.crossOrigin = "anonymous";
//     audio.preload = "none";
//     audio.volume = volume;
//     audio.load();
//   }, [streamUrl, volume]);

//   /* ---------------------------
//      PLAY / PAUSE CONTROLS
//   ---------------------------- */
//   const play = useCallback(async () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     try {
//       if (!audio.src) attachSource();
//       await audio.play();
//       setPlaying(true);
//     } catch (err) {
//       console.warn("Play failed:", err);
//     }
//   }, [attachSource]);

//   const pause = useCallback(() => {
//     audioRef.current?.pause();
//     setPlaying(false);
//   }, []);

//   const toggle = useCallback(() => {
//     playing ? pause() : play();
//   }, [playing, play, pause]);

//   /* ---------------------------
//      VOLUME CONTROL
//   ---------------------------- */
//   const setVolume = useCallback((v) => {
//     const value = Math.min(1, Math.max(0, Number(v)));
//     setVolumeState(value);
//     if (audioRef.current) audioRef.current.volume = value;
//   }, []);

//   /* ---------------------------
//      RECONNECT LOGIC
//   ---------------------------- */
//   const scheduleReconnect = useCallback(() => {
//     if (reconnectTimer.current) return;

//     reconnectTimer.current = setTimeout(() => {
//       reconnectTimer.current = null;
//       attachSource();
//       play();
//     }, 3000);
//   }, [attachSource, play]);

//   /* ---------------------------
//      AUDIO EVENTS
//   ---------------------------- */
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const onPlay = () => setPlaying(true);
//     const onPause = () => setPlaying(false);
//     const onError = () => {
//       console.warn("Audio error — reconnecting");
//       scheduleReconnect();
//     };

//     audio.addEventListener("play", onPlay);
//     audio.addEventListener("pause", onPause);
//     audio.addEventListener("error", onError);

//     return () => {
//       audio.removeEventListener("play", onPlay);
//       audio.removeEventListener("pause", onPause);
//       audio.removeEventListener("error", onError);
//     };
//   }, [scheduleReconnect]);

//   /* ---------------------------
//      NOW PLAYING (Radio.co compatible)
//   ---------------------------- */
//   useEffect(() => {
//     if (!nowPlayingUrl) return;

//     const fetchNowPlaying = async () => {
//       try {
//         const res = await fetch(nowPlayingUrl, { cache: "no-store" });
//         if (!res.ok) return;
//         const data = await res.json();

//         let title = "Live Broadcast";
//         let artist = "Nexter FM";
//         let show = "On Air";
//         let listeners = 0;

//         // Radio.co status endpoint – try several common key patterns
//         if (data.current_track) {
//           title = data.current_track.title || title;
//           artist = data.current_track.artist || artist;
//         } else if (data.now_playing) {
//           title = data.now_playing.song || data.now_playing.title || title;
//           artist = data.now_playing.artist || artist;
//         } else if (data.track) {
//           title = data.track.title || title;
//           artist = data.track.artist || artist;
//         } else if (data.current?.title) {
//           // some endpoints nest differently
//           title = data.current.title || title;
//           artist = data.current.artist || artist;
//         }

//         // Listeners count – very common on Radio.co
//         if (data.listeners !== undefined) {
//           listeners = Number(data.listeners) || 0;
//         } else if (data.stats?.listeners) {
//           listeners = Number(data.stats.listeners) || 0;
//         } else if (data.current_listeners !== undefined) {
//           listeners = Number(data.current_listeners) || 0;
//         }

//         // Optional: show name / program name if available
//         if (data.current_show?.name) {
//           show = data.current_show.name;
//         } else if (data.show) {
//           show = data.show;
//         }

//         setNowPlaying({ title, artist, show, listeners });
//       } catch (err) {
//         console.debug("Now-playing fetch failed (silent)", err);
//       }
//     };

//     fetchNowPlaying();
//     const id = setInterval(fetchNowPlaying, nowPlayingPollMs);

//     return () => clearInterval(id);
//   }, [nowPlayingUrl, nowPlayingPollMs]);

//   /* ---------------------------
//      INITIAL SETUP
//   ---------------------------- */
//   useEffect(() => {
//     attachSource();
//   }, [attachSource]);

//   /* ---------------------------
//      PROVIDER
//   ---------------------------- */
//   return (
//     <AudioContext.Provider
//       value={{
//         audioRef,
//         playing,
//         play,
//         pause,
//         toggle,
//         volume,
//         setVolume,
//         nowPlaying,
//         streamUrl,
//       }}
//     >
//       {children}
//       <audio ref={audioRef} />
//     </AudioContext.Provider>
//   );
// }

// export function useAudio() {
//   const ctx = useContext(AudioContext);
//   if (!ctx) throw new Error("useAudio must be used within AudioProvider");
//   return ctx;
// }

// for CasterFm 

// src/context/AudioContext.jsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

const AudioContext = createContext(null);

export function AudioProvider({
  children,
  streamUrl = import.meta.env.VITE_STREAM_URL,
  nowPlayingUrl = import.meta.env.VITE_NOWPLAYING_URL, 
  nowPlayingPollMs = 10000,
}) {
  const audioRef = useRef(null);
  const reconnectTimer = useRef(null);
  const retryCount = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [connectionState, setConnectionState] = useState('idle');
  const [nowPlaying, setNowPlaying] = useState({
    title: "Nexter FM Live",
    artist: "On Air",
    show: "24/7 Broadcast",
    listeners: 0,
  });

  /* ---------------------------
     AUDIO SOURCE ATTACHMENT
  ---------------------------- */
  const attachSource = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !streamUrl) return;

    console.log("Connecting to stream:", streamUrl);
    
    // Add cache busting (use set to avoid duplicate params)
    const url = new URL(streamUrl);
    url.searchParams.set('_', Date.now().toString());
    
    audio.src = url.toString();
    audio.crossOrigin = "anonymous";
    audio.preload = "auto";           // Better for buffering on most browsers
    audio.volume = volume;
    
    setConnectionState('connecting');
    audio.load();
  }, [streamUrl, volume]);

  /* ---------------------------
     PLAY / PAUSE CONTROLS
  ---------------------------- */
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (!audio.src) {
        attachSource();
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      await audio.play();
      setPlaying(true);
      setConnectionState('connected');
      retryCount.current = 0;
      console.log("Stream connected successfully!");
    } catch (err) {
      console.warn("Play failed:", err);
      setConnectionState('error');
      
      // Retry logic (up to 3 attempts)
      if (retryCount.current < 3) {
        retryCount.current++;
        setTimeout(() => play(), 3000);
      }
    }
  }, [attachSource]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    setConnectionState('idle');
  }, []);

  const toggle = useCallback(() => {
    playing ? pause() : play();
  }, [playing, play, pause]);

  /* ---------------------------
     VOLUME CONTROL
  ---------------------------- */
  const setVolume = useCallback((v) => {
    const value = Math.min(1, Math.max(0, Number(v)));
    setVolumeState(value);
    if (audioRef.current) audioRef.current.volume = value;
  }, []);

  /* ---------------------------
     RECONNECT LOGIC
  ---------------------------- */
  const scheduleReconnect = useCallback(() => {
    if (reconnectTimer.current || !playing) return;

    console.log("Scheduling reconnect...");
    setConnectionState('reconnecting');

    reconnectTimer.current = setTimeout(() => {
      reconnectTimer.current = null;
      attachSource();
      play();
    }, 3000);
  }, [attachSource, play, playing]);

  /* ---------------------------
     AUDIO EVENTS
  ---------------------------- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setPlaying(true);
      setConnectionState('connected');
    };
    
    const onPause = () => {
      setPlaying(false);
      setConnectionState('idle');
    };
    
    const onError = (e) => {
      console.warn("Audio error:", e);
      setConnectionState('error');
      scheduleReconnect();
    };
    
    const onWaiting = () => setConnectionState('buffering');
    const onCanPlay = () => setConnectionState('connected');

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
    };
  }, [scheduleReconnect]);

  /* ---------------------------
     NOW PLAYING (ICECAST) - with 503/off-air handling
  ---------------------------- */
  useEffect(() => {
    if (!nowPlayingUrl) return;

    const fetchNowPlaying = async () => {
      try {
        // Add timestamp to prevent caching
        const url = new URL(nowPlayingUrl);
        url.searchParams.set('_', Date.now().toString());

        const res = await fetch(url.toString(), { 
          cache: "no-store",
          mode: 'cors',
          headers: {
            'Cache-Control': 'no-cache, no-store',
            'Pragma': 'no-cache'
          }
        });

        // Special handling for 503 → common on Caster.fm when no broadcast is live
        if (res.status === 503) {
          console.debug("503 received – likely no source connected (off-air)");
          setNowPlaying({
            title: "Offline",
            artist: "No Broadcast",
            show: "Connect BUTT to go live",
            listeners: 0,
          });
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const json = await res.json();
        console.log("Icecast stats received");

        // Handle Icecast JSON structure
        const source = json?.icestats?.source;
        const mainSource = Array.isArray(source) ? source[0] : source;
        
        if (mainSource) {
          // Parse title (often "Artist - Title" format)
          const titleStr = mainSource.title || "";
          let artist = "Nexter FM";
          let title = "Live Broadcast";
          
          if (titleStr.includes(' - ')) {
            const parts = titleStr.split(' - ');
            artist = parts[0]?.trim() || artist;
            title = parts[1]?.trim() || title;
          } else if (titleStr.trim()) {
            title = titleStr.trim();
          }
          
          setNowPlaying({
            title,
            artist,
            show: mainSource.server_name || mainSource.server_description || "Nexter FM",
            listeners: Number(mainSource.listeners) || 0,
          });
        } else {
          // No active source found in JSON
          setNowPlaying({
            title: "No Track Info",
            artist: "",
            show: "Live but no metadata",
            listeners: Number(mainSource?.listeners) || 0,
          });
        }
      } catch (err) {
        console.debug("Now-playing fetch failed:", err.message);
        setNowPlaying({
          title: "Error",
          artist: "",
          show: "Stats unavailable",
          listeners: 0,
        });
      }
    };

    fetchNowPlaying();
    const id = setInterval(fetchNowPlaying, nowPlayingPollMs);

    return () => clearInterval(id);
  }, [nowPlayingUrl, nowPlayingPollMs]);

  /* ---------------------------
     INITIAL SETUP
  ---------------------------- */
  useEffect(() => {
    if (streamUrl) {
      attachSource();
    }
  }, [attachSource, streamUrl]);

  /* ---------------------------
     PROVIDER
  ---------------------------- */
  return (
    <AudioContext.Provider
      value={{
        audioRef,
        playing,
        play,
        pause,
        toggle,
        volume,
        setVolume,
        nowPlaying,
        connectionState,
        streamUrl,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}