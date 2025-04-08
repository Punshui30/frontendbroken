import React, { useState } from 'react';
import { ToastProvider } from './components/ui/toast';
import WindowManager from './components/WindowManager';
import BootSequence from './components/BootSequence';
import { Taskbar } from './components/Taskbar';
import Starfield from './components/Starfield';

export default function App() {
  const isDev = import.meta.env.DEV;
  const [bootComplete, setBootComplete] = useState(isDev ? true : false);

  return (
    <ToastProvider>
      <div className="relative h-screen w-screen overflow-hidden text-green-100 bg-black">
        <Starfield />

        {!bootComplete && (
          <BootSequence onBootComplete={() => setBootComplete(true)} />
        )}

        {bootComplete && (
          <>
            <WindowManager isInitialized />
            <Taskbar />
          </>
        )}
      </div>
    </ToastProvider>
  );
}
