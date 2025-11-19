import { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, MonitorCog } from 'lucide-react';
import { format } from 'date-fns';
import { useOSStore } from '@/lib/os-store';
import { cn } from '@/lib/utils';

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const toggleControlCenter = useOSStore(state => state.toggleControlCenter);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 select-none z-50 text-white text-xs font-medium fixed top-0 w-full border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="hover:bg-white/10 p-1 rounded cursor-pointer">
          <Apple size={16} fill="currentColor" />
        </div>
        <span className="font-bold hidden sm:inline">Jatin Mahawar</span>
        
        <div className="hidden sm:flex gap-4 ml-2 text-white/90">
          <span className="cursor-default hover:text-white">File</span>
          <span className="cursor-default hover:text-white">Edit</span>
          <span className="cursor-default hover:text-white">View</span>
          <span className="cursor-default hover:text-white">Go</span>
          <span className="cursor-default hover:text-white">Window</span>
          <span className="cursor-default hover:text-white">Help</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          <Battery size={18} />
        </div>
        <div className="hidden sm:flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          <Wifi size={16} />
        </div>
        <div className="flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
          <Search size={14} />
        </div>
        <div className="flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer" onClick={toggleControlCenter}>
          <MonitorCog size={16} />
        </div>
        <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-default min-w-[140px] text-center">
          {format(time, 'EEE MMM d h:mm aa')}
        </div>
      </div>
    </div>
  );
}
