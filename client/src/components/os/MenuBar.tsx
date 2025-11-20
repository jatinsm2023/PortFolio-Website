import { useState, useEffect } from 'react';
import { Apple, Wifi, Battery, Search, MonitorCog } from 'lucide-react';
import { format } from 'date-fns';
import { useOSStore } from '@/lib/os-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BatteryMenu from './BatteryMenu';

export default function MenuBar() {
  const [time, setTime] = useState(new Date());
  const toggleControlCenter = useOSStore(state => state.toggleControlCenter);
  const toggleSpotlight = useOSStore(state => state.toggleSpotlight);
  const launchApp = useOSStore(state => state.launchApp);
  const setSystemState = useOSStore(state => state.setSystemState);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRestart = () => {
    window.location.reload();
  };

  const handleSystemAction = (action: 'locked' | 'sleeping') => {
    setSystemState(action);
  };

  return (
    <div className="h-8 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 select-none z-50 text-white text-xs font-medium fixed top-0 w-full border-b border-white/5">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="hover:bg-white/10 p-1 rounded cursor-pointer data-[state=open]:bg-white/20">
              <Apple size={16} fill="currentColor" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-none shadow-xl ml-2 mt-1">
            <DropdownMenuItem onSelect={() => launchApp('about')}>
              About This Developer
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
            <DropdownMenuItem>System Settings...</DropdownMenuItem>
            <DropdownMenuItem>App Store...</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
            <DropdownMenuItem>Recent Items</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
            <DropdownMenuItem onSelect={() => handleSystemAction('locked')}>Force Quit...</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
            <DropdownMenuItem onSelect={() => handleSystemAction('sleeping')}>Sleep</DropdownMenuItem>
            <DropdownMenuItem onSelect={handleRestart}>Restart...</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSystemAction('locked')}>Shut Down...</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
            <DropdownMenuItem onSelect={() => handleSystemAction('locked')}>Lock Screen</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSystemAction('locked')}>Log Out Jatin Mahawar...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
        {/* Enhanced Battery Menu */}
        <BatteryMenu />

        {/* Wifi Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="hidden sm:flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer data-[state=open]:bg-white/20">
              <Wifi size={16} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-none shadow-xl mr-2 mt-1">
            <div className="px-2 py-1.5 text-sm font-semibold flex justify-between items-center">
              <span>Wi-Fi</span>
              <div className="w-8 h-4 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
            <DropdownMenuLabel className="text-xs text-gray-500 font-normal">Preferred Network</DropdownMenuLabel>
            <DropdownMenuItem className="flex justify-between">
              <span>Home_5G</span>
              <Wifi size={14} />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
            <DropdownMenuLabel className="text-xs text-gray-500 font-normal">Other Networks</DropdownMenuLabel>
            <DropdownMenuItem>Guest_Network</DropdownMenuItem>
            <DropdownMenuItem>iPhone Hotspot</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
            <DropdownMenuItem>Wi-Fi Settings...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer" onClick={toggleSpotlight}>
          <Search size={14} />
        </div>
        <div className="flex items-center gap-2 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer" onClick={toggleControlCenter}>
          <MonitorCog size={16} />
        </div>

        {/* Clock Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-default min-w-[140px] text-center data-[state=open]:bg-white/20">
              {format(time, 'EEE MMM d h:mm aa')}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-none shadow-xl mr-2 mt-1 p-4">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">{format(time, 'MMMM yyyy')}</div>
              <div className="grid grid-cols-7 gap-1 text-xs text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                  <div key={d} className="text-gray-500 font-medium py-1">{d}</div>
                ))}
                {/* Simple mock calendar grid */}
                {Array.from({ length: 30 }, (_, i) => i + 1).map(d => (
                  <div key={d} className={`py-1 rounded-full ${d === time.getDate() ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
