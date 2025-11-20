import { useState, useEffect } from 'react';
import MenuBar from '@/components/os/MenuBar';
import Dock from '@/components/os/Dock';
import Finder from '@/components/apps/Finder';
import Experience from '@/components/apps/Experience';
import Coding from '@/components/apps/Coding'; // Import Coding
import Safari from '@/components/apps/Safari';
import Terminal from '@/components/apps/Terminal';
import Mail from '@/components/apps/Mail';
import Notes from '@/components/apps/Notes';
import Photos from '@/components/apps/Photos';
import AboutThisMac from '@/components/os/AboutThisMac';
import ControlCenter from '@/components/os/ControlCenter';
import Spotlight from '@/components/os/Spotlight';
import WeatherWidget from '@/components/os/WeatherWidget';
import Jatin from '@assets/generated_images/jatin_mahawar.png';
import wallpaper from '@assets/generated_images/Abstract_MacOS_style_wallpaper_78150684.png';
import { useOSStore } from '@/lib/os-store';
import { Apple } from 'lucide-react';

export default function Desktop() {
  const [isLoading, setIsLoading] = useState(true);
  const systemState = useOSStore(state => state.systemState);
  const setSystemState = useOSStore(state => state.setSystemState);

  // Simulate initial boot sequence
  useEffect(() => {
    if (systemState === 'booting') {
      const timer = setTimeout(() => {
        setSystemState('active');
        setIsLoading(false);
      }, 2000); // Slightly longer boot for effect
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [systemState, setSystemState]);

  // Handle Locked/Boot State
  if (systemState === 'booting' || systemState === 'locked' || systemState === 'sleeping') {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white relative">
        {systemState === 'sleeping' && (
          <div className="absolute inset-0 bg-black z-50 cursor-pointer" onClick={() => setSystemState('active')} />
        )}

        <div className="mb-8">
          <Apple size={80} fill="white" />
        </div>

        {systemState === 'booting' ? (
          <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-progress w-0"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <img
              src={Jatin}
              alt="Jatin Mahawar"
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white/10 shadow-2xl"
            />
            <h2 className="text-xl font-semibold mb-6">Jatin Mahawar</h2>

            <button
              onClick={() => setSystemState('active')}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium transition-all"
            >
              Enter Portfolio
            </button>

            <div className="mt-8 text-white/40 text-xs flex flex-col items-center gap-1">
              <span>Touch ID or Enter Password</span>
              <div className="flex gap-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-cover bg-center select-none"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <MenuBar />
      <ControlCenter />
      <Spotlight />
      <WeatherWidget />

      {/* Desktop Area for Windows */}
      <div className="absolute inset-0 top-8 bottom-20 z-0">
        {/* Apps are rendered here but managed by z-index in Window component */}
        <Finder />
        <Experience />
        <Coding />
        <Safari />
        <Terminal />
        <Mail />
        <Notes />
        <Photos />
        <AboutThisMac />
      </div>

      <Dock />
    </div>
  );
}
