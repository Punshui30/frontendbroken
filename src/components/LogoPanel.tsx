// src/components/LogoPanel.tsx
import React from 'react';

export default function LogoPanel() {
  return (
    <div className="flex items-center justify-center h-full">
      <img
        src="/assets/splash.png"
        alt="D.A.N. Logo"
        className="h-24 w-auto drop-shadow-md"
      />
    </div>
  );
}
