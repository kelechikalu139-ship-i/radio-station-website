import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

export default function StreamHealth({ streamUrl }) {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        await fetch(streamUrl, { method: "HEAD", cache: "no-store" });
        setOnline(true);
      } catch {
        setOnline(false);
      }
    };

    check();
    const id = setInterval(check, 15000);
    return () => clearInterval(id);
  }, [streamUrl]);

  return (
    <div className="flex items-center gap-2 text-xs">
      {online ? (
        <>
          <Wifi className="text-green-400" size={14} />
          <span>Stream healthy</span>
        </>
      ) : (
        <>
          <WifiOff className="text-red-400" size={14} />
          <span>Connection lost</span>
        </>
      )}
    </div>
  );
}
