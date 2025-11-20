import { motion } from 'framer-motion';
import { useOSStore, AppId } from '@/lib/os-store';
import {
  Folder,
  Briefcase,
  Globe,
  Terminal,
  Mail,
  Image as ImageIcon,
  Code2, // Icon for Coding
  StickyNote
} from 'lucide-react';
import { cn } from '@/lib/utils';

const APPS: { id: AppId; icon: any; label: string; color: string }[] = [
  { id: 'finder', icon: Folder, label: 'Finder', color: 'bg-blue-500' },
  { id: 'experience', icon: Briefcase, label: 'Experience', color: 'bg-orange-500' },
  { id: 'coding', icon: Code2, label: 'Coding', color: 'bg-green-600' }, // Added Coding App
  { id: 'safari', icon: Globe, label: 'Safari', color: 'bg-blue-400' },
  { id: 'terminal', icon: Terminal, label: 'Terminal', color: 'bg-gray-800' },
  { id: 'mail', icon: Mail, label: 'Mail', color: 'bg-blue-500' },
  { id: 'notes', icon: StickyNote, label: 'Notes', color: 'bg-yellow-400' },
  // { id: 'photos', icon: ImageIcon, label: 'Photos', color: 'bg-white' },
];

export default function Dock() {
  const launchApp = useOSStore(state => state.launchApp);
  const windows = useOSStore(state => state.windows);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-auto">
      <div className="flex items-end gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl mb-2 h-16">
        {APPS.map((app) => {
          const isOpen = windows[app.id].isOpen;
          const Icon = app.icon;

          return (
            <DockItem
              key={app.id}
              onClick={() => launchApp(app.id)}
              isOpen={isOpen}
            >
              <div className={cn(
                "w-full h-full rounded-xl flex items-center justify-center shadow-lg text-white relative",
                app.color
              )}>
                {/* App Icon Style */}
                {app.id === 'photos' ? (
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-white to-white/80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 absolute top-3 left-3 opacity-60" />
                      <div className="w-3 h-3 rounded-full bg-orange-500 absolute top-3 right-3 opacity-60" />
                      <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-3 left-3 opacity-60" />
                      <div className="w-3 h-3 rounded-full bg-blue-500 absolute bottom-3 right-3 opacity-60" />
                    </div>
                  </div>
                ) : app.id === 'safari' ? (
                  <div className="relative w-full h-full bg-white rounded-xl overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-500 opacity-10" />
                    <Globe className="text-blue-500" size={32} />
                  </div>
                ) : app.id === 'terminal' ? (
                  <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center border border-gray-700">
                    <span className="text-green-500 font-mono font-bold text-lg">{`>_`}</span>
                  </div>
                ) : (
                  <Icon size={28} strokeWidth={1.5} />
                )}

              </div>
              {isOpen && (
                <div className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full" />
              )}
            </DockItem>
          );
        })}
      </div>
    </div>
  );
}

function DockItem({ children, onClick, isOpen }: { children: React.ReactNode, onClick: () => void, isOpen: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.2, y: -10 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="w-12 h-12 relative flex flex-col items-center justify-center transition-all duration-200 ease-out"
    >
      {children}
    </motion.button>
  );
}
