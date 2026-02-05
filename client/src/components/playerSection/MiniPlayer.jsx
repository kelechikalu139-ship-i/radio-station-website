import { Play, Pause } from "lucide-react";
import { useAudio } from "../../context/AudioContext";

export default function MiniPlayer() {
  const { playing, toggle, nowPlaying } = useAudio();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-purple-900 text-white rounded-2xl shadow-xl p-3 flex items-center justify-between md:hidden">
      <div className="truncate">
        <div className="text-xs text-yellow-300">LIVE</div>
        <div className="font-semibold truncate">
          {nowPlaying?.title || "Nexter FM"}
        </div>
      </div>

      <button
        onClick={toggle}
        className="w-12 h-12 rounded-full bg-yellow-400 text-purple-900 flex items-center justify-center"
      >
        {playing ? <Pause /> : <Play />}
      </button>
    </div>
  );
}
