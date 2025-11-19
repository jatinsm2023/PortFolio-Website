import { useState, useEffect } from 'react';
import { Battery, Zap, Github, RefreshCw } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export default function BatteryMenu() {
  const [loading, setLoading] = useState(true);

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div className="hidden sm:flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          <Battery size={18} className="text-white" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 bg-white/80 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border-none shadow-2xl p-4 mr-4 mt-2" align="end">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm">
                <Zap size={16} fill="currentColor" />
             </div>
             <div>
                <div className="text-sm font-bold dark:text-white">Coding Activity</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Source: GitHub Contributions</div>
             </div>
          </div>
          <div className="text-xl font-bold dark:text-white">100%</div>
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
        
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-white/10">
           <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Top Energy Consumers (Recent Repos)</div>
           <div className="space-y-2">
              {/* We could fetch these, but for now hardcoding the ones from the prompt to match the 'Real Data' request visually */}
              <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300">
                 <div className="flex items-center gap-2">
                   <Github size={12} />
                   <span>CallKaro AI</span>
                 </div>
                 <span className="text-red-500 font-mono">High Impact</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300">
                 <div className="flex items-center gap-2">
                   <Github size={12} />
                   <span>LLMSQL</span>
                 </div>
                 <span className="text-yellow-500 font-mono">Medium Impact</span>
              </div>
           </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
