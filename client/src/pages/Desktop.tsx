import { useState, useEffect } from 'react';
import MenuBar from '@/components/os/MenuBar';
import Dock from '@/components/os/Dock';
import Finder from '@/components/apps/Finder';
import VSCode from '@/components/apps/VSCode';
import Safari from '@/components/apps/Safari';
import Terminal from '@/components/apps/Terminal';
import Mail from '@/components/apps/Mail';
import Photos from '@/components/apps/Photos';
import AboutThisMac from '@/components/os/AboutThisMac';
import ControlCenter from '@/components/os/ControlCenter';
import Spotlight from '@/components/os/Spotlight';
import wallpaper from '@assets/generated_images/Abstract_MacOS_style_wallpaper_78150684.png';

export default function Desktop() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate boot sequence
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="mb-8">
          <svg viewBox="0 0 170 170" width="80" height="80" className="fill-white">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-5.485.12-10.429-2.23-14.884-7.035-1.958-2.027-5.464-5.856-10.519-11.487-10.483-11.38-17.132-26.18-19.935-44.38-2.955-18.845 1.67-34.381 13.888-46.604 5.77-5.427 13.019-8.214 21.738-8.363 4.32-.148 9.54 1.373 15.665 4.57 6.123 3.197 9.26 3.838 9.415 3.838 1.54 0 5.015-1.056 10.429-3.17 6.505-2.795 12.12-4.194 16.84-4.194 7.19 0 14.15 2.23 20.88 6.68 2.29 1.52 4.33 3.03 6.13 4.52-12.22 7.26-18.7 19.44-19.44 36.54-.79 18.31 13.29 33.18 29.29 33.18.25 0 .53-.01.84-.03 0 .18.01.36.01.54 0 2.23-.26 4.45-.79 6.65zm-34.31-79.99c-2.55-3.16-3.98-7.22-4.28-12.17 0-.21.01-.42.01-.63.13-3.35 1.16-6.75 3.08-10.19 1.93-3.44 4.55-6.25 7.86-8.41 3.23-2.14 6.84-3.35 10.82-3.63.21 0 .42-.01.63-.01.21 3.6.08 7.26-1.39 10.97-1.47 3.71-3.71 6.83-6.71 9.37-2.86 2.46-6.1 4.13-9.71 5-3.61.88-7.26 1.12-10.96.71.21 2.98.43 5.96.65 8.99z" />
          </svg>
        </div>
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-progress w-0"></div>
        </div>
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
      
      {/* Desktop Area for Windows */}
      <div className="absolute inset-0 top-8 bottom-20 z-0">
         {/* Apps are rendered here but managed by z-index in Window component */}
         <Finder />
         <VSCode />
         <Safari />
         <Terminal />
         <Mail />
         <Photos />
         <AboutThisMac />
      </div>

      <Dock />
    </div>
  );
}
