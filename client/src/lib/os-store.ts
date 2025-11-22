import { create } from 'zustand';

export type AppId = 'finder' | 'experience' | 'safari' | 'terminal' | 'mail' | 'photos' | 'about' | 'coding' | 'notes' | 'settings' | 'music' | 'calculator' | 'games' | 'paint' | 'trash' | 'assistant';

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
  isSpotlightOpen: boolean;
  systemState: 'active' | 'booting' | 'locked' | 'sleeping';
  wallpaper: string;
  accentColor: string;

  launchApp: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  maximizeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleControlCenter: () => void;
  toggleSpotlight: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setWallpaper: (wallpaper: string) => void;
  setAccentColor: (color: string) => void;
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
    notes: { id: 'notes', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    settings: { id: 'settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    music: { id: 'music', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    calculator: { id: 'calculator', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    games: { id: 'games', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    paint: { id: 'paint', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    trash: { id: 'trash', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
    assistant: { id: 'assistant', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  },
  activeWindowId: null,
  zCounter: 10,
  isControlCenterOpen: false,
  isSpotlightOpen: false,
  systemState: 'booting', // Start in booting state
  wallpaper: '/wallpapers/default.jpg',
  accentColor: 'blue',

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

  toggleSpotlight: () => set((state) => ({
    isSpotlightOpen: !state.isSpotlightOpen
  })),

  theme: 'light',
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),

  setWallpaper: (wallpaper) => set(() => ({
    wallpaper
  })),

  setAccentColor: (accentColor) => set(() => ({
    accentColor
  })),

  setSystemState: (newState) => set(() => ({
    systemState: newState
  }))
}));
