import Window from './Window';
import { Laptop, Cpu, MemoryStick, HardDrive, Monitor } from 'lucide-react';

export default function AboutThisMac() {
  return (
    <Window 
      id="about" 
      title="About This Developer" 
      width={600} 
      height={340}
      minHeight={340}
    >
      <div className="h-full bg-[#ececec] dark:bg-[#1e1e1e] flex p-8 gap-8 items-center select-none">
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-xl flex items-center justify-center text-white text-4xl font-bold">
            JM
          </div>
          <div className="text-xs text-gray-500 font-medium">Version 20.25</div>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jatin Mahawar</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Full Stack Developer & CS Student</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex gap-3">
              <div className="w-20 text-gray-500 text-right font-medium">Processor</div>
              <div className="text-gray-900 dark:text-gray-200">Dual Degree CSE @ IIT Kharagpur</div>
            </div>
            <div className="flex gap-3">
              <div className="w-20 text-gray-500 text-right font-medium">Memory</div>
              <div className="text-gray-900 dark:text-gray-200">Full Stack Knowledge (React, Node, Python)</div>
            </div>
            <div className="flex gap-3">
              <div className="w-20 text-gray-500 text-right font-medium">Graphics</div>
              <div className="text-gray-900 dark:text-gray-200">Creative UI/UX & Framer Motion</div>
            </div>
            <div className="flex gap-3">
              <div className="w-20 text-gray-500 text-right font-medium">Startup</div>
              <div className="text-gray-900 dark:text-gray-200">CallKaro AI (Founding Engineer)</div>
            </div>
          </div>

          <div className="pt-4 flex gap-2">
            <button className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm text-xs font-medium active:bg-gray-50">
              System Report...
            </button>
            <button className="px-3 py-1 bg-white border border-gray-300 rounded shadow-sm text-xs font-medium active:bg-gray-50">
              Software Update...
            </button>
          </div>
        </div>
      </div>
    </Window>
  );
}
