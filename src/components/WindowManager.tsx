import { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../lib/windowStore';
import WindowRenderer from './WindowRenderer';
import ErrorBoundary from './ErrorBoundary';

export interface WindowManagerProps {
  isInitialized: boolean;
}

export default function WindowManager({ isInitialized }: WindowManagerProps) {
  const {
    windows,
    removeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    bringToFront,
    activeWindowId,
    updateWindowPosition,
    startDragging,
    stopDragging,
    applyPhysics,
    constrainToBounds
  } = useWindowStore();

  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

  if (!isInitialized) return null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-transparent text-green-100 z-0">
      <AnimatePresence>
        {windows.map((win) => (
          <ErrorBoundary key={win.id}>
            <WindowRenderer
              window={win}
              isActive={win.id === activeWindowId}
              onClose={() => removeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => maximizeWindow(win.id)}
              onRestore={() => restoreWindow(win.id)}
              onBringToFront={() => bringToFront(win.id)}
              onPositionChange={(pos) => updateWindowPosition(win.id, pos)}
              onDragStart={() => startDragging(win.id)}
              onDragEnd={() => stopDragging(win.id)}
              applyPhysics={applyPhysics}
              constrainToBounds={constrainToBounds}
            />
          </ErrorBoundary>
        ))}
      </AnimatePresence>
    </div>
  );
}
