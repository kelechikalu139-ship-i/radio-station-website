import { useEffect, useRef } from "react";
import { useAudio } from "../../context/AudioContext";

export default function AudioWaveform() {
  const canvasRef = useRef(null);
  const { audioRef, playing } = useAudio();

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;

    // const source = ctx.createMediaElementSource(audio);
    // source.connect(analyser);
    // analyser.connect(ctx.destination);

    const canvas = canvasRef.current;
    const cctx = canvas.getContext("2d");
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      cctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / bufferLength;

      dataArray.forEach((v, i) => {
        const h = v / 2;
        cctx.fillStyle = "#facc15";
        cctx.fillRect(i * barWidth, canvas.height - h, barWidth - 1, h);
      });
    }

    if (playing) draw();

    return () => ctx.close();
  }, [audioRef, playing]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={60}
      className="w-full rounded-lg"
    />
  );
}
