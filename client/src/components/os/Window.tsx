import { useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useOSStore, AppId } from '@/lib/os-store';
import { cn } from '@/lib/utils';

interface WindowProps {
  id: AppId;
  title: string;
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  minWidth?: number;
  minHeight?: number;
  sidebar?: React.ReactNode;
}

export default function Window({ 
  id, 
  title, 
  children, 
  width = 800, 
  height = 600,
  minWidth = 400,
  minHeight = 300,
  sidebar
}: WindowProps) {
  const windowState = useOSStore(state => state.windows[id]);
  const activeWindowId = useOSStore(state => state.activeWindowId);
  const closeWindow = useOSStore(state => state.closeWindow);
  const minimizeWindow = useOSStore(state => state.minimizeWindow);
  const maximizeWindow = useOSStore(state => state.maximizeWindow);
  const focusWindow = useOSStore(state => state.focusWindow);
  
  const isActive = activeWindowId === id;
  const isMinimized = windowState.isMinimized;
  const isMaximized = windowState.isMaximized;
  
  const controls = useDragControls();
  const constraintsRef = useRef(null);

  if (!windowState.isOpen) return null;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ 
        scale: isMinimized ? 0 : isMaximized ? 1 : 1, 
        opacity: isMinimized ? 0 : 1,
        y: isMinimized ? 200 : 0,
        width: isMaximized ? '100vw' : width,
        height: isMaximized ? 'calc(100vh - 32px - 80px)' : height, // Subtract MenuBar and Dock space roughly
        x: isMaximized ? 0 : undefined,
        top: isMaximized ? 32 : undefined,
        left: isMaximized ? 0 : undefined,
      }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ 
        zIndex: windowState.zIndex,
        position: 'absolute',
      }}
      drag={!isMaximized}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={() => focusWindow(id)}
      onTap={() => focusWindow(id)}
      className={cn(
        "rounded-xl overflow-hidden shadow-2xl border border-black/10 bg-card flex flex-col",
        isActive ? "shadow-2xl ring-1 ring-white/20" : "shadow-lg opacity-95"
      )}
    >
      {/* Title Bar */}
      <div 
        className="h-10 bg-[#e3e3e3] dark:bg-[#2a2a2a] flex items-center px-4 justify-between select-none"
        onPointerDown={(e) => {
          controls.start(e);
          focusWindow(id);
        }}
        onDoubleClick={() => maximizeWindow(id)}
      >
        <div className="flex items-center gap-2 group">
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center hover:bg-[#ff5f57]/80 transition-colors"
          >
            <X size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
            className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center hover:bg-[#febc2e]/80 transition-colors"
          >
            <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
            className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center hover:bg-[#28c840]/80 transition-colors"
          >
            <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
          </button>
        </div>
        
        <div className="font-semibold text-sm text-gray-600 dark:text-gray-400 flex-1 text-center">
          {title}
        </div>
        
        <div className="w-14" /> {/* Spacer for centering title */}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden bg-white dark:bg-[#1e1e1e]">
        {sidebar && (
          <div className="w-48 bg-[#f5f5f5] dark:bg-[#252526] border-r dark:border-white/5 hidden sm:block">
            {sidebar}
          </div>
        )}
        <div className="flex-1 overflow-auto relative">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
