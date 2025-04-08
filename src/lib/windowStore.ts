
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface SnapGuide {
  type: 'edge' | 'grid';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface Window {
  id: string;
  type: string;
  title: string;
  icon?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: WindowPosition;
  size: WindowSize;
  zIndex?: number;
  lastFocused?: number;
  velocity?: WindowPosition;
  isDragging?: boolean;
  snapGuides?: SnapGuide[];
  data?: any;
}

export interface PhysicsConfig {
  mass: number;
  friction: number;
  elasticity: number;
  snapStrength: number;
  maxVelocity: number;
}

interface WindowState {
  windows: Window[];
  activeWindowId: string | null;
  maxZIndex: number;
  gridSize: number;
  snapThreshold: number;
  isGridEnabled: boolean;
  isSnapEnabled: boolean;
  windowSpacing: number;
  cascadeOffset: number;
  physics: PhysicsConfig;

  updateWindowPosition: (id: string, position: WindowPosition, velocity?: WindowPosition) => void;
  startDragging: (id: string) => void;
  stopDragging: (id: string) => void;
  applyPhysics: (id: string) => void;
  setPhysicsConfig: (config: Partial<PhysicsConfig>) => void;

  addWindow: (window: Window) => void;
  removeWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<Window>) => void;

  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  bringToFront: (id: string) => void;
}

export const useWindowStore = create<WindowState>()(
  persist(
    (set, get) => ({
      windows: [],
      activeWindowId: null,
      maxZIndex: 100,
      gridSize: 24,
      snapThreshold: 16,
      isGridEnabled: false,
      isSnapEnabled: true,
      windowSpacing: 24,
      cascadeOffset: 40,
      physics: {
        mass: 1,
        friction: 0.2,
        elasticity: 0.5,
        snapStrength: 0.8,
        maxVelocity: 30
      },

      addWindow: (window) => {
        const zIndex = get().maxZIndex + 1;
        set((state) => ({
          windows: [...state.windows, { ...window, zIndex }],
          maxZIndex: zIndex,
          activeWindowId: window.id
        }));
      },

      removeWindow: (id) => {
        set((state) => ({
          windows: state.windows.filter((w) => w.id !== id)
        }));
      },

      updateWindow: (id, updates) => {
        set((state) => ({
          windows: state.windows.map((w) => (w.id === id ? { ...w, ...updates } : w))
        }));
      },

      updateWindowPosition: (id, position, velocity) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, position, velocity } : w
          )
        }));
      },

      startDragging: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isDragging: true } : w
          )
        }));
      },

      stopDragging: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isDragging: false } : w
          )
        }));
      },

      applyPhysics: () => {}, // Placeholder

      setPhysicsConfig: (config) => {
        set((state) => ({
          physics: { ...state.physics, ...config }
        }));
      },

      minimizeWindow: (id) => {
        get().updateWindow(id, { isMinimized: true });
      },

      maximizeWindow: (id) => {
        get().updateWindow(id, { isMaximized: true });
      },

      restoreWindow: (id) => {
        get().updateWindow(id, { isMinimized: false, isMaximized: false });
      },

      bringToFront: (id) => {
        const zIndex = get().maxZIndex + 1;
        get().updateWindow(id, { zIndex });
        set({ maxZIndex: zIndex, activeWindowId: id });
      }
    }),
    { name: 'window-storage' }
  )
);
