
import { create } from 'zustand';
import { WindowProps } from '../types';

interface WindowStore {
  windows: WindowProps[];
  activeWindowId: string | null;
  addWindow: (window: WindowProps) => void;
  removeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  startDragging: (id: string) => void;
  stopDragging: (id: string) => void;
  applyPhysics: (id: string) => void;
  constrainToBounds: (id: string) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [
    {
      id: 'welcome-dan',
      type: 'copilot',
      title: 'D.A.N. Copilot',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      position: { x: 120, y: 120 },
      size: { width: 600, height: 400 },
      data: {}
    }
  ],
  activeWindowId: 'welcome-dan',
  addWindow: (window) =>
    set((state) => ({
      windows: [...state.windows, window],
      activeWindowId: window.id,
    })),
  removeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),
  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    })),
  maximizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: true } : w
      ),
    })),
  restoreWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: false, isMaximized: false } : w
      ),
    })),
  bringToFront: (id) =>
    set((state) => {
      const window = state.windows.find((w) => w.id === id);
      if (!window) return {};
      return {
        windows: [...state.windows.filter((w) => w.id !== id), window],
        activeWindowId: id,
      };
    }),
  updateWindowPosition: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    })),
  startDragging: () => {},
  stopDragging: () => {},
  applyPhysics: () => {},
  constrainToBounds: () => {},
}));
