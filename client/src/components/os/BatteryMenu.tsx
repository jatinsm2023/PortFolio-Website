import { useState, useEffect } from 'react';
import { Battery, Zap, Github } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function BatteryMenu() {
  const [loading, setLoading] = useState(true);
  const [lowPowerMode, setLowPowerMode] = useState(false);

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div className="hidden sm:flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          <Battery size={18} className="text-white" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border-none shadow-2xl p-4 mr-4 mt-2" align="end">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm">
              <Zap size={20} fill="currentColor" />
            </div>
            <div>
              <div className="text-base font-bold dark:text-white">100%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Power Adapter</div>
            </div>
          </div>
          <Battery size={28} className="text-gray-400 dark:text-gray-500" />
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
            <span>Battery Health</span>
            <span className="font-medium text-green-500">Normal</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
            <span>Time to Full</span>
            <span className="font-medium">0:00</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 dark:border-white/10 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium dark:text-white">Low Power Mode</span>
            <div
              className={`w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors ${lowPowerMode ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              onClick={() => setLowPowerMode(!lowPowerMode)}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${lowPowerMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </div>
        </div>

        {/* GitHub Contribution Graph as Battery Usage */}
        <div className="w-full bg-white/50 dark:bg-black/20 rounded-lg p-2 overflow-hidden">
          <div className="text-[10px] text-gray-500 mb-1 flex justify-between">
            <span>Activity Level</span>
            <span className="text-blue-500">@jatinsm2023</span>
          </div>
          <div className="filter grayscale contrast-125 dark:invert dark:contrast-100 opacity-80 hover:opacity-100 transition-opacity overflow-x-auto">
            <img
              src="https://ghchart.rshah.org/000000/jatinsm2023"
              alt="Github Chart"
              className="min-w-[600px] h-auto"
              onLoad={() => setLoading(false)}
            />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
