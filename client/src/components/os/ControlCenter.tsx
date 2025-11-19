import { useOSStore } from '@/lib/os-store';
import { Wifi, Bluetooth, Moon, Sun, Monitor, Volume2, Battery, Play, SkipForward, SkipBack, Music } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

export default function ControlCenter() {
  const isOpen = useOSStore(state => state.isControlCenterOpen);
  
  if (!isOpen) return null;

  return (
    <div className="fixed top-10 right-4 w-80 bg-white/60 dark:bg-black/60 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border border-white/20 z-[100] text-black dark:text-white animate-in fade-in zoom-in-95 duration-200">
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Network Group */}
        <div className="bg-white/50 dark:bg-black/40 rounded-xl p-3 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
              <Wifi size={16} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold">Wi-Fi</span>
              <span className="text-[10px] opacity-60">Home_5G</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
              <Bluetooth size={16} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold">Bluetooth</span>
              <span className="text-[10px] opacity-60">On</span>
            </div>
          </div>
        </div>

        {/* Other Controls */}
        <div className="grid grid-rows-2 gap-3">
          <div className="bg-white/50 dark:bg-black/40 rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white shadow-md">
               <Moon size={16} fill="currentColor" />
            </div>
            <span className="text-sm font-semibold">Do Not Disturb</span>
          </div>
          <div className="bg-white/50 dark:bg-black/40 rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-gray-400/50 flex items-center justify-center text-white shadow-md">
               <Monitor size={16} />
            </div>
            <span className="text-sm font-semibold">Screen Mirroring</span>
          </div>
        </div>
      </div>

      {/* Now Playing Mockup */}
      <div className="bg-white/50 dark:bg-black/40 rounded-xl p-3 mb-4 shadow-sm flex items-center gap-4">
         <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-600 rounded-md shadow-sm flex items-center justify-center relative overflow-hidden shrink-0">
            <Music size={24} className="text-white z-10" />
            <div className="absolute inset-0 bg-black/10" />
         </div>
         <div className="flex-1 min-w-0">
            <div className="text-xs font-bold truncate">Deep Focus Playlist</div>
            <div className="text-[10px] opacity-60 truncate">YouTube Music • Lofi Girl</div>
            <div className="flex items-center gap-3 mt-1.5">
               <SkipBack size={12} className="fill-current cursor-pointer hover:scale-110 transition-transform" />
               <Play size={14} className="fill-current cursor-pointer hover:scale-110 transition-transform" />
               <SkipForward size={12} className="fill-current cursor-pointer hover:scale-110 transition-transform" />
            </div>
         </div>
         <div className="w-1 h-8 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden flex flex-col justify-end">
            <div className="w-full h-2/3 bg-white animate-pulse" />
         </div>
      </div>

      {/* Sliders */}
      <div className="bg-white/50 dark:bg-black/40 rounded-xl p-3 mb-4 shadow-sm space-y-4">
         <div className="space-y-2">
            <span className="text-xs font-medium opacity-70 ml-1">Display</span>
            <div className="flex items-center gap-3 bg-white/50 dark:bg-white/10 p-1 rounded-full border border-white/5">
               <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center">
                 <Sun size={14} className="text-gray-600 dark:text-white" />
               </div>
               <Slider defaultValue={[80]} max={100} step={1} className="flex-1" />
            </div>
         </div>
         <div className="space-y-2">
            <span className="text-xs font-medium opacity-70 ml-1">Sound</span>
            <div className="flex items-center gap-3 bg-white/50 dark:bg-white/10 p-1 rounded-full border border-white/5">
               <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-600 shadow-sm flex items-center justify-center">
                 <Volume2 size={14} className="text-gray-600 dark:text-white" />
               </div>
               <Slider defaultValue={[60]} max={100} step={1} className="flex-1" />
            </div>
         </div>
      </div>
      
      <div className="bg-white/50 dark:bg-black/40 rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-3">
             <Battery size={20} className="text-green-500" />
             <div className="flex flex-col leading-none">
               <span className="text-xs font-bold">Battery</span>
               <span className="text-[10px] opacity-60">84% • Charging</span>
             </div>
          </div>
      </div>

    </div>
  );
}
