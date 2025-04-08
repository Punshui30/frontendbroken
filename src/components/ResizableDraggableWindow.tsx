import { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { X } from 'lucide-react';
import { useWindowStore } from '../lib/windowStore';
import { cn } from '../lib/utils';

export function ResizableDraggableWindow({
  id,
  title,
  isOpen,
  isMinimized,
  isMaximized,
  position,
  size,
  type,
  children
}: {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  type: string;
  children: React.ReactNode;
}) {
  const rndRef = useRef<any>(null);
  const [localSize, setLocalSize] = useState(size);
  const [localPos, setLocalPos] = useState(position);
  const { updateWindow, closeWindow, focusWindow } = useWindowStore();

  useEffect(() => {
    if (isMaximized) {
      const vw = window.innerWidth;
      const vh = window.innerHeight - 60;
      setLocalSize({ width: vw, height: vh });
      setLocalPos({ x: 0, y: 60 });
    } else {
      setLocalSize(size);
      setLocalPos(position);
    }
  }, [isMaximized]);

  if (!isOpen || isMinimized) return null;

  return (
    <Rnd
      ref={rndRef}
      bounds="window"
      size={localSize}
      position={localPos}
      onDragStop={(_, d) => {
        setLocalPos({ x: d.x, y: d.y });
        updateWindow(id, { position: { x: d.x, y: d.y } });
      }}
      onResizeStop={(_, __, ref, delta, pos) => {
        const newSize = {
          width: ref.offsetWidth,
          height: ref.offsetHeight
        };
        setLocalSize(newSize);
        setLocalPos(pos);
        updateWindow(id, {
          size: newSize,
          position: pos
        });
      }}
      style={{ zIndex: 1000 }}
      onMouseDown={() => focusWindow(id)}
    >
      <div className={cn(
        "bg-muted border border-border rounded-lg shadow-lg flex flex-col h-full overflow-hidden"
      )}>
        <div
          className="bg-muted px-4 py-2 flex items-center justify-between cursor-move"
          onDoubleClick={() => updateWindow(id, { isMaximized: !isMaximized })}
        >
          <span className="font-medium text-sm text-foreground">
            {title} <span className="text-muted-foreground text-xs ml-1">[{type}]</span>
          </span>
          <button
            onClick={() => closeWindow(id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 bg-background overflow-auto">{children}</div>
      </div>
    </Rnd>
  );
}
