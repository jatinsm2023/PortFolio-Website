import { create } from 'zustand';

export type AppId = 'finder' | 'experience' | 'safari' | 'terminal' | 'mail' | 'photos' | 'about' | 'coding';

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
  size?: { width: number | string; height: number | string };
}

interface OSState {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  zCounter: number;
  isControlCenterOpen: boolean;
  systemState: 'active' | 'booting' | 'locked' | 'sleeping';
  
  launchApp: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleControlCenter: () => void;
  setSystemState: (state: 'active' | 'booting' | 'locked' | 'sleeping') => void;
}

export const useOSStore = create<OSState>((set) => ({
  windows: {
    finder: { id: 'finder', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    experience: { id: 'experience', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    safari: { id: 'safari', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    terminal: { id: 'terminal', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    mail: { id: 'mail', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    photos: { id: 'photos', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    about: { id: 'about', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    coding: { id: 'coding', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  },
  activeWindowId: null,
  zCounter: 10,
  isControlCenterOpen: false,
  systemState: 'booting', // Start in booting state

  launchApp: (id) => set((state) => {
    const window = state.windows[id];
    if (window.isOpen) {
      if (window.isMinimized) {
        return {
          windows: {
            ...state.windows,
            [id]: { ...window, isMinimized: false, zIndex: state.zCounter + 1 }
          },
          activeWindowId: id,
          zCounter: state.zCounter + 1
        };
      }
      return {
        windows: {
          ...state.windows,
          [id]: { ...window, zIndex: state.zCounter + 1 }
        },
        activeWindowId: id,
        zCounter: state.zCounter + 1
      };
    }
    
    return {
      windows: {
        ...state.windows,
        [id]: { ...window, isOpen: true, zIndex: state.zCounter + 1, isMinimized: false }
      },
      activeWindowId: id,
      zCounter: state.zCounter + 1
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isOpen: false, isMinimized: false }
    },
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true }
    },
    activeWindowId: null
  })),
  
  maximizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
    },
    activeWindowId: id,
    zCounter: state.zCounter + 1
  })),

  focusWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], zIndex: state.zCounter + 1 }
    },
    activeWindowId: id,
    zCounter: state.zCounter + 1
  })),

  toggleControlCenter: () => set((state) => ({
    isControlCenterOpen: !state.isControlCenterOpen
  })),

  setSystemState: (newState) => set(() => ({
    systemState: newState
  }))
}));
