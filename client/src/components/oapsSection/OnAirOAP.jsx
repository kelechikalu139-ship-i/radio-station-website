import { motion } from "framer-motion";
import { Radio } from "lucide-react";

export default function OnAirOAP({ oap }) {
  if (!oap) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg"
    >
      <div className="relative">
        <img
          src={oap.image}
          alt={oap.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
      </div>

      <div>
        <div className="font-semibold">{oap.name}</div>
        <div className="text-xs flex items-center gap-1">
          <Radio size={12} /> ON AIR
        </div>
      </div>
    </motion.div>
  );
}
