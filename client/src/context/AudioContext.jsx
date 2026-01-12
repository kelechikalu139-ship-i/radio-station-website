// src/context/AudioContext.jsx
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
// import Hls from "hls.js";

const AudioContext = createContext(null);

/**
 * AudioProvider
 * - streamUrl: pass the stream URL (mp3/aac or .m3u8) via prop or VITE_STREAM_URL
 * - exposes: audioRef, playing, play, pause, toggle, volume, setVolume, nowPlaying, setNowPlaying, reconnect
 *
 * Features:
 * - hls.js for .m3u8 on non-Safari browsers
 * - crossOrigin set to anonymous (for analyser / visualizer)
 * - reconnect logic with exponential backoff
 * - optional polling of /api/now-playing
 */
export function AudioProvider({
  children,
  streamUrl = import.meta.env.VITE_STREAM_URL || "/stream-placeholder",
  nowPlayingUrl = import.meta.env.VITE_NOWPLAYING_URL || "/api/now-playing",
  nowPlayingPollMs = Number(import.meta.env.VITE_NOWPLAYING_POLL_MS || 15000),
}) {
  const audioRef = useRef(null);
  const hlsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [volume, _setVolume] = useState(0.8);
  const [nowPlaying, setNowPlaying] = useState({
    title: "Nexter FM Live",
    artist: "Various",
    show: "24/7 Live",
    listeners: 0,
    updatedAt: null,
  });

  // reconnect/backoff state
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_MS = 60_000; // cap

  // helper to set audio src with HLS fallback
  const attachSource = useCallback(
    (url) => {
      const audio = audioRef.current;
      if (!audio) return;

      // Clean up previous hls instance if any
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {
          /* ignore */
        }
        hlsRef.current = null;
      }

      // If m3u8 and hls.js supported -> use hls.js
      const isHls = typeof url === "string" && url.trim().toLowerCase().endsWith(".m3u8");
      if (isHls && Hls.isSupported()) {
        const hls = new Hls({ lowLatencyMode: true });
        hlsRef.current = hls;
        hls.attachMedia(audio);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(url);
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.warn("hls error", event, data);
          // for network fatal errors try reconnect
          if (data?.type === Hls.ErrorTypes.NETWORK_ERROR) {
            scheduleReconnect();
          }
        });
        return;
      }

      // Safari or not hls.js -> just set src (Safari supports .m3u8 natively)
      audio.src = url;
    },
    []
  );

  // set streamUrl whenever it changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // ensure crossOrigin for analyser/CORS
    audio.crossOrigin = "anonymous";
    audio.preload = "none";
    attachSource(streamUrl);
    // keep volume in sync
    audio.volume = volume;
    // reset reconnect attempts on source change
    reconnectAttemptsRef.current = 0;
    return () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
          hlsRef.current = null;
        } catch (e) {}
      }
    };
  }, [streamUrl, attachSource, volume]);

  // play / pause / toggle
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      // on some browsers we must call load() before play for new hls attachments
      if (hlsRef.current) {
        // ensure media is attached; hls.js handles loading
      } else {
        // ensure src present
        if (!audio.src) audio.src = streamUrl;
      }
      await audio.play();
      setPlaying(true);
      reconnectAttemptsRef.current = 0; // reset on successful play
    } catch (err) {
      // autoplay blocked or other error
      console.warn("Audio play failed:", err);
      setPlaying(false);
    }
  }, [streamUrl]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.pause();
    } catch (e) {}
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, pause, play]);

  const setVolume = useCallback((v) => {
    const value = Math.max(0, Math.min(1, Number(v)));
    _setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  }, []);

  // Keep audio element volume in sync if element is created later
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Keep playing state in sync if user uses native controls
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = (e) => {
      console.warn("Audio element error", e);
      scheduleReconnect();
    };
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("error", onError);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("error", onError);
    };
  }, []);

  // simple reconnect strategy with exponential backoff
  function scheduleReconnect() {
    // don't pile multiple timeouts
    if (reconnectTimeoutRef.current) return;
    reconnectAttemptsRef.current += 1;
    const attempt = reconnectAttemptsRef.current;
    // backoff: base 1s -> 2^attempt * 500ms, capped
    const ms = Math.min(MAX_RECONNECT_MS, Math.pow(2, Math.min(6, attempt)) * 500);
    console.info(`Scheduling reconnect in ${ms}ms (attempt ${attempt})`);
    reconnectTimeoutRef.current = setTimeout(async () => {
      reconnectTimeoutRef.current = null;
      try {
        // try re-attach source then play (must be triggered by user gesture to succeed if autoplay blocked)
        attachSource(streamUrl);
        // try to play silently — may be blocked
        await audioRef.current?.play().catch((e) => {
          console.warn("Reconnect play blocked", e);
        });
      } catch (e) {
        console.warn("Reconnect failed", e);
        scheduleReconnect(); // schedule next attempt
      }
    }, ms);
  }

  // expose manual reconnect helper
  const reconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    reconnectAttemptsRef.current = 0;
    attachSource(streamUrl);
    // try to play (user gesture may be required)
    play();
  }, [attachSource, streamUrl, play]);

  // OPTIONAL: Poll now-playing endpoint to keep nowPlaying up-to-date.
  useEffect(() => {
    if (!nowPlayingUrl) return;
    let mounted = true;
    let id = null;
    async function fetchNow() {
      try {
        const res = await fetch(nowPlayingUrl, { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (!mounted) return;
        // attempt to map common shapes
        const payload =
          json.current ??
          (json.title ? json : null) ??
          (json.now ? json.now : null) ??
          null;
        if (!payload) return;
        setNowPlaying((prev) => ({
          title: payload.title ?? payload.track ?? prev.title,
          artist: payload.artist ?? payload.artist_name ?? prev.artist,
          show: payload.show ?? prev.show,
          listeners: payload.listeners ?? prev.listeners ?? 0,
          bitrate: payload.bitrate ?? prev.bitrate ?? null,
          updatedAt: payload.updatedAt ?? new Date().toISOString(),
        }));
      } catch (err) {
        // ignore network errors (server might be down)
        // console.warn("now-playing fetch error", err);
      }
    }
    fetchNow();
    id = setInterval(fetchNow, nowPlayingPollMs);
    return () => {
      mounted = false;
      if (id) clearInterval(id);
    };
  }, [nowPlayingUrl, nowPlayingPollMs]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {}
        hlsRef.current = null;
      }
    };
  }, []);

  // The provider renders the audio element so it's centralized.
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
        setNowPlaying,
        streamUrl,
        reconnect,
      }}
    >
      {children}
      {/* Hidden/global audio element: plays the stream */}
      <audio ref={audioRef} style={{ display: "none" }} />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
}
